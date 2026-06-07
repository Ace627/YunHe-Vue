import { merge } from 'lodash-es'
import { defaultSettings } from '@/settings'
import { tint, shade } from '@yunhe/utils'
import { getSystemSetting, removeSystemSetting, setSystemSetting, TipModal, type SystemSetting } from '@/utils'

export const useSettingStore = defineStore('setting', () => {
  const state = reactive<SystemSetting>(merge({}, defaultSettings, getSystemSetting()))

  /** 是否显示设置面板 */
  const showSetting = ref<boolean>(false)

  /** 保存设置到本地 */
  function saveSetting(config: Partial<{ showTip: boolean }> = {}) {
    const showTip = config.showTip ?? true
    if (showTip) TipModal.showLoading('正在保存到本地，请稍候...')
    setSystemSetting(toRaw(state))
    if (showTip) setTimeout(() => TipModal.hideLoading(), 1500)
  }

  /** 重置设置并刷新页面 */
  function resetSetting() {
    TipModal.showLoading('正在清除设置缓存并刷新，请稍候...')
    removeSystemSetting()
    setTimeout(() => window.location.reload(), 1500)
  }

  function setPrimaryColor(color: string = state.primaryColor) {
    const colors: Record<string, string> = {
      primary: color,
      'primary-light-3': tint(color, 0.3),
      'primary-light-5': tint(color, 0.5),
      'primary-light-7': tint(color, 0.7),
      'primary-light-8': tint(color, 0.8),
      'primary-light-9': tint(color, 0.9),
      'primary-dark-2': shade(color, 0.2),
    }
    for (const key in colors) {
      document.documentElement.style.setProperty(`--el-color-${key}`, colors[key])
    }
  }

  if (state.primaryColor !== defaultSettings.primaryColor) setPrimaryColor(state.primaryColor)

  return { ...toRefs(state), showSetting, saveSetting, resetSetting, setPrimaryColor }
})
