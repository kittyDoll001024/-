# 介绍与安装

## 介绍

typescript 是

[TOC]

 javascript 的一个超集，typescript 可以运行于任何系统，并且是开源免费的。

![img](https://s2.loli.net/2022/12/09/gYyrFqb6WdlPD4V.jpg)

typescript的产生源于JavaScript的动态变量(动态类型)；

- 动态变量：在强类型的语言中变量是可以指定类型的，而在JavaScript这一个弱类型的语言中变量的类型是根据值来确定的，这从而导致了JavaScript的灵活性，同样使用JavaScript编写的程序进行维护时会出现较多的bug

typescript 有以下几个特点

- typescript 会在编译时对代码进行严格的静态类型检查，可以在编码阶段就发现问题，而不是在上线运行时才发现
- typeScript语法遵循ES规范，更细速度快，不断支持最新的ECMAScript新特性，如装饰器、public/private修饰符
- typescript 支持 OOP（面向对象）的接口，抽象类，多态特性
- typescript可以为 IDE 提供更好的代码补全、接口提示、跳转到定义
- 还有重要一点是众多科技公司已经采用 typeScript 进行开发，也是前端工程师需要掌握的就业技能

typescript 增加了什么

- 类型：在声明变量时可以指定类型
- 添加 ES 不具备的新特性
- 支持 ES 的新特性
- 丰富的配置选项

## 安装环境

下面是安装typescript的运行环境

### node

首先需要安装 [node.js (opens new window)](https://nodejs.org/en/)

<img src="https://s2.loli.net/2022/12/09/5ygwiGUsh3rBIuq.jpg" alt="img" style="zoom:33%;" />

### 全局安装TS

然后执行以下命令安装 typescript

```shell
npm install -g typescript
```

如果你使用的是 mac 系统也可以执行

```bash
brew install typescript	
```

如果是 linux 系统可以通过相应的软件管理命令安装，比如以下是 manjaro 的安装示例

```bash
sudo pacman -Sy typescript
```

安装后执行以下命令检查是否安装成功

```javascript
tsc -v
// 如果显示以下内容即表示安装成功
// Version 4...
```

### 项目安装TS

除了全局安装外，也可以在项目中独立安装 typescript，这可以限定项目使用的 typescript 版本

```bash
yarn init -y
```

安装 typescript

```bash
yarn add -D typescript
```

查看版本

```bash
yarn tsc -v
```

## 编译Ts

我们使用 tsc 命令可以将 ts 文件编译为js 文件，如果在编译过程中有 ts 错误将在命令行报出

```bash
tsc 1.ts // 会编译生成 1.js 文件
```

第次修改 ts 文件后再执行命令编译会过于繁琐，可以执行以下命令自动监听ts 文件内容并自动生成 js 文件

```bash
tsc 1.ts -w
```

### tsconfig.json 配置文件

全局自动监听 ts 文件内容被自动生成 js 文件

- 在我们的文件夹的根节点创建一个 `tsconfig.json` 的文件

```
tsc -w
```

如何配置 `tsconfig.json` 文件

```json
/*
* tsconfig.json 是 ts 编译器的配置文件，ts 编译器可以根据它的信息来对代码进行编译
* 	=> "include" 用来指定那些 ts 文件需要被编译（包含那些文件）
*	  + 路径：表示任意目录
*			 表示任意文件
*	=> "exclude" 指定那些不需要编译的文件目录
*	  + 默认值：["node_modules", "bower_components", "jspm_packages"]
* 	=> "extends" 定义被继承的配置文件
*	=> "files" 指定编译文件的列表，只有需要编译的文件少时才会用到
*	=> "compilerOptions" 编译器的选项
*	  => "target" 用来指定 ts 被编译为的 ES 的版本
*		- 可填版本: "es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext(最新版本)"
*	  => "module" 指定要使用的模块化规范
*		- 可填版本: "none", "commonjs", "amd", "system", "umd", "es6", "es2015", "es2020", "esnext"
*	  => "lib" 用来指定项目中要使用的库
*		- "ES5","ES6","ES2015","ES2015.Collection","ES2015.Core","ES2015.Generator","ES2015.Iterable","ES2015.Promise","ES2015.Proxy","ES2015.Reflect","ES2015.Symbol.WellKnown","ES2015.Symbol","ES2016","ES2016.Array.Include","ES2017","ES2017.Intl","ES2017.Object","ES2017.SharedMemory","ES2017.String","ES2017.TypedArrays","ES2018","ES2018.AsyncGenerator","ES2018.AsyncIterable","ES2018.Intl","ES2018.Promise","ES2018.Regexp","ES2019","ES2019.Array","ES2019.Intl","ES2019.Object","ES2019.String","ES2019.Symbol","ES2020","ES2020.BigInt","ES2020.Promise","ES2020.String","ES2020.Symbol.WellKnown","ESNext","ESNext.Array","ESNext.AsyncIterable","ESNext.BigInt","ESNext.Intl","ESNext.Promise","ESNext.String","ESNext.Symbol","DOM","DOM.Iterable","ScriptHost","WebWorker","WebWorker.ImportScripts","Webworker.Iterable","ES7","ES2021","ES2020.SharedMemory","ES2020.Intl","ES2021.Promise","ES2021.String","ES2021.WeakRef","ESNext.WeakRef","es2021.intl", "ES2022", "ES2022.Array", "ES2022.Error", "ES2022.Intl", "ES2022.Object", "ES2022.String"
* 		+ => "outDir" 用来指定编译后文件所在的目录
*     + => "outFile" 将代码合并为一个文件; 设置 outFile 后, 所有的全局作用域中的代码会合并到同一个文件中
* 		+ => "allowJs" 是否对 js 文件进行编译, 默认值: false
*     + => "rootDir" 指定代码的根目录，默认情况下比编译后文件的目录结构会以最长的公共目录为根目录，通过 rootDir 可以手动指定根目录
*     + => "checkJs" 是否检查 js 代码是否符合 ts 语法规范, 默认值: false
*     + => "removeComments" 是否移除注释, 默认值: false
*     + => "noEmit" 不生成编译后的文件, 默认值: false
*		+ => "sourceMap" 不生成 sourceMaop, 默认值: false
*		+ => "strict" 所有严格检查的总开关
*     + => "alwaysScript" 用来设置编译后的文件是否使用严格模式, 默认值: false
*		- 当我们在模块化下编写代码时会自动进入到严格模式
*		+ => "noImplicitAny" 不允许隐式的 any 类型, 默认值: false
*		+ => "noImplicitThis" 不允许不明确类型的 this, 默认值: false
*		+ => "strictBindCallApply" 严格检查 bind、call、apply 的参数列表, 默认值: false
*		+ => "strictFunctionTypes" 严格检查函数的类型, 默认值: false
*     + => "strictNullChecks" 严格的检查空值, 默认值: false
*		+ => "strictPropertyInitalization" 严格检查属性是否初始化
*		+ => "noFallthroughCasesInSwitch" 检查 switch 语句包含正确的 break, 默认值: false
*		+ => "noImplictReturns" 检查函数没有隐式的返回值, 默认值: false
*		+ => "noUnusedLocals" 检查未使用的局部变量, 默认值: false
*		+ => "noUnusedParameters" 检查未使用的参数, 默认值: false
*		+ => "allowUnreachableCode" 检查不可达代码
*		- 可选值： true：忽略不可达代码; false: 不可达代码将引起错误
*     + => "noEmitOnError" 当代码报错时不生成编译后的文件, 默认值: false
*/
  
{
  "include": [
    "./src/**/*"  // src 文件夹下任意目录任意文件
  ],
  "exclude": [
    "./src/hello/**/*"  // src 文件夹下 hello 文件下任意目录任意文件不需要被编译
  ],
  "extends": "./config/base",  // 当前配置文件会自动包含 config 目录下 base.json 中的所有配置信息
  "filts": [
    "index.ts"  // 列表中的文件会被编译
  ],
  "compilerOptions": [
    "target": "es6",
    "module": "es6"，
    // "lib"：[]  // 一般不用去动,
  	"outDir": "./dist",
    "outFile": "./dist/app.js",
    "rootDir": "./src"
    "allowJs": false,
    "checkJs": false,
    "removeComments": false,
    "noEmit": false,
    "sourceMap": false,
    "noEmitOnError": false,
    "noImplicitAny": false,
    "noImplicitThis": false,
    "strictNullChecks": false,
    "strict": false,
    "alwaysStrict": false,
    "strictBindCallApply": false,
    "strictFunctionTypes": false
  ]
}
```

### 使用 webpack 打包 ts 代码

先初始化项目，自动生成package.json 文件

```shell
npm init -y
```

安装构建工具

- webpack：构建工具 webpack
- webpack-cli：webpack 的命令行工具
- webpack-dev-server：webpack 的开发服务器
- typescript：ts 编译器
- ts-loader：ts 加载器，用于在 webpack 中编译 ts 文件
- html-webpack-plugin：webpack 中 html 插件，用来自动创建 html
- clean-webpack-plugin：webpack 中的清除插件，每次构建都会先清除目录

```shell
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin html-webpack-plugin
```

根目录下创建 webpack.config.js 配置文件

```javascript
// 引入路径配置包
const path = require("path")
// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin")
// 引入 clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack 中的所有信息的配置信息都应该写在 module.exports 中
module.exports = {
  // 关闭代码压缩, 可选
  optimization: {
    minimize: false
  },
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件的目录
  output: {
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件
    filename: "bundle.js"
  },
  // 指定 webpack 打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader
        use: "ts-loader",
        // 要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  // 配置 Webpack 插件
  plugins: [
    // 每次编译时把旧文件删除重新生成最新编译文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // 自定义 title 
      // title: "这是一个自定义的 title"
      
      // 使用自定义 html 模板
      template: "./src/index.html"
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]  // 以这两个结尾的文件都可以作为模块
  }
}
```

根目录下创建 tsconfig.json，配置可以根据自己需要

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true
  }
}
```

修改 package.json 添加配置如下

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack" // 打包
  "start": "webpack serve --open chrome.exe" // 热加载 
}
```

