export const useGetterStore = defineStore('getter', () => {
  const appStore = useAppStore()
  const userStore = useUserStore()

  return {
    avatar: computed(() => userStore.avatar),
    nickname: computed(() => userStore.user.nickname || '用户昵称'),
    isDesktop: computed(() => appStore.device === 'desktop'),
    isMobile: computed(() => appStore.device === 'mobile'),
  }
})
