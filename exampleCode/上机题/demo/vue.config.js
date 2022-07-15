const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://jyt.capcloud.com.cn/test.php',
        changeOrigin: true,
        pathRewite: {
          "^/api": ''
        }
      }
    }
  },
})