在 src 下创建 ts 文件，并在命令行执行 `npm run build` 对代码进行编译，或者执行 `npm start` 来启动开发服务器

### Babel 兼容低版本浏览器

经过一系列的配置，使得 `TS` 和 `webpack` 已经结合到了一起，除了 `webpack` , 开发中还经常需要结合 `babel` 来对代码进行转换以使其可以兼容到更多的浏览器, 在上述步骤的基础上, 通过以下步骤再将 `babel` 引入到项目中。

- 安装依赖包

```shell
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

- 4 个依赖包的作用
  - @babel/core：babel 的核心工具
  - @babel/preset-env：babel 的预定义环境
  - @babel-loader：babel 在 webpack 中的加载器
  - core.js：core-js 用来使用老版本的浏览器支持新版 ES 语法

- webpack.config.js 配置文件

```json
// 引入路径配置包
const path = require("path")
// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin")
// 引入 clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack 中的所有信息的配置信息都应该写在 module.exports 中
module.exports = {
  // 关闭代码压缩, 可选
  optimization: {
    minimize: false
  },
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件的目录
  output: {
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件
    filename: "bundle.js",
    // 告诉 webpack 不使用箭头函数
    // 这个不使用箭头函数是，在我们每次打包是每个文件会在整个逻辑层最外边生成一个立即执行函数，而这个立即执行函数用的是箭头函数无法被 babel-loader 去替换成低版本浏览器支持的语法
    environment: {
      arrowFunction: false
    }
  },
  // 指定 webpack 打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader, 该条件执行是从下往上执行
        use: [
          // 配置 babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置 babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "88",
                      "ie": "6"
                    },
                    // 指定 corejs 的版本
                    "corejs": "3",
                    // 使用 corejs 的方式, "usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          "ts-loader"
        ],
        // 要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  // 配置 Webpack 插件
  plugins: [
    // 每次编译时把旧文件删除重新生成最新编译文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // 自定义 title 
      // title: "这是一个自定义的 title"
      
      // 使用自定义 html 模板
      template: "./src/index.html"
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]  // 以这两个结尾的文件都可以作为模块
  }
}
```

- 使用 ts 编译后的文件将会再次被 babel 处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的 target 中的指定要兼容的浏览器版本

### 使用less预处理

```shell
npm i -D less less-loader css-loader style-loader
```

### css兼容低版本浏览器

```shell
npm i -D postcss postcss-loader postcss-preset-env
```

```js
// 引入路径配置包
const path = require("path")
// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin")
// 引入 clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack 中的所有信息的配置信息都应该写在 module.exports 中
module.exports = {
  // 关闭代码压缩, 可选
  optimization: {
    minimize: false
  },
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件的目录
  output: {
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件
    filename: "bundle.js",
    // 告诉 webpack 不使用箭头函数
    // 这个不使用箭头函数是，在我们每次打包是每个文件会在整个逻辑层最外边生成一个立即执行函数，而这个立即执行函数用的是箭头函数无法被 babel-loader 去替换成低版本浏览器支持的语法
    environment: {
      arrowFunction: false,
      const: false
    }
  },
  // 指定 webpack 打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader, 该条件执行是从下往上执行
        use: [
          // 配置 babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置 babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // 指定 corejs 的版本
                    "corejs": "3",
                    // 使用 corejs 的方式, "usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          "ts-loader"
        ],
        // 要排除的文件
        exclude: /node_modules/
      },
      // 设置 less 文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入 postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions"
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 配置 Webpack 插件
  plugins: [
    // 每次编译时把旧文件删除重新生成最新编译文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // 自定义 title 
      // title: "这是一个自定义的 title"

      // 使用自定义 html 模板
      template: "./src/index.html",
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"]  // 以这两个结尾的文件都可以作为模块
  }
}
```

## 类型声明文件

### 概述

今天几乎所有的 `JavaScript` 应用都会引入许多第三方库来完成任务需求

这些第三方库不管是否是用 `TS` 编写的，最终都要编译成 `JS` 代码，才能发布给开发者使用

我们知道是 `TS` 提供了类型，才有了代码提示和类型保护等机制

但在项目开发中使用第三方库时，你会发现它们几乎都有相应的 `TS` 类型，这些类型是怎么来的呢？类型声明文件

类型声明文件：用来为已存在的 `JS` 库提供类型信息

这样在 `TS` 项目中使用这些库时，就像用 `TS` 一样，都会有代码提示、类型保护等机制了

1. `TS` 的两种文件类型
2. 类型声明文件的使用说明

### TS 中的两种文件类型

`TS` 中有两种文件类型：

1. `.ts` 文件
2. `.d.ts` 文件

- `.ts` 文件：
  1. 既包含类型信息又可执行代码
  2. 可以被编译为 `.js` 文件，然后，执行代码
  3. 用途：编写程序代码的地方
- `.d.ts` 文件：
  1. 只包含类型信息的类型声明文件
  2. 不会生成 `.js` 文件，仅用于提供类型信息
  3. 用途：为 `JS` 提供类型信息

总结：`.ts` 是 `implementation` (代码实现文件)；`.d.ts` 是 `declaration` (类型声明文件)

### 类型声明文件的使用说明

在使用 `TS` 开发项目时，类型声明文件的使用包括以下两种方式：

1. 使用已有的类型声明文件
2. 创建自己的类型声明文件

> 使用已有的类型声明文件：

1. 内置类型声明文件
2. 第三方库的类型声明文件

内置类型声明文件：`TS` 为 `JS` 运行时可用的所有标准化内置 `API` 都提供了声明文件

在使用数组时，数组所有方法都会又相应的代码提示一级类型信息：

![image-20230624161456987](https://s2.loli.net/2023/06/24/eL4mJnckdxpItyV.png)

实际上这都是 `TS` 提供的内置类型声明文件

例如：

查看 `forEach` 方法的类型声明，在 `lib.es5.d.ts` 类型声明文件中

像 `windows/document` 等 BOM、DOM API 也都有相应的类型声明 (lib.dom.d.ts)

> 使用第三方库

第三方库的类型声明文件：目前，几乎所有常用的第三方库都有相应的类型声明文件。

第三方库 的 类型声明文件有两种存在形式：

1. 库自带 类型声明文件

   ![image-20230629130722506](https://s2.loli.net/2023/06/29/5pBkT862hyCQeHu.png)

`注：这种情况下， TS 就会自动加载库自己的类型声明文件，已提供该库的类型声明 `

2. 由 `DefinitelyType` 提供

- `DefinitelyType` 是一个 `GitHub` 仓库，用来 提供高质量 `typescript` 类型声明。
- 可以通过 `npm/yarn` 来下载该仓库 提供的 `TS` 类型声明包，这些包的名称格式为：`@type/*`
- 例如：`@types/react、@types/loadsh` 等
- 在实际项目开发时，如果 你使用的第三方库美哟自带的声明文件，`Vscode` 会给出明确的提示

![image-20230629130152488](https://s2.loli.net/2023/06/29/McnKNvEmxwp8oWI.png)

![image-20230629130217401](https://s2.loli.net/2023/06/29/d5ph2QVYZ9UjTe3.png)

![image-20230629130237524](https://s2.loli.net/2023/06/29/mVAegSburwPLpTk.png)

当安装 `@types/*` 类型声明包后，TS 也会自动加载该类型声明包，以提供库的类型声明。

> 创建自己的类型声明文件

1. 项目内共享类型

- 项目内共享类型：如果多个 `.ts` 文件中都用到同一个类型，此时可以创建 `.d.ts` 文件提供该类型，实现类型共享。

操作步骤：

- 创建 `index.d.ts` 类型声明文件
- 创建需要共享的类型，并导出 (TS 中的类型可以使用 `import/export` 实现模块化)
- 在需要使用共享的 `.ts` 文件中，通过 `import` 导入即可 (`.d.ts` 后缀导入时，直接省略)

2. 为已有 `JS` 文件提供类型声明：

   1. 在将 `JS` 项目迁移到 `TS` 项目时，为了让已有的 `.js` 文件有类型声明
   2. 成为库作者，创建库给其他人使用

   `注:` 类型声明文件的编写与模块化方式相关，不同的模块化方式有不同的写法。但由于历史原因，`JS` 模块化的发展经历过多种变化 `(AND、CommonJS、UMD、ESModule)等` ，而 `TS` 支持各种模块化形式的类型声明。这就导致，类型声明文件相关内容又多又杂。

   `说明:` `TS` 项目中也可以使用 `.js` 文件

   `说明:` 在导入 `.js` 文件时，`TS` 会自动加载与 `.js` 同名的 `.d.js` 文件以提供类型声明。

   `declare` 关键字：

   - 用于类型声明，为其他地方 (比如，`.js` 文件) 已存在的变量声明类型，而不是创建一个新的变量。
     1. 对于 `type、interface` 等这些明确就是 `TS` 类型的 (只能在 `TS` 中使用的)，可以省略 `declare` 关键字。
     2. 对于 `let、function` 等具有双重含义 (在 `JS、TS` 中都能使用)，应该使用 `declare` 关键字，明确指定从此处用于类型声明。

   ![image-20230705163130950](https://s2.loli.net/2023/07/05/LXb8NJnl1ZsAov3.png)

#  基础类型

TypeScript中会有新的一些数据类型，也包含了我们js中的 `number string ....`

## 类型推断

当没有明确设置类型时，系统会根据值推断变量的类型

> TS 可以手动的去指定值的类型

### 手动指定类型

```typescript
let num: number // 这个变量被指定为数字类型；其他类型同理
```

> TS 也可以自动根据当前的值去判断类型，再次赋值时会跟当前的的值类型进行比对，不是同一类型将会报错

### 自动判断类型

函数参数不建议使用类型推断

#### 字符串

下例中系统会自动根据值判断类型，那么当我们后面修改数据不是判断的类型那么将会报错

```typescript
let num = 100; // 自动判断是 number let num:number = 100
num = 'zhangsan';
```

#### 数值

ts 中的数值类型包括了小数、负数、整数

```typescript
let zhangsan: 100
zhangsan = 100.1
zhangsan = -101
```

#### 布尔值

值为 true 或 false 会被推断为 boolean类型

```typescript
let state = true; // let state: boolean
```

#### 数组

下面是数组类型的推断结果，表示数组内容值为字符串

```typescript
const hd = ['houdunren.com', '后盾人'] //const hd: string[]

hd.push(100) //因为类型不允许，所以报错
```

下面会推断数组允许的值为字符串或数值

```typescript
const hd = ['houdunren.com', '后盾人',100] //const hd:(string|number)[] 

hd.push(100,'向军') //数组允许数值、字符串类型，所以编译通过
```

#### 对象

ts 也可以推断字面量类型

```typescript
const user = {name:'后盾人',age:18,open:true} 
```

推断结果如下

```typescript
const user: {
    name: string;
    age: number;
    open: boolean;
}
```

如果向对象中添加类型中不存在的属性将报错

```typescript
const user = {name:'后盾人',age:18,open:true} 

user.city = '北京'
//将产生错误 Property 'city' does not exist on type
```

下面是更复杂的在对象中嵌套对象，TS 也是可以推断出来的

```typescript
const user = {name:'后盾人',age:18,open:true,lessons:[
    {title:'linux'},
    {title:'TS'}
]} 

user.lessons[0].title
```

上例推断的结果是

```typescript
const user: {
    name: string;
    age: number;
    open: boolean;
    lessons: {
        title: string;
    }[];
}
```

## 基础类型

除了上面的类型自动推断外，更多的时候是明确设置变量类型

### 类型别名

当需要被指定多种类型时推荐使用类型别名

```typescript
type myType = string | number | boolean
let v:myType = "小天才电话手表";
let c:myType = 18;
let g:myType = true
```

### 联合类型

使用 `|` （管道符）来连接多个类型，相当于 JavaScript 中的 逻辑或（||）

```typescript
let b: "male" | "female"; // 这个变量被指定的值之有这两个
b = "male";
b = "female";
b = "hello"; // 报错 （不能将类型 ”hello“ 分配给类型“"male" | "female"”）llo"”分配

let c: bollean | string;  // 只能是 布尔或字符类型
```

`&` 必须都存在，相当于 JavaScript 中的 逻辑与（&&）

```typescript
let j: {name: string} & {age: number}
j = {name: "小天才", age: 18}
```

### 字符串

字符串使用string 来声明

```typescript
const hd:string = 'houdunren.com'
```

### 数值

在 TS 中不区分整数与浮点数，都使用 number 来声明

```typescript
const hd:number = 100 
```

### 布尔

使用 boolean 来声明布尔类型

```typescript
const hd:boolean = true
```

### 数组

下面是对数组值类型为字符串

```typescript
let hd:string[] =[]
hd.push('houdunren','后盾人')
```

也可以使用泛型来声明数组（泛型的详细使用后面内容会介绍）

```typescript
let hd:Array<string> =[]
hd.push('houdunren','后盾人')
```

### 元组

元组就是固定长度的数值

元组类型是另一种类型的数组，它确切地知道包含了多少个元素，以及特定索引对应的类型

```typescript
let hd: [string, string]  // 只能有两个值，且是字符类型
```

### 对象

下面是声明对象类型但不限制值类型

```typescript
let hd: object
hd = {name: '后盾人'}
hd = {} // 使用字面量声明对象
hd = [] // 数组是对象
hd = Object.prototype // 原型对象
hd = 'houdunren' // 报错，改变了类型为字符串
```

限定对象值类型

```typescript
let hd: {name: string, year: number}
hd = {name: '后盾人', year: 2010}
```

属性后面跟上`?` 用来指定 url 为可选值，这样的属性是非必填项

```typescript
let hd: {name: string, year: number, url?: string}
hd = {name: '后盾人', year: 2010}
```

对象中任意属性

```typescript
let obj: {name: string}
obj = {name: "后盾人", age: 18}  // 报错 在 obj 对象中找不到 age 这个属性

// 在对象中添加任意属性 
// [propName: string] 任意属性名; propName 可以是任意名称; string 是属性名类型; 在 JavaScript 中所有属性名都是字符串; any 属性值的类型为任意类型
let hd: {name: string, [propName: string]: any};
hd = {name: "后盾人", age: 18}
```

### any(任意类型)

使用 any 指包含所有值的顶部类型，所以 any 不进行类型检查，等于关闭了 TS 对该变量的严格类型校验

- 使用 any 类型等同于使用纯 JavaScript 的开发方式
- any 类型是顶部类型，所有其他类型是他的子类型
- 使用 any 类型将失去 typescript 静态类型的强制检测
- 只有在描述一个根本不知道的类型时使用 any 也可以使用 unknown （未知）
- 声明变量如果不指定类型，则 TS 解析器会自动判断变量的类型 为 any （隐式的 any）

可以将 any 视为所有类型的组合表示

```typescript
let hd: string|boolean|number;
hd = '后盾人'

let houdunren:any
hd = '后盾人'
```

下面是设置基本 any 的示例

```typescript
let hd:any

//以下赋值不会报错
hd = 'houdunren'
hd = 2010
hd = true
hd = []
hd = {}
hd = class{}
```

在数组中使用 any 类型，可以设置任意类型的值

```typescript
let hd:any[] = ['houdunren.com','后盾人',2010,true]
```

也可以使用泛型的方式设置 any 类型数组

```typescript
let hd:Array<any> =['houdunren.com','后盾人',2010,true]
```

为对象属性设置类型

```typescript
let hd:{
    name:any,
    year:any
}
// 以下设置都不会报错
hd = {name:'后盾人',year:2010}
hd = {name:2010,year:'后盾人'}
```

any 太过宽泛所以不建议使用，他会丢失 TS 的严格类型校验，比如下面的示例并不会报错

```typescript
let hd:any
hd.get() //不会报错
```

下面再来看一下对象的使用any类型造成的问题

```typescript
class Hd {
    constructor() { }
    get = () => 'houdunren'
}

const obj:any = new Hd;
console.log(obj.get());

obj.show()// 在运行的时候才会提示错误
```

所以上例需要指定正确的 Hd 类型，而不是使用 any

```typescript
...
const obj:Hd = new Hd;
...
```

能过设置 tsconfig.json 的 `noImplicitAny = true` 配置项，可以禁止隐含的any 类型。以下代码会在编译时报错

```typescript
function sum(a, b) {
  return a + b
}
```

### unknown(未知)

unknown 类型也是顶部类型这与 any 一样

- unknown 用于表示未知的类型
- 与 any 的区别是 any 不进行 TS 校验，unknown 类型要安全得多，会进行 TS 的类型检查
- 使用 unknown 类型时一般需要 as **类型断言**来转换类型；而 any 可以赋值任意变量
- `unknown` 没有办法读取任何属性，方法也不能调用

**unknown 赋值时要求明确类型**

```typescript
let xj:any ='后盾人'
let hd:unknown = 'houdurnen'

let a:string = xj
let b:string = hd //报错: 'unknown'未知类型不能赋值给'string'类型
```

上面的 unknown 类型需要明确类型后赋值

- 类型断言的方式有三种方式

```typescript
let b:string
// 1. 使用 typeof 检测类型
if (typeof hd === "string") {
  b = hd
}
// 2. 使用 as
b = hd as string
// 3. 使用 <string>
b = <string>hd
```

**借助 unknown 转换类型**

```typescript
let hd:string = '99'
let xj:number = hd as number // 报错，TS 认为字符串转数值会出现错误;导致类型重叠
```

这里需要使用 unknown 做个中间层转换

```typescript
let str: string = "字符串";
let num: number = 999;
str = num as unknown as string  // 先转换为 unknown 类型 在转换为 string 类型
str = <string><unknown>num
```

### void(空值 undefined)

void类型的值为 null 或undefined，常用于对函数返回值类型定义

- 严格模式下只能是 undefined（有关 TS 配置会在后面章节介绍）
- 如果函数没有返回值请使用 void 类型，这会使用代码更易读，并可对不小心造成的函数返回内容进行校验
- 你也可以将 void理解为对返回 null 或 undefined 的函数返回值声明

void 类型的值可以是 null 或 undefined，但如果 TS 配置开启了 `strict` 或 `strictNullChecks`则不允许 void 为 null

```typescript
let hd:void = undefined;
let houdunren:void = null;
```

void 不允许设置其他类型

```typescript
let hd:void
hd = 'houdunren.com' // 设置string 将报错
```

经过 void 限定后是不允许函数返回内容的，所以以下代码将报错；但是可以 return 终止代码

```typescript
function hd():void{
    return 'hd'
}
```

### never(没有值)

相比其他类型来讲 never 使用的机会相对较少。

函数返回值使用 never 与 void 的区别是

- void 是有null 或undefined 值的
- never 是永远不会结束的函数，所以也不会有返回值

```typescript
function hd():never{
	throw new Error("出错了")
}
```

### enum(枚举)

`enum` 的主要作用是可以取这一组限定范围内的数值

在 C 语言中对这样取值比较特殊的变量可以定义为 `枚举类型`, 枚举就是指变量的值一 一列举出来，变量只限于列举出来的值的范围内取值

```typescript
enum Color {Red, Green, Blue}
let a: Color = Color.Green  // 1

enum Color {Red = 1, Green, Blue}
let a: Color = Color.Green  // 2


enum Color {Red, Green = 3, Blue}
let a: Color = Color.Red  // 0
let b: Color = Color.Green  // 3
let c: Color = Color.Blue  // 4
```

- 也可以手动的指定成员的数值，那么这个枚举值就是所赋的值，后面的枚举项的值就是它前面的枚举项值的递增加一
- 当指定中间成员的数值，那么所处在开头的枚举项的值还是0，而被指定的成员后面的值，是参考被指定成员的值继续递增的

```typescript
enum Color {Pul, Red = "red", Green = "green", num} // error 打印结果：0, red, green, undefined
enum Color {Pul, Red = "red", Green = "green", num = 10} // success 打印结果：0, red, green, 10
```

- 如果没有手动赋值的枚举项紧邻着前面已被赋值的枚举项且值是非数值类型的，TS 中会提示错误
- 只有在紧邻的枚举项的值为数值类型时，后面的枚举项的值才可不被手动指定

```typescript
let getNumber = ():number => { return 1 };
enum Color {sn, blue = getNumber(), sn1}  // error
enum Color {sn, blue = getNumber(), sn1 = 10, sn2}  // success 
```

- 当成语是一个函数并且这个函数有指定返回值类型时，那么你这个枚举项紧邻的值也必须是一样的值类型

```typescript
let getNumber = ():number => { return 1 };
enum Color {sn, blue = getNumber(), sn1 = "sn1"}  // error
enum Color {sn, blue = getNumber(), sn1 = 10}  // success
```

### null & undefined

null 与undefined 也是对变量类型，用于定义值为 null 或 undefined

```typescript
let hd:null = null
let houdunren: undefined = undefined
console.log(hd,houdunren);
```

下面是函数返回值的使用

```typescript
function getName():string | null{
    return null
}
console.log(getName());
```

null & undefined 默认是可以被设置为其他类型的值

```typescript
let hd: number = 20
hd = undefined

console.log(hd) // undefined
```

所以null类型也可以设置为undefined，undefined类型同理

```typescript
let hd: null = undefined
let zs: undefined = null

console.log(hd,zs) // undefined & null
```

我们可以通过修改配置文件中的 `strictNullChecks` 为 true 来进行判断，此时 null 与 undefined 只能赋值给 void、null、undefined 类型

```typescript
let hd: number = 20
hd = undefined

console.log(hd) // Type 'undefined' is not assignable to type 'number'
```

### 类型断言

有时候你会比 `TS` 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型

例：

```html
<a href="#" id="line"></a>
```

```typescript
const aLink = document.getElementById("link")
```

`注` `getElementById` 方法返回值的类型是 `HTMLElement` ，该类型只包含所有标签公共的属性或方法，不包含 a 标签特有的 href 等属性。

因此这个类型太宽泛，无法操作 href 等 a 标签特有的属性方法。

这时候就需要使用类型断言指定更加具体的类型

使用类型断言

```typescript
const aLink = document.getElementById("link") as HTMLAnchorElement
```

1. 使用 `as` 关键字实现类型断言
2. 关键字 `as` 后面的类型是一个更加具体的类型 `(HTMLAnchorElement 是 HTMLElement 的子类型)`
3. 通过类型断言， `aLink` 的类型变得更加具体。

另一种断言写法 (不推荐)

此类型写法与 `react` 中的语法类型会有冲突

```typescript
const aLink = <HTMLAnchorElement>document.getElementById("link")
```

如何查看元素类型

![image-20230619112545622](https://s2.loli.net/2023/06/19/Pkoy1COfZ4bXugW.png)

![image-20230619112627363](https://s2.loli.net/2023/06/19/UNOSWq1o6KsByHJ.png)

![image-20230619112650426](https://s2.loli.net/2023/06/19/G4LnYTcvgW3H2qB.png)

### 字面量类型

使用模式：字面量类型配合联合类型一起使用

使用场景：用来表示一组明确的可选值列表

```typescript
const direction: "up" | "down" | "left" | "right"
direction = "down"
direction = "沐沐汐"  // 报错
```

参数 `direction` 的值只能是 `"up" | "down" | "left" | "right"` 中任意一个

优势：相比于 `string` 类型，使用字面量类型更加精确、严谨

### typeof

`TS` 提供了一个和 `JS` 相同的操作符，两者的执行环境不同效果也不同

`TS` 中的 `typeof` ：可以在类型上下文中引用变量或属性的类型 (类型查询)。

使用场景：根据已有变量的值，获取该值的类型，来简化类型书写。

```typescript
let obj = { x: 1, y: 2 };
function formatPoint(point: typeof obj) {}
formatPoint({x: 2, y: 1})
```

- 使用 `typeof` 操作符来获取变量 `p` 的类型，结果与第一种 (对象字面量的类型) 相同。
- `typeof` 出现在类型注解的位置 (参数名称的冒号后面) 所处的环境就在类型上下文 (区别于 `JS` 代码)。
- `注` ：`typeof` 只能用来查询变量或属性的类型，无法查询其他形式的类型 (例如：函数调用类型)。

### 交叉类型

交叉类型 (&)：功能类似于接口继承，用于组合多个类型为一个类型 (常用于对象类型)

- 使用交叉类型后，新的类型 `PersonDetail` 就同事具备了 `Person` 和 `Contact` 的所有属性类型

```typescript
interface Person {
  name: string
  say() => boolean
}

interface Contact {
  age: number
}

type PersonDetail = Person & Contact

let obj: PersonDetail = {
  name: "张思睿",
  age: 18,
  say() { return false }
}
```

### 交叉类型和接口继承的区别

- 相同点：都可以实现对象类型的组合
- 不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同

交叉类型

```typescript
interface A {
  fn: (value: number) => number
}

interface B {
  fn: (value: string) => string
}

type C = A & B

let c: C = {
  fn(value) { return value }  
}

c.fn(1)
c.fn("1")
c.fn(false)  // error
```

### 索引签名类型

绝大多数情况下，我们都可以在使用对象前就确定对象的结构，并为对象添加准确的类型

当无法确定对象中有哪些属性 (或者说对象中可以出现任意多个属性)，此时，就用到索引签名类型

```typescript
interface AnyObject<T> {
  [key: string]: T
}

let obj: AnyObject<number> = {
  a: 123
}
```

- 使用 `[key: string]` 来约束该接口中允许出现的属性名称。表示只要是 `string` 类型的属性名称，都可以出现在对象中。
- 这样，对象中就可以出现任意多个属性
- `key` 只是一个占位符，可以换成任意合法边变量名称
- 隐藏知识点：`JS` 中对象 `({})` 的键是 `string` 类型的 

在 `JS` 中数组是一类特殊的对象，特殊在数组的键 (索引) 是数值类型

并且，数组也可以出现任意多个元素。所以，在数组对应的泛型接口中，也用到了索引签名类型

```typescript
interface MyArray<T> {
  [n: number]: T
}

let arr: MyArray<number> = [1, 2, 3]
```

### 映射类型

映射类型：基于旧类型创建新类型 (对象类型)，减少重复、提升开发效率

例如：类型 `PropKeys` 有 `x/y/z` ，另一个类型 `Type1` 中也有 `x/y/z` 

```typescript
type PropKeys = "x" | "y" | "z"
type Type1 = { x: number, y: number, z: number }
```

这样写没错，但 `x/y/z` 重复写入。这时候旧可以使用映射类型来进行简化

```typescript
type PropKeys = "x" | "y" | "z"

type Type2<T> = { [key in PropKeys]: T }
```

- 映射类型是基于索引签名类型的，所以，改语法类似于索引签名类型，也使用 `[]`
- `key in PropKeys` 表示 `key` 可以是 `PropKeys` 联合类型中的任意一个，类似于 `for in`
- 使用映射类型创建的新对象类型 `Type2` 和类型 `Type1` 结构完全相同
- **注：映射类型只能在类型别名中使用，不能在接口中使用**

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建

```typescript
type Props = { a: number, b: string, c: boolean }

type Type3<T> = { [key in keyof Props]: T }
```

执行 `keyof Props` 获取到对象类型 `Props` 中所有键的联合类型

> 泛型工具类型都是基于映射类型实现的

例如：`Partial` 的实现

```typescript
type Props = { a: number, b: string, c: boolean }

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type PartialProps = Partial<Props>
```

> 索引查询类型

用来查询属性的类型

```typescript
type Props = { a: number, b: string, c: boolean }

type TypeA = Props["a"]
```

- `Props["a"]` 表示查询类型 `Props` 中属性 "a" 对应的类型 `number` 。所以，`TypeA` 的类型为 `number`
- `[]` 中的属性必须存在于被查询类型中，否则就会报错

![image-20230624152111108](https://s2.loli.net/2023/06/24/UTOnB9xVwQKRXvH.png)

> 查询多个索引类型

索引查询类型：同事查询多个索引类型

```typescript
type Props = { a: number, b: string, c: boolean }
```

使用字符串字面量的联合类型，获取属性 a 和 b 对应的类型

```typescript
type TypeA = Props["a" | "b"]
```

![image-20230624152852993](https://s2.loli.net/2023/06/24/zw7XINdWH3T1sxZ.png)

使用 `keyof` 操作符获取 `Props` 中所有键对应的类型

```typescript
type TypeB = Props[ketof Props]
```

![image-20230624153042013](https://s2.loli.net/2023/06/24/shiTRAdwBvl24tr.png)

## 函数

下面我们来查看ts中函数的使用

### 函数定义

下面是 TS 自动推断的函数类型

```typescript
let hd = () => '后盾人'

hd = 'houdunren.com' // 更改类型为字符串后将报错
```

我们可以使用 unknown转为字符串，但这也没有意义

```typescript
let a:string = hd as unknown as string
```

下面是使用显示类型定义函数 ，注意类型要使用大写的`Function` 这与 string/number/boolean 是有区别

```typescript
let hd: Function
hd = () => 'houdunren.com'
console.log(hd());

// 指定 fun 是一个函数且有两个参数；参数类型为数值；返回值为数值类型
// 语法： (参数: 类型, 参数: 类型...) => 返回值类型
let fun: (a: number, b: number) => number
fun = function(x, y):number {
  return x + y
}
```

### 函数

TS 可以指定函数参数的类型，也可以指定函数返回值的类型

```typescript
function sum(a: number, b: number): number {  // 函数的返回值被指定为数值类型
  return a + b
}
sum(123, 456) // 函数参数被指定为数值类型
```

 函数没有返回值可以设置为 `void`

```typescript
function fn(name: string): void {
  console.log(name)
}
fn("沐沐汐")
```

函数的可选参数

在可传可不传的参数名称后面添加问号

```typescript
function mySlice(start?: number, end?: number): void {}
```

`注` 可选参数只能出现在参数列表的最后，也就是说可选参数后面不能在出现必选参数

## 类

需要为构造函数指定类型注解，否则会被隐式推断为 `any` ，构造函数不需要返回值类型

```typescript
class Person {
  constructor(name: string, age: number) {}
}
new Person("沐沐汐", 18)
```



### 类的简介

```typescript
// 使用 class 关键字来定义一个类
/* 
 *  对象中主要包含了两个部分：
 *    => 属性
 *    => 方法
 */

