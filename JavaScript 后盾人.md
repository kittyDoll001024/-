[TOC]

## 一、变量提升

在代码报错时不会再从上至下的执行，浏览器会先把代码解析一遍是否有误

### - 变量提升

- **在浏览器去执行时会把 var 声明进行变量提升但不赋值**

````javascript
console.log(web)
var wab = "123"

// 变量提升
var web
console.log(web)
web = "123"
````

- **if 中的变量提升**

````javascript
function fn() {
	if(false) {
	  var web = "123"
	}
	console.log(web)
}
fn()

// 变量提升
function fn() {
	var web
	if(false) {
	  web = "123"
	}
	console.log(web)
}
fn()
````

- 解析时候 var 会声明变量提升。(使用中会有小毛病)

- let 不会提升，只会在之后生效，有块级作用域。(推荐使用)

- const  常量 

- var 、 let、 const  共同点：

  - 全局变量所有人都可访问，内部变量只有函数内部的才能访问
  - 函数内部变量赋值没有声明直接变成全局变量，若内部变量赋值声明了就变成局部变量。

- 不同点：let/const都必须先声明后使用

### - 变量声明

- 属于弱类型声明，类型是根据值发生变化的

### - 暂时性死区

在执行代码时，JavaScript 引擎会注意到后面 `let` 声明的变量，在 `let` 声明执行时，它前面的所有代码块，全部被称为 “暂时性死区” ; 其实就是 “存在了”， 但没有执行到声明处，通俗来讲就是存在了但没完全存在。

```javascript
if  (true) {
  a = 10
  console.log(a) // ReferenceError
  
  // 前面就是暂时性死区
  let a 
  console.log(a) // undefined
  
  a = 123
  console.log(a) // 123
}
```

```javascript
var a = 10
if (true) {
  /*
   * 在同一作用域下
   * 变量的一个特性，就近原则，它会赋值离自己近的
  */
  a = 123 // ReferenceError
  let a 
}
```

### - 全局污染

- 使用 'use strict' 严格模式
- 在变量使用前用 var 或 let 声明

### - 对象冻结

- 对象冻结一般用于使用 `const` 声明的对象

`const` 虽然说声明的变量是不可被修改的，其实说全了是，不可以去改变该变量的内存地址

```javascript
const str = "m78星云";
str = "小天才"  // 报错

const obj = {};
obj.name = "张思睿"  // 可以修改甚至去添加对象中的成员

const obj = Object.freeze({})
obj.name = "张思睿"  // 不可修改和添加对象中的成员，但是如果成员是引用类型怎不受影响
```

- 封装冻结对象成员

```javascript
constantize(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") {
      constantize(obj[key])
    }
  })
}

let obj = {}
constantize(obj)
obj.newobj = { name: "张思睿" }  // 无法更改
```



Object.freeze  静态锁定

- 将对象进行冻结，不可在被修改

### - 传值和传址的区别

