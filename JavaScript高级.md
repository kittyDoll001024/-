

# JavaScript高级

[TOC]



## 对象属性特征

JS中可以对属性的访问特性进行控制。

#### 抽象封装

下例将对象属性封装到构造函数内部

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.info = function() {
    return this.age > 50 ? "中年人" : "年轻人";
  };
  this.about = function() {
    return `${this.name}是${this.info()}`;
  };
}
let lisi = new User("李四", 22);
console.log(lisi.about());
```

#### 问题分析

上例中的方法和属性仍然可以在外部访问到，比如 `info`方法只是在内部使用，不需要被外部访问到这会破坏程序的内部逻辑。

下面使用闭包特性将对象进行抽象处理

```javascript
function User(name, age) {
  let data = { name, age };
  let info = function() {
    return data.age > 50 ? "中年人" : "年轻人";
  };
  this.message = function() {
    return `${data.name}是${info()}`;
  };
}
let lisi = new User("后盾人", 22);
console.log(lisi.message());
```

------



#### 查看特征

`Object.getOwnPropertyDescriptor(obj, "name")`可以查看obj对象中name属性的特征

#### 查看所有特征

`Object.getOwnPropertyDescriptors(obj)`可以查看obj对象中所有属性的特征

#### 单独设置特征

`Object.defineProperty(obj,"name")`可以设置obj对象中name属性的特征或者添加这个属性

|     特征     |                          说明                          | 默认值    |
| :----------: | :----------------------------------------------------: | :-------- |
|    value     |                    对象属性的默认值                    | undefined |
|   writable   |                   对象属性是否可修改                   | true      |
|  enumerable  |   对象属性是否可通过for-in循环，或Object.keys() 读取   | true      |
| configurable | 能否使用delete、能否需改属性特性、或能否修改访问器属性 | true      |

#### 批量设置特征

`设置Object.defineProperties(obj,{属性:{}})`可以批量的设置属性

```javascript
"use strict";
let user = {};
Object.defineProperties(user, {
  name: { value: "向军", writable: false },
  age: { value: 18 }
});
console.log(user);
user.name = "后盾人"; //TypeError
```

#### `禁止`添加

`Object.preventExtensions(obj)`禁止向对象添加属性

`Object.isExtensible(obj)`判断能否向对象中添加属性-返回值为布尔值

```javascript
"use strict";
const user = {
  name: "向军"
};
Object.preventExtensions(user);
console.log(Object.isExtensible(user)); //false
```

#### `封闭`对象

`Object.seal(obj)`方法封闭一个对象，阻止添加新属性并将所有现有属性标记为`configurable:false`

`Object.isSealed(obj)` 如果对象是密封的则返回 `true`，属性都具有`configurable:false`

```javascript
"use strict";
const user = {
  name: "向军"
};
Object.seal(user);
console.log(Object.isSealed(user)); //true
```

#### `冻结`对象

`object.freeze(obj)` 冻结对象后不允许添加、删除、修改属性，`writable、configurable都标记为 false`

`object.isFrozen(obj)`方法判断一个对象是否被冻结

```javascript
"use strict";
const user = {
  name: "向军"
};
Object.freeze(user);
console.log(Object.isFrozen(user)); //true
```

#### 抛出错误提示

`throw new Error("提示信息")`用于设置提示错误信息

```javascript
let num = "abc";
if (typeof num !== "number") {
  throw new Error("请输入合法数字");
} else {
  alert(num);
}
```

<img src="C:\Users\22135\AppData\Roaming\Typora\typora-user-images\image-20210726144138983.png" alt="image-20210726144138983" style="zoom:50%;" />

## 属性访问器

get方法用于获得属性值，set方法用于设置属性，这是JS提供的存取器特性即使用函数来管理属性。

- 用于避免错误的赋值
- 需要动态监测值的改变
- 属性只能在访问器和普通属性任选其一，不能共同存在

#### getter/setter -> get/set

对象设置用户的年龄数据使用访问器监控控制

```javascript
"use strict";
const user = {
  data: { name: '后盾人', age: null },
  set age(value) {
    if (typeof value != "number" || value > 100 || value < 10) {
      throw new Error("年龄格式错误");
    }
    this.data.age = value;
  },
  get age() {
    return `年龄是: ${this.data.age}`;
  }
};
user.age = 99;
console.log(user.age);
```

下面使用getter设置只读的课程总价

```javascript
let Lesson = {
  lists: [
    { name: "js", price: 100 },
    { name: "mysql", price: 212 },
    { name: "vue.js", price: 98 }
  ],
  get total() {
    return this.lists.reduce((t, b) => t + b.price, 0);
  }
};
console.log(Lesson.total); //410
Lesson.total = 30; //无效
console.log(Lesson.total); //410
```

下面通过设置站网站名称与网址体验`getter/setter`批量设置属性的使用

```javascript
const web = {
  name: "后盾人",
  url: "houdunren.com",
  get site() {
    return `${this.name} ${this.url}`;
  },
  set site(value) {
    [this.name, this.url] = value.split(",");
  }
};
web.site = "后盾人,hdcms.com";
console.log(web.site);
```

下面是设置token储取的示例，将业务逻辑使用`getter/setter`处理更方便，也方便其他业务的复用(本地存储)。

```javascript
let Request = {
  get token() {
    let con = localStorage.getItem('token');
    if (!con) {
    	alert('请登录后获取token')
    } else {
    	return con;
    }
  },
  set token(con) {
  	localStorage.setItem('token', con);
  }
};
// Request.token = 'houdunren'
console.log(Request.token);
```

定义内部私有属性

```javascript
"use strict";
const DATA = Symbol();
const hd = {
  [DATA]: {
    name: "后盾人",
    age: 19,
  },
  set name(value) {
    this[DATA].name = value;
  },
  get name() {
    return this[DATA].name;
  },
};
console.log(hd.name);
console.log(hd[Symbol()].name); //undefined
```

#### 访问器描述符

使用`defineProperty`可以模拟定义私有属性，从而使用面向对象的抽象特性。

```javascript
function User(name, age) {
  let data = { name, age };
  Object.defineProperties(this, {
    name: {
      set(value) {
        if (value == "" || value.length > 20) {
          throw new Error("无效的用户名");
        }
        data.name = value;
      },
      get() {
        return data.name;
      },
    },
    age: {
      set(value) {
        if (value == "" || value.length <= 3) {
          throw new Error("无效的年龄");
        }
        data.age = value;
      },
      get() {
        return data.age;
      },
    },
  });
}
let andy = new User("andy", 30);
andy.name = "houddunren";
console.log(andy.name);
console.log(andy);
```

上面的代码也可以使用语法糖 `class`定义

```javascript
"use strict";
const DATA = Symbol();
class User {
  constructor(name, age) {
    this[DATA] = { name, age };
  }
  set name(value) {
    if (value == "" || value.length > 20) {
      throw new Error("无效的用户名");
    }
    this[DATA].name = value;
  }
  get name() {
    return this[DATA].name;
  }
  set age(value) {
    if (value == "" || value.length <= 3) {
      throw new Error("无效的年龄");
    }
    this[DATA].age = value;
  }
  get age() {
    return this[DATA].age;
  }
}
let hd = new User("向军", 33);
hd.name = "hdcms";
console.log(hd);
```

#### 闭包访问器

下面结合闭包特性对属性进行访问控制

- 下例中访问器定义在函数中，并接收参数v
- 在get() 中通过闭包返回 v
- 在set() 中修改了v，这会影响get()访问的闭包数据v

```javascript
let data = {
  name: 'houdunren.com',
}
for (const [key, value] of Object.entries(data)) {
  observer(data, key, value)
}

function observer(data, key, v) {
  Object.defineProperty(data, key, {
    get() {
      return v
    },
    set(newValue) {
      v = newValue
    },
  })
}
data.name = '后盾人'
console.dir(data.name) //后盾人
```

## 代理拦截

代理（拦截器）是对象的访问控制，`setter/getter` 是对单个对象属性的控制，而代理是对整个对象的控制。

- 读写属性时代码更简洁
- 对象的多个属性控制统一交给代理完成
- 严格模式下 `set` 必须返回布尔值

#### 使用方法

```javascript
"use strict";
const hd = { name: "后盾人" };
const proxy = new Proxy(hd, { //注意后面的大括号是必须要加的
  get(obj, property) {
    return obj[property];
  },
  set(obj, property, value) {
    obj[property] = value;
    return true;
  }
});
proxy.age = 10;
console.log(hd);
```

#### 代理函数

如果代理以函数方式执行时，会执行代理中定义 `apply` 方法。

- 参数说明：函数，上下文对象，参数

```javascript
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1);
}
let proxy = new Proxy(factorial, {
  apply(func, obj, args) {
    console.time("run");
    func.apply(obj, args);
    console.timeEnd("run");
  }
});
proxy.apply(this, [1, 2, 3]);
```

#### 截取字符

下例中对数组进行代理，用于截取标题操作

```javascript
const stringDot = {
  get(target, key) {
    const title = target[key].title;
    const len = 5;
    return title.length > len
      ? title.substr(0, len) + ".".repeat(3)
      : title;
  }
};
const lessons = [
  {
    title: "媒体查询响应式布局",
    category: "css"
  },
  {
    title: "FLEX 弹性盒模型",
    category: "css"
  },
  {
    title: "MYSQL多表查询随意操作",
    category: "mysql"
  }
];
const stringDotProxy = new Proxy(lessons, stringDot);
console.log(stringDotProxy[0]);
```

#### 双向绑定

下面通过代理实现`vue` 等前端框架的数据绑定特性特性。

![Untitled](https://s2.loli.net/2022/12/09/zyvoqeDiprtP8TH.gif)

```javascript
<body>
<input type="text" v-model="title" />
<input type="text" v-model="title" />
<div v-bind="title"></div>
</body>
<script>
function View() {
	//设置代理拦截
  let proxy = new Proxy(
    {},
    {
      get(obj, property) {},
      set(obj, property, value) {
        obj[property] = value;
        document
          .querySelectorAll(
            `[v-model="${property}"],[v-bind="${property}"]`
          )
          .forEach(el => {
            el.innerHTML = value;
            el.value = value;
          });
      }
    }
  );
  //初始化绑定元素事件
  this.run = function() {
    const els = document.querySelectorAll("[v-model]");
    els.forEach(item => {
      item.addEventListener("keyup", function() {
        proxy[this.getAttribute("v-model")] = this.value;
      });
    });
  };
}
let view = new View().run();
```

#### 表单验证

![Untitled](https://s2.loli.net/2022/12/09/GfDRITd2s1H7gtc.gif)

```javascript
<style>
  body {
    padding: 50px;
    background: #34495e;
  }
  input {
    border: solid 10px #ddd;
    height: 30px;
  }
  .error {
    border: solid 10px red;
  }
</style>
<body>
  <input type="text" validate rule="max:12,min:3" />
  <input type="text" validate rule="max:3,isNumber" />
</body>
<script>
  "use strict";
  //验证处理类
  class Validate {
    max(value, len) {
      return value.length <= len;
    }
    min(value, len) {
      return value.length >= len;
    }
    isNumber(value) {
      return /^\d+$/.test(value);
    }
  }

  //代理工厂
  function makeProxy(target) {
    return new Proxy(target, {
      get(target, key) {
        return target[key];
      },
      set(target, key, el) {
        const rule = el.getAttribute("rule");
        const validate = new Validate();
        let state = rule.split(",").every(rule => {
          const info = rule.split(":");
          return validate[info[0]](el.value, info[1]);
        });
        el.classList[state ? "remove":"add"]("error");
        return true;
      }
    });
  }

  const nodes = makeProxy(document.querySelectorAll("[validate]"));
  nodes.forEach((item, i) => {
    item.addEventListener("keyup", function() {
      nodes[i] = this;
    });
  });
</script>
```

## JSON

- json 是一种轻量级的数据交换格式，易于人阅读和编写。
- 使用`json` 数据格式是替换 `xml` 的最佳方式，主流语言都很好的支持`json` 格式。所以 `json` 也是前后台传输数据的主要格式。
- json 标准中要求使用双引号包裹属性，虽然有些语言不强制，但使用双引号可避免多程序间传输发生错误语言错误的发生。

#### 声明定义

**基本结构**

```json
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(hd.teacher.name);
```

**数组结构**

```json
let lessons = [
  {
    "title": '媒体查询响应式布局',
    "category": 'css',
    "click": 199
  },
  {
    "title": 'FLEX 弹性盒模型',
    "category": 'css',
    "click": 12
  },
  {
    "title": 'MYSQL多表查询随意操作',
    "category": 'mysql',
    "click": 89
  }
];

console.log(lessons[0].title);
```

#### 序列化

序列化是将 `json` 转换为字符串，一般用来向其他语言传输使用。

```javascript
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(JSON.stringify(hd)); 
//{"title":"后盾人","url":"houdunren.com","teacher":{"name":"向军大叔"}}
```

根据第二个参数指定保存的属性

```javascript
console.log(JSON.stringify(hd, ['title', 'url']));
//{"title":"后盾人","url":"houdunren.com"}
```

第三个是参数用来控制TAB数量，如果字符串则为前导字符。

```javascript
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(JSON.stringify(hd, null, 4));
```

为数据添加 `toJSON` 方法来自定义返回格式

```javascript
let hd = {
    "title": "后盾人",
    "url": "houdunren.com",
    "teacher": {
        "name": "向军大叔",
    },
    "toJSON": function () {
        return {
            "title": this.url,
            "name": this.teacher.name
        };
    }
}
console.log(JSON.stringify(hd)); //{"title":"houdunren.com","name":"向军大叔"}
```

#### 反序列化

使用 `JSON.parse` 将字符串 `json` 解析成对象

```javascript
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
let jsonStr = JSON.stringify(hd);
console.log(JSON.parse(jsonStr));
```

使用第二个参数函数来对返回的数据二次处理

```javascript
let hd = {
  title: "后盾人",
  url: "houdunren.com",
  teacher: {
    name: "向军大叔"
  }
};
let jsonStr = JSON.stringify(hd);
console.log(
  JSON.parse(jsonStr, (key, value) => {
    if (key == "title") {
      return `[推荐] ${value}`;
    }
    return value;
  })
);
```

## 原型与继承

### 原型基础

> [houdunren.com (opens new window)](https://www.houdunren.com/)@ 向军大叔

####  原型对象

每个对象都有一个原型`prototype`对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针。

- 可以将原型理解为对象的父亲，对象从原型对象继承来属性
- 原型就是对象除了是某个对象的父母外没有什么特别之处
- 所有函数的原型默认是 `Object`的实例，所以可以使用`toString/toValues/isPrototypeOf` 等方法的原因
- 使用原型对象为多个对象共享属性或方法
- 如果对象本身不存在属性或方法将到原型上查找
- 使用原型可以解决，通过构建函数创建对象时复制多个函数造成的内存占用问题
- 原型包含 `constructor` 属性，指向构造函数
- 对象包含 `__proto__` 指向他的原型对象

下例使用的就是数组原型对象的 `concat` 方法完成的连接操作

```javascript
let hd = ["a"];
console.log(hd.concat("b"));
console.log(hd);
```

默认情况下创建的对象都有原型

![image-20191205163626698](https://s2.loli.net/2022/12/09/kl8pqKu7tCzW4jZ.png)

以下x、y的原型都为元对象Object，即`JS`中的根对象

```javascript
let x = {};
let y = {};
console.log(Object.getPrototypeOf(x) == Object.getPrototypeOf(y)); //true
```

我们也可以创建一个极简对象（纯数据字典对象）没有原型（原型为null)

![image-20191205163809670](https://s2.loli.net/2022/12/09/51BdSETiC7jLZar.png)

```javascript
let hd = { name: 3 };
console.log(hd.hasOwnProperty("name"));

let xj = Object.create(null, {
  name: {
    value: "向军"
  }
});
console.log(xj.hasOwnProperty("name")); //Error

//Object.keys是静态方法，不是原型方法所以是可以使用的
console.log(Object.keys(xj));
```

函数拥有多个原型，`prototype` 用于实例对象使用，`__proto__`用于函数对象使用

```javascript
function User() {}
User.__proto__.view = function() {
  console.log("User function view method");
};
User.view();

User.prototype.show = function() {
  console.log("后盾人");
};
let hd = new User();
hd.show();
console.log(User.prototype == hd.__proto__);
```

下面是原型关系分析，与方法继承的示例

![image-20191208003927158](https://s2.loli.net/2022/12/09/iuSZNcmU18wkEf4.png)

```javascript
let hd = new Object();
hd.name = "后盾人";
Object.prototype.show = function() {
  console.log("hodunren.com");
};
hd.show();

function User() {}
let xj = new User();
xj.show();
User.show();
```

下面是使用构造函数创建对象的原型体现

- 构造函数拥有原型
- 创建对象时构造函数把原型赋予对象

![image-20191010023843179](https://s2.loli.net/2022/12/09/YfrX9W7JOwLI8pM.png)

```javascript
function User() {}
let xj = new User();
console.log(xj.__proto__ == User.prototype);
```

下面使用数组会产生多级继承即原型链

![image-20191120174145258](https://s2.loli.net/2022/12/09/TBiVIAXYrlHofLh.png)

```javascript
let hd = [];
console.log(hd);
console.log(hd.__proto__ == Array.prototype);

let str = "";
console.log(str.__proto__ == String.prototype);
```

下面使用 `setPrototypeOf` 与 `getPrototypeOf` 获取与设置原型

```javascript
let hd = {};
let parent = { name: "parent" };
Object.setPrototypeOf(hd, parent);//此时将hd的原型设置为了parent
console.log(hd);
console.log(Object.getPrototypeOf(hd));
```

constructor存在于rototype原型中，用于指向构建函数的引用。

```javascript
function hd() {
  this.show = function() {
    return "show method";
  };
}
const obj = new hd(); //true
console.log(obj instanceof hd);

