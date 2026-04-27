<template>
  <el-dialog v-model="visible" :title="dialogTitle" :width="dialogWidth">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="16">
        <el-col :span="12" :xs="24">
          <el-form-item label="用户账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户账号" :disabled="isUpdate" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24" v-if="!isUpdate">
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入登录密码" show-password />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入用户昵称" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入用户邮箱" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="用户性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择用户性别" style="width: 100%" :options="sys_user_gender"> </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="用户状态" prop="status">
            <el-radio-group v-model="form.status" :options="sys_normal_disable"> </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="用户角色" prop="roleIds">
            <el-select v-model="form.roleIds" placeholder="请选择用户角色" multiple clearable>
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark">
            <el-input type="textarea" :rows="4" v-model="form.remark" placeholder="请输入备注信息" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserDialog' })
import { TipModal } from '@/utils'
import type { RoleEntity, UserEntity } from '@/types'
import type { FormRules } from 'element-plus'
import { UserRequest } from '@/api/system/user.request'
import { RoleRequest } from '@/api/system/role.request'

const emits = defineEmits<{
  getList: []
}>()

const getterStore = useGetterStore()
const { sys_user_gender, sys_normal_disable } = useDict('sys_user_gender', 'sys_normal_disable')

const visible = ref<boolean>(false)

const formRef = useTemplateRef('formRef')
const form = ref({} as UserEntity)
const isUpdate = ref<boolean>(false)
const dialogWidth = computed(() => (getterStore.isDesktop ? '600px' : 'calc(100% - 32px)'))
const dialogTitle = computed(() => (isUpdate.value ? '编辑用户' : '新增用户'))
const tipMessage = computed(() => (isUpdate.value ? '编辑成功' : '新增成功'))
/** 不分页的角色表 */
const roleList = ref<Array<RoleEntity>>([])
/** 用户新增表单校验规则 */
const rules: FormRules<UserEntity> = {
  username: [{ required: true, message: '用户账号不能为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '手机号码不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '用户邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  gender: [{ required: true, message: '用户性别不能为空', trigger: 'change' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
  password: [
    { required: true, message: '登录密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' },
  ],
}

/** 打开对话框的方法 */
async function open(record?: UserEntity) {
  visible.value = true
  isUpdate.value = !!record
  resetForm(record?.id)
  roleList.value = await RoleRequest.findAll()
}

async function resetForm(userId?: string) {
  if (userId) {
    form.value = await UserRequest.findOneById({ id: userId })
    form.value.roleIds = form.value.roles.map((item) => item.id)
  } else {
    form.value = {} as UserEntity
    form.value.status = '1'
    form.value.gender = '2'
  }
}
/** 关闭对话框的方法 */
function close() {
  formRef.value?.resetFields()
  visible.value = false
}

async function handleSubmit() {
  await formRef.value?.validate()
  isUpdate.value ? await UserRequest.update(form.value) : await UserRequest.create(form.value)
  TipModal.msgSuccess(tipMessage.value)
  close()
  emits('getList')
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
