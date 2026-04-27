<template>
  <el-form ref="modelRef" :model :rules label-width="80px">
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="model.nickname" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="model.phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="model.email" maxlength="50" />
    </el-form-item>
    <el-form-item label="用户性别" prop="gender">
      <el-radio-group
        v-model="model.gender"
        :options="[
          { label: '男', value: '0' },
          { label: '女', value: '1' },
          { label: '未知', value: '2' },
        ]"
      >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" class="w-120px" v-permissions="['system:user:update']">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserInfo' })
import { UserRequest } from '@/api/system/user.request'
import type { UserProfile } from '@/types'
import { TipModal } from '@/utils'
import type { FormRules } from 'element-plus'
import type { PropType } from 'vue'

const props = defineProps({
  user: { type: Object as PropType<UserProfile>, required: true },
})

const emits = defineEmits(['getProfile'])

const model = reactive({} as UserProfile)
const modelRef = useTemplateRef('modelRef')
const rules: FormRules<UserProfile> = {
  nickname: { required: true, message: '用户昵称不能为空', trigger: 'blur' },
  email: [
    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
}

async function submit() {
  try {
    await modelRef.value?.validate()
    await UserRequest.updateProfile(model)
    TipModal.msgSuccess('修改成功')
    emits('getProfile')
  } catch (error) {
    console.log('error: ', error)
  }
}

watch(
  () => props.user,
  (newValue) => {
    if (!newValue) return
    Object.assign(model, newValue)
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>