const obj2 = new obj.constructor();
console.dir(obj2.show()); //show method
```

使用对象的 `constructor` 创建对象

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

function createByObject(obj, ...args) {
  const constructor = Object.getPrototypeOf(obj).constructor;
  return new constructor(...args);
}

let hd = new User("后盾人");
let xj = createByObject(hd, "向军", 12);
console.log(xj);
```

#### 原型链

通过引用类型的原型，继承另一个引用类型的属性与方法，这就是实现继承的步骤。

<img src="https://s2.loli.net/2022/12/09/gb8xi4WPNCL6dws.png" alt="image-20191010012103033" style="zoom:67%;" />

使用`Object.setPrototypeOf` 可设置对象的原型，下面的示例中继承关系为 obj>hd>cms。

`Object.getPrototypeOf` 用于获取一个对象的原型。

```javascript
let obj = {
  name: "后盾人"
};
let hd = {
  web: "houdunren"
};
let cms = {
  soft: "hdcms"
};
//让obj继承hd，即设置obj的原型为hd
Object.setPrototypeOf(obj, hd);
Object.setPrototypeOf(hd, cms);
console.log(obj.web);
console.log(Object.getPrototypeOf(hd) == cms); //true
```

####  原型检测

instanceof 检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

```javascript
function A() {}
function B() {}
function C() {}

const c = new C();
B.prototype = c;
const b = new B();
A.prototype = b;
const a = new A();

console.dir(a instanceof A); //true
console.dir(a instanceof B); //true
console.dir(a instanceof C); //true
console.dir(b instanceof C); //true
console.dir(c instanceof B); //false
```

使用`isPrototypeOf`检测一个对象是否是另一个对象的原型链中

```javascript
const a = {};
const b = {};
const c = {};

Object.setPrototypeOf(a, b);
Object.setPrototypeOf(b, c);

console.log(b.isPrototypeOf(a)); //true
console.log(c.isPrototypeOf(a)); //true
console.log(c.isPrototypeOf(b)); //true
```

####  属性遍历

使用`in` 检测原型链上是否存在属性，使用 `hasOwnProperty` 只检测当前对象

```javascript
let a = { url: "houdunren" };
let b = { name: "后盾人" };
Object.setPrototypeOf(a, b);
console.log("name" in a);
console.log(a.hasOwnProperty("name"));
console.log(a.hasOwnProperty("url"));
```

使用 `for/in` 遍历时同时会遍历原型上的属性如下例

```javascript
let hd = { name: "后盾人" };
let xj = Object.create(hd, {
  url: {
    value: "houdunren.com",
    enumerable: true
  }
});
for (const key in xj) {
  console.log(key);
}
```

`hasOwnProperty` 方法判断对象是否存在属性，而不会查找原型。所以如果只想遍历对象属性使用以下代码

```javascript
let hd = { name: "后盾人" };
let xj = Object.create(hd, {
  url: {
    value: "houdunren.com",
    enumerable: true
  }
});
for (const key in xj) {
  if (xj.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

#### 借用原型

使用 `call` 或 `apply` 可以借用其他原型方法完成功能。

下面的xj对象不能使用`max`方法，但可以借用 hd 对象的原型方法

```javascript
let hd = {
  data: [1, 2, 3, 4, 5]
};
Object.setPrototypeOf(hd, {
  max: function() {
    return this.data.sort((a, b) => b - a)[0];
  }
});
console.log(hd.max());

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 },
  get data() {
    return Object.values(this.lessons);
  }
};
console.log(hd.__proto__.max.apply(xj));
```

上例中如果方法可以传参，那就可以不在 `xj` 对象中定义 `getter` 方法了

```javascript
let hd = {
  data: [1, 2, 3, 4, 5]
};
Object.setPrototypeOf(hd, {
  max: function(data) {
    return data.sort((a, b) => b - a)[0];
  }
});
console.log(hd.max(hd.data));

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 }
};
console.log(hd.__proto__.max.call(xj, Object.values(xj.lessons)));
```

因为 `Math.max` 就是获取最大值的方法，所以代码可以再次优化

```javascript
let hd = {
  data: [1, 2, 3, 4, 5]
};
console.log(Math.max.apply(null, Object.values(hd.data)));

let xj = {
  lessons: { js: 100, php: 78, node: 78, linux: 125 }
};
console.log(Math.max.apply(xj, Object.values(xj.lessons)));
```

下面是获取设置了 `class` 属性的按钮，但DOM节点不能直接使用数组的`filter` 等方法，但借用数组的原型方法就可以操作了

```javascript
<body>
  <button message="后盾人" class="red">后盾人</button>
  <button message="hdcms">hdcms</button>
</body>
<script>
  let btns = document.querySelectorAll("button");
  btns = Array.prototype.filter.call(btns, item => {
    return item.hasAttribute("class");
  });
</script>
```

####  this

`this` 不受原型继承影响，`this` 指向调用属性时使用的对象。

```javascript
let hd = {
  name: "后盾人"
};
let houdunren = {
  name: "向军",
  show() {
    return this.name;
  }
};
hd.__proto__ = houdunren;
console.log(hd.show()); //后盾人
```

### 原型总结

#### prototype

函数也是对象也有原型，函数有 `prototype` 属性指向他的原型

为构造函数设置的原型指，当使用构造函数创建对象时把这个原型赋予给这个对象

```javascript
function User(name) {
  this.name = name;
}
User.prototype = {
  show() {
    return this.name;
  }
};
let xj = new User("向军");
console.log(xj.show());
```

函数默认`prototype` 指包含一个属性 `constructor` 的对象，`constructor` 指向当前构造函数

```javascript
function User(name) {
  this.name = name;
}
let xj = new User("向军");
console.log(xj);
console.log(User.prototype.constructor == User); //true
console.log(xj.__proto__ == User.prototype); //true

let lisi = new xj.constructor("李四");
console.log(lisi.__proto__ == xj.__proto__); //true
```

原型中保存引用类型会造成对象共享属性，所以一般只会在原型中定义方法。

```javascript
function User() {}
User.prototype = {
  lessons: ["JS", "VUE"]
};
const lisi = new User();
const wangwu = new User();

lisi.lessons.push("CSS");

console.log(lisi.lessons); //["JS", "VUE", "CSS"]
console.log(wangwu.lessons); //["JS", "VUE", "CSS"]
```

为Object原型对象添加方法，将影响所有函数(不建议给最顶层添加方法，再引入一些其他库的时候会出现执行问题)

```javascript
<body>
  <button onclick="this.hide()">后盾人</button>
</body>
<script>
  Object.prototype.hide = function() {
    this.style.display = "none";
  };
</script>
```

了解了原型后可以为系统对象添加方法，比如为字符串添加了一截断函数。

- 不能将系统对象的原型直接赋值

```javascript
String.prototype.truncate = function (len = 5) {
	return this.length <= len ? this : this.substr(0, len) + '...';
}
console.log('后盾人每天不断视频教程'.truncate(3)); //后盾人...
```

#### Object.create

使用`Object.create`创建一个新对象时使用现有对象做为新对象的原型对象

![image-20191205153548377](https://s2.loli.net/2022/12/09/1bp5Tqsd3Mt7fzO.png)

使用`Object.create` 设置对象原型

```javascript
let user = {
  show() {
    return this.name;
  }
};

let hd = Object.create(user);
hd.name = "向军";
console.log(hd.show());
```

强以在设置时使用第二个参数设置新对象的属性

```javascript
let user = {
  show() {
    return this.name;
  }
};
let hd = Object.create(user, {
  name: {
    value: "后盾人"
  }
});
console.log(hd);
```

#### __proto__

在实例化对象上存在 __proto__ 记录了原型，所以可以通过对象访问到原型的属性或方法。

- `__proto__` 不是对象属性，理解为`prototype` 的 `getter/setter` 实现，他是一个非标准定义
- `__proto__` 内部使用`getter/setter` 控制值，所以只允许对象或null
- 建议使用 `Object.setPrototypeOf` 与`Object.getProttoeypOf` 替代 `__proto__`

下面修改对象的 `__proto__` 是不会成功的，因为`_proto__` 内部使用`getter/setter` 控制值，所以只允许对象或null

```javascript
let xj = {};
xj.__proto__ = "向军";
console.log(xj);
```

下面定义的`__proto__` 就会成功，因为这是一个极简对象，没有原型对象所以不会影响`__proto__`赋值。

```javascript
let hd = Object.create(null);
hd.__proto__ = "向军";
console.log(hd); //{__proto__: "向军"}
```

构造函数中的 `__proto__` 使用

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function () {
	return `姓名:${this.name}，年龄:${this.age}`;
};
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.__proto__ == User.prototype); //true
```

可以使用 `__proto__` 或 `Object.setPrototypeOf` 设置对象的原型，使用`Object.getProttoeypOf` 获取对象原型

```javascript
function Person() {
  this.getName = function() {
    return this.name;
  };
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
let lisi = new User("李四", 12);
Object.setPrototypeOf(lisi, new Person());
console.log(lisi.getName()); //李四
```

对象设置属性，只是修改对象属性并不会修改原型属性，使用`hasOwnProperty` 判断对象本身是否含有属性并不会检测原型。

```javascript
function User() {}
const lisi = new User();
const wangwu = new User();

lisi.name = "小明";
console.log(lisi.name);
console.log(lisi.hasOwnProperty("name"));

//修改原型属性后
lisi.__proto__.name = "张三";
console.log(wangwu.name);

//删除对象属性后
delete lisi.name;
console.log(lisi.hasOwnProperty("name"));
console.log(lisi.name);
```

使用 `in` 会检测原型与对象，而 `hasOwnProperty` 只检测对象，所以结合后可判断属性是否在原型中

```javascript
function User() {
}
User.prototype.name = "后盾人";
const lisi = new User();
//in会在原型中检测
console.log("name" in lisi);
//hasOwnProperty 检测对象属性
console.log(lisi.hasOwnProperty("name"));
```

#### 使用建议

通过前介绍我们知道可以使用多种方式设置原型，下面是按时间顺序的排列

1. `prototype` 构造函数的原型属性
2. `Object.create` 创建对象时指定原型
3. `__proto__` 声明自定义的非标准属性设置原型，解决之前通过 `Object.create` 定义原型，而没提供获取方法
4. `Object.setPrototypeOf` 设置对象原型

这几种方式都可以管理原型，一般以我个人情况来讲使用 `prototype` 更改构造函数原型，使用 `Object.setPrototypeOf` 与 `Object.getPrototypeOf` 获取或设置原型。

### 继承与多态

#### 继承实现

下面使用`Object.create` 创建对象，做为`Admin、Member`的原型对象来实现继承。

<img src="https://s2.loli.net/2022/12/09/T9An52ohYrNpEta.png" alt="image-20191120214826701" style="zoom:67%;" />

```javascript
function User() {}
User.prototype.getUserName = function() {};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.email = function() {};
console.log(new Admin());
console.log(new Member());
```

不能使用以下方式操作，因为这样会改变User的原型方法，这不是继承，这是改变原型

```javascript
...
function User() {}
User.prototype.getUserName = function() {};

function Admin() {}
Admin.prototype = User.prototype;
Admin.prototype.role = function() {};
...
```

#### 构造函数

有多种方式通过构造函数创建对象

```javascript
function Admin() {}
console.log(Admin == Admin.prototype.constructor); //true

let hd = new Admin.prototype.constructor();
console.log(hd);

let xj = new Admin();
console.log(xj);
```

因为有时根据得到的对象获取构造函数，然后再创建新对象所以需要保证构造函数存在，但如果直接设置了 `Admin.prototype` 属性会造成`constructor`丢失，所以需要再次设置`constructor`值。

```javascript
function User() {}
function Admin() {}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin();
console.log(xj.constructor); //constructor丢失，返回User构造函数

Admin.prototype.constructor = Admin;

let hd = new Admin();
console.log(hd.constructor); //正确返回Admin构造函数

//现在可以通过对象获取构造函数来创建新对象了
//小问题:自己赋值的constructor可以被遍历出来
console.log(new hd.constructor());
```

使用`Object.defineProperty`定义来禁止遍历constructor属性

```javascript
function User() {}
function Admin(name) {
  this.name = name;
}

Admin.prototype = Object.create(User.prototype);

Object.defineProperty(Admin.prototype, "constructor", {
  value: Admin,
  enumerable: false //禁止遍历
});

let hd = new Admin("后盾人");
for (const key in hd) {
  console.log(key);
}
```

完全重写构建函数原型，只对后面应用对象有效

```javascript
function User() {}
const lisi = new User();
User.prototype = {
  show() {
    return "prototype show";
  }
};
const wangwu = new User();
console.log(wangwu.show());

console.log(lisi.show()); // lisi.show is not a function
```

#### 方法重写

下而展示的是子类需要重写父类方法的技巧。

```javascript
function Person() {}
Person.prototype.getName = function() {
  console.log("parent method");
};

function User(name) {}
User.prototype = Object.create(Person.prototype);
User.prototype.constructor = User;

User.prototype.getName = function() {
  //调用父级同名方法
  Person.prototype.getName.call(this);
  console.log("child method");
};
let hd = new User();
hd.getName();
```

#### 多态

根据多种不同的形态产生不同的结果，下而会根据不同形态的对象得到了不同的结果。

```javascript
function User() {}
User.prototype.show = function() {
  console.log(this.description());
};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.description = function() {
  return "管理员在此";
};

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.description = function() {
  return "我是会员";
};

function Enterprise() {}
Enterprise.prototype = Object.create(User.prototype);
Enterprise.prototype.description = function() {
  return "企业帐户";
};

for (const obj of [new Admin(), new Member(), new Enterprise()]) {
  obj.show();
}
```

### 深挖继承

继承是为了复用代码，继承的本质是将原型指向到另一个对象。

#### 构造函数

我们希望调用父类构造函数完成对象的属性初始化，但像下面这样使用是不会成功的。因为此时 `this` 指向了window，无法为当前对象声明属性。

```javascript
function User(name) {
  this.name = name;
  console.log(this);// Window
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User(name);
}
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function() {};

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //undefined
```

解决上面的问题是使用 `call/apply` 为每个生成的对象设置属性

```javascript
function User(name) {
  this.name = name;
  console.log(this); // Admin
}
User.prototype.getUserName = function() {
  return this.name;
};

function Admin(name) {
  User.call(this, name);
}
Admin.prototype = Object.create(User.prototype);

let xj = new Admin("向军大叔");
console.log(xj.getUserName()); //向军大叔
```

#### 原型工厂

原型工厂是将继承的过程封装，使用继承业务简单化。

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}

function Access() {}
function User() {}
function Admin() {}
function Member() {}

extend(User, Access); //User继承Access
extend(Admin, User); //Admin继承User
extend(Member, Access); //Member继承Access

Access.prototype.rules = function() {};
User.prototype.getName = function() {};

console.log(new Admin()); // 继承关系: Admin>User>Access>Object
console.log(new Member()); //继承关系：Member>Access>Object
```

#### 对象工厂

在原型继承基础上，将对象的生成使用函数完成，并在函数内部为对象添加属性或方法。

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};

function Admin(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  instance.role=function(){
    console.log('admin.role');
  }
  return instance;
}
let hd = Admin("后盾人", 19);
hd.show();

function member(name, age) {
  let instance = Object.create(User.prototype);
  User.call(instance, name, age);
  return instance;
}
let lisi = member("李四", 28);
lisi.show();
```

#### Mixin模式

`JS`不能实现多继承，如果要使用多个类的方法时可以使用`mixin`混合模式来完成。

- `mixin` 类是一个包含许多供其它类使用的方法的类
- `mixin` 类不用来继承做为其它类的父类

下面是示例中 `Admin`需要使用 `Request.prototype` 与 `Credit` 的功能，因为`JS` 是单继承，我们不得不将无关的类连接在一下，显然下面的代码实现并不佳

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function Credit() {}
function Request() {}
function User(name, age) {
  this.name = name;
  this.age = age;
}
extend(Request, Credit);
extend(User, Request);
Credit.prototype.total = function() {
  console.log("统计积分");
};
Request.prototype.ajax = function() {
  console.log("请求后台");
};
User.prototype.show = function() {
  console.log(this.name, this.age);
};
function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

