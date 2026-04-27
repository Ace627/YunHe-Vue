import type { Directive } from 'vue'

/**
 * 自定义权限校验指令：v-permissions
 * @description 根据用户权限列表，控制 DOM 元素的显示/隐藏（无权限则移除元素）
 * @usage <button v-permissions="['system:user:add']">新增用户</button>
 * @throws 绑定值非数组/空数组时抛出错误，提示正确使用方式
 */
export const permissions: Directive = {
  /**
   * 指令挂载阶段执行（元素插入 DOM 时）
   * @param el 绑定指令的 DOM 元素
   * @param binding 指令绑定信息（value 为权限编码数组）
   */
  mounted(el: HTMLElement, binding) {
    // 获取指令绑定的权限编码数组
    const bindPermissions: string[] = binding.value
    // 校验绑定值格式：必须是非空数组
    if (Array.isArray(bindPermissions) && bindPermissions.length) {
      // 判断用户是否拥有指令指定的任意权限
      const hasPermission = useUserStore().permissions.some((permission) => bindPermissions.includes(permission))
      // 无权限则移除当前 DOM 元素
      if (!hasPermission) el.remove()
    } else {
      throw new Error(`v-permissions 权限校验指令编码组缺失，请参考 v-permissions="['*:*:*']" 使用`)
    }
  },
}
