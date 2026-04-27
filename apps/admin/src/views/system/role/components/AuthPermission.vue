<template>
  <el-drawer v-model="visible" :with-header="false" :size="260">
    <div class="flex flex-col h-full">
      <div class="title-container flex items-center mb-16px">
        <div class="fw-bold tracking-widest">角色权限分配</div>
      </div>

      <div class="flex-grow-1 overflow-y-auto h-0">
        <el-tree
          ref="menuTreeRef"
          :data="treeList"
          node-key="id"
          :props="{ label: 'menuName' }"
          show-checkbox
          :check-strictly="!checkStrictly"
          default-expand-all
          :defaultCheckedKeys
        ></el-tree>
      </div>

      <footer class="flex-center">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </footer>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'AuthPermission' })
import { ElTree } from 'element-plus'
import { TipModal, listToTree } from '@/utils'
import { MenuRequest } from '@/api/system/menu.request'
import { RoleRequest } from '@/api/system/role.request'
import type { MenuTreeEntity } from '@/types'
import { CommonConstant } from '@/common'

const emits = defineEmits(['getList'])

/** 抽屉是否可见 */
const visible = ref(false)
/** 是否开启父子联动 */
const checkStrictly = ref<boolean>(false)
/** 默认展开的节点的 key 的数组 */
const defaultCheckedKeys = ref<number[]>([])
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const treeList = ref<MenuTreeEntity[]>([])
const roleId = ref<string>('')

async function findTreeList() {
  const data = await MenuRequest.findList({ status: CommonConstant.STATUS_NORMAL })
  treeList.value = listToTree(data)
}

/** 打开角色授权抽屉的操作 */
async function handleOpen(id: string) {
  roleId.value = id
  visible.value = true
  await findTreeList()
  const menus = await MenuRequest.findListByRoleId({ roleId: roleId.value })
  const menuIds = menus.map((menu) => menu.id) || []
  menuTreeRef.value?.setCheckedKeys(menuIds)
}

/** 关闭角色授权抽屉的操作 */
function handleCancel() {
  visible.value = false
}

/** 提交角色授权数据 */
async function handleSubmit() {
  // 获取选中的父节点数据
  const parentIds = menuTreeRef.value?.getHalfCheckedKeys() ?? []
  // 获取选中的子节点数据
  const childIds = menuTreeRef.value?.getCheckedKeys() ?? []
  const menuIds = parentIds.concat(childIds) as string[]
  await RoleRequest.authPermission({ roleId: roleId.value, menuIds })
  TipModal.msgSuccess(`授权成功`)
  visible.value = false
  emits('getList')
}

defineExpose({ handleOpen })
</script>

<style lang="scss" scoped></style>