下面分拆功能使用Mixin实现多继承，使用代码结构更清晰。只让 `Admin` 继承 `User` 原型

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Credit = {
  total() {
    console.log("统计积分");
  }
};
const Request = {
  ajax() {
    console.log("请求后台");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

`mixin` 类也可以继承其他类，比如下面的 `Create` 类获取积分要请求后台，就需要继承 `Request` 来完成。

- `super` 是在 `mixin` 类的原型中查找，而不是在 `User` 原型中

```javascript
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};
const Request = {
  ajax() {
    return "请求后台";
  }
};
const Credit = {
  __proto__: Request,
  total() {
    console.log(super.ajax() + ",统计积分");
  }
};

function Admin(...args) {
  User.apply(this, args);
}
extend(Admin, User);
Object.assign(Admin.prototype, Request, Credit);
let hd = new Admin("向军", 19);
hd.show();
hd.total(); //统计积分
hd.ajax(); //请求后台
```

#### 实例操作

![Untitled](https://s2.loli.net/2022/12/09/jgJ2QK5MsFyBhWr.gif)

```javascript
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  main {
    width: 400px;
    flex-direction: column;
    position: relative;
    margin-right: 20px;
  }

  main nav {
    display: flex;
    height: 50px;
    align-items: center;
  }

  main nav a {
    background: #95a5a6;
    margin-right: px;
    padding: 10px 20px;
    border: solid 1px #333;
    color: #fff;
    text-decoration: none;
  }

  main nav a:first-of-type {
    background: #e67e22;
  }

  section {
    height: 200px;
    width: 100%;
    background: #f1c40f;
    position: absolute;
    font-size: 5em;
    display: none;
  }

  .hd-tab section:first-of-type {
    display: block;
  }

  section:nth-child(even) {
    background: #27ae60;
  }
</style>

<body>
  <main class="tab1">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
  <main class="tab2">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
</body>

<script>
	//继承工厂
  function extend(sub, sup) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }
  
  //动作类
  function Animation() {}
  Animation.prototype.show = function() {
    this.style.display = "block";
  };
  //隐藏所有元素
  Animation.prototype.hide = function() {
    this.style.display = "none";
  };
  //必变元素集合背景
  Animation.prototype.background = function(color) {
    this.style.background = color;
  };
	
	//选项卡类
  function Tab(tab) {
    this.tab = tab;
    this.links = null;
    this.sections = null;
  }
  extend(Tab, Animation);
  Tab.prototype.run = function() {
    this.links = this.tab.querySelectorAll("a");
    this.sections = this.tab.querySelectorAll("section");
    this.bindEvent();
    this.action(0);
  };
  //绑定事件
  Tab.prototype.bindEvent = function() {
    this.links.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.reset();
        this.action(i);
      });
    });
  };
  //点击后触发动作
  Tab.prototype.action = function(i) {
    this.background.call(this.links[i], "#e67e22");
    this.show.call(this.sections[i]);
  };
  //重置link与section
  Tab.prototype.reset = function() {
    this.links.forEach((el, i) => {
      this.background.call(el, "#95a5a6");
      this.hide.call(this.sections[i]);
    });
  };
  
  new Tab(document.querySelector(".tab1")).run();
  new Tab(document.querySelector(".tab2")).run();
</script>
```

## 类

### 基础知识

为了和其他语言继承形态一致，JS提供了`class` 关键词用于模拟传统的`class` ，但底层实现机制依然是原型继承。

`class` 只是语法糖为了让类的声明与继承更加简洁清晰

#### 声明定义

可以使用类声明和赋值表达式定义类，推荐使用类声明来定义类

```javascript
//类声明
class User {
}
console.log(new User());
```

```javascript
let Article = class {
};
console.log(new Article());
```

类方法间不需要逗号

```javascript
class User {
  show() {}
  get() {
    console.log("get method");
  }
}
const hd = new User();
hd.get();
```

#### 构造函数

使用 `constructor` 构造函数传递参数，下例中`show`为构造函数方法，`getName`为原型方法

- `constructor` 会在 new 时自动执行

```javascript
class User {
  constructor(name) {
    this.name = name;
    this.show = function() {};
  }
  getName() {
    return this.name;
  }
}
const xj = new User("向军大叔");
console.log(xj);
```

构造函数用于传递对象的初始参数，但不是必须定义的，如果不设置系统会设置如下类型

- 子构造器中调用完`super` 后才可以使用 `this`
- 至于 `super` 的概念会在后面讲到

```javascript
constructor(...args) {
  super(...args);
}
```

#### 原理分析

类其实是函数

```javascript
class User {
}
console.log(typeof User); //function
```

`constructor` 用于定义函数代码，下面是与普通函数的对比，结构是一致的

![image-20191211115419286](https://s2.loli.net/2022/12/09/LEJYqI894BiNb6X.png)

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {}
}
console.dir(User);
console.log(User == User.prototype.constructor); //true

//下面是对比的普通函数
function Hd(name) {
  this.name = name;
}
console.dir(Hd);
console.log(Hd == Hd.prototype.constructor); //true
```

在类中定义的方法也保存在函数原型中

![image-20191211120949421](https://s2.loli.net/2022/12/09/rLqIGJwCXWmsUY4.png)

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {}
}
console.dir(User);
console.log(Object.getOwnPropertyNames(User.prototype)); //["constructor", "show"]
```

所以下面定义的类

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}
```

与下面使用函数的定义是一致的

```javascript
function User(name) {
  this.name = name;
}
Hd.prototype.show = function() {
  console.log(this.name);
};
```

#### 属性定义

在 `class` 中定义的属性为每个`new` 出的对象独立创建，下面定义了 `site` 与 `name` 两个对象属性

```javascript
class User {
  site = "后盾人";
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.site + ":" + this.name);
  }
}
let hd = new User("向军");
hd.show();
```

#### 函数差异

`class` 是使用函数声明类的语法糖，但也有些区别

`class` 中定义的方法不能枚举

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}
let xj = new User("向军");
//不会枚举出show属性
for (const key in xj) {
  console.log(key);
}

function Hd(name) {
  this.name = name;
}
Hd.prototype.show = function() {
  console.log(this.name);
};
let obj = new Hd("后盾人");
for (const key in obj) {
  console.log(key);
}
```

#### 严格模式

`class` 默认使用`strict` 严格模式执行

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {
    function test() {
    	//严格模式下输出 undefined
      console.log(this);
    }
    test();
  }
}
let xj = new User("向军");
xj.show();

function Hd(name) {
  this.name = name;
}
Hd.prototype.show = function() {
  function test() {
  	//非严格模式输出 Window
    console.log(this);
  }
  test();
};
let obj = new Hd("后盾人");
obj.show();
```

### 静态访问

#### 静态属性

静态属性即为类设置属性，而不是为生成的对象设置，下面是原理实现

```javascript
function User() {}
User.site = "后盾人";
console.dir(User);

const hd = new User();
console.log(hd.site); //undefiend
console.log(User.site); //后盾人 
```

在 `class` 中为属性添加 `static` 关键字即声明为静态属性

- 可以把为所有对象使用的值定义为静态属性

```javascript
class Request {
  static HOST = "https://www.houdunren.com";
  
  query(api) {
    return Request.HOST + "/" + api;
  }
}
let request = new Request();
```

#### 静态方法

指通过类访问不能使用对象访问的方法，比如系统的`Math.round()`就是静态方法

- 一般来讲方法不需要对象属性参与计算就可以定义为静态方法

下面是静态方法实现原理

```javascript
function User() {
  this.show = function() {
    return "this is a object function";
  };
}
User.show = function() {
  return "welcome to houdunren";
};
const xj = new User();
console.dir(xj.show()); //this is a object function
console.dir(User.show()); //welcome to houdunren
```

在 `class` 内声明的方法前使用 `static` 定义的方法即是静态方法

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  static create(name) {
    return new User(name);
  }
}
const xj = User.create("向军大叔");
console.log(xj);
```

下面使用静态方法在课程类中的使用

```javascript
const data = [
  { name: "js", price: 100 },
  { name: "mysql", price: 212 },
  { name: "vue.js", price: 98 }
];
class Lesson {
  constructor(data) {
    this.model = data;
  }
  get price() {
    return this.model.price;
  }
  get name() {
    return this.model.name;
  }
  //批量生成对象
  static createBatch(data) {
    return data.map(item => new Lesson(item));
  }
  //最贵的课程
  static MaxPrice(collection) {
    return collection.sort((a, b) => b.price() - a.price())[0];
  }
}
const lessons = Lesson.createBatch(data);
console.log(lessons);
console.log(Lesson.MaxPrice(lessons).name);
```

### 访问器

使用访问器可以对对象的属性进行访问控制，下面是使用访问器对私有属性进行管理。

#### 语法介绍

- 使用访问器可以管控属性，有效的防止属性随意修改
- 访问器就是在函数前加上 `get/set`修饰，操作属性时不需要加函数的扩号，直接用函数名

```javascript
class User {
  constructor(name) {
    this.data = { name };
  }
  get name() {
    return this.data.name;
  }
  set name(value) {
    if (value.trim() == "") throw new Error("invalid params");
    this.data.name = value;
  }
}
let hd = new User("向军大叔");
hd.name = "后盾人";
console.log(hd.name);
```

### 访问控制

设置对象的私有属性有多种方式，包括后面章节介绍的模块封装。

#### public

`public` 指不受保护的属性，在类的内部与外部都可以访问到

```javascript
class User {
  url = "houdunren.com";
  constructor(name) {
    this.name = name;
  }
}
let hd = new User("后盾人");
console.log(hd.name, hd.url);
```

#### protected

protected是受保护的属性修释，不允许外部直接操作，但可以继承后在类内部访问，有以下几种方式定义

##### 命名保护

将属性定义为以 `_` 开始，来告诉使用者这是一个私有属性，请不要在外部使用。

- 外部修改私有属性时可以使用访问器 `setter` 操作
- 但这只是提示，就像吸烟时烟盒上的吸烟有害健康，但还是可以抽的

```javascript
class Article {
  _host = "https://houdunren.com";

  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    this._host = url;
  }
  
  lists() {
    return `${this._host}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article
```

继承时是可以使用的

```javascript
class Common {
  _host = "https://houdunren.com";
  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    this._host = url;
  }
}
class Article extends Common {
  lists() {
    return `${this._host}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article
```

##### Symbol

下面使用 `Symbol`定义私有访问属性，即在外部通过查看对象结构无法获取的属性

```javascript
const protecteds = Symbol();
class Common {
  constructor() {
    this[protecteds] = {};
    this[protecteds].host = "https://houdunren.com";
  }
  set host(url) {
    if (!/^https?:/i.test(url)) {
      throw new Error("非常网址");
    }
    this[protecteds].host = url;
  }
  get host() {
    return this[protecteds].host;
  }
}
class User extends Common {
  constructor(name) {
    super();
    this[protecteds].name = name;
  }
  get name() {
    return this[protecteds].name;
  }
}
let hd = new User("后盾人");
hd.host = "https://www.hdcms.com";
// console.log(hd[Symbol()]);
console.log(hd.name);
```

##### WeakMap

**WeakMap** 是一组键/值对的集，下面利用`WeakMap`类型特性定义私有属性

```javascript
const _host = new WeakMap();
class Common {
  constructor() {
    _host.set(this, "https://houdunren.com");
  }
  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    _host.set(this, url);
  }
}
class Article extends Common {
  constructor() {
    super();
  }
  lists() {
    return `${_host.get(this)}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article
```

也可以统一定义私有属性

```javascript
const protecteds = new WeakMap();
class Common {
  constructor() {
    protecteds.set(this, {
      host: "https://houdunren.com",
      port: "80"
    });
  }
  set host(url) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error("网址错误");
    }
    protecteds.set(this, { ...protecteds.get(this), host: url });
  }
}
class Article extends Common {
  constructor() {
    super();
  }
  lists() {
    return `${protecteds.get(this).host}/article`;
  }
}
let article = new Article();
console.log(article.lists()); //https://houdunren.com/article
article.host = "https://hdcms.com";
console.log(article.lists()); //https://hdcms.com/article
```

#### private

`private` 指私有属性，只在当前类可以访问到，并且不允许继承使用

- 为属性或方法名前加 `#` 为声明为私有属性
- 私有属性只能在声明的类中使用

下面声明私有属性 `#host` 与私有方法 `check` 用于检测用户名

```javascript
class User {
  //private
  #host = "https://houdunren.com";
  constructor(name) {
    this.name = name ;
    this.#check(name);
  }
  set host(url) {
    if (!/^https?:/i.test(url)) {
      throw new Error("非常网址");
    }
    this.#host = url;
  }
  get host() {
    return this.#host;
  }
  #check = () => {
    if (this.name.length <= 5) {
      throw new Error("用户名长度不能小于五位");
    }
    return true;
  };
}
let hd = new User("后盾人在线教程");
hd.host = "https://www.hdcms.com";
console.log(hd.host);
```

#### 属性保护

保护属性并使用访问器控制

```javascript
const protecteds = Symbol("protected");
class User {
  constructor(name) {
    this[protecteds] = { name };
  }
  get name() {
    return this[protecteds].name;
  }
  set name(value) {
    if (value.trim() == "") throw new Error("invalid params");
    this[protecteds].name = value;
  }
}
let hd = new User("向军大叔");
hd.name = "后盾人";
console.log(hd.name);
console.log(Object.keys(hd));
```

### 详解继承

#### 属性继承

属性继承的原型如下

```javascript
function User(name) {
  this.name = name;
}
function Admin(name) {
  User.call(this, name); 
}
let hd = new Admin("后盾人");
console.log(hd);
```

这就解释了为什么在子类构造函数中要先执行`super`

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
  }
}
let hd = new Admin("后盾人");
console.log(hd);
```

#### 继承原理

`class` 继承内部使用原型继承

<img src="https://s2.loli.net/2022/12/09/sELQlyfACWhDSH7.png" alt="image-20191211135724814" style="zoom:67%;" />

```javascript
class User {
  show() {
    console.log("user.show");
  }
}
class Admin extends User {
  info() {
    this.show();
  }
}
let hd = new Admin();
console.dir(hd);
```

#### 方法继承

原生的继承主要是操作原型链，实现起来比较麻烦，使用 `class` 就要简单的多了。

- 继承时必须在子类构造函数中调用 super() 执行父类构造函数
- super.show() 执行父类方法

下面是子类继承了父类的方法`show`

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  show() {
    return `后盾人会员: ${this.name}`;
  }
}
class User extends Person {
  constructor(name) {
    super(name);
  }
  run() {
    return super.show();
  }
}
const xj = new User("向军");
console.dir(xj.run());
```

可以使用 `extends` 继承表达式返回的类

```javascript
function controller() {
  return class {
    show() {
      console.log("user.show");
    }
  };
}
class Admin extends controller() {
  info() {
    this.show();
  }
}
let hd = new Admin();
console.dir(hd);
```

#### super

表示从当前原型中执行方法，

- super 一直指向当前对象

下面是使用 `this` 模拟`super`，会有以下问题

- 但`this`指向当前对象，结果并不是 `admin`的`name`值

```javascript
let user = {
  name: "user",
  show() {
    return this.name;
  }
};
let admin = {
  __proto__: user,
  name: "admin",
  show() {
    return this.__proto__.show();
  }
};
console.log(admin.show());
```

为了解决以上问题，需要调用父类方法时传递`this`

```javascript
let user = {
  name: "user",
  show() {
    return this.name;
  }
};
let admin = {
  __proto__: user,
  name: "admin",
  show() {
    return this.__proto__.show.call(this);
  }
};
console.log(admin.show());
```

上面看似结果正常，但如果是多层继承时，会出现新的问题

- 因为始终传递的是当前对象`this` ，造成从 `this` 原型循环调用

```javascript
let common = {
  show() {
    console.log("common.init");
  }
};
let user = {
  __proto__: common,
  name: "user",
  show() {
    return this.__proto__.show.call(this);
  }
};
let admin = {
  __proto__: user,
  name: "admin",
  get() {
    return this.__proto__.show.call(this);
  }
};
console.log(admin.get());
```

为了解决以上问题 `js` 提供了 `super` 关键字

- 使用 `super` 调用时，在所有继承中 `this` 始终为调用对象
- `super` 是用来查找当前对象的原型，而不像上面使用 `this` 查找原型造成死循环
- 也就是说把查询原型方法的事情交给了 `super`，`this` 只是单纯的调用对象在各个继承中使用

```javascript
let common = {
  show() {
    return this.name;
  }
};
let user = {
  __proto__: common,
  name: "user",
  show() {
    return super.show(this);
  }
};
let admin = {
  __proto__: user,
  name: "admin",
  get() {
    return super.show();
  }
};
console.log(admin.get());
```

`super` 只能在类或对象的方法中使用，而不能在函数中使用，下面将产生错误

```javascript
let user = {
  name: "user",
  show() {
    return this.name;
  }
};
let admin = {
  __proto__: user,
  name: "admin",
  get: function() {
    return super.show();
  }
};
console.log(admin.get()); //Uncaught SyntaxError: 'super' keyword unexpected here
```

#### constructor

```javascript
super` 指调父类引用，在构造函数`constructor` 中必须先调用`super()
```

- `super()` 指调用父类的构造函数
- 必须在 `constructor` 函数里的`this` 调用前执行 `super()`

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
  }
}
let hd = new Admin("后盾人");
hd.show();
```

`constructor` 中先调用 `super` 方法的原理如下

```javascript
function Parent(name) {
  this.name = name;
}
function User(...args) {
  Parent.apply(this, args);
}
User.prototype = Object.create(User.prototype)
User.prototype.constructor = User;
const hd = new User("后盾人");
console.log(hd.name);
```

#### 父类方法

使用`super` 可以执行父类方法

- 不添加方法名是执调用父类构造函数

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
  }
}
const hd = new Admin("后盾人");
console.log(hd.getName());
```

下面是通过父类方法获取课程总价

```javascript
class Controller {
  sum() {
    return this.data.reduce((t, c) => t + c.price, 0);
  }
} 
class Lesson extends Controller {
  constructor(lessons) {
    super();
    this.data = lessons;
  }
  info() {
    return {
      totalPrice: super.sum(),
      data: this.data
    };
  }
}
let data = [
  { name: "js", price: 100 },
  { name: "mysql", price: 212 },
  { name: "vue.js", price: 98 }
];
const hd = new Lesson(data);
console.log(hd.info());
```

#### 方法覆盖

