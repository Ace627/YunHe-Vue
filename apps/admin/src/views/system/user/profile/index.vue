<template>
  <div class="app-content">
    <el-row :gutter="16">
      <el-col :md="7" :xl="24">
        <el-card v-if="!loading">
          <template #header>个人信息</template>
          <el-descriptions :column="1">
            <el-descriptions-item label="用户昵称">{{ userInfo.nickname }}</el-descriptions-item>
            <el-descriptions-item label="手机号码">{{ userInfo.phone }}</el-descriptions-item>
            <el-descriptions-item label="用户邮箱">{{ userInfo.email }}</el-descriptions-item>
            <el-descriptions-item label="所属角色">{{ userInfo.roleGroup.join(' / ') }}</el-descriptions-item>
            <el-descriptions-item label="创建日期">{{ dayjs(userInfo.createTime).format('YYYY-MM-DD HH:mm:ss') }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <el-col :md="17" :xl="24">
        <el-card>
          <el-tabs>
            <el-tab-pane label="基本信息">
              <UserInfo :user="userInfo" @getProfile="getProfile" />
            </el-tab-pane>
            <el-tab-pane label="修改密码">
              <UpdatePassword />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Profile' })
import UserInfo from './UserInfo.vue'
import UpdatePassword from './UpdatePassword.vue'
import { UserRequest } from '@/api/system/user.request'
import type { UserProfile } from '@/types'
import dayjs from 'dayjs'

const loading = ref<boolean>(false)
const userInfo = ref({} as UserProfile)

async function getProfile() {
  try {
    loading.value = true
    userInfo.value = await UserRequest.getProfile()
    loading.value = false
  } catch (error) {
    loading.value = false
    return Promise.reject(error)
  }
}

getProfile()
</script>

<style lang="scss" scoped>
:deep() .el-descriptions__label {
  font-weight: bold;
}

html[data-device='mobile'] .el-col + .el-col {
  margin-top: 16px;
}
</style>
