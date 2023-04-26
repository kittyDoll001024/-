# axios

## 安装







### 解决 axios 数据请求时 出现的跨域问题

VUE是基于node.js，所以解决跨域问题，设置一下反向代理即可

我这里要调用的第三方接口地址为      https://iw233.cn/API/MirlKoi.php

可传参数为  json

- 找到项目的目录config > index.js 下面有个服务器配置dev 下面的 proxyTable：{}

![image-20220330143714143](https://s2.loli.net/2022/12/13/aAPNfezw7uQyhXg.png)

- 然后在axios请求里改一下url

![image-20220330143936728](https://s2.loli.net/2022/12/13/7aHxXhjbqnSCP5v.png)

修改之后请求接口就不会再报 Access-Control-Allow-Origin此类跨域错误



### 解决 vue.cli3.0配置 config 文件

#### 在 vue.cli3.0 中初始化文件夹没有了我们的 config 文件夹在需要配置相关文件时候，就要在根目录下创建一个 vue.config.js 文件

````
module.exports = {
    // 基本路径
    publicPath: '/',//注意新版本这里改成了publicpath
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
     // 是否使用css分离插件 ExtractTextPlugin
     extract: true,
     // 开启 CSS source maps?
     sourceMap: false,
     // css预设器配置项
     loaderOptions: {},
     // 启用 CSS modules for all css / pre-processor files.
     modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
     open: process.platform === 'darwin',
     host: '0.0.0.0',
     port: 8088,
     https: false,
     hotOnly: false,
     proxy: null, // 设置代理
     before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
     // ...
    }
   }

````

把这段代码复制进去重新启动项目你就会发现配置文件已经生效了