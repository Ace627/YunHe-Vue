import { GlobalComponents } from 'vue'

export {}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: (typeof import('../src/components/SvgIcon/index.vue'))['default']
    DictTag: (typeof import('../src/components/DictTag/index.vue'))['default']
    Markdown: (typeof import('../src/components/Markdown/index.vue'))['default']
    IconSelect: (typeof import('../src/components/IconSelect/index.vue'))['default']
    ProChart: (typeof import('../src/components/ProChart/index.vue'))['default']
    ProTable: (typeof import('../src/components/ProTable/index.vue'))['default']
    ProPagination: (typeof import('../src/components/ProPagination/index.vue'))['default']
  }
}
