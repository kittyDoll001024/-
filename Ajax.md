# ajax

**AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。**

## 请求报文&响应报文

浏览器中获取`html css js`都是发送请求报文
服务器中的是响应报文
请求报文和响应报文这种方式我们称之为HTTP协议

## ajax基础

### 创建异步对象

```javascript
const xhr = new XMLHttpRequest();
```

按照请求报文流程操作

```javascript
//创建异步对象
const xhr = new XMLHttpRequest();
//请求行(请求方式，请求文件)
xhr.open("get", "./ajax.php");
//请求头(参数1:键名,参数2:值)
xhr.setRequestHeader("hd", "houdunren.com");
//请求主体-发送
xhr.send(null);
```

请求头如果不需要可以不添加

### open请求行

第一个参数是请求的方式

第二个参数是请求的url

第三个参数是控制是否异步操作，默认是true可以修改为false但一般不会去修改

```javascript
xhr.open("get", "./ajax.php",true); 
```

### GET请求数据方式

`ajax`一般请求方式分为两种，`get和post`

get会直接显示在`url`中

```http
(https://www.bilibili.com/video/BV1ox411M7P2?p=42)//问号的后面是get数据key=value
```

### responseText

`xhr.responseText`可以获取服务端的打印数据

```javascript
xhr.responseText
```

下面是通过promise来发送请求接收数据(get的方式请求)

```javascript
<button>请求数据</button>
<script>
   function request(method, url) {
      return new Promise((resolve, rejecet) => {
         const xhr = new XMLHttpRequest();
         xhr.open(method, url);
         xhr.send(null);
         xhr.onload = () => {
            resolve(xhr.responseText);
         };
         xhr.onerror = () => {
            reject("失败");
         };
      });
   }
   document.querySelector("button").onclick = () => {
      request("get", "./response.php?user=后盾人&site=hdcms.com").then(
         value => {
            alert(value);
         }
      );
   };
</script>
```

`php`端代码

```php
<?php
sleep(2);
print_r($_GET);
```

### POST请求数据方式

在send方法里面填写参数字符串的形式`key=value&key=value`

```javascript
xhr.send("name=houdunren&site=hdcms.com");
```

如果使用post方式，那么必须是要设置请求头

```javascript
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
```

下面是使用post请求数据

```javascript
<h2>验证会员系统</h2>
<input type="text" placeholder="请输入用户名" /><label for=""></label>
<script>
   "use strict";
   function promise(mothed, url) {
      return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.open(mothed, url);
         xhr.onload = () => resolve(xhr.responseText);
         xhr.onerror = () => reject("请求失败");
         xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
         );
         xhr.send("name=houdunren&site=hdcms.com");
      });
   }
   document.querySelector("input").onblur = event => {
      document.querySelector("label").innerHTML = `请您耐心等待...`;
      promise("post", "./post.php").then(value => {
         document.querySelector("label").innerHTML = value;
      });
   };
   document.querySelector("input").onkeyup = event => {
      if (event.keyCode == 13) {
         event.target.blur();
      }
   };
</script>
```

智能回复机器人案例

