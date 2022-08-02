const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.tianqiapi.com/',
        // target: 'https://jyt.capcloud.com.cn/test.php',
        // target: 'https://www.vue-js.com',
        changeOrigin: true,
        pathRewite: {
          '^/api': '',
        },
      },
    },
  },
})
