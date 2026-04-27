import { BusinessException, CommonConstant, DictDataEntity, DictTypeEntity, RedisConstant } from '@/common'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equal, FindOptionsWhere, In, Like, Repository } from 'typeorm'
import { RedisService } from '@/shared/redis.service'
import { CreateDictDataDto, CreateDictTypeDto, QueryDictDataDto, QueryDictTypeDto, UpdateDictDataDto, UpdateDictTypeDto } from './dict.dto'

@Injectable()
export class DictService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(DictTypeEntity) private readonly dictTypeRepository: Repository<DictTypeEntity>,
    @InjectRepository(DictDataEntity) private readonly dictDataRepository: Repository<DictDataEntity>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Dict Type                                 */
  /* -------------------------------------------------------------------------- */

  /** 创建字典类型 */
  public async createDictType(createDto: CreateDictTypeDto) {
    const exists = await this.dictTypeRepository.existsBy({ dictType: createDto.dictType })
    if (exists) throw new BusinessException('字典类型已存在')
    const entity = new DictTypeEntity()
    Object.assign(entity, createDto)
    await this.dictTypeRepository.save(entity)
    return '添加成功'
  }

  /** 批量删除字典类型（物理删除） */
  public async deleteDictType(ids: string[]) {
    const typeList = await this.dictTypeRepository.findBy({ id: In(ids) })
    if (!typeList.length) throw new BusinessException('字典类型不存在')
    const dictTypes = typeList.map((t) => t.dictType)
    const dataExists = await this.dictDataRepository.existsBy({ dictType: In(dictTypes) })
    if (dataExists) throw new BusinessException('该字典类型下存在字典数据，无法删除')
    await this.dictTypeRepository.delete(ids)
    return '删除成功'
  }

  /** 更新字典类型 */
  public async updateDictType(updateDto: UpdateDictTypeDto) {
    const { id, dictType } = updateDto
    const exist = await this.dictTypeRepository.findOneBy({ id: Equal(id) })
    if (!exist) throw new BusinessException('字典类型不存在')
    if (dictType && dictType !== exist.dictType) {
      const exists = await this.dictTypeRepository.existsBy({ dictType: Equal(dictType) })
      if (exists) throw new BusinessException('字典类型已存在')
      await this.dictDataRepository.createQueryBuilder().update().set({ dictType }).where({ dictType: exist.dictType }).execute()
    }
    const entity = new DictTypeEntity()
    Object.assign(entity, updateDto)
    await this.dictTypeRepository.update(id, entity)
    await this.deleteDictDataCache(exist.dictType)
    return '修改成功'
  }

  /** 查询字典类型列表（分页/条件） */
  public async findDictTypeList(queryParams: QueryDictTypeDto) {
    const { skip, take, dictName, dictType, status } = queryParams
    const queryBuilder = this.dictTypeRepository.createQueryBuilder('dictType')
    const where: FindOptionsWhere<DictTypeEntity> = {}
    if (dictName) where.dictName = Like(`%${dictName}%`)
    if (dictType) where.dictType = Equal(dictType)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('dictType.createTime', 'ASC')
    queryBuilder.skip(skip).take(take)
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 查询字典类型详情 */
  public async findDictTypeDetail(id: string) {
    const data = await this.dictTypeRepository.findOneBy({ id: Equal(id) })
    if (!data) throw new BusinessException('字典类型不存在')
    return data
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Dict Data                                 */
  /* -------------------------------------------------------------------------- */

  /** 创建字典数据 */
  public async createDictData(createDto: CreateDictDataDto) {
    const { dictType, dictValue, dictLabel } = createDto
    // 1. 检查字典类型是否存在（并拿到 dictTypeId）
    const dictTypeInfo = await this.dictTypeRepository.findOneBy({ dictType: Equal(dictType) })
    if (!dictTypeInfo) throw new BusinessException('字典类型不存在')
    // 2. 检查值重复（同一字典类型下值不能重复）
    const valueExists = dictType && dictValue && (await this.dictDataRepository.existsBy({ dictType: Equal(dictType), dictValue: Equal(dictValue) }))
    if (valueExists) throw new BusinessException('同一字典类型下值不能重复')
    // 3. 检查标签重复（同一字典类型下标签不能重复）
    const labelExists = dictType && dictLabel && (await this.dictDataRepository.existsBy({ dictType: Equal(dictType), dictLabel: Equal(dictLabel) }))
    if (labelExists) throw new BusinessException('同一字典类型下标签不能重复')
    // 4. 构建实体（自动赋值 dictTypeId）
    const entity = new DictDataEntity()
    Object.assign(entity, createDto)
    entity.dictTypeId = dictTypeInfo.id
    await this.dictDataRepository.save(entity)
    await this.deleteDictDataCache(dictType)
    return '添加成功'
  }

  /** 批量删除字典数据（物理删除） */
  public async deleteDictData(ids: string[]) {
    const list = await this.dictDataRepository.findBy({ id: In(ids) })
    if (!list.length) throw new BusinessException('字典数据不存在')
    for (const item of list) await this.deleteDictDataCache(item.dictType)
    await this.dictDataRepository.delete(ids)
    return '删除成功'
  }

  /** 更新字典数据 */
  public async updateDictData(updateDto: UpdateDictDataDto) {
    const { id, dictValue, dictLabel } = updateDto
    const exist = await this.dictDataRepository.findOneBy({ id })
    if (!exist) throw new BusinessException('字典数据不存在')
    if (dictValue && dictValue !== exist.dictValue) {
      const exists = await this.dictDataRepository.existsBy({ dictType: Equal(exist.dictType), dictValue: Equal(dictValue) })
      if (exists) throw new BusinessException('同一字典类型下值不能重复')
    }
    if (dictLabel && dictLabel !== exist.dictLabel) {
      const exists = await this.dictDataRepository.existsBy({ dictType: Equal(exist.dictType), dictLabel: Equal(dictLabel) })
      if (exists) throw new BusinessException('同一字典类型下标签不能重复')
    }
    const entity = new DictDataEntity()
    Object.assign(entity, updateDto)
    await this.dictDataRepository.update(id, entity)
    await this.deleteDictDataCache(exist.dictType)
    return '修改成功'
  }

  /** 查询字典数据列表（分页/条件） */
  public async findDictDataList(queryParams: QueryDictDataDto) {
    const { skip, take, dictLabel, dictValue, dictType, status } = queryParams
    const queryBuilder = this.dictDataRepository.createQueryBuilder('dictData')
    const where: FindOptionsWhere<DictDataEntity> = {}
    if (dictLabel) where.dictLabel = Like(`%${dictLabel}%`)
    if (dictValue) where.dictValue = Equal(dictValue)
    if (dictType) where.dictType = Equal(dictType)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('dictData.dictSort', 'ASC')
    queryBuilder.skip(skip).take(take)
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 查询字典数据详情 */
  public async findDictDataDetail(id: string) {
    const data = await this.dictDataRepository.findOneBy({ id })
    if (!data) throw new BusinessException('字典数据不存在')
    return data
  }

  /** 根据字典类型编码查询可用字典（前端下拉框专用） */
  public async findDictDataByType(dictType: string) {
    const cacheKey = `${RedisConstant.DICTTYPE_KEY}:${dictType}`
    const cache = await this.redisService.get(cacheKey)
    if (cache) return JSON.parse(cache)
    const queryBuilder = this.dictDataRepository.createQueryBuilder('dictData')
    queryBuilder.where('dictData.dictType = :dictType', { dictType })
    queryBuilder.andWhere('dictData.status = :status', { status: CommonConstant.STATUS_NORMAL })
    queryBuilder.orderBy('dictData.dictSort', 'ASC')
    const records = await queryBuilder.getMany()
    if (records.length) await this.redisService.set(cacheKey, JSON.stringify(records), 'EX', 3600 * 24)
    return records
  }

  /** 清理指定字典类型的缓存 */
  private async deleteDictDataCache(dictType: string) {
    await this.redisService.del(`${RedisConstant.DICTTYPE_KEY}:${dictType}`)
  }

  /** 清空所有字典类型的缓存 */
  public async clearDictCache() {
    const keys = await this.redisService.keys(`${RedisConstant.DICTTYPE_KEY}:*`)
    if (keys.length) await this.redisService.del(keys)
    return '刷新成功'
  }
}