```javascript
 <style>
         body {
            margin: 0;
            padding: 20px;
         }

         .clearfix::before,
         .clearfix::after {
            content: "";
            visibility: hidden;
            clear: both;
            line-height: 0;
            height: 0;
            display: block;
         }

         .clearfix {
            zoom: 1;
         }

         .f_l {
            float: left;
         }

         .f_r {
            float: right;
         }

         .container {
            margin: 50px auto 0;
            width: 800px;
            height: 500px;
            border: 1px solid skyblue;
            border-radius: 10px;
         }

         .message {
            border-bottom: 1px solid skyblue;
            height: 400px;
            overflow-y: scroll;
            padding: 20px;
            box-sizing: border-box;
            transition: all 2s;
         }

         .control {
            height: 100px;
            padding-left: 50px;
            padding-right: 50px;
         }

         .inputBox {
            height: 60px;
            margin-top: 20px;
            border-radius: 6px;
            outline: none;
            padding: 0;
            box-sizing: border-box;
            width: 500px;
            font-size: 30px;
            box-shadow: 0 0 3px gray;
            border: 1px solid #ccc;
            transition: all 0.2s;
            padding-left: 10px;
         }

         .inputBox:focus {
            border-color: skyblue;
            box-shadow: 0 0 3px skyblue;
         }

         .sendButton {
            height: 70px;
            margin-top: 15px;
            background-color: yellowgreen;
            width: 150px;
            border: none;
            outline: none;
            border-radius: 10px;
            color: white;
            font-size: 40px;
            font-family: "微软雅黑";
            cursor: pointer;
         }

         .message > div > a {
            text-decoration: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: skyblue;
            text-align: center;
            line-height: 50px;
            color: white;
            font-size: 25px;
            font-weight: 700;
            font-family: "微软雅黑";
         }

         .message > .robot > a {
            background-color: hotpink;
         }

         .message > .self > a {
            background-color: yellowgreen;
         }

         .message > div {
            padding: 10px 0;
         }

         .message > div > p {
            max-width: 300px;
            min-height: 28px;
            margin: 0 10px;
            padding: 10px 10px;
            background-color: #ccc;
            border-radius: 10px;
            word-break: break-all;
            position: relative;
            line-height: 28px;
            font-weight: 400;
            font-family: "微软雅黑";
            color: white;
            font-size: 20px;
         }

         .message > .robot > p {
            background-color: skyblue;
         }

         .message > .robot > p::before {
            content: "";
            position: absolute;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid skyblue;
            left: -5px;
            top: 15px;
         }

         .message > .self > p {
            color: black;
         }

         .message > .self > p::before {
            content: "";
            position: absolute;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 6px solid #ccc;
            right: -6px;
            top: 15px;
         }
      </style>
   </head>

   <body>
      <h1>在线机器人</h1>
      <div class="container">
         <div class="message">
            <div class="robot clearfix">
               <a href="#" class="f_l">机</a>
               <p class="f_l">我要吃西兰花</p>
            </div>
            <div class="self clearfix">
               <a href="#" class="f_r">人</a>
               <p class="f_r">123</p>
            </div>
         </div>
         <div class="control">
            <input type="text" class="inputBox f_l" />
            <input type="button" class="sendButton f_r" value="发 送" />
         </div>
      </div>
   </body>
</html>

<!--  导入 jq  -->
<script type="text/javascript" src="./jquery.min.js"></script>
<script>
   $(function () {
      "use strict";
      function request(url, mothed = "get") {
         return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(mothed, url);
            if (mothed == "post") {
               xhr.setRequestHeader(
                  "Content-Type",
                  "application/x-www-form-urlencoded"
               );
               xhr.send(
                  "key=9257afd24a374c69b91eeb687d463763&info=" +
                     $(".inputBox").val()
               );
               xhr.onload = () => {
                  resolve(xhr.responseText);
               };
               return 0;
            }
            xhr.onload = () => {
               resolve(xhr.responseText);
            };
            xhr.send(null);
         });
      }

      $(".sendButton").click(function () {
         const self = $(".self").clone().first();
         $(".message").append(self);
         self.find("p").html($(".inputBox").val());
         $(".inputBox").val("");
         request("http://www.tuling123.com/openapi/api", "post").then(value => {
            const robot = $(".robot").clone().first();
            $(".message").append(robot);
            robot.find("p").html(value);
         });
      });
      $(".inputBox").keyup(event => {
         if (event.keyCode === 13) {
            $(".sendButton").click();
         }
      });
   });
</script>
```

### onreadystatechange事件

这个事件是在元素发生改变之后触发，效果和onload类似，但是会触发多次

```javascript
xhr.onreadystatechange = function () {
   console.log(xhr.readyState);
   console.log(xhr.responseText);
};
```

### xhr.readyState属性

**readyState** 属性返回一个 XMLHttpRequest 代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：

| 值   | 状态               | 描述                                                |
| ---- | ------------------ | --------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中； 属性已经包含部分数据。`responseText`       |
| `4`  | `DONE`             | 下载操作已完成。                                    |

### status属性

这是一个只读属性，可以返回请求的状态码

```javascript
console.log(xhr.status);//返回200-404-304
```

下面是使用onreadystatechange加载事件

```javascript
<script src="jquery.min.js"></script>
<script>
   $(function () {
      $("button").click(function () {
         $("h3").html($(this).html());
         const xhr = new XMLHttpRequest();
         xhr.open("get", "./StarData.php?title=" + $(this).html());
         xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {//只有在最后完成状态并且是200																														才可以进行处理
               let data = xhr.responseText.split("|");//拆分取到的字符串数据
               $("img").attr("src", data[0]);
               $(".content").html(data[1]);
            }
         };
         xhr.send(null);
      });
   });
</script>
```

php代码