class Person {
  /* 
  *   直接定义的属性是实例属性，需要通过对象的实例去访问
  *   const per = new Person();
  *   per.name
  * 
  *   使用 static 开头的属性是静态属性（类属性），可以直接通过类去访问
  *   Person.age
  *   
  *   readonly 开头的属性表示一个只读的属性无法修改
  * 
  */

  // 定义实例属性
  readonly name: string = "小天才电话手表";
  // 在属性前使用 static 关键字可以定义类属性（静态属性）
  static age: number = 18

  /* 
  *   定义方法
  *     => 如果方法以 static 开头则方法就是类方法，可以直接通过类去调用
  */

  sayHello() {
    console.log("hello");
  }
}

const per = new Person()

console.log(per);
console.log(Person.age);

// per.name = "啊啊啊"  // 无法分配到 "name" ，因为它是只读属性

per.sayHello()
```

### 构造函数

```typescript
class Dog {
  name: string;
  age: number;

  // constructor 被称为构造函数
  // 构造函数会在对象的创建时调用
  constructor(name: string, age: number) {
    // 在实例方法中，this 就表示当前当前的实例
    // 在构造函数中当前对象就是当前新建的那个对象
    // 可以通过 this 向新建的对象中添加属性
    this.name = name;
    this.age = age;
  }

