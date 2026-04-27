<template>
  <el-form :model :rules ref="modelRef" label-width="100px">
    <el-form-item label="旧登录密码" prop="oldPassword">
      <el-input type="password" show-password v-model.trim="model.oldPassword" placeholder="请输入旧密码"></el-input>
    </el-form-item>

    <el-form-item label="新登录密码" prop="newPassword">
      <el-input type="password" show-password v-model.trim="model.newPassword" placeholder="请输入新密码"></el-input>
    </el-form-item>

    <el-form-item label="确认新密码" prop="repeatPassword">
      <el-input type="password" show-password v-model.trim="model.repeatPassword" placeholder="请再次输入新密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button class="w-120px" type="primary" @click="submit" v-permissions="['system:user:update']">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
defineOptions({ name: 'UpdatePassword' })
import { sleep, TipModal } from '@/utils'
import { UserRequest } from '@/api/system/user.request'
import type { FormInstance, FormRules } from 'element-plus'
import type { UpdatePasswordParams } from '@/types'

const userStore = useUserStore()

const model = ref({} as UpdatePasswordParams)

const modelRef = shallowRef<FormInstance>()

const rules: FormRules<UpdatePasswordParams> = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  repeatPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }],
}

function validateParams() {
  const { oldPassword, newPassword, repeatPassword } = model.value
  if (newPassword !== repeatPassword) return `两次输入的新密码不一致`
  if (oldPassword === repeatPassword) return `新密码不可与旧密码一样`
}

async function submit() {
  try {
    await modelRef.value?.validate()
    const errMsg = validateParams()
    if (errMsg) return TipModal.msgError(errMsg)
    const actionMsg = await UserRequest.updatePassword(model.value)
    TipModal.msgSuccess(actionMsg || '修改成功')
    await sleep(1000)
    TipModal.msgWarning(`即将跳转登录页面，请稍后`)
    await sleep(1000)
    await userStore.logout()
    await sleep(1000)
    window.location.reload()
  } catch (error: any) {
    console.log('submit error: ', error)
  }
}
</script>

<style lang="scss" scoped></style>