```php
<?php
$starArr = [
    '风和' => ['image' => './images/view.jpg', 'info' => '红豆生南国'],
    '海景' => ['image' => './images/view2.jpg', 'info' => '春来发几枝'],
    '森林' => ['image' => './images/view3.jpg', 'info' => '愿君多采撷'],
    '大山' => ['image' => './images/view4.jpg', 'info' => '此物最相思'],
];
$StarName = $_GET['title'];
echo $starArr[$StarName]['image'];
echo '|';
echo $starArr[$StarName]['info'];

```

php这种返回字符串的方式不好处理，如果是数据比较多的话需要一个一个进行分割

## xml

指可扩展标记语言(数据格式)

被设计用来传输和存储数据。

### 基础知识

`<?xml version='1.0' encoding='UTF-8'?>`开头代码

```xml
<?xml version='1.0' encoding='UTF-8'?>//固定开头
<root>
<name>后盾人</name>
<age>18</age>
<sikll>看书，唱歌</sikll>
</root>
```

### xml标签

xml没有自己定义过标准的标签，也就是可以自己随意设置标签，但必须是双标签，内容在中间，如上方图中所示，虽然没有规定，但尽量标签名取得含有语义。

## 接收XML

#### php：file_get_contents()

php中接收xml数据使用file_get_contents('xml文件路径')

```php
$xmlString = file_get_contents('data/data.xml');
```

#### php：header('Content-Type: application/xml');

使用xml之前需要设置响应头的内容类型为xml才可以正常解析xml

#### html：responseXML

在html中使用`responseXML`来获取从服务器端返回的xml数据

```html
xhr.responseXML
```

## JSON

json是一种数据格式

可以将传递过来的数据转换为对象或者数组，使用更方便

json支持字符串的语言都是支持的

### 基本使用

声名方式和字符串相似

json中对象的属性和值都需要用双引号包裹起来

```javascript
 const JSON = '{"name":"andy","age":"19"}';
 const JSONArr = '["andy","red","hd"]';
```

#### JSON.parse()

可以将json格式的数据转换为对象或数组

```javascript
console.log(JSON.parse(JSONObject));
```

# axios

是ajax主流库，Vue和react都是推荐这种异步请求库

基于Promise的HTTP库，可以用在浏览器和Node.js中