  bark() {
    // 在方法中可以通过 this 来表示当前调用方法的对象
    console.log(this["name"]);
  }
}

let dog = new Dog("傻狗", 4)

dog.bark()
console.log(dog);
```

### 继承

类继承的两种方式：

- `extends` 继承父类
- `implements` 实现接口

```typescript
(function () {
  class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this["name"] = name;
      this["age"] = age;
    }
    sayHello(jiao: string) {
      console.log(jiao);
    }
  }

  /* 
  * Dog extends Animal 
  *   => 此时，Animal 被称为父亲，Dog 被称为子类
  *   => 使用继承后，子类将会拥有父类所有的方法和属性
  *   => 通过继承可以将多个类中共有的代码写在一个父类中
  *     + 这样只需要写一次即可让所有的子类都同时拥有父类的属性和方法
  *     + 如果希望在子类中添加一些父类中没有的属性或方法直接加载就行
  *   => 如果在子类中添加了和父类相同的方法，则子类方法会覆盖掉父类的方法
  *     + 这种子类覆盖掉父类方法的形式，我们称为方法的重写
  */

  class Dog extends Animal {
    sayHello(aaa: string) {
      console.log(aaa);
    }
  }

  class Cat extends Animal { }

  let dog = new Dog("傻狗", 4)
  console.log(dog);
  dog.sayHello("汪汪汪汪")

  let cat = new Cat("傻猫", 3)
})()
```

### super

```typescript
(function () {
  class Animal {
    name: string;
    constructor(name: string) {
      this["name"] = name
    }
    sayHello() {
      console.log("傻狗");
    }
  }

  class Dog extends Animal {
    age: number;
    constructor(name: string, age: number) {
      // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
      super(name)  // 调用父类的构造函数
      this["age"] = age
    }
    sayHello() {
      // 在类的方法中 super 就表示当前的父类
      // super.sayHello()
    }
  }
  let dog = new Dog("来福", 4)
})()
```

### 抽象类

```typescript
(function () {
  /* 
  *   以 abstract 开头的类是抽象类
  *     + 抽象类和其它类区别不大，只是不能用来创建实例对象
  *     + 抽象类就是专门用来被继承的类(也可以看做是一个生产东西的工厂)
  */
  abstract class Animal {
    name: string;
    constructor(name: string) {
      this["name"] = name
    }

    // sayHello() {
    //   console.log("我是一只动物");
    // }

    /* 
    *   定义一个抽象方法
    *     + 抽象方法使用 abstract 开头，没有方法体
    *     + 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
    */
    abstract sayHello(): void
  }

  class Dog extends Animal {
    sayHello() {
      console.log("汪汪汪");
    }
  }
  let dog = new Dog("来福")
})()
```

### 接口

> 接口的好处

- 接口是一种引用数据类型
- 接口是特殊的抽象类
- 接口是功能的集合，一般为抽象方法的集合
- class 定义类，interface 定义接口
- 类：对于类只能单继承，对于接口可以多实现
- 接口可以更好的定义规范
- 实现解耦，降低耦合度
- 继承与实现非常像
  - 子类继承父类，有权直接父类成员，可以不用重写直接使用
  - 实现类实现一个接口，拥有了接口的功能，但是都为抽象方法，需要重写才能使用，侧重重写。

> 接口如何使用

- jdk1.7 以及 1.7 之前的版本
  - 有公共的静态的常量：public static final 关键字任意都可以省略，默认会添加
  - 有公共的抽象的方法：public abstract 关键字任意都可以省略，默认会添加
- jdk1.8 以及之后的版本
  - 静态方法：被 static 关键字修饰的方法，通过接口名调用
  - 默认方法：被 default 关键字修饰的方法，通过实现类对象调用

1.  接口无法实例化
2.  需要通过实现类进行实现接口中的方法**使用关键字 `implements` 来实现接口**
3.  类对于：接口可以多实现，类只能单继承
4.  当一个类需要继承类并实现接口的时候，需要先写继承在写实现
5. 接口与接口之间可以多继承

- 通过具体的实现类对象调用
  - 具体实现类：重写所有的抽象方法 + 按需新增
  - 抽象实现类：按需重写 + 按需新增，需要具体的子类继承，重写抽象方法

```typescript
(function () {
  // 描述一个对象的类型
  type myType = {
    name: string,
    age: number
  }

  /* 
  *   接口用来定义一个类的结构,用来定义一个类中应该包含哪些属性和方法
  *     + 同时接口也可以当做类型声明取使用
  *     + 同样的命名不会报错，但会把二者合一
  *   
   */
  interface myImterface {
    name: string;
    age: number
  }

  interface myImterface {
    gender: string
  }

  const obj: myImterface = {
    name: "小天才电话手表",
    age: 11,
    gender: "男"
  }

  /* 
  *   接口可以在定义的时候去限制类的结构
  *     + 接口中的所有的属性都不能有实际的值
  *     + 接口只定义对象的结构，而不考虑实际的值
  *       - 在接口所有的方法都是抽象方法
  */

  interface myInter {
    name: string;
    sayHello(): void
  }

  /* 
  *  定义类时，可以使类去实现一个接口
  *    + 实现接口就是使类满足接口的要求
  */

  class myClass implements myInter {
    name: string;
    constructor(name: string) {
      this["name"] = name
    }
    sayHello() {
      console.log("小天才电话手表");
    }
  }
})()
```

### 属性的封装

- 属性实在对象中设置的，属性可以任意的被修改
- 属性可以任意被修改将会导致对象中的数据变得非常不安全

> TS 可以在属性前添加属性的修饰符

- public 修饰的属性可以在任意位置访问 (修改) 默认值
- private 私有属性，私有属性只能在类内部进行访问 (修改)
  - 通过在类中添加方法使得私有属性可以被外部访问
  - 获取属性时使用 . 点语法时 private 是有效果的, 使用 [] 动态变量时 private 是没有效果的
- protected 受包含的属性，只能在当前类和当前类的子类中访问（修改）
- static 开头的属性是静态属性（类属性），可以直接通过类去访问
- readonly 开头的属性表示一个只读的属性无法修改

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this["name"] = name;
    this["age"] = age
  }
  
  // 当属性私有化后如何正确访问
  // 定义方法访问 name
  getName() {
    return this.name
  }

  // 定义方法修改name
  steName(value: string) {
    this.name = value
  }

  // 定义方法访问 age
  getAge() {
    return this.age
  }

  // 定义方法修改 age
  setAge(value: number) {
    if (value > 0) {
      this.age = value
    }
  }
  
  // TS 中设置 getter 的方法的方式
  // 方法名不能与属性名相同
  get _name() {
    console.log("我执行啦!");
   	return this.name
  }

  set _name(value: string) {
    this.name = value
  }
}

let per = new Person("小天才电话手表", 18)

per.name = "小傻瓜电话手表"  // 属性“name”为私有属性，只能在类“Person”中访问(error)

// 第一种
per.steName("小傻瓜电话手表")
console.log(per.getName());

per.setAge(1)
console.log(per.getAge());

// 第二种
per._name = "小天才电话手表"
console.log(per._name);

```

