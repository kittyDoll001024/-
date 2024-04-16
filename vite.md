# vite

## 前言

`vite` 解决了一些 `webpack` 解决不了的问题，同事降低了一些心智负担

`vite` 是 `vue` 的官方出品，对 `vue` 有更好的生态环境

`vite` 同时也支持构建 `react、angular 和 svelte` 项目  

## 什么是构建工具

- `typescript` 如果遇到 `ts` 文件我们需要使用 `tsc` 将 `typescript` 代码转换为 `js` 代码
- `React/Vue` 安装 `react-compiler / vue-compiler`，将我们写的 `jsx` 文件或者 `vue` 文件转换为 `render` 函数
- `less/sass/postcss/components-style` 我们又需要安装各种 `loader` 等一系列编译工具
- 语法降级： 将 `es` 的新语法转换成旧版浏览器可以识别的语法
- 体积优化：`uglifyjs` 将我们的代码进行压缩变成体积小性能高的文件 ......

这样每次我们修改一点东西就会执行多个转换命令，异常的繁琐

这时候就有一个东西邦基把 `tsc, react-compiler, less, babel, uglifyjs` 全部集成到一起

那这时候我们只需要去关心我们的代码

这样我们每编译一次代码，构建工具就帮我们自动取执行语法转换，代码压缩等

这个东西就叫做 **构建工具**

### 一个构建工具都承担了那些工作

- 模块化开发支持：支持直接从 `node_modules` 里引入代码 + 多种模块化支持
- 处理代码兼容性：`babel` 语法降级，`less/ts` 语法转换等**(这些操作并不是构建工具做的，构建工具只是将这些语法对象的处理工具集成进来自动化处理)**
- 提高项目性能：压缩文件 **代码分割**
- 打包：将我们写的浏览器不认识的代码，交给构建工具进行编译处理的过程就叫做打包，打包完成以后会给我们一个浏览器可以认识的文件
- 优化开发体验
  - 构建工具会自动监听文件的变化，当文件变化以后自动调用对应的集成工具进行重新打包，然后在浏览器重新运行 **（整个过程叫做热更新）**
  - 开发服务器：跨域的问题，用 `react-cil/create-react-element/vue-cil` 解决跨域问题

构建工具让我们不用关心代码在浏览器如何运行，只需要首次给构建工具提供一个配置文件**（这个配置文件它会有默认的处理方式）**, 有了集成的配置文件，在下次需要更新时候调用一次对应的命令就可以，再去结合热更新，那就更加不用去管任何东西，这就是构建工具做的东西

**构建工具让我们不在关心生产代码也不用关心如何在浏览器运行，只需要关心我们的开发代码**

## vite 相对于 webpack 的优势

当我们开始构建越来越大的应用时，需要处理的 `JavaScript` 代码量也呈现指数级增长包含数个模块的大型项目相当普遍。我们开始遇到性能瓶颈 — 使用 `JavaScript` 开发的工具通常需要很长时间才能启动开发服务，即使使用热更新 (HMR) ，文件修改后的效果也需要几秒钟才能在浏览器中反映出来，如此循环往复，迟钝的反馈会极大地影响开发者的开发效率。

### webpack 编译慢的问题

```js
const lodash = require("lodash")
import Vue from "vue"
```

在 `webpack` 编译后

```js
const loadsh = webpack_require("loadsh")
const Vue = webpack_require("vue")
```

`webpack` 的编译原理，`AST` 抽象语法分析的工具，分析出你写的这个 `js` 文件有哪些导入和导出操作    

构建工具是运行在服务端的

```js
(function(modules) {
  function webpack_require() {}
  // 通过 webpack 的配置文件得来的 webpack.config.js  ./src/index.js
  modules[entry](webpack_require)
}, ({
  "./src/index.js": (webpack_require) => {
    const loadsh = webpack_require("loadsh")
    const Vue = webpack_require("vue")
  }
}))
```

因为 `webpack` 支持多种模块化，他一开始必须要统一代码，所以意味着它需要将所有的依赖全部读一遍

`vite` 是基于 `es modules` 的，侧重点不一样，`webpack` 更多关注兼容性，而 `vite` 关注浏览器端的开发体验

`webpack` 的构建是从入口文件开始然后去编译所有的依赖在去开启服务器

