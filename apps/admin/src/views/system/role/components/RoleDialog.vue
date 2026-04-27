<template>
  <el-dialog v-model="visible" :title="dialogTitle" :close-on-click-modal="false" :width="dialogWidth">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model.trim="form.roleCode" placeholder="请输入角色编码" :disabled="isUpdate" />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色排序" prop="roleSort">
        <el-input-number v-model="form.roleSort" :min="1" :max="999" placeholder="请输入角色排序" style="width: 50%" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" :options="sys_normal_disable"> </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="form.remark" type="textarea" placeholder="请输入备注" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'RoleDialog' })
import { TipModal } from '@/utils'
import type { RoleEntity } from '@/types'
import type { FormRules } from 'element-plus'
import { RoleRequest } from '@/api/system/role.request'

const emits = defineEmits<{
  getList: []
}>()

const getterStore = useGetterStore()
const { sys_normal_disable } = useDict('sys_normal_disable')

const visible = ref<boolean>(false)

const formRef = useTemplateRef('formRef')
const form = ref({} as RoleEntity)
const isUpdate = ref<boolean>(false)
const dialogWidth = computed(() => (getterStore.isDesktop ? '600px' : 'calc(100% - 32px)'))
const dialogTitle = computed(() => (isUpdate.value ? '编辑角色' : '新增角色'))
const tipMessage = computed(() => (isUpdate.value ? '编辑成功' : '新增成功'))

const rules: FormRules<RoleEntity> = {
  roleCode: [{ required: true, message: '角色编码不能为空', trigger: 'blur' }],
  roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
  roleSort: [{ required: true, message: '角色排序不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
}

async function open(record?: RoleEntity) {
  visible.value = true
  isUpdate.value = !!record
  resetForm(record?.id)
}

async function resetForm(roleId?: string) {
  if (roleId) {
    form.value = await RoleRequest.findOneById({ id: roleId })
  } else {
    form.value = {} as RoleEntity
    form.value.status = '1'
    form.value.roleSort = 1
  }
}

function close() {
  formRef.value?.resetFields()
  visible.value = false
}

async function handleSubmit() {
  await formRef.value?.validate()
  isUpdate.value ? await RoleRequest.update(form.value) : await RoleRequest.create(form.value)
  TipModal.msgSuccess(tipMessage.value)
  close()
  emits('getList')
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
