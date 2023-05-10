# vue2-init

## 一、技术栈

vue2 + vue-router + vuex + webpack + es6
UI:

## 二、项目开发流程

1. 安装 Node(V16.17.0) 、npm
2. 拉取代码后进入项目，安装依赖 `npm install`
3. 启动项目: `npm run dev`
4. 修改文件后，进行代码提交：[Git 提交规范-代码类](https://docs.sofunny.io/pages/viewpage.action?pageId=1129167)
5. 打包: `npm run build`

## 三、开发命令

安装依赖 `npm install`
项目启动 `npm run serve`
代码打包 `npm run build`
代码修复 `npm run lint`

## 六、代码基础架构说明

```bash
|-- 根目录
    |-- dist 项目 build 产物
    |-- build 镜像打包配置文件
    |-- public 项目静态资源，不经过 webpack，以及默认的模版，适合存放第三方压缩好的资源
    |-- src 主要的开发目录
    | |-- App.vue 页面渲染根节点
    | |-- main.js 入口文件
    | |-- api  接口
    | | |-- xxx.js
    | |-- assets 存放静态资源，这个文件夹下的文件会走 webpack 压缩流程
    | | |-- 图片等
    | |-- components
    | | |-- ...其他非全局注册的模块
    | |-- plugins 存放第三方插件
    | | |-- xxx
    | |-- router 路由
    | | |-- index.js 路由入口
    | |-- store vuex
    | | |-- index.js
    | |-- styles 全局样式
    | | |-- xxx.less
    | |-- utils 常用函数以及其他工具
    | | |-- auth.js
    | | |-- axios.js
    | | |-- common.js
    | | |-- contants.js
    | |-- views 页面级组件
    |-- .env.development 开发环境配置
    |-- .env.production 生产环境配置
    |-- .eslintignore eslint 要忽略的文件夹
    |-- .gitignore git 忽略的文件
    |-- babel.config.js babel 设置
    |-- js.config.js js 设置
    |-- package.json npm 配置
    |-- package-lock.json npm 包版本锁定配置
    |-- README.md 项目说明
    |-- vue.config.js vue-cli 脚手架配置文件
```

## 适配

```bash
# 安装 postcss-pxtorem
npm install postcss postcss-pxtorem --save-dev

# 项目根目录下新建 postcss.config.js 文件
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 1,
      propList: ['*', '!font-size'] //字体不需要缩放
    })
  ]
}
```
