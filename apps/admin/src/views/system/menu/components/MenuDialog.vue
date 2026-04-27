<template>
  <el-dialog :title="dialogTitle" v-model="visible" :before-close="close" :width="dialogWidth">
    <el-form :model ref="modelRef" :rules label-width="80px">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <el-tree-select v-model="model.parentId" check-strictly node-key="id" :data="parentList" :props="{ label: 'menuName' }" place="请选择上级菜单" clearable>
            </el-tree-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model.trim="model.menuType">
              <el-radio label="目录" value="M" />
              <el-radio label="菜单" value="C" />
              <el-radio label="按钮" value="F" />
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="24" v-if="model.menuType !== 'F'">
          <el-form-item label="菜单图标" prop="icon">
            <el-popover placement="bottom-start" width="460" trigger="click" @show="iconSelectRef?.reset">
              <IconSelect ref="iconSelectRef" :active-icon="model.icon" @selected="selectMenuIcon" />
              <template #reference>
                <el-input v-model.trim="model.icon" placeholder="请选择菜单图标" readonly>
                  <template #prefix> <SvgIcon :name="`${model.icon ? model.icon : 'Search'}`" /> </template>
                </el-input>
              </template>
            </el-popover>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model.trim="model.menuName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="显示排序" prop="menuSort">
            <el-input-number v-model.number="model.menuSort" controls-position="right" />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="model.menuType !== 'F'">
          <el-form-item label="路由地址" prop="path">
            <el-input v-model.trim="model.path" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="model.menuType === 'C'">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model.trim="model.component" placeholder="请输入组件路径" />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="model.menuType === 'F'">
          <el-form-item label="权限字符" prop="permission">
            <el-input v-model.trim="model.permission" placeholder="请输入权限标识" maxlength="100" />
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="model.menuType !== 'F'">
          <el-form-item label="显示状态" prop="visible">
            <el-radio-group v-model="model.visible" :options="sys_menu_visible"> </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="model.status" :options="sys_normal_disable"> </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="model.menuType === 'C'">
          <el-form-item label="缓存组件" prop="isCache">
            <el-radio-group v-model="model.isCache">
              <el-radio label="是" :value="CommonConstant.STATUS_NORMAL" />
              <el-radio label="否" :value="CommonConstant.STATUS_DISABLE" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'MenuDialog' })
import type { GlobalComponents } from 'vue'
import { MenuRequest } from '@/api/system/menu.request'
import type { FormRules } from 'element-plus'
import { isExternal, isStringNumber, TipModal } from '@/utils'
import type { MenuEntity, MenuTreeEntity } from '@/types'
import { CommonConstant } from '@/common'

const emits = defineEmits<{
  getList: []
}>()

const getterStore = useGetterStore()
const { sys_normal_disable, sys_menu_visible } = useDict('sys_normal_disable', 'sys_menu_visible')

/** 表单实例对象 */
const modelRef = useTemplateRef('modelRef')
/** 图标选择组件实例 */
const iconSelectRef = ref<InstanceType<GlobalComponents['IconSelect']>>()

const parentList = ref<MenuTreeEntity[]>([])
const model = ref({} as MenuEntity)
const loading = ref<boolean>(false)
const visible = ref<boolean>(false)
const dialogWidth = computed(() => (getterStore.isDesktop ? '640px' : 'calc(100% - 32px)'))
const dialogTitle = computed(() => (isUpdate.value ? '更新菜单数据' : '新增菜单数据'))
const isUpdate = ref<boolean>(false)
const isExternalPath = computed(() => isExternal(model.value.path))
/** 菜单新增表单校验规则 */
const rules: FormRules<MenuEntity> = {
  path: { required: true, message: '路由地址不可为空', trigger: 'blur' },
  menuSort: { required: true, message: '菜单顺序不能为空', trigger: 'blur' },
  menuName: { required: true, message: '菜单名称不可为空', trigger: 'blur' },
}

async function open(mode: 'create' | 'update', menu?: MenuEntity) {
  visible.value = true
  isUpdate.value = mode === 'update'
  if (isUpdate.value && menu) {
    model.value = await MenuRequest.findOneById({ id: menu.id })
  } else {
    if (menu && menu.menuType === 'M') model.value.menuType = 'C' // 目录新增切换菜单类型
    model.value.parentId = menu ? (menu.menuType === 'F' ? menu.parentId : menu.id) : '0'
    model.value.status = CommonConstant.STATUS_NORMAL
    model.value.visible = CommonConstant.STATUS_NORMAL
    model.value.isCache = CommonConstant.STATUS_DISABLE
    model.value.menuType = menu && ['F', 'C'].includes(menu.menuType) ? 'F' : 'M'
    model.value.menuSort = menu && menu.menuType === 'F' ? menu.menuSort + 1 : 1
  }
  parentList.value = await MenuRequest.findParentList()
}

/** 图标选择框改变的回调 */
function selectMenuIcon(name: string) {
  model.value.icon = name
}

/** 关闭对话框的方法 */
function close() {
  if (loading.value) return TipModal.msg('数据处理中，请勿操作')
  modelRef.value?.resetFields()
  visible.value = false
}

/** 表单提交 */
async function submit() {
  try {
    await modelRef.value?.validate()
    loading.value = true
    if (isStringNumber(model.value.path)) return TipModal.msgError('菜单路径不允许为纯数字')
    if (isExternalPath.value) Reflect.deleteProperty(model.value, 'component')
    isUpdate.value ? await MenuRequest.update(model.value) : await MenuRequest.create(model.value)
    emits('getList')
    loading.value = false
    close()
  } catch (error) {
    loading.value = false
    console.log('submit error: ', error)
  }
}

/** 支持父组件调用的方法 */
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
