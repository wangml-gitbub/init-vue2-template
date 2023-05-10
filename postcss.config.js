// npm install postcss postcss-pxtorem --save-dev
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 1,
      propList: ['*', '!font-size', '!border'] //字体 边框不需要缩放
    })
  ]
}
