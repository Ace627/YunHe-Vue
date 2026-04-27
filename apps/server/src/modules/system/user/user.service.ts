import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RedisService } from '@/shared/redis.service'
import { encryptPassword, verifyPassword } from '@/utils'
import { Equal, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm'
import { BusinessException, CommonConstant, UserEntity, RoleEntity } from '@/common'
import { CreateUserDto, QueryUserDto, ResetUserPwdDto, UpdateProfileDto, UpdateUserDto, UpdateUserPwdDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  /** 创建用户方法 */
  public async create(createDto: CreateUserDto) {
    const { username, phone, roleIds } = createDto
    const exists = username && (await this.userRepository.existsBy({ username: Equal(username) }))
    if (exists) throw new BusinessException('该用户已存在')
    if (await this.checkPhoneExists(phone)) throw new BusinessException('该手机号已存在')
    const entity = new UserEntity()
    Object.assign(entity, createDto)
    entity.password = await encryptPassword(createDto.password)
    entity.roles = await this.roleRepository.findBy({ id: In(roleIds) })
    await this.userRepository.save(entity)
    return '添加成功'
  }

  /** 删除用户方法 */
  public async delete(userIds: string[]) {
    if (userIds.length === 1 && userIds.includes(CommonConstant.ADMIN_USER_ID)) throw new BusinessException(`管理员账号无法被删除`)
    userIds = userIds.filter((userId) => userId !== CommonConstant.ADMIN_USER_ID)
    await this.roleRepository.createQueryBuilder().delete().from('sys_user_role').where('user_id IN (:...userIds)', { userIds }).execute()
    await this.userRepository.delete(userIds)
    await Promise.all(userIds.map((userId) => this.cleanUserRelatedCache(userId)))
    return `删除成功`
  }

  /** 更新用户方法 */
  public async update(updateDto: UpdateUserDto) {
    const { id, phone, roleIds } = updateDto
    const entity = await this.userRepository.findOneBy({ id: Equal(id) })
    if (!entity) throw new BusinessException('该用户不存在')
    if (await this.checkPhoneExists(phone, id)) throw new BusinessException('该手机号已存在')
    entity.roles = await this.roleRepository.findBy({ id: In(roleIds) })
    Object.assign(entity, updateDto)
    await this.userRepository.save(entity)
    return '更新成功'
  }

  /** 重置密码方法 */
  public async resetPassword(updateDto: ResetUserPwdDto) {
    // 1. 根据用户名查询用户
    const user = await this.userRepository.findOneBy({ username: Equal(updateDto.username) })
    if (!user) throw new BusinessException('该用户不存在')
    // 2. 校验新旧密码不能相同
    const isSame = await verifyPassword(updateDto.password, user.password)
    if (isSame) throw new BusinessException('新密码不能与原密码相同')
    // 3. 加密新密码
    const newPwd = await encryptPassword(updateDto.password)
    // 4. 更新密码
    await this.userRepository.update(user.id, { password: newPwd })
    // 5. 清除缓存，强制用户重新登录
    await this.cleanUserRelatedCache(user.id)
    // 6. 返回成功提示
    return '密码重置成功，请重新登录'
  }

  /** 修改密码 */
  public async updatePassword(userId: string, updateDto: UpdateUserPwdDto): Promise<string> {
    const { oldPassword, newPassword, repeatPassword } = updateDto
    // 1. 两次密码必须一致
    if (newPassword !== repeatPassword) throw new BusinessException('两次输入的新密码不一致')
    // 2. 查询用户（仅查询id和密码）
    const user = await this.userRepository.findOne({ where: { id: Equal(userId) }, select: ['id', 'password'] })
    if (!user) throw new BusinessException('用户不存在')
    // 3. 校验旧密码是否正确
    const isOldPwdValid = await verifyPassword(oldPassword, user.password)
    if (!isOldPwdValid) throw new BusinessException('旧密码错误')
    // 4. 新密码不能与旧密码相同（加密后对比，最严谨）
    const isSameAsOld = await verifyPassword(newPassword, user.password)
    if (isSameAsOld) throw new BusinessException('新密码不能与原密码相同')
    // 5. 加密并更新密码
    await this.userRepository.update(userId, { password: await encryptPassword(newPassword) })
    // 6. 清除缓存 → 强制重新登录
    await this.cleanUserRelatedCache(userId)
    return '密码修改成功，请重新登录'
  }

  /** 根据用户 ID 查询用户信息 */
  public async findOneById(userId: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    queryBuilder.leftJoinAndSelect('user.roles', 'role')
    queryBuilder.where('user.id = :id', { id: userId })
    const user = await queryBuilder.getOne()
    if (!user) throw new BusinessException(`该用户不存在`)
    return user
  }

  /** 查询用户列表方法 */
  public async findList(queryParams: QueryUserDto) {
    const { skip, take, status, username, nickname, phone } = queryParams
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    const where: FindOptionsWhere<UserEntity> = {}
    if (username) where.username = Like(`%${username}%`)
    if (nickname) where.nickname = Like(`%${nickname}%`)
    if (phone) where.phone = Like(`%${phone}%`)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('user.createTime', 'ASC') // 排序
    queryBuilder.skip(skip).take(take) // 分页
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 获取用户个人信息 */
  public async getProfile(id: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    queryBuilder.leftJoin('user.roles', 'role')
    queryBuilder.where('user.id = :id', { id })
    queryBuilder.select('user.nickname')
    queryBuilder.addSelect('user.phone')
    queryBuilder.addSelect('user.email')
    queryBuilder.addSelect('user.gender')
    queryBuilder.addSelect('user.createTime')
    queryBuilder.addSelect('role.roleName')
    const user = await queryBuilder.getOne()
    if (!user) throw new BusinessException(`该用户不存在`)
    const roleGroup = user.roles.map((role) => role.roleName)
    return { ...user, roleGroup }
  }

  /** 更新用户个人信息 */
  public async updateProfile(userId: string, updateDto: UpdateProfileDto) {
    await this.userRepository.update(userId, updateDto)
    return '编辑成功'
  }

  /** 获取用户仓库 */
  public getRepository() {
    return this.userRepository
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Hanlder                              */
  /* -------------------------------------------------------------------------- */

  /** 检查手机号是否存在 */
  private async checkPhoneExists(phone?: string, userId?: string): Promise<boolean> {
    if (!phone) return false
    const where: FindOptionsWhere<UserEntity> = {}
    where.phone = Equal(phone)
    if (userId) where.id = Not(userId)
    return await this.userRepository.existsBy(where)
  }

  /** 根据用户 ID 清除用户相关缓存 */
  private async cleanUserRelatedCache(userId: string) {
    if (!userId?.trim()) return
    const keys = await this.redisService.keys(`*${userId}*`)
    if (!keys.length) return '未发现需要清除的用户缓存'
    await this.redisService.del(keys)
    return `成功清除 ${keys.length} 个相关缓存`
  }
}
