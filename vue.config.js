module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://humansa.hofo.co/',
        changeOrigin: true
      }
    }
  }
}