子类存在父类同名方法时使用子类方法

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  say() {
    return this.name;
  }
}
class Admin extends User {
  constructor(name) {
    super(name);
  }
  say() {
    return "后盾人：" + super.say();
  }
}
const xj = new Admin("向军");
console.log(xj.say());//后盾人
```

下面是覆盖父类方法，只获取课程名称

```javascript
class Controller {
  say() {
    return this.name;
  }
  total() {
    return this.data.reduce((t, c) => t + c.price, 0);
  }
  getByKey(key) {
    return this.data.filter(item => item.name.includes(key));
  }
}
class Lesson extends Controller {
  constructor(lessons) {
    super();
    this.data = lessons;
  }
  getByKey(key) {
    return super.getByKey(key).map(item => item.name);
  }
}
let data = [
  { name: "js", price: 100 },
  { name: "mysql", price: 212 },
  { name: "vue.js", price: 98 }
];
const hd = new Lesson(data);
console.log(hd.getByKey("js"));
```

#### 静态继承

静态的属性和方法也是可以被继承使用的，下面是原理分析

```javascript
function User() {}
User.site = "后盾人";
User.url = function() {
  return "houdunren.com";
};
function Admin() {}
Admin.__proto__ = User;
console.dir(Admin);
console.log(Admin.url());
```

下面使用 `class` 来演示静态继承

```javascript
class User {
  static site = "后盾人";
  static host() {
    return "houdunren.com";
  }
}
class Admin extends User {}
console.dir(Admin);
```

#### 对象检测

#### **instanceof**

使用 `instanceof` 用于检测，下面是在原型中的分析（已经在原型与继承中讲过）

```javascript
function User() {}
function Admin() {}
Admin.prototype = Object.create(User.prototype);
let hd = new Admin();
console.log(hd instanceof Admin); //true
console.log(hd instanceof User); //true

console.log(hd.__proto__ == Admin.prototype);
console.log(hd.__proto__.__proto__ == User.prototype);
```

下面是递归检测原型的代码，帮助你分析 `instanceof` 的原理

```javascript
function checkPrototype(obj, constructor) {
  if (!obj.__proto__) return false;
  if (obj.__proto__ == constructor.prototype) return true;
  return checkPrototype(obj.__proto__, constructor);
}
```

`class` 内部实现就是基于原型，所以使用`instanceof` 判断和上面原型是一样的

```javascript
class User {}
class Admin extends User {}
let hd = new Admin();
console.log(hd instanceof Admin);
console.log(hd instanceof User);
```

#### isPrototypeOf

使用 `isPrototypeOf` 判断一个对象是否在另一个对象的原型链中，下面是原理分析

```javascript
const a = {};
const b = {
  __proto__: a
};
const c = {
  __proto__: b
};
console.log(a.isPrototypeOf(b)); //true
console.log(a.isPrototypeOf(c)); //true
```

下面在使用 `class` 语法中使用

```javascript
class User {}
class Admin extends User {}
let hd = new Admin();
console.log(Admin.prototype.isPrototypeOf(hd));
console.log(User.prototype.isPrototypeOf(hd));
```

#### 继承内置类

使用原型扩展内置类

```javascript
function Arr(...args) {
  args.forEach(item => this.push(item));
  this.first = function() {
    return this[0];
  };
  this.max = function() {
    return this.sort((a, b) => b - a)[0];
  };
}
let a = [1, 23];
Arr.prototype = Object.create(Array.prototype);
let arr = new Arr("后盾人", 2, 3);
console.log(arr.first());
```

使用 `class`扩展内置类

```javascript
class NewArr extends Array {
  constructor(...args) {
    super(...args);
  }
  first() {
    return this[0];
  }
  add(value) {
    this.push(value);
  }
  remove(value) {
    let pos = this.findIndex(curValue => {
      return curValue == value;
    });
    this.splice(pos, 1);
  }
}
let hd = new NewArr(5, 3, 2, 1);
console.log(hd.length); //4
console.log(hd.first()); //5

hd.add("houdunren");
console.log(hd.join(",")); //5,3,2,1,houdunren

hd.remove("3");
console.log(hd.join(",")); //5,2,1,houdunren
```

#### mixin

关于`mixin` 的使用在原型章节已经讨论过，在`class` 使用也是相同的原理

`JS`不能实现多继承，如果要使用多个类的方法时可以使用`mixin`混合模式来完成。

- `mixin` 类是一个包含许多供其它类使用的方法的类
- `mixin` 类不用来继承做为其它类的父类

```javascript
const Tool = {
  max(key) {
    return this.data.sort((a, b) => b[key] - a[key])[0];
  }
};

class Lesson {
  constructor(lessons) {
    this.lessons = lessons;
  }
  get data() {
    return this.lessons;
  }
}

Object.assign(Lesson.prototype, Tool);
const data = [
  { name: "js", price: 100 },
  { name: "mysql", price: 212 },
  { name: "vue.js", price: 98 }
];
let hd = new Lesson(data);
console.log(hd.max("price"));
```

#### 实例操作![Untitled](https://s2.loli.net/2022/12/09/HbRxIhAfndN45qs.gif)

```javascript
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
  }
  body {
    padding: 30px;
  }
  .slide {
    width: 300px;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); */
  }
  .slide dt {
    height: 30px;
    background: #34495e;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
  }
  .slide dt:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .slide dd {
    height: 100px;
    background: #f1c40f;
    overflow: hidden;
  }
  .slide dd div {
    padding: 10px;
  }
  .slide dd:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
<body>
  <div class="slide s1">
    <dt>后盾人</dt>
    <dd>
      <div>houdunren.com</div>
    </dd>
    <dt>后盾人</dt>
    <dd>
      <div>hdcms.com</div>
    </dd>
    <dt>后盾人</dt>
    <dd>
      <div>hdcms.com</div>
    </dd>
  </div>
</body>

<script>
  class Animation {
    constructor(el) {
      this.el = el;
      this.timeout = 5;
      this.isShow = true;
      this.defaultHeight = this.height;
    }
    hide(callback) {
      this.isShow = false;
      let id = setInterval(() => {
        if (this.height <= 0) {
          clearInterval(id);
          callback && callback();
          return;
        }
        this.height = this.height - 1;
      }, this.timeout);
    }
    show(callback) {
      this.isShow = false;
      let id = setInterval(() => {
        if (this.height >= this.defaultHeight) {
          clearInterval(id);
          callback && callback();
          return;
        }
        this.height = this.height + 1;
      }, this.timeout);
    }
    get height() {
      return window.getComputedStyle(this.el).height.slice(0, -2) * 1;
    }
    set height(height) {
      this.el.style.height = height + "px";
    }
  }
  class Slide {
    constructor(el) {
      this.el = document.querySelector(el);
      this.links = this.el.querySelectorAll("dt");
      this.panels = [...this.el.querySelectorAll("dd")].map(
        item => new Panel(item)
      );
      this.bind();
    }
    bind() {
      this.links.forEach((item, i) => {
        item.addEventListener("click", () => {
          this.action(i);
        });
      });
    }
    action(i) {
      Panel.hideAll(Panel.filter(this.panels, i), () => {
        this.panels[i].show();
      });
    }
  }
  class Panel extends Animation {
    static num = 0;
    static hideAll(items, callback) {
      if (Panel.num > 0) return;
      items.forEach(item => {
        Panel.num++;
        item.hide(() => {
          Panel.num--;
        });
      });
      callback && callback();
    }
    static filter(items, i) {
      return items.filter((item, index) => index != i);
    }
  }
  let hd = new Slide(".s1");
</script>
```

## 模块设计

### 模块设计

#### 使用分析

项目变大时需要把不同的业务分割成多个文件，这就是模块的思想。模块是比对象与函数更大的单元，使用模块组织程序便于维护与扩展。

生产环境中一般使用打包工具如 `webpack` 构建，他提供更多的功能。但学习完本章节后会再学习打包工具会变得简单。

- 模块就是一个独立的文件，里面是函数或者类库
- 虽然JS没有命名空间的概念，使用模块可以解决全局变量冲突
- 模块需要隐藏内部实现，只对外开发接口
- 模块可以避免滥用全局变量，造成代码不可控
- 模块可以被不同的应用使用，提高编码效率

#### 实现原理

在过去JS不支持模块时我们使用`AMD/CMD（浏览器端使用）`、`CommonJS（Node.js使用）`、`UMD(两者都支持)`等形式定义模块。

AMD代表性的是 `require.js`，CMD 代表是淘宝的 `seaJS` 框架。

下面通过定义一个类似 `require.js` 的 `AMD` 模块管理引擎，来体验模块的工作原理。

```javascript
let module = (function() {
  //模块列表集合
  const moduleLists = {};
  function define(name, modules, action) {
    modules.map((m, i) => {
      modules[i] = moduleLists[m];
    });
    //执行并保存模块
    moduleLists[name] = action.apply(null, modules);
  }

  return { define };
})();

//声明模块不依赖其它模块
module.define("hd", [], function() {
  return {
    show() {
      console.log("hd module show");
    }
  };
});

//声明模块时依赖其它模块
module.define("xj", ["hd"], function(hd) {
  hd.show();
});
```

### 基础知识

#### 标签使用

在浏览器中使用以下语法靠之脚本做为模块使用，这样就可以在里面使用模块的代码了。

在html文件中导入模块，需要定义属性 `type="module"`

```javascript
<script type="module"></script>
```

#### 模块路径

在浏览器中引用模块必须添加路径如`./` ，但在打包工具如`webpack`中则不需要，因为他们有自己的存放方式。

测试的 `hd.js` 的模块内容如下

```javascript
export let hd = {
  name: "后盾人"
};
```

下面没有指定路径将发生错误

```javascript
<script type="module">
  import { hd } from "hd.js";
</script>
```

正确使用需要添加上路径

```javascript
<script type="module">
  import { hd } from "./hd.js";
</script>
```

#### 延迟解析

模块总是会在所有html解析后才执行，下面的模块代码可以看到后加载的 `button` 按钮元素。

- 建议为用户提供加载动画提示，当模块运行时再去掉动画

```javascript
<body>
  <script type="module">
    console.log(document.querySelector("button")); //Button
  </script>
  <script>
    console.log(document.querySelector("button")); //undefined
  </script>
  <button>后盾人</button>
</body>
```

#### 严格模式

模块默认运行在严格模式，以下代码没有使用声明语句将报错

```javascript
<script type="module">
	hd = "houdunren"; // Error
</script>
```

下面的 `this` 也会是 `undefined`

```javascript
<script>
  console.log(this); //Window
</script>
<script type="module">
  console.log(this); //undefiend
</script>
```

#### 作用域

模块都有独立的顶级作用域，下面的模块不能互相访问

```javascript
<script type="module">
  let hd = "houdunren.com";
</script>

<script type="module">
  alert(hd); // Error
</script>
```

单独文件作用域也是独立的，下面的模块 `1.2.js` 不能访问模块 `1.1.js` 中的数据

```javascript
<script type="module" src="1.1.js"></script>
<script type="module" src="1.2.js"></script>

文件内容如下
# 1.1.js
let hd = "houdunren";

# 1.2.js
console.log(hd)
```

#### 预解析

模块在导入时只执行一次解析，之后的导入不会再执行模块代码，而使用第一次解析结果，并共享数据。

- 可以在首次导入时完成一些初始化工作
- 如果模块内有后台请求，也只执行一次即可

引入多入`hd.js` 脚本时只执行一次

```javascript
<script type="module" src="hd.js"></script>
<script type="module" src="hd.js"></script>

#hd.js内容如下
console.log("houdunren.com");
```

下面在导入多次 `hd.js` 时只解析一次

```javascript
<script type="module">
  import "./hd.js";
  import "./hd.js";
</script>

# hd.js内容如下
console.log("houdunren.com");
```

### 导入导出

ES6使用基于文件的模块，即一个文件一个模块。

- 使用`export` 将开发的接口导出
- 使用`import` 导入模块接口
- 使用`*`可以导入全部模块接口
- 导出是以引用方式导出，无论是标量还是对象，即模块内部变量发生变化将影响已经导入的变量

#### 导出模块

下面定义模块 `modules/houdunren.js` ，使用 `export` 导出模块接口，没有导出的变量都是模块私有的。

下面是对定义的 `hd.js` 模块，分别导出内容

```javascript
export const site = "后盾人";
export const func = function() {
  return "is a module function";
};
export class User {
  show() {
    console.log("user.show");
  }
}
```

下面定义了`hd.js` 模块，并使用指量导出

```javascript
const site = "后盾人";
const func = function() {
  return "is a module function";
};
class User {
  show() {
    console.log("user.show");
  }
}
export { site, func, User };
```

#### 具名导入

下面导入上面定义的 `hd.js` 模块，分别导入模块导出的内容

```javascript
<script type="module">
  import { User, site, func } from "./hd.js";
  console.log(site);
  console.log(User);
</script>
```

像下面这样在 `{}` 中导入是错误的，模块默认是在顶层静态导入，这是为了分析使用的模块方便打包

```javascript
if (true) {
  import { site, func } from "./hd.js"; // Error
}
```

#### 批量导入

如果要导入的内容比较多，可以使用 `*` 来批量导入。

```javascript
<script type="module">
  import * as api from "./hd.js";
  console.log(api.site);
  console.log(api.User);
</script>
```

#### 导入建议

因为以下几点，我们更建议使用明确导入方式

- 使用`webpack` 构建工具时，没有导入的功能会删除节省文件大小
- 可以更清晰知道都使用了其他模块的哪些功能

### 别名使用

#### 导入别名

可以为导入的模块重新命名，下面是为了测试定义的 `hd.js` 模块内容。

- 有些导出的模块命名过长，起别名可以理简洁
- 本模块与导入模块重名时，可以通过起别名防止错误

```javascript
const site = "后盾人";
const func = function() {
  return "is a module function";
};
class User {
  show() {
    console.log("user.show");
  }
}
export { site, func, User };
```

模块导入使用 `as` 对接口重命名，本模块中已经存在 `func` 变量，需要对导入的模块重命名防止重名错误。

```javascript
<script type="module">
  import { User as user, func as action, site as name } from "./hd.js";
  let func = "houdunren";
  console.log(name);
  console.log(user);
  console.log(action);
</script>
```

#### 导出别名

模块可以对导出给外部的功能起别名，下面是`hd.js` 模块对导出给外部的模块功能起了别名

```javascript
const site = "后盾人";
const func = function() {
  console.log("is a module function");
};
class User {
  show() {
    console.log("user.show");
  }
}
export { site, func as action, User as user };
```

这时就要使用新的别名导入了

```javascript
<script type="module">
  import { user, action } from "./hd.js";
  action();
</script>
```

### 默认导出

很多时候模块只是一个类，也就是说只需要导入一个内容，这地可以使用默认导入。

使用`default` 定义默认导出的接口，导入时不需要使用 `{}`

- 可以为默认导出自定义别名
- 只能有一个默认导出
- 默认导出可以没有命名

#### 单一导出

下面是`hd.js` 模块内容，默认只导出一个类。并且没有对类命名，这是可以的

```javascript
export default class {
  static show() {
    console.log("User.method");
  }
}
```

从程序来讲如果将一个导出命名为 `default` 也算默认导出

```javascript
class User {
  static show() {
    console.log("User.method");
  }
}
export { User as default };
```

导入时就不需要使用 `{}` 来导入了

```javascript
<script type="module">
  import User from "./hd.js";
  User.show();
</script>
```

默认导出的功能可以使用任意变量接收

```javascript
<script type="module">
  import hd from "./hd.js";
  hd.show();
</script>
```

#### 混合导出

模块可以存在默认导出与命名导出。

使用`export default` 导出默认接口，使用 `export {}` 导入普通接口

```javascript
const site = "后盾人";
const func = function() {
  console.log("is a module function");
};
export default class {
  static show() {
    console.log("user.show");
  }
}
export { site, func };
```

也可以使用以下方式导出模块

```javascript
const site = "后盾人";
const func = function() {
  console.log("is a module function");
};
class User {
  static show() {
    console.log("user.show");
  }
}
export { site, func, User as default };
```

导入默认接口时不需要使用 `{}` ，普通接口还用 `{}` 导入

```javascript
<script type="module">
	//可以将 hd 替换为任何变量
  import hd from "./hd.js";
  import { site } from "./hd.js";
  console.log(site);
  hd.show();
</script>
```

可以使用一条语句导入默认接口与常规接口

```javascript
import show, { name } from "/modules/houdunren.js";
```

也可以使用别名导入默认导出

```javascript
import { site, default as hd } from "./hd.js";
console.log(site);
hd.show();
```

如果是批量导入时，使用 `default` 获得默认导出

```javascript
<script type="module">
  import * as api from "./hd.js";
  console.log(api.site);
  api.default.show();
</script>
```

#### 使用建议

对于默认导出和命名导出有以下建议

- 不建议使用默认导出，会让开发者导入时随意命名

  ```javascript
  import hd from "./hd.js";
  import xj from "./hd.js";
  ```

- 如果使用默认导入最好以模块的文件名有关联，会使用代码更易阅读

  ```javascript
  import hd from "./hd.js";
  ```

### 导出合并

#### 解决问题

可以将导入的模块重新导出使用，比如项目模块比较多如下所示，这时可以将所有模块合并到一个入口文件中。

这样只需要使用一个模块入口文件，而不用关注多个模块文件

#### 实际使用

下面是 `hd.js` 模块内容

```javascript
const site = "后盾人";
const func = function() {
  console.log("is a module function");
};
export { site, func };
```

下面是 `houdunren.js` 模块内容

```javascript
export default class {
  static get() {
    console.log("houdunren.js.get");
  }
}
```

下面是 `index.js` 模块内容，使用 `*` 会将默认模块以 `default` 导出

```javascript
export * as hd from "./hd.js";
// 默认模块需要单独导出
export { default as houdunren } from "./houdunren.js";
// 以下方式导出默认模块是错误的
// export houdunren from "./houdunren.js";
```

使用方法如下

```javascript
<script type="module">
  import * as api from "./index.js";
  console.log(api);
  api.houdunren.get();
  console.log(api.hd.site);
