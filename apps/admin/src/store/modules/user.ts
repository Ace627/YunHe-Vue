import type { LoginDto } from '@/types'
import { AuthRequest } from '@/api/auth.request'
import { removeAccessToken, setAccessToken } from '@/utils'
import defaultAvatar from '@/assets/images/default/default-avatar.gif'

export const useUserStore = defineStore('user', () => {
  const tagsViewStore = useTagsViewStore()

  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const user = ref({} as any)
  /** 用户头像 */
  const avatar = ref<string>(defaultAvatar)

  /** 登录 */
  async function login(LoginForm: LoginDto) {
    const data = await AuthRequest.login(LoginForm)
    setAccessToken(data.accessToken)
  }

  /** 获取用户信息 */
  async function getInfo() {
    const data = await AuthRequest.getInfo()
    roles.value = data.roles
    permissions.value = data.permissions
    user.value = data.user
  }

  /** 退出登录 */
  async function logout() {
    await AuthRequest.logout()
    removeAccessToken()
    tagsViewStore.clear()
  }

  return { avatar, roles, permissions, user, login, getInfo, logout }
})
