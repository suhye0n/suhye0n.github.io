module.exports = {
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/suhye0n.github.io/'
    : '/',
    outputDir: 'docs'
}