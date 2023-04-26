[TOC]

# Node.js

## Node.js 介绍

### 为什么要学习 Node.js 

- **企业需求**
  - 具有服务端开发经验更好
  - front-end（前端）
  - back-end（后端）
  - 全栈开发工程师
  - 基本的网站开发能力
    - 服务端
    - 前端
    - 运维部署
  - 多人社区

![image-20220419152011066](https://s2.loli.net/2022/12/09/uEbop7SMOGQntcg.png)

----

### Node.js 是什么

----

#### Node.js 是 javascript 运行进行时

- Node.js 不是一门语言；也不是库、不是框架
- Node.js 是一个 JavaScript 运行时环境（运行平台）
- 简单来说就是 Node.js 可以解析和执行 JavaScript 代码

----

#### 浏览器中的 JavaScript

- Ecmascript
  - 基本语法
  - if
  - var
  - Array
  - Object
  - function
- BOM
- DOM

- Node.js 中的 JavaScript
  - 没有 BOM、DOM
  - 只有 Ecmascript
  - 在 Node 这个 Javascript 执行环境中为 JavaScript 提供了一些服务器级别的操作 API
    - 例如：文件读写
    - 网络服务的构建
    - 网络通信
    - http 服务器

----

#### 构建与 Chrome 的 V8 引擎之上

  - 我们编写的代码只是具有特定格式的字符串
  - 引擎可以帮助我们去解析和执行
  - Google Chrome 的 V8 引擎是目前公认的解析 JavaScript 代码最快的
  - Node.js 的开发者把 Google Chrome 中的 V8 引擎移植出来， 开发了一个独立的 JavaScript 的运行时环境


- **Node.js uses an envent-driven,non-blocking I/O mode that makes it lightweight and efficent.（关于 Node.js 的特性）**
  - envent-driven  事件驱动
  - non-blocking I/O mode 非阻塞 IO 模型 （异步）
  - lightweight and efficent  轻量和高效
- **Node.js package ecosystem,npm,is the larget scosystem of open sourcr libraries in the world（npm）**
  - npm 是世界上最大的开源库生态系统
  - 绝大多数 JavaScript 相关的包都存放在了 npm 上
  - 为 JavaScript 下载或托管

----

###   Node.js 能做什么

- **Web 服务器后台**
- **命令行工具**
  - npm
  - git
  - hexo
- **对于前端工程师来讲，接触最多的还是 node 的命令行工具**
  - webpack
  - gulp
  - npm

----

### Node.js 预备知识

- HTML、CSS、JavaScript
- 简单的命令行操作
- 流程控制

----

## 起步

### 安装 Node 环境

- **查看 Node 环境版本号**
- 下载[https://nodejs.org/en/](https://gitee.com/link?target=https%3A%2F%2Fnodejs.org%2Fen%2F)

  - ![image-20220412173244676](https://s2.loli.net/2022/12/09/D5V8BwYEjZxaslJ.png)

  - ![image-20220412173342890](https://s2.loli.net/2022/12/09/jdqP7Z8GsB1NlFz.png)
- **安装**
  - 一直 next 
- **确认 node 是否安装成功**
  - 打开命令行(win+r) 输入 node  - -vaersion（简写：node - -v）
- **环境变量**

----

### 解析执行 JavaScript 

1.  创建编写 JavaScript 脚本文件
2. 打开终端，定位脚本文件的所属目录
3. 输入 `node 文件名` 执行对应的文件

**注：文件名不要使用 node.js 也不要使用中文来命名**

----

## fs 模块

**文件操作模块**

- 浏览器中的 JavaScript 没有文件操作能力
- Node 中的 JavaScript 具有文件操作能力
- fs 是 file-system 的简写，为系统文件
- 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
- 在 fs 这个核心模块，就提供了所有文件操作相关的 API
  - fs.readFile 用来读取文件
  - fs.writeFile 用来写入文件
- 文件中存储的都是二进制数据，可以用 `toString()` 方法转换为字符串

----

### 文件的操作

- 浏览器中的 JavaScript 是没有文件操作的能力
- 但是 Node 中的 JavaScript 具有文件操作的能力
- fs 是 file-system 的简写，就是文件系统
- 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
- 在 fs 这个核心模块中， 就提供了所有的文件操作相关的 API
  - 例如：fs.readFile 就是用来读取文件的
- 文件中存储的都是二进制数据，用  `toString()` 方法转换为字符串

#### 文件读取：

- 使用 require 方法加载 fs 核心模块
- 使用 readFile 函数读取文件
  - 第一个参数就是要读取文件路径
  - 第二个参数是可选的
    - = 就是告诉它把读取到的文件直接按照 `utf-8` 编码转换成我们认识的字符
  - 第三个参数就是一个回调函数
    -  = error
      - 如果读取失败，error 就是错误对象
      - 如果读取成功，error 就是 null
    - = data
      - 如果读取成功，data 就是读取到的数据
      - 如果读取失败，error 就是错误对象
    - = 成功
      - data 数据
      - error null
    - = 失败
      - data null
      - error 错误对象

````javascript
var fs = require('fs')

fs.readFile('./hello.txt', function(error, data) {
  /*
  * <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 2e 6a 73>
  *  + 文件中存储的其实都是二进制数据 0 和 1
  *  + 这里为什么看到的是不是 0 和 1，因为二进制在这里转换成了十六进制
  *  + 无论是二进制还是十六进制，我们都是无法解析出来的
  *  + 这时候我们就可以通过 toString 方法来解析成我们认识的字符
  * */
  error ? console.log(error) : console.log(data.toString())
})
````

----

#### 文件写入：

````javascript
let fs = require("fs")
fs.writeFile("./node.txt", "hello node.js", function(error) {
  console.log("写入成功")
  console.log(error)
})
````

----

#### 文件追加内容：

- 尾部追加文件（对应的 `fs.appendFileSync()` 头部追加）

````javascript
let fs = require("fs")
let path = "./hello.txt"
const content = "node.js 略略略略"
fs.appendFile(path, `\n${content}`, function(error) {
  error ? "" : console.log("追加成功")
})
````

默认情况下，此 API 会替换文件的内容（如果文件已经存在）

可以通过指定标志来修改默认的行为：

````javascript
fs.appendFile(path, content, {flag: "a+"}, function(error) {})
````

常用的标志有：

- `r+` 打开文件用于读写
- `w+` 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件
- `a` 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件
- `a+` 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件

更多标志可查看：http://nodejs.cn/api/fs.html#fsfilesystemflags

----

#### 文件删除：

````javascript
let fs = require("fs")
fs.unlink("./aaaaa.txt", function(error) {
  error ? "" : console.log("删除成功")
})
````

----

#### 获取文件目录：

已异步的方式读取文件目录（属于 fs 模块下）

- 第一参数：目录路径
- 第二参数：回调函数

```javascript
let fs = require("fs")
let wwwDir = 'E:/www'
  fs.readdir(wwwDir, function (err, files) {
    files.splice(0, 1)
    console.log(files)
	})
```

- 获取到的文件目录为数组形式，可进行循环遍历

- 这里在获取到的文件目录中可能会出现一个名叫 `desktop.ini` 的文件

  - 这是我们系统中特有的，为于我们修改文件夹的样式等，是不可以删除的
  - 解决方法：只要使用数组中的方法把第一个去掉就好了（此文件默认排在第一位）

  ````javascript
  files.splice(0, 1)
  ````

----

#### 检查文件是否存在：

````javascript
let fs = require("fs")
fs.access("./hello.txt", function(error) {
  console.log(error ? "目录/文件不存在" : "文件存在，可进行下一步操作");
})
````

----

## HTTP

### IP 地址和端口号

- ip 地址用来定位计算机
- 端口号用来定位具体的应用程序
- 所有需要联网通信的应用程序都会占用一个端口号
- 端口号的范围从 0 - 65536 之间
- 计算机中默认的端口号尽量不要访问
  - 例如 http 服务的 80


![image-20220421091156235](https://s2.loli.net/2022/12/09/tHw5yms2DCrqfVW.png)

----

### 服务器

- 提供服务：为数据服务
- 发送请求
- 接收请求
- 处理请求
- 反馈（发送响应）
- 当客户端请求过来，就会自动触发服务器的 `request` 请求事件，然后执行第二个参数：回调处理函数

**搭建简易服务器**

````javascript
// 在 Node 中专门提供了一个核心模块：http
// http 这个模块的职责就是帮你创建编写服务器的

// 1. 加载 http 核心模块
let http = require("http")

// 2. 使用 http.createServer() 方法创建一个 Web 服务器
//    返回一个 Server 实例
let  server = http.createServer()

/*
*  3. 服务器要干嘛？
*     + 提供服务：对数据的服务
*     + 发请求
*     + 接收请求
*     + 处理请求
*     + 给个反馈（发送响应）
*     + 注册 request 请求事件
*     + 当客户请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
* */
// 注册 request 事件
server.on("request", function() {
	// 每访问一次这里就会监听到一次
  console.log("收到客户端的请求")
})
// 绑定端口号，启动服务
server.listen(8000, function() {
  // 可以通过我们本地的 ipv4 来访问 http://192.168.105.107:8000
  console.log("服务器启动成功！")
})
````

----

### `request` 请求事件处理函数

- `request` 请求事件处理函数，需要接收两个参数：`request` 和 `response`
- `request` 请求对象：请求对象可以用来获取客户端的一些请求信息，例如请求路径
- `response` 响应对象：响应对象可以用来给客户端发送响应消息
- 响应内容只能是二进制数据或者字符串
- 转出数据内容为其他数据类型时需转化格式
- 一个请求对应一个响应，已经结束响应则无法重复发送响应
- 无请求就无响应

````javascript
let http = require("http")

let server = http.createServer()
/*
*   = request 请求事件处理函数，需要接收两个参数：
*     + Request 请求对象
*         请求对象可以用来获取客户端的一些请求信息，例如请求路径
*     + Response 响应对象
*         响应对象可以用来给客户端发送响应消息
* */
server.on("request", function(request, response) {
  console.log("收到客户端请求", request.url);
  // response 对象有一个方法：write 可以用来给客户端发送响应数据
  // write 可以使用很多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  response.write("已响应")
  // 结尾一定要 end 结束
  response.end()
})

server.listen(8000, function() {
  console.log("服务器启动成功");
})
````

````javascript
let http = require("http")

let server = http.createServer()

server.on("request", function(request, response) {
  console.log("客户端访问成功")
  // 可以使用 response.end() 结束时发送数据, 简化掉 response.write()
  // request.url 获取到的是端口号之后的那一部分路径，也就是说所有的 url 都是以 / 开头的
  /*const url = request.url
  if(url === "/index") {
    const arr = [
      {
        iphone: "苹果",
        price: 8888
      },
      {
        iphone: "菠萝",
        price: 7777
      },
      {
        iphone: "小米",
        price: 1999
      },
      {
        iphone: "锤子",
        price: 3333
      }
    ]
    /!*
    * = 响应内容的只能是二进制数据或字符串
    *   + 字符串类型
    *   + 数字类型
    *   + 对象类型
    *   + 数组
    *   + 对象
    * *!/
    response.end(JSON.stringify("./index.html"))
  }else {
    response.end("404")
  }*/
})

server.listen(80, function() {
  console.log("服务器启动")
})

````

----

### Content-type

- 服务器默认发送的数据为 `utf-8` 编码内容
- 但是浏览器不知道你是 `uft-8` 编码的内容
- 浏览器在不知道服务器响应内容编码的情况下，会按当前操作系统默认编码去解析
- 中文操作系统默认编码为 `gbk`
- 在 `http` 协议中，`Content-Type` 就是用来告知对方我给你发送的数据内容是什么类型
- 不同的资源对应的 `Content-Type` 是不一样
- `Content-Type` 工具：[HTTP Content-type 对照表 (oschina.net)](https://tool.oschina.net/commons)

````javascript
// 加载 http 模块
let http = require("http")
// 创建 server 服务器实例对象
let server = http.createServer()
// 注册 request 监听事件A
server.on("request", function(require, response) {
  if (require.url === "/index") {
    response.setHeader("Content-Type", "text/plain; charset=utf-8")
    response.end("hello，憨憨")
  }else if(require.url === "/html") {
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    response.end("<p>来呀<a href='#'>点我鸭</a></p>>")
  }
  // text/plain 就是普通文本
  // 如果你发送的时 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
})
// 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log("启动成功")
})
````

----

### 返回文件（http-fs）

- 发送的并不是文件，本质上来讲发送的是文件的内容（一堆由十六进制组成的字符）、
- 当浏览器收到服务器响应内容之后，就会根据你的 `Content-Type` 进行对应的解析处理
- 结合 `fs` 发送文件中的数据
- 字符数据需指定编码
- 图片不需要指定编码

----

#### 根据 `url` 返回内容

1.  加载指定模块
2. 创建服务器实例对象
3. 监听 `request` 事件
   1.  判断请求的 `url`
   2. 为对应的 `url` 返回文件
      1. 读取文件内容
      2. 响应输出文件内容（注意转换格式与编码）
4.  绑定端口号，启动服务

````javascript
// 加载 http 模块
let http = require("http")
let fs = require("fs")

// 创建 server 服务器实例对象
let server = http.createServer()

// 注册 request 监听事件
server.on("request", function(req, res) {
  let url = req.url
  if(url === "/index") {
    fs.readFile("./index.html", function(error, data) {
      if(error) {
        console.log("文件读取失败")
      }else {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.end(data.toString())
      }
    })
  }else if (url === "/img") {
    fs.readFile("./ip地址和端口号.png", function (error, data) {
      if(error) {
        console.log("图像获取失败")
      }else {
        res.setHeader("Content-Type", "image/png")
        res.end(data)
      }
    })
  }else {
    res.end("404")
  }
})

server.listen(8000, function() {
  console.log("server in running ");
})
````

----

#### 浏览器输入路径打开文件

**需求：用户在浏览器输入文件即可访问该文件内容**

- 将用户输入的文件转化为 `fs` 所找文件路径
- `fs` 读取文件
- `response` 响应文件内容
- 输出文件内容

```javascript
// 加载 http、fs 模块
let http = require("http")
let fs = require("fs")
// 创建 server 实例对象
let server = http.createServer()
/*
* = 监听 server 的 request 请求事件，设置请求处理函数
*   - 请求
*     + 处理
*   - 响应
*     + 一个请求对应一个响应，如果在一个请求的过程中，已经结束响了，则不能重复发送响应，没有请求就没有响应
* */
// 咱们以前使用过 Apache 服务器软件，这个软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览
server.on("request", function (req, res) {
  // 此路径不能是在 Deaktop 中
  let wwwDir = 'E:/www'
  // 初始默认路径
  let filePath = '/index.html'
  let url = req.url
  /*
  * = '/favicon.ico' 问题
  *   - 当这个路径出现后就一直会执行两次
  *     + 使得我们正确的路径被后面的 '/favicon.ico' 覆盖掉，拿到的数据都是 undefined
  * */
  if(url.indexOf("/favicon.ico") ===-1) {
    if(url !== '/') {
      filePath = url
    }
    fs.readFile(wwwDir + filePath, function (error, data) {
      if (error) {
        return res.end('404 Not Fount')
      }
      /*
      * = 当我们所访问的数据是一个 html 页面是，就不需要使用解码
      *   - 因为 html 页面通过 meta 元数据声明了文本编码格式，浏览器会自动识别
      * */
      res.end(data)
    })
  }
})
// 绑定服务器端口
server.listen(3000, function () {
  console.log('server is running');
})
```

----

### 重定向

#### 状态码 301 和 302 

**301**

- 永久性的重定向，搜索引擎在抓取新内容的同时将旧网址替换为重定向之后的网址
- 浏览器会有一个缓存，为了方便下一次加载

![image-20220426194344355](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220426194344355.png)

**302**

- 暂时性跳转，搜索引擎抓取新的内容的同时保留旧网址
- 服务器返回 302 时，搜索引擎认为新网址是暂时的

```javascript
res.statusCode = 302
res.setHeader('Location', '/')
res.end()
```



----

### favicon.ico

- 在启动服务器，使用 `require.url` 时，总会拿不到我们想要的 data 数据
- 每次执行还会翻倍执行，导致最后打印出来的都是 `favicon.ico`

**解决：**清理 `favicon.ico`

````javascript
if(url.indexOf("/favicon.ico") === -1) {}
````

----

### 服务端渲染页面

```javascript
let http = require("http")
let fs = require("fs")

let server = http.createServer()

server.on("request", function (req, res) {
  let Dir = 'E:\\www'
  let url = req.url
  if(url.indexOf("/favicon.ico") === -1) {
    fs.readFile('E:/www/template.html', function (error, data) {
      if (error) {
        return res.end('404 Not Fount.');
      }
      fs.readdir(Dir, function (err, files) {
        files.splice(0, 1)
        let content = ''
        files.forEach(item => {
          content += `
            <tr>
              <td data-value="img/">
                <a class="icon dir" href="/E:/www/img/">${item}/</a>
              </td>
              <td class="detailsColumn" data-value="0"></td>
              <td class="detailsColumn" data-value="1650618247">2022/4/22 17:04:07</td>
            </tr>
          `
        })
        // 转换成我们可识别的代码
        data = data.toString()
        // 替换前端预留的特殊标记
        data = data.replace('^_^', content)
        // 发送解析替换后的响应数据
        res.end(data)
      })
    })
  }
})

server.listen(3000, function () {
  console.log('server is running');
})
```

但推荐使用 `art-template` 模板引擎，减少代码量

## art-template 模板引擎

文档：https://aui.github.io/art-template/zh-cn/docs/

### 安装：

```shell
npm install art-template --save
```

### 使用：

- 使用 require 来加载

  ```javascript
  let template = require("art-template")
  ```

### 语法：

```javascript
let ret = template.render('模板字符串', 替换对象)
```

- 建议少量的使用，能前端去完成就前端完成，因为如果大量的使用 服务器 渲染页面会对服务器造成大量的访问，从而加大了服务器的压力。
- 前端的存在就是为了减轻服务器的压力

### 服务端渲染和客户端渲染的区别

- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
- 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
- 而是两者结合来做的
- 例如京东的商品列表就采用的是服务端渲染，目的为了 SEO 搜索引擎优化
- 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

**客户端渲染**

- 第一次请求的是页面（字符串）
- 第二次请求的是数据接口

![image-20220425144550169](https://s2.loli.net/2022/12/09/uYcWOxqs3ljeMFK.png)

**服务端渲染**

- 只执行一次数据请求

![image-20220425144626236](https://s2.loli.net/2022/12/09/OP9XbuKcDLRweaC.png)

### 案例 服务器渲染

```javascript
// app application 应用程序
// 把当前模块所有的依赖项都声明再文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
// 我们为了方便的同意处理这些静态资源，所以我们约定把所有的静态资源都存放再 public 目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// public 整个 punlic 目录中的资源都允许被访问
let http = require("http")
let fs = require("fs")
let url = require("url")
let template = require("art-template")

let comments = [
  {
    name: '不错',
    message: '对南沙健康拿到数据看定金款三',
    dateTime: '2017-11-2 17:11:22'
  }, {
    name: '范家伟',
    message: '香锅还是香锅啊',
    dateTime: '2017-11-2 17:11:22'
  }
]

// 对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交的表单请求过来了
http
  .createServer(function (req, res) { // 简写方式，该函数会直接注册为 server 的 reuqest 请求事件处理函数
    /*
    * 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true
    * 表示直接将查询字符串转为一个对象（可以通过 query 来访问）
    * */
    let objPath = url.parse(req.url, true)
    // 单独获取不包含查询字符串的路径部分（该路径不包含 ？ 之后的内容）
    let pathname = objPath.pathname
    if(pathname.indexOf("/favicon.ico") === -1) {
      if(pathname === '/' || pathname === '/index.html') {
        fs.readFile('./views/index.html', function (err, data) {
          if (err) {
            return res.end('404 Not Found')
          }
          let htmlStr = template.render(data.toString(), {
            comments: comments
          })
          res.end(htmlStr)
        })
      }else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
          if (err) {
            return res.end('404 Not Fount')
          }
          res.end(data)
        })
      }else if (pathname === '/pinglun') {
        // 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
        // res.end(JSON.stringify(objPath.query))
        /*
        * 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象
        *   - 接下来
        *     + 1. 获取表单提交数据 objPath.query
        *     + 2. 生成日期到数据对象中，然后 存储到数组中
        *     + 3. 让用户重定向跳到首页 /
        *       - 当用户重新请求 / 的时候，我的数组中的数据已经发生变化，所以用户所看到的页面也跟着变化
        * */
        let comment = objPath.query
        let date = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        comment.dateTime = date
        comments.unshift(comment)
        // 重定向
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
      }else if (pathname.indexOf("/public/") !== -1) {
/*
* = 统一处理：
*   - 如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
*   - 所以我们就直接可以把请求路径当作文件路径来直接进行读取
* */
      fs.readFile(`.${pathname}`, function (error, data) {
        if (error) {
          return res.end("404 Not Fount")
        }
        res.end(data)
      })
    }else {
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end("404 Not Fount")
        }
        res.end(data)
      })
    }
  }
})

.listen(3000, function () {
    console.log('server is running');
})
```



----

## path

**路径操作模块**

### 基本操作

[官方文档](https://nodejs.org/docs/latest-v13.x/api/path.html)

- **`path.basename` :** 获取路径的文件名，默认包含扩展名
- **`path.dirname` :** 获取路径中的目录部分
- **`path.extname` :** 获取一个路径的扩展名部分
- **`path.parse` :** 把路径转换为对象
  - **`root` :** 根路径
  - **`dir` :** 目录
  - **`base` :** 包含后缀名的文件名
  - **`ext` :** 后缀名
  - **`name` :** 不包含后缀名的文件名 
- **`path.join` :** 拼接路径（第二个参数会自动判断 / 是否多余）
- **`path.isAbsolute` :** 判断一个路径是否为绝对路径

----

## Node 中的其他成员

### __ dirname() __ filename

- __ dirname：动态获取当前模块文件所处目录的绝对路径
- __ filename：动态获取当前文件的绝对路径

在文件操作中，使用相对路径是不可靠的，因为 node 中文件操作的路径被设计为相对于执行 node 命令所处的路径。为了解决这个问题，需要使用 `__dirname()` 或 `__filename` 把相对路径变为绝对路径（绝对路径不受任何影响）

在拼接路径过程中，为了避免手动拼接带来的一些错误，就可以使用 `path.join()` 来辅助拼接

```javascript
let fs = require("fs")
let path = require("path")

// path 会将路径名和文件名拼接起来且能识别适应文件名前路径形式
fs.readFile(path.join(__dirname, "a.txt"), "utf8". function (err, data) {
  if (err) return err
	data
})
```

**注：**

模块中的路径标识和文件操作中的相对路径标识不一致

模块中的路径标识就是相对于当前文件模块，不受 node 命令所处路径影响

使用相对路径，被执行的文件不会受到加载其他模块被影响到

----

## Node 中的模块系统

- EcmaScript
  - 没有 BOM 和 DOM
- 核心模块
  - 文件操作的 fs
  - http 服务操作的 http
  - url 路径操作模块
  - path 路径处理模块
  - os 操作系统信息
- 第三方模块
  - art–template
  - 必须通过 npm 下载才可以使用
- 用户自定义模块
  - 自己创建的文件
- 模块标识
  - `./` 相对于当前路径
  - `/` 在当前模块所处的磁盘根目录



----

### 什么是模块化

- 文件作用域（模块是独立的，在不同的文件使用必须要重新引用；在 node 中没有全局作用域，只有模块作用域）
- 通信规则
  - require（加载模块）
  - exports （导出内容）

----

### CommonJS模块规范

在 Node 中的 JavaScript 还有一个重要的概念，模块系统

- 模块作用域
- 使用 `require` 方法来加载模块
- 使用 `exports` 接口对象来导出模板中的成员

#### 加载 `require` 

使用 `require` 函数加载模块

- 若调用非核心模块和第三方模块，必须加上相对路径 `./` 可以省略后缀名

- 作用：

  - 执行被加载模块中的代码
  - 得到被加载模块中的  `exports` 导出接口对象

- 语法

  ````javascript
  let 变量名 = require("模块")
  ````

----

#### 导出 `exports` 

- Node 中是模块作用域，默认文件中所有的成员只在当前模块有效
- 对于希望可以被其他模块访问到的成员，我们需要把这些公开的成员都挂载到 `exports` 接口对象中就可以

**导出单个成员（拿到的就是函数，字符串）**

```javascript
// 使用 exports 导出
let foo = "123"
function add(x, y) {
	return x + y
}
exports.foo = foo;
exports.add = add;
```

```javascript
// 使用 module 导出
module.exports = 'hello'
```

**导出多个成员（必须在对象中，且不支持 ES6 语法）**

```javascript
// 使用 exports 导出
exports.a = 'hello'
exports.b = function() {}
```

```javascript
// 使用 module 
let foo = "123"
function fn() {}

module.exports = {
  foo: foo,
  fn: fn
}
```

**使用 module 覆盖问题（后面的函数会把前面的覆盖掉）**

```javascript
module.exports = 'hello'
module.exports = function() {}
```

----

#### require 方法加载规则

- 优先从缓存加载（既不会重复调用同个模块中的函数）

  - 避免重复加载，提高模块加载效率
  - node 会自动寻找当前文件路径的 node_modules，从而加载第三方包，若没有，则会继续往上一级目录查找，直到找到为止，（否则报错）

  ```javascript
  // main.js
  require('./a')
  
  // 优先从缓存加载
  // 由于 在 a 中已经加载过 b 了
  // 所以这里不会重复加载
  // 可以拿到其中的接口对象，但是不会重复执行里面的代码
  var fn = require('./b')
  
  console.log(fn)
  
  // a.js 
  console.log('a.js 被加载了')
  var fn = require('./b')
  
  console.log(fn)
  
  // b.js
  console.log('b.js 被加载了')
  
  module.exports = function () {
    console.log('hello bbb')
  }
  ```

----

#### 第三方模块加载过程

凡是第三方模块都必须通过 npm 来下载

使用的时候就可以通过 require ("包名") 的方式来进行加载才可以使用

不可能有任何一个第三方包和黑犀牛模块的名字是一样的

art-template 为例

- 先找到当前项目路径的 node_modules
- node_modules/art-template
- node_modules/art-template/package.json
- 找到说明文件中的 main 属性
  - main 属性记录 art-template 的入口模块
- 加载使用这个第三方包
  - 实际加载的还是 index.js 文件
- 若，package.json 或 main 指定的入口模块不存在则 node 会找该目录下的 index.js 文件（备选项）
- 条件均不满足则自动往上一级目录查找，直到磁盘根目录，若还是没有则报错（Can not find module xxx）

----

#### 模块的原理解析

- 在 Node 中， 每个模块内部都有一个自己的 module 对象
- 该 module 对象中，有一个成员叫：exports 也是一个对象
- 也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports 中
- 在 Node 中每次使用 module.exports.xxx 导出成员会很繁琐
-  所以 Node 为了简化操作专门提供了一个变量 exports 等于 module.exports

**当模块需要导出单个成员的时候**

**直接给 exports 赋值是不管用的**

例如：

- exports = "hello"
- 因为 exports 只是引用了 module.exports
- 现在则把这个引用改变成了 "hello" 这个字符串，改变了 exports 的指针指向
- 只要是改变了 exports 或者 module.exports 任意一方的指向 exports 一定是不起作用的
- 我们只要记住这整个模块中最后执行的是 return module.exports

**在代码底层中有这这样的一段代码**

- 不管是 `exports` 或者 `module.exports` 导出的成员，一定都是从下面代码中的 `exports` 这个对象中导出的

```javascript
let module = {
  exports: {
  }
}
```

- 在模块代码中还有这样一段代码

```javascript
var exports = module.exports
```

- 我们可以使用任意一方来导出模块成员
- 默认在代码的最后有一句

```javascript
return module.exports
```

- 而这样谁来 require(加载) 我这个模块谁就可以得到 这个模块中的 module.exports

**总结：**

- 只要 exports 或 module.exports 的指向没有被修改，那么双方所有导出的成员都存放在一个对象中
- 只要有一方的指向被修改，那么一切的最终导出结果已 module.exports 导出的成员为准
- 不要给 `exports` 赋值，除非是 `exports = module.exports` 这样是把 `exports`  重新指向 module.exports 

**注：**

- 官方提示，如果你分不清 exports 和 module.exports 的话，可以选择忘掉 exports 只使用 module.exports

----

#### module.exports 和 exports 的关系

**真正要导出数据是 module.exports，而 node 为了方便我们操作，所以指定了一个变量 exports 等同于 module.exports，如下所示**

```javascript
var exports = module.exports
```

所以

```javascript
exports.a = 2
exports.b = 3
```

这些值最终会等同于 module.exports.a = 2 和 module.exports = 3，同时会被导出

但如果这么写

```javascript
exports = 2
```

相当于修改了 exports 的值，那么它就会与 module.exports 分道扬镳，它的值也不会等于 module导出的值

所以，为了保险起见，最好使用 module.exports 导出你想要的内容，避免不必要的错误

----

### 核心模块

Node 为 JavaScript 提供了很多服务器级别的 API ，这些 API 绝大多数都被包装到了一个具名的核心模块中。

例如文件操作的 `fs` 模块；http 服务构建的 `http` 模块；`path` 路径操作模块、`os` 操作系统模块。

如果要使用核心模块（require 是用来加载模块）

````javascript
// 文件操作
let fs = require("fs")

// 服务器操作
let http = require("http")

// 地址操作
let path = require("path")

// 操作系统信息查询
let os = require("os")

// 路径操作
let url = require("url")
````

----

### 用户自定义模块

**模块之间的通讯**

**require (加载模块)** 

```javascript
/*
*  = require 是一个方法
*    + 它的作用就是用来加载模块
*    + 在 Node 中，模块分为三种
*       + 具名的核心模块，例如：fs、http
*       + 用户自己编写的文件模块
*         + 相对路径必须加 /
*         + 可以省略后缀名
*         + 相对路径中 ./ 不能省略
* */
/*
*  = 在 Node 中 ，没有全局作用域，只有模块作用域
*    + 外部访问不到内部
*    + 内部也访问不到外部
*    + 默认都是封闭的
*  + 既然是模块作用域，那如何让模块与模块之间进行通信
*  + 有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员。
* */
```

````javascript
// a 模块
let foo = "略略略"
// 加载 b 模块
require("./b")

console.log(foo)  // 略略略

// b 模块 (这时候的每个模块都是独立的个体，而每个模块都有自己的模块作用域)
let foo = "啦啦啦"
````

**exports (模块内导出)**

````javascript
/*
* = require 方法有两个作用：
*   + 1. 加载文件模块并执行里面的代码
*   + 2. 拿到被加载文件模块导出的接口对象
*   在每个文件模块中都提供了一个对象：exports
*   exports 默认是一个空对象
*   把所有需要被外部访问的成员挂载到这个 exports
* */
````

````javascript
// a 模块
let bExport = require("./b")
console.log(bExport.foo) // 哒哒哒

// b 模块
let foo = "哒哒哒"
export.foo = foo
````

----

## npm

### 介绍

NPM 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的问题，常见的使用场景有以下几种：

- 允许用户从 NPM 服务器下载别人编写的第三方包到本地使用
- 允许用户从 NPM 服务器下载安装别人编写的命令行程序到本地使用
- 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用

----

### 网站

npmjs.com 网站是用来搜索 npm 包

https://www.npmjs.com/

----

### npm 命令行工具

npm 也有版本概念，可以通过 `npm --version` 来查看 npm 版本

升级 npm 

```javascript
npm install --global npm
```

----

### 常用命令

- npm init (生成 package.json 说明文件)
- npm init -y (可以跳过向导，快速生成)
- npm install 
  - 一次性把 dependencies 选项中的依赖全部安装
  - 简写 (npm i)
- npm install 依赖包的名称
  - 只下载
  - 简写 (npm i 依赖包名称)
- npm install --save 依赖包名
  - 下载并且保存依赖 (package.json 文件中的 dependencies 选项)
  - 简写 (npm i 依赖项名称 --S)
  - --save 自动生成说明文件信息 package.json 
  - 文件信息自动添加至 package.json 
  - 若删除掉某些项目使用的模块但有保留 package.json ，则可在命令行 (当前项目文件夹下) 执行 npm install 全部自动下载回来
- npm uninstall 包名
  - 只删除，如果有依赖项依然会保存
  - 简写 (npm un 依赖项名称)
- npm uninstall --save 依赖项
  - 删除的同时也会把 package.json 中的依赖信息删除掉
  - 简写 (npm un 依赖项 --save)
- npm help
  - 查看使用帮助
- npm 命令 --help
  - 查看具体命令的使用帮助 (npm uninstall --help)

----

### 解决 npm 被墙的问题

npm 存储包文件的服务器在国外，有时候会被墙，下载速度很慢，所以我们需要解决这个问题。

淘宝的开发团队把 npm 在国内做了一个备份 [npmmirror 中国镜像站](https://npmmirror.com/)

- 安装淘宝的 cnpm：

  ```shell
  # 在任意目录执行都可以
  # --global 表示安装到全局，而非当前目录
  # --global 不能省略，否则不管用
  npm install --global cnpm
  ```

- 接下来你安装包的时候把之前的 `npm` 替换成 `cnpm`

  - 例如：

  ```shell
  # 这里还是走国外的 npm 服务器，速度比较慢
  npm install art-template
  
  # 使用 cnpm 就会通过淘宝的服务器来下载
  cnpm install art-template
  ```

- 如果不想安装 `cnpm` 又想使用淘宝的服务器来下载

  ```shell
  npm install art-template --registry=https://registry.npm.taobao.org
  ```

- 但是每一次手动这样加参数很麻烦，所以我们可以把这个选项加入到配置文件中

  ```shell
  npm config set registry https://registry.npm.taobao.org
  
  # 查看 npm 配置信息
  npm install list
  ```

- 只要经过了上面命令的配置，则以后所有的 `npm install` 都会默认的从 淘宝的服务器下载

----

### package.json

每一个项目都要有一个 `package.json` 文件 (包描述文件，就像产品的说明书)

这个文件可以通过 `npm init` 自动初始化出来

- 也可以直接通过安装任意依赖项加载出来 (npm install 任意依赖项 --save)

对于目前来讲，最有用的是 `dependencies` 选项，可以用来帮助我们保存第三方包的依赖信息

如果 `node_modules` 删除了也不用的担心，只需要在控制面版中 `npm install` 就会自动读取 `package.json` 中的依赖信息把其中的 `dependencies` 中的依赖全部下载回来

- 建议每个项目的根目录下都有一个 `package.json` 文件
- 建议执行 `npm install 依赖项名称` 的时候都加上 `--save` 选项，目的是用来保存依赖信息

#### package.json 和 package.json-lock.json

npm 5 以前是不会有 `package-lock.json` 这个文件

npm 5 以后才加入这个文件

当你安装依赖的时候，npm 都会生成或更新 `package-lock.json` 这个文件

#### package.json 用处

1.  提升下载速度
   - npm 5 以后的版本安装就可以不用加 `--save` 参数，它会自动保存依赖信息
   - 当你安装依赖的时候，会自动创建或者更新 `package-lock.json` 文件，这个文件会包括 `node_modules` 中所有依赖的信息 (版本下载地址等)，这样的话重新 `npm install` 的时候速度就可以提升
2.  锁定版本号
   - 从文件来看，有一个 lock ，称之为锁
   - 这个 `lock` 使用来锁版本的
   - 如果项目依赖了 `1.1.1` 版本
   - 如果你重新 `npm install` 其实会下载最新版本，而不是 `^1.1.1`
   - `package-lock.json` 的另外一个作用就是锁定版本号，防止自动升级 

----

## Express

### 简介

Express 是一个简洁而灵活的 **Node.JS** Web 引用框架，提供了一些列强大特性帮助你创建各种 Web 应用，和丰富的 **HTTP**  工具。

使用 Express 可以快速地搭建一个完整功能的网站

Express 框架核心特性：

- 可以设置中间件来响应 HTTP 请求
- 定义了路由表用于执行不同的 HTTP 请求动作
- 可以通过向模板传递参数来动态渲染 HTML 页面

----

### 安装

```shell
# 初始化项目 生成 package.json 文件
npm init -y
```

```shell
# 安装 express 框架
npm install express --save
```

![image-20220429151717514](https://s2.loli.net/2022/12/09/JSzIXhrpxVUeG8u.png)

### 简单使用

- 引包
- 创建服务器应用程序
- 接收请求，返回响应
- 发布服务

```javascript
// 安装、引包
let express = require("express")

// 创建服务器应用程序，也就是原来的 http.createServer()
let app = express()

// 当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get("/", function (req, res) {
  res.send("hello，world")
})

// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源
app.use("/public/", express.static("./public/"))

// 相当于原来的 server.listen
app.listen(3000, function () {
  console.log('app is running at prot 3000.')
})
```

- 其中的 res.send() 与我们之前使用的 API 不一样了，这个只是 Express 中的 API ，之前的 res.end 还是可以使用的， Express 只是推荐使用框架中的 res.send ， 另外 res.send 是有一些 Express 中的样式

- app.get 或者 app.post 可以链式调用，每次 get 或 post 后会再次返回一个 app，例如：

  ```javascript
  app
  	.get()
  	.post()
  ```

### 基本路由

**路由器**

- 请求方法
- 请求路径
- 请求处理函数

get：

- 当你以 GET 方法请求 `/` 的时候，执行的对应的处理函数

  ```javascript
  app.get('/', function (req, res) {
    res.send('hello, world')
  })
  ```

post：

- 当你以 POST 方法请求 `/` 的时候，指定对应的处理函数

  ```javascript
  app.post('/', function(req, res) {
    res.send("hello, node.js")
  })
  ```

- 两者之间的请求方法不一样，映射关系也不一样，虽然请求的都是 `/` 但不会有影响

### 静态服务

当以 `/public/` 开头的时候，会去 `./public` 目录中找对应的资源

 ```javascript
 app.use('/public/', express.static('./public/'))
 ```

- url：

  ```javascript
  http://127.0.0.1:3000/public/index.html
  ```

当以 `/a/` (任意路径) 开头时，这是给正真的路径起了一个别名，再去真正的目录中  `/public` 中去查找对应资源

```javascript
app.use('/a/', express.static('./public'))
```

- url：

  ````javascript
  http://127.0.0.1:3000/a/index.html
  ````

- 其实还是指向的 public 路径目录

当省略第一个参数的时候，则可以通过省略 `/public` 的方式来访问

```javascript
app.use(express.static('./public'))
```

- url：

  ```javascript
  http://127.0.0.1:3000/index.html
  ```

- 访问的还是 public 中的 index.html 资源

```javascript
app.use('/public/', express.static(path.join(__dirname, 'public')))
```

### Express 中的 art-template 模板引擎

- [art-template - Github仓库]([aui/art-template: High performance JavaScript templating engine (github.com)](https://github.com/aui/art-template))
- [art-template - 官方文档]([art-template (aui.github.io)](https://aui.github.io/art-template/zh-cn/index.html))

#### 安装

```shell
npm install art-template --save
npm install express-art-template --save
```

- 简写

```shell
npm i art-template express-art-template -S
```

#### 配置

**配置使用 art-template 模板引擎**

- 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
  - (如果 .art 不习惯使用，也是可以更改的)
- express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
- 虽然外面这里不需要记载 art-template 但是也必须安装
- 原因就在于 express-art-template 依赖了 art-template

```javascript
app.engine('art', require('express-art-template'))
```

- 如果想要修改默认的 views 目录，则可以

```javascript
app.set('views', render函数的默认路径)
// 例如：
app.set('views', path.join(__dirname, 'views'))
```

#### 使用

- Express 为 Response 相应对象提供了一个方法：render
- render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
- res.render('html模板名'，{模板数据})
- 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
- 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

```javascript
app.get('/', function (req, res) {
  // express 默认会去项目中的 views 目录找 index.html
  res.render('index.html', {
    title: 'hello, world'
  })
})
```

#### 初识（数据渲染）

```javascript
let express = require('express')

let app = express()

app.engine('html', require('express-art-template'))

let comments = []

app
  .use('/public/', express.static('./public'))
  .get('/', function (req, res) {
    res.render('index.html', {
      comment: comments
    })
  })
  .get('/post', function (req, res) {
    res.render('post.html')
  })
  .get('/pinglun', function (req, res) {
    let date = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')                             
    let obj = {
      name: req.query.name,
      message: req.query.message,
      dateTime: date
    }
    comments.unshift(obj)
    res.redirect('/')
  })

app.listen(3000, function () {
  console.log('running...');
})
```

### body-parser

在 Express 中没有内置获取表单 POST 请求体的 API ，这里我们需要使用一个第三方包： `body-parser` 

#### 简介：

- body-parser 用于解析 body post 中间件
- 处理程序之前，在中间件中对传入的请求体进行解析 (response body)
- 处理 post 请求体

`body-parser` 提供了四种解析器

- JSON body parser
- Raw body parser 
- Text body parser
- URL-encoded form body parser

#### 安装：

```shell
npm install body-parser --save
```

#### 引入：

```javascript
let bodyParser = require('body-parser')
```

#### 配置：

- 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
- 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据

```javascript
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

#### 使用：

```javascript
app.post('/', function (req, res) {
  res.send(req.body)
})
```

#### 原生获取 post 请求体方式

记得先引入 `querystring` 模块

`querystring` 用作分割请求体内容并转化为对象格式

因为有时候会用到文件上传，所以这里要判断数据请求头的 `content-type` ，如果是 `multipart/form-data` ，则让 `formidable` 中间件去处理，否则自己处理

```javascript
app.use((req, res, next) => {
    let data = ``
    if (req.method.toLowerCase() === 'get') {
        return next()
    }
    // 如果是有文件的表单POST，则不处理
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            req.body = queryString.parse(data)
            next()
        })
    }
})
```

#### body-parser 已被弃用

body-parser 已不在维护，但在 node 中还是可以作为 post 请求的中间件

但在新版本的 Express 中 Express 已有处理 post 请求体内置的 API 

##### 使用：

```javascript
let express = require('express')
let app = express()

// 配置
app.use(express.urlencoded({extended: false}))
app.use(express.json())
```

----

### 在 Express 中获取表单 GET 请求参数

- Express 内置了一个 API ，可以直接通过 `req.query` 来获取

### Express 中的路由

**Express 提供了一个更好的方式，专门来包装路由**

- 处理路由
- 根据不同的请求方法 + 请求路径设置具体的请求处理函数
- 模块职责要单一
- 划分模块的目的就是为了增强项目代码的可维护性
- 提升开发效率

#### 创建一个路由容器

```javascript
let router  = express.Router()
```

#### 把路由挂载到 router 路由容器中

```javascript
router.get('/', function (req, res) {
  res.send('hello world')
})
```

#### 导出路容器

```javascript
module.exports = router
```

#### 在入口文件使用路由

```javascript
// 加载路由模块
let router = require('./router.js')
//挂载路由容器
app.use(router)
```

### Express-session

官方文档：https://github.com/expressjs/session

#### 安装

```shell
npm i express-session
```

#### 配置

- 该插件会为 req 请求对象添加一个成员 `req.session` 默认是一个对象

```javascript
// 配置 session
  .use(session({
    // 配置加密字符串，它会在原有加密基础上和这个字符串拼接起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: "itcast",
    resave: false,
    // 无论你是否使用 session ，我都默认直接给你分配一把钥匙
    saveUninitialized: false,
    cookie: {secure: true}
  }))
```

#### 使用

```javascript
// 写
// 添加 Session 数据 
// session 就是一个对象
req.session.user = user

// 读
// 获取 session 数据
req.session.user

// 删除
req.session.user = null
// 推荐方法
delete req.session.user
```

#### 其它

session： 保存登录选项，在内存中存储 

cookie： 保存不敏感数据 

### 使用 md5 对账户密码加密

#### 安装

```shell
npm install blueimp-md5
```

#### 使用 

```javascript
let md5 require("blueimp-md5")

// 进行加密处理
// 为防止被解析出来可以使用两层甚至多层 md5 来进行加密处理
md5(需要被加密的账户密码)
```

----

## MySQL 

### 安装数据库

[官方下载地址](https://www.mysql.com/cn/)

[mysql安装教程]([(10条消息) MySQL安装配置教程（超级详细、保姆级）_SoloVersion的博客-CSDN博客_mysql安装配置教程](https://blog.csdn.net/SoloVersion/article/details/123760428))

### 安装

```shell
npm install mysql
```

### MySQL 初识

```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
connection.end();
```

使用 MySQL 数据库需要自己来规划数据结构例如：

![image-20220509152211227](https://s2.loli.net/2022/12/09/WnKC1FAaQ7eMGOt.png)

### MySQL 的基本使用

- **注：**SQL 语句中的关键字对大小写不敏感
- 一定要加上 WHERE 条件，特别是在更新和删除数据时，否则会修改整张列表数据
- 删除了用户再想恢复，所以一般增加一个 status 字段，来标识用户状态，来达到 "虚假删除" 的目的

#### SQL 的 SELECT 语句（查）

SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）

```mysql
-- 从 FROM 指定的[表中]，查询出[所有的]数据。 * 表示[所有列]
SELECT * FROM 表名称

-- 从 FROM 指定的[表中]，查询出指定 列名称（字段）的数据
SELECT 列名称 FROM　表名称
```

#### SQL 的 INSERT INTO 语句（增）

INSERT　INTO　语句用于向数据表中插入新的数据行

```mysql
-- 语法解读：向指定的表中，插入如下几列数据，列的值通过 values ——指定
-- 注：列和值要一一对应，多个列和多个值之间，使用都好分隔
INSERT INTO table_name(表名称) (列1, 列2...) VALUES(值1, 值2...)
```

#### SQL 的 UPDATE 语句（改）

Update 语句用于修改表中的数据

```mysql
-- 用 UPDATE 指定要跟新哪个表中的数据
-- 用 SET 指定列对应的新值
-- 用 WHERE 指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

Update 修改某一行的若干列

```mysql
UPDATE 表名称 SET 列名称 = 新值，列名称 = 新值 WHERE 列名称(id) = 某值(id值)
```

#### SQL 的 DELETE 语句

Delete 语句用于删除表中的数据

```mysql
DELETE FROM 表名称 WHERE 列名称(一般指id) = 某值(id值)
```

#### SQL 的 WHERE 子句

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准

```mysql
-- 查询语句中的 WHERE 条件
SELECT 列名称 FROM 表名称 列 运算符 值
-- 更新语句中的 WHERE　条件
UPDATE　表名称　SET 列 = 新值 WHERE 列 运算符 值
-- 删除语句中 WHERE　条件
DELETE　FROM 表名称 WHERE 列 运算符 值
```

##### 可在 WHERE 子句中使用的运算符

| 操作符           | 描述         |
| ---------------- | ------------ |
| =                | 等于         |
| <> 也可以写为 != | 不等于       |
| >                | 大于         |
| >                | 小于         |
| >=               | 大于等于     |
| <=               | 小于等于     |
| BETWEEN          | 在某个范围内 |
| LIKE             | 搜索某种模式 |

##### SQL 的 AND 和 OR 运算符

AND 和 OR 可在 WHERE　子语句中把两个或多个条件结合起来

AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符

OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符

##### SQL 的 ORDER BY 子句

ORDER BY 语句用于更具指定的列对结果集进行排序

ORDER BY 语句默认按照升序对记录进行排序

ORDER BY 降序对记录排序 使用 DESC 关键字

```mysql
SELECT * FROM 表名称 ORDER BY 需要排序的列名称 DESC
```

ORDER BY 子句 - 多重排序，使用逗号隔开

```mysql
SELECT * FROM 表名称 ORDER BY 列名称，列名称 ASC 
```

##### SQL 的 COUNT(*) 函数，统计那列的条数

```mysql
SELECT COUNT(*) FROM 表名称 WHERE 列名称 = 某值
```

使用 AS 为列设置别名

- 一般统计出来的条数的列名都会返回 COUNT(*) 这样没有任何的代表意义，这时候就可以使用 AS 来设置别名了

```mysql
SELECT COUNT(*) AS 别名 FROM 表名称 WHERE 列名称 = 某值
```

### 数据增加（增）

第一种添加方式  `INSERT INTO tablename(列名...) VALUES(列值)`

```javascript
connection.query("INSERT INTO users VALUES(NULL, 'admin', '123456')", function(error, results) {
  if (error) throw error
  console.log(results)
})
```

第二种添加方式  `INSERT INTO tablename SET 列1 = 值1，列2 = 值2， ...`

```javascript
let user = {username: "沐沐汐", password: "123456"}
// 构造 sql 字符串
let sqlStr = "INSERT INTO users SET?"
// 操作数据库
connection.query(sqlStr, user, (error, results) => {
  if (error) throw error
  console.log(results)
})
```

返回的 results 对象

`OkPacket {        
  fieldCount: 0,  
  affectedRows: 1, // 被影响的列数目
  insertId: 5,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}`

### 数据删除（删）

```javascript
const sqlStr = "DELETE FROM users WHERE id = ?"
connection.query(sqlStr, [5], (error, results) => {
  if (error) throw error
  console.log(results)
})
```

### 数据跟改（改）

- 修改某一行数据

```javascript
const sqlStr = "UPDATE users SET username = ?, password = ? WHERE id = ?"
connection.query(sqlStr, ["沐沐汐", "789789", 1], (error, results) => {
  if (error) throw error
  console.log(results)
})
```

- 修改某一列数据

```javascript
const sqlStr = "UPDATE users SET username =? WHERE id = ?"
connection.query(sqlStr, ["沐沐汐", 1], (error, results) => {
  if(error) throw error
  console.log(results)
})
```

### 数据查询（查）

- 查找 users 这个数据表（集合）

```javascript
connection.query('SELECT * FROM users', function (error, results) {
  if (error) throw error;
  console.log(results);
});
```

----

## MongoDB

### 关系型和非关系型数据库

#### 关系型数据库

表就是关系，或者说表与表之间存在关系

- 所有的关系型数据库都需要通过 `sql` 语言操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空

#### 非关系型数据库

- 非关系型数据库非常的灵活
- 有的关系型数据库就是 `key -> value ` 对
- 但 MongoDB 是长得像关系型数据库的非关系型数据库
  - 数据库 -> 数据库
  - 数据表 -> 集合（数组）
  - 表记录 -> 文档对象

一个数据库中可以有多个数据库，一个数据库中可以有多个集合（数组），一个集合中可以有多个文档（表记录）

```javascript
// 也就是说你可以任意的往里面存数据，没有结构性
{
  json(数据库) {
    user(集合): [
      {文档}...
    ]
  }
}
```

### 安装

#### 下载

[MongoDB 下载地址](https://www.mongodb.com/download-center/community)

![image-20220506201048726](https://s2.loli.net/2022/12/09/SHohL83aVQAjfJ9.png)

![image-20220506201553751](https://s2.loli.net/2022/12/09/mZbjpzSycA43RtN.png)

![image-20220506201910894](https://s2.loli.net/2022/12/09/V74ys1ivwCHQUbL.png)

#### 环境配置

[MongoDB 环境配置](https://www.cnblogs.com/xiaozhaoboke/p/11479144.html)

#### 环境检测

```shell
mongod --version
```

### 启动和关闭数据库

启动数据库服务

- 未修改数据存储路径

```shell
# mongodb 默认使用执行 mongod 命令所处磁盘根目录的 /data/db 作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己动手新建一个 /data/db
mongod
```

- 修改数据存储路径

```shell
mongod --dbpath D:\mongodb\data\db
```

关闭服务

```shell
1. 在开启服务的控制台，直接 Ctrl + C
2. 直接关闭开启服务的控制台
```

启动数据库，连接本地 MongoDB 服务

```shell
mongo
```

退出

```shell
exit
```

### mongo 基本命令

**show dbs** 

- 查看数据库列表（数据库中的所有数据库）

**db**

- 查看当前连接的数据库

**use 数据库名称**

- 切换到指定的数据库（没有会新建）

**show collections**

- 查看当前目录下的数据表

**db.表名.find()**

- 查看表中信息

**InsertOne()**

- 插入数据（对象形式，命名字符串加双引号）

**dropDatabase()**

- 删除数据库

**db.collection.remove({})**

- 删除文档

**db.collection.drop()**

- 删除集合

----

## Node 中操作 MongoDB

### MongoDB 数据库的基本概念

可以有多个数据库

一个数据库中可以有多个集合（表）

一个集合中可以有多个文档（表记录）

文档结构很灵活，没有任何限制

MongoDB 非常灵活，不需要像 MySQL 一样创建数据库、表、设计结构

- 在这里只需要：当你需要插入数据的时候，只需要指定往哪个数据库的哪个集合操作就可以了
- 一切都由 MongoDB 来帮你自动完成创建库建表

```javascript
// 结构划分

// MongoDB 
{
  数据库1: {
    集合1（表）: [
      文档1{}
      文档2{}
    ]
    集合2（表）: []
  }
  数据库2: {}
}
```

### mongoose

Mongoose 是 MongoDB 数据库的模型工具，为 NodeJS 设计，工作于异步环境下

与其他同类工具相比，它有灵活友好的 API 。相似的，还存在 MongoSkin, MongLian, 以及原生驱动 node-mongodb-native

- 使用官网 mongoDB 包操作：

  (http://mongodb.github.io/node-mongodb-native/)

- 第三方包 mongoose 操作 MongoDB 数据库

  (https://mongoosejs.com/)

  官方文档

  (https://mongoosejs.com/docs/index.html)

  中文文档

  (http://mongoosejs.net/docs/api.html))
  
  具体查询条件
  
  (https://blog.csdn.net/seaalan/article/details/85233543)

#### 使用

```shell
npm i mongoose
```

#### mongoose 初识

```javascript
// 引包
let mongoose = require("mongoose")
// 创建数据库
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true})
// 定义集合
let Cat = mongoose.model("Cat, {name: String}")
// 添加数据
let kitty = new Cat({name: "沐沐汐"})
// 保存成功提示(ES6 语法)
kitty.save().then(() => console.log("meow"))
```

#### 创建一个基本实例

```javascript
let mongoose = require("mongoose")
// 引用架构对象
let Schema = mongoose.Schema
// 连接数据库 连接本机的 are 数据库 
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect("mongodb://localhost/itcast", { useNewUrlParser: true, useUnifiedTopology: true })
// 设计集合结构（表结构）Schema理解为架构 结构
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
let userSchema = new Schema({
  username: {
    type: String,  // 指定类型
    required: true  // 约束：必须有值
  },
  password: {
    type: String,
    required: true
  }
})

/*
* 将文档结构发布为模型
* mongoose.model 方法就是用来将一个架构发布为 model
* 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
*   - mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
*   - 例如 User 最终会变为 users 集合名称
* 第二个参数：架构 Schema
* 返回值：模型构造函数
* */
let User = mongoose.model("User", userSchema)
```

#### 数据添加（增）

```javascript
let admin = new User({
  username: "沐沐汐",
  password: "456789",
  email: "147258@qq.com"
})
// 数据保存持久化
admin.save()
.then(value => {
  console.log("存储成功", value)
}, reason => {
  console.log("存储失败", reason)
})
```

#### 数据查询（查）

查询数据如果存在会返回一个可迭代对象(一条数据也是可迭代对象)，不存在则返回 null

- 查询所有数据

```javascript
User.find()
.then(value => {
  console.log("查询结果：", value)
}, reason => {
  console.log("查询失败：", reason)
})
```

- 按条件查询

```javascript
User.find({
  username: "沐沐汐"
})
  .then(value => {
    console.log(value)
  }, reason => {
    console.log(reason)
  })
```

- 查询指定属性的单个对象（如果查询的数据有多个相同，则返回排在第一位的）

```javascript
User.findOne({
  _id: "627731f8eebf03ce3abec649"
})
  .then(value => {
    console.log(value)
  }, reason => {
    console.log(reason)
  })
```

- 根据 Id 查询： findById

#### 数据删除（删）

返回值：{ acknowledged: true, deletedCount: 1 }

- 一、是否删除成功
- 二、删除了几个

```javascript
User.remove({
  _id: "627772255f71bab5dbce92b5"
})
.then(result => {
  console.log("删除成功", result)
}, err => {
  console.log("删除失败", err)
})
```

- 根据 id 来删除数据： findByIdAndRemove
- 根据指定条件删除一个： findOneAndRemove

使用 Model.deleteOne () 根据指定条件来删除

- 特点：从集合中删除匹配的第一个文档，最多只能删除一个

使用 Model.deleteMany () 根据匹配条件删除

- 特点：从集合中删除所有匹配的文档，无论如何，都会删除

#### 数据更改（改）

findByIdAndUpdate() 根据 id 来更新数据

findByIdAndUpdate 会默认返回旧数据，需要使用 {new：true} 来返回更新之后的数据

```javascript
User.findByIdAndUpdate("627776d085732e443f871ab5", {
  username: "沐沐汐",
}, {new: true})
.then(result => {
  console.log("更新成功：", result)
}, err => {
  console.log("更新失败：", err)
})
```

findOneAndUpdate() 根据指定条件更新一个

----

## 异步编程

### 得到函数内部异步操作的结果

唯一方法就是：回调函数

- 回调函数：通过一个函数，获取函数内部的操作 (根据输入得到结果)

```javascript
function fn(x, y, callback) {
  setTimeout(() => {
    let sum = x + y
    callback(sum)
  }, 1000)
}
fn(10, 20, function (sum) {
  console.log(sum)
})
```

**注：**

- 凡是需要得到一个函数内部异步操作的结果（setTimeout, readFile, writeFile, Ajax, readdir）
- 这种情况必须通过 回调函数 （异步 API 都会伴随着一个回调函数）

### 回调地狱

#### 为什么会有回调地狱

回调地狱的原因是，当人们试图以一种从上到下的视觉执行 JavaScript 的方式编写 JavaScript 时。期望第一行发生的任何事情都会在第二行的代码开始运行之前完成，但是，在 JavaScript 上，有时候这并没办法进行，比如，在你通过异步读取文件时

```javascript
var fs = require('fs')

fs.readFile('./a.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)
})

fs.readFile('./b.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)
})

fs.readFile('./c.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)
})
```

执行多次后，你会发现，有那么几次，也有可能好几次，看人品吧反正是，它是没有规则的读出来的（往往可能你的文件越大，读出来的时间会更久），也就是说，它并不会按照代码书写顺序去执行，这便是异步编程（如果试了没有，那就一直试，反正总会有的）。异步API导致了代码并不是按顺序执行的（可以读读这篇文章 https://www.jianshu.com/p/39adf6ab8ad1 ——然后嘞，就会有上面那种解决方法，但是你会发现，代码非常的丑（别人是这样说的，反正我不是太这么认为，甚至觉得有点好看），还有非常难维护（这点认同）。所以就出现了几种解决方法 —Promise

当然你也可以使用嵌套的方式，虽然这样会按规律的执行，但是如果这样的代码多了起来这不就是无限回调吗？

及影响代码的美观，同是也影响性能

```javascript
var fs = require('fs')

fs.readFile('./a.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)
  
    fs.readFile('./b.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)

     fs.readFile('./c.txt', 'utf8', function(err, data) {
    if (err) {
        console.log(err)
    }
    console.log(data)
})
})
})
```

### Promise

Promise 是一个构造函数，它的出现为了解决回调地狱的问题

#### 概念

- Promise 是一个容器，而容器中存放了一个异步任务（pending）
  - 这个异步任务会有两种状态（Resolved：成功）和（Rejected：失败）而它只能变成其中的一种

![image-20220510193644814](https://s2.loli.net/2022/12/09/jsP7neoWEXrmGMi.png)

- Promise：承诺，保证
- Promise：本身不是异步，但往往都是内部封装一个异步任务

代码如下，交易维护，（但不是最佳选择）

```javascript
var fs = require('fs')
//resolved(解决（成功）)，rejected（驳回（失败））
var p1 = new Promise(function(resolved, rejected) {
    //文件编码！！！！！！
    fs.readFile('./a.txt', 'utf8', function(err, data) {
        if (err) rejected(err)
        resolved(data)
    })
})
var p2 = new Promise(function(resolved, rejected) {
    fs.readFile('./b.txt', 'utf8', function(err, data) {
        if (err) rejected(err)
        resolved(data)
    })
})
//链式编程，🔺Promise会默认将then中return的值实例成一个promise对象，所以可以调用then方法，实现链式调用
p1
    .then(res => {
        console.log(res)
        return p2
    })
    .then(res => {
        console.log(res)
    })
		.catch(err => {
  			console.log(err)
		})
```

then函数（ES6）说明：

![image-20220510194027835](https://s2.loli.net/2022/12/09/nFltXbQxLU6rDzG.png)

封装Promise中的readFile方法

```javascript
let fs = require("fs")

function pReadFile(filePath) {
  return new Promise(((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  }))
}

pReadFile('./a.txt')
  .then(res => {
    console.log(res)
    return pReadFile("./b.txt")
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
```

#### Promise 应用场景

##### 解决客户端回调嵌套问题

当出现类似于表关联的数据时，这时候就会遇到嵌套问题，当嵌套的数据只有一两个时还好，如果出现五个、十个，这时候就会出现回调地狱的问题，这里使用 Promise 解决

###### 所需知识

- npm 模块：json-server、http-server
- 客户端模板引擎 art-template
- Ajax
- jquery

###### 步骤

安装 json-server 和 http-server 以及其他必要模块

```shell
# 本地服务器，安装完成后，cmd输入http-server即可开启本地服务器。
npm i -g http-server
# 把json文件变成接口服务器，通过 json-server --watch db.json 可开启
npm i -g json-server
npm i jquery --save
npm i template --save
```

设计表单，人员信息与共组职业相关联，搭配模板字符串使用

```html
<form action="" id="user_form"></form>
```

模板引擎

```html
<script type="text/template" id="tpl">
    <div>
      <label for="">用户名</label>
      <input type="text" value="{{ user.username }}">
    </div>
    <div>
      <label for="">年龄</label>
      <input type="text" value="{{ user.age }}">
    </div>
    <div>
      <label for="">职业</label>
      <select name="" id="">
        {{ each jobs }} {{ if user.job === $value.id }}
        <option value="{{ $value.id }}" selected>{{ $value.name }}</option>
        {{ else }}
        <option value="{{ $value.id }}">{{ $value.name }}</option>
        {{ /if }} {{ /each }}
      </select>
    </div>
</script>
```

引用相关模板字符串以及 JQuery 模块

```html
<script src="node_modules/art-template/lib/template-web.js"></script>
<script src="node_modules/jquery/dist/jquery.js"></script>
```

书写 Ajax 向服务器发起请求，并封装便于使用

```javascript
function get(url, callback) {
  var oReq = new XMLHttpRequest()
  oReq.onload = function () {
		oReq.responseText
    callback(oReq.responseText)
  }
   oReq.open("get", url, true)
   oReq.send()
}
```

开启 json-server 服务，使用 data.json 文件

```javascript
json-server data.json
```

将当前文件所处文件夹开放为服务器

```shell
http-server
```

- 若要禁用缓存

```shell
http-server -c-1
```

使用回调地狱写法

```javascript
get("http://127.0.0.1:3000/users/1",function(userData){
  get("http://127.0.0.1:3000/jobs",function(jobsData){
  	var htmlStr = template("tpl", {
  		user: JSON.parse(userData),
  		jobs: JSON.parse(jobsData)
  	})
  	console.log(htmlStr)
  	document.querySelector("#user_form").innerHTML = htmlStr
  })
})
```

封装 Promise 版本的 Ajax 方法

```javascript
function Rget(url,callback){
  return new Promise(function(resolve,reject){
  var xhr = new XMLHttpRequest()
  // 当请求加载成功之后要调用指定的函数
  xhr.onload = function () {
    // 我现在需要得到这里的 xhr.responseText
    resolve(JSON.parse(xhr.responseText))
    callback && callback(JSON.parse(xhr.responseText))
  }
  xhr.onerror = function (err){
    reject(err)
  }
  xhr.open("get", url, true)
  xhr.send()
  })
}

// 使用
var data = {}
Rget("http://127.0.0.1:3000/users/2")
 .then(function(user){
    data.user = user
    return Rget("http://127.0.0.1:3000/jobs")
 })
 .then(function(jobs){
    data.jobs = jobs
    var str = template("tpl", {
      user: data.user,
      jobs: data.jobs
    })
    document.querySelector("#user_form").innerHTML = str
 })
```

###### Promise 操作数据库

mongoose 中所有的 API 都支持 Promise 

根据查询是否已存在该记录从而决定是否创建新记录

```javascript
Cat.findOne({ name: "好啊" })
.then(function(cat){
  if(cat){
    console.log('该cat已存在')
  } else{
    return new Cat({"name" : "好啊", "age" : 16 }).save()
  }
})
.then(function(data){
  console.log(data)
})
```

##### 注意：

- 每次改完 js 或 html 文件后在浏览器需刷新多次
- 每次改完 json 文件后需要重新启动 json-server 服务

##### catch 异常处理

在全部 then 之后添加 `catch(err => {})` 即可对任何一个 then 处理过程抛出异常进行捕获并中止代码继续执行

例如：读取文件并进行后续相关操作，若处理过程发生一个错误则传递给 catch ，后面所有的 then 就不再执行

这里要注意区分，如果在 `then` 中自行处理 `err` ，则代码还是会继续往下执行，这是和 `catch` 不同的点

```javascript
readFile('a.txt', 'utf8')
  .then(data => {
    console.log(data)
    return readFile('a.txt', 'utf8')
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```

##### finally 最后处理方法

`finally` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` 状态到底是 `fulfilled` 还是 `rejected` 。这表明，`finally` 方法里面的操作，应该是与状态无关的，不依赖与 `Promise` 的执行结果

`finally` 本质上是 `then` 方法的特例

```javascript
promise
.finllay(() => {
  // 执行语句
})

// 等同于
promise
.then(result => {
  // 执行语句
  return result
})
.catch(err => {
  // 错误对象
  throw error
})
```

上面代码最后不管 `Promise` 对象最后状态如何，都会之执行 `finally` 这个操作

```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。

## 中间件

### 中间件的概念

> 参考文档：(http://expressjs.com/en/guide/using-middleware.html)
>
> 概念: ([node基础学习--中间件](https://blog.csdn.net/weixin_42282999/article/details/110872091?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1-110872091-blog-108723380.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1-110872091-blog-108723380.pc_relevant_default&utm_relevant_index=1))

中间件：把很复杂的事情分割成单个，然后依次有条理的执行。就是一个中间处理环节，有输入，有输出。

说的通俗易懂点儿，中间件就是一个（从请求到响应调用的方法）方法

把数据从请求到响应分步骤来处理，每一个步骤都是一个中间处理环节

就形象如这个图：自来水厂的净水过程

![image-20220528145547468](https://s2.loli.net/2022/12/09/waz8qQWlmo6ktAS.png)

同一个请求对象所经过的中间件都是同一个请求对象的响应对象

### 中间件的作用

在多个中间件之间，共享同一份 `req` 和 `res` 。基于这样的特性，我们可以在上游的中间件，统一为 `res` 或 `res` 对象添加自定义的属性或方法，供下游的中间件或路由进行使用

![image-20220528204747439](https://s2.loli.net/2022/12/09/RYc985sGr7NZzbn.png)

### 中间件的分类

#### 应用程序级别的中间件

万能匹配（不关心任何请求路径和请求方法的中间件）

`next()` 则表示下一个中间件，如果没有 `next()` 后面不管有多少个中间件都不会被匹配

```javascript
app.use(function (req, res, next) {
  console.log("Time", Date.now())
  next()
})
```

关心请求路径和请求方法的中间件

```javascript
app.use("/a", function (req, res, next) {
  console.log("Time", Date.oew())
})
```

#### 定义局部中间件

##### 单个局部中间件

不使用 `app.use()` 定义的中间件，叫做局部生效的中间件

```javascript
let mw1 = function (req, res, next) {
  // 处理语句
  next()
}

// mw1 这个中间件只在 “当前路由中生效”， 这种用法属于 “局部生效的中间件”
app.get("/", mw1, function (req, res) {
  res.send()
})
```

##### 多个局部中间件

可以在路由中，通过如下两种等价的方式，使用多个局部中间件

```javascript
app.get("/", mw1, mw2, function (req, res) {
  res.send()
})

app.get("/", [mw1, mw2], function (req, res) {
  res.send()
})
```

#### 路由级别的中间件

严格匹配请求路径和请求方法的中间件

###### get：

```javascript
app.get("/", function (req, res, next) {
  res.send("get")
})
```

###### post：

```javascript
app.post("/a", function (req, res, next) {
  res,send("post")
})
```

###### put：

```javascript
app.put("/user", function (req, res, next) {
  res.send("put")
})
```

###### delete：

```javascript
app.delete("/delete", function (req, res, next) {
  res.send("delete")
})
```

#### Express 内置的中间件

自 `Express` 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验

- `express.static` 快速托管静态资源的内置中间件，例如：HTML 文件、图片、CSS 样式等（无兼容性）
- `express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0 + 版本中可用）
- `express.urlencoded` 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0 + 版本中可用）

### Express 的中间件

在 `Express` 中，对中间件有几种分类

- 当请求进来，会从第一个中间件开始进行匹配

  - 如果匹配，则进来

    ```tex
    如果请求进入中间件之后，没有调用 next 则代码会停在当前中间件
    如果调用了 next 则继续向下找到第一个匹配的中间件
    ```

  - 如果不匹配，则继续判断匹配下一个中间件

- 不关心请求路径和请求方法的中间件，也就是说任何请求都会进入这个中间件

- 中间件本身是一个方法，该方法接收三个参数

  - `Request` 请求对象

  - `Responsse` 响应对象

  - `next` 下一个中间件

  - 当一个请求进入一个中间件之后，如果不调用 `next` 则会停留在当前中间件

    所以 `next` 是一个方法，用来调用下一个中间件的

    调用 `next` 方法也是要匹配的（不是调用紧挨着的那个）

### 错误处理中间件

```javascript
app.use(function (err, req, res, next) {
  res.status(500).send("Something broke")
})
```

配置使用 404 中间件 (放在最后面，否则在它后面的其他中间件将不在起作用)

```javascript
app.use(function (req, res) {
  res.render("404.html")
})
```

配置全局错误处理中间件

```javascript
app.get("/a", function (req, res, next) {
  fs.readFile(".a/bc", function () {
    if (err) {
      // 当调用next() 传参后，则直接进入到全局错误处理中间件方法中
      // 当发生全局错误的时候，我们可以调用next() 传递错误对象
      // 然后被全局错误处理中间件匹配到并进行处理
      next(err)
    }
  })
})

// 全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})
```

### 内置中间件

- express.static（提供静态文件）
  - http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

### 第三方中间件

> 参考文档：http://expressjs.com/en/resources/middleware.html

- url 一般用于提取路径中的参数
- path 一般用于处理文件路径和文件夹路径的
- events 对于事件操作
- fs 对文件或者文件夹进行相关操作
- express框架 对http模块进行了二次封装
- express中间件Router路由 get post 需要导出导入挂载到app实例上
- cookie-parser 对前台设置cookie
- express-session 后端session缓存信息 主要对前端用户验证
- body-parser 在req.body里接收post传递过来的参数
- http-errors 自定义HTTP错误信息
- serve-favicon 后端设置网页小图标
- svg-captcha 后端给前台提供图片验证码 data text
- formidable 接受包含文件或者图片类型的表单 前端使用 new formDate

- compression
- mogran
- response-time
- server-static
- session

**在 node 中每一个 js  文件都是一个模块，要在其他模块使用需要导出（exports | model.exports）和引入（require）- 使用 express - generator 脚手架模块 express – view = ejs myapp**

### 什么是同步，异步

同步操作，当代码运行到同步操作的代码时，所在线程等待结果返回

而异步操作，则是不会耽误代码继续执行，当异步操作成功，一般使用回调函数来处理异步成功的动作（常用在 ajax/定时器/计时器等）

### 什么是中间件

中间件其实就是一个个的函数，当调用 `next()` 时，才会执行下一个中间件函数 `Express` 是一个自身功能极简，完全时路由和中间件构成一个 web 开发框架：从本质上来说，一个 `Express` 应用就是在调用各种中间件函数。封装了一些或许复杂但肯定是通用的功能，非内置的中间件需要通过安装后，`require` 到文件就可以运行

## art-template 搭配 deteformat 模块

### 简介

art-template 搭配 dateformat 实现将格式化为你想要的日期格式

### 安装

npm 下载对应模块 

```shell
npm i dateformat
```

### 使用 (双大括号插值)Mustache 语法

页面代码 （注意：art-template 默认渲染的页面后缀名为 art，time 为渲染时间数据，“YYYY-MM-DD” 为你要定义的时间格式）

```shell
{{ dateformat(time, "YYYY-MM-DD") }}
```

### 配置及使用

#### 加载模块

```javascript
let template = require("art-template")
let path = require("path")
let dateFormat = require("dateformat")
```

#### 配置模板引擎

```javascript
template.default.import.dateFormat = dateFormat
```

#### 渲染页面并打出在 cmd 命令行

```javascript
let html = template("06.art", {
  time: new Date()
})
```

------

## 其它

### 文件与模块的操作路径

#### 文件：

- 文件使用的所有文件操作的 API 都是异步的

- 在操作文件路径时可以省略 `./` 标识符，例如：

  ```javascript
  let fs = require("fs")
  fs.readFile("data/foo.txt", function (err, data) {})
  ```

- 但是不可以只省略 `.` 标识符，例如：

  ```javascript
  let fs = require("fs")
  fs.readFile("/data/foo.txt", function (err, data) {})
  ```

  - 这样则会读取的是我们当前磁盘的根目录

#### 模块：

- 在操作模块路径时不可以省略 `./` 标识符，除非是核心模块或者是第三方包模块，例如：

  ```javascript
  require("a.js")
  ```

- 也不可以只写 `/` 标识符， 例如：

  ```javascript
  require("/a.js")
  ```

  - 这样则会读取的是我们当前磁盘的根目录

----

### 修改完代码重启

- 我们这里可以使用一个第三方命令行工具：`nodemon` 来帮我们解决频繁修改代码重启服务器的问题

- `nodemon` 是一个基于 NodeJS 开发的一个第三方命令行工具，我们使用的时候需要独立安装

  ```shell
  npm install --global nodemon
  ```

  - 该命令可以在任意目录执行
  - 因为所有的 `--global` 命令行是在全局安装的
  - 就是说任意带有 `--global` 的第三方包都可以在任意目录安装

- 安装完成后，使用：

  ```shell
  # 之前使用 
  node app.js
  
  # 现在使用
  nodemon app.js
  ```

- 只要使用通过 `nodemon app.js` 启动的服务，则它会监视你的文件变化，当文件发生变化保存 `ctrl + s` 的时候，自动重启服务器


----

### 以文件形式保存数据持久化

- 保存数据的文件一定是 `.json` 的文件格式

![image-20220430151307999](https://s2.loli.net/2022/12/09/1erTSs5DwbgF47V.png)

- 当我们从文件内读取出的数据一定是字符串类型的

![image-20220430151423460](https://s2.loli.net/2022/12/09/wQJlrZRBbP4p2uq.png)

- 这时候我们需要手动转换成对象类型

```javascript
JSON.parse(data).具体数据
```

![image-20220430151601850](https://s2.loli.net/2022/12/09/3MOfKLZ4BY6rbW9.png)

### 隐藏元素控件

用来放一些不希望被用户看见，但是需要被提交到服务端的数据

```html
<input type="hidden" name="id" value="{{ student.id }}" />
```