![image-20230616112422120](https://s2.loli.net/2023/06/16/FMBlX14vYDKRHkN.png)

`vite` 则是先开启服务器在从入口文件去编译依赖而且是按需编译

![image-20230616112444929.png](https://s2.loli.net/2023/06/16/7rT6HDZSnKchQVB.png)

## 理解 vite 脚手架和 vite

当我们执行 `yarn create vite` 时做了那些事情

1. 帮我们全局安装了一个 `create-vite` （vite 脚手架）
2. 直接运行了这个 `create-vite` bin 目录下的一个执行配置

误区：认为官网中使用对应 `yarn create` 构建项目的过程也是 `vite` 在做的事情

`create-vite` 和 `vite` 的关系是什么?   `create-vite` 内置了 `vite`

就像使用 `vue-cli` 会内置 `webpack` 一样

`vue-cli` 区分 `webpack` 

`vite` 是 `vue` 团队的产物，`create-vite` 也是 `vue` 团队

`vue` 团队希望弱化 `vite` 的一个存在感，是让我们使用它默认配置好的 `vite` 构建工具

`vite` 和 `webpack` 是构建工具

`create-vite` 和 `vue-cli` 是脚手架

举例形容构建工具：

我们自己搭建就相当于买了一个房子然后自己装修，买家具，做水电路等

而使用构建工具就像是直接买了一个精装修的房子，直接拎包入住

`vue-cli/create-react-app` 给我们提供已经精装的模板：帮你把 `react/vue` 都下好，同事他还帮你把配置调整到最佳实践

`create-vite` 给你一套精装修模板：下载 `vite/vue/post-css/less/babel` ，并且给你做好了最佳实践配置

## vite 的预加载

  ```js
  import _ from "loadsh"  
  ```

在处理的过程中如果说看到了有非绝对路径或者相对路径的引用，他则会尝试开启路径补全

```js
import _ from "/node_modules/.vite/loadsh"
```

找寻依赖的过程是自当前目录依次向上查找的过程，直到搜寻到根目录或者搜寻到对应依赖为止，如果说我们一直向上找直到根目录 `/user/node_modules/loadsh` 但是浏览器无法识别到，但是可以用相对路径，就是比较麻烦。 

生产和开发环境

`yarn dev` ---- 开发环境(每次依赖预构建重新构建的相对路径都是正确的)

`vite` 则是会全权交给一个 `rollup` 的库去完成生产环境的打包

`vite` 不使用相对路径还是考虑了 **缓存** 问题

 实际上 `vite` 在考虑另外一个问题的时候就顺便把这个问题解决了

问题就是所有的依赖使用的规范都不一样而 `vite` 无法识别 `commonjs` 的导出规范 `module.exports`

`vite` 这时候就是用了 **依赖预构建** 来解决这个问题

依赖预构建：首先 `vite` 会找到对应的依赖，然后调用 `esbuild (对js语法进行处理的第三方库)` 将其他规范的代码转换成 `esmodule` 规范，然后放到当前目录下的 `node_modules/.vite/deps` 中，同时对 `esmodule` 规范的各个模块进行统一集成

`vite` 对集成的处理

```js
export default function a() {}  // a 文件

// 导入 a 文件
export { default as a } from "./as.js"
```

`vite` 重写

```js
// 直接就把 export { default as a } from "./as.js" 这一步扔掉
// 直接把 a 函数写过来
function a () {}
```

解决了3个问题：

1. 不同的第三方包会有不同的导出格式 (这个是 `vite` 没法约束的事情)
2. 对路径的处理：当每次打包完成后都存放到 `.vite/deps` 下就不用在一层一层的找了，直接使用 `.vite/deps` ，此外也方便了路径重写。
3. 叫做网络夺宝传输的性能问题 (也是原生 `esmodule` 规范不敢支持 `node_modules` 的原因之一) ，有了依赖预构建以后无论它有多少的额外 `export` 和 `import` ，`vite` 都会尽可能的将他们进行集成最后只生成一个或者几个模块。

##  vite 配置文件处理细节

- `vite` 配置文件的语法提示
  - 如果你使用的是 `webstorm` ，那你可以得到很好的语法补全
  - 如果使用的是 `vscode` 或其他编辑器，则需要做一些特殊处理

```js
// vscode 或其他编辑做语法补全的提示
import { defineConfig } from "vite"
// defineConfig 导出一个 UserConfigExport 函数
export default defineConfig({})

export viteConfig = {}
```

- 关于环境的处理

  过去我们使用 `webpack` 的时候，我们要区分配置文件的一个环境

  - `webpack.dev.config`
  - `webpack.prod.config`
  - `webpack.base.config`
  - `webpackmerge`

```js
import { defineConfig } from "vite"
import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdConfig from "./vite.prod.config"

// 策略模式
const envResolver = {
  "build": () => Object.assign({}, viteBaseConfig, viteProdConfig),  // 生产环境
  "serve": () => Object.assign({}, viteBaseConfig, viteDevConfig)  // 发开环境
}
export default defineConfig(({command}) => {
  return eenvResolver[command]()
})
```

## vite 环境变量配置

环境变量：会根据当前的代码环境产生值的变化的变量就叫做环境变量

代码环境：

1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境

例：百度地图 SDK ，小程序 SDK

APP_KEY：测试环境和生产还有开发都是不一样的 key

- 开发环境：110
- 生产环境：111
- 测试环境：112

我们去请求第三方 SDK 接口的时候需要带上的一个身份信息

例：我们在和后端对接的时候，前端在开发环境中亲求的后端 API 地址和生产环境的后端 API 地址是一个吗？ 那肯定不是一个了

- 开发和测试环境：`http://test.api/`

- 生产环境：`https://api/`

在 `vite` 中的环境变量处理

`vite` 内置了 `dotenv` 这个第三方库，包括 `webpack` 也是使用的这个库去处理的

`dotenv` 会自动读取 `.env` 文件，并解析这个文件中的对应的环境变量，并将其注入到 `process` 对象下 (但是 `vite` 考虑到和其他配置的一些冲突，他不会直接注入到 `process` 对象下)

涉及到 `vite.config.js` 中的一些配置：

- `root`
- `envDir` 用来配置当前环境变量的文件地址

`envDir` 并非是不能修改 `vite` 提供了补偿措施，我们可以调用 `vite` 的 `loadEnv` 来手动确认 `env` 文件

`process.cwd` 方法：返回当前 `node` 进程的工作目录，通俗说也就是从电脑根目录到你执行命令的这个文件地址 

`.env` 所有环境都需要用到的环境变量，也就是公共环境

`.env.development` 开发环境需要用到的环境变量 (默认情况下 `vite` 将我们的开发环境取名为 `development`)

`.env.production` 生产环境需要用到的环境变量 (默认情况下 `vite` 将我们的生产环境取名为 `production`) 

当我们执行 `yarn dev` 时它默认的就是开发环境，当我们需要切换到生产环境需要手动改变 `yarn dev --mode production`

`yarn dev --mode development` 会将 `mode` 设置为 `development` 传递进来

当我们调用 `loadEnv` 的时候，他会做如下几件事：

1. 直接找到 `.env` 文件不解释，并解析其中的环境变量并放进一个对象里

2. 会将传进来的 `mode` 这个变量的值进行拼接 `.env[mode]` ------- `.env[development]`，并根据我们提供的目录去取对应的配置文件并进行解析，并放进一个对象

3. 我们可以理解为

   ```js
   const baseEnvConfig = 读取.env的配置
   const modeEnvConfig = 读取env相关配置
   const lastEnvConfig = Object.assign({}, baseEnvConfig, modeEnvConfig)  // 利用同名覆盖的方式
   ```

如果是客户端，`vite` 会将对应的环境变量注入到 `import.meta.env` 里去

但是我们不能直接访问，因为 `vite` 做了一个拦截，他为了防止我们将隐私性的变量直接送进 `import.meta.env` 中，所以他做了一层拦截，如果你的环境变量不是以 `VITE` 开头的，他就不会帮你注入到客户端中去，如果我们想要更改这个前缀，可以使用 `envPrefix` 配置

```js
// .env.development 开发环境
APP_KEY = 110
```

```js
// .env.production  生产环境
APP_KEY = 111
```

```js
// vite.config.js
import { defineConfig } from "vite"
import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdConfig from "./vite.prod.config"

// 策略模式
const envResolver = {
  "build": () => Object.assign({}, viteBaseConfig, viteProdConfig),  // 生产环境
  // 新配置里可能会被配置 envDir 
  "serve": () => Object.assign({}, viteBaseConfig, viteDevConfig)  // 发开环境
}
export default defineConfig(({command, mode}) => {
  // 是 build 还是 serve 主要取决于我们敲的命令是开启开发环境还是生产环境
  // process.cwd() 当前 env 文件所在的目录
  // 第二个参数不是非必要使用 process.cwd() 
  // loadEnv 手动指正要读取的环境变量
  const env = loadEnv(mode, process.cwd(), "")  // "" 是它会默认的读取 .env 文件
  return envResolver[command]()
})
```

补充知识点：为什么 `vite.config.js` 可以书写成 `esmodule` 的形式，这是因为 `vite` 它在读取这个 `vite.cnfig.js` 的时候会率先 `node` 去解析文件语法，如果发现你是 `esmodule` 规范会直接将的 `esmodule` 规范进行替换变成 `commonJs` 规范。

##  vite 是怎么让浏览器可以识别 .vue 文件的





 



















































































































































































