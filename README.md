<p align="center">
	<img alt="logo" src="https://i.imgur.com/R6pmmto.jpeg" width="64" height="64">
</p>

<h1 align="center">YunHe v1.0.0</h1>

<h4 align="center">基于 NestJS 开发的轻量级 TypeScript 快速快速开发框架</h4>


<p align="center">
	<a href="https://gitee.com/decade9527/YunHe-Vue/stargazers">
		<img src="https://gitee.com/decade9527/YunHe-Vue/badge/star.svg?theme=gvp">
	</a>
	<a href="https://gitee.com/decade9527/YunHe-Vue">
		<img src="https://img.shields.io/badge/YunHe-v1.0.0-brightgreen.svg">
	</a>
	<a href="https://gitee.com/decade9527/YunHe-Vue/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/mashape/apistatus.svg">
	</a>
</p>

## 平台简介

YunHe-Vue 是一套轻量化全栈快速开发平台，专为前端进阶全栈开发者打造，完全开源免费供个人与企业使用。云在青天，禾在土；管理在心，事在术。不争云端之名，只守禾下之实；不炫繁复之术，但求至简之理。

- 前端采用 Vue3、Element Plus、Vite 与 TypeScript
- 后端采用 NestJS、TypeORM、Redis 与 Jwt 构建
- 权限认证基于 Jwt 实现，内置完整 RBAC 权限体系，适配多终端登录认证
- 支持动态权限菜单生成，细化角色与菜单权限，实现灵活权限管控
- 全栈一体化开发体验，统一类型约束与公共工具封装，大幅降低前后端协作成本
- 集成大文件上传、定时任务、邮件服务、系统监控等企业级常用能力，开箱即用
- 采用 pnpm monorepo 架构，前后端代码统一管理，助力前端平滑过渡全栈开发

## 使用手册

[云禾管理系统使用手册](https://ima.qq.com/wiki/?shareId=78fad61cd6b024dab9b4148c0f3e88a46e32ebeee8af7a3854c9f560e766e878)，点击即可加入该知识库，利用大模型问答，快速上手使用。

## 内置功能

- 👤 用户管理：提供用户增删改查、状态管理与密码重置，支持多条件筛选与精准查询
- 🔐 角色管理：提供角色增删改查、权限配置与用户关联，实现系统权限动态化管控
- 📑 菜单管理：提供菜单增删改查、树形结构与权限绑定，自动生成前端动态访问路由
- 📚 字典管理：提供字典增删改查、数据项维护与自定义配置，支撑系统全局基础管理
- 📝 登录日志：记录账号 IP 地点及设备信息，完整留存登录轨迹并支持数据导出操作
- 📋 操作日志：追踪全量接口请求与操作行为，多维度检索查询全站业务操作记录
- 🌐 在线用户：实时展示全网在线用户状态，监控会话信息并支持一键强制下线管控
- 💻 服务监控：监测服务器 CPU 内存磁盘负载，实时展示系统运行各项核心性能指标
- ⚙️ 缓存监控：统计 Redis 缓存占用与命中效率，结合运行数据优化整体缓存调度策略
- 🗄️ 缓存列表：统一管理 Redis 缓存键值数据，支持前缀检索内容查看与手动清理维护
- 🩺 健康检查：全方位检测网络连接、数据库、内存堆、进程内存及磁盘存储运行状态
- ⏰ 定时任务：基于 Bull 队列实现任务调度管控，结合执行日志保障自动化业务稳定
- 📄 本地日志：依托 Winston 分级日志持久存储，快速定位线上问题并排查运行异常
- ✅ 数据响应：封装全局统一标准化返回格式，规范状态码提示信息与业务数据结构
- 🛡️ 接口限流：基于 Redis 实现 IP 接口双重防护，限制高频请求杜绝恶意攻击访问
- 📁 文件上传：支持单多文件分片上传能力，限制格式大小并自定义本地存储路径
- 🚀 文件秒传：通过文件 MD5 哈希快速校验，复用已存资源节省网络传输带宽消耗
- 🔗 断点续传：兼容异常中断续传机制，无需重复上传大幅优化大文件使用体验
- 📧 邮件发送：集成 Nodemailer 企业邮件服务，适配多种模板实现业务消息推送
- 📊 表格导出：利用装饰器快速生成 Excel 报表，自定义导出字段及文件命名规则

## Docker 运维与部署

```bash
# 备份数据库到根目录（在根目录执行）
docker compose exec -T db mysqldump -u root -p yunhe > backup.sql
```

## 云禾交流群

QQ群：[![加入QQ群](https://img.shields.io/badge/开放-1041747918-blue.svg)](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=nipJqdnRrHgP7jjLJzbuGwyayLaqrrVA&authKey=MuJj6WXuUP4QQTvs4fMAx1Pw4skUXSLYbvXVXi2X878%2FhmgrD1dxd%2BaXrHK8%2FRb6&noverify=0&group_code=1041747918) 点击开放按钮即可入群。

## 环境配置

```bash
docker -v
# Docker version 29.4.1, build 055a478

node -v
# v22.17.0

pnpm -v
# 10.33.2
```

## 开源协议

本项目所有代码均遵循根目录 [LICENSE](./LICENSE) 协议。
