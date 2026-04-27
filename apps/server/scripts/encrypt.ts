import { sync } from 'glob'
import { rmSync } from 'fs'
import { execSync } from 'child_process'

console.log('🔐 开始加密 dist 目录下的 JS 文件...')

// 递归查找 dist 下所有 .js 文件
const files = sync('dist/**/*.js', { absolute: false })

if (files.length === 0) {
  console.log('⚠️ 未找到任何 JS 文件，跳过加密')
  process.exit(0)
}

console.log(`📂 找到 ${files.length} 个文件待加密`)

for (const file of files) {
  try {
    console.log(`加密：${file}`)
    execSync(`bytenode --compile "${file}"`, { stdio: 'inherit' })
    // 加密成功后 删除原 js 文件
    rmSync(file, { force: true })
    console.log(`✅ 已删除原文件：${file}`)
  } catch (error: any) {
    console.error('❌ 加密失败：', file, error.message)
  }
}

console.log('🎉 所有文件加密完成！仅保留 .jsc 字节码')
