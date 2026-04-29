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
            <a v-for="tech in techs.common" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--common">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
        <div class="tech-section">
          <h3 class="tech-section__title">前端技术</h3>
          <div class="tech-cards">
            <a v-for="tech in techs.frontend" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--frontend">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
        <div class="tech-section">
          <h3 class="tech-section__title">后端技术</h3>
          <div class="tech-cards">
            <a v-for="tech in techs.backend" :key="tech.name" :href="tech.url" target="_blank" class="tech-card tech-card--backend">
              <span class="tech-card__name">{{ tech.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </el-card>

    <el-row class="mt-16px" :gutter="16">
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>联系信息（QQ群）</template>
          <a :href="qqGroup.link" target="_blank" class="cursor-pointer flex items-center gap-4px" v-for="qqGroup in qqGroupList" :key="qqGroup.code">
            <img :src="qqGroup.icon" alt="" />
          </a>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>更新日志</template>
          <el-collapse accordion>
            <el-collapse-item title="v1.0.0 - 2026-04-27">
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
import { techs } from './techs'

const qqGroupList = [
  {
    code: '1041747918',
    icon: 'https://img.shields.io/badge/开放-1041747918-blue.svg',
    link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=nipJqdnRrHgP7jjLJzbuGwyayLaqrrVA&authKey=MuJj6WXuUP4QQTvs4fMAx1Pw4skUXSLYbvXVXi2X878%2FhmgrD1dxd%2BaXrHK8%2FRb6&noverify=0&group_code=1041747918',
  },
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