</script>
```

### 动态加载

使用 `import` 必须在顶层静态导入模块，而使用`import()` 函数可以动态导入模块，它返回一个 `promise` 对象

#### 静态导入

使用 `import` 顶层静态导入，像下面这样在 `{}` 中导入是错误的，这是为了分析使用的模块方便打包，所以系统禁止这种行为

```javascript
if (true) {
  import { site, func } from "./hd.js"; // Error
}
```

#### 动态使用

测试用的 `hd.js` 模块内容如下

```javascript
const site = "后盾人";
const func = function() {
  console.log("is a module function");
};
export { site, func };
```

使用 `import()` 函数可以动态导入，实现按需加载

```javascript
<script>
  if (true) {
    let hd = import("./hd.js").then(module => {
      console.log(module.site);
    });
  }
</script>
```

下面是在点击事件发生后按需要加载模块,因为是返回的对象可以使用解构语法

```javascript
<button>后盾人</button>
<script>
  document.querySelector("button").addEventListener("click", () => {
    let hd = import("./hd.js").then(({ site, func }) => {
      console.log(site);
    });
  });
</script>
```

### 指令总结

| 表达式                                           | 说明             |
| ------------------------------------------------ | ---------------- |
| export function show(){}                         | 导出函数         |
| export const name='后盾人'                       | 导出变量         |
| export class User{}                              | 导出类           |
| export default show                              | 默认导出         |
| const name = '后盾人' export {name}              | 导出已经存在变量 |
| export {name as hd_name}                         | 别名导出         |
| import defaultVar from 'houdunren.js'            | 导入默认导出     |
| import {name,show} from 'a.j'                    | 导入命名导出     |
| Import {name as hdName,show} from 'houdunren.js' | 别名导入         |
| Import * as api from 'houdunren.js'              | 导入全部接口     |

### 编译打包

编译指将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

首先登录 `https://nodejs.org/en/` 官网下载安装`Node.js`，我们将使用其他的npm命令，npm用来安装第三方类库。

在命令行输入 `node -v` 显示版本信息表示安装成功。

#### 安装配置

使用以下命令生成配置文件 `package.json`

```javascript
npm init -y
```

修改`package.json`添加打包命令

```javascript
...
"main": "index.js",
"scripts": {
	"dev": "webpack --mode development --watch"
},
...
```

安装webpack工具包，如果安装慢可以使用淘宝 [cnpm (opens new window)](https://npm.taobao.org/)命令

```javascript
npm i webpack webpack-cli --save-dev
```

#### 目录结构

```javascript
index.html
--dist #压缩打包后的文件
--src
----index.js  #入口
----style.js //模块
```

index.html内容如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script src="dist/main.js"></script>
  </body>
</html>
```

index.js内容如下

```javascript
import style from "./style";
new style().init();
```

style.js

```javascript
export default class User {
  constructor() {}
  init() {
    document.body.style.backgroundColor = "green";
  }
}
```

#### 执行打包

运行以下命令将生成打包文件到 `dist`目录，因为在命令中添加了 `--watch`参数，所以源文件编辑后自动生成打包文件。

```text
npm run dev
```

## 正则表达式

### 基础知识

正则表达式是用于匹配字符串中字符组合的模式，在 JavaScript中，正则表达式也是对象。

- 正则表达式是在宿主环境下运行的，如`js/php/node.js` 等
- 本章讲解的知识在其他语言中知识也是可用的，会有些函数使用上的区别

#### 对比分析

与普通函数操作字符串来比较，正则表达式可以写出更简洁、功能强大的代码。

下面使用获取字符串中的所有数字来比较函数与正则的差异。

```javascript
let hd = "houdunren2200hdcms9988";
let nums = [...hd].filter(a => !Number.isNaN(parseInt(a)));
console.log(nums.join(""));
```

使用正则表达式将简单得多

```javascript
let hd = "houdunren2200hdcms9988";
console.log(hd.match(/\d/g).join(""));
```

#### 创建正则

JS提供字面量与对象两种方式创建正则表达式

**字面量创建**

使用`//`包裹的字面量创建方式是推荐的作法，但它不能在其中使用变量

```javascript
let hd = "houdunren.com";
console.log(/u/.test(hd));//true
```

下面尝试使用 `a` 变量时将不可以查询

```javascript
let hd = "houdunren.com";
let a = "u";
console.log(/a/.test(hd)); //false
```

虽然可以使用 `eval` 转换为js语法来实现将变量解析到正则中，但是比较麻烦，所以有变量时建议使用下面的对象创建方式

```javascript
let hd = "houdunren.com";
let a = "u";
console.log(eval(`/${a}/`).test(hd)); //true
```

**对象创建**

当正则需要动态创建时使用对象方式

```javascript
let hd = "houdunren.com";
let web = "houdunren";
let reg = new RegExp(web);
console.log(reg.test(hd)); //true
```

根据用户输入高亮显示内容，支持用户输入正则表达式

```javascript
<body>
  <div id="content">houdunren.com</div>
</body>
<script>
  const content = prompt("请输入要搜索的内容，支持正则表达式");
  const reg = new RegExp(content, "g");
  let body = document
    .querySelector("#content")
    .innerHTML.replace(reg, str => {
      return `<span style="color:red">${str}</span>`;
    });
  document.body.innerHTML = body;
</script>
```

#### 选择符

`|` 这个符号带表选择修释符，也就是 `|` 左右两侧有一个匹配到就可以。

检测电话是否是上海或北京的坐机

```javascript
let tel = "010-12345678";
//错误结果：只匹配 | 左右两边任一结果
console.log(tel.match(/010|020\-\d{7,8}/)); 

//正确结果：所以需要放在原子组中使用
console.log(tel.match(/(010|020)\-\d{7,8}/));
```

匹配字符是否包含`houdunren` 或 `hdcms`

```javascript
const hd = "houdunren";
console.log(/houdunren|hdcms/.test(hd)); //true
```

#### 字符转义

转义用于改变字符的含义，用来对某个字符有多种语义时的处理。

假如有这样的场景，如果我们想通过正则查找`/`符号，但是 `/`在正则中有特殊的意义。如果写成`///`这造成解析错误，所以要使用转义语法 `/\//`来匹配。

```javascript
const url = "https://www.houdunren.com";
console.log(/https:\/\//.test(url)); //true
```

使用 `RegExp` 构建正则时在转义上会有些区别，下面是对象与字面量定义正则时区别

```javascript
let price = 12.23;
//含义1: . 除换行外任何字符 	含义2: .普通点
//含义1: d 字母d   					含义2: \d 数字 0~9
console.log(/\d+\.\d+/.test(price));

//字符串中 \d 与 d 是一样的，所以在 new RegExp 时\d 即为 d
console.log("\d" == "d");

//使用对象定义正则时，可以先把字符串打印一样，结果是字面量一样的定义就对了
console.log("\\d+\\.\\d+");
let reg = new RegExp("\\d+\\.\\d+");
console.log(reg.test(price));
```

下面是网址检测中转义符使用

```javascript
let url = "https://www.houdunren.com";
console.log(/https?:\/\/\w+\.\w+\.\w+/.test(url));
```

#### 字符边界

使用字符边界符用于控制匹配内容的开始与结束约定。

| 边界符 | 说明                         |
| ------ | ---------------------------- |
| ^      | 匹配字符串的开始             |
| $      | 匹配字符串的结束，忽略换行符 |

匹配内容必须以`www`开始

```javascript
const hd = "www.houdunren.com";
console.log(/^www/.test(hd)); //true
```

匹配内容必须以`.com`结束

```javascript
const hd = "www.houdunren.com";
console.log(/\.com$/.test(hd)); //true
```

检测用户名长度为3~6位，且只能为字母。如果不使用 `^与$` 限制将得不到正确结果

```javascript
<body>
  <input type="text" name="username" />
</body>

<script>
  document
    .querySelector(`[name="username"]`)
    .addEventListener("keyup", function() {
      let res = this.value.match(/^[a-z]{3,6}$/i);
      console.log(res);
      console.log(res ? "正确" : "失败");
    });
</script>
```

### 元子字符

元字符是正则表达式中的最小元素，只代表单一（一个）字符

#### **字符列表**

| 元字符 | 说明                                                 | 示例          |
| ------ | ---------------------------------------------------- | ------------- |
| \d     | 匹配任意一个数字                                     | [0-9]         |
| \D     | 与除了数字以外的任何一个字符匹配                     | [^0-9]        |
| \w     | 与任意一个英文字母,数字或下划线匹配                  | [a-zA-Z_]     |
| \W     | 除了字母,数字或下划线外与任何字符匹配                | [^a-zA-Z_]    |
| \s     | 任意一个空白字符匹配，如空格，制表符`\t`，换行符`\n` | [\n\f\r\t\v]  |
| \S     | 除了空白符外任意一个字符匹配                         | [^\n\f\r\t\v] |
| .      | 匹配除换行符外的任意字符                             |               |

#### 使用体验

匹配任意数字

```javascript
let hd = "houdunren 2010";
console.log(hd.match(/\d/g)); //["2", "0", "1", "0"]
```

匹配所有电话号码

```javascript
let hd = `
	张三:010-99999999,李四:020-88888888
`;

let res = hd.match(/\d{3}-\d{7,8}/g);
console.log(res);
```

获取所有用户名

```javascript
let hd = `
张三:010-99999999,李四:020-88888888`;
let res = hd.match(/[^:\d-,]+/g);
console.log(res);
```

匹配任意非数字

```javascript
console.log(/\D/.test(2029)); //false
```

匹配字母数字下划线

```javascript
let hd = "hdcms@";
console.log(hd.match(/\w/g)); //["h", "d", "c", "m", "s"]
```

匹配除了字母,数字或下划线外与任何字符匹配

```javascript
console.log(/\W/.test("@")); //true
```

匹配与任意一个空白字符匹配

```javascript
console.log(/\s/.test(" ")); //true
console.log(/\s/.test("\n")); //true
```

匹配除了空白符外任意一个字符匹配

```javascript
let hd = "hdcms@";
console.log(hd.match(/\S/g)); //["2", "0", "1", "0","@"]
```

如果要匹配点则需要转义

```javascript
let hd = `houdunren@com`;
console.log(/houdunren.com/i.test(hd)); //true
console.log(/houdunren\.com/i.test(hd)); //false
```

使用`.`匹配除换行符外任意字符，下面匹配不到`hdcms.com` 因为有换行符

```javascript
const url = `
  https://www.houdunren.com
  hdcms.com
`;
console.log(url.match(/.+/)[0]);
```

使用`/s`视为单行模式（忽略换行）时，`.` 可以匹配所有

```javascript
let hd = `
  <span>
    houdunren
    hdcms
  </span>
`;
let res = hd.match(/<span>.*<\/span>/s);
console.log(res[0]);
```

正则中空格会按普通字符对待

```javascript
let tel = `010 - 999999`;
console.log(/\d+-\d+/.test(tel)); //false
console.log(/\d+ - \d+/.test(tel)); //true
```

## Promise

`JavaScript` 中存在很多异步操作,`Promise` 将异步操作队列化，按照期望的顺序执行，返回符合预期的结果。可以通过链式调用多个 `Promise` 达到我们的目的。

Promise 在各种开源库中已经实现，现在标准化后被浏览器默认支持。

> promise 是一个拥有 `then` 方法的对象或函数

### 问题探讨

下面通过多个示例来感受一下不使用 `promise` 时，处理相应问题的不易，及生成了不便阅读的代码。

#### 定时嵌套

下面是一个定时执行结束后，执行另一个定时器，这种嵌套造成代码不易阅读

```javascript
<style>
  div {
    width: 100px;
    height: 100px;
    background: yellowgreen;
    position: absolute;
  }
</style>

<body>
  <div></div>
</body>

<script> 
  function interval(callback, delay = 100) {
    let id = setInterval(() => callback(id), delay);
  }
  
  const div = document.querySelector("div");
  interval(timeId => {
    const left = parseInt(window.getComputedStyle(div).left);
    div.style.left = left + 10 + "px";
    if (left > 200) {
      clearInterval(timeId);
      interval(timeId => {
        const width = parseInt(window.getComputedStyle(div).width);
        div.style.width = width - 1 + "px";
        if (width <= 0) clearInterval(timeId);
      }, 10);
    }
  }, 100);
</script>
```

#### 图片加载

下面是图片后设置图片边框，也需要使用回调函数处理，代码嵌套较复杂

```javascript
function loadImage(file, resolve, reject) {
  const image = new Image();
  image.src = file;
  image.onload = () => {
    resolve(image);
  };
  image.onerror = () => {
    reject(new Error("load fail"));
  };
  document.body.appendChild(image);
}

loadImage(
  "images/houdunren.png",
  image => {
    image.style.border = "solid 5px red";
  },
  error => {
    console.log(error);
  }
);
```

#### 加载文件

下面是异步加载外部`JS`文件，需要使用回调函数执行，并设置的错误处理的回调函数

```javascript
function load(file, resolve, reject) {
  const script = document.createElement("script");
  script.src = file;
  script.onload = resolve;
  script.onerror = reject;
  document.body.appendChild(script);
}
load(
  "js/hd.js",
  script => {
    console.log(`${script.path[0].src} 加载成功`);
    hd();
  },
  error => {
    console.log(`${error.srcElement.src} 加载失败`);
  }
);
```

实例中用到的 `hd.js` 与 `houdunren.js` 内容如下

```javascript
# hd.js
function hd() {
  console.log("hd function run");
}

# houdunren.js
function houdunren() {
  console.log("houdunren function run");
  hd();
}
```

如果要加载多个脚本时需要嵌套使用，下面`houdunren.js` 依赖 `hd.js`，需要先加载`hd.js` 后加载`houdunren.js`

> 不断的回调函数操作将产生回调地狱，使代码很难维护

```javascript
load(
  "js/hd.js",
  script => {
    load(
      "js/houdunren.js",
      script => {
        houdunren();
      },
      error => {
        console.log(`${error.srcElement.src} 加载失败`);
      }
    );
  },
  error => {
    console.log(`${error.srcElement.src} 加载失败`);
  }
);
```

### 异步状态

#### 状态说明

Promise包含`pending`、`fulfilled`、`rejected`三种状态

- `pending` 指初始等待状态，初始化 `promise` 时的状态
- `resolve` 指已经解决，将 `promise` 状态设置为`fulfilled`
- `reject` 指拒绝处理，将 `promise` 状态设置为`rejected`
- `promise` 是生产者，通过 `resolve` 与 `reject` 函数告之结果
- `promise` 非常适合需要一定执行时间的异步任务
- 状态一旦改变将不可更改

promise 是队列状态，就像体育中的接力赛，或多米诺骨牌游戏，状态一直向后传递，当然其中的任何一个promise也可以改变状态。

<img src="https://s2.loli.net/2022/12/09/8tSgMYUmxwHOB19.png" alt="image-20191224100431808" style="zoom:67%;" />

promise 没有使用 `resolve` 或 `reject` 更改状态时，状态为 `pending`

```javascript
console.log(
  new Promise((resolve, reject) => {
  });
); //Promise {<pending>}
```

当更改状态后

```javascript
console.log(
  new Promise((resolve, reject) => {
    resolve("fulfilled");
  })
); //Promise {<resolved>: "fulfilled"}

console.log(
  new Promise((resolve, reject) => {
    reject("rejected");
  })
); //Promise {<rejected>: "rejected"}
```

`promise` 创建时即立即执行即同步任务，`then` 会放在异步微任务中执行，需要等同步任务执行后才执行。

```javascript
let promise = new Promise((resolve, reject) => {
  resolve("fulfilled");
  console.log("后盾人");
});
promise.then(msg => {
  console.log(msg);
});
console.log("houdunren.com");
```

```javascript
promise` 操作都是在其他代码后执行，下面会先输出 `houdunren.com` 再弹出 `success
```

- `promise` 的 then、catch、finally的方法都是异步任务
- 程序需要将主任务执行完成才会执行异步队列任务

```javascript
const promise = new Promise(resolve => resolve("success"));
promise.then(alert);
alert("houdunren.com");
promise.then(() => {
  alert("后盾人");
});
```

下例在三秒后将 `Promise` 状态设置为 `fulfilled` ，然后执行 `then` 方法

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("fulfilled");
  }, 3000);
}).then(
  msg => {
    console.log(msg);
  },
  error => {
    console.log(error);
  }
);
```

状态被改变后就不能再修改了，下面先通过`resolve` 改变为成功状态，表示`promise` 状态已经完成，就不能使用 `reject` 更改状态了

```javascript
new Promise((resolve, reject) => {
  resolve("操作成功");
  reject(new Error("请求失败"));
}).then(
  msg => {
    console.log(msg);
  },
  error => {
    console.log(error);
  }
);
```

#### 动态改变

下例中p2 返回了p1 所以此时p2的状态已经无意义了，后面的then是对p1状态的处理。

```javascript
const p1 = new Promise((resolve, reject) => {
  // resolve("fulfilled");
  reject("rejected");
});
const p2 = new Promise(resolve => {
  resolve(p1);
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
```

如果 `resolve` 参数是一个 `promise` ，将会改变`promise`状态。

下例中 `p1` 的状态将被改变为 `p2` 的状态

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(
  	//p2
    new Promise((s, e) => {
      s("成功");
    })
  );
}).then(msg => {
  console.log(msg);
});
```

当promise做为参数传递时，需要等待promise执行完才可以继承，下面的p2需要等待p1执行完成。

- 因为`p2` 的`resolve` 返回了 `p1` 的promise，所以此时`p2` 的`then` 方法已经是`p1` 的了
- 正因为以上原因 `then` 的第一个函数输出了 `p1` 的 `resolve` 的参数

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("操作成功");
  }, 2000);
});
const p2 = new Promise((resolve, reject) => {
  resolve(p1);
}).then(
  msg => {
    console.log(msg);
  },
  error => {
    console.log(error);
  }
);
```

### then

一个promise 需要提供一个then方法访问promise 结果，`then` 用于定义当 `promise` 状态发生改变时的处理，即`promise`处理异步操作，`then` 用于结果。

`promise` 就像 `kfc` 中的厨房，`then` 就是我们用户，如果餐做好了即 `fulfilled` ，做不了拒绝即`rejected` 状态。那么 then 就要对不同状态处理。

- then 方法必须返回 promise，用户返回或系统自动返回
- 第一个函数在`resolved` 状态时执行，即执行`resolve`时执行`then`第一个函数处理成功状态
- 第二个函数在`rejected`状态时执行，即执行`reject` 时执行第二个函数处理失败状态，该函数是可选的
- 两个函数都接收 `promise` 传出的值做为参数
- 也可以使用`catch` 来处理失败的状态
- 如果 `then` 返回 `promise` ，下一个`then` 会在当前`promise` 状态改变后执行

#### 语法说明

then的语法如下，onFulfilled 函数处理 `fulfilled` 状态， onRejected函数处理 `rejected` 状态

- onFulfilled 或 onRejected 不是函数将被忽略
- 两个函数只会被调用一次
- onFulfilled 在 promise 执行成功时调用
- onRejected 在 promise 执行拒绝时调用

```javascript
promise.then(onFulfilled, onRejected)
```

#### 基础知识

`then` 会在 `promise` 执行完成后执行，`then` 第一个函数在 `resolve`成功状态执行

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("success");
}).then(
  value => {
    console.log(`解决：${value}`);
  },
  reason => {
    console.log(`拒绝:${reason}`);
  }
);
```