子类去继承也是无法继承的

```typescript
class A {
  private num: number;
  constructor(num: number) {
    this.num = num
  }
  get _num() {
    return this.num
  }
}

class B extends A {}
let b = new B(18)

b.num  // 属性“num”为私有属性，只能在类“A”中访问(error)

console.log(b._num);
```

protected受包含的属性

```typescript
class C {
  protected sum: number;
  constructor(sum: number) {
    this.sum = sum
  }
}

class D extends C {
  text() {
    console.log(this.sum);
  }
}

let d = new D(123)

d.sum // 属性“sum”受保护，只能在类“C”及其子类中访问。

d.text()
```

属性设置语法糖

```typeScript 
class Person {
  constructor(name: string, age: number) {}
}
let person = new Person("小天才电话手表", 18)
person.name  // 小天才电话手表

// 这种写法等同与 => 

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age
  }
}
```

### 泛型

泛型是可以在保证类型安全前提下，让函数等与**多种类型**一起工作，从而实现复用，常用于函数、接口、class中。

在定义函数或是类时，如果遇到类型不明确就可以使用泛型。

```typescript
function fn<T>(a: T): T {
  return a
}
// 可以直接调用具有泛型的函数
fn("小天才")  // 不指定泛型，TS 可以自动对类型进行推断
fn<number>(45)  // 指定泛型


// 泛型可以同时指定多个
function fn2<T, K>(a: T, b: K): T {
  return a
}
fn2<number, string>(18, "小天才")


interface Inter {
  length: number
}

// T extends Inter 表示泛型 T 必须是 Inter 实现类(子类)
function fn3<T extends Inter>(a: T): number {
  return a.length
}
fn3("123")


class MyClass<T> {
  constructor(name: T) { }
}
let mc = new MyClass<string>("吸收系数")
```