> axion官网: [click here](https://axios-http.com/)

## 安装步骤

一般在项目中我们使用以下两种方式

```powershell
$ npm install axios
```

```powershell
$ yarn add axios
```

练习的时候我们可以使用cdn链接用script标签引入

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
```

## json-server

> [typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously) (github.com)](https://github.com/typicode/json-server)

因为要请求后台数据，我们使用json-server库简单搭建一个服务器

### 安装步骤

1. 安装json-server

```powershell
npm install -g json-server
```

2. 创建一个`db.json`的数据文件，以下是假数据

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

3. 启动json-server服务器，要求是在`db.json`文件目录下

```powershell
json-server --watch db.json
```

## 基本使用

`axios`函数传递一个配置对象,请求回来的数据是一个响应对象，我们可以通过data取到请求回来的数据

```
axios({})
```

### 配置对象中的属性

1. method：请求的方式
2. url：请求的地址
3. data：传递的数据，data是一个对象

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>axios的基本使用</title>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="center">
        <button type="button" class="btn btn-success">发送GET请求</button>
        <button type="button" class="btn btn-info">发送POST请求</button>
        <button type="button" class="btn btn-warning">发送PUT请求</button>
        <button type="button" class="btn btn-danger">发送DELETE请求</button>
      </div>
    </div>
    <script>
      const btns = document.querySelectorAll("button");
      //get请求数据
      btns[0].onclick = () => {
        //发送ajax请求
        axios({
          //请求方式
          method: "get",
          //请求地址
          url: "http://localhost:3000/posts/2",
          //promise处理
        }).then(value => console.log(value.data));
      };
      //发送一篇文章
      btns[1].onclick = () => {
        //发送ajax请求
        axios({
          //请求方式
          method: "post",
          //请求地址
          url: "http://localhost:3000/posts",
          //发送数据
          data: {
            //不需要写id
            title: "今天吃大肘子",
            author: "张三",
          },
          //promise处理
        }).then(value => console.log(value.data));
      };
      //修改文档的作者
      btns[2].onclick = () => {
        //发送ajax请求
        axios({
          //请求方式
          method: "put",
          //请求地址
          url: "http://localhost:3000/posts/3",
          //发送数据
          data: {
            //不需要写id
            title: "今天吃大肘子",
            author: "李四",
          },
          //promise处理
        }).then(value => console.log(value.data));
      };
      //删除一篇文档
      btns[3].onclick = () => {
        //发送ajax请求
        axios({
          //请求方式
          method: "delete",
          //请求地址
          url: "http://localhost:3000/posts/3",
          //promise处理
        }).then(value => console.log(value.data));
      };
    </script>
  </body>
</html>
```

### request

和`axios`函数是一样的

```javascript
//request请求数据,写法和axios函数一样
btns[0].onclick = () => {
  axios
    .request({
      method: "get",
      url: "http://localhost:3000/comments/1",
    })
    .then(value => console.log(value));
};
```

### post

`axios#post(url[, data[, config]])`

```javascript
//post方法
btns[1].onclick = () => {
  axios.post("http://localhost:3000/comments", {
    body: "你今天还好吗",
    postId: 2,
  });
};
```

### 配置对象

以下是`axios`配置对象常用的属性说明罗列，其余的作为了解即可，对其他属性要了解可以前往[CSDN查看](https://blog.csdn.net/czj1049561601/article/details/113913776)

```js
高频常用参数罗列：
	1：url       // 通过设置url参数，决定请求到底发送给谁
	2：method    // 设置请求的类型，get/post/delete..
	3：baseURL   // 设置url的基础结构，发送请求配置时只需要设置url即可，axios会自动将两者进行拼接
	4：headers   // 头信息：比较实用的参数，在某些项目当中，进行身份校验的时候，要求在头信息中加入一个特殊的标识  
	// 来检验请求是否满足要求，可以借助headers对请求头信息做一个配置
	5：params    // 也是一个比较常用的参数，来设定url参数的，可以通过params直接添加url参数名和参数值
	6：data 		//数据
	7：timeout    // 超时请求时间，单位是ms 超过请求时间，请求就会被取消
	8：其余的都是不经常使用的参数，了解即可！
```

### 默认配置

```javascript
<body>
  <div class="container">
    <div class="center">
      <button type="button" class="btn btn-success">发送GET请求</button>
      <button type="button" class="btn btn-info">发送POST请求</button>
      <button type="button" class="btn btn-warning">发送PUT请求</button>
      <button type="button" class="btn btn-danger">发送DELETE请求</button>
    </div>
  </div>
  <script>
    const btns = document.querySelectorAll("button");
    //配置axios默认设置
    axios.default.method = "GET";
    //   axios.default.baseURL = "http://localhost";
    //   axios.default.params = { name: "李四" };
    //   axios.default.timeout = 1000;
    btns[0].onclick = async () => {
      const user = await axios({
        url: "http://localhost/user.php?name=李四",
      });
      console.log(user.data);
    };
  </script>
</body>
```

### 创建实例对象

当我们需要向不同服务器发送多个请求的时候，默认配置只能有一个生效,我们可以通过axios中的方法来创建实例对象

### `axios.create`

```javascript
"use strict";
const btns = document.querySelectorAll("button");
//创建实例对象user,配置默认值
const user = axios.create({
  baseURL: "http://localhost/user.php",
  timeout: 2000,
});
btns[0].onclick = () => {
  user({
    url: "?name=向军",
  }).then(value => console.log(value.data));
};


//创建实例对象lesson，配置默认值
const lesson = axios.create({
  baseURL: "http://localhost/houdunren.php",
  timeout: 2000,
});
btns[1].onclick = () => {
  lesson({
    url: "?id=1",
  }).then(value => console.log(value.data));
};
```

## 拦截器

### 请求拦截器

`axios.interceptors.request.use()`可以设置请求拦截器，当我们发送请求的时候，会先经过请求拦截器校验之后才会发出

```javascript
//设置请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log("请求拦截器成功 1");
    // throw "拒绝";
    return config;
  },
  function (error) {
    console.log("请求拦截器失败 1");
    return Promise.reject(error);
  }
);
```

### 响应拦截器

`axios.interceptors.response.use()`可以设置响应拦截器，当响应回来之后，可以对响应回来的内容做处理

```javascript
//设置响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log("响应拦截器成功 1");
    return response.data;
    // return response;
  },
  function (error) {
    console.log("响应拦截器失败 1");
    return Promise.reject(error);
  }
);
```

请求和响应拦截器，是根据返回的值判断是进入成功的回调还是拒绝的回调，如果请求拦截器成功回调中抛出一个错误，那么会进入到响应拦截器的拒绝回调中