`then` 中第二个参数在失败状态执行

```javascript
const promise = new Promise((resolve, reject) => {
  reject("is error");
});
promise.then(
  msg => {
    console.log(`成功：${msg}`);
  },
  error => {
    console.log(`失败:${error}`);
  }
);
```

如果只关心成功则不需要传递 `then` 的第二个参数

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("success");
});
promise.then(msg => {
  console.log(`成功：${msg}`);
});
```

如果只关心失败时状态，`then` 的第一个参数传递 `null`

```javascript
const promise = new Promise((resolve, reject) => {
  reject("is error");
});
promise.then(null, error => {
  console.log(`失败:${error}`);
});
```

promise 传向then的传递值，如果then没有可处理函数，会一直向后传递

```javascript
let p1 = new Promise((resolve, reject) => {
	reject("rejected");
})
.then()
.then(
  null,
  f => console.log(f)
);
```

如果 onFulfilled 不是函数且 promise 执行成功, p2 执行成功并返回相同值

```javascript
let promise = new Promise((resolve, reject) => {
  resolve("resolve");
});
let p2 = promise.then();
p2.then().then(resolve => {
  console.log(resolve);
});
```

如果 onRejected 不是函数且promise拒绝执行，p2 拒绝执行并返回相同值

```javascript
let promise = new Promise((resolve, reject) => {
  reject("reject");
});
let p2 = promise.then(() => {});
p2.then(null, null).then(null, reject => {
  console.log(reject);
});
```

#### 链式调用

每次的 `then` 都是一个全新的 `promise`，默认 then 返回的 promise 状态是 fulfilled

```javascript
let promise = new Promise((resolve, reject) => {
  resolve("fulfilled");
}).then(resolve => {
  console.log(resolve);
})
.then(resolve => {
  console.log(resolve);
});
```

每次的 `then` 都是一个全新的 `promise`，不要认为上一个 promise状态会影响以后then返回的状态

```javascript
let p1 = new Promise(resolve => {
  resolve();
});
let p2 = p1.then(() => {
  console.log("后盾人");
});
p2.then(() => {
  console.log("houdunren.com");
});
console.log(p1); // Promise {<resolved>}
console.log(p2); // Promise {<pending>}

# 再试试把上面两行放在 setTimeout里
setTimeout(() => {
  console.log(p1); // Promise {<resolved>}
  console.log(p2); // Promise {<resolved>}
});
```

`then` 是对上个promise 的`rejected` 的处理，每个 `then` 会是一个新的promise，默认传递 `fulfilled`状态

```javascript
new Promise((resolve, reject) => {
  reject();
})
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
)
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
)
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
);
  
# 执行结果如下
  ejected
  fulfilled
  fulfilled
```

如果内部返回 `promise` 时将使用该 `promise`

```javascript
let p1 = new Promise(resolve => {
  resolve();
});
let p2 = p1.then(() => {
  return new Promise(r => {
    r("houdunren.com");
  });
});
p2.then(v => {
  console.log(v); //houdunren.com
});
```

如果 `then` 返回`promise` 时，后面的`then` 就是对返回的 `promise` 的处理，需要等待该 promise 变更状态后执行。

```javascript
let promise = new Promise(resolve => resolve());
let p1 = promise.then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`p1`);
      resolve();
    }, 2000);
  });
}).then(() => {
  return new Promise((a, b) => {
    console.log(`p2`);
  });
});
```

如果`then`返回 `promise` 时，返回的`promise` 后面的`then` 就是处理这个`promise` 的

> 如果不 `return` 情况就不是这样了，即外层的 `then` 的`promise` 和内部的`promise` 是独立的两个promise

```javascript
new Promise((resolve, reject) => {
  resolve();
})
.then(v => {
  return new Promise((resolve, reject) => {
    resolve("第二个promise");
  }).then(value => {
    console.log(value);
    return value;
  });
})
.then(value => {
  console.log(value);
});
```

这是对上面代码的优化，把内部的 `then` 提取出来

```javascript
new Promise((resolve, reject) => {
  resolve();
})
.then(v => {
  return new Promise((resolve, reject) => {
    resolve("第二个promise");
  });
})
.then(value => {
  console.log(value);
  return value;
})
.then(value => {
  console.log(value);
});
```

#### 其他类型

Promise 解决过程是一个抽象的操作，其需输入一个 `promise` 和一个值，我们表示为 `[[Resolve]](promise, x)`，如果 `x` 有 `then` 方法且看上去像一个 Promise ，解决程序即尝试使 `promise` 接受 `x` 的状态；否则其用 `x` 的值来执行 `promise` 。

**循环调用**

如果 `then` 返回与 `promise` 相同将禁止执行

```javascript
let promise = new Promise(resolve => {
  resolve();
});
let p2 = promise.then(() => {
  return p2;
}); // TypeError: Chaining cycle detected for promise
```

**promise**

如果返加值是 `promise` 对象，则需要更新状态后，才可以继承执行后面的`promise`

```javascript
new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("解决状态");
      }, 2000);
    })
  );
})
  .then(
    v => {
      console.log(`fulfilled: ${v}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("失败状态");
        }, 2000);
      });
    },
    v => {
      console.log(`rejected: ${v}`);
    }
  )
  .catch(error => console.log(`rejected: ${error}`));
```

#### Thenables

包含 `then` 方法的对象就是一个 `promise` ，系统将传递 resolvePromise 与 rejectPromise 做为函数参数

下例中使用 `resolve` 或在`then` 方法中返回了具有 `then`方法的对象

- 该对象即为 `promise` 要先执行，并在方法内部更改状态
- 如果不更改状态，后面的 `then` promise都为等待状态

```javascript
new Promise((resolve, reject) => {
  resolve({
    then(resolve, reject) {
      resolve("解决状态");
    }
  });
})
.then(v => {
  console.log(`fulfilled: ${v}`);
  return {
    then(resolve, reject) {
      setTimeout(() => {
        reject("失败状态");
      }, 2000);
    }
  };
})
.then(null, error => {
  console.log(`rejected: ${error}`);
});
```

包含 `then` 方法的对象可以当作 promise来使用

```javascript
class User {
  constructor(id) {
    this.id = id;
  }
  then(resolve, reject) {
    resolve(ajax(`http://localhost:8888/php/houdunren.php?id=${this.id}`));
  }
}
new Promise((resolve, reject) => {
  resolve(ajax(`http://localhost:8888/php/user.php?name=向军`));
})
.then(user => {
  return new User(user.id);
})
.then(lessons => {
  console.log(lessons);
});
```

当然也可以是类

```javascript
new Promise((resolve, reject) => {
  resolve(
    class {
      static then(resolve, reject) {
        setTimeout(() => {
          resolve("解决状态");
        }, 2000);
      }
    }
  );
}).then(
  v => {
    console.log(`fulfilled: ${v}`);
  },
  v => {
    console.log(`rejected: ${v}`);
  }
);
```

如果对象中的 then 不是函数，则将对象做为值传递

```javascript
new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  return {
    then: "后盾人"
  };
})
.then(v => {
  console.log(v); //{then: "后盾人"}
});
```

### catch

下面使用未定义的变量同样会触发失败状态

```javascript
let promise = new Promise((resolve, reject) => {
  hd;
}).then(
  value => console.log(value),
  reason => console.log(reason)
);
```

如果 onFulfilled 或 onRejected 抛出异常，则 p2 拒绝执行并返回拒因

```javascript
let promise = new Promise((resolve, reject) => {
  throw new Error("fail");
});
let p2 = promise.then();
p2.then().then(null, resolve => {
  console.log(resolve + ",后盾人");
});
```

catch用于失败状态的处理函数，等同于 `then(null,reject){}`

- 建议使用 `catch` 处理错误
- 将 `catch` 放在最后面用于统一处理前面发生的错误

```javascript
const promise = new Promise((resolve, reject) => {
  reject(new Error("Notice: Promise Exception"));
}).catch(msg => {
  console.error(msg);
});
```

`catch` 可以捕获之前所有 `promise` 的错误，所以建议将 `catch` 放在最后。下例中 `catch` 也可以捕获到了第一个 `then` 返回 的 `promise` 的错误。

```javascript
new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  return new Promise((resolve, reject) => {
    reject(".then ");
  });
})
.then(() => {})
.catch(msg => {
  console.log(msg);//console.log('.then')
});
```

错误是冒泡的操作的，下面没有任何一个`then` 定义第二个函数，将一直冒泡到 `catch` 处理错误

```javascript
new Promise((resolve, reject) => {
  reject(new Error("请求失败"));
})
.then(msg => {})
.then(msg => {})
.catch(error => {
  console.log(error);
});
```

`catch` 也可以捕获对 `then` 抛出的错误处理

```javascript
new Promise((resolve, reject) => {
  resolve();
})
.then(msg => {
  throw new Error("这是then 抛出的错误");
})
.catch(() => {
  console.log("33");
});
```

```javascript
catch` 也可以捕获其他错误，下面在 `then` 中使用了未定义的变量，将会把错误抛出到 `catch
```

```javascript
new Promise((resolve, reject) => {
  resolve("success");
})
.then(msg => {
  console.log(a);
})
.catch(reason => {
  console.log(reason);
});
```

#### 使用建议

建议将错误要交给`catch`处理而不是在`then`中完成，不建议使用下面的方式管理错误

```javascript
new Promise((resolve, reject) => {
  reject(new Error("请求失败"));
}).then(
  msg => {
    console.log(msg);
  },
  error => {
    console.log(error);
  }
);
```

#### 处理机制

在 `promise` 中抛出的错误也会被`catch` 捕获

```javascript
const promise = new Promise((resolve, reject) => {
  throw new Error("fail");
}).catch(msg => {
  console.log(msg.toString()+"后盾人");
});
```

可以将上面的理解为如下代码，可以理解为内部自动执行 `try...catch`

```javascript
const promise = new Promise((resolve, reject) => {
  try {
    throw new Error("fail");
  } catch (error) {
    reject(error);
  }
}).catch(msg => {
  console.log(msg.toString());
});
```

但像下面的在异步中 `throw` 将不会触发 `catch`，而使用系统错误处理

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("fail");
  }, 2000);
}).catch(msg => {
  console.log(msg + "后盾人");
});
```

下面在`then` 方法中使用了没有定义的`hd`函数，也会抛除到 `catch` 执行，可以理解为内部自动执行 `try...catch`

```javascript
const promise = new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  hd();
})
.catch(msg => {
  console.log(msg.toString());
});
```

在 `catch` 中发生的错误也会抛给最近的错误处理

```javascript
const promise = new Promise((resolve, reject) => {
  reject();
})
.catch(msg => {
  hd();
})
.then(null, error => {
  console.log(error);
});
```

#### 定制错误

可以根据不同的错误类型进行定制操作，下面将参数错误与404错误分别进行了处理

```javascript
class ParamError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ParamError";
  }
}
class HttpError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "HttpError";
  }
}
function ajax(url) {
  return new Promise((resolve, reject) => {
    if (!/^http/.test(url)) {
      throw new ParamError("请求地址格式错误");
    }
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else if (this.status == 404) {
        // throw new HttpError("用户不存在");
        reject(new HttpError("用户不存在"));
      } else {
        reject("加载失败");
      }
    };
    xhr.onerror = function() {
      reject(this);
    };
  });
}

ajax(`http://localhost:8888/php/user.php?name=后盾人`)
.then(value => {
  console.log(value);
})
.catch(error => {
  if (error instanceof ParamError) {
    console.log(error.message);
  }
  if (error instanceof HttpError) {
    alert(error.message);
  }
  console.log(error);
});
```

#### 事件处理

**unhandledrejection**事件用于捕获到未处理的Promise错误，下面的 then 产生了错误，但没有`catch` 处理，这时就会触发事件。该事件有可能在以后被废除，处理方式是对没有处理的错误直接终止。

```javascript
window.addEventListener("unhandledrejection", function(event) {
  console.log(event.promise); // 产生错误的promise对象
  console.log(event.reason); // Promise的reason
});

new Promise((resolve, reject) => {
  resolve("success");
}).then(msg => {
  throw new Error("fail");
});
```

### finally

无论状态是`resolve` 或 `reject` 都会执行此动作，`finally` 与状态无关。

```javascript
const promise = new Promise((resolve, reject) => {
  reject("hdcms");
})
.then(msg => {
  console.log("resolve");
})
.catch(msg => {
  console.log("reject");
})
.finally(() => {
  console.log("resolve/reject状态都会执行");
});
```

下面使用 `finally` 处理加载状态，当请求完成时移除加载图标。请在后台php文件中添加 `sleep(2);` 设置延迟响应

```javascript
<body>
  <style>
    div {
      width: 100px;
      height: 100px;
      background: red;
      color: white;
      display: none;
    }
  </style>
	<div>loading...</div>
</body>
<script>
function ajax(url) {
  return new Promise((resolve, reject) => {
    document.querySelector("div").style.display = "block";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this);
      }
    };
  });
}

ajax("http://localhost:8888/php/user.php?name=向军")
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    document.querySelector("div").style.display = "none";
  })
</script>
```

### 实例操作

#### 异步请求

下面是将 `ajax` 修改为 `promise` 后，代码结构清晰了很多

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this);
      }
    };
  });
}

ajax("http://localhost:8888/php/user.php?name=向军")
.then(user =>ajax(`http://localhost:8888/php/houdunren.php?id=${user["id"]}`))
.then(lesson => {
  console.log(lesson);
});
```

#### 图片加载

下面是异步加载图片示例

```javascript
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = file;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    document.body.appendChild(image);
  });
}

loadImage("images/houdunren.png").then(image => {
  image.style.border = "solid 20px black";
  console.log("宽度:" + window.getComputedStyle(image).width);
});
```

#### 定时器

下面是封装的`timeout` 函数，使用定时器操作更加方便

```javascript
function timeout(times) {
  return new Promise(resolve => {
    setTimeout(resolve, times);
  });
}

timeout(3000)
  .then(() => {
    console.log("3秒后执行");
    return timeout(1000);
  })
  .then(() => {
    console.log("执行上一步的promise后1秒执行");
  });
```

封闭 `setInterval` 定时器并实现动画效果

```javascript
<body>
  <style>
    div {
      width: 100px;
      height: 100px;
      background: yellowgreen;
      position: absolute;
    }
  </style>
  <div></div>
</body>
<script>
  function interval(delay = 1000, callback) {
    return new Promise(resolve => {
      let id = setInterval(() => {
        callback(id, resolve);
      }, delay);
    });
  }
  interval(100, (id, resolve) => {
    const div = document.querySelector("div");
    let left = parseInt(window.getComputedStyle(div).left);
    div.style.left = left + 10 + "px";
    if (left >= 200) {
      clearInterval(id);
      resolve(div);
    }
  }).then(div => {
    interval(50, (id, resolve) => {
      let width = parseInt(window.getComputedStyle(div).width);
      div.style.width = width - 10 + "px";
      if (width <= 20) {
        clearInterval(id);
      }
    });
  });
</script>
```

### 链式操作

- 每个 `then` 都是一个promise
- 如果 `then` 返回 promse，只当`promise` 结束后，才会继承执行下一个 `then`

#### 语法介绍

下面是对同一个 `promise` 的多个 `then` ，每个`then` 都得到了同一个promise 结果，这不是链式操作，实际使用意义不大。

![image-20191223201319405](https://s2.loli.net/2022/12/09/btgZHGrKL2YoXSl.png)

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("后盾人");
});
promise.then(hd => {
  hd += "-hdcms";
  console.log(hd); //后盾人-hdcms
});
promise.then(hd => {
  hd += "-houdunren";
  console.log(hd); //后盾人-houdunren
});
```

第一个 `then` 也是一个promise，当没接受到结果是状态为 `pending`

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("后盾人");
});

