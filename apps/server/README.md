## 开发

```bash
# 克隆项目
git clone https://gitee.com/decade9527/YunHe-Vue.git

# 进入项目目录
cd YunHe-Vue/apps/server

# 安装依赖
pnpm i

# 启动开发服务，开发环境下，数据库迁移会自动执行
# dev 之前请先去 `config/config.yaml`配置数据库连接信息
pnpm start:dev
```

🌐 后端服务地址：http://localhost:13579

## 发布

```bash
# 构建生产环境代码
pnpm build

# 加密构建（编译 + 代码加密）
pnpm build:encrypt
```

## 部署

```bash
# 生产环境启动（需先执行 pnpm build:encrypt）
pnpm start:deploy
```

## 数据库迁移

```bash
# 生成迁移文件
pnpm migration:generate

# 执行迁移
pnpm migration:run

# 回滚迁移
pnpm migration:revert
```

## 必要配置

- 先去 `config/config.yaml` 中配置各种需要的配置，包括数据库连接信息、认证密钥等
- 初始化数据库在 `database/init.sql` 中，需要在数据库中执行一次，创建数据库表结构，初始化数据库数据
