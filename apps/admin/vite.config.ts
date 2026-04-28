import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite' // Vite Plugins
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://cn.vite.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const viteEnv = loadEnv(mode, process.cwd(), 'VITE_') as unknown as ImportMetaEnv

  return {
    // 部署应用包时的基本 URL
    base: viteEnv.VITE_PUBLIC_PATH ?? '/',

    plugins: [
      // 提供 Vue 3 单文件组件支持
      vue(),
      /** 提供 Vue 3 JSX/TSX 支持 */
      vueJsx(),
      // 即时按需的原子化 CSS 引擎 UnoCSS
      UnoCSS({ inspector: false }),
      // Element Plus 样式自动按需导入
      ElementPlus({ useSource: true }),
      // 自动导入 vue、vue-router、Pinia 等的相关函数
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        dts: 'types/auto-generate/auto-import.d.ts',
        dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
      }),
      // 组件及其类型的自动化导入
      AutoComponents({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        dts: 'types/auto-generate/auto-components.d.ts',
        dirs: [], // 配置其它需要导入的文件目录
      }),
      // 自动导入 SVG 图标组件
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        symbolId: 'icon-[dir]-[name]',
        // bakerOptions: {
        //   svgoOptions: {
        //     plugins: [
        //       {
        //         name: 'removeAttrs',
        //         params: {
        //           attrs: ['fill', 'class', 'version', 't', 'p-id', 'width', 'height'],
        //         },
        //       },
        //     ],
        //   },
        // },
      }),
    ],

    resolve: {
      alias: {
        /** 设置 `@` 指向 `src` 目录 */
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      //  设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      host: true,
      // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
      port: parseInt(viteEnv.VITE_SERVER_PORT),
      // 是否自动打开浏览器
      open: viteEnv.VITE_AUTO_OPEN === 'true',
      /** 反向代理配置（主要是开发时用来解决跨域问题） */
      proxy: {
        [viteEnv.VITE_BASE_API]: {
          target: viteEnv.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/dev-api', ''),
        },
      },
    },

    build: {
      sourcemap: false,
      // 指定打包文件的输出目录。默认值为 dist ，当 dist 被占用或公司有统一命名规范时，可进行调整
      outDir: viteEnv.VITE_OUTPUT_DIR,
      // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认使用 Oxc Minifier，它比 terser 快 30~90 倍，但压缩率仅差 0.5~2%
      minify: 'oxc',
      // 警告阈值，超过该值的 chunk 会触发警告。默认值为 2048（2MB）
      chunkSizeWarningLimit: 2048,
      // 直接自定义底层 Rolldown 包。这与从 Rolldown 配置文件导出的选项相同，并将与 Vite 的内部 Rolldown 选项合并
      rolldownOptions: {
        checks: {
          pluginTimings: false,
        },
        output: {
          // 引入文件名的名称
          chunkFileNames: 'js/[name]-[hash].js',
          // 包的入口文件名称
          entryFileNames: 'js/[name]-[hash].js',
          // 打包的文件进行拆包处理
          manualChunks(chunk) {
            console.log('chunk: ', chunk)
            // 这个 chunk 就是所有文件的绝对路径
            // 因为 node_modules 中的依赖通常是不会改变的 所以直接单独打包出去
            // 这个 return 的值就是打包的名称
            // 可以利用浏览器的缓存机制 减少请求次数
            if (chunk.includes('pinia')) return 'pinia'
            if (chunk.includes('echarts')) return 'echarts'
            if (chunk.includes('vue-router')) return 'vue-router'
            if (chunk.includes('markdown-it')) return 'markdown-it'
            if (chunk.includes('codemirror')) return 'codemirror'
            if (chunk.includes('element-plus')) return 'element-plus'
            if (chunk.includes('dayjs') || chunk.includes('axios') || chunk.includes('lodash-es')) return 'utils'
            if (chunk.includes('node_modules')) return 'vendor'
          },
          minify: {
            compress: {
              // 是否移除 console 语句（环境变量不为 'false' 时启用，默认启用）
              dropConsole: viteEnv.VITE_DROP_CONSOLE !== 'false',
              // 是否移除 debugger 调试语句（环境变量不为 'false' 时启用，默认启用）
              dropDebugger: viteEnv.VITE_DROP_DEBUGGER !== 'false',
            },
          },
        },
      },
    },

    optimizeDeps: {
      include: ['element-plus', 'axios', 'dayjs', 'vue-router', 'pinia'],
    },

    css: {
      /**
       * 如果启用了这个选项，那么 CSS 预处理器会尽可能在 worker 线程中运行；即通过多线程运行 CSS 预处理器，从而极大提高其处理速度
       * https://cn.vitejs.dev/config/shared-options#css-preprocessormaxworkers
       */
      preprocessorMaxWorkers: true,
      /**
       * 建议只用来嵌入 SCSS 的变量声明文件，嵌入后全局可用
       * 该选项可以用来为每一段样式内容添加额外的代码。但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。
       * https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions-extension-additionaldata
       */
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element-plus/el-theme-var.scss" as *;`,
        },
      },
    },
  }
})
