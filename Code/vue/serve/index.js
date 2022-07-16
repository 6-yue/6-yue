const http = require('http')
const serve = http.createServer((req, res) => {
  res.end("hi-tina")
})
serve.listen(8089, () => {
  console.log('服务启动，-》8089')
})