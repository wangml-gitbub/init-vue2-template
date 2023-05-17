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



# 入口文件 main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { windowResize, setDomFontSizeByDevice } from './utils/common'


setDomFontSizeByDevice()
windowResize()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')




# common.js 文件
// 根据不同设备（PC or 手机）来设置根节点 fontsize
export function setDomFontSizeByDevice() {
  const isMobileDev = isMobile()
  let fontsize = ''
  let width = document.documentElement.clientWidth || document.body.clientWidth
  if (isMobileDev) {
    fontsize = width / 375 + 'px'
  } else {
    fontsize = width / width + 'px'
  }
  document.getElementsByTagName('html')[0].style['font-size'] = fontsize
}

export function windowResize() {
  let setDomFontSizeDebounce = _.debounce(setDomFontSizeByDevice, 400)
  window.addEventListener('resize', setDomFontSizeDebounce)
}
```

## 自定义字体包引入

1、UI 提供 . ttf / .otf 字体包，放置工程文件 assets/fonts 文件夹中
2、工程项目 style 文件夹中新建 font.scss

```scss
@font-face {
  font-family: 'zidingyi';
  src: url('@/assects/font/zdy.ttf');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'aaa';
  src: url('@/assects/font/aaa.ttf');
  font-weight: normal;
  font-style: normal;
}
```

3、工程项目入口文件 main.js 中引入 font.scss

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/font.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
```

4、组件样式文件中使用字体包

```css
<style lang="scss" scoped>
.dddd {
  font-size: 14px;
  font-family: 'zdy';
  color: #555;
}

.dddd {
  font-family: 'aaa';
  color: #555;
}
</style>
```

## Centrifugo

一、本机安装 Centrifugo

```bash
# 如果不确定您需要哪个发行版，那么在 Linux 或 MacOS 上，可以使用以下命令将 centrifugo 二进制文件下载并解压到您当前的工作目录
curl -sSLf https://centrifugal.dev/install.sh | sh

# 查看 Centrifugo 的版本
./centrifugo version

# Centrifugo 需要一个包含多个密钥的配置文件。如果您是 Centrifugo 的新手，那么可以使用genconfig生成最小配置文件的命令开始
./centrifugo genconfig

# config.json它在当前目录（默认情况下）中创建一个配置文件，其中包含一些自动生成的选项值.有了配置文件，您终于可以运行 Centrifugo 实例了
./centrifugo --config=config.json



# 如果在 macOS 上进行开发，那么可以通过以下方式安装 Centrifugo brew
brew tap centrifugal/centrifugo
brew install centrifugo

```

二、本机启用管理 Web 界面

```bash
# 方式1：使用内置的管理 Web 界面启动 Centrifugo
./centrifugo --config=config.json --admin


# 方式二： 修改 config.json 文件的 "admin": true 来启用管理 Web 界面，然后仅使用配置文件的路径运行 Centrifugo
# 修改 config.json 文件
{
  "token_hmac_secret_key": "bbe7d157-a253-4094-9759-06a8236543f9",
  "admin": true,
  "admin_password": "d0683813-0916-4c49-979f-0e08a686b727",
  "admin_secret": "4e9eafcf-0120-4ddd-b668-8dc40072c78e",
  "api_key": "d7627bb6-2292-4911-82e1-615c0ed3eebb",
  "allowed_origins": []
}
# 然后仅使用配置文件的路径运行 Centrifugo，使用 config.json 文件的 admin_password 值登录
./centrifugo --config=config.json
```

三、本机实现一个 centrifugo 实例
1、为客户端提供一个有效的 JWT（JSON Web Token）进行验证

```bash
./centrifugo gentoken -u 123722
```

2、准备一个静态 html

```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>test centrifugo</title>
</head>
<body>
  <div id="counter">-</div>
  <script src="https://unpkg.com/centrifuge@4.1.3/dist/centrifuge.js"></script>
  <script type="text/javascript">
  const container = document.getElementById('counter');

    const centrifuge = new Centrifuge("ws://localhost:8000/connection/websocket", {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2ODQxMTk4MTUsImlhdCI6MTY4MzUxNTAxNX0.Qxc1ckPXHcIwSkLOHjidME8yy8NrbHWce4icQSmtO-Y"
    });

    centrifuge.on('connecting', function (ctx) {

      console.log(`connecting: ${ctx.code}, ${ctx.reason}`);

    }).on('connected', function (ctx) {

      console.log(`connected over ${ctx.transport}`);

    }).on('disconnected', function (ctx) {

      console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);

    }).connect();

    const sub = centrifuge.newSubscription("channel");

    sub.on('publication', function (ctx) {

      container.innerHTML = ctx.data.value;
      document.title = ctx.data.value;

    }).on('subscribing', function (ctx) {

      console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);

    }).on('subscribed', function (ctx) {

      console.log('subscribed', ctx);

    }).on('unsubscribed', function (ctx) {

      console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);

    }).subscribe();
  </script>
</body>
</html>
```

3、修改 config.json 文件， 配置 allowed_origins 允许 Web 浏览器的请求， 配置 allow_subscribe_for_client 允许所有经过身份验证的客户端订阅任何频道

```bash
{
  "token_hmac_secret_key": "dc783ecd-961a-411f-9fe6-e34839cfff54",
  "admin": true,
  "admin_password": "8df644dd-d49d-471a-9da2-bfff75c547b6",
  "admin_secret": "c270ac3a-64f7-4141-a3ef-ffb9f8c9880d",
  "api_key": "2e4c5a31-a04c-4e17-9039-da717fa3d99e",
  "allowed_origins": ["http://localhost:3000"],
  "allow_subscribe_for_client": true
}

```

4、运行 Centrifugo 服务器

```bash
./centrifugo --config=config.json
```

5、启动一个简单的静态文件 Web 服务器, 该服务器在端口 3000 上为当前目录提供服务。确保仍在运行 Centrifugo 服务器时，打开 [http://localhost:3000/
](http://localhost:3000/
)

```bash
./centrifugo serve --port 3000
```

## git changelog 自动生成

1、安装依赖

```bash
npm install conventional-changelog conventional-changelog-cli --save-dev

or

yarn add conventional-changelog conventional-changelog-cli --save-dev
```

2、添加脚本：package.json 文件中的 scripts 增加 changelog 命令

```bash
{
  "scripts": {
     "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

3、生成 CHANGELOG.md 文件: 直接运行下面的命令即可

```bash
npm run changelog
```

## 自定义的 git changelog 自动生成

1、安装依赖

```bash
npm install conventional-changelog conventional-changelog-cli conventional-changelog-custom-config compare-func --save-dev
```

2、项目根目录新建  changelog-option.js 文件，自定义配置 changelog 的内容。[可参考这里](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-eslint/writer-opts.js)

```js
const compareFunc = require('compare-func')
module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })
      if (commit.type === 'feat') {
        commit.type = '✨ Features | 新功能'
      } else if (commit.type === 'fix') {
        commit.type = '🐛 Bug Fixes | Bug 修复'
      } else if (commit.type === 'perf') {
        commit.type = '⚡ Performance Improvements | 性能优化'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = '⏪ Reverts | 回退'
      } else if (discard) {
        return
      } else if (commit.type === 'docs') {
        commit.type = '📝 Documentation | 文档'
      } else if (commit.type === 'style') {
        commit.type = '💄 Styles | 风格'
      } else if (commit.type === 'refactor') {
        commit.type = '♻ Code Refactoring | 代码重构'
      } else if (commit.type === 'test') {
        commit.type = '✅ Tests | 测试'
      } else if (commit.type === 'build') {
        commit.type = '👷‍ Build System | 构建'
      } else if (commit.type === 'ci') {
        commit.type = '🔧 Continuous Integration | CI 配置'
      } else if (commit.type === 'chore') {
        commit.type = '🎫 Chores | 其他更新'
      }


      if (commit.scope === '*') {
        commit.scope = ''
      }
      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)

      }
      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })
      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
```

3、添加脚本：package.json 文件中的 scripts 增加 changelog 命令

```bash
{
  "scripts": {
    "changelog": "conventional-changelog -p custom-config -i CHANGELOG.md -s -n ./changelog-option.js -w -r 0"
  }
}
```

4、生成 CHANGELOG.md 文件: 直接运行下面的命令即可

```bash
npm run changelog
```

参考：
[https://blog.csdn.net/qq_41887214/article/details/124183764](https://blog.csdn.net/qq_41887214/article/details/124183764)
[https://juejin.cn/post/6844903888072654856](https://juejin.cn/post/6844903888072654856)

## 防抖 & 节流

闭包的典型应用就是函数防抖和节流

1、函数防抖：指触发事件后，在 n 秒后只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数的执行时间。简单的说，当一个动作连续触发，只执行最后一次。

```js
// 简单实现
export function debounce(func, delay) {
  let timer
  return function () {
    if(timer) {
      clearTimeout(timer)
    }
    timer =  setTimeout(() => {
      func()
    }, delay)
  }
}

 // 有外部传参
export function debounce(func, delay) {
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```

2、函数节流：限制一个函数在一定时间内只能执行一次

```js
// 简单实现
export function throttle(func, delay){
  let timer
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      func()
      timer = null
    }, delay)
  }
}


// 有外部传参
export function throttle(func, delay){
  let timer = null
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```