- 在我们的数据类型为基础数据类型时的数据传递称为传值

  - ````javascript
    let a = 1;
    let b = a;
    ````

  - 在传值时，因为数据类型为基本类型，占用内存小，所以 a 会把自己的值复制一份给 b ，相当两个人在内存中开了两个栈

  - ![image-20220413102652306](https://s2.loli.net/2022/12/09/B74jbMvJ2ylnZLp.png)

- 在我们的数据类型为复杂数据类型时的数据传递称为传址

  - ````javascript
    let a = {};
    let b = a;
    ````

  - 在传值时，因为数据类型为复杂类型，占用内存较大，所以 a 会把自己在内存中的地址共享给 b ，相当于两个人在内存中公用一个栈，任意一方去修改栈中的数据，双方的数据都会被更改。

  - ![image-20220413103443019](https://s2.loli.net/2022/12/09/wvuKlQoOcCDjMUd.png)

## 二、基本类型

### - 数值扩展

- 在 `ES6` 中支持了数值分隔符，没有指定间隔的位数

```javascript
let num = 10_00_00
```

- `Number.isFinite` 检查一个数值是否为有限的/`Number.isNaN` 检查一个值是否为 `NaN`

```javascript
Number.isFinite(15) // true 此方法使用绝对相等才可为 true
Number.isNaN(10 - "a") // true
```

- `Number.isInteger` 数值是否是整数

```javascript
Number.isInteger(25.1) // false

// 在 JavaScript 内部，整数和浮点数用的是同样的存储方法
Number.isInteger(25.0) // true

// Number.isInteger 的误判结果

// Number.MIN_VALUE 为 JavaScript 中的最小值，默认会被转化为 0 去执行
Number.isInteger(Number.MIN_VALUE) // true

// 小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了
Number.isInteger(3.0000000000000002) // true
```



### - 字符串截取

- slice 方法

  ````javascript
  let str = "asdfghjkl"
  str.slice(1)  // 从第一位开始向后，找到索引为 1 的哪一位开始截取
  str.slice(1, 3)  // 从第一位开始向后，找到索引为 1 的哪一位开始截取，直到索引为 3 的哪一位（但不包括第三位）
  str.slice(-3, -1)  // 从最后一位开始，找 3 位，截取掉最后 1 位
  ````

- substring  方法

  ````javascript
  let str = "asdfghjkl"
  str.substring(1) // 从第一位开始向后，找到索引为 1 的哪一位开始截取
  str.substring(1, 3)  // 从第一位开始向后，找到索引为 1 的哪一位开始截取，直到索引为 3 的哪一位（但不包括第三位）
  str.substring(-3, -1)  // 这个函数不可以使用负数，因为负数会被解析成 0  
  ````

- substr  方法

  ````javascript
  let str = "asdfghjkl"
  str.substr(1)  // 从第一位开始向后，找到索引为 1 的哪一位开始截取
  str.substr(1, 3)  // 从第一位开始向后，找到索引为 1 的哪一位开始向后截取 3 位
  str.substr(-3, 2)  // 从最后一位开始，找 3 位，截取出前两位（第二参数不可为负数）
  ````


### - 检索字符串

- indexOf 方法
  - 检查一串字符串，如果为 true 就返回 1 ，反之就返回 -1
- includes  方法
  - 检查一串字符串，如果为 true 就返回 true ，反之就返回 false （它有一个就近原则，只要找到了，就不再执行）
- endsWith  方法
  - 检查一串字符串的末尾，携带第二参数，可指定检查位置（区分大小写）
- startsWith  方法
  - 检查一串字符串的开头，携带第二参数，可指定检查位置（区分大小写）

### - 字符串替换

- **replace 方法**
  - 用于在字符串中用一些字符串去替换另外一些字符，或替换一个与正则表达式匹配的子串


- **语法**

  ````javascript
  stringObject.replace(regexp/substr, replacement)
  ````

### - 计算方法 Math

- `Math.min`
  - 取最小值
- `Main.max`
  - 取最大值
- `Math.ceil`
  - 向上取整数（没有四舍五入）
- `Math.floor`
  - 向下取整数（没有四舍五入）
- `Math.round`
  - 四舍五入取整
- `Math.random`
  - 随机数 0 ~ 1 之间 （不会取到 0 或 1）
- `Math.trunc`
  - 只取整数

- `Math.sign`
  - 判断值是否是正数、负数、零
  - 反回值
    - 正数：+1
    - 负数：-1
    - 零：0
    - 负零：-0
    - 其它值：NaN

- `Math.cbrt`
  - 计算一个值的立方根

- `Math.imul`
  - 整数形式相乘，返回的也是一个 32 位的带符号整数


### - 日期

- new Date() 
  - 对象类型，*1 可以转化为时间戳
- Date.now()
  - 获取时间戳
- time()
  - 世家标志位开始
- timeEnd()
  - 时间标志位结束
- 转换时间戳
  - deta*1
  - Number(date)
  - date.valueOf()
  - date.getTime()

### - JS 引擎管理内存

浏览器引擎是有垃圾回收机制的

我们定义在全局作用域下的变量是无法被回收的，就算是重新赋值为 `null` 也不会被回收

只有在除全局作用域外的其它作用域内才会被垃圾回收机制回收

## 三、数组类型

在控制台能更好的查看数组元素，建议使用 console.table() 更为清晰

### - 创建数组

- 在老版的 JavaScript 时创建数组

  - 这样会创建出 6 个值为 undefined 的数组

  ````javascript
  let arr = new Array(6)
  ````

- 在新版 JavaScript 中创建数组

  - 这样可以创建出一个数组，其中有一个 元素为 6 

  ````javascript
  let arr = new Array.of(6)
  ````

### - 数组检测

- 检测是否为数组

  - isArray 方法
  - 如果是数组返回值为 true

  ````javascript
  console.log(Array.isArray([])
  ````

### - 数组转换

- 把数组转换为字符串

  - toString 方法

  ````javascript
  let arr = [].toString()
  ````

  - String 方法

  ````javascript
  let arr = String([])
  ````

  - join 方法（同时还可以拼接任何数值）

  ````javascript
  let arr = [].join("")
  ````

  - 把字符串转为数组的主要作用的便于传递

-  把字符串转为数组

  - split 方法

  ````javascript
  let str = "asdfghjkl"
  str.split(",")
  ````

  - 只要是带有 length 属性的都可以转为数组

- 对象也可以转换为 数组

  ````javascript
    let obj = {
    	name: "憨憨",
    	age: 21
    	length: 2
    }
    Array.from(obj)
  ````

  ````javascript
  Array.from(str, function(itrm) {
  	item.style.backgroundColor = red;
  	return item;
  })
  ````

  - from 方法不仅可以转换数组，还可以对数组做一些操作

### - 数组方法

- 数组方法
  - push()   在数组最后面开始增加元素
  - pop()    从数组最后面删除元素
  - unshift()  在数组的开头增加元素
  - shift()   从数组开头删除元素
  - slice()   从数组中截取部分元素组合成新的数组（并不会改变原数组），不传第二参数时截到数组的末尾
  - splice()  可以添加、删除和替换数组中的元素，会对原数组进行改变，返回值为删除的元素。删除数组元素第一个参数为从那开始删除，第二参数为删除的数量

### - 清空数组

- 清空数组

  - 将数组值修改为 `[]`可以清空数组，如果有多个引用时数组在内存中存在被其他变量引用

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    let arrLength = arr
    arr = []
    // arr 的数组元素被清空，但赋给 arrLength 的数组却保存了下来
    ````

  - 将数组 `length` 设置为 0 也可以清空数组（有多个引用时，这种方式同时会把引用的也清空）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.length = 0
    ````

  - 使用 `splice` 方法删除所有数组元素

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.splice(0, arr.length)
    ````

  - 使用 `pop`、`shift` 删除所有元素，来清空数组（pop方法只能删除一次，建议与循环配合）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    while(arr.pop()) {}
    ````

### - 数组的合并与拆分

- 合并拆分

  - join（使用 `join` 连接成字符串；可以指定转换连接方式）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.join("-")
    ````

  - split（`split` 方法用于将字符串分割成数组，类似 `join` 方法的反函数）

    ````javascript
    let arr = "1, 2, 3, 4, 5"
    arr.split(",")
    ````

  - concat （`concat` 用于连接两个或多个数组，元素是值类型的是复制操作，如果是引用类型还是指向同一对象）

    ````javascript
    let arr = ["憨憨", "梦梦"],
    let age = [21, 22]
    let year = [2001, 2002]
    arr.concat(age, year)
    
    // 在新语法中我们可以使用展开运算符
    arr = [...arr, ...age, ...year]
    ````

  - copyWithin （使用 `copyWithin` 从数组中复制一部分到数组中的另外位置）

    ````javascript
    arr.copyWithin(target, start, end)
    ````

    | 参数   | 描述                                                         |
    | ------ | ------------------------------------------------------------ |
    | target | 必须，复制到指定目标索引位置                                 |
    | start  | 可选，元素复制的起始位置                                     |
    | end    | 可选，停止复制的索引位置（默认为 array.length）。如果为负值，则表示倒数 |

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.copyWithit(2, 0, 2) // 1, 2, 1, 2, 5
    ````

### - 查找数组中的元素

- 查找元素

  - indexOf（`indexOf` 从前往后开始查找元素出现的位置，找到了就返回当前元素的索引值，找不到就返回 -1；`indexOf` 无法查找字符串类型，因为他是严格类型约束；`indexOf` 的第二参数为查找的起始位）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.indexOf(2)  // 返回值 1
    ````

  - lastIndexOf （`lastIdexOf` 从后往前查找元素的出现位置，找到了返回元素索引（索引不会跟着查找方向变化），找不到返回 -1 ；`indexOf` 的第二参数为查找的起始位）

  - includes （`includes` 查找字符串返回值是布尔类型来判断；该方法不能查找引用类型，因为它们的内存地址是不相等的）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    arr.includes(3) // true
    ````

  - find （`find` 找到后会把值返回出来，找不到返回 `undefined` ；返回第一次找到的值，便不在继续查找；可以方便查找引用类型）

    ````javascript
    let arr = [1, 2, 3, 4, 5]
    let str = arr.find(item => {
    	return item == 1 
    })
    ````

  - findIndex（`findIndex` 与 `find` 的区别就在于返回值不一样；`findIndex` 找不到时返回 -1）

### - 数组排序

- reverse （反转数组排序）

  ````javascript
  let arr = [1, 2, 3, 4, 5]
  arr.reverse()  // [5, 4, 3, 2, 1]
  ````

- sort（`sort` 每次使用两个值进行比较）

  - 返回负数 a 排在 b 前面，从小到大
  - 返回正数 b 排在 a 前面
  - 返回 0 时不动

  默认从小到大排序数组元素

  ````javascript
  let arr = [1, 3, 5, 9, 6];
  console.log(arr.sort());
  ````

  - 使用排序函数从大到小排序，参数一与参数二比较，返回正数为降数负数为升序

  ````javascript
  let arr = [11, 3, 5, 9, 6];
  console.log(arr.sort(function(v1, v2) {
      return v2 - v1 
  }));
  ````

  ````javascript
  let lessons = [
    { title: "媒体查询响应式布局", click: 78 },
    { title: "FLEX 弹性盒模型", click: 12 },
    { title: "MYSQL多表查询随意操作", click: 99 }
  ];
  
  let sortLessons = lessons.sort((v1, v2) => v2.click - v1.click);
  console.log(sortLessons);
  ````

### - 循环遍历

- for （根据数组长度结合 `for` 循环来遍历数组）

  ````javascript
  for(let i = 0; i > 5; i++) {}
  ````

- forEach （`forEach` 使函数作用在每个数组元素上，但是没有返回值）

  ````javascript
  let arr = [{name: "憨憨", age: 22}]
  arr.forEach(item => {})
  ````

- for/in （遍历时的 `key` 值为数组的索引）

  ````javascript
  let lessons = [
  	{title: '媒体查询响应式布局',category: 'css'},
    {title: 'FLEX 弹性盒模型',category: 'css'},
  	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ];
  for(let key in lessons) {}
  ````

- for/of（与 `for/in` 不同的是 `for/of` 每次循环取其中的值而不是索引）

  ````javascript
  let lessons = [
  	{title: '媒体查询响应式布局',category: 'css'},
    {title: 'FLEX 弹性盒模型',category: 'css'},
  	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ];
  for(let item of lessons) {}
  ````

### - 迭代器方法

- next （解析被迭代的对象）

  - 只要是迭代的对象都可以被 `next` 解析出来

  ````javascript
  let arr = ["请求", "威威", "呃呃呃"]
  // 解析前先返回一个迭代器对象
  let keys = arr.keys() 
  keys.next()   // value: 0, done: false
  // value: 当前元素索引
  // done: 是否被迭代
  ````

- keys（通过迭代对象获取索引）

  ````javascript
  let arr = ["请求", "威威", "呃呃呃"]
  let keys = arr.keys()
  keys.next() // value: 0
  ````

- value（通过迭代对象获取值）

  ````javascript
  let arr = ["请求", "威威", "呃呃呃"]
  let value = arr.values()
  value.next() // value: "请求", done: false
  ````

- entries（返回数组所有的键和值；相当于是 `keys` 和 `values` 的合并）

  ````javascript
  let arr = ["请求", "威威", "呃呃呃"]
  let entries = arr.entries()
  entries.next()
  ````

  - entries 的返回值是一个对象，要获取 value 我们可以使用解构赋值的方式进行解构

  ![image-20220415153911251](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220415153911251.png)

- 我们为什么要使用数组的迭代对象来操作数组，这样显得很麻烦
  
  - 因为在我们的需求中有时会需要在遍历的过程中进行 `add` 或 `remove` 但是我们的普通遍历中无法进行修改，这时就需要使用数组的迭代了

### - 数组的扩展方法

- every（`every` 用于递归的检测元素，所有的元素的返回值都为真结果才为真；如果为假则只执行一次）

  ````javascript
  const user = [
    { name: "李四", js: 89 },
    { name: "马六", js: 55 },
    { name: "张三", js: 78 }
  ];
  let resust = user.every(item => {
     return item.js >= 60
  })
  console.log(resust ? "及格": "不及格");  // 不及格
  ````

- some （`some` 可以递归的检查元素，如果有一个为真则表达式为真；如果为假则全部执行）

  ````javascript
  const user = [
    { name: "李四", js: 89 },
    { name: "马六", js: 55 },
    { name: "张三", js: 78 }
  ];
  let resust = user.some(item => {
     return item.js >= 60
  })
  console.log(resust ? "及格": "不及格");  // 及格
  ````

- filter（`filter` 可以过滤数据中的元素）

  ````javascript
  let arr = [
     {title: '媒体查询响应式布局',category: 'css'},
     {title: 'FLEX 弹性盒模型',category: 'css'},
     {title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ]
  let resust = arr.filter(item => {
     return item.category.indexOf("css") !== -1
  })
  console.table(resust)
  ````

  - 过滤函数的原理

  ![image-20220415170515059](https://s2.loli.net/2022/12/13/7P8KtOodsRqiCFb.png)

- map（`map` 映射可以在数组的所有元素上应用的函数，用于映射出新的值，最后返回一个新的数组 (不改变原数组；看数据类型)）

  ````javascript
  let lessons = [
    {title: '媒体查询响应式布局',category: 'css'},
    {title: 'FLEX 弹性盒模型',category: 'css'},
    {title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ];
  lessons = lessons.map(function (item, index, array) {
      item.title = `[后盾人] ${item['title']}`;
      return item;
  });
  ````

  - 在我们的数据为 复杂数据类型时因为传址的原因不想去改变原数组

  ````javascript
  let lessons = [
    {title: '媒体查询响应式布局',category: 'css'},
    {title: 'FLEX 弹性盒模型',category: 'css'},
    {title: 'MYSQL多表查询随意操作',category: 'mysql'}
  ];
  let resust = lessons.map(value => {
  	retunr {
  		title: value.title,
  		category: value.category,
  		click: 100
  	}
  })
  
  lessons  // 返回的还是原数组
  resust   // 返回的就是原数组中的元素加上被修改后的元素重新组成的新数组
  ````

- reduce（`reduce` 与 `reduceRight` 函数可以迭代数组的所有元素，`reduce` 是从前开始 `reduceRight` 是从后面开始）

  - reduce 的两个参数（第一个参数：执行函数；第二个参数：是初始值）

  ````javascript
  let arr = [1, 3, 2, 9]
  arr.reduce((pev, cur) => {
  	return pev > cur ? pev : cur 
  }, 0)
  ````

## 四、Symbol

### - Symbol

**概念：`Symbol` 用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。`Symbol` 的值是唯一的，是不会重复的。**

- `Symbol` 的数据类型就是 `Symbol` 

-  `Symbol` 不可以添加属性

  ````javascript
  let symbol = Symbol()
  symbol.name = "憨憨"
  ````

- `Symbol` 中可传入字符串作为 `Symbol` 的描述，方便在控制台分辨 `Symbol` 

  ````javascript
  let symbol Symbol("symbol的描述")
  console.log(symbol)  // Symbol("symbol的描述")
  ````

  - 传入相同描述的 `Symbol` 也是独立唯一的；但是用 `Symbol.for` 则不会

  ````javascript
  let symbol = Symbol("憨憨")
  let symbol1 = Symbol("憨憨")
  console.log(symbol == symbol1)  // false
  ````

  - 使用 `description` 可以获取 `Symbol` 的描述参数

  ````javascript
  let symbol = Symbol("憨憨")
  console.log(symbol.description)  // 憨憨
  ````

- `Symbol.for` 在内存中开辟一个内存来记录

  - 使用 `Symbol.for` 定义的会在全局保存
  - 使用普通的 `Symbol` 定义的不是在在全局定义，我们是读取不到的

  ````javascript
  let symbol = Symbol.for("憨憨")
  let symbol1 = Symbol.for("憨憨")
  console.log(symbol == symbol1)  // true
  ````

- `Symbol.keyFor` 获取根据使用 `Symbol.for` 登记的 Symbol 返回的描述，如果找不到则返回 undefined

  ````javascript
  let symbol = Symbol.for("憨憨")
  let symbol1 = Symbol.for("憨憨")
  
  // 使用 description 也可以获取到暂时还知道有什么区别 
  console.log(symbol.description)
  console.log(Symbol.keyFor(symbol1))
  ````

  ----
### - 对象属性


  **（`Symbol` 是独一无二的所以可以保证对象属性的唯一性）**

  - `Symbol` 声明和访问使用 `[]` (变量) 形式操作
  - 也不能使用 `.` 语法因为 `.` 语法是操作字符串属性的

  ````javascript
  let symbol = Symbol()
  let obj = {
    [symbol]: "houdunren.com"
  }
  console.log(obj[symbol]);
  ````

---

### - 遍历属性

**（`Symbol` 不能使用 `for/in` 、`for/of` 遍历操作）**

```` javascript
let symbol = Symbol("时间节点")
let obj = {
  name: "hacms.cn",
  [symbol]: "houdunren.com"
}

// for/in
for(const key in obj) {
	console.log(key)  // name 
}

// for/of
for(const key of Pbject.keys(obj)) {
	console.log(key)  // name
}
````

- 可以使用 `Object.getOwnPropertySymbols` 获取所有 `Symbol` 属性

````javascript
for(const key of Object.getOwnPropertySymbols(obj)) {
	console.log(key)  // Symbol("时间节点")
}
````

- 使用 `Reflect.ownKeys(obj)` 获取所有属性包括 `Symbol`

````javascript
for(const key in Reflect.ownKeys(obj)) {
	console.log(key)
		// name
		// Symbol("时间节点")
}
````

## 五、Set

**概念：用于存储任何类型的唯一值，无论是基本类型还是对象引用**

- 只能保存值没有键名
- 严格类型检测如字符串数字不等于数值数字
- 值是唯一的，不可重复值
- 遍历顺序是添加的顺序，方便保存回调函数

----

### - 基本使用

- 使用对象作为键名时，会将对象转为字符串后使用

  ````javascript
  let obj = { 1: "hdcms", "1": "houdunren" };
  console.table(obj); // 对象原内容
  
  let hd = { [obj]: "后盾人" };
  console.table(hd);  // [object]: "后盾人"
  ````

- 使用数组做初始值

  ````javascript
  let set = new Set(["qwq", "owo"])
  console.log(set)  // {"qwq", "owo"}
  ````

- Set 是严格类型约束

  ````javascript
  let set = new Set() 
  set.add(1)
  set.add("1")
  console.log(set)  // {1, "1"}
  ````

-----

### - 添加元素

- 使用 `add` 添加元素，不允许添加重复的值

  ````javascript
  let set = new Set()
  set.add("憨憨")
  set.add("梦梦")
  // 这时候已经添加好了两个值
  set.add("憨憨")  // 检测到已有该元素便不在重复添加
  ````

----

###  - 获取数量

- 获取元素数量

  ````javascript
  let set = new Set(["憨憨", "梦梦"])
  console.log(set.size)  // 2
  ````

----

### - 删除元素

- 使用 `delete` 方法删除单个元素，返回值为 `boolean` 类型

  ````javascript
  let set = new Set(["qwq", "owo"])
  set.delete("qwq")
  console.log(set);  // {"owo"}
  ````

- 使用 `clear` 清空所有元素

  ````javascript
  let set = new Set(["qwq", "owo"])
  set.clear()
  console.log(set);  // {size: 0}
  ````

----

### - 元素检测

- 检测元素是否存在

  ````javascript
  let set = new Set(["qwq", "owo"])
  console.log(set .has("qwq"))  // true
  ````

-----

### - 数组转换

- 使用 `展开语法` 或 `Array.form` 将 Set 类型转为数组

  ````javascript
  // 展开语法
  let set = new Set(["qwq", "owo"])
  console.log([...set]);  // ["qwq", "owo"]
  
  // Array.form
  let set = new Set(["qwq", "owo"])
  console.log(Array.from(set));  // ["qwq", "owo"]
  ````

  - **set 对于数组去重很是方便**

-----

### - 遍历数据

- 使用 `keys / values / entries ` 都可以返回迭代对象，因为 `set` 类型只有值所以 `keys / values ` 的结果一致

  ````javascript
  const hd = new Set(["hdcms", "houdunren"]);
  console.log(hd.values()); //SetIterator {"hdcms", "houdunren"}
  console.log(hd.keys()); //SetIterator {"hdcms", "houdunren"}
  console.log(hd.entries()); //SetIterator {"hdcms" => "hdcms", "houdunren" => "houdunren"}
  ````

- 可以使用 `forEach` 遍历 Set 数据，默认使用 `values` 方法创捷迭代器（为了保持和遍历数组参数同意，函数中的 value 和 key 是一样的）

  ````javascript
  let arr = [7, 6, 2, 8, 2, 6];
  let set = new Set(arr);
  //使用forEach遍历
  set.forEach((item,key) => console.log(item,key));
  ````

- 也可以使用 `forof` 遍历 Set 数据，默认使用 `values` 方法创建迭代器

  ````javascript
  let arr = [7, 6, 2, 8, 2, 6];
  let set = new Set(arr);
  //使用forof遍历
  for(let item of set) {
  	console.log(item)
  }
  ````

----

### - 并集、交集、差集

- 交集（两个集合中共同存在的元素）

  ````javascript
  let a = new Set([1, 2, 3, 4, 5])
  let b = new Set([2, 4, 6, 8, 1])
  let set = new Set(
  	[...a].filter(item => {
  	  return	b.has(item)
  	})
  )
  console.log(set)  // [1, 2, 4]
  ````

- 差集（在集合a中出现但不在集合b中出现元素集合）

  ````javascript
  let a = new Set([1, 2, 3, 4, 5])
  let b = new Set([2, 4, 6, 8, 1])
  let set new Set(
  	[...a].filter(item => {
  		return !b.has(item)
  	})
  )
  console.log(set)  // [3, 5]
  ````

- 并集（将两个集合合并成一个新的集合，由于Set特性当然也不会产生重复元素）

  ````javascript
  let a = new Set([1, 2, 3, 4, 5])
  let b = new Set([2, 4, 6, 8, 1])
  let set = new Set([...a, ...b])
  console.log(set) // [1, 2, 3, 4, 5, 6, 8]
  ````

----

### - WeakSet

`WeakSet` 解构同样不会存储重复的值，他的成员必须只能是对象类型的值。

- 垃圾回收不考虑 `WeakSet` ，即被 WeakSet 引用时引用计数器不加一，所以对象不被引用时不管 WeakSet 是否在使用都将删除

- 因为 WeakSet 是弱引用，由于其他地方操作成员可能不存在，所以不可进行 `forEach()` 遍历等操作

- 也是因为弱引用， WeakSet 结构没有 keys(), values(), entries() 等方法和 size 属性

- 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用 `WeakSet`

- 声明定义

  ````javascript
  // 不可这样定义，因为 WeakSet 中的数组元素会被解析成两个字符串直接使用。
  let weakSet = new WeakSet(["憨憨", "梦梦"])
  
  
  // WeakSet 的值必须为对象类型
  let weakSet = new WeakSet([["憨憨", "梦梦"]])
  ````

- 基本操作

  ````javascript
  let weak = new WeakSet()
  const arr = ["憨憨", "梦梦"]
  // 添加操作
  weak.add(arr)
  // 删除操作
  weak.delete(arr)
  // 检索判断
  weak.has(arr)
  ````


- 垃圾回收机制

  WeakSet 保存的对象不会增加引用计数器，如果一个对象不会被引用了会自动删除

  - 下列中的数组被 `arr` 引用了，引用计数器 + 1
  - 数据又添加到了 weak 中 `WeakSet` 中，引用计数器还是 1
  - 当 `arr` 设置为 null 时，引用计数器为 -1 此时对象引用为 0 
  - 当垃圾回收时对象被删除，同时垃圾回收机制一样是有一定的执行时间，如果在这个时间段内还是可以继续被引用

  ````javascript
  let weak = new WeakSet()
  let arr = ["憨憨", "梦梦"]
  weak.add(arr)
  arr = null
  
  console.log(arr);  // null
  
  console.log(weak);  // WeakSet {Array(2)}
  setTimeout(() => {
    console.log(weak);  // WeakSet {}
  }, 1000)
  ````

- 案例

  ````html
  <style>
   * {
      padding: 0;
      margin: 0;
    }
    body {
      padding: 200px;
    }
    ul {
      list-style: none;
      display: flex;
      width: 200px;
      flex-direction: column;
    }
    li {
      height: 30px;
      border: solid 2px #e67e22;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      color: #333;
      transition: 1s;
    }
    a {
      border-radius: 3px;
      width: 20px;
      height: 20px;
      text-decoration: none;
      text-align: center;
      background: #16a085;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
    }
    .remove {
      border: solid 2px #eee;
      opacity: 0.8;
      color: #eee;
    }
    .remove a {
      background: #eee;
    }
  </style>
  <body>
  	<ul>
      <li>凄凄切切<a href="javascript:;">x</a></li>
      <li>吾问无为<a href="javascript:;">x</a></li>
      <li>柔柔弱弱<a href="javascript:;">x</a></li>
    </ul>
    <script>
    	class Todo {
        constructor() {
        	// 获取到所有的 li 
          this.items = document.querySelectorAll("ul>li");
          // 创建 WeakSet
          this.weak = new WeakSet()
          // 把 li 添加到 weak 中
          this.items.forEach(item => {
            this.weak.add(item)
          })        
        }
        run() {
          this.addEvent()
        }
        addEvent() {
          this.items.forEach(element => {
          	// 获取 a 并添加点击事件
            element.querySelector("a").addEventListener("click", event => {
            	// 找到 li 
              const parentElement = event.target.parentElement
              // 检测 weak 是否存在 li
              if(this.weak.has(parentElement)) {
              	// 存在就删除
                parentElement.classList.add("remove")
                this.weak.delete(parentElement)
              }else {
               // 不存在就添加
                parentElement.classList.remove("remove")
                this.weak.add(parentElement)
              }
            })
          })
        }
      }
      new Todo().run()
    </script>
  </body>
  ````

## 六、Map

**Map 是一组键值队的结构，用于解决以往不能用对象做为键的问题**

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

----

### - 声明定义

- 可以接受一个数组作为参数，该数组的成员是一个表示键值队的数组

  ````javascript
  let map = new Map([
    ["hh", "憨憨"], 
    ["mm", "梦梦"]
  ])
  ````

- 使用 `set` 方法添加元素，支持链式操作

  ````javascript
  let map = new Map()
  let obj = {
      name: "憨憨"
  }
  map.set(obj, "梦梦").set("name", "红鲤")
  console.log(map);  // Map(2) {{…} => '梦梦', 'name' => '红鲤'}
  ````

- 使用构造函数 `new Map` 创建的原理如下

  ````javascript
  let map = new Map()
  let arr = [
    ["name", "红鲤"],
    ["age", "23"]
  ]
  arr.forEach(([key, value]) => {
    map.set(key, value)
  })
  console.log(map);   // Map(2) {'name' => '红鲤', 'age' => '23'}
  ````

- 键是对象的 `Map` ，键保存的是内存地址，值相同但内存地址不同的视为两个键

  ````javascript
  let hl = ["红鲤"]
  let map = new Map()
  map.set(hl, "跃然")
  console.log(map.get(hl));  // 跃然
  console.log(map.get(["红鲤"]));  // undefined
  ````

----

### - 获取数量

**获取数据数量**

````javascript
consolg.log(map.size) // 1
````

----

### - 读取元素

````javascript
let map = new Map()
let obj = {
  name: "红鲤"
}
map.set(obj, "梦梦")
console.log(map.get(obj));  // 梦梦
````

----

### - 删除元素

**使用 `delete()` 方法删除单个元素**

````javascript
let map = new Map()
let obj = {
  name: "红鲤"
}
map.set(obj, "梦梦")
map.delete(obj)
console.log(map.get(obj));  // undefined
````

**使用 `clear` 方法清除 Map 所有元素**

````javascript
let map = new Map()
let obj = {
  name: "红鲤"
}
let obj1 = {
  name: "跃然"
}
map.set(obj, {
  title: "一尾红鲤"
})
map.set(obj1, {
  title: "跃然心上"
})
map.clear(obj, obj1)
console.log(map.get(obj));  // undefined
console.log(map.get(obj1)); // undefined
````

----

### - 遍历数据

**使用`keys()/value()/entries()`都可以返回可遍历的迭代对象**

````javascript
let map = new Map([
  ["name1", "憨憨"],
  ["name2", "梦梦"]
])
console.log(map.keys());  // 键
console.log(map.values());  // 值
console.log(map.entries());  // 键值队
````

- 可以使用 `forof/forEach` 来进行遍历数据

````javascript
// forof
for (const [key, value] of map.entries()) {
  console.log(key);
  console.log(value);
}

// forEach
map.forEach((value, key) => {
  console.log(key);
  console.log(value);
})
````

----

### - 数组转换

**可以使用`展开语法` 或 `Array.form` 静态方法将 set 类型转为数组，这样就可以使用数组处理函数**

````javascript
let mapp = new Map([
  ["name1", "憨憨"],
  ["name2", "梦梦"]
])
console.log(...mapp.keys());  // 键
console.log(...mapp.values());  // 值
console.log(...mapp.entries());  // 键值队
console.log(...mapp);  // 键值队 
````

----

### - 节点集合

**map的key可以为任意类型**

````html
<body>
	<div name="一尾红鲤">yiweihongli</div>
  <div name="跃然心上">yueranxinshang</div>
</body>
<script>
	let map = new Map()
  document.querySelectorAll("div").forEach(item => {
    map.set(item, {
      content: item.getAttribute("name")
    })
  })
  map.forEach((value, key) => {
    key.addEventListener("click", () => {
      alert(value.content)
    })
  })
</script>
````

**案例：提交表单**

````html
<body>
	<form action="https://www.baidu.com/" onsubmit="return post()">
      接受协议:
      <input type="checkbox" name="agreement" message="请接受接受协议" />
      我是学生:
      <input type="checkbox" name="student" message="网站只对学生开放" />
      <input type="submit" />
    </form>
</body>
<script>
	function post() {
  let map = new Map()
  let ipt = document.querySelectorAll("[message]")
  ipt.forEach(item => {
    map.set(item, {
      content: item.getAttribute("message"),
      checked: item.checked
    })
  });
  return [...map].every(([key, value]) => {
    value.checked || alert(value.content)
    return value.checked
  })
 }
</script>
````

----

### - WeakMap

WeakMap 对象是一组键/值对的集

- 键名必须是对象
- Weak Map 对键名是弱引用的，键值是正常引用
- 垃圾回收不考虑 WeakMap 的键名，不会改变引用计数器，键在其他地方不被引用时即删除
- 因为 Weak Map 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行 `forEach()` 遍历
- 也是因为弱引用，Weak Map 结构没有 `keys()/values()/entries()` 等方法和 `size` 属性
- 当键的外部引用删除时，希望自动删除数据时使用 `WeakMap`

**声明定义**

````javascript
let weak = new WeakMap()
````

----

**基本操作**

````javascript
let weak = new WeakMap()
let arr = ["青云"]
// 添加
weak.set(arr, "平步")
// 删除
weak.delete(arr)
// 检索
weak.has(arr)
````

----

**垃圾回收**

WeakMap 的键名对象不会增加引用计数器，如果一个对象不被引用了会自动删除

- 当 `hd` 删除时内存即删除，因为 Weak Map 是弱引用不会产生引用计数
- 当垃圾回收时因为对象被删除，这时 WeakMap 也就没有记录了

````javascript
let hd = {name: "后盾人"}
let cms = hd
let weak = new WeakMap()
weak.set(hd, "houdunren.com")
cms = null
hd = null
setTimeout(() => {
  console.log(weak); 
}, 10000);
````

----

**案例**

````html
<style>
* {
    padding: 0;
    margin: 0;
  }
  body {
    padding: 20px;
    width: 100vw;
    display: flex;
    box-sizing: border-box;
  }
  div {
    border: solid 2px #ddd;
    padding: 10px;
    flex: 1;
  }
  div:last-of-type {
    margin-left: -2px;
  }
  ul {
    list-style: none;
    display: flex;
    width: 200px;
    flex-direction: column;
  }
  li {
    height: 30px;
    border: solid 2px #e67e22;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    color: #333;
    transition: 1s;
  }
  a {
    border-radius: 3px;
    width: 20px;
    height: 20px;
    text-decoration: none;
    text-align: center;
    background: #16a085;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
  .remove {
    border: solid 2px #eee;
    opacity: 0.8;
    color: #eee;
  }
  .remove a {
    background: #eee;
  }
  p {
    margin-top: 20px;
  }
  p span {
    display: inline-block;
    background: #16a085;
    padding: 5px;
    color: white;
    margin-right: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>
<body>
 <div>
      <ul>
        <li><span>php</span> <a href="javascript:;">+</a></li>
        <li><span>js</span> <a href="javascript:;">+</a></li>
        <li><span>向军讲编程</span><a href="javascript:;">+</a></li>
      </ul>
    </div>
    <div>
      <strong id="count">共选了0门课</strong>
      <p id="lists"></p>
    </div>
</body>
<script>
	class Lesson {
  constructor() {
  	// 获取 li
    this.lis = document.querySelectorAll("ul>li")
    // 获取 统计
    this.countElem = document.getElementById("count")
    // 获取显示课程
    this.listElem = document.getElementById("lists")
    // 创建 weakMap
    this.weak = new WeakMap()
  }
  run() {
  	// 点击添加课程效果
    this.lis.forEach(item => {
      item.querySelector("a").addEventListener("click", (event) => {
        const a = event.target
        const state = item.getAttribute("select")
        if(state) {
          item.removeAttribute("select")
          this.weak.delete(item)
          a.innerHTML = "+"
          a.style.backgroundColor = "pink"
        }else {
          item.setAttribute("select", true)
          this.weak.set(item)
          a.innerHTML = "-"
          a.style.backgroundColor = "red"
        }
        this.render()
      })
    })
  }
  // 添加课程统计
  count() {
    return [...this.lis].reduce((key, value) => {
      return (key += this.weak.has(value) ? 1 : 0)
    }, 0)
  }
  // 添加课程的信息
  lists() {
    return [...this.lis].filter(item => {
      return this.weak.has(item)
    }).map(item1 => {
      return `<span>${item1.querySelector("span").innerHTML}</span>`
    })
  }
  // 右侧统计栏
  render() {
    this.countElem.innerHTML = `共选了${this.count()}门课`
    this.listElem.innerHTML = this.lists().join("")
  }
}
new Lesson().run()
</script>
````

----

## 七、函数

### - 函数声明方式的优先级

- **标准声明的函数优先级更高，解析器会优先提取函数并放在代码树顶端，所以标准声明函数位置不限制**
- **标准声明优先级高于赋值声明**

### - 声明定义

**在 JS 中函数也是对象函数是 `Function` 类的创建的实例**

````javascript
let fn = function(str) {
	console.log(str)
}
fn("青云")
````

**标准语法是使用函数声明定义的**

````javascript
function fn(str) {
	console.log(str)
}
fn("樱花")
````

**对象字面量的方式**

````javascript
let obj = {
	fn(value) {
		console.log(value)
	}
}
obj.fn("毕方")
````

**全局函数会声明在 window 对象中**

当函数名与 window 中的方法函数重名时，window 方法函数会被覆盖（这是个历史遗留问题）

当然也不是不可能解决的，在后面我们会学到使用模块化的形式来解决这一类问题

````javascript
function screenX() {} screenX()
// window 被覆盖
window.screenX()
````

**使用 `var` 来声明函数**

可以使用 window.函数名 的方式来调用函数，这时候我们的函数是声明在全局的

````javascript
var fn = function(str) {
	console.log(str)
}
window.fn()
````

**使用 `let/const` 来声明函数**

这时候就无法使用 window.函数名 的方式来调用函数，因为 `let/const` 是有局部作用域的

```javascript
let fn = function(str) {
	console.log(str)
}
window.fn()  
```

----

### - 如何调用（执行）函数

```javascript
let obj = {}

let fn = function () {
  console.log("哈哈哈")
}

/*
* 1. fn()  直接调用
* 2. obj.fn()  通过对象调用，前提是函数与对象有关联
* 3. new fn()  通过 new 来调用
* 4. fn.call(obj) / fn.apply(obj)  临时让 fn 成为 obj 的方法
*   - 相当于 obj.fn() 来调用函数
*   - 可以让一个函数成为指定任意对象的方法调用
*/
```

### - 匿名函数

**函数对象可以通过赋值指向到函数对象的指针，指针也可以传递给其他变量。注：一定要以 `;` 来结尾**

````javascript
let fn = function(str) {
	console.log(str)
}
let cms = fn
cms("肖申克")
````

----

### - 立即执行函数

立即执行函数指的就是定义时立即执行

- 可以用来定义私有作用域防止全局污染

```javascript
// 向 window 节点增添一个节点
// 1. 
(function(window) {
	let str = "月蝉"
	function fn() {
    console.log("晓晓")
  }
	// 也可以使用 window 来导出
	window.str1 = { 
    str,
    fn 
  }
})(window)

// 使用方式
str1.str
str1.fn()

// 2.
(function () {
  let a = 1;
  function fn() {
    console.log(++a)
  }
  window.$ = function () {  // 向外暴露一个全局函数
    return {
      fn
    }
  }
})()

// 使用
$().fn()
```

- 使用 `let / const` 有块级作用域的特性

```javascript
{
  let str= "1.js"
  function fn() {
    console.log("晓晓")
  }
  window.str1 = { str, fn}
}

// 使用方式
str1.str
str1.fn()
```

----

### - 函数提升

-  函数也会提升到前面，优先级行于 `var` 变量提高

```javascript
console.log(str())
function str() {
	return "清灵"
}
```

- 变量函数定义不会被提升

```javascript
console.log(fn())
let fn = function() {
	return "安迪"
}
```

### - 形参与实参

形参是在函数声明时设置的参数，实参是指在调用函数时传递的值

- 形参数量大于实参时，没有传参的形参值为 `undefined`
- 实参数量大于形参时，多于的实参将忽略并不报错

```javascript
// n1, n2 为形参
function fn(n1, n2) {
 return n1 + n2
}
// 3, 4 为实参
console.log(fn(3, 4))
```

### - 默认参数

旧版本中的默认参数

```javascript
function fn(total, year) {
	year = year || 1
  return total / year
}
console.log(fn(2000, 11))
```

新版本中的默认参数

```javascript
function fn(total, year = 1) {
	return total / year
}
console.log(fn(2000, 11))
```

### - 函数参数

函数参数也可以说是 **回调函数** 

怎么理解回调函数呢？

所有的以函数为参数的函数都叫做回调函数

当函数为回调函数时，是可以从表达式中抽离出来的（个人觉得有点脱裤子放屁的感觉）

### - arguments

**arguments** 是函数获得所有参数集合

使用时更建议使用 展开的形式来使用 arguments

```javascript
function fn() {
	console.log(arguments)  // [1, 2, 3, 4, 5] 伪数组
}
fn(1, 2, 3, 4, 5)
```

### - 箭头函数

箭头函数是函数声明的简写形式，在使用递归调用、构建函数、事件处理器时不建议使用箭头函数

- 当形数为一个时可以把括号省略掉
- 函数体为一行表达式时 `return` 可以简化掉
- 无参数时使用括号即可

````javascript
let arr = [1, 2, 3, 4, 5].filter.(item => item <3 )
console.log(arr)
````

### - 递归调用

递归主要指函数内部调用自身的方式

- 主要用于数量不确定的循环操作
- 要有退出时机否则会陷入死循环

```javascript
function f (n,a,b,c) {
  if (n == 1) {  //当为一片时，直接移动
     document.write("移动 【盘子" + n + "】从【" + a + "柱】到【" + c + "柱】<br>");
  } else {
     f (n - 1, a, c, b);  //调整参数顺序。让参数a移给b
     document.write("移动 【盘子" + n + "】从【" + a + "柱】到【" + c + "柱】<br>");
     f(n - 1, b, a, c);  //调整顺序，让参数b移给c
  }
}
f(3, "A", "B", "C");  //调用汉诺塔函数
```

```javascript
function fn(...arge) {
  if(arge.length === 0) {
    return 0
  }
  return arge.shift() + fn(...arge)
}
console.log(fn(1, 2, 8, 4, 5, 6));
```

- 我们去改变递归函数的指针指向时会发生错误
- arguments.callee   是指当前正在执行的函数（此方法不可在严格模式中使用）

```javascript
// 错误
function fn(num) {
	if(num <= 1) {
		return 1
	}
	return num * fn(num-1)
}
let t = fn
fn = null
t(5)

// 修改
function fn(num) {
	if(num <= 1) {
		return 1
	}
	return num * arguments.callee(num-1)
}
let t = fn
fn = null
console.log(t(5));
```

### - 回调函数

- 什么函数叫做回调函数
  1.  你定义的
  2. 你没有调用
  3. 但最终函数执行

在某个时刻被其他函数调用的函数称为回调函数

所有被当做实参去进传递的函数都叫做回调函数

```javascript
let arr = [1, 2, 3, 4].map(item => item += 10)
```

- 用法

```javascript
function fn(message, callback) {
  setTimeout(() => {
    console.log(message)
  }, 2000)
  callback()
}

function fn1() {
  console.log("回调函数")
} 

fn("哈哈哈", fn1)
```

### - 展开语法

展开语法或者称为点语法体现的就是 `收/放` 特性，做为值时是 `放`，作为接收变量时是 `收`

```javascript
let arr = [1, 2, 3, 4]
// 放
let [a, b, c, d] = [...arr]
// 收
let [...arr] = [1, 2, 3, 4]
```

展开语法还可以代替函数中的 `arguments` 来接收任意参数

在多个参数时，一般放在函数形参中的最后

```javascript
function fn(...args) {}
fn(1, 2, 3, 4)
```

### - this

调用函数时 `this` 会隐式传递给函数调用时的关联对象，也称之为函数的上下文

#### - this 是什么

- 任何函数本质上都是通过某个对象来调用的

  - 演示

  ```javascript
  // 这时的 fn 函数没有明确的指向任意对象，所以直接使用顶级对象 window 来调用
  function fn() {
    console.log(this)  // window
  }
  fn()
  
  // 这时的 fn1 函数明确的指向来 obj 这个对象，成为了 obj 的临时函数方法，所以 this 指向 obj
  let obj = {}
  function fn1() {
    console.log(this)  // obj
  }
  fn1.call(obj)
  ```


#### setTimeout 和 setInterval 中的 this 指向问题

- 因为 `setTimeout` 与 `setInterval` 都属 window 顶级对象身上的方法默认是指向 window 
- 在箭头函数中没有 this ，它的 this 是继承父级执行上下文中的 this

```javascript
// setTimeout 与 setInterval 雷同 
function Fn() {
  setTimeout(function () {
  	console.log(this)  // window
	})
}
let p = new Fn()

function Fn() {
  setTimeout(function () {
  	console.log(this)  // Fn
	})
}
let p = new Fn()
```



#### 函数调用

- 全局环境下 `this` 就是 window 对象的引用

  ````javascript
  <script>
    console.log(this); // window
  </script>
  ````

- 使用严格模式时在全局函数内的 `this` 为 `undefined`

#### 方法调用

函数为对象的方法时 `this` 指向该对象

##### 构造函数

函数当被 `new` 时即为构造函数，一般构造函数中包含属性与方法。函数中的上下文指向到实例对象

- 构造函数主要用来生成对象，里面的 `this` 默认指向当前对象


  ```javascript
  function str() {
    this.name = "憨憨";
    this.show = function() {
      console.log(this);
    }
  }
  let fn = new str()
  fn.show()
  ```

#####   对象字面量

指针指向当前对象

```javascript
let obj = {
  name: "憨憨",
  show: function() {
    console.log(this);
  }
}
obj.show()
```

指针指向 `window`

当我们的指针的上下文的函数为普通函数则指针指向顶级 `window`

```javascript
let obj = {
  name: "憨憨",
  show: function() {
    function fn() {
      console.log(this);
    }
    fn()
  }
}
obj.show()
```

#### 在特殊情况下如何使用当前对象的 `this`

##### 一、在使用一些高阶函数时，它们本身可以传入一个返回值。例如`forEach/map/every...`

```javascript
let obj = {
  name: "憨憨",
  lists: ["js", "css", "mysql"],
  show() {
    return this.lists.map(function(item) {
      return `${this.name}学${item}`
    }, this)
  }
}
console.log(obj.show());
```

##### 二、在父级把 `this` 保存下来

```javascript
let obj = {
  name: "憨憨",
  lists: ["js", "css", "mysql"],
  show() {
  	const _this = this
    return this.lists.map(function(item) {
      return `${_this.name}学${item}`
    })
  }
}
console.log(obj.show());
```

##### 三、使用 `ES6` 箭头函数，箭头函数因为没有作用域的概念，所以 `this` 一直指向本身的上下文对象

箭头函数根据自身需要来定义

如果多次使用函数本身的DOM对象时不建议使用箭头函数

如果多次使用上下文对象，则建议使用箭头函数

```javascript
let obj = {
  name: "憨憨",
  lists: ["js", "css", "mysql"],
  show() {
    return this.lists.map(item => {
      return `${this.name}学${item}`
    })
  }
}
console.log(obj.show());
```

#### apply / call / bind

改变 `this` 指针，也可以理解为对象借用方法

##### apply / call

`call` 与 `apply` 用于显示的设置函数的上下文 ，两个方法作用一样都是将对象绑定到 `this` ，知识在传递参数上有所不同。

- `apply` ：用数组传递参数
- `call` ： 需要分别传递参数
- 与 `bind` 不同 `apply / call` 会立即执行函数

```javascript
let a = {
  name: '安迪'
}

let b = {
  name: '瑞德'
}

function fn() {
  console.log(this.name);  // 安迪
}
fn.call(a) 
```

##### bind

`bind()` 是将函数绑定到某个对象

- 与 `call / apply` 不同 `bind`  不会立即执行
- `bind` 是复制函数行为会返回新函数

```javascript
let a = function() {};
let b = a;
console.log(a === b); //true
//bind是新复制函数
let c = a.bind();
console.log(a == c); //false
```

`bind` 可以拥有多次传递参数

```javascript
function hd(a, b) {
  return this.f + a + b;
}
//使用bind会生成新函数/ 第一次传递参数
let newFunc = hd.bind({ f: 1 }, 3);
// 第二次传递参数(会优先使用第一次参数)
newFunc(2)
```

案例：

```html
<style>
  * {padding: 0;margin: 0;}
  body {
    width: 100vw;
    height: 100vh;
    font-size: 3em;
    padding: 30px;
    transition: 2s;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #34495e;
    color: #fff;
  }
</style>
<body>
  春赏百花冬观雪，醒亦念卿，梦亦念卿
  <script>
  function Color(elem) {
    this.elem = elem
    this.back = ["#451236", "#784123", "#852963", "#74123"]
    this.run = function() {
      setInterval(function() {
        let math = Math.floor(Math.random() * this.back.length)
        this.elem.style.background = this.back[math]
      }.bind(this), 1000);
    }
  }
  let a = new Color(document.body)
  a.run() 
  </script>
```

## 八、作用域与闭包

**在JavaScript权威指南中，有一个关于闭包和垃圾回收之间的关系的详细描述：**

我们将作用域链描述为一个对象列表，不是绑定的栈。每次调用JavaScript函数的时候，都会为之创建一个新的对象用来保存局部变量，把这个对象添加至作用域链中。当函数返回的时候，就从作用域链中将这个绑定变量的对象删除。如果不存在嵌套函数，也没有其他引用指向这个绑定对象，它就会被当做垃圾回收掉。如果定义了嵌套函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来，那么它们也会和所指向的变量绑定对象一样当做垃圾回收，但是如果这个函数定义了嵌套函数，并将它作为返回值返回或者存储在某处的属性里，这时就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收。

### - 作用域

**全局作用域只有一个，每个函数又都有作用域（环境）**

- 编译器运行时会将变量定义在所在作用域
- 使用变量时会从当前作用域开始向上查找变量
- 作用域就像攀亲戚一样，晚辈总是可以向长辈要些东西

#### 环境作用域

**作用域链只向上查找，找到全局 `window` 即终止，尽量不要在全局作用域中添加变量**

![image-20220427082829622](https://s2.loli.net/2022/12/13/zfnxpqZFV5MEg8O.png)

在函数内部的变量每当函数执行完毕函数内部的变量就会被回收，当函数再次被执行在重新加载，而如果我们多次调用同一个函数，它所指向的内存地址也是不同的。

```javascript
function fn() {
  let str = '万斯'
}
fn()
```

- 函数每次调用都会创建一个新作用域

  ```javascript
  function fn() {
    let num = 1
    function sum() {
    	console.log(++num);
    }
    sum()
  }
  fn()
  ```

  - 每次去调用 `fn`都是在重新去内存中开辟一个新地址，所以 `num ` 不会多次累加，每调用一次就重新执行一次

- 如果子函数被使用时父级环境将被保留

  ```javascript
  function fn() {
    let num = 1
    return function () {
      console.log(++num);
    }
  }
  var a = fn()
  a()
  ```

  - 调用 a 其实就是在调用 fn 函数中的匿名函数，因为这个匿名函数是一个返回值
  - 而匿名函数一直在使用父级作用域中的变量这才让父级环境一直得以保留
  - 只要这个函数一直被使用就不会被销毁，延长闭包的生命周期

- 构造函数也是很好的环境例子，子函数被外部使用父级环境将被保留

  - 构造函数里的属性，方法被调用时就相当于 return

  ```javascript
  function Fn() {
    this.num = 1
    this.sum = function() {
      console.log(++this.num);
    }
  }
  let fun = new Fn()
  fun.sum()
  ```

  - 原理：

  ```javascript
  function Fn() {
    let num = 1
    function sum() {
       console.log(++num);
    }
    // 在真正的构造函数内部这里返回的是 this
    return {
       sum: sum
    }
  }
  let fun = new Fn()
  fun.sum()
  ```

  - 构造函数 new 的创建过程

    1.  创建一个空对象
    2. 将空对象原型的内存地址  `__proto__  ` 指向函数的原型对象
    3. 利用函数 `call` 方法将原本指向 window 的绑定对象 this 指向了 obj空对象
    4. 利用函数返回对象 obj 

    ![image-20220427105602449](https://s2.loli.net/2022/12/13/hOywZLmYsWSieaT.png) 

#### let/const

使用 `let / const` 可以将变量声明在块级作用域中（放在新的环境中，而不是全局中）

```javascript
{
  let str = '憨憨'
}
console.log(str);
```

##### 在循环中的 `var / let`

**var（var 只有函数作用域没有块级作用域）**

在循环中使用 `var` 声明，实际上是把 i 定义到 window 中

```javascript
for (var i = 1; i <= 3; i++) {
  // console.log(i);
}
console.log(window.i);
```

使用 var 声明还有一个弊端

因为我们的 `i` 声明在了 `window` 中在我们等待计时器的时候循环体早已经循环完成，这时候它就会直接使用已经循环完成的 `i ` ；

而使用 `let` 则就能很好的避免这个问题；因为 `let` 是有作用域概念的，它只会声明在 `for` 的作用域内，

每次去执行的时候都会生成一个函数作用域，它们之间互不干扰

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);  // 循环3次4
  }, 1000);
}

// 不使用 let 去解决
for (var i = 1; i <= 3; i++) {
  (function(a) {
    setTimeout(() => {
    console.log(a);
  }, 1000);
  })(i)
}
```

这样解决就是把 `i`  重新封装到一个作用域中，让 `a` 有了局部作用域的概念

**let**

而使用 `let` 则只是声明在循环的作用域块中

```javascript
for (let i = 1; i <= 3; i++) {
  // console.log(i);
}
console.log(i);  // i is not defined
```

### - 闭包的使用

闭包指子函数可以访问父级及父级作用域之上的变量的函数特性，即使在子函数作用域外也可以访问。如果没有闭包那么处理事件绑定，异步请求时都会变得困难。

- JS 的所有函数都是闭包
- 闭包一般在子函数本身作用域以外执行，即延申作用域

#### 案例：

使用闭包返回数组区间

```javascript
let arr = [3, 2, 4, 1, 5, 6];
function fn(a, b) {
  return function(v) {
      return v >= a && v <= b
  }
}
console.log(arr.filter(fn(1, 3)));
```

移动动画

```javascript
let btn = document.querySelectorAll("button")
btn.forEach(function(item) {
  let istrue = false
  item.addEventListener('click', function() {
    if(!istrue) {
      istrue = true
      let left = 1
      setInterval(() => {
        item.style.left = ++left + 'px'
      }, 100);
    }
  })
})
```

使用闭包造成的内存泄露问题（使用过后要及时手动清理）

```javascript
let divs = document.querySelectorAll("div")
divs.forEach(item => {
  let desc = item.getAttribute("desc")
  item.addEventListener("click", function() {
    console.log(desc);
    console.log(item);
  })
  item = null
})
```

## 九、对象

### - 基础

- 对象是包括属性与方法的数据类型，JS 中大部分都是对象如 `String / Number / Math / RegExp / Date` 

- 传统的函数编程会有错中复杂的依赖很容易让代码冗余

#### OOP

- 对象是属性和方法的集合即封装

- 将复杂功能隐藏在内部，只开放给少量方法，更改对象内部的复杂逻辑不会对外部调用造成影响即抽象
- 继承是通过代码复用减少冗余代码
- 根据不同形态的对象产生不同的结果即多态

#### 声明

- 使用字面量的形式

  ```javascript
  let user = {
    name: "跃然",
    get() {
      return this.name
    }
  }
  console.log(user.get())
  ```

- 其实字面量形式在系统内部也是使用构造函数 `new Object` 创建的

  ```javascript
  let hd = {};
  let houdunren = new Object();
  console.log(hd, houdunren);
  console.log(hd.constructor);
  console.log(houdunren.constructor);
  ```

#### 操作属性

- 使用点语法获取

  ```javascript
  let user = {
    name: "妙卡"
  }
  console.log(user.name)
  ```

- 使用 `[]` 来获取

  ```javascript
  let user = {
    name: "嫩江"
  }
  console.log(user["name"])
  ```

- `[]` 主要用于通过变量定义属性的场景（属性名不是合法变量名；例如 “my user”）

  ```javascript
  let user = {
    name: "崩坏"
  }
  let proto = "name"
  console.log(user[proto])
  ```

- 对象和方法的属性可以动态的添加或删除

  ```javascript
  let user = {}
  
  // 添加
  user.name = "繁华"
  user.age = 18
  
  // 删除
  delete user.name
  delete user.age
  ```

#### 对象方法

- 定义在对象中的函数我们称为方法

  ```javascript
  let user = {
    fn() {}
  }
  user.fn()
  ```

#### 引用特性

- 对象和函数、数据一样都是引用类型，复制只会复制引用地址（在数据类型为基本类型时 传递的是值）

  ```javascript
  let user = {
    name: "崩坏"
  }
  let proto = user 
  proto.name = "阿松大"
  console.log(user.name)
  console.log(proto.name);
  ```

- 对象作为函数参数使用时也不会产生完全赋值，内外共用一个对象（在数据类型为复杂类型时 传递的是址）

  ```javascript
  let user = {
    name: "崩坏"
  }
  function fn(user) {
    user.name = "是大多数"
  }
  fn(user)
  console.log(user.name);
  ```

#### this

`this` 指当前对象的引用，始终建议在代码内部使用 `this` 而不要使用对象名，不同对象的 `this` 只指当前对象

- 删除了 `xj` 变量 ，但在函数体内还在使用 `xj` 变量造成错误

- 使用 `this` 后始终指向到引用地址，就不会有这个问题

  ```javascript
  // 内部方法用当前对象去获取 name 但这时我们的对象已经被清空了，但是对象还在，只不过是指向了 hd，用被清空的对象去获取自然是获取不到的
  let xj = {
    name: "向军",
    show() {
      return xj.name;
    }
  };
  let hd = xj;
  xj = null;
  console.log(hd.show());
  ```

  使用 `this`

  ```javascript
  let xj = {
    name: "向军",
    show() {
      return this.name;
    }
  };
  let hd = xj;
  xj = null;
  console.log(hd.show());
  ```

#### 展开语法

使用 `...` 可以展示对象的结构

```javascript
let hd = { name: "后盾人", web: "houdurnen.com" };
let info = { ...hd, site: "hdcms" };
console.log(info);
```

函数合并

```javascript
function upload(params) {
  let config = {
    type: "*.jpeg,*.png",
    size: 10000
  };
  params = { ...config, ...params };
  console.log(params);
}
upload({ size: 999 });
```

### - 解构赋值

解构是一种更简洁的赋值特性，可以理解为分解一个数据结构

- 只要某种数据结构具有 `Iterator` 接口，都可以采用数组的解构赋值

- 建议使用 `var / let / const` 声明

#### 基本使用

```javascript
let user = {name: "及阿娇", age: 23}
let {name: name, age: age} = user

// 使用 es6 语法简写
let {name, age} = user
```

- 函数中的解构

```javascript
// 函数返回值
function hd() {
  return {
    name: '后盾人',
    url: 'houdunren.com'
  };
}
let {name, url} = hd();
console.log(name);

// 函数参数
function fn({name, age}) {}
fn({name: "大苏打", age: 12})
```

#### 简洁定义

只赋值部分变量

```javascript
// 在数组中想要获取中间的元素，是需要有东西在前面占位的
let arr = ['赛文','aoteman.com'];
let [, b] = arr
console.log(b);

// 在对象中
let obj = {name: '赛文', url: 'aoteman.com'};
let {url} = obj
console.log(url);
```

使用变量赋值

```javascript
let name = '赛文', 
    url = 'aoteman.com'
let obj = {name, url}
console.log(obj);
```

#### 嵌套解构

可以操作多层复杂数据类型

```javascript
let obj = {
  name: "迪迦", 
  path: {
    url: "aoteman.com"
  }
}
let {name, 
  path: {
    url
  }
} = obj
console.log(url);
```

#### 多种数据类型的解构

- 解构赋值时，如果等号右侧是数值和布尔值，则会先转为对象

```javascript
// 解构出它们的 toString 方法
let {toString: s} = 123
s === Number.prototype.toString

let {toString: s} = true
s === Number.prototype.toString
```

- 字符串的解构

```javascript
let [a, b, c, d, e] = "hello";

// 解构出字符串的 length 属性
let { length: len } = "hello"
```



#### 默认值

为变量设置默认值

使用默认值特性可以方便的对参数预设

```javascript
let obj = {name: "迪迦", url: "aoteman.com"}
let {name, url, age=1300} = obj
console.log(age);
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，只有在用到的时候才会求值

```javascript
function fn() {
  console.log("我执行了")
}

let [x = fn()] = []  // 当右侧需要被结构的数据没有元素或元素是 undefined 是 fn 函数执行
let [x = fn()] = [1]  // fn 函数不执行
```

#### 函数参数

数组参数的使用

```javascript
function fn([name, age]) {
  console.log(name, age)
}
fn(["迪迦", 1300])
```

对象参数使用方法

```javascript
function fn(sex, {name, age} = {}) {
  console.log(sex, name, age)
}
fn("男", {name: "迪迦", age: 1300})
```

#### 注意点

- 将一个已经声明的变量用于结构赋值
- 浏览器会把 `{x}` 当作一个代码块

```javascript
let x;
{x} = {x: 1} // 报错

let x;
({x} = {x: 1}) // 可以执行
```

- 结构赋值允许等号左侧不存在任何变量名

```javascript
({} = {x: 1})
```

- 由于数组本质是特殊的对象，因此可以对数组进行对象属性的结构

```javascript
let arr = [1, 2, 3]
let {0: first, [arr.length - 1]: last} = arr
```

### - 属性管理

#### 添加属性

用对象点上属性名称往对象中添加属性

```javascript
let obj = {name: "迪迦"}
obj.age = "18"
```

#### 删除属性

使用 `delete` 可以删除属性

```javascript
let obj = {name: "将就"}
delete obj.name
```

#### 检测属性

`hasOwnProperty` 检测对象自身是否包含指定的属性，不检测原型链上继承的属性

```javascript
let obj = {name: "迪迦"}
obj.hasOwnproperty("name")
```

可以检测到原型链上继承的属性

```javascript
let obj = {name: "迪迦"}
("valueOf") in obj 
```

`Object.setPrototypeOf` 可以为一个对象设置新的原型对象

```javascript
let a = {name: "迪迦"}
let b = {url: "www.mk78.com"}
// b 成为 a 的新原型对象
Object.setPrototypeOf(a, b)
```

#### 获取属性名

使用 `Object.getOwnPropertyNames` 可以获取对象的属性名集合

- 也可以选择 `Object.keys() / Object.values / Object.entries() ` 等方法

```javascript
let a = {
  name: "迪迦",
  url: "www.mk78.com"
}
Object.getOwnPropertyOf(a)
```

#### assign

使用 `Object.addign` 方法使两个对象合并成一个对象

```javascript
let a = {
  name: "迪迦",
  url: "www.mk78.com"
}
let b = {
  age: "18",
  gender: "男性"
}
let newObj = Object.assign(a, b)
```

#### 传值操作

对象使引用类型赋值是传址操作

```javascript
let user = {
  name: "憨憨"
}
let obj = {
  str: user
}
obj.str.name = "迪迦"
```

### - 对象的遍历

#### 获取内容

使用 JavaScript 内部提供的函数方法获取对象属性与值

```javascript
let obj ={name: "迪迦", address: "mk78"}
Object.keys(obj)  // 获取到该对象的键
Object.values(obj)  // 获取到该对象的值
Object.entries(obj)  // 获取到该对象的键、值
```

#### `for/in` 

在循环中 `for/in` 是唯一一个可以直接遍历对象的循环体

```javascript
let obj ={name: "迪迦", address: "mk78"}
for (const key in obj) {
  console.log(key)  // 键
  console.log(obj[key])  // 值
}
```

#### `for/of`

`for/of` 用于遍历迭代对象，不能直接操作对象。但 `Object` 对象的 `keys/values/enreies` 方法返回的是迭代对象

```javascript
let obj ={name: "迪迦", address: "mk78"}
for (const [key, value] of Object.entries(obj)) {
  console.log(key)  // 键
  console.log(value)  // 值
}
```

### - 对象的拷贝

#### 浅拷贝

**使用 `for/in` 执行拷贝**

```javascript
let obj = {name: "迪迦", gender: "男"}
let Ultraman = {address: "mk78", url: "www.mk78.com"}
for (const key in Ultraman) {
  obj[key] = Ultraman[key]
}
```

**`Object.assign` 函数可简单的 实现浅拷贝，它是将两个对象的属性叠加后面对象属性会覆盖前面对象同名属性**

```javascript
let obj = {name: "迪迦", gender: "男"}
let Ultraman = {address: "mk78", url: "www.mk78.com"}
Object.assign(obj, Ultraman)
```

**使用展开语法**

```javascript
let obj = {name: "迪迦", gender: "男"}
let Ultraman = {address: "mk78", url: "www.mk78.com"}
obj = {...obj, ...Ultraman}
```

#### 深拷贝

浅拷贝不会将深层的数据复制

```javascript
let obj = {
  name: "迪迦",
  gender: "男",
  Ultraman: {
    address: "mk78",
    url: "www.mk78.com"
  },
  arr: []
}
function cpoy(options) {
  let obj = {}
  for(const key in options) {
    obj[key] = options[key]
  }
  return obj
}
let newobj = copy(obj)
obj.name = "泰罗"
obj.arr.push("憨憨")
newobj.Ultraman.address = "jk00"
console.log(newobj) // arr 与 Ultraman.address 被改变
console.log(obj) // name、arr 与 Ultraman.address 被改变
```

完全复制一个对象，两个对象是完全独立的

```javascript
let obj = {
  name: "迪迦",
  gender: "男",
  Ultraman: {
    address: "mk78",
    url: "www.mk78.com"
  },
  arr: []
}
function copy(options) {
  // 检测数据类型
  let obj = typeOf instanceof Array ? [] : {}
  // 使用 for/of
  for(const [k, v] of Object.entries(options)) {
    obj[k] = typeOf v === "object" ? copy(v) : v
  }
  // 使用 for/in
  for(const key in options) {
    // 检测数据类型，如果有对象类型则在从 copy 函数中过一次
    obj[key] = typeOf options[key] === "object" ? copy(options[key]) : options[key]
  }
  return obj
}
obj.name = "泰罗"
obj.arr.push("憨憨")
newobj.Ultraman.address = "jk00"
console.log(newobj) // Ultraman.address 被改变
console.log(obj) // name 与 arr 被改变
```

### - 构建函数

对象可以通过内置或自定义的构造函数创建

#### 工厂函数

在函数中返回对象的函数称为工厂函数，工厂函数有一下优点

- 减少重复创建相同类型对象的代码
- 修改工厂函数的方法影响所有同类对象

使用字面量创建对象需要复制属性与方法结构

而使用工厂函数可以简化这个过程

```javascript
function stu(name, age, code) {
  return {
    name,
    age,
    show: function () {
      console.log(`${this.name}今年${this.age}岁了,来自${code()}`)
    }
  }
}
let user = stu("张三", "18", function () {
  return "石头村"
})
user.show()
let user1 = stu("里斯", "28", function () {
  return "河湾村"
})
user1.show()
```

#### 构造函数

和工厂函数相似构造函数也用于创建对象，它的上下文为新的对象实例

- 构造函数每个单词首字母大写，这是个不约而同的规范
- `this` 指当前创建的对象
- 不需要返回 `this` 系统会自动完成
- 需要使用 `new` 关键词生成对象

```javascript
function User(name) {
  this.name = name
  this.show = function () {
    console.log(this.name)
    console.log(this)
  }
}
let zs = new User("张三")
zs.show()  // this, 指向当前函数对象
let li = zs.show
li()  // this, 指向 window
```

如果构造函数返回对象，实例化后的对象将是此对象

#### 严格模式

在严格模式下方法中的 `this` 值为 undefined ，这是为了防止无意的修改 window 对象	

#### 内置构造

JS 中大部分数据类型都是通过构造函数创建的

字面量创建的对象，内部也是调用了 `Object` 构造函数

```javascript
const hd = {name: "迪迦"};
console.log(hd.constructor); //ƒ Object() { [native code]}
//下面是使用构造函数创建对象
const fn = new Object();
console.log(fn.constructor); //ƒ Object() { [native code]}
```

#### 对象函数

在 JS 中函数也是一个对象

函数是由系统内置的 `Function` 构造函数创建的

```javascript
function fn() {}
console.log(fn.constructor)//ƒ Function() { [native code]}
```

使用内置构造函数创建函数

```javascript
let User = new Function(`name`,`
  this.name = name,
  this.show = function () {
    console.log(this,name)
  }
`)
let fn = new User("里斯")
fn.show()
```

### - 抽象特性

将复杂功能隐藏在内部，只开放给外部少量方法，更改对象内部的复杂逻辑不会对外部造成影响即抽象

#### 问题分析

方法和属性仍然可以在外部访问到

```javascript
function Fn(name, age) {
  this.name = name,
  this.age = age,
  this.show = function () {
    console.log(`${this.name}今年${this.age}岁了，是一位${this.info()}人了`)
  }
  this.info = function () {
    return age > 50 ? "老年" : "青年"
  }
}
let fn = new Fn("里斯", 51)
fn.name = "张思睿"
fn.info = function () {
  return ""
}
fn.show()
fn.info()
```

#### 抽象封装

比如 `info`方法只是在内部使用，不需要被外部访问到这会破坏程序的内部逻辑。

可以使用闭包的特性将对象进行抽象处理

```javascript
function Fn(name, age) {
  let data = {name, age}
  this.show = function () {
    console.log(`${data.name}今年${data.age}岁了，是一位${info()}人了`)
  }
  let info = function () {
    return age > 50 ? "老年" : "青年"
  }
}
let fn = new Fn("里斯", 51)
fn.name = "张思睿"
fn.info = function () {
  return ""
}
fn.show()
fn.info()
console.log(fn) // 会显示被更改，但内部不会被更改
```

### - 属性特性

JS 中可以对属性的访问特性进行控制

#### 查看特征

使用 `Object.getOwnPropertyDescriptor` 查看对象属性的描述

也可以使用 `getOwnPropertyDescriptors` 查看对象全部属性描述

```javascript
"use strict";
let obj = {
  name: "迪迦",
  address: "mk78"
}
// 查看单个
let desc = Object.getOwnPropertyDescriptor(obj, "name")
// 查看全部
let descs = Object.getOwnPropertyDescriptor(obj)
```

属性包括以下四种特性

| 特性         | 说明                                                   | 默认值    |
| ------------ | ------------------------------------------------------ | --------- |
| configurable | 能否使用 delete 、能否修改属性特性、或能修改访问器属性 | true      |
| enumerable   | 对象属性是否可通过 for-in 循环，或 Object.key() 读取   | true      |
| writable     | 对象属性是否修改                                       | true      |
| value        | 对象属性的默认值                                       | undefined |

#### 设置特性

使用 `Object.defineProperty` 方法修改属性，通过下面的设置属性 name 将不能被遍历、删除、修改

```javascript
"use strict"
let obj = {
  name: "迪迦",
  address: "mk78"
}
Object.defineProperty(obj, "name", {
  value: "奥特曼",   // 可选
  writable: false,  // 不可修改
  enumerable: false,  // 不可遍历
  configurable: false  // 不可删除
})
```

使用 `Object.defineProperties` 可以一次设置多个属性

```javascript
"use strict"
let obj = {
  name: "迪迦",
  address: "mk78"
}
Object.defineProperties(obj, {
  name: {
    value: "奥特曼",   // 可选
    writable: false,  // 不可修改
    enumerable: false,  // 不可遍历
    configurable: false  // 不可删除
  }
})
```

#### 禁止添加

`Object.preventExensions` 禁止向对象添加属性

```javascript
let obj = {name: "迪迦", age: 118}
Object.preventExtensions(obj)
obj.sex = "男性"  // Error
```

`Object.isExensible` 判断能否向对象添加属性 

```javascript
let obj = {name: "迪迦", age: 118}
Object.preventExtensions(user);
console.log(Object.isExtensible(user));  //false
```

#### 封闭对象

`Object.seal()` 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为 `configurable": false`

```javascript
let obj = {name: "迪迦", age: 118}
Object.seal(obj)
obj.sex = "男" // Error
```

`Object.isSealed` 如果对象是密封的则返回 `true` 

```javascript
let obj = {name: "迪迦", age: 118}
Object.isSealed(obj)  // false
```

#### 冻结对象

`Object.freeze` 冻结对象后不允许添加、删除、修改属性，writable、configurable 都标记为 false

```javascript
let obj = {name: "迪迦", age: 118}
Object.freeze(obj)
obj.sex = "男" // Error
```

`Object.isFrozen()` 方法判断一个对象是否被冻结

```javascript
let obj = {name: "迪迦", age: 118}
Object.freeze(obj)
Object.isFrozen(obj) // true
```

### - 属性访问器

getter 方法用于获得属性值，setter 方法用于设置属性，这是 JS 提供的存取器特性即使用函数来管理属性

- 用于避免错误的赋值
- 需要动态监测值的改变
- 属性只能在访问器和普通属性任选其一，不能共同存在

#### getter / setter 

```javascript
let user = {
  data: {name: "迪迦", age: 23},
  set age(value) {
    if (typeof value !== "number" || value < 0 || value > 150) {
      throw new Error("错误")
    }
    this.data.age = value
  },
  get age() {
    return this.data.age
  }
}
user.age = 99
console.log(user.age)  // 99
```

- 批量设置属性

```javascript
let web = {
      data: {name: "迪迦", address: "mk78"},
      set stie(v) {
        [this.data.name, this.data.address] = v.split(",")
      },
      get sties() {
        return this.data.name + this.data.address
      }
    }
    web.stie = "张思睿, 石头村"
```

- token 存储案例

```javascript
let Request = {
  set token(v) {
    localStorage.setItem("token", v)
  },
  get token() {
    let v = localStorage.getItem("token")
    return v ? v : alert("token 不存在")
  }
}
Request.token = "迪迦"
```

- 定义内部私有属性

```javascript
let user = {
  set name(v) {
    this._name = v
  }
  get name() {
    return this._name
  }
}
user.name = "地方"
```

#### 访问器的优先级

访问器可以说没有优先级，谁写在后面谁的优先级就大

- 在同名的情况下
  - 访问器在后就会覆盖掉前面 name 的属性值
  - 如果访问器在前，则两者都会显示，并且 user.name = "xxx" 是优先操作访问器的，不会对 name 属性有影响

```javascript
let SYMBOL = Symbol()
let user = {
  [SYMBOL]: {name: "东方"},
  set name(v) {
    this[SYMBOL].name = v
  },
  get name() {
    return this[SYMBOL].name
	}
}
user.name = "123"
console.log(user.name)
```

#### 访问器描述符

使用 `defineProperty` 可以模拟定义私有属性，从而使用面向对象的抽象特性

```javascript
function User(name , age) {
  let data = {name, age}
  Object.defineProperties(this, {
    name: {set(v) {data.name = v},get() {return data.name}},
    age: {set(v) {data.age = v},get() {return data.age}}
  })
}
let user = new User("相似",18)
user.name = "速度"
user.age = 15
console.log(user.name)
console.log(user.age)
```

使用 class 语法糖定义

```javascript
let SYMBOL = Symbol()
class User {
  constructor(name, age) {
    this[SYMBOL] = {name, age}
  }
  set name(v) {this[SYMBOL].name = v}
  get name() {return this[SYMBOL].name}
  set age(v) {this[SYMBOL].age = v}
  get age() {return this[SYMBOL].age}
}
let user = new User("相似",18)
console.log(user)
user.name = "夫人"
user.age = 22
```

#### 闭包访问器

结合闭包特性对属性进行访问控制

```javascript
let data = {name: "沐沐汐"}
for (const [key, value] of Object.entries(data)) {
  fn(data, key, value)
}
function fn(data, key, value) {
  Object.defineProperty(data, key, {
    set(v) {value = v}
    get() {return v}
  })
}
data.name = "梓荇"
console.log(data.name) // "梓荇"
```

### - 代理拦截

代理（拦截器）是对象的访问控制，`setter/getter` 是对单个对象属性的控制，而代理是对象的控制

- 读写属性时代码更简洁
- 对象的多个属性控制统一交给代理完成
- 严格模式下 `set` 必须返回布尔值

#### 使用方法

```javascript
let obj = {name: "沐沐汐"}
let proxy = new Proxy(obj, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
  }
}) 
proxy.age = 21
```

#### 代理函数

如果代理以函数方式执行，会执行代理中定义 `apply` 方法

- 参数：函数本身，上下文，传递参数

```javascript
function fn(num) {
 return num === 1 ? 1 : num * fn(num -1)
}
let proxy = new Proxy(fn, {
  apply(target, key, value) {
    target.apply(key, value)
  }
})
proxy.apply({}, 1000)
```

#### 截取字符

```javascript
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
let proxy = new Proxy(lessons, {
  get(target, key) {
    const len = 5
    target[key].title = target.reduce((pev, cur) => {
      return cur.title.length > len ? cur.title.slice(0, len)+'.'.repeat(3) : cur.title
    }, 0)
    return target
  }
})
console.log(proxy[2])
```

#### 数据双向绑定

```javascript
<input type="text" v-model="title" />
<input type="text" v-model="title" />
<div v-bind="title"></div>

function View() {
  let proxy = new Proxy({}, {
    set(target, property, value) {
      document.querySelectorAll(`[v-model="${property}"]`).forEach(item => {
        item.value = value
      })
      document.querySelectorAll(`[v-bind="${property}"]`).forEach(item => {
        item.innerHTML = value
      })
    }
  })
  this.init = function () {
    document.querySelectorAll("[v-model]").forEach(item => {
      item.addEventListener("keyup", function () {
        proxy[this.getAttribute("v-model")] = this.value
      })
    })
  }
}
new View().init()
```

#### 表单验证

```javascript
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

<input type="text" validate rule="max:12,min:3" />
<input type="text" validate rule="max:3,isNumber" />

class Validate {
  max(value, len) {
    return value.length < len
  }
  min(value, len) {
    return value.length > len
  }
  isNumber(value) {
    return /^\d+$/.test(value)
  }
}
function view(target) {
  return new Proxy(target, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      let validate = new Validate()
      let rule = value.getAttribute("rule")
      let state = rule.split(",").every(item => {
        let info = item.split(":")
        return validate[info[0]](value.value, info[1])
      })
      value.classList[state?"remove":"add"]("error")
      return true
    }
  })
}
let proxy = view(document.querySelectorAll("[validate]"))
proxy.forEach((item, i) => {
  item.addEventListener("keyup", function () {
    proxy[i] = item
  })
})
```

#### 通过下标寻找数组元素

```javascript
function createArrayProxy(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('参数不是数组');
  }
  return new Proxy(array, {
    get(target, index) {
      index = parseInt(index); // 转成数值
      return target[index < 0 ? target.length + index : index];
    },
    set(target, index, value) {
      index = parseInt(index);
      target[index < 0 ? target.length + index : index] = value;
    }
  })
}
let arr = ['a','b','c','d'];
let arrProxy = createArrayProxy(arr);
arrProxy[0] = 'hello';
console.log(arrProxy[-1])
console.log(arr)
```

### - JSON 

- json 是一种轻量级的数据交换格式，易于人阅读和编写
- 使用 `json` 数据格式是替换 `xml` 的最佳方式，主流语言都很好的支持`json` 格式。所以 `json` 也是前后台传输数据的主要格式
- json 标准中要求使用双引号包裹属性，虽然有些语言不强制，但使用双引号可避免多程序间传输发生错误语言错误的发生

#### 声明定义

```javascript
let students = {name: "沐沐汐", age: 22, sex: "女"}
```

#### 序列化

序列化是将 `json` 转换为字符串，一般用来向其他语言传输使用

参数说明：

- 第一参数是要序列化的数据
- 第二参数是要保存的数据
- 第三参数是缩进

```javascript
let students = { name: "沐沐汐", age: 22, sex: "女"}
JSON.stringify(students)
```

#### 反序列化

使用 `JSON.parse` 将字符串 `json` 解析成对象

```javascript
let students = { name: "沐沐汐", age: 22, sex: "女"}
let jsonStr = JSON.stringify(students)
JSON.parse(jsonStr)
```

`json.parse` 的第二参数可以对数据做进一步的处理，但 me 不喜欢这么用

### - 对象在什么情况下使用 [] 来进行存取

1.  属性名包含特殊字符的情况下： 

- 例如：—、空格、阿拉伯数字

```javascript
let a = {}
a.conent-type = "Tom" 
console.log(a.conent-type)// 报错

a["conent-type"] = "Tom"
console.log(a["conent-type"])// "Tom"
```

2.  属性名不确定的情况下

```javascript
let a = {}
let propName = "Tom"
let val = 18

a.propName = val
console.log(a.propName) // 18

/*
* 1. 这里就是可以将 propName 的值来当作 a 这个对像的一个属性名
* 2. 中括号语法可以用变量作为属性名或者访问，而点语法不可以
* 3. 中括号语法可以动态访问属性名，并且在程序运行时可以创建和修改属性，点语法不可以
* 4. 中括号语法可以在属性名中包含会导致语法错误的字符
* 5. 在数组原型链上增加一个去重的方法，并且实现链式调用

*/
a[propName] = val
console.log(a[propName]) // 18
console.log(a["Tom"]) // 18
```



## 原型与原型链

> 显式原型与隐式原型

```javascript
function Fn() {}
let fn = new Fn()
```

- 每个函数 `function` 都有一个 `prototype` ，即显示原型属性，默认指向一个空的 `Object` 对象

  - ```javascript
    console.log(Fn.prototype)
    ```

- 每个实例对象都有一个 `__proto__` ，可称为隐式原型

  - ```javascript
    console.log(fn.__proto__)
    ```

- 对象的隐式原型的值为其对应的构造函数的显示原型的值

  - ```javascript
    console.log(Fn.prototype === fn.__proto__)
    ```

- 在其底层代码中有着这样一句

  - ```javascript
    fn.__proto__ = Fn.prototype
    // 也可以说是
    this.__proto__ = Fn.prototype
    ```

![image-20220831100514912](https://s2.loli.net/2022/12/13/TEveJ8MG4R6QY3u.png)

- 创造函数的过程中内部自动生成一个 `Fn.prototype` 的一个显式原型
- 在我们去 `new` 出一个实例对象时在底层代码中会生成一个 `fn.__proto__` 的一个隐式原型且与 `Fn.prototype` 显式原型相等（就是把 `Fn.prototype` 赋值给  `fn.__proto__` ）
- 它们共同指向堆空间中的一个空对象，我们所有添加在 `Fn.prototype` 显式原型上的方法都是放在这个空对象身上的，所以我们的 `fn.__proto__` 隐式原型属性也是可以访问这些属性方法

> **另一层猜测**

![image-20220916094736043](https://s2.loli.net/2022/12/13/6IRZNXhUO98rFmK.png)

- 创造构造函数过程中自动生成 `Fn.prototype` 显式原型属性（普通函数也是有这一属性的）
- 去 `new` 这个构造函数的实例对象时会生成 `fn.__proto__` 隐式原型属性
- 而显式原型属性与隐式原型属性为相等的状态，因为在 `JavaScript` 的源码中是把显式原型赋值给了隐式原型
  - `fn.__proto__` = `Fn.prototype`
  - 你可以改变隐式原型的指向去验证
  - 为什么现在又说它们的地址值都是一样的；因为引用类型传递的是地址值，而显示原型与隐式原型之间是赋值操作所以说它们传递的也是地址值
  - 到这又会有疑问它们之间传递就不会是深拷贝吗？
  - 当你去切断显式原型与隐式原型之间的联系时；如果是深拷贝就算是切断了联系隐式原型也是可以访问到 `Object` 中的方法；但是经过验证隐式原型并不能访问 `Object` 中的方法；可见它们之间并没有使用深拷贝
- 而最后这个空对象又是谁生成的呢？
  - 这个空对象可以说是由我们的顶级对象 `window` 来生成的
  - 这个空对象中就是来存我们在显式原型属性上添加的方法的



## 面向对象

面向对象是程序中一个非常重要的思想，它被很多人理解成一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用 window 对象
  - 操作网页要使用 document 对象
  - 操作控制台要使用 console 对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事务的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。























