<template>
  <div class="app-content lh-[1.5] text-justify">
    <el-card>
      <template #header>项目简介</template>
      <el-text>
        云禾管理系统是一款面向前端开发者进阶全栈的后台管理模板。前端基于 Vue3 + TypeScript + Element Plus + Vite，后端采用 NestJS
        搭建，已集成用户管理、角色管理、菜单管理、字典管理、定时任务、操作日志、登录日志、在线用户、缓存监控、服务监控等完善的业务模块，并封装了文件上传（含分片上传、断点续传、秒传）等企业级功能。系统代码结构清晰、注释完整、门槛低，配套全栈开发教程与示例，适合前端开发者平滑过渡全栈开发，快速建立完整的全栈工程实践能力。
      </el-text>
    </el-card>

    <el-card>
      <template #header>技术选型</template>
      <div class="tech-stack">
        <div class="tech-section">
          <h3 class="tech-section__title">通用技术</h3>
          <div class="tech-cards">
            <a v-for="tech in commonTech" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--common">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
        <div class="tech-section">
          <h3 class="tech-section__title">前端技术</h3>
          <div class="tech-cards">
            <a v-for="tech in frontTech" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--frontend">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
        <div class="tech-section">
          <h3 class="tech-section__title">后端技术</h3>
          <div class="tech-cards">
            <a v-for="tech in backTech" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--backend">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </el-card>

    <el-row class="mt-16px" :gutter="16">
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>联系信息</template>
          <div class="cursor-pointer flex items-center gap-4px">
            <span>QQ群：1041747918</span>
            <SvgIcon name="Copy" @click="copyText('1041747918')" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>更新日志</template>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.0 - 2026-04-23">
              <ol>
                <li>1、云禾前后端分离系统正式发布</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>捐赠支持</template>
          <img src="@/assets/images/pay.png" draggable="false" alt="pay" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import { TipModal, copyText } from '@/utils'

const commonTech = [
  { name: 'Lodash', url: 'http://www.lodashjs.com' },
  { name: 'DayJS', url: 'https://dayjs.fenxianglu.cn' },
  { name: 'Axios', url: 'https://www.axios-http.cn/docs/intro' },
  { name: 'TypeScript', url: 'https://typescript.p2hp.com' },
]
const frontTech = [
  { name: 'Vue3', url: 'https://cn.vuejs.org/guide/introduction' },
  { name: 'VueRouter', url: 'https://router.vuejs.org/zh' },
  { name: 'Pinia', url: 'https://pinia.vuejs.org/zh' },
  { name: 'ElementPlus', url: 'https://element-plus.org/zh-CN' },
  { name: 'UnoCSS', url: 'https://unocss.nodejs.cn' },
  { name: 'Canvas', url: 'https://www.canvasapi.cn' },
  { name: 'ECharts', url: 'https://echarts.apache.org/zh/index.html' },
  { name: 'VueUse', url: 'https://vueuse.zhcndoc.com' },
  { name: 'IconFont', url: 'https://www.iconfont.cn' },
  { name: 'NProgress', url: 'https://juejin.cn/post/7631483990629613604' },
  { name: 'Markdown', url: 'https://imzbf.github.io/md-editor-v3/zh-CN' },
  { name: 'Vite', url: 'https://cn.vitejs.dev/config' },
]
const backTech = [
  { name: 'NestJS', url: 'https://docs.nestjs.com' },
  { name: 'TypeORM', url: 'https://www.typeorm.net' },
  { name: 'MySQL', url: 'https://www.mysql.com/downloads' },
  { name: 'Redis', url: 'https://redis.io/docs/latest/commands' },
  { name: 'SvgCaptcha', url: 'https://github.com/produck/svg-captcha/blob/1.x/README_CN.md' },
  { name: 'ExcelJS', url: 'https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md' },
  { name: 'Winston', url: 'https://github.com/winstonjs/winston/blob/master/README.md' },
  { name: 'nodemailer', url: 'https://nodemailer.com' },
  { name: 'systeminformation', url: 'https://systeminformation.io' },
  { name: 'argon2', url: 'https://github.com/ranisalt/node-argon2#readme' },
  { name: 'ip2region', url: 'https://github.com/sonofmagic/node-ip2region#readme' },
  { name: 'RBAC', url: 'https://juejin.cn/post/7359086041796968482' },
]
</script>

<style lang="scss" scoped>
html[data-device='mobile'] {
  .el-col + .el-col {
    margin-top: 16px;
  }
}
ol li {
  padding-left: 1.6em;
}
.el-card + .el-card {
  margin-top: 16px;
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tech-section__title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.tech-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: var(--el-font-size-base);
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  backdrop-filter: blur(10px);

  &--common {
    color: #667eea;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border: 1px solid rgba(102, 126, 234, 0.2);
    &:hover {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }
  }

  &--frontend {
    color: #409eff;
    background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(102, 204, 255, 0.1) 100%);
    border: 1px solid rgba(64, 158, 255, 0.2);
    &:hover {
      background: linear-gradient(135deg, rgba(64, 158, 255, 0.2) 0%, rgba(102, 204, 255, 0.2) 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
    }
  }

  &--backend {
    color: #67c23a;
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.1) 0%, rgba(82, 196, 26, 0.1) 100%);
    border: 1px solid rgba(103, 194, 58, 0.2);
    &:hover {
      background: linear-gradient(135deg, rgba(103, 194, 58, 0.2) 0%, rgba(82, 196, 26, 0.2) 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(103, 194, 58, 0.2);
    }
  }
}
</style>
