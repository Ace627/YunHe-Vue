<template>
  <el-dialog v-model="visible" :title="dialogTitle" :close-on-click-modal="false" :width="dialogWidth">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="form.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-select v-model="form.jobGroup" placeholder="请选择任务组名" style="width: 100%" :options="sys_job_group"> </el-select>
      </el-form-item>
      <el-form-item label="调用目标" prop="invokeTarget">
        <el-input v-model="form.invokeTarget" placeholder="请输入调用目标" />
      </el-form-item>
      <el-form-item label="执行表达式" prop="cronExpression">
        <el-input v-model="form.cronExpression" placeholder="请输入 cron 执行表达式" />
      </el-form-item>
      <el-form-item label="并发执行" prop="concurrent">
        <el-radio-group v-model="form.concurrent">
          <el-radio value="1">允许</el-radio>
          <el-radio value="0">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="计划策略" prop="misfirePolicy">
        <el-select v-model="form.misfirePolicy" placeholder="请选择计划策略" style="width: 100%">
          <el-option label="立即执行" value="1" />
          <el-option label="执行一次" value="2" />
          <el-option label="放弃执行" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-radio-group v-model="form.status" :options="sys_job_status"> </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'JobDialog' })
import { TipModal } from '@/utils'
import type { JobEntity } from '@/types'
import type { FormRules } from 'element-plus'
import { JobRequest } from '@/api/monitor/job.request'

const emits = defineEmits<{
  getList: []
}>()

const getterStore = useGetterStore()
const { sys_job_group, sys_job_status } = useDict('sys_job_group', 'sys_job_status')

const visible = ref<boolean>(false)
const formRef = useTemplateRef('formRef')
const form = ref({} as JobEntity)
const isUpdate = ref<boolean>(false)
const dialogWidth = computed(() => (getterStore.isDesktop ? '600px' : 'calc(100% - 32px)'))
const dialogTitle = computed(() => (isUpdate.value ? '编辑定时任务' : '新增定时任务'))
const tipMessage = computed(() => (isUpdate.value ? '编辑成功' : '新增成功'))

const rules: FormRules<JobEntity> = {
  jobName: [{ required: true, message: '任务名称不能为空', trigger: 'blur' }],
  jobGroup: [{ required: true, message: '任务组名不能为空', trigger: 'blur' }],
  invokeTarget: [{ required: true, message: '调用目标不能为空', trigger: 'blur' }],
  cronExpression: [{ required: true, message: '执行表达式不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
}

async function open(record?: JobEntity) {
  visible.value = true
  isUpdate.value = !!record
  resetForm(record?.id)
}

async function resetForm(id?: string) {
  if (id) {
    form.value = await JobRequest.findOneById({ id })
  } else {
    form.value = {} as JobEntity
    form.value.status = '1'
    form.value.concurrent = '0'
    form.value.misfirePolicy = '1'
  }
}

function close() {
  formRef.value?.resetFields()
  visible.value = false
}

async function handleSubmit() {
  await formRef.value?.validate()
  isUpdate.value ? await JobRequest.update(form.value) : await JobRequest.create(form.value)
  TipModal.msgSuccess(tipMessage.value)
  close()
  emits('getList')
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
