import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  setup() {
    const appStore = useAppStore()

    useResize()
    useDynamicTitle()

    return () => (
      <ElConfigProvider locale={zhCn} size={appStore.size}>
        <RouterView></RouterView>
      </ElConfigProvider>
    )
  },
})
