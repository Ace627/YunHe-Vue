<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper flex-center">
      <!-- <el-avatar :src="userStore.avatar" :size="36" alt="avatar" class="user-avatar" /> -->
      <img :src="getterStore.avatar" class="user-avatar" />
      <span class="user-nickname"> {{ getterStore.nickname }} </span>
    </div>

    <template #dropdown>
      <el-dropdown-item v-for="(item, index) in items" :key="index" @click="item.callback">
        <SvgIcon :name="item.icon" />
        <span class="ml-4px">{{ item.title }}</span>
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserDropDown' })
import { TipModal } from '@/utils'

const router = useRouter()
// const appStore = useAppStore()
const userStore = useUserStore()
const settingStore = useSettingStore()
const getterStore = useGetterStore()

const items = [
  { icon: 'User', title: '个人中心', callback: () => router.push('/user/profile') },
  { icon: 'Setting', title: '系统设置', callback: () => (settingStore.showSetting = true) },
  { icon: 'Delete', title: '清空缓存', callback: clearCache },
  { icon: 'SwitchButton', title: '退出登录', callback: handleLogout },
]

/** 清空缓存 */
async function clearCache() {
  const { cancel } = await TipModal.confirm(`确定清空所有本地缓存并重启系统吗？`)
  if (cancel) return TipModal.msg('操作取消')
  localStorage.clear()
  window.location.reload()
}

/** 退出登录 */
async function handleLogout() {
  const { cancel } = await TipModal.confirm(`确定退出系统吗？`)
  if (cancel) return TipModal.msg('操作取消')
  await userStore.logout()
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  gap: 4px;
  .user-avatar {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .user-nickname {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
