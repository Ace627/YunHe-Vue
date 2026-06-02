---
name: backend-coding-guide
description: NestJS 后端代码规范与最佳实践，涵盖模块化架构、TypeORM Repository 模式、DTO 验证、Redis 缓存策略、统一响应格式及安全编码约定
---

# NestJS 后端代码规范

生成或修改 `apps/server/src` 下任何 `.ts` 文件时，必须严格遵循本规范。

---

## 一、TypeORM 实体规范

### 1.1 外键字符串列

外键字段（仅存储关联表 ID 的字符串列，非 `@ManyToOne` 关系装饰器用法）**必须**参照 `common/entities/system/dict-data.entity.ts` 中 `dictTypeId` 的写法，强制包含 `charset` 与 `collation` 属性：

```typescript
// ✅ 正确 —— 参照 dict-data.entity.ts#L31-32
@Column({ name: 'dept_id', comment: '部门ID', nullable: true, type: 'varchar', length: 36, charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci' })
deptId: string

// ❌ 错误 —— 缺少 charset 与 collation
@Column({ name: 'dept_id', comment: '部门ID', nullable: true, type: 'varchar', length: 36 })
deptId: string
```

要点：

- `name` 选项统一使用 **snake_case**（如 `dept_id`、`dict_type_id`），对应数据库中真实列名
- TypeScript 属性名保持 **camelCase**（如 `deptId`、`dictTypeId`）
- `length: 36` 匹配 UUID 主键长度
- `charset: 'utf8mb4'` + `collation: 'utf8mb4_0900_ai_ci'` 必须显式声明，不可省略

### 1.2 实体继承链

所有业务实体继承自 `BaseEntity`，`BaseEntity` 继承自 `CommonEntity`：

```
CommonEntity（createTime / updateTime）
  └── BaseEntity（createBy / updateBy + BeforeInsert / BeforeUpdate）
        └── 业务实体（UserEntity / RoleEntity / MenuEntity ...）
```

### 1.3 Column 选项顺序

`@Column` 内部选项按以下顺序书写：

1. `name`（数据库列名）
2. `comment`（字段注释）
3. `nullable`
4. `default`
5. `unique`
6. `type`
7. `length`
8. `charset`
9. `collation`

```typescript
// ✅ 正确
@Column({ name: 'dept_name', comment: '部门名称', length: 100, nullable: false, type: 'varchar' })
deptName: string
```

### 1.4 主键策略

所有业务表主键统一使用 UUID：

```typescript
@PrimaryGeneratedColumn('uuid')
id: string
```

### 1.5 状态字段

状态字段统一为 `char(1)`，配合 `CommonConstant.STATUS_NORMAL` / `STATUS_DISABLE`：

```typescript
@Column({ length: 1, comment: '状态', default: CommonConstant.STATUS_NORMAL, type: 'char' })
status: string
```

---

## 二、模块组织规范

### 2.1 目录结构

每个业务模块在 `modules/` 下独立目录，必须包含以下文件：

```
modules/
└── system/
    ├── dept/
    │   ├── dept.controller.ts   ← 控制器（路由+权限声明+操作日志）
    │   ├── dept.dto.ts          ← DTO（入参校验）
    │   ├── dept.module.ts       ← 模块注册
    │   ├── dept.service.ts      ← 业务逻辑
    └── system.module.ts         ← 聚合模块（注册子模块）
```

### 2.2 实体与模块分离

- Entity 文件统一放在 `common/entities/` 下，按业务域分子目录
- Entity 不直接归属任何模块，通过 `TypeOrmModule.forFeature([Entity])` 在对应 Module 中引入
- 所有 Entity 在 `common/index.ts` 中统一 `export`

### 2.3 模块注册

子模块在聚合模块中注册：

```typescript
@Module({
  imports: [UserModule, DictModule, RoleModule, MenuModule, DeptModule],
  exports: [UserModule],
})
export class SystemModule {}
```

---

## 三、控制器规范

### 3.1 路由路径

控制器路径遵循 `system/{资源名}` 命名规范：

```typescript
@Controller('system/dept')
export class DeptController {}
```

### 3.2 端点命名

- 创建：`POST create`
- 删除：`DELETE delete`
- 更新：`PUT update`
- 分页列表：`GET list`
- 全部列表：`GET list/all`
- 详情：`GET detail`

### 3.3 权限声明

每个需要权限控制的端点**必须**使用 `@RequirePermissions([])` 声明所需权限：

