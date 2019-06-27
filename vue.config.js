module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://humansa.hofo.co/',
        changeOrigin: true
      }
    }
  }
}
