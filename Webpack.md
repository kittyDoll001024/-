# Webpack

本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。

Tip

## Webpack简介

### 什么是Webpack

Webpack 是一种前端资源构件工具，一个静态模块打包器（module bundler）。在Webpack看来，前端的所有资源问及那（js/json/img/less/...）都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）

> https://webpack.docschina.org/concepts/

![image-20211024122343633](https://i.loli.net/2021/10/24/LmOqdPtJyh1k8fo.png)

### Webpack的五个核心概念

#### Entry

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

默认值是 `./src/index.js`，但你可以通过在 [webpack configuration](https://webpack.docschina.org/configuration) 中配置 `entry` 属性，来指定一个（或多个）不同的入口起点。例如：

**webpack.config.js**

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

###### Tip

在 [入口起点](https://webpack.docschina.org/concepts/entry-points) 章节可以了解更多信息。

#### Output

输出(Output)指示 webpack 打包后的资源 `bundles` 输出到哪里去，以及如何命名。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。可能你想要了解在代码最上面导入的 path 模块是什么，它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html)，用于操作文件路径。

Tip

#### Loader

Loader 让 webpack 能够去处理那些非 JavaScript 文件 (webpack 自身只理解JavaScript)

在更高层面，在 webpack 的配置中，**loader** 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。
2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

以上配置中，对一个单独的 module 对象定义了 `rules` 属性，里面包含两个必须属性：`test` 和 `use`。这告诉 webpack 编译器(compiler) 如下信息：

> “嘿，webpack 编译器，当你碰到「在 `require()`/`import` 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 **use(使用)** `raw-loader` 转换一下。”

请记住，使用正则表达式匹配文件时，你不要为它添加引号。也就是说，`/\.txt$/` 与 `'/\.txt$/'` 或 `"/\.txt$/"` 不一样。前者指示 webpack 匹配任何以 .txt 结尾的文件，后者指示 webpack 匹配具有绝对路径 '.txt' 的单个文件; 这可能不符合你的意图。

#### Plugins

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

###### Tip

查看 [插件接口(plugin interface)](https://webpack.docschina.org/api/plugins)，学习如何使用它来扩展 webpack 能力。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

在上面的示例中，`html-webpack-plugin` 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中

###### Tip

webpack 提供许多开箱可用的插件！查阅 [插件列表](https://webpack.docschina.org/plugins) 获取更多。

#### Mode

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

```javascript
module.exports = {
  mode: 'production',
};
```

| 选项        | 描述                                                         | 特点                       |
| ----------- | :----------------------------------------------------------- | -------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development | 能让代码本地调试运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production | 能让代码优化上线运行的环境 |

> development 启用 NamedChunksPlugin 和 NamedModulesPlugin。
>
> production 启用 FlagDependencyUsagePlugin  FlagIncludedChunksPlugin   ModuleConcatenationPlugin   NoEmitOnErrorsPlugin   OccurrenceOrderPlugin   SideEffectsFlagPlugin 和 TerserPlugin。

## Webpack基本使用

### 基本使用

开始使用之前我们要先安装一下webpack和webpack-cli，之后在文件中创建webpack.config.js配置文件，然后写入以下内容

```javascript
// CommonJS语法
const path = require('path') // path是node的核心库

module.exports = {
  mode: 'development', // 选择的模式
  entry: path.join(__dirname, 'src', 'index.js'), // 入口文件
  output: { // 打包之后保存的地址
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}
```

基本配置好之后我们可以在package.json文件中添加一个运行脚本 `build:webpack`

```json
{
  ......
	"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
  },
  ......
}
```

之后我们就可以在终端中运行一下代码

```powershell
npm run build
```

运行结束之后webpack会帮我们生成打包好的文件

![image-20211024141633151](https://i.loli.net/2021/10/24/8KL5mGyOEHwqh3Y.png)

我们可以在文件夹中再创建一个index.html文件，用于引入打包好的bundle.js文件

### htmlWebpackPlugin

这样创建会很麻烦，我们需要自己创建html文件并且引入，webpack中的htmlWebpackPlugin插件可以帮助我们完成这步操作

首先安装这个插件

```powershell
npm install html-webpack-plugin --save-dev
```

安装好之后我们需要在webpack.config.js中使用插件，需要先在我们要打包的文件中创建好index.html文件，然后我们配置这个插件的时候就可以指定具体根据哪个文件打包，并且也可以指定打包好之后的页面名称，这个插件会帮助我们引入好js文件

```javascript
// CommonJS语法
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plguin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // 插件
  plugins:[
   new htmlWebpackPlugin({
     template:path.join(__dirname, 'src', 'index.html'),
     filename:'index.html'
   })
  ]
  
}
```

### webpack-dev-server

当我们打包好文件之后如果再需要修改文件那么就需要重新的进行打包，webpack-dev-server可以很好的帮助我们实现动态更新

首先是安装好这个工具

```powershell
npm i webpack-dev-server --save-dev
```

安装好之后我们可以在webpack.config.js配置文件中添加配置项

```javascript
// CommonJS语法
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plguin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
  plugins:[
   new htmlWebpackPlugin({
     template:path.join(__dirname, 'src', 'index.html'),
     filename:'index.html'
   })
  ],
  // webpack-dev-server工具
  devServer:{
    port:8000, // 指定端口号
    static:path.join(__dirname, 'dist') // 制定静态资源路径
  }
}
```

配置好之后我们需要在package.json文件中添加运行脚本

```json
{
  ......
	"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev":"webpack-dev-server"
  },
  ......
}
```

终端运行

```powershell
npm run dev
```

![image-20211024142838236](https://i.loli.net/2021/10/24/YhjsTtR3b96FiLX.png)

会帮助我们开启一个服务器，当我们进行修改调试的时候会自动刷新页面

> 即使我们没有打包好的静态资源文件，依然是可以运行服务器的，因为服务器里面的静态文件是保存在内存中的，所以没有文件也可以进行调试，等我们调试好文件之后在进行打包，会节省我们的时间

### 编译ES6语法

当我们在文件中写入es6之后的语法时，打包好之后也是es5的语法，如果要运行在低版本的浏览器也就是不支持es6语法的浏览器的时候这些语法就无法使用，所以我们需要一个编译工具帮助我们把es6的语法编译成es5的语法这样的话就可以不用考虑兼容问题

我们需要用到babel这个插件，首先安装一下

```powershell
npm install @babel/core @babel/preset-env babel-loader
```

安装好之后我们需要在webpack.config.js中配置一下

```javascript
// CommonJS语法
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  // Module 中可以配置对指定的文件类型进行指定的 Loader 解析规则。
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 指定只需要去检测src文件中的以js文件结尾的
        include: path.join(__dirname, 'src'),
        // 排除 node_modules 文件夹中的文件
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    port: 8000,
    static: path.join(__dirname, 'dist'),
  },
}
```

配置好之后我们就可以打包查看，可以发现所有的es6语法会自动被转换成为es5的语法