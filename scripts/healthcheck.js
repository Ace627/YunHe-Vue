const http = require('http')

const req = http.request('http://127.0.0.1:3000/api/monitor/health/live', (res) => {
  process.exit(res.statusCode === 200 ? 0 : 1)
})

req.on('error', (err) => {
  // 👉 关键调试：把错误信息打印出来！这样 docker inspect 才能看到原因
  console.error('Health check error:', err.message)
  process.exit(1)
})
req.setTimeout(2000, () => {
  console.error('Health check timeout')
  req.destroy()
  process.exit(1)
})

req.end()