console.log(
  promise.then(hd => {
    hd += "-hdcms";
    console.log(hd);
  })
); //Promise {<pending>}
```

`promise` 中的 `then` 方法可以链接执行，`then` 方法的返回值会传递到下一个`then` 方法。

- `then` 会返回一个`promise` ，所以如果有多个`then` 时会连续执行
- `then` 返回的值会做为当前`promise` 的结果

下面是链式操作的 `then`，即始没有 `return` 也是会执行，因为每个`then` 会返回`promise`

```javascript
new Promise((resolve, reject) => {
  resolve("后盾人");
})
.then(hd => {
  hd += "-hdcms";
  console.log(hd); //后盾人-hdcms
  return hd;
})
.then(hd => {
  hd += "-houdunren";
  console.log(hd); //后盾人-hdcms-houdunren
});
```

`then` 方法可以返回一个`promise` 对象，等`promise` 执行结束后，才会继承执行后面的 `then`。后面的`then` 方法就是对新返回的`promise` 状态的处理

```javascript
new Promise((resolve, reject) => {
  resolve("第一个promise");
})
.then(msg => {
  console.log(msg);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("第二个promise");
    }, 3000);
  });
})
.then(msg => {
  console.log(msg);
});
```

#### 链式加载

使用`promise` 链式操作重构前面章节中的文件加载，使用代码会变得更清晰

```javascript
function load(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = file;
    script.onload = () => resolve(script);
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

load("js/hd.js")
.then(() => load("js/houdunren.js"))
.then(() => houdunren());
```

#### 操作元素

下面使用 `promise` 对元素事件进行处理

```javascript
<body>
  <div>
    <h2>第九章 闭包与作用域</h2>
    <button>收藏课程</button>
  </div>
</body>

<script>
new Promise(resolve => {
  document.querySelector("button").addEventListener("click", e => {
    resolve();
  });
})
.then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("执行收藏任务");
      resolve();
    }, 2000);
  });
})
.then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("更新积分");
      resolve();
    }, 2000);
  });
})
.then(() => {
  console.log("收藏成功！奖励10积分");
})
.catch(error => console.log(errro));
```

#### 异步请求

下面是使用链式操作获取学生成绩

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this);
      }
    };
  });
}
ajax("http://localhost:8888/php/user.php?name=向军")
.then(user => {
  return ajax(`http://localhost:8888/php/houdunren.php?id=${user["id"]}`);
})
.then(lesson => {
  console.log(lesson);
});
```

### 拓展接口

#### resolve

使用 `promise.resolve` 方法可以快速的返回一个promise对象

根据值返加 `promise`

```javascript
Promise.resolve("后盾人").then(value => {
  console.log(value); //后盾人
});
```

下面将请求结果缓存，如果再次请求时直接返回带值的 `promise`

- 为了演示使用了定时器，你也可以在后台设置延迟响应

```javascript
function query(name) {
  const cache = query.cache || (query.cache = new Map());
  if (cache.has(name)) {
    console.log("走缓存了");
    return Promise.resolve(cache.get(name));
  }
  return ajax(`http://localhost:8888/php/user.php?name=${name}`).then(
    response => {
      cache.set(name, response);
      console.log("没走缓存");
      return response;
    }
  );
}
query("向军").then(response => {
  console.log(response);
});
setTimeout(() => {
  query("向军").then(response => {
    console.log(response);
  });
}, 1000);
```

如果是 `thenable` 对象，会将对象包装成promise处理，这与其他promise处理方式一样的

```javascript
const hd = {
  then(resolve, reject) {
    resolve("后盾人");
  }
};
Promise.resolve(hd).then(value => {
  console.log(value);
});
```

#### reject

和 `Promise.resolve` 类似，`reject` 生成一个失败的`promise`

```javascript
Promise.reject("fail").catch(error => console.log(error));
```

下面使用 `Promise.reject` 设置状态

```javascript
new Promise(resolve => {
  resolve("后盾人");
})
.then(v => {
  if (v != "houdunren.com") return Promise.reject(new Error("fail"));
})
.catch(error => {
  console.log(error);
});
```

#### all

使用`Promise.all` 方法可以同时执行多个并行异步操作，比如页面加载时同进获取课程列表与推荐课程。

- 任何一个 `Promise` 执行失败就会调用 `catch`方法
- 适用于一次发送多个异步操作
- 参数必须是可迭代类型，如Array/Set
- 成功后返回 `promise` 结果的有序数组

下例中当 `hdcms、houdunren` 两个 Promise 状态都为 `fulfilled` 时，hd状态才为`fulfilled`。

```javascript
const hdcms = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第一个Promise");
  }, 1000);
});
const houdunren = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第二个异步");
  }, 1000);
});
const hd = Promise.all([hdcms, houdunren])
  .then(results => {
    console.log(results);
  })
  .catch(msg => {
    console.log(msg);
  });
```

根据用户名获取用户，有任何一个用户获取不到时 `promise.all` 状态失败，执行 `catch` 方法

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this);
      }
    };
  });
}

const api = "http://localhost:8888/php";
const promises = ["向军", "后盾人"].map(name => {
  return ajax(`${api}/user.php?name=${name}`);
});

Promise.all(promises)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```

可以将其他非`promise` 数据添加到 `all` 中，它将被处理成 `Promise.resolve`

```javascript
...
const promises = [
  ajax(`${api}/user.php?name=向军`),
  ajax(`${api}/user.php?name=后盾人`),
  { id: 3, name: "hdcms", email: "admin@hdcms.com" }
];
...
```

如果某一个`promise`没有catch 处理，将使用`promise.all` 的catch处理

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve("fulfilled");
});
let p2 = new Promise((resolve, reject) => {
  reject("rejected");
});
Promise.all([p1, p2]).catch(reason => {
  console.log(reason);
});
```

#### allSettled

`allSettled` 用于处理多个`promise` ，只关注执行完成，不关注是否全部执行成功，`allSettled` 状态只会是`fulfilled`。

下面的p2 返回状态为 `rejected` ，但`promise.allSettled` 不关心，它始终将状态设置为 `fulfilled` 。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("resolved");
});
const p2 = new Promise((resolve, reject) => {
  reject("rejected");
});
Promise.allSettled([p1, p2])
.then(msg => {
  console.log(msg); //都会返回
})
```

下面是获取用户信息，但不关注某个用户是否获取不成功

```javascript
const api = "http://localhost:8888/php";
const promises = [
  ajax(`${api}/user.php?name=向军`),
  ajax(`${api}/user.php?name=后盾人`)
];
Promise.allSettled(promises).then(response => {
  console.log(response);
});
```

#### race

使用`Promise.race()` 处理容错异步，和`race`单词一样哪个Promise快用哪个，哪个先返回用哪个。

- 以最快返回的promise为准
- 如果最快返加的状态为`rejected` 那整个`promise`为`rejected`执行cache
- 如果参数不是promise，内部将自动转为promise

下面将第一次请求的异步时间调整为两秒，这时第二个先返回就用第二人。

```javascript
const hdcms = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第一个Promise");
  }, 2000);
});
const houdunren = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第二个异步");
  }, 1000);
});
Promise.race([hdcms, houdunren])
.then(results => {
  console.log(results);
})
.catch(msg => {
  console.log(msg);
});
```

获取用户资料，如果两秒内没有结果 `promise.race` 状态失败，执行`catch` 方法

```javascript
const api = "http://localhost:8888/php";
const promises = [
  ajax(`${api}/user.php?name=向军`),
  new Promise((a, b) =>
    setTimeout(() => (new Error("request fail")), 2000)
  )
];
Promise.race(promises)
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
});
```

### 任务队列

#### 实现原理

如果 `then` 返回`promise` 时，后面的`then` 就是对返回的 `promise` 的处理

```javascript
let promise = Promise.resolve();
let p1 = promise.then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`p1`);
      resolve();
    }, 1000);
  });
});
p1.then(() => {
  return new Promise((a, b) => {
    setTimeout(() => {
      console.log(`p2`);
    }, 1000);
  });
});
```

下面使用 `map` 构建的队列，有以下几点需要说明

- `then` 内部返回的 `promise` 更改外部的 `promise` 变量
- 为了让任务继承，执行完任务需要将 `promise` 状态修改为 `fulfilled`

```javascript
function queue(nums) {
  let promise = Promise.resolve();
  nums.map(n => {
    promise = promise.then(v => {
      return new Promise(resolve => {
        console.log(n);
        resolve();
      });
    });
  });
}

queue([1, 2, 3, 4, 5]);
```

下面再来通过 `reduce` 来实现队列

```javascript
function queue(nums) {
  return nums.reduce((promise, n) => {
    return promise.then(() => {
      return new Promise(resolve => {
        console.log(n);
        resolve();
      });
    });
  }, Promise.resolve());
}

queue([1, 2, 3, 4, 5]);
```

#### 队列请求

下面是异步加载用户并渲染到视图中的队列实例

- 请在后台添加延迟脚本，以观察队列执行过程
- 也可以在任何`promise` 中添加定时器观察

```javascript
class User {
	//加载用户
  ajax(user) {
    let url = `http://localhost:8888/php/user.php?name=${user}`;
    return new Promise(resolve => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();
      xhr.onload = function() {
        if (this.status == 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(this);
        }
      };
    });
  }
  //启动
  render(users) {
    users.reduce((promise, user) => {
      return promise
        .then(() => {
          return this.ajax(user);
        })
        .then(user => {
          return this.view(user);
        });
    }, Promise.resolve());
  }
  //宣染视图
  view(user) {
    return new Promise(resolve => {
      let h1 = document.createElement("h1");
      h1.innerHTML = user.name;
      document.body.appendChild(h1);
      resolve();
    });
  }
}
new User().render(["向军", "后盾人"]);
```

#### 高可用封装

上例中处理是在队列中完成，不方便业务定制，下面将Promise处理在剥离到外部

**后台请求处理类**

```javascript
export default function(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(this)
      }
    }
  })
}
```

**队列处理类**

###  async/await

使用 `async/await` 是promise 的语法糖，可以让编写 promise 更清晰易懂，也是推荐编写promise 的方式。

- `async/await` 本质还是promise，只是更简洁的语法糖书写
- `async/await` 使用更清晰的promise来替换 promise.then/catch 的方式

- async和await两种语法结合可以让异步代码像同步代码一样

#### async

下面在 `hd` 函数前加上async，函数将返回promise，我们就可以像使用标准Promise一样使用了。

- async函数的返回值为promise对象
- promise对象的结束由async函数执行的返回值决定

```javascript
async function hd() {
  return "houdunren.com";
}
console.log(hd());
hd().then(value => {
  console.log(value);
});
```

如果有多个await 需要排队执行完成，我们可以很方便的处理多个异步队列

```javascript
async function hd(message) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message);
    }, 2000); 
  });
}
async function run() {
  let h1 = await hd("后盾人");
  console.log(h1);
  let h2 = await hd("houdunren.com");
  console.log(h2);
}
run();
```

#### await

使用 `await` 关键词后会等待promise **状态改变之后才会往下运行**

- `await` 后面一般是promise，如果不是直接返回
- `await` 必须放在 async 定义的函数中使用
- `await` 用于替代 `then` 使编码更优雅
- `await ` 返回的是promise成功地值
- `await` 的promise失败了就会抛出异常，需要通过try...catch捕获处理

下例会在 await 这行暂停执行，直到等待 promise 返回结果后才继执行。

```javascript
function sleep(delay = 2000) {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve();
      }, delay);
   });
}
async function show() {
   await sleep();//必须要等待promise状态改变之后才会往下面运行
   console.log("后盾人");
}
show();//console.log('后盾人')
```

一般await后面是外部其它的promise对象

```javascript
async function hd() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("fulfilled");
    }, 2000);
  });
}
async function run() {
  let value = await hd();
  console.log("houdunren.com");
  console.log(value);
}
run();
```

下面是请求后台获取用户课程成绩的示例

```javascript
async function user() {
  let user = await ajax(`http://localhost:8888/php/user.php?name=向军`);
  let lessons = await ajax(
    `http://localhost:8888/php/houdunren.php?id=${user.id}`
  );
  console.log(lessons);
}
```

也可以将操作放在立即执行函数中完成

```javascript
(async () => {
  let user = await ajax(`http://localhost:8888/php/user.php?name=向军`);
  let lessons = await ajax(
    `http://localhost:8888/php/houdunren.php?id=${user.id}`
  );
  console.log(lessons);
})();
```

下面是使用async 设置定时器，并间隔时间来输出内容

```javascript
async function sleep(ms = 2000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function run() {
  for (const value of ["后盾人", "向军"]) {
    await sleep();
    console.log(value);
  }
}
run();
```

#### 加载进度

下面是请求后台加载用户并通过进度条展示的效果

```javascript
   <style>
      #loading {
         width: 0;
         height: 50px;
         font-size: 30px;
         display: flex;
         justify-content: center;
         align-items: center;
         color: white;
         background: #2ecc71;
         transition: all 0.3s;
      }
   </style>
</head>
<body>
   <div id="loading">0%</div>
   <script type="module">
      import ajax from "../ajax.js";
      function query(name) {
         const site = `http://localhost/php`;
         return ajax(`${site}/user.php?name=${name}`);
      }
      //  query("后盾人");
      async function load(users) {
         for (let i = 0; i < users.length; i++) {
            const user = await query(users[i]);
            let load = ((i + 1) / users.length) * 100;
            loading.style.width = load + "%";
            loading.innerHTML = Math.round(load) + "%";
         }
      }
      load(["李四", "王五", "后盾人", "赵六", "向军"]);
   </script>
</body>
```

#### 类中使用

和 promise 一样，await 也可以操作`thenables` 对象

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  then(resolve, reject) {
    let user = ajax(`http://localhost:8888/php/user.php?name=${this.name}`);
    resolve(user);
  }
}
async function get() {
  let user = await new User("向军");
  console.log(user);
}
get();
```

类方法也可以通过 `async` 与 `await` 来操作promise

```javascript
class User {
  constructor() {}
  async get(name) {
    let user = await ajax(
      `http://localhost:8888/php/user.php?name=${name}`
    );
    user.name += "-houdunren.com";
    return user;
  }
}
new User().get("向军").then(resolve => {
  console.log(resolve);
});
```

#### 其他声名

函数声明

```javascript
async function get(name) {
  return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
}
get("后盾人").then(user => {
  console.log(user);
});
```

函数表达式

```javascript
let get = async function(name) {
  return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
};
get("后盾人").then(user => {
  console.log(user);
});
```

对象方法声明

```javascript
let hd = {
  async get(name) {
    return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
  }
};

hd.get("后盾人").then(user => {
  console.log(user);
});
```

立即执行函数

```javascript
(async () => {
  let user = await ajax(`http://localhost:8888/php/user.php?name=向军`);
  let lessons = await ajax( 
    `http://localhost:8888/php/houdunren.php?id=${user.id}`
  );
  console.log(lessons);
})();
```

类方法中的使用

```javascript
class User {
  async get(name) {
    return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
  }
}
let user = new User().get("后盾人").then(user => {
  console.log(user);
});
```

#### 错误处理

async 内部发生的错误，会将必变promise对象为rejected 状态，所以可以使用`catch` 来处理

async内部也可以使用throw new Error抛出错误

```javascript
async function hd() {
  console.log(houdunren);
}
hd().catch(error => {
  throw new Error(error);
});
```

下面是异步请求数据不存在时的错误处理

```javascript
async function get(name) {
  return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
}

get("向军小哥").catch(error => {
  alert("用户不存在");
});
```

如果`promise` 被拒绝将抛出异常，可以使用 `try...catch` 处理错误

```javascript
async function get(name) {
  try {
    let user = await ajax(
      `http://localhost:8888/php/user.php?name=${name}`
    );
    console.log(user);
  } catch (error) {
    alert("用户不存在");
  }
}
get("向军老师");
```

多个 await 时当前面的出现失败，后面的将不可以执行

```javascript
async function hd() {
  await Promise.reject("fail");
  await Promise.resolve("success").then(value => {
    console.log(value);
  });
}
hd();
```

如果对前一个错误进行了处理，后面的 await 可以继续执行

```javascript
async function hd() {
  await Promise.reject("fail").catch(e => console.log(e));
  await Promise.resolve("success").then(value => {
    console.log(value);
  });
}
hd();
```

也可以使用 `try...catch` 特性忽略不必要的错误

```javascript
async function hd() {
  try {
    await Promise.reject("fail");
  } catch (error) {}
  await Promise.resolve("success").then(value => {
    console.log(value);
  });
}
hd();
```

也可以将多个 await 放在 try...catch 中统一处理错误

```javascript
async function hd(name) {
  const host = "http://localhost:8888/php";
  try {
    const user = await ajax(`${host}/user.php?name=${name}`);
    const lessons = await ajax(`${host}/user.php?id=${user.id}`);
    console.log(lessons);
  } catch (error) {
    console.log("用户不存在");
  }
}
hd("后盾人教程");
```

#### 并发执行

有时需要多个await 同时执行，有以下几种方法处理，下面多个await 将产生等待

```javascript
async function p1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("houdunren");
      resolve();
    }, 2000);
  });
}
async function p2() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("hdcms");
      resolve();
    }, 2000);
  });
}
async function hd() {
  await p1();
  await p2();
}
hd();
```

使用 `Promise.all()` 处理多个promise并行执行

```javascript
async function hd() {
  await Promise.all([p1(), p2()]);
}
hd();
```

让promise先执行后再使用await处理结果

```javascript
async function hd() {
  let h1 = p1();
  let h2 = p2();
  await h1;
  await h2;
}
hd();
```

## 任务管理

### 任务管理

JavaScript 语言的一大特点就是单线程，也就是说同一个时间只能处理一个任务。为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，防止主线程的不阻塞，（事件循环）Event Loop的方案应用而生。

JavaScript 处理任务是在等待任务、执行任务 、休眠等待新任务中不断循环中，也称这种机制为事件循环。

- 主线程中的任务执行完后，才执行任务队列中的任务
- 有新任务到来时会将其放入队列，采取先进先执行的策略执行队列中的任务
- 比如多个 `setTimeout` 同时到时间了，就要依次执行

任务包括 script(整体代码)、 setTimeout、setInterval、DOM渲染、DOM事件、Promise、XMLHTTPREQUEST等

#### 原理分析

下面通过一个例子来详细分析宏任务与微任务

```javascript
console.log("后盾人");
setTimeout(function() {
  console.log("定时器");
}, 0);
Promise.resolve()
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });
console.log("houdunren.com");

