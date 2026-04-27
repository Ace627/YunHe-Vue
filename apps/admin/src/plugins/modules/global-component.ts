import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import DictTag from '@/components/DictTag/index.vue'
import Markdown from '@/components/Markdown/index.vue'
import ProChart from '@/components/ProChart/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import IconSelect from '@/components/IconSelect/index.vue'
import ProPagination from '@/components/ProPagination/index.vue'

export function registerGlobalComponent(app: App<any>) {
  app.component('SvgIcon', SvgIcon)
  app.component('DictTag', DictTag)
  app.component('IconSelect', IconSelect)
  app.component('Markdown', Markdown)
  app.component('ProChart', ProChart)
  app.component('ProTable', ProTable)
  app.component('ProPagination', ProPagination)
}