> 当不传泛型类型时则推断为字面量类型

```typescript
function fn<T>(x: T):T {
  return x
}
fn(123)
// 泛型 T 则是 123
```

> 泛型约束

默认情况下，泛型函数类型变量 `<T>` 可以代码多个类型，这导致无法访问任何属性

例：

```typescript
function len<T>(value: T): T {
  console.log(value.length)  // error
  return value
}
```

`<T>` 可以代表任意类型，无法保证一定存在 `length` 属性，比如 `number` 类型就没有 `length` 。此时，就需要为泛型添加约束来收缩类型 (缩窄类型取值范围)

添加泛型约束收缩类型，主要有以下两种方式

1. 指定更加具体的类型

```typescript
function len<T>(value: T[]): T[] {
  console.log(value.length)
  return value
}
```

2. 添加约束

通过 `extends` 关键字使用该接口，为泛型 (类型变量) 添加约束

该约束表示：传入的类型必须具有 `length` 属性

`注` 传入的实参 (例如：数组) 只要有 `length` 属性即可，这也符合前面讲到的类型兼容性

```typescript
interface Len { length: number }

function len<T extends Len>(value: T): T {
  console.log(value.length)
  return value
}
```

泛型的类型变量可以有多个，并且类型变量之间还可以约束 (例如：第二个类型变量受第一个类型变量约束)。