#输出结果为
后盾人
houdunren.com
promise1
promise2
定时器
```

1. 先找到主线程中的任务输出。
2. 等主线程没有之后执行到宏任务将宏任务放入宏任务队列，等待执行
3. 之后执行到微任务，并将其放入微任务队列，等待执行
4. 主线程所有任务处理完毕
5. 通过事件循环遍历微任务队列，发现任务之后将其放到主线程中
6. 主线程所有任务执行完毕
7. 此时微任务队列中已无任务，然后从宏任务队列中读取任务，发现之后将其放到主线程中
8. 执行完之后循环，如果所有的任务队列都没有任务那么将进入休眠状态

<img src="https://s2.loli.net/2022/12/09/rePVIStcN5buq9x.png" alt="image-20191227151316924" style="zoom:80%;" />

#### 脚本加载

引擎在执行任务时不会进行DOM渲染，所以如果把`script` 定义在前面，要先执行完任务后再渲染DOM，建议将`script` 放在 BODY 结束标签前。

#### 定时器

定时器会放入异步任务队列，也需要等待同步任务执行完成后执行。

下面设置了 6 毫秒执行，如果主线程代码执行10毫秒，定时器要等主线程执行完才执行。

HTML标准规定最小时间不能低于4毫秒，有些异步操作如DOM操作最低是16毫秒，总之把时间设置大些对性能更好。

- 系统在执行到定时器的时候会把定时器放到定时器模块

- 定时器计时会在定时器模块的时候完成，完成之后才会被放入宏任务中等待主线程的轮训

```javascript
setTimeout(func,6);
```

下面的代码会先输出 `houdunren.com` 之后输出 `后盾人`

```javascript
setTimeout(() => {
  console.log("后盾人");
}, 0);
console.log("houdunren.com");
```

> 这是对定时器的说明，其他的异步操作如事件、XMLHTTPREQUEST 等逻辑是一样的

下面代码会在主线程任务结束之后直接打印出定时器的内容,而不会等待5秒钟，因为定时器已经在定时器模块计时完成

```javascript
setTimeout(() => {
  console.log("后盾人 1");
}, 5000);
for (let i = 1; i <= 10000; i++) {
  console.log("");
}
```

以下代码会先输出后盾人 2，因为后盾人 2计时先结束先放入宏任务等待排队，后盾人 1是后放入

```javascript
setTimeout(() => {
  console.log("后盾人 1");
}, 2000);
setTimeout(() => {
  console.log("后盾人 2");
}, 1000);
for (let i = 1; i <= 5000; i++) {
  console.log("");
}
```

#### 微任务

微任务一般由用户代码产生，微任务较宏任务执行优先级更高，`Promise.then` 是典型的微任务，实例化 Promise 时执行的代码是同步的，便then注册的回调函数是异步微任务的。

任务的执行顺序是同步任务、微任务、宏任务所以下面执行结果是 `1、2、3、4`

```javascript
setTimeout(() => console.log(4));

new Promise(resolve => {
  resolve();
  console.log(1);
}).then(_ => {
  console.log(3);
});

console.log(2);
```

我们再来看下面稍复杂的任务代码

```javascript
setTimeout(() => {
  console.log("定时器");
  setTimeout(() => {
    console.log("timeout timeout");
  }, 0);
  new Promise(resolve => {
    console.log("settimeout Promise");
    resolve();
  }).then(() => {
    console.log("settimeout then");
  });
}, 0);
new Promise(resolve => {
  console.log("Promise");
  resolve();
}).then(() => {
  console.log("then");
});
console.log("后盾人");
```

以上代码执行结果为

```javascript
Promise
后盾人
then
定时器
settimeout Promise
settimeout then
timeout timeout
```

#### 面试题

当定时器时间一致的时候会产生误解，会以为这两个定时器是同时执行的

实际上当一个定时器计时完成会放入任务队列然后再放入主线程，依次执行不会同步

```javascript
let i = 0;
setTimeout(() => {
  console.log(++i); //1
}, 1000);
setTimeout(() => {
  console.log(++i); //2
}, 1000);
```

### 实例操作

#### 进度条

下面的定时器虽然都定时了一秒钟，但也是按先进行出原则，依次执行

```javascript
let i = 0;
setTimeout(() => {
  console.log(++i); //1
}, 1000);
setTimeout(() => {
  console.log(++i); //2
}, 1000);
```

下面是一个进度条的示例，将每个数字放在一个任务中执行

```javascript
<body>
  <style>
    body {
      padding: 30px;
    }
    #hd {
      height: 30px;
      background: yellowgreen;
      width: 0;
      text-align: center;
      font-weight: bold;
    }
  </style>
  <div id="hd"></div>
</body>

<script>
  function view() {
    let i = 0;
    (function handle() {
      hd.innerHTML = i + "%";
      hd.style.width = i + "%";
      if (i++ < 100) {
        setTimeout(handle, 20);
      }
    })();
  }
  view();
  console.log("定时器开始了...");
</script>
```

#### 任务分解

一个比较耗时的任务可能造成游览器卡死现象，所以可以将任务拆分为多小小异步小任务执行。下面是一个数字统计的函数，我们会发现运行时间特别长

```javascript
console.time("runtime");
function hd(num) {
  let count = 0;
  for (let i = 0; i <= num; i++) {
    count += i;
  }
  console.log(count);
  console.timeEnd("runtime");
}
let num=987654321;
hd(num);
console.log("houdunren.com"); //需要等待上面执行完才会执行
```

现在把任务分解成小块放入任务队列，游览器就不会出现卡死的现象了，也不会影响后续代码的执行

```javascript
console.time("runtime");
let count = 0;
let num = 987654321;
function hd() {
  for (let i = 0; i < 100000000; i++) {
    if (num <= 0) break;
    count += num--;
  }
  if (num > 0) {
    console.log(num);
    setTimeout(hd);
  } else {
    console.log(num);
    console.log(count);
  }
}
hd();
console.log("houdunren.com"); //立刻显示出来
```

交给微任务处理是更好的选择

```javascript
async function hd(num) {
  let res = await Promise.resolve().then(_ => {
    let count = 0;
    for (let i = 0; i < num; i++) {
      count += num--;
    }
    return count;
  });
  console.log(res);
}
hd(987654321);
console.log("后盾人");
```

## Promise核心

基本步骤：

1. 设置类，设置初始的静态属性pending然后实例状态和值
2. 设置executor属性传递执行的函数体，其中注意函数作用域问题（传递的函数中可能会存在问题，所以设置trycatch）处理错误
3. resolve和reject方法，设置好之后需要判断状态是否是pending，因为在修改过一次状态之后就无法再次修改，所以做一步判断，如果是pending那就修改类的状态和值
4. 设置then方法，传递的2个函数体，需要判断是什么状态就执行哪个函数，如果传递的是null也需要做处理
5. 因为是同步代码所以内部需要设置定时器来进行异步的操作，then传递的函数中也可能会出现错误也需要trycatch处理
6. 在new传递函数的内部如果设定一个定时器然后等定时器结束才改变状态，但是那样会没有结果，原因是因为虽然是定时器结束之后改变状态但是then方法是直接执行的，then方法判断时状态是pending，所以我们需要再为pending做一步判断处理，如果状态是pending那么就将要执行的then中的2个函数放到数组中，等之后状态改变时，再来调用数组中的方法即可
7. 如果是then传递的函数中又出现错误那么我们需要在放入数组的同时把传递的函数展开来，然后用trycatch进行包裹处理
8. then方法本身是异步的，那么我们再封装的时候也可以把then中的方法封装到定时器中伪装成异步
9. then链式原理分析：then后面是可以接着写then的，因为then返回的是一个promise，而且这个promise的状态是一个成功地状态，不会继承之前then的状态(重点)
10. 我们可以在then函数内重新返回一个实例对象，将返回值保存起来然后重新修改状态为成功地状态，发生错误的时候交给最后的then处理
11. 如果只声名一个then什么都不传递，这个then后面再跟一个then的话那么将会接收不到值，我们需要手动将值返回回去
12. 如果返回的是一个promise那么就需要对这个promise进行处理
13. 将重复的代码进行封装

### 起步构建

本章来自己开发一个Promise实现，提升异步编程的能力。

首先声明定义类并声明Promise状态与值，有以下几个细节需要注意。

- executor为执行者
- 当执行者出现异常时触发**拒绝**状态
- 使用静态属性保存状态值
- 状态只能改变一次，所以在resolve与reject添加条件判断
- 因为 `resolve`或`rejected`方法在executor中调用，作用域也是executor作用域，这会造成this指向window，现在我们使用的是class定义，this为undefined。

```javascript
class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
    }
  }
  reject(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = value;
    }
  }
}
```

下面测试一下状态改变

```javascript
<script src="HD.js"></script>
<script>
  let p = new HD((resolve, reject) => {
    resolve("后盾人");
  });
  console.log(p);
</script>
```

### THEN

现在添加then方法来处理状态的改变，有以下几点说明

1. then可以有两个参数，即成功和错误时的回调函数
2. then的函数参数都不是必须的，所以需要设置默认值为函数，用于处理当没有传递时情况
3. 当执行then传递的函数发生异常时，统一交给onRejected来处理错误

#### 基础构建

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  if (this.status == HD.FULFILLED) {
    try {
      onFulfilled(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
  if (this.status == HD.REJECTED) {
    try {
      onRejected(this.value);
    } catch (error) {
      onRejected(error);
    }
  }
}
```

下面来测试then方法的，结果正常输出`后盾人`

```javascript
let p = new HD((resolve, reject) => {
  resolve("后盾人");
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("houdunren.com");
```

#### 异步任务

但上面的代码产生的Promise并不是异步的，使用setTimeout来将onFulfilled与onRejected做为异步宏任务执行

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  if (this.status == HD.FULFILLED) {
    setTimeout(() => {
      try {
        onFulfilled(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
  if (this.status == HD.REJECTED) {
    setTimeout(() => {
      try {
        onRejected(this.value);
      } catch (error) {
        onRejected(error);
      }
    });
  }
}
```

现在再执行代码，已经有异步效果了，先输出了`houdunren.com`

```javascript
let p = new HD((resolve, reject) => {
  resolve("后盾人");
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("houdunren.com");
```

#### PENDING状态

目前then方法无法处理promise为pending时的状态

```javascript
...
let p = new HD((resolve, reject) => {
  setTimeout(() => {
    resolve("后盾人");
  });
})
...
```

为了处理以下情况，需要进行几点改动

1. 在构造函数中添加callbacks来保存pending状态时处理函数，当状态改变时循环调用

```javascript
constructor(executor) {
	...
  this.callbacks = [];
  ...
}    
```

2. 将then方法的回调函数添加到 callbacks 数组中，用于异步执行

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
	if (this.status == HD.PENDING) {
    this.callbacks.push({
      onFulfilled: value => {
        try {
          onFulfilled(value);
        } catch (error) {
          onRejected(error);
        }
      },
      onRejected: value => {
        try {
          onRejected(value);
        } catch (error) {
          onRejected(error);
        }
      }
    });
  }
  ...
}
```

3. resovle与reject中添加处理callback方法的代码

```javascript
resolve(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.FULFILLED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onFulfilled(value);
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
    this.status = HD.REJECTED;
    this.value = value;
    this.callbacks.map(callback => {
      callback.onRejected(value);
    });
  }
}
```

#### PENDING异步

执行以下代码发现并不是异步操作，应该先输出 `大叔视频` 然后是`后盾人

```javascript
let p = new HD((resolve, reject) => {
  setTimeout(() => {
    resolve("后盾人");
    console.log("大叔视频");
  });
}).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
```

解决以上问题，只需要将resolve与reject执行通过setTimeout定义为异步任务

```javascript
resolve(value) {
  if (this.status == HD.PENDING) {
   	this.status = HD.FULFILLED;
		this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onFulfilled(value);
      });
    });
  }
}
reject(value) {
  if (this.status == HD.PENDING) {
  	this.status = HD.REJECTED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.map(callback => {
        callback.onRejected(value);
      });
    });
  }
}
```

### 链式操作

Promise中的then是链式调用执行的，所以then也要返回Promise才能实现

1. then的onReject函数是对前面Promise的rejected的处理

2. 但该Promise返回状态要为fulfilled，所以在调用onRejected后改变当前promise为fulfilled状态

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

下面执行测试后，链式操作已经有效了

```javascript
let p = new HD((resolve, reject) => {
  resolve("后盾人");
  console.log("hdcms.com");
})
.then(
  value => {
    console.log(value);
    return "大叔视频";
  },
  reason => {
    console.log(reason);
  }
)
.then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
console.log("houdunren.com");
```

### 返回类型

如果then返回的是Promise呢？所以我们需要判断分别处理返回值为Promise与普通值的情况

#### 基本实现

下面来实现不同类型不同处理机制

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          try {
            let result = onFulfilled(value);
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        },
        onRejected: value => {
          try {
            let result = onRejected(value);
            if (result instanceof HD) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        try {
          let result = onFulfilled(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        try {
          let result = onRejected(this.value);
          if (result instanceof HD) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}
```

#### 代码复用

现在发现pendding、fulfilled、rejected 状态的代码非常相似，所以可以提取出方法Parse来复用

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  return new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(onRejected(this.value), resolve, reject);
      });
    }
  });
}
parse(result, resolve, reject) {
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

#### 返回约束

then的返回的promise不能是then相同的Promise，下面是原生Promise的示例将产生错误

```javascript
let promise = new Promise(resolve => {
  setTimeout(() => {
    resolve("后盾人");
  });
});
let p = promise.then(value => {
  return p;
});
```

解决上面的问题来完善代码，添加当前promise做为parse的第一个参数与函数结果比对

```javascript
then(onFulfilled, onRejected) {
  if (typeof onFulfilled != "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected != "function") {
    onRejected = value => value;
  }
  let promise = new HD((resolve, reject) => {
    if (this.status == HD.PENDING) {
      this.callbacks.push({
        onFulfilled: value => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        },
        onRejected: value => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        }
      });
    }
    if (this.status == HD.FULFILLED) {
      setTimeout(() => {
        this.parse(promise, onFulfilled(this.value), resolve, reject);
      });
    }
    if (this.status == HD.REJECTED) {
      setTimeout(() => {
        this.parse(promise, onRejected(this.value), resolve, reject);
      });
    }
  });
  return promise;
}
parse(promise, result, resolve, reject) {
  if (promise == result) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  try {
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  } catch (error) {
    reject(error);
  }
}
```

现在进行测试也可以得到原生一样效果了

```javascript
let p = new HD((resolve, reject) => {
  resolve("后盾人");
});
p = p.then(value => {
  return p;
});
```

### RESOLVE

下面来实现Promise的resolve方法

```javascript
static resolve(value) {
  return new HD((resolve, reject) => {
    if (value instanceof HD) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
}static resolve(value) {
  return new HD((resolve, reject) => {
    if (value instanceof HD) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
}
```

使用普通值的测试

```javascript
HD.resolve("后盾人").then(value => {
  console.log(value);
});
```

使用状态为fulfilled的promise值测试

```javascript
HD.resolve(
  new HD(resolve => {
    resolve("houdunren.com");
  })
).then(value => {
  console.log(value);
});
```

使用状态为rejected的Promise测试

```javascript
HD.resolve(
  new HD((_, reject) => {
    reject("reacted");
  })
).then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason);
  }
);
```

### REJECTED

下面定义Promise的rejecte方法

```javascript
static reject(reason) {
  return new HD((_, reject) => {
    reject(reason);
  });
}
```

使用测试

```javascript
HD.reject("rejected").then(null, reason => {
  console.log(reason);
});
```

### ALL

下面来实现Promise的all方法

```javascript
static all(promises) {
  let resolves = [];
  return new HD((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        value => {
          resolves.push(value);
          if (resolves.length == promises.length) {
            resolve(resolves);
          }
        },
        reason => {
          reject(reason);
        }
      );
    });
  });
}
```

来对所有Promise状态为fulfilled的测试

```javascript
let p1 = new HD((resolve, reject) => {
  resolve("后盾人");
});
let p2 = new HD((resolve, reject) => {
  reject("后盾人");
});
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

使用我们写的resolve进行测试

```javascript
let p1 = HD.resolve("后盾人");
let p2 = HD.resolve("houdunren.com");
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

其中一个Promise为rejected时的效果

```javascript
let p1 = HD.resolve("后盾人");
let p2 = HD.reject("rejected");
let promises = HD.all([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

### RACE

下面实现Promise的race方法

```javascript
static race(promises) {
  return new HD((resolve, reject) => {
    promises.map(promise => {
      promise.then(value => {
        resolve(value);
      });
    });
  });
}
```

我们来进行测试

```javascript
let p1 = HD.resolve("后盾人");
let p2 = HD.resolve("houdunren.com");
let promises = HD.race([p1, p2]).then(
  promises => {
    console.log(promises);
  },
  reason => {
    console.log(reason);
  }
);
```