```typescript
@Post('create')
@RequirePermissions(['system:dept:create'])
@OperLog({ title: '部门管理', businessType: BusinessType.INSERT })
create(@Body() createDto: CreateDeptDto) {
  return this.deptService.create(createDto)
}
```

### 3.4 操作日志

写操作（增/删/改）**必须**添加 `@OperLog` 装饰器：

```typescript
@OperLog({ title: '部门管理', businessType: BusinessType.INSERT })
```

### 3.5 依赖注入

统一使用 `private readonly` + `constructor` 注入：

```typescript
@Injectable()
export class DeptService {
  constructor(@InjectRepository(DeptEntity) private readonly deptRepository: Repository<DeptEntity>) {}
}
```

---

## 四、DTO 规范

### 4.1 DTO 类结构

每个 DTO 必须使用 `class-validator` 装饰器进行参数校验：

```typescript
export class CreateDeptDto {
  @IsNotEmpty({ message: '部门名称不能为空' })
  deptName: string

  @IsOptional()
  parentId: string
}
```

### 4.2 Update DTO

更新 DTO 使用 `PartialType(CreateDto)` 继承创建 DTO，新增 `id` 字段：

```typescript
export class UpdateDeptDto extends PartialType(CreateDeptDto) {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  id: string
}
```

### 4.3 Query DTO

查询 DTO 继承 `PaginationDto`，查询字段使用 `@IsOptional()`：

```typescript
export class QueryDeptDto extends PaginationDto {
  @IsOptional()
  deptName: string
}
```

---

## 五、Service 规范

### 5.1 Repository 操作

- 查询统一使用 `QueryBuilder` 或 `findOneBy` / `findBy`
- 禁止直接拼 SQL
- 存在性校验优先使用 `existsBy` 而非 `findOneBy`

```typescript
const exists = await this.deptRepository.existsBy({
  deptName: Equal(createDto.deptName),
  parentId: Equal(createDto.parentId ?? CommonConstant.DEFAULT_PARENT_ID),
})
if (exists) throw new BusinessException('同级下部门名称已存在')
```

### 5.2 业务异常

统一抛出 `BusinessException`，不得直接抛 `Error` 或 `HttpException`：

```typescript
import { BusinessException } from '@/common'

if (!data) throw new BusinessException('部门不存在')
```

### 5.3 树形数据

树形数据使用工具函数 `listToTree()` 将扁平数组转为树结构：

```typescript
import { listToTree } from '@/utils'

const records = await this.deptRepository.find({ ... })
return listToTree(records)
```

### 5.4 返回值

- 增/删/改操作返回 `string` 文案（如 `'添加成功'`）
- 查询操作返回实体或实体数组
- 分页查询返回 `{ total, records }`

---

## 六、权限体系

### 6.1 权限标识命名

权限标识遵循 `{模块}:{资源}:{操作}` 三段式命名：

```
system:dept:query
system:dept:create
system:dept:update
system:dept:delete
```

### 6.2 权限校验流程

```
客户端请求 → PermissionAuthGuard
  → 从 Redis 读取用户权限列表 (ADMIN_USER_PERMISSIONS:{userId})
  → 与 @RequirePermissions 声明的权限组比对
  → 命中任一权限 → 放行 / 全部未命中 → 403
```

### 6.3 菜单与权限

按钮权限本质是 `sys_menu` 表中 `menu_type = 'F'` 的记录。新增模块的权限**必须同步**在 `sys_menu` 表中插入对应记录，否则 `PermissionAuthGuard` 无法匹配。

---

## 七、通用规范

### 7.1 Import 导入

统一从 `@/common` 导入公共模块：

```typescript
import { BusinessException, CommonConstant, DeptEntity } from '@/common'
```

### 7.2 操作符导入

TypeORM 操作符从 `typeorm` 导入：

```typescript
import { Equal, In, Like, Not, Repository } from 'typeorm'
```

### 7.3 工具函数

从 `@/utils` 导入：

```typescript
import { listToTree, encryptPassword, verifyPassword } from '@/utils'
```

### 7.4 类成员访问修饰符

所有类成员方法**必须**加 `public` / `private` 修饰符，内部辅助方法使用 `private`：

```typescript
public async create() { ... }
private async checkExists() { ... }
```

### 7.5 缩进与注释

- 缩进统一使用 2 空格
- 注释使用 JSDoc 风格，标注功能描述和参数说明