```typescript
function getProp<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
getProp({ name: "jack", age: 18 }, "name")
```

- `keyof` 关键字接收一个对象类型，生成其键名称 (可能是字符串或数字) 的联合类型
- 本示例中 `keyof T` 实际上获取的是传入的对象所有键的联合类型，也就是 `"name" | "age"`
- 类型变量 `K` 受 `T` 约束，可以理解为：
  - `K` 只能是 `T` 所有键中的任意一个，或者说只能访问对象中存在的属性 

> 泛型接口

接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

```typescript
interface IdFunc<T> {
  id: (value: T) => T
  ids: () => T[]
}

let obj: IdFunc<number> = {
  id(value) {
    return 1
  },
  ids() {
    return [1, 2, 3]
  }
}
```

- 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量
- 使用泛型接口时，需要显式指定具体的类型

> 泛型类

类似于泛型接口，在 `class` 名称后面添加 `<类型变量>`，这个类就变成了泛型类

- 在使用泛型类时在类函数中使用 `constructor` 可以省略 `<类型变量>` 类函数会自动推断出类型

```typescript
class GentericNumber<T> {
  defaultValue: T
  add: (x: T, y: T) => T
  constructor(value) {}
}

const myNum = new GentericNumber(10)
```

![image-20230624102942905](https://s2.loli.net/2023/06/24/FNoQrJcS9PDYEHb.png)

- 在不使用 `constructor` 时需要手动自定类型否则 `TS` 推断为 `unknown` 未知类型

```typescript
class GentericNumber<T> {
  defaultValue: T
  add: (x: T, y: T) => T
}

const myNum = new GentericNumber<number>()
```

- `TS` 自动推断

![image-20230624103307769](https://s2.loli.net/2023/06/24/AdFnDTCVmyIGvgP.png)

- 手动指定类型

![image-20230624103345123](https://s2.loli.net/2023/06/24/VqpKSRFz7meaDdQ.png)

> 泛型工具类型

泛型工具类型：`TS` 内置了一些常用的工具类型，来简化 `TS` 中的一些常见操作。

他们都是基于泛型实现的 (泛型使用于多种类型，更加通用)，并且是内置的，可以直接在代码中使用。

常用工具类型：

- `Partial<T>`

  - 泛型工具类型 `Partial<T>` 用来构造 (创建) 一个类型，将 `<T>` 的所有属性设置为可选

  ```typescript
  interface Props {
    id: string
    children: number[]
  }
  
  type PartialProps = Partial<Props>
  ```

  ![image-20230624105049500](https://s2.loli.net/2023/06/24/gRtQrPEj6m1aDeB.png)

- `Readonly<T>`

  - 泛型工具类型 `Readonly<T>` 用来构造一个类型，将 `<T>` 的所有属性都设置为 `readonly` (只读) 

  ```typescript
  interface Props {
    id: string
    children: number[]
  }
  
  type ReadonlyProps = Readonly<Props>
  
  let props: ReadonlyProps = {
    id: "1",
    children: [1, 2, 3]
  }
  
  props.id = "2"  // error
  ```

  ![image-20230624105907682](https://s2.loli.net/2023/06/24/cjhzruasS26F3Ak.png)

- `Pick<T, K>`

  - 泛型工具类型 `Pick<T, K>` 从 `<T>` 中选择一组属性来构造新类型

  ```typescript
  interface Props {
    id: string
    title: string
    children: number[]
  }
  
  type PickProps = Pick<Props, "id" | "children">
  ```

  ![image-20230624110621947](https://s2.loli.net/2023/06/24/XN4iLphFZradqtz.png)

  - `Pick` 工具类型有两个类型变量：1. 表示选择谁的属性；2. 表示选择那几个属性
  - 其中第二个类型变量，如果只选择一个则只传入该属性名即可
  - 第二个类型变量传入的属性只能是第一个类型变量中存在的属性

- `Record<K, T>`

  - 泛型工具类型 `Record<K, T>` 构造一个对象类型，属性键为 `<K>` 属性类型为 `<T>`

  ```typescript
  type RecordObj = Record<"a" | "b" | "c", string[] | number[] | Object[]>
  
  let obj: RecordObj = {
    a: ["1", "2", "3"],
    b: [1, 2, 3],
    c: [
      	{ name: "张思睿", age: 18}, 
        { name: "里斯", age: 19}
    ]
  }
  ```

  ![image-20230624112044745](https://s2.loli.net/2023/06/24/xeKaoh3lC9tw2X7.png)

- `Record` 工具类型有两个类型变量：1. 表示对象有哪些属性；2. 表示对象属性的类型

### 类型别名与接口的区别

- 相同点：都可以给对象指定类型
- 不同点：
  - 接口，只能为对象指定类型
  - 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名

```typescript
interface Iperson {
  name: string,
  age: number,
  sayHi(): void
}

type Iperson = {
  name: string,
  age: number,
  sayHi(): void
}

type myType = string
```

### 接口的继承

两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用

```typescript
interface Point2D { x: numbr, y: number }

// 继承 
interface Point3D extends Point2D {
  z: number
}

// Point3D 继承了 Point2D 上的所有属性，并且声明了自己的 z 属性
```

### 类型兼容性

两种类型系统：

- 结构化类型系统
- 标明类型系统

**`TS` 采用的是结构化类型系统**，也叫做 `duck typing (鸭子类型)` ，类型检查关注的是值所具有的形状。

也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为他们属于统一类型。

```typescript
class Point {x: number; y: number}
class Point2D {x: number; y: number}
const point: Point = new Point2D()
```

`注` 在结构化类型系统中，如果两个对象具有相同的形状，则认为它们属于统一类型，这种说法并不准确。

更准确的说法：对于对象类型磊说， y 的成员至少于 x 相同，则 x 兼容 y （成员多的可以赋值成员少的）

```typescript
class Point {x: number; y: number;}
class Point2D {x: number; y: number;  z: number}
const point: Point = new Point2D()
```

除了 `class` 之外，`TS` 的其他类型也存在相互兼容的情况

1. 接口兼容性
2. 函数兼容性

> 接口之间的兼容性，类似于 `class` 

```typescript
interface Point {
  x: number
  y: number
}

interface Point2D {
  x: number
  y: number
}

interface Point3D {
  x: number
  y: number
  z: number
}

let p1: Point = { x: 3, y: 4 } 
let p2: Point2D = { x: 3, y: 4 } 
let p3: Point3D = { x: 3, y: 4, z: 5 }

// true
p1 = p2
p2 = p1
p1 = p3

// false
p3 = p1
```

`class` 和 `interface` 之间可以兼容

```typescript
class Point4D {
  x: number
  y: number
  z: number
}

let p3: Point3D = new Point4D()
```

> 函数之间兼容性比较复杂，需要考虑：

1. 参数个数
2. 参数类型
3. 返回值类型

- 参数个数，参数多的兼容参数少的 (或者说，参数少的可以赋值给参数多的) 跟上面的正好相反

```typescript
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void

let f1: F1 = (a) => {}
let f2: F2 = (a, b) => {}

// true
f1 = f2

// false
f2 = f1
```

```typescript
let arr = ["a", "b", "c"]
arr.forEach(() => {})
```

- 数组 `forEach` 方法的第一个参数是回调函数，该示例中类型为：`(value: string, index: number, array: string[]) => void`
- 在 `JS` 中省略用不到的函数参数实际上是很常见，这样的使用方式，促成了 `TS` 中函数类型之间的兼容性
- 并且因为回调函数是由类型的，所以，`TS` 会自动推导出参数 `item/index/array` 的类型

> 函数参数类型兼容性

- 参数类型，相同位置的参数类型要相同 (原始类型) 或兼容 (对象类型)

原始类型

```typescript
// 函数类型 F2 兼容函数类型 F1，因为 F1 和 F2 的第一个参数类型相同
type F1 = (a: number) => void
type F2 = (a: number) => void

let f1: F1 = (a) => {}
let f1: F1 = (a) => {}

// true
f1 = f2
f2 = f1

// false (不能将类型“number”分配给类型“string”)
type F2 = (a: string) => void
f1 = f2  // error
```

对象类型

`注` 此处与前面的接口兼容性冲突

将对象拆开，把每个属性看作一个个参数，则参数少的可以赋值给参数多的

```typescript
interface Ponit2D {
  x: number
  y: number
}

interface Ponit3D {
  x: number
  y: number
  z: number
}

type F2 = (p: Point2D) => void
type F3 = (p: Ponit3D) => void

let f2: F2 = (a) => {}
let f3: F3 = (b) => {}

f3 = f2
```

> 函数返回值类型

函数返回值类型，只关注返回值类型本身即可

- 返回值类型是原始类型，此时两个类型要相同

```typescript
type F2 = () => string
type F3 = () => string

let f2: F2 = () => { return "" }
let f3: F3 = () => { return "" }

f2 = f3
f3 = f2

// error
type F3 = () => number
let f3: F3 = () => { return 1 }

f2 = f3  // false
```

- 返回值类型是引用类型，此时成员多的可以赋值给成员少的

```typescript
type F2 = () => { name: string }
type F3 = () => { name: string, age: number }

let f2: F2 = () => { return { name: "沐沐汐" } }
let f3: F3 = () => { return { name: "沐沐汐", age: 18 } }

f2 = f3
```

