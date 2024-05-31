[TOC]

# React全家桶

### 介绍描述

- 用于动态构建用户界面的 `JavaScript` 库 (只关注于视图)
- 由 `Facebook` 开源

### React 特点

- 声明式编码
- 组件化编码
- `React Navite` 编写原生应用
- 高效 (优秀的 Diff 算法)

### React 高效的原因

- 使用虚拟 (virtual) DOM，不总是直接操作页面真实 DOM
- DOM `Diff` 算法，最小化页面重绘

### React 基本使用

#### 相关 js 库

- `react.js`  React 核心库 
- `react-dom.js` 提供操作 DOM 的 react 扩展库
- `babel.min.js` 解析 JSX 语法代码转为 JS 代码的库

#### 基本使用

- 使用 `jsx` 创建虚拟 `DOM`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 容器 -->
  <div id="test"></div>
  <!-- 引入 react 核心库 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- 引入 react-dom 用于支持 react 操作 DOM -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <!-- 引入 babel 用于将 jsx 转为 js -->
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <!-- 此处一定要写 babel -->
  <script type="text/babel">
    // 创建虚拟 DOM
    const VDOM = <h1>Hello,React</h1> // 此处一定不要写引号，因为不是字符串
    // 渲染虚拟 DOM 到页面
    ReactDOM.render(VDOM, document.getElementById('test'))
  </script>
</body>
</html>
```

- 使用 `js` 创建虚拟 `DOM`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 容器 -->
  <div id="test"></div>
  <!-- 引入 react 核心库 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- 引入 react-dom 用于支持 react 操作 DOM -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>

  <script type="text/javascrit">
    // 创建虚拟 DOM
    const VDOM = React.createElement('h1', { id: 'title' }, React.createElement('span', {}, 'Hello, React'))
    // 渲染虚拟 DOM 到页面
    ReactDOM.render(VDOM, document.getElementById('test'))
  </script>
</body>
</html>
```

> `jsx` 创建虚拟 `DOM` 就是 `js` 创建虚拟 `DOM` 的语法糖

**关于虚拟 `DOM`**

- 本质是 `Object` 类型的对象(一般对象)
- 虚拟 `DOM` 比较“轻”(身上的属性方法少)，因为虚拟 `DOM` 是 `React` 内部在用，无需真实 `DOM` 上那么多的属性
- 虚拟 `DOM` 最终会被 `React` 转为真实 `DOM` ，呈现在页面上。
#### jsx 语法规则

**`jsx` 语法规则**

- 定义虚拟 `DOM` 时，不要写引号
- 标签中混入 `JS` 表达式时要用 `{}`
- 样式的类名指定不要用 `class` ，要用 `className`
- 内联样式，要用 `style={{ key: value }}` 的形式去写
- 只有一个根标签
- 标签必须闭合
- 标签首字母
  - 若小写字母开头，则将该标签转为 `html` 中同名元素，若 `html` 中无该标签对应的 同名元素，则报错
  - 若大写字母开头，`react` 就去渲染对应的组件，若组件没有定义，则报错

```js
<script type="text/babel">
  const myId = 'react_test'
  const myData = 'hello,react'
  // 创建虚拟 DOM
  const VDOM = (
    <div>
      <h2 className="title" id={ myId }>
        <span style={{color: 'white', fontSize: '14px'}}>{myData}</span>  
      </h2>  
      <input type="text" />
    </div>
  ) // 此处一定不要写引号，因为不是字符串
  // 渲染虚拟 DOM 到页面
  ReactDOM.render(VDOM, document.getElementById('test'))
</script>
```

**关于 `jsx` 区分 `js` 表达式和 `js` 语句代码**

- 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
  - a
  - a + b
  - demo()
  - arr.map
  - function
- 语句
  - if
  - for
  - switch

```js
<script type="text/babel">
  const arr = ['Angular', 'React', 'Vue']
  // 创建虚拟 DOM
  const VDOM = (
    <div>
      <h1>Hello,React</h1>
      <ul>
        {
          arr.map((item, index) => {
            return <li key={index}>{ item }</li>
          })
        }
      </ul>
    </div>
  ) // 此处一定不要写引号，因为不是字符串
  // 渲染虚拟 DOM 到页面
  ReactDOM.render(VDOM, document.getElementById('test'))
</script>
```

### React 面向组件编程

> 当应用是以多组件的方式实现，这个应用就是一个组件化的应用

**注：**

- 组件名称必须以大写字母开头
- `React` 会将以小写字母开头的组件视为原生 `DOM` 标签

#### 函数式组件

```js
<script type="text/babel">
  // 创建函数式组件
  function Welcome(props) {
    return <h2>{ props.name }</h2>
  }
  // 创建组件到页面
  ReactDOM.render(<Welcome name="张思睿" />,document.getElementById("test"))
</script>
```

- 执行了 `ReactDOM.render`
  - `React` 解析组件标签，找到了 `Welcome` 组件
  - 发现组件是使用函数定义的，随后执行该函数，将返回的虚拟 `DOM` 转为真实 `DOM`，随后呈现在页面中。

#### 类式组件

```js
<script type="text/babel">
  // 必须继承React.Component
  class Welcome extends React.Component {
    /**
     * 然后重写render()方法，该方法一定要有返回值，返回一个虚拟DOM 
     * render 是放在哪里的？ ——> Welcome 的原型对象上，供实例使用
     * render 中的 this 是谁？ ——> Welcome 的实例对象; Welcome 组件的实例对象
     */
    render() {
      return <h2>阿三大苏打</h2>
    }
  }
  // 渲染 【这个跟之前也是一样的】
  ReactDOM.render(< Welcome/>, document.getElementById('test'))
</script>
```

执行了 `ReactDOM.render`

- `React` 解析组件标签，找到了 `Welcome` 组件
- 发现组件是使用类定义的，随后 `new` 出来该类的实例，并通过该实例调用到原型上的 `render` 方法
- 将 `render` 返回的虚拟 `DOM` 转为真实 `DOM`，随后呈现在页面中。

#### 组件三大核心属性

##### state

> 理解

1. `state` 是组件对象最重要的属性，值是对象(可以包含多个 `key-value` 的组合)
2. 组件被称为 "状态机"，通过更行组件的 `state` 来更新对应的页面显示(重新渲染组件)

> 注意

- 组件中 `render` 方法中的 `this` 为组件实例对象
- 组件自定义的方法中 `this` 为 `undefined`，如何解决
  - 强制绑定 `this` 通过函数对象的 `bind`
  - 箭头函数
- 状态数据，不能直接修改或更新

```js
<script type="text/babel">
	// 必须继承React.Component
	class Welcome extends React.Component {
		// 构造器调用几次？ -> 1 次
		constructor (props) {
			super(props)
			this.state = {
				isHot: false
			}
			// 解决 changeWeather 中 this指向问题
			this.changeWeather = this.changeWeather.bind(this)
		}
		// render 调用几次? -> 1+n 次; 1是初始化的那次 n是状态更新的次数
		render() {
			const { isHot } = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{ isHot ? '炎热' : '凉爽' }</h1>
		}
		// changeWeather 调用几次? -> 点击几次就执行几次
		changeWeather() {
			/*
			* changeWeather 放在哪里？ -> Welcome 的原型对象上，供实例使用
			* 由于 changeWeather 是作为 onClick 的回调，所以不是通过实例调用的，是直接调用
			* 类中的方法默认开启了局部的严格模式，所以 changeWeather 中的 this 为 undefined
			*  */
			
			/**
			 * 状态 (state) 不可直接更改
			 * this.state.isHot = !this.state.isHot
			 */

			// 状态必须通过 setState 进行更新
			this.setState({
				isHot: !this.state.isHot
			})
		}
	}
	// 渲染 【这个跟之前也是一样的】
	ReactDOM.render(< Welcome/>, document.getElementById('test'))
</script>
```

> 注意：
>
> - 组件的构造函数，必须要传递一个 `props` 参数
> - 特别关注 `thsi`  **【重点】** ，类中所有的方法局部都开启了严格模式，如果直接进行调用，`this` 就是 `undefined` 
> - 想要改变 `state` ，需要使用 `setState` 进行修改，如果只是修改 `state` 的部分属性，则不会影响其它的属性，这个只是合并并不覆盖
>   - `this.setState` 该方法接收两种参数：对象或函数
>     - 对象：即想要修改的 `state` 
>     - 函数：接收两个函数，第一个函数接收两个参数，第一个是当前的 `state` 第二个是当前的 `props` ，该函数返回一个对象，和直接传递对象参数是一样的，就是要修改的 `state` ；第二个函数参数是 `state` 改变后触发的回调
> - 在此还需要注意的是，`setState` 有异步更新和同步更新两种形式，那么什么时候会同步更新，什么时候会异步更新呢？

- state 简写方式

```js
<script type="text/babel">
	class Welcome extends React.Component {
    // 初始化状态
    /**
     * 类中可以直接写赋值语句, 其含义是给 Welcome 的实例对象添加一个属性
     * 初始化状态
     */
    state = {
			isHot: false
		}
		render() {
			const { isHot } = this.state
			return <h1 onClick={this.changeWeather}>今天天气很{ isHot ? '炎热' : '凉爽' }</h1>
		}
    // 自定义方法 -> 要用赋值语句的形式 + 箭头函数
		changeWeather = () => {
			this.setState({
				isHot: !this.state.isHot
			})
		}
	}
	ReactDOM.render(< Welcome/>, document.getElementById('test'))
</script>
```

##### props

> 理解

- 每个 组件对象都会有 `props` 属性
- 组件标签的所有属性都保存在 `props` 中

> 作用

- 通过标签属性从组件外 向组件内传递变化的数据
- 注意：组件内部不要修改 `props` 数据

> 基本使用

```js
<script type="text/babel">
	class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props
      return (
        <ul>
          <li>姓名：{ name }</li>  
          <li>性别：{ sex }</li>  
          <li>年龄：{ age }</li>  
        </ul>
      )
    }
	}
	ReactDOM.render(< Person name='张思睿' age='18' sex='男' />, document.getElementById('test'))
</script>
```

> 传递的数据是对象形式

```js
<script type="text/babel">
	class Person extends React.Component {
    render() {
      const { name, age, sex, speak } = this.props
      return (
        <ul>
          <li>姓名：{ name }</li>  
          <li>性别：{ sex }</li>  
          <li>年龄：{ age }</li>  
        </ul>
      )
    }
	}
  const obj = {
    name: '老刘',
    age: 18,
    sex: '男'
  }
	ReactDOM.render(< Person {...obj} />, document.getElementById('test'))
</script>
```

**`props` 传递一个对象，是因为 `babel + react` 使得 `{...obj} 可以展开对象，但是只有在标签中才能使用`**

> 对 `props` 进行类型限制

- 很多时候都想要传递的参数进行相应的限制，比如：限制传递参数的类型，参数的默认值等
- `react` 对此提供了相应的解决方法
  - `propTypes`：类型检查，还可以限制必传
  - `defaultProps`：默认值
- 已弃用的类型限制方式（React v15.5）

```js
Person.propTypes = {
  name: React.PropTypes.string.isRequired,
  age: React.PropTypes.number
}
```

```js
<script type="text/babel">
	class Person extends React.Component {
    render() {
      const { name, age, sex, speak } = this.props
      return (
        <ul>
          <li>姓名：{ name }</li>  
          <li>性别：{ sex }</li>  
          <li>年龄：{ age }</li>  
        </ul>
      )
    }
	}
  // 对标签属性进行类型, 必要性的限制
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    speak: PropTypes.func
  }
  // 指定默认标签属性值
  Person.defaultProps = {
    sex: '女',
    age: 20
  }
  const obj = {
    name: '老刘',
    age: 18,
    sex: '男'
  }
	ReactDOM.render(< Person {...obj} speak={speak} />, document.getElementById('test'))

  function speak() {
    console.log('我会说话');
  }
</script>
```

> 类型限制简写

```js
<script type="text/babel">
	class Person extends React.Component {
    constructor(props) {
      // 构造器是否接收 props, 是否传递给 super, 取决于: 是否希望在构造器中通过 this 访问 props
      super(props)
    }

    // 对标签属性进行类型, 必要性的限制
    static propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number,
      speak: PropTypes.func
    }
    // 指定默认标签属性值
    static defaultProps = {
      sex: '女',
      age: 20
    }

    render() {
      const { name, age, sex, speak } = this.props
      return (
        <ul>
          <li>姓名：{ name }</li>  
          <li>性别：{ sex }</li>  
          <li>年龄：{ age }</li>  
        </ul>
      )
    }
	}
 
  const obj = {
    name: '老刘',
    age: 18,
    sex: '男'
  }
	ReactDOM.render(< Person {...obj} speak={speak} />, document.getElementById('test'))

  function speak() {
    console.log('我会说话');
  }
</script>
```

> 函数式组件的使用

- 在函数式组件中不能使用 `state` 和 `refs` ；但是在后期的 `hooks` 中完美的解决了这种问题

```js
<script type="text/babel">
  function Person(props) {
    const { name, age, sex } = props
    return (
      <ul>
        <li>姓名：{ name }</li>  
        <li>性别：{ sex }</li>  
        <li>年龄：{ age }</li>  
      </ul>
    )
  }

  // 对标签属性进行类型, 必要性的限制
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    speak: PropTypes.func
  }
  // 指定默认标签属性值
  Person.defaultProps = {
    sex: '女',
    age: 20
  }
 
  const obj = {
    name: '老刘',
    age: 18,
    sex: '男'
  }
	ReactDOM.render(< Person {...obj} />, document.getElementById('test'))
</script>
```

##### refs

> 理解

- 组件内的标签可以定义 `ref` 属性来标识自己
- `ref` 提供了一种方式，允许我们访问 `DOM` 节点或在 `render` 方法中创建的 `react` 元素

> 关于回调 `ref` 的说明

如果 `ref` 回调是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null` ，然后第二次会传入参数 `DOM` 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 `React` 清空旧的 `ref` 并且设置新的。通过将 `ref` 的回调函数定义成 `class` 的绑定函数方式可以避免上述问题，但是大多数情况下它是无关紧要的。

> `ref` 的使用主要提供了三种方式

1. 字符串形式

- **注：** 字符串形式的 `ref` 官方已不在建议使用，原因大概是如果大量的使用  `ref` 会在性能、效率上造成影响，官方声明会在以后版本进行移除。

在想要获取到一个 `DOM` 节点，可以直接在这个节点上添加 `ref` 属性。利用该属性进行获取该节点的值

```js
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      alert(this.refs.input1.value)
    }
    showData2 = () => {
      alert(this.refs.input2.value)
    }
    render() {
      return(
        <div>
          <input ref="input1" type="text" placeholder="点击按钮提示数据" />&nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
          <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />  
        </div>
      )
    }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
</script>
```

2. 回调函数形式

回调函数会在 `ref` 属性中添加一个回调函数。将该 `DOM` 作为参数传递过去

```js
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      alert(this.input1.value)
    }
    showData2 = () => {
      alert(this.input2.value)
    }
    render() {
      return(
        <div>
          <input ref={currentNode => this.input1 = currentNode} type="text" placeholder="点击按钮提示数据" />&nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
          <input 
            ref={currentNode => this.input2 = currentNode} 
            onBlur={this.showData2}
            type="text" 
            placeholder="失去焦点提示数据" 
          />  
        </div>
      )
    }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
</script>
```

也可以将函数提取出来使用

```js
handleInputRef = (currentNode) => {
  this.input2 = currentNode
}
<input ref={this.handleInputRef} type="text" placeholder="点击弹出" />
```

3. API 形式

`react` 其实已经给我们提供了一个相应的 `API` ，他会自动的将该 `DOM` 元素放入实例对象中

通过 `API` ，创建 `React` 的容器，相当于省略了回调的中间环节。但是这个容器是专门专用的，所以每一个 `ref` 都需要创建一个。该 `API` 会将 `DOM` 元素赋值给实例对象的名称属性的 `current` 

```js
<script type="text/babel">
  class Demo extends React.Component {
    myRef = React.createRef()
    myRef2 = React.createRef()
    showData = () => {
      alert(this.myRef.current.value)
    }
    showData2 = () => {
      alert(this.myRef2.current.value)
    }
    render() {
      return(
        <div>
          <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />&nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
          <input 
            ref={this.myRef2} 
            onBlur={this.showData2}
            type="text" 
            placeholder="失去焦点提示数据" 
          />  
        </div>
      )
    }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
</script>
```

**注：官方提示不要过度使用 `ref` ，如果发生时间的元素刚好是需要操作的元素，就可以使用事件去代替**

### React 事件

- `React` 的事件是通过 `onxxxx` 属性指定事件处理函数
- `React` 使用的都是自定义的时间，而不是原生的事件
- `React` 中的事件是通过事件委托方式处理的
- 事件中必须返回的是函数
- 通过 `event.target` 得到发生事件的 `Dom` 元素对象

> 例如：

​	先声明一个事件，然后在根据事件创建相应的函数，根据事件的 `event` 参数(事件源)，将 `DOM` 元素获取到

```js
<input onChange={this.saveName} type = "text" />
saveName = (event) => {
  console.log(event.target)
}
```

#### 受控组件和非受控组件

> 理解

- 受控组件是指表单数据由 `React` 中的 `state` 控制。当用户输入时，组件的状态会更新，并且通过 `setState` 来更新组件的状态。这样这个数据的状态就完全可以被 `React` 监听到，方便实现数据的处理和验证。

```js
<script type="text/babel">
  class Demo extends React.Component {
    state = {
      username: '',
      password: ''
    }
    saveLogin = (event, key) => {
      this.setState({
        [key]: event.target.value
      })
    }
    handleSubmit = (event) => {
      event.preventDefault()
      const { username, password } = this.state
      console.log(username, password);
    }
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          用户名：<input onChange={(event) => this.saveLogin(event, 'username')} type="text" name="username" />&nbsp;
          密码：<input onChange={(event) => this.saveLogin(event, 'password')} type="password" name="password" />  
          <button>登录</button>&nbsp;
        </form>
      )
    }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
</script>
```

- 非受控组件则是其表单数据不受 `React` 中 `state` 控制，而是由 `DOM` 元素本身事件源来管理，通常是在 `componenDidMount` 或 `useRef` 中获取 `DOM` 元素的引用，并且直接操作 `DOM` 元素来获取数据或更新数据。

```js
<script type="text/babel">
  class Demo extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
      const { username, password } = this
      console.log(username.value, password.value);
    }
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          用户名：<input ref={c => this.username = c} type="text" name="username" />&nbsp;
          密码：<input ref={c => this.password = c} type="password" name="password" />  
          <button>登录</button>&nbsp;
        </form>
      )
    }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
</script>
```

- 高阶函数：
  - 若 A 函数，接收的参数是一个函数，那么 A 就可以称之为高阶函数 
  - 若 A 函数 ，调用的返回值依然是一个函数，那么 A 就可以称之为高阶函数

- 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

```js
saveLogin = (key) => {
  return (event) => {
   	this.setState({
    	[key]: event.target.value
  	}) 
  }
}
```

### 生命周期钩子

#### 旧生命周期

- 组件从创建到死亡，会经过一些特定的阶段
- `React` 组件中包含一系列钩子函数 (生命周期回调函数)，会在特定的时刻调用
- 我们在定义组件的时候，会在特定的声明周期回调函数中，做特定的工作

![image-20240321100152641](https://s2.loli.net/2024/03/21/XsOFkvbSZLt62a3.png)

```js
  <script type="text/babel">
    class Demo extends React.Component {
      constructor(props) {
        console.log('Demo->constructor');
        super(props)
        this.state = {
          opacity: 1
        }
      }

      // 组件将要挂载的钩子
      componentWillMount() {
        console.log('Demo->componentWillMount');
      }

      // 组件挂载完毕的钩子
      componentDidMount() {
        console.log('Demo->componentDidMount');
      }

      // 组件将要卸载的钩子
      componentWillUnmount() {
        console.log('Demo->componentWillUnmount');
      }

      // 控制组件更新的阀门
      shouldComponentUpdate() {
        console.log('Demo->shouldComponentUpdate');
        return true
      }

      // 组件将要更新的钩子
      componentWillUpdate() {
        console.log('Demo->componentWillUpdate');
      }

      // 组件更新完毕的钩子
      componentDidUpdate() {
        console.log('Demo->componentDidUpdate');
      }

      add = () => {
        this.setState({
          opacity: this.state.opacity += 1
        })
      }

      death = () => {
        // 卸载组件
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      }

      force = () => {
        // 强制更新组件
        this.forceUpdate()
      }

      render() {
        console.log('Demo->render');
        return(
          <div>
            <h1>这是第{this.state.opacity}</h1>
            <button onClick={this.add}>点击加一</button>
            <button onClick={this.death}>卸载组件</button>
            <button onClick={this.force}>强制更新</button>
          </div>
        )
      }
    }

    class A extends React.Component {
      state = {
        carName: '五菱'
      }

      changeCar = () => {
        this.setState({
          carName: '领克'
        })
      }

      render() {
        return(
          <div>
            <h1>我是A组件</h1>
            <button onClick={this.changeCar}>换车</button>
            <B carName={this.state.carName}/>
          </div>
        )
      } 
    }

    class B extends React.Component {
      // 组件将要接收新的 props 的钩子
      componentWillReceiveProps() {
        console.log('B->componentWillReceiveProps');
      }

      render() {
        return(
          <div>
            <h1>我是B组件, 接收到的车是:{this.props.carName}</h1>
          </div>
        )
      } 
    }

    ReactDOM.render(<A />, document.getElementById('test'))
  </script>
```

> 生命周期的几个阶段 (旧)

1. 初始化阶段：由 `ReactDOM.render` 触发初次渲染
   - `constructor`
   - `componentWillMount`
   - `render`
   - `componentDidMount`
2. 更新阶段：由组件内部 `this.setState` 或父组件重新 `render` 触发
   - `shouldComponentUpdate`
   - `componentWillUpdate`
   - `render`
   - `componentDidUpdate`
3. 卸载组件：由 `ReactDOM.unmountComponentAtNode` 触发
   - `componentWillUnmount`
4. 强制更新阶段：由组件内部 `this.forceUpdate` 重新触发 `render`
   - `componentWillUpdate`
   - `render`
   - `componentDidUpdate`
5. 子组件捕获 `props` 由父组件向子组件传递最新的值的时候触发
   - `componentWillReceiveProps`

#### 新生命周期

在最新的 `react` 版本中，有些生命周期钩子被抛弃了，在官网中时这样说的：

我们得到最重要的经验是，过时的组件生命周期往往会带来不安全的编码实践，具体函数如下

> **重要的钩子**

1. `render` 初始化渲染或更新渲染时调用
2. `componentDidMount` 开启监听，发送 `ajax` 请求
3. `componentWillUnmount` 做一些收尾工作，如：清理定时器

> **即将废弃的钩子**

1. `componentWillMount`
2. `componentWillReceiveProps`
3. `componentWillUpdate`

现在使用会出现警告，下一个大版本需要加上 `UNASFR_` 前缀才能使用，以后可能会被彻底废弃，不建议使用。

![1611651795885](https://s2.loli.net/2024/03/22/GCV7zZvFEg6Ro94.png)

从图上可以看出，新生命周期和就生命周期的区别主要有：

1. 抛弃了上面所说的三个钩子函数
2. 新添加了两个钩子函数

> 新添加的两个钩子函数

- `static getDerivedStateFromProps(props, state)`

  首先，该函数会调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用；该函数必须是静态的，给组件传递的 `props` 以及组件状态 `state` ，会作为参数到这个函数中，该函数也必须有返回值，返回一个 `null` 或者 `state` 对象。因为初始化和后续更新都会执行这个方法，因此这个方法返回 `state` 对象，就相当于将原来的 `state` 进行了覆盖，所以倒是修改状态不起作用。

- `getSnapshotBeforeUpdate(PreProps, PreState)`

  `getSnapshotBeforeUpdate` 在最近一次渲染输出（提交 `DOM` 节点）之前调用，它使得组件能在发生更改之前从 `DOM` 中捕获一些信息。此生命周期的任何返回值将作为参数传递 `componentDidUpdate`。

- 补充：

  `componentDidUpdate(PrevProps, prevState, snapshotValue)`

  该生命周期函数的第三个参数，原始传过来的参数（快照值），最开始的状态，`getSnapshotBeforeUpdate` 传递的值

> 生命周期的几个阶段 (新)

- 初始化阶段：由 `ReactDOM.render` 触发初次渲染
  - `constructor`
  - `getDerivedStateFromProps`
  - `render`
  - `componentDidMount`
- 更新阶段：由组件内部 `this.setState` 或父组件重新 `render` 触发
  - `getDerivedStateFromProps`
  - `shouldComponentUpdate`
  - `render`
  - `getSnapshotBeforeUpdate`
  - `componentDidUpdate`
- 卸载组件：由 `ReactDOM.unmountComponentAtNode` 触发
  - `componentWillUnmount`

```js
  <script type="text/babel">
    class Demo extends React.Component {
      constructor(props) {
        console.log('Demo->constructor');
        super(props)
        this.state = {
          opacity: 1
        }
      }

      // 若 state 的值在任何时候都取决于 props，那么可以使用 getDerivedStateFromProps
      static getDerivedStateFromProps(props, state) {
        console.log('Demo->getDerivedStateFromProps', props, state);
        return null
      }

      // 在更新之前获取快照值
      getSnapshotBeforeUpdate() {
        console.log('Demo->getSnapshotBeforeUpdate');
        return '我是快照值'
      }

      // 组件挂载完毕的钩子
      componentDidMount() {
        console.log('Demo->componentDidMount');
      }

      // 组件将要卸载的钩子
      componentWillUnmount() {
        console.log('Demo->componentWillUnmount');
      }

      // 控制组件更新的阀门
      shouldComponentUpdate() {
        console.log('Demo->shouldComponentUpdate');
        return true
      }

      // 组件更新完毕的钩子
      componentDidUpdate(preProps, preState, snapshotValue) {
        console.log('Demo->componentDidUpdate', preProps, preState, snapshotValue);
      }

      add = () => {
        this.setState({
          opacity: this.state.opacity += 1
        })
      }

      death = () => {
        // 卸载组件
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      }

      force = () => {
        // 强制更新组件
        this.forceUpdate()
      }

      render() {
        console.log('Demo->render');
        return(
          <div>
            <h1>这是第{this.state.opacity}</h1>
            <button onClick={this.add}>点击加一</button>
            <button onClick={this.death}>卸载组件</button>
            <button onClick={this.force}>强制更新</button>
          </div>
        )
      }
    }
    ReactDOM.render(<Demo opacity={100} />, document.getElementById('test'))
  </script>
```

> `getSnapshotBeforeUpdate` 的使用案例

![BeforeGender](https://s2.loli.net/2024/03/28/PQEuFXCi5DU1fId.gif)

1. 我们可以使用state状态，改变新闻后面的值，但是为了同时显示这些内容，我们应该为state的属性定义一个数组。并在创建组件之后开启一个定时器，不断的进行更新state。更新渲染组件

2. 接下来就是控制滚动条了

   我们在组件渲染到DOM之前获取组件的高度，然后用组件渲染之后的高度减去之前的高度就是一条新的内容的高度，这样在不断的累加到滚动条位置上。

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .list {
      height: 150px;
      width: 200px;
      background-color: aqua;
      overflow: auto;
    }

    .news {
      height: 30px;
    }
  </style>
</head>

<body>
  <!-- 容器 -->
  <div id="test"></div>
  <!-- 引入 react 核心库 -->
  <script type="text/javascript" src="../../js/17.0/react.development17.0.js"></script>
  <!-- 引入 react-dom 用于支持 react 操作 DOM -->
  <script type="text/javascript" src="../../js/17.0/react-dom.development17.0.js"></script>
  <!-- 引入 babel 用于将 jsx 转为 js -->
  <script type="text/javascript" src="../../js/babel.min.js"></script>
  <!-- 引入 props 类型限制 -->
  <script type="text/javascript" src="../../js/prop-types.js"></script>

  <!-- 此处一定要写 babel -->
  <script type="text/babel">
    class NewsList extends React.Component {
      state = {
        newArr: []
      }

      componentDidMount() {
        setInterval(() => {
          const { newArr } = this.state;
          const news = '新闻' + (newArr.length + 1)
          this.setState({ newArr: [news, ...newArr] })
        }, 1000);
      }

      getSnapshotBeforeUpdate() {
        return this.refs.list.scrollHeight
      }

      componentDidUpdate(prevProps, PrevState, snapshotValue) {
        console.log(prevProps, PrevState);
        this.refs.list.scrollTop += this.refs.list.scrollHeight - snapshotValue
      }

      render() {
        return (
          <div className="list" ref="list">
            {
              this.state.newArr.map((v, i) => {
                return <div key={i} className="news">{v}</div>
              })
            }
          </div>
        )
      }
    }
    ReactDOM.render(<NewsList />, document.getElementById('test'))
  </script>
</body>

</html>
```

### Diff算法

提到这个算法，就必须说一下关于 `key` 的事情了。

其实每个组件中的每个标签都会有一个 `key` ，只不过有的必须显示的指定，有的可以隐藏。

如果生成的 `render` 出来后旧不会改变里面的内容，那么你不需要指定 `key` ，(不指定 `key` 时，`React` 也会生成一个 默认的标识，或者将 `index` 作为 `key` ，只要 `key` 不重复即可)

但是如果你的标签是动态的，是有可能刷新的，就必须显示的指定 `key` 。

```react
<ul>
	{
  	this.state.persons.map((item, index) => {
    	return <li key={index}>{item.name}---{item.age} <input type="text" /></li>  
    })
  }
</ul>
```

这个地方虽然显示的指定了 `key` ，**但是官网不推荐使用 `index` 作为 `key` 去使用**

这样可能会有效率上的 问题

> 例如

在一个组件中，我们创建了两个对象，通过遍历的方式放入 `li` 中，此时 `key` 使用的是 `index`

```react
persons: [
  { id: 0, name: '张三', age: 18 },
  { id: 1, name: '李四', age: 19 },
]

<ul>
	{
  	this.state.persons.map((item, index) => {
    	return <li key={index}>{item.name}---{item.age} <input type="text" /></li>  
    })
  }
</ul>
```

我们要在点击按钮之后动态添加一个对象，并且放入到 `DOM` 结构中，在重新渲染到页面中。

```react
<button onClick={this.addPerson}>添加人员</button>
addPerson = () => {
  const { persons } = this.state;
  let obj = {
    id: this.state.persons.length,
    name: '王五',
    age: 20
  }
  this.setState({ persons: [obj, ...persons] })
}
```

![addObject](https://s2.loli.net/2024/03/29/MYXWRLTzd59nvUV.gif)

这样看，虽然完成了功能。但是其实存在效率上的问题，先看一下两个前后组件状态的变化。

![1611800988496](https://s2.loli.net/2024/03/29/Yu6lLakFEUQiHNC.png)

- 发现组件第一个变成了王五，张三和里斯都移下去了。因为我们使用 `index` 作为 `key` 也就发生了改变【张三原本的 `key` 是0，现在变成了1，里斯的 `key` 原本是 1，现在变成了 2，王五变成了 0】在组建更新状态重新渲染的时候，就出现了问题
  - 首先，状态更新导致组件标签更新，`react` 根据 `key` ，判断就的虚拟 `DOM` 和新的虚拟 `DOM` 是否一致
  - `key=0` 的时候旧的虚拟 `DOM` 内容是张三，新的虚拟 `DOM` 为王五，`react` 认为内容改变，从而重新创建新的真实 `DOM`
  - `key=1` 的时候旧的虚拟 `DOM` 内容是李四，新的虚拟 `DOM` 为张三，`react` 认为内容改变，从而重新创建新的真实 `DOM` 
  - `key=2` 的时候旧的虚拟 `DOM` 没有，直接创建新的真实 `DOM`
  - 这样原本有两个虚拟 `DOM` 可以复用，但都没有进行复用，完完全全的都是新创建的，这就导致效率极大的降低。
  - 其实这是因为我们将新创建的对象放在首位，如果放在最后其实没有问题，但是因为官方并不推荐使用 `index` 做为 `key` 值。从而完全避免这样的情况。

> 使用 `index` 作为 `key` 可能会引发的问题

1. 若对数据进行逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实 `DOM` 更新界面效果没问题，但效率低。
2. 如果结构中还包含输入类的 `DOM` ：会产生错误 `DOM` 更新界面有问题
3. 注意：如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 `index` 作为 `key` 是没有问题的。

> 开发如何选择 `key`

- 最好使用每一条数据的唯一标识作为 `key` 比如 `id` 、手机号、身份证
- 如果确定只是简单的展示数据，用 `index` 也是可以的

> `Diff` 算法其实就是 `react` 生成的新虚拟 `DOM` 和旧虚拟 `DOM` 的比较规则

- 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key:
  - 如果内容没有变化，就直接只用之前旧的真实DOM
  - 如果内容发生了变化，就生成新的真实DOM			
- 如果旧的虚拟DOM中没有找到了与新虚拟DOM相同的key:
  - 根据数据创建新的真实的DOM,随后渲染到页面上

**而这个判断key的比较规则就是Diff算法**

### React 应用（基于 React 脚手架）

#### 使用 create-react-app 创建 react 应用

> `react` 脚手架

- xxx脚手架：用来帮助程序员快速创建一个基于 xxx库的模板项目
  - 包含了所有需要的配置（语法检查、jsx 编译、devServer）
  - 下载好了所有相关的依赖
  - 可以直接运行一个简单效果
- `react` 提供了一个用于创建 `react` 项目的脚手架：`create-react-app`
- 项目的整体技术架构为：`react + webpack + es6 + eslint`
- 使用脚手架开发的项目的特点：模块化、组件化、工程化

> 创建项目并启动

- 全局安装：`npm install create-react-app -g`
- 切换到想创建项目的目录，使用命令：`create-react-app hello-react`
- 进入项目文件夹：`cd hello-react`

- 启动项目：`npm staet`

#### 项目目录结构

```tex
public - 静态资源文件
	-> favicon.icon - 网站页签图标
	-> index.html - 主页面
	-> logo192.png - logo 图
	-> logo512.png - logo 图
	-> manifest.json - 应用加壳的配置文件
	-> robots.txt - 爬虫协议文件
src - 源码文件夹
	-> App.css - App 组件的样式
	-> App.js - App 组件
	-> App.test.js - 用于给 App 做测验
	-> index.css - 样式
	-> index.js - 入口文件
	-> logo.svg - logo 图
	-> reportWebVitals.js - 页面性能分析文件(需要 web-vitals 库的支持)
	-> setupTests.js - 组件单元测试的文件(需要 jest-dom 库的支持)
```

![1611817630266](https://s2.loli.net/2024/04/01/VwLq28B6dZFC3UN.png)

这里面最主要的还是这个Index.html文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--%PUBLIC_URL%表示public文件夹的路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--用于开启理想视口，用于移动端页面的适配-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--用于配置浏览器地址栏的颜色（仅支持安卓手机浏览器）-->
    <meta name="theme-color" content="#000000" />
    <!--描述网页信息的-->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--用于指定网页添加到手机主屏幕后的图标（仅仅支持ios）-->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
 
    <!--应用加壳时候的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  
    <title>React App</title>
  </head>
  <body>
    <!-- 浏览器不支持JS的运行的时候展现 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

#### 第一个脚手架应用

- 我们保持 `public` 中的 `index.html` 不变

- 修改src下面的 `APP.js` 以及 `index.js` 文件

  **App.js:  【注意：创建好的组件一定要暴露出去】**

```react
// 创建外壳组件APP
import React from 'react'

class App extends React.Component{
  render(){
      return (
          <div>Hello word</div>
      )
  }
}

export default App
```

`index.js`: 【主要的作用其实就是将App这个组件渲染到页面上】

```react
// 引入核心库
import React from 'react'
import ReactDOM from 'react-dom'
// 引入组件
import App from './App'

ReactDOM.render(<App />,document.getElementById("root"))
```

这样在重新启动应用，就成功了。

我们也不建议这样直接将内容放入 `App` 组件中，尽量还是用内部组件。

我们在顶一个 `Hello` 组件：

```react
import React,{ Componet } from 'react'

export default class Hello extends Componet{
  render() {
    return (
      <h1>Hello</h1>
    )
  }
}
```

在App组件中，进行使用

```react
class App extends Component{
  render(){
      return (
          <div>
              <Hello />
          </div>
      )
  }
}
```

这样的结果和前面是一样的。

但是由于普通的Js和组件都是js，所一最好组件使用jsx去展示。

#### 样式冲突

当组件逐渐增多起来的时候，我们发现，组件的样式也是越来越丰富，这样就很有可能产生两个组件中样式名称有可能会冲突，这样会根据引入App这个组件的先后顺序，后面的会覆盖前面的，

为了避免这样的样式冲突，我们采用下面的形式：

- 将css文件名修改： `hello.css ---> hello.module.css`

- 引入并使用的时候改变方式

```react
import React, { Component } from 'react'
import hello from './hello.module.css'  //引入的时候给一个名称

export default class Hello extends Component{
  render() {
    return (
      <h1 className={hello.title}>Hello</h1>   //通过大括号进行调用
    )
  }
}
```

### 功能界面的组件化编码流程

- 拆分组件：拆分界面，抽取组件
- 实现静态组件：使用组件实现静态页面效果
- 实现动态组件
  - 动态显示初始化数据
    - 数据类型
    - 数据名称
    - 保存在那个组件
  - 交互(从绑定事件监听开始)

> 注意事项

1. 拆分组件、实现静态组件。注意 `className` 、`style` 的写法

2. 动态初始化列表，如何确定将数据放在那个组件的 `state` 中

   - 某个组件使用：放在自身的 `state` 中
   - 某些组件使用：放在他们共同的父组件中【状态提升】

3. 关于父子组件之间的通信

   - 父组件给子组件传递数据：通过 `props` 传递

   - 子组件给父组件传递数据：通过 `props` 传递，要求父组件提前给子组件传递一个函数

4. 注意：`defaultChecked` 和 `checked` 的区别，`defalutChecked` 只是在初始化的时候执行一次，`checked` 没有这个限制，但是必须添加 `onChange` 方法类似的还有：`defaultValue` 和 `value`

5. 状态在哪里，操作状态的方法就在哪里

### React ajax

- `React` 本身只关注于界面，并不包含发送 `ajax` 请求的代码
- 前端应用需要通过 `ajax` 请求与后台进行交互【`json` 数据】
- `react` 应用中需要集成第三方 `ajax` 库或自己封装

> 常用的 `ajax` 请求库

- `jQuery` ：比较重，如果需要另外引入不建议使用
- `axios` ：轻量级，建议使用
  - 封装 `XmlHttpRequest` 对象的 `ajax`
  - `promise` 风格
  - 可以用在浏览器和 `node` 服务器端

在使用的过程中很有可能回出现跨域的问题，这样就应该配置代理

 所谓同源【即指在同一个域】】就是两个页面具有相同的协议 【`protocol`】，主机 【`host`】 和端口号  【`port`】， 当一个请求url的 **协议、域名、端口** 三者之间任意一个与当前页面url不同即为跨域  。

> 跨域解决方法

1. 在 `package.json` 中追加如下配置

```json
"proxy": "http://localhost:5000"
```

说明：

- 优点：配置简单，前端请求资源时可以不加任何前缀
- 缺点：并不能配置多个代理
- 工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000 

2. 使用代理的方式

- 创建代理配置文件 `setupProxy.js`
- 编写 `setupProxy.js` 配置具体代理规则

```js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    // /api1 是需要转发的请求（所有带有 /api1 前缀的请求都会转发给 5000
    createProxyMiddleware('/api1', {
      // 配置转发目标地址（能返回数据的服务器地址）
      target: 'http://localhost:5050',
      /**
       * 控制服务器接收到的请求头中 host 字段的值
       * changeOrigin 设置为 true 时，服务器收到的请求头中的 host 为   localhost:5000
       * changeOrigin 设置为 false 时，服务器收到的请求头中的 host 为   localhost:3000
       * changeOrigin 默认值为 false
       */
      changeOrigin: true,
      // 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
      pathRewrite: {
        '^/api1': ''
      }
    }),
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
```

说明：

- 优点：可以配置多个代理，可以灵活的控制请求是否走代理
- 缺点：配置繁琐，前的段请求资源时必须加前缀

#### async 和 await

- `async`
  - 该关键字是放在函数之前的，使得函数成为一个异步函数，他最大的特点就是将函数封装成 `promise` ，也就被他修饰的函数的返回值都是 `promise` 对象。而这个 `promise` 对象的状态则是由函数执行的返回值决定的。
  - 如果返回的是一个非 `promise` 对象，该函数将返回一个成功的 `promise` ，成功的值则是返回的值。
  - 如果返回的是一个 `promise` 对象，则该函数返回的就是该 `promise` 对应的状态。

- `await`
  - `await` 右边是一个表达式，如果该表达式返回的是一个 `promise` 对象，则左边接收的结果就是该 `promise` 对象成功的结果，如果该 `promise` 对象失败了，就必须使用 `try-catch` 来捕获。如果该表达式返回不是一个 `promise` 对象，则左边接受的就是该表达式的返回值。
  - 当 `await` 关键字与异步函数一起使用时，它的真正优势就变得明显了，事实上 `await` 只在异步函数里面才起作用。它可以放在任何异步的，基于 `promise` 的函数之前。它会暂停代码在该行执行，直到 `promise` 完成，然后返回结果值。在暂停的同时，其它正在等待执行的代码就有机会执行了。

#### fetch

以前发送请求，只能使用 `xhr` 【`ajax`、`axios` 都是基于 `xhr` 封装的 】，现在又推出了 `fetch` ，`fetch` 与 `xhr` 同级别。

[fetch的详细使用](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html) 

### 消息订阅与发布

在消息订阅与发布众，我们可以使用 `Pubsub-js` 进行通信

- 安装

```shell
npm install pubsub-js
```

- 引入

```js
import Pubsub from 'pubsub-js'
```

- 订阅消息
  - atguigu：订阅消息名称
  - msg：消息名称
  - data：传递的数据

```js
thisPubsub.subscribe('atguigu', (msg, data) => {})
```

- 发布消息

```js
Pubsub.publish('atguigu', { isFrist: false, isLoad: true })
```

- 销毁消息

```js
Pubsub.unsubscribe(this.token)
```

### React 路由

#### SPA

- 单页面应用 (single page web application，SPA)，整个应用只有一个完整的页面点击页面中的连接不会刷新页面，只会做页面的局部更新。

- 数据都需要通过 `ajax` 请求获取，并在前端异步展现。

#### 什么是路由

- 一个路由其实就是一个映射关系【`key`: `value`】
- `key` 为路径，`value` 可能是 `function` 或者是 `component`

> 后端路由

1. `value` 是 `function` ，用来处理客户端提交的请求
2. 注册路由：`router.get(path, function(request, response) {})`
3. 工作过程：当 `node` 接收一个请求的时候，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应的数据。

> 前端路由

1. 浏览器端路由，`value` 是 `component` ，用于展示页面内容
2. 注册路由 `<Route path="/test" component={Test} />`
3. 工作过程中：当浏览器的 `path` 变为 `/test` 的时候，当前路由组件就会变成 `Test` 组件

> 前端路由的原理 [History](https://developer.mozilla.org/zh-CN/docs/Web/API/History)

1. 这个主要是依靠于 `history` ，也就是浏览器的历史记录。
2. 浏览器上的记录其实就是一个栈，前进一次就是入栈，后退一次就是出栈。
3. 并且历史记录上有一个监听的方法，可以时时刻刻监听记录的变化。从而判断是否改变路径

#### react-router-dom

`react` 的路由有三类：

- `web` ：主要适用于前端
- `native` ：主要适用于本地
- `anywhere` ：任何地方

在这主要使用 `web` 也就是这个标题 `react-router-dom`

> 基本使用

导航中的 `a` 标签改写成 `link` 标签

`<Link to="路径"></Link>`

展示区写成 `Route` 标签进行路径的匹配

```react
<div className="panel-body">
	<Route path="/about" component={About} />
  <Route path="/home" component={Home} />
</div>
```

```js
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

> 路由组件以及一般组件

- 写法不一样

  -  一般组件：`<Demo />`
  - 路由组件：`<Route to="/demo" component={Demo}/>`

- 存放的位置不同

  - 一般组件：`component`
  - 路由组件：`pages`

- 接收的内容：`props`

  - 一般组件：写组件标签的时候传递什么，就能传递什么
  - 路由组件：接收到三个固定属性【`history, location, match`】

  ```tex
  history:
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
  location:
    pathname: "/about"
    search: ""
    state: undefined
  match:
    params: {}
    path: "/about"
    url: "/about"
  ```

> NavLink 

因为 `Link` 不能够改变标签体，因此只适用于一些写死的标签。而如果想要有一些点击的效果，使用 `NavLink` 如下代码，就写了 `activeClassName` ，当点击的时候就会触发这个 `class` 样式

```react
<NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
```

但是可能一个导航有很多标签，如果这样重复的写 `NavLink` 也会造成很多的重复性的代码

因此可以定义一个 `NavLink` 

```react
<NavLink className="list-group-item" {...this.props} />
 // children 可以获取到标签体中的内容
<NavLink to={this.props.to} children={this.props.children} />
```

在使用的时候：直接写每个标签中不一样的部分就行，比如路径和名称

```react
<MyNavLink to="/about">About</MyNavLink>
```

> Switch的使用

- 通常情况下，`path` 和 `component` 是一一对应的关系
- `Switch` 可以提高路由匹配效率【单一匹配】

```react
import { Switch } from "react-router-dom";

<Switch>
  <Route path="/about" component={About} />
</Switch>
```

#### 样式错误

- 正常加载路径

![样式表](https://s2.loli.net/2024/04/24/HAnbwsgdYBmJCTa.png)

![](https://s2.loli.net/2024/04/24/wFk8sToi4Xrtacb.png)

- 但是在写路由的时候，有的时候就会出现多级目录

```react
<MyNavLink to="/cyk/about">About</MyNavLink>

<Route path="/cyk/about"component={About} />
```

这个时候就在刷新页面，就会出现问题：

样式因为路径问题加载失败，此时页面返回 `public` 下面的 `index.html` 

![](https://s2.loli.net/2024/04/24/gsDxhKcreY8SUmT.png)

解决问题的三个方式：

1. 样式加载使用绝对路径

```html
<link href="/css/bootstrap.css" rel="stylesheet"> 
```

1. 使用` %PUBLIC_URL%`

       ```html
       <link href="%PUBLIC_URL%/css/bootstrap.css" rel="stylesheet">
       ```

3. 使用 `HashRouter` asd

   因为 `HashRouter` 会添加 `#`，默认不会处理 `#` 后面的路径，所以也是可以解决的

```html
<BrowserRouter>
	<App />
</BrowserRouter>
```

#### 模糊匹配和精准匹配

`react` 默认是开启模糊匹配的

比如：

```react
<MyNavLink to="/home/a/b">Home</MyNavLink>
```

此时匹配到的路由分为三部分 `home a b` ；将会根据先后顺序匹配路由

如下就可以匹配到相应的路由：

````react
<Route path="/home" component={Home} />
````

但是如果是下面这个就会失败，也就是说他是根据路径一级一级查询的，可以包含前面那一部分，但并不是只包含部分就可以

```react
<Route path="/a" component={Home} />
```

当然也可以使用精准匹配 `exact`

这样就精准的匹配 `/home` ，则 `/home/a/b` 就匹配不到

```react
<Route exact path="/home" component={Home} />
```

#### 路由重定向

在配置好路由，最开始打开页面的时候，应该是不会匹配到任意一个组件。这个时候页面就是显得极其不合适，此时应该默认匹配到一个路由。

![RouterDef](https://s2.loli.net/2024/04/25/bMHJ9mVfoSGeFIz.gif)

此时就需要使用路由重定向 `Redirect` 进行默认匹配了。

```react
<Switch>
	<Route path="/about" component={About} />
  <Route path="/home" component={Home} />
  <Redirect to="/home" />
</Switch>
```

![RouterSetDef](https://s2.loli.net/2024/04/25/z1EDuJWKZNU9H3y.gif)

#### 嵌套路由

简单来说就是在一个路由组件中又使用了一个路由，就形成了嵌套路由

我们在 `home` 这个路由组件又添加了两个组件

```react
<div>
	<h2>Home组件内容</h2>
  <div>
		<ul className="nav nav-tabs">
    	<li>
      	<MyNavLink to="/home/news">News</MyNavLink>
      </li>
      <li>
      	<MyNavLink to="/home/message">Message</MyNavLink>
      </li>
    </ul>
    <Switch>
    	<Route path="/home/news" component={News} />
    	<Route path="/home/message" component={Message} />
    	<Redirect to="/home/news" />
    </Switch>
	</div>
</div>
```

`react` 中路由的注册时有顺序的，因此在匹配的时候也是按照这个顺序进行的，因此会先匹配父组件的路由

例如上面的案例路由处理过程：

- 因为父组件 `home` 的路由是先注册的，因此在匹配的时候先去找 `home` 的路由，也就是根据 `/home/news` 先模糊匹配到 `/home` 
- 在去 `home` 组件里面去匹配相应的路由，从而找到了 `/home/news` 进行匹配，因此找到了 `news` 组件。

**但是如果开启了精准匹配，就会在第一步时候匹配失败，因此不要轻易使用路由精准匹配** 

#### 路由传参

> params 传递参数

由路由链接携带参数

```react
<Link to={`/home/message/detail/${item.id}`}>{item.title}</Link>
```

注册路由声明接收

```react
<Route path="/home/message/detail/:id" component={Detail} />
```

接收路由参数

```js
const { id } = this.props.match.params;
```

> search 传递参数

路由链接携带参数

```react
<Link to={`/home/message/detail/?id=${item.id}`}>{item.title}</Link>
```

注册路由无需声明，正常注册

```react
<Route path="/home/message/detail" component={Detail} />
```

接收参数

```react
const { search } = this.props.location;
```

**获取到的 `search` 是 `urlencoded` 编码字符串，需要借助 `querystring` 或者 `querystringify`** 解析

```js
import qs from 'querystringify';
const { search } = this.props.location;
const { id } = qs.parse(search.slice(1));
```

> state 传递参数

路由链接携带参数

```react
<Link to={{ pathname: "/home/message/detail", state: { id: item.id } }}>{item.title}</Link>
```

注册路由无需声明，正常注册

```react
<Route path="/home/message/detail" component={Detail} />
```

接收参数

```react
const { id } = this.props.location.state;
```

**刷新也可以保留参数**

#### push 和 replace模式

- `push` 是压栈的操作，会往栈内压入一条一条地址

- `replace` 是替换的操作，栈内只会存在一条地址，每次进行路由跳转操作都会将其替换掉

默认是使用 `push` 操作，每次都会留下痕迹

```react
<Link replace to={{ pathname: "/home/message/detail", state: { id: item.id } }}>{item.title}</Link>

<NavLink replace activeClassName="active" className="list-group-item" {...this.props} />
```

#### 编程式路由导航

编程式导航是使用路由组件 `this.props.history` 提供的 `API` 进行路由跳转

```react
// params 方式
this.props.history.push(`/home/message/detail/${id}`);
this.props.history.replace(`/home/message/detail/${id}`);

// search 方式
this.props.history.push(`/home/message/detail?id=${id}`)
this.props.history.replace(`/home/message/detail?id=${id}`)

// state 方式
this.props.history.push(`/home/message/detail`, { id })
this.props.history.replace(`/home/message/detail`, { id })

this.props.history.push({
	pathname: `/home/message/detail`,
	state: { id }
});
this.props.history.replace({
	pathname: `/home/message/detail`,
	state: { id }
});

// 后退
this.props.history.goBack();

// 前进
this.props.history.goForward();

// 可接收一个数值类型，正数是前进几步，负数则是后退几步
this.props.history.go(n);
```

#### withRouter 的使用

`tiehRouter` 的作用

- 加工一般组件，让其拥有路由组件的 `API`

```react
import { withRouter } from 'react-router-dom'

class Header extends Component {
  back = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <button onClick={this.back}>后退</button>&nbsp;
        <button onClick={this.forward}>前进</button>&nbsp;
        <button onClick={this.go}>go</button>
      </div>
    )
  }
}

export default withRouter(Header)
```

####  BrowserRouter 和 HashRouter

底层原理不一样：

- `BrowserRouter` 使用的是 `H5` 的 `history` ，不兼容 `IE9` 及以下版本
- `HashRouter` 使用的是 `URL` 的哈希值

路径表现形式不一样

-  `BrowserRouter` 的路径中没有 `#` ，如：`localhost:3000/home`
- `HashRouter` 的路径包含 `#` ，如：`localhost:3000/#/home`

刷新后对路由 `state` 参数的影响

- `BrowserRouter` 没有影响，因为 `state` 保存在 `history` 对象中
- `HashRouter` 刷新后会导致路由 `state` 参数的丢失

**`HashRouter` 可以用于解决一些路径错误相关的问题**

### React UI 组件库

> `Ant Design` 配置按需引入和自定义主题

- 创建项目

```shell
yarn create react-app antd-demo
```

- 安装第三方 `antd` 

```shell
yarn add antd
```

- 安装 `craco `

```shell
yarn add @craco/craco
```

- 修改 `package.json` 

```json
{
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
}
```

- 创建 `craco.config.js` 

```js
module.exports = {};
```

- 修改文件
  - 修改 `App.css` 文件为 `App.less`
  - 修改 `App.less` 文件内容

```css
@import '~antd/dist/antd.less';
```

- 安装 `craco-less` 

```shell
yarn add craco-less
```

- 修改 `craco.config.js` 

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

### Redux

[Redux官网](https://redux.js.org/)

[Redux中文文档](https://www.redux.org.cn/)

#### Redux 概述

`Redux` 为何物

- `Redux` 是用于做 **状态管理** 的 JS 库
- 可用于 `React、Vue、Angular` 等项目中，常用于 `React`
- 集中式管理 `React` 应用多个组件共享的状态

何时用 `Redux` 

- 某个组件的状态，需要让其他组件拿到 【状态共享】
- 一个组件需要改变另一个组件的状态 【通信】
- 使用原则：能不用则不用，如果在不使用 `Redux` 情况下实现起来吃力才考虑使用

`Redux` 工作原理

![redux 工作流程图](https://s2.loli.net/2024/04/29/PveDh3oxaAY5tnZ.png)

- 组件想操作 `Redux` 中的状态：把动作类型和数据告诉 `Action Creators`
- `Action Creators` 创建 `action` ：同步 `action` 是一个普通对象，异步 `action` 是一个函数
- `Store` 调用 `dispatch` 分支 `action` 给 `Reducers` 执行
- `Reducers` 接收 `previousState` 、`action` 两个参数，对状态进行加工后返回新状态
- `Store` 调用 `getState` 把状态传给组件

#### 核心概念

- `action`
  - 表示动作的对象，包含 2 个属性
  - `type` ：标识属性，值为字符串，唯一，必须属性
  - `data` ：数据属性，类型任意，可选属性
  - `{ type: 'increment', data: 1 }`
- `reducer`
  - 用于初始化状态、加工状态
  - 根据旧状态和 `action` 产生新状态
  - 是纯函数

> **纯函数**
>
> 输入同样的实参，必定得到同样的输出
>
> - 不能改写参数数据
> - 不产生副作用，如网络请求、输入输出设备【网络请求不稳定】
> - 不能调用 `Date,now()、Math.random()` 等不纯方法

- `store`
  - `Redux` 核心对象，内部维护着 `state` 和 `reducer`
  - 核心 `API`
    - `store.getState()`：获取状态
    - `store.dispatch()`：分发任务，触发 `reducer` 调用，产生新状态
    - `store.subscript(func)`：注册监听函数，当状态改变自动调用

#### 一个 求和案例

```jsx
// App.jsx

import React, { Component } from 'react'
import Count from './components/Count'

export default class App extends Component {
  render() {
    return (
      <div>
        <Count />
      </div>
    )
  }
}
```

```js
// index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App />, document.getElementById('root'))

// 状态改变重新渲染 App 组件
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
```

```js
// redux/constant.js

// 保存常量值
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

```js
// redux/count_reducer.js

import { INCREMENT, DECREMENT } from './constant'

//初始化状态
const initState = 0
export default function countReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case INCREMENT:
      return preState + data
    case DECREMENT:
      return preState - data
    default:
      return preState
  }
}
```

```js
// redux/store.js

import { legacy_createStore as createStore } from 'redux'
//引入为 Count 组件服务的 reducer
import countReducer from './count_reducer'

export default createStore(countReducer)
```

```js
// redux/count_action.js

import { INCREMENT, DECREMENT } from './constant'

export const createIncrementAction = (data) => ({ type: INCREMENT, data })
export const createDecrementAction = (data) => ({ type: DECREMENT, data })
```

```jsx
// components/Count/index.jsx

import React, { Component } from 'react'
import store from '../../redux/store'
import { createIncrementAction, createDecrementAction } from '../../redux/count_action'

export default class Count extends Component {
  // 可在组件单独监听 Redux 状态变化
  // componentDidMount() {
  // 	store.subscribe(() => {
  // 		this.setState({})
  // 	})
  // }

  increment = () => {
    const { value } = this.selectNumber
    // 将 value 转为数值
    // 手动写 Action 对象
    store.dispatch({ type: 'increment', data: value * 1 })
    // 专门创建 Action 对象
    store.dispatch(createIncrementAction(value * 1))
  }

  decrement = () => {
    const { value } = this.selectNumber
    store.dispatch(createDecrementAction(value * 1))
  }

  incrementAsync = () => {
    const { value } = this.selectNumber
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1))
    }, 500)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}
```

- `redux` 只负责管理状态，状态改变驱动页面展示要自己写
- 可以在 `index.js` 中统一监听，也可以在组件单独监听。
  - **注意：不能直接 `this.render()` 调用 `render` 函数，要通过 `this.setState({})` 间接调用**
- `reducer` 由 `store` 自动触发首次调用，传递的 `preState` 为 `undefined` ，`action` 为 `{ type: '@@REDUX/ININT_a.5.v.9' }` 类似的东西，只有 `type`

####  Redux 异步编程

安装异步中间件

```shell
yarn add  redux-thunk
```

要点：

- 延迟的动作不要交给组件，而是 `action`
- 当操作状态所需数据要靠异步任务返回时，可用异步 `action`
- 创建 `action` 的函数返回一个函数，该函数中写异步任务
- 异步任务完成后，分发一个同步 `action` 操作状态
- 异步 `action` 不是必要的，完全可以在组件中等待异步任务结果返回在分发同步 `action`

```js
// store.js

/**
 * 该文件专门用于暴露一个 store 对象，整个应用只有一个 store 对象
 */

// 引入 createStore，专门用于创建 redux 中最为核心的 store 对象
import { legacy_createStore, applyMiddleware } from "redux";

// 引入为 Count 组件服务的 reducer
import countReducer from "./count_reduce";

// 引入 redux-thunk 用于支持异步 action
// 旧版本默认暴露, 新版本分发暴露
import { thunk } from "redux-thunk";

// 暴露 store
export default legacy_createStore(countReducer, applyMiddleware(thunk));
```

```js
// count_action.js

/**
 * 该文件专门为 Count 组件生成 action对象
 */
import { INCREMENT, DECREMENT } from './constant'

/**
 * 同步 action ，就是指 action 的值为 Object 类型的一般对象
 */
export const createIncrementAction = data => ({ type: INCREMENT, data })

export const createDecrementAction = data => ({ type: DECREMENT, data })

/**
 * 异步 action ，就是指 action 的值为函数，异步 action 中一般都会调用同步 action，异步 action 的 sole 的作用就是分发异步 action
 */
export const createIncrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data))
    }, time)
  }
}
```

```jsx
// Count.jsx

incrementAsync = () => {
  const { value } = this.selectNumber;
  store.dispatch(createIncrementAsyncAction(parseInt(value), 1000))
}
```

整个过程简单理解：`store` 在分发 `action` 时，发现返回一个函数，那它知道这是个异步 `action` 。因此 `store` 勉为其难的帮忙执行这个函数，同时给这个函数传递 `dispatch` 方法，等待异步任务完成取到数据后，直接调用 `dispatch` 方法分发同步 `action`

### React-redux

`React-redux` 是一个由 `react` 出品的第三方库，用于简化 `react` 中使用 `redux`

![React-Redux模型图](https://s2.loli.net/2024/04/30/dswCXPhpSJAE982.png)

`React-redux` 将组件分为两类：

- UI 组件
  - 只负责 UI 呈现，不带有业务逻辑
  - 通过 `props` 接收数据
  - 不能使用 `Redux` 的 `API` 
  - 保存在 `components` 文件夹下
- 容器组件
  - 负责管理数据和业务逻辑，和 `Redux` 通信，将结果交给 UI 组件
  - 可使用 `Redux` 的 `API` 
  - 保存在 `containers` 文件夹下

#### React-redux 基本使用

**要点：**

- `connect()()` ：创建容器组件
- `mapStateToProps` ：映射状态为 UI 组件标签属性，即传递状态
- `mapDispatchToProps` ：传递操作状态的方法
- 容器组件中的 `store` 是靠 `props` 传进去，而不是在容器组件中直接引入

```jsx
// Count 容器组件
// 引入 CountUI 组件
import CountUI from '../../components/Count/Count';
// 引入 connect 用于链接UI组件和redux
import { connect } from 'react-redux';
import { 
  createDecrementAction, 
  createIncrementAction, 
  createIncrementAsyncAction 
} from '../../redux/count_action'

/**
 * mapStateToProps 函数返回的是一个对象
 * 返回的对象中的 key 就做为传递给 UI 组件 props 的 key，value 就作为传递给 UI 组件的 props 的 value
 * mapStateToProps 用于传递状态
 */
const mapStateToProps = (state) => {
  return { count: state }
}

/**
 * mapDispatchToProps 函数返回的是一个对象
 * 返回的对象中的 key 就做为传递给 UI 组件 props 的 key，value 就作为传递给 UI 组件的 props 的 value
 * mapDispatchToProps 用于传递操作状态的方法
 */
const mapDispatchToProps = (dispatch) => {
  return {
    jia: (data) => {
      dispatch(createIncrementAction(parseInt(data)))
    },
    jian: (data) => {
      dispatch(createDecrementAction(parseInt(data)))
    },
    asyncAction: (data, time) => {
      dispatch(createIncrementAsyncAction(parseInt(data), time))
    }
  }
}

// 创建一个容器组件
const countContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);

export default countContainer;

```

```jsx
// App.jsx
import React, { Component } from 'react'
import Count from './containers/Count'
import store from './redux/store.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Count store={store} />
      </div>
    )
  }
}
```

```jsx
// Count UI 组件

increment = () => {
  const { value } = this.selectNumber
  this.props.jia(value * 1)
}

decrement = () => {
  const { value } = this.selectNumber
  this.props.jian(value * 1)
}

incrementAsync = () => {
  const { value } = this.selectNumber
  this.props.asyncAction(value * 1, 500)
}
```

#### 优化写法

`mapDispatchToProps` 可以写成对象形式，在调用创建 `action` 函数后返回一个 `action` ，这里 `React-redux` 做出了优化，`React-redux` 底层会帮助自动分发，也就使用调用 `dispatch` 

```jsx
// 函数写法
export default connect(
  state => ({count: state}),
  dispatch => ({
    add: number => dispatch(createIncrementAction(number)),
    sub: number => dispatch(createDecrementAction(number)),
    addAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
  })
)(CountUI)

// 对象写法
export default connect(
  state => ({ count: state }),
  {
    add: createIncrementAction,
    sub: createDecrementAction,
    addAsync: createIncrementAsyncAction,
  }
)(CountUI)
```

`React-redux` 容器组件可以自动监测 `Redux` 状态变化，因此 `index.js` 不需要手动监听

```js
store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
```

`Provider` 组件的使用：让所有容器组件都能获得状态数据，不必一个一个传递

```js
// index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

整合容器组件和 UI 组件为一个文件

```jsx
import React, { Component } from 'react'
import {
	createIncrementAction,
	createDecrementAction,
} from '../../redux/count_action'
import {connect} from 'react-redux'

// 定义 UI 组件
class Count extends Component {
  ...
}

// 创建容器组件
export default connect(
  state => ({count: state}),
  {
    add: createIncrementAction,
    sub: createDecrementAction
  }
)(Count)
```

#### 多个组件数据共享

首先规范文件结构，容器组件和 UI 组件合为一体放在 `container` 文件夹。`redux` 文件夹新建 `actions` 和 `reducers` 文件夹分别用于存放每个组件对应的 `action` 和 `reducer` 

新建 `Person` 组件对应的 `action` 和 `reducer` 

```jsx
// redux/actions/person.js

import { ADD_PERSON } from '../constant.js'

export const createAddPersonAction = personObj => ({
  type: ADD_PERSON,
  data: personObj
})
```

```jsx
// redux/reducers/person.js

import { ADD_PERSON } from '../constant.js'

// 初始化人员列表
const initState = [{ id: '001', name: 'tom', age: 18 }];

const personReducer = (preState = initState, action) => {
  const { type, data } = action
  switch (type) {
    // 添加人员
    case ADD_PERSON:
      return [data, ...preState]
    default:
      return preState
  }
}

export default personReducer
```

关键步骤：在 `store.js` 中使用 `combineReducers` 整合多个 `reducer` 来创建 `store` 对象

这样 `redux` 中就以对象的形式存储着每个组件的数据

```js
// redux/store.js

/**
 * 该文件专门用于暴露一个 store 对象，整个应用只有一个 store 对象
 */

// 引入 createStore，专门用于创建 redux 中最为核心的 store 对象
import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
// 引入为 Count 组件服务的 reducer
import countReducer from "./reducers/count";
// 引入 为 Person 组件服务的 reducer
import personReducer from "./reducers/person";
// 引入 redux-thunk 用于支持异步 action
import { thunk } from "redux-thunk";

// 汇总所有的 reducer 变为一个总的 reducer
const allReducer = combineReducers({
  count: countReducer,
  persons: personReducer,
});

// 暴露 store
export default legacy_createStore(allReducer, applyMiddleware(thunk));
```

`Person` 组件中获取 `redux` 保存的状态，包括其它组件的数据

```jsx
import React, { Component } from 'react';
import { nanoid } from "nanoid";
import { connect } from 'react-redux';
import { createAddPersonAction } from "../../redux/actions/person";

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { 
      id: nanoid(), 
      name, 
      age 
    };
    this.props.add_person(personObj)
  }

  render() {
    return (
      <div>
        <h2>count组件求和为{this.props.count}</h2>
        <input 
          ref={e => this.nameNode = e} 
          type="text" 
          placeholder="输入名字"
        />
        <input 
          ref={e => this.ageNode = e} 
          type="text" 
          placeholder="输入年龄" 
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {
            this.props.persons.map(item => (
              <li key={item.id}>{item.name} - {item.age}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const personContainer = connect(
  // state 是 Redux 保存的状态对象
  // 容器组件从 Redux 中取出需要的状态，并传递给 UI 组件
  state => ({ 
    persons: state.persons,
    count: state.count
  }),
  {
    add_person: createAddPersonAction
  }
)(Person)

export default personContainer
```

一个细节，在 `personReducer` 中，是按如下方式修改状态的，而没有使用 `unshift` 方法。在第二种方式，`react` 会认为状态没有变化而不会重新渲染页面，因为 `preState` 保存的是数组地址值，返回的地址和之前的地址是一样的，尽管数组内容发生了改变。而第一种方式返回一个新的数组地址值，和之前不一样，因此会重新渲染页面。

```js
// 方式一
switch (type) {
  case ADD_PERSON:
    return [data, ...preState]
  default:
    return preState
}

// 方式二
switch (type) {
  case ADD_PERSON:
    preState.unshift(data)
    return preState
  default:
    return preState
}
```

#### 纯函数

概念：输入同样的参数，返回同样的输出

约束：

- 不能修改参数数据
- 不产生任何副作用，如网络请求、输入和输出设备
- 不能调用 `Date.now` 或 `Math.random` 等不纯的方法
- 不能直接使用函数外的变量

`reducer` 的函数必须是纯函数

#### redux 开发者工具

`Chrome` 安装 `Redux DevTools` 开发者工具，项目下载依赖包

```shell
yarn add redux-devtools-extension --save-dev
```

在 `store.js` 中配置

```js
import { composeWithDevTools } from 'redux-devtools-extension'
...
export default createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)))
// 不需要异步中间件
export default createStore(Reducers, composeWithDevTools())
```

#### 项目打包运行[#](https://brucecqm.github.io/bruceblogpages/fe/react/react_redux.html#项目打包运行)

运行命令：`npm run build` 进行项目打包，生成 `build` 文件夹存放着打包完成的文件。

运行命令：`npm i serve -g` 全局安装 `serve` ，它能够以当前目录为根目录开启一台服务器，进入 `build` 文件夹所在目录，运行 `serve` 命令即可开启服务器查看项目效果。

### React 扩展

#### setState 更新状态的两种写法

对象式：`setState(stateChange, [callback])`

- `stateChange` 为状态改变对象【该对象可以体现出状态的更改】
- `callback` 是可选的回调函数，它在状态更新完毕、界面也更新后 (`render` 调用后) 才被调用

```jsx
// 对象式的 setState
const { count } = this.state;

// 更新状态
this.setState({ count: count + 1 }, () => {
   console.log('我是 setState 对象式的回调函数');
})
```

函数式：

- `updater` 为返回 `stateChange` 对象的函数
- `apdater` 可以接收到 `state` 和 `props`

```jsx
// 函数式的 setState

this.setState((state, props) => ({
	count: state.count + 1
}), () => {
	console.log('我是 setState 函数式的回调函数');
})
```

说明：

- `react` 状态更新是异步的。下述代码打印的 `count` 值是上一次的值，而非更新后的。可在第二个参数回调中获取更新后的状态。

```jsx
add = () => {
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count)
}

add = () => {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log(this.state.count)
  })
}
```

- `callback` 回调在 `componentDidMount` 钩子之后执行

总结：

- 对象式的 `setState` 是函数式的 `setState` 的简写方式【语法糖】
- 使用规则：
  - 如果新状态不依赖于原状态 => 使用对象方式
  - 如果新状态依赖于原状态 => 使用函数方式
  - 如果需要在 `setState` 执行后获取最新的状态数据，要使用第二个参数 `callback` 函数中读取

#### 路由懒加载 lazyLoad

```jsx
import React, { Component, lazy, Suspense } from 'react'
import Loading from './Loading'

// 通过 lazy 函数配合 import() 函数动态加载路由组件
// 路由组件代码会被分开打包
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

export default Demo extends Component {
  render() {
    return (
      <div>
        <h1>Demo 组件</h1>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>

        // 通过 <Suspense> 指定在加载得到路由打包文件前显示一个自定义 Loading 界面
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/home" component={Home}>
            <Route path="/about" component={About}>
          </Switch>
        </Suspense>
      </div>
    )
  }
}
```

#### Hooks

> `hook` 是 `react 16.18.0` 增加的新特性，让我们能在函数组件中使用 `state` 和其他特性

##### State Hook

- `State Hook` 让函数组件也可拥有 `state` 状态
- 语法：`const [count, setCount] = React.useState(initValue)`
- `useState` 
  - 参数：状态初始化值
  - 返回值：包含 2 个元素的数组，分别为状态值和状态更新函数
- `setCount` 的 2 种用法
  - `setCount(count + 1)`
  - `setCount(count => count + 1)`
  - 注意：新状态值会覆盖原状态值，因此若有多个状态，只能多次调用 `React.useState` ，不能使用对象。

```js
const [count, setCount] = React.useState(0)
const [name, setName] = React.useState('Tom')

function add() {
  setCount(count + 1)
  setCount((count) => count + 1)
}
```

##### Effect Hook

- `Effect Hook` 让我们能在函数式组件中执行副作用操作【就是模拟生命周期钩子】
- 副作用操作：发送 `ajax` 请求、定时器、手动更改真实 DOM
- `Effect Hook` 可以模拟三个钩子函数：`componentDidMount` 、`componentDidUpdate` 、`componentWillUnmount`
- `React.useEffrct` 第一个参数 `return` 的函数相当于 `componentWillUnmount` ，若有多个会按顺序执行

```jsx
// 语法
React.useEffect(() => {
  ...
  return () => {
    // 组件卸载前执行，即 componentWillUnmount 钩子
    ...
  }
}, [stateValue])

// 模拟 componentDidMount
// 第二个参数数组为空，表示不监听任何状态的更新
// 因此只有页面首次渲染会执行输出
React.useEffect(() => {
  console.log('DidMount')
  return () => {
    console.log('WillUnmount 1')
  }
}, [])

// 模拟全部状态 componentDidUpdate
// 若第二个参数不写，表示监听所有状态的更新
React.useEffect(() => {
  console.log('All DidUpdate')
  return () => {
    console.log('WillUnmount 2')
  }
})

// 模拟部分状态 componentDidUpdate
// 第二个参数数组写上状态，表示只监听这些状态的更新
React.useEffect(() => {
  console.log('Part DidUpdate')
  return () => {
    console.log('WillUnmount 3')
  }
}, [count, name])

// 若调用 ReactDOM.unmountComponentAtNode(document.getElementById('root'))
// 会输出 WillUnmount 1、2、3
```

注意：在严格模式中 `useEffect` 会被执行两次

##### Ref Hook

- `Ref Hook` 可以在函数式组件储存或查找组件内容的标签或其它数据
- 语法：`const refContainer = useRef()`
- 保存标签对象的容器，和 `React.createRef()` 类似，也是专人专用

```jsx
function Demo() {
  const myRef = React.useRef()

  function show() {
    console.log(myRef.current.value)
  }

  return (
    <div>
      <input type="text" ref={myRef} />
      <button onClick={show}>展示数据</button>
    </div>
  )
}
```

#### Fragment

- `Fragment` 标签本身不会被渲染成一个真实 `DOM` 标签，有点像 `Vue` 的 `template` 
- 用空标签也有相同效果，但是空标签不能传递任何属性，`Fragment` 标签可以传递 `key` 属性，遍历时候可用

```jsx
import React, { Component, Fragment } from 'react'

export default class Demo extends Component {
  render() {
    return (
      <Fragment key={1}>
        <input type="text" />
        <input type="text" />
      </Fragment>
    )

    // 或
    return (
      <>
        <input type="text" />
        <input type="text" />
      </>
    )
  }
}
```

#### Context

`Context` 是一种组件间通信方式，常用于祖父组件与子孙组件。实际开发一般不用，最常使用 `React-Redux` 

用法说明：

```jsx
1) 创建Context容器对象：
const XxxContext = React.createContext()

2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
<XxxContext.Provider value={数据}>
  子组件
</XxxContext.Provider>

3) 后代组件读取数据：

// 第一种方式：仅适用于类组件
// 声明接收context
static contextType = xxxContext
// 读取context中的value数据
this.context

//第二种方式: 可用于函数组件与类组件
<XxxContext.Consumer>
  {
    // value就是context中的value数据
    value => (
      ...
    )
  }
</XxxContext.Consumer>
```

栗子说明：

```jsx
// context.jsx

import React from 'react'
export const MyContext = React.createContext()
export const { Provider, Consumer } = MyContext

// A.jsx

import React, { Component } from 'react'
import B from './B.jsx'
import { Provider } from './context.js'

export default class A extends Component {
  state = { username: 'tom', age: 18 }

  render() {
    const { username, age } = this.state
    return (
      <div>
        <h3>A组件</h3>
        <h4>用户名是:{username}</h4>
        <Provider value={{ username, age }}>
          <B />
        </Provider>
      </div>
    )
  }
}

// B.jsx

import React, { Component } from 'react'
import C from './C.jsx'

export default class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件</h3>
        <C />
      </div>
    )
  }
}

// C.jsx

import React, { Component } from 'react'
import { MyContext } from './context.js'

export default class C extends Component {
  static contextType = MyContext
  render() {
    const { username, age } = this.context
    return (
      <div>
        <h3>C组件</h3>
        <h4>
          从A组件接收到的用户名:{username},年龄:{age}
        </h4>
      </div>
    )
  }
}

// C.jsx 为函数式组件

import { Consumer } from './context.js'
export default function C() {
  return (
    <div>
      <h3>我是C组件</h3>
      <h4>
        从A组件接收到的用户名:
        <Consumer>{(value) => `${value.username},年龄是${value.age}`}</Consumer>
      </h4>
    </div>
  )
}
```

#### 组件渲染优化

问题：

- 只要调用 `setState` ，即使没有修改状态，组件也会重新 `render`
- 只要父组件重新渲染，即使了组件没有使用父组件的状态，也会重新 `render`

原因：

- `shouldComponentUpdate` 钩子函数默认总是返回 `true`

改进：

- 只有组件的 `state` 或 `props` 的数据发生改变时才重新渲染

方式：

1. 手动重写 `shouldComponentUpdate` 的逻辑，只有数据发生变化才返回 `true`
2. 使用 `PureComponent` ，他内部重写了 `shouldComponentUpdate` ，只有 `state` 或 `props` 数据有变化才返回 `true`

> TIP
>
> - 他只是进行 `state` 和 `props` 数据的浅比较，如果只是数据对象内部数据改变了，返回 `false` 。即对于引用类型，比较的是地址引用
> - 不要直接修改 `state` 数据，而是要产生新数据

手动重写 `shouldComponentUpdate`

```jsx
export default class Dome extends Component {
  state = {
    userName: '张思睿'
  }

  upUserName = () => {
    this.setState({
      userName: '李斯'
    })
    
    /**
     * 手动重写 shouldComponentUpdate 进行的深比较
     */
    // const obj = this.state;
    // obj.userName = '李斯';
    // this.setState(obj);
  }

  /**
   * 手动重写 shouldComponentUpdate 
   * shouldComponentUpdate 的两个参数 
   *  -> 第一个: nextProps 接下来要变化的目标 props
   *  -> 第二个: nextState 接下来要变化的目标 state
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.userName === nextState.userName);
  }

  render() {
    console.log('Dome-render');
    const { userName } = this.state;
    return (
      <div>
        <h1>学生姓名: {userName}</h1>
        <button onClick={this.upUserName}>修改学生姓名</button>
        <Child userName={'王二麻'}/>
      </div>
    )
  }
}

class Child extends Component {
  shouldComponentUpdate(nextProps) {
    return !(this.props.userName === nextProps.userName);
  }

  render() {
    console.log('Child-render');
    const { userName } = this.props;
    return (
      <div>
        <h1>接收自DEMO组件的值: {userName}</h1>
      </div>
    )
  }
}
```

使用官方出品的 `PureComponent`

```jsx
export default class Dome extends PureComponent {
  state = {
    userName: '张思睿'
  }

  upUserName = () => {
    this.setState({
      userName: '李斯'
    })
    
    /**
     * 不可这样修改，PureComponent 进行的是浅比较，栈地址不变代表没有发生更新
     */
    // const obj = this.state;
    // obj.userName = '李斯';
    // this.setState(obj);
  }

  render() {
    console.log('Dome-render');
    const { userName } = this.state;
    return (
      <div>
        <h1>学生姓名: {userName}</h1>
        <button onClick={this.upUserName}>修改学生姓名</button>
        <Child userName={'王二麻'}/>
      </div>
    )
  }
}

class Child extends PureComponent {
  render() {
    console.log('Child-render');
    const { userName } = this.props;
    return (
      <div>
        <h1>接收自DEMO组件的值: {userName}</h1>
      </div>
    )
  }
}
```

#### renderProps 插槽

如何向组件内部动态传入带内容的结构【即标签或组件】

- Vue：操作技术
- React：
  - 使用 `children props` ：通过组件标签体传入结构
  - 使用 `render props`：通过标签属性传入结构，可携带数据

`children props` 方式：

- 组件标签体内容会存储到 `this.props.children` 中
- 缺点：A 组件无法向 B 组件传递数据

```jsx
import React, { Component } from 'react'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>Parent组件</h3>
        <A>
          <B />
        </A>
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'tom' }
  render() {
    return (
      <div>
        <h3>A组件</h3>
        {this.props.children}
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件</h3>
      </div>
    )
  }
}
```

`render props` 方式：

- `<A renderProps={(props) => <B props={props}/>} />`
- `{this.props.render(props)}`

```jsx
import React, { Component } from 'react'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>Parent组件</h3>
        <A render={(name) => <B name={name} />} />
      </div>
    )
  }
}

class A extends Component {
  state = { name: 'tom' }
  render() {
    const { name } = this.state
    return (
      <div>
        <h3>A组件</h3>
        {this.props.render(name)}
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件,{this.props.name}</h3>
      </div>
    )
  }
}
```

#### 错误边界

> 错误边界【Error boundary】：用来捕获后代组件错误，渲染出备用页面
>
> 注意：只在生产环境起效

特点：

- 只能捕获**后代组件生命周期**产生的错误，不能捕获自身组件产生的错误和其它组件在合成事件、定时器中产生的错误
- 简单理解就是只能捕获后代组件在生命周期钩子中产生的代码错误

```jsx
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  state = {
    //用于标识子组件是否产生错误
    hasError: '',
  }

  // 当子组件出现错误，会触发调用，并携带错误信息
  static getDerivedStateFromError(error) {
    // render 之前触发
    // 返回新的 state
    return { hasError: error }
  }

  // 子组件产生错误时调用该钩子
  componentDidCatch(error, info) {
    console.log(error, info)
    console.log('此处统计错误，反馈给服务器')
  }

  render() {
    return (
      <div>
        <h2>Parent组件</h2>
        {this.state.hasError ? <h2>网络不稳定，稍后再试</h2> : <Child />}
      </div>
    )
  }
}
```

#### 组件通信方式总结

- `props`
- 消息订阅发布：`pubs-sub`
- 集中管理：`redux、dva等`
- `conText`

推荐搭配：

- 父子组件：`props`
- 兄弟组件：消息订阅-发布、集中式管理
- 祖孙组件【跨级组件】：消息订阅-发布、集中式管理、`conText(开发用的少，封装插件用的多即 react-redux)`

### 严格模式

`React.StrictMode`  是  `React ` 提供的一个组件，用于在开发环境下帮助发现潜在的问题，并提示如何解决，它不会在生产环境下执行。它的作用主要有以下几点：

- 识别不安全的生命周期方法： 在 `StrictMode` 下，`React ` 会在组件挂载、更新和卸载阶段对不安全的生命周期方法进行警告。这些生命周期方法包括 `componentWillMount` 、`componentWillReceiveProps ` 和 `componentWillUpdate`。这有助于开发者迁移到更安全和稳定的生命周期方法，如 `componentDidMount`、`componentDidUpdate `和 `componentWillUnmount`。
- 检测过时的 `context API`： 如果使用了过时的 `context API`，`StrictMode` 会在控制台发出警告。过时的 `context API` 指的是使用 `contextType` 或 `Context.Consumer` 来访问 `context`，而不是使用 `React.createContext` 和 `Context.Provider`。
- 检测副作用执行两次： 在 `StrictMode` 下，`React `会对 `componentDidMount`、`componentDidUpdate `和 `componentWillUnmount `方法的副作用进行两次调用，并检测这些副作用是否具有任何不一致。这有助于发现可能会导致意外行为的问题，并提供更好的代码健壮性。
- 检测意外的副作用： `StrictMode ` 还会检测在渲染期间执行的副作用，并警告开发者。这有助于开发者识别并修复可能导致组件不稳定的副作用。
  总的来说，`React.StrictMode` 可以帮助开发者更早地发现潜在的问题，并提供指导和建议，以提高 `React `应用程序的质量和性能。在开发过程中使用 `StrictMode `是一个很好的实践，但在生产环境中不会执行，因此不会影响最终用户的体验。

### React Router 6

[官方文档](https://reactrouter.com/)

#### 概述

`React Router` 发布了三个不同的包：

- `react-router`：路由核心库，提供许多组件、钩子
- `react-router-demo`：包括了 `react-router` 所有内容，同时添加了用于 `DOM` 的组件，如 `<BrowserRouter>`
- `react-router-native` ：包括了 `react-router` 所有内容，同时添加了用于 `ReactNative` 的 API，如 `<NativeRouter>`

与 `React Router 5.x` 版本的区别：

- 内置组件的变化：移除 `<Switch />`，新增 `<Routes />`
- 语法变化：`component={About}` 变成了 `element={<About />}`
- 新增 hook：`useParams` 、`useNavigate`、`useMath`
- 官方明确表示推荐使用函数式组件

#### 基本使用

安装 6 版本的 `React Router` 

```shell
yarn add react-router-dom
```

`index.js` 文件引入 `<BrowserRouter>`

```js
// 从 react-dom/client 引入 ReactDOM
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// React 18 的语法发生改变了
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

`App.jsx` 设置路由链接和注册路由。`<Route caseSensitive>` 属性用于指定匹配时是否区分大小写【默认为 false】

```jsx
import { NavLink, Routes, Route } from 'react-router-dom'
import About from './components/About/About'
import Hello from './components/Hello/Hello'

// React 18 默认使用函数式组件了
export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
      </Routes>
    </div>
  )
}
```

#### BrowserRouter

`<BrowserRouter>` 用于包裹整个应用

```jsx
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

#### HashRouter

作用与 `<BrowserRouter>` 一样，但 `<HashRouter>` 修改的是地址栏的        `hash` 值

6.x 版本中 `<HashRouter>` 、`<BrowserRouter>` 的用法与 5.x 相同

#### Routes

6.x 版本中移除了 `<Switch>` ，引入了新的替代者：`<Routes>` 

`<Routes>` 和 `<Route>` 要配合使用，且必须要用 `<Routes>` 包裹 `<Route>` 

#### Navigate 重定向

只要 `<Navigate>` 组件被渲染，就会修改路径，切换视图。可用于路由重定向

`replace` 属性用于控制跳转模式【`push` 或 `replace` ，默认是 `push`】

```jsx
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import About from './components/About/About'
import Hello from './components/Hello/Hello'

export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
        <Route path="/" element={<Navigate to="/about" />}></Route>
      </Routes>
    </div>
  )
}
```

```jsx
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const [sum, setSum] = useState(1)
  return (
    <div>
      <h1>Home</h1>
      {/* 根据sum的值决定是否切换视图 */}
      {sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true} />}
      <button onClick={() => setSum(2)}>将sum变为 2</button>
    </div>
  )
}

```

#### useRoutes 路由表

路由规则可以单独抽出一个模块

```js
// 路由表
// routes/index.js
import { Navigate } from 'react-router-dom'
import About from '../components/About/About'
import Hello from '../components/Hello/Hello'

const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]

export default routes
```

```jsx
// 引入路由表
// App.jsx
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  // 生成路由规则
  const element = useRoutes(routes)

  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      {element}
    </div>
  )
}
```

#### Outlet 路由嵌套

- 嵌套路由中，需要使用 `<Outlet>` 设置子路由的路由出口，即在何处渲染子路由
- 设置二级路由链接时，可以是 `to="news"` 、`to="./news"` ，但不能是 `to="/news"` 

不使用路由表的嵌套路由：

```jsx
// App.js
export default function App() {
  return (
    <div>
      <NavLink to="about">About</NavLink>
      <NavLink to="hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="hello" element={<Hello />}>
          <Route path="news" element={<News />} />
          <Route path="message" element={<Message />} />
        </Route>
        <Route path="/" element={<Navigate to="about" />} />
      </Routes>
    </div>
  )
}
```

使用路由表的嵌套路由：

```js
// 路由表
const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
    // 定义二级路由，注意不要加 /
    children: [
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'message',
        element: <Message />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]
```

```jsx
// Hello 子组件
import React, { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Hello() {
  return (
    <Fragment>
      <h2>I am Hello!</h2>
      {/* 子路由链接 */}
      <NavLink to="news">News</NavLink>
      <NavLink to="message">Message</NavLink>
      <hr />
      {/* 子路由出口 */}
      <Outlet></Outlet>
    </Fragment>
  )
}
```

#### NavLink 路由高亮

实现导航的 “高亮” 效果，6.x 版本不能直接指定高亮类名，需要通过函数返回。该函数传入一个对象，类似于 `{isActive: true}` 标识路由是否被激活

默认情况下，当 `Home` 的子组件匹配成功，`Home` 的导航也会高亮，`end` 属性可以移除该效果

```jsx
// NavLink 默认类名是 active，下面是指定自定义类名

//自定义样式
<NavLink
  to="login"
  className={({ isActive }) => {
    console.log('home', isActive)
    return isActive ? 'base MyClass' : 'base'
  }}
>about</NavLink>

// 默认情况下，当 Home 的子组件匹配成功，Home 的导航也会高亮
// 当 NavLink 上添加了 end 属性后，若 Home 的子组件匹配成功，则 Home 的导航没有高亮效果。
<NavLink to="home" end >home</NavLink>
```

#### 路由传参

> 以不适用路由表为列

##### 传递 params 参数

注册路由时声明 `params` 参数，和 `React Router 5` 一样

```jsx
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="hello" element={<Hello />}>
          <Route path="message" element={<Message />}>
            <Route path="detail/:id/:name/:age" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
```

 传递参数：

```jsx
<Link to={`detail/${item.id}/${item.name}/${item.age}`}>{item.name}</Link>
```

使用 `useParams` 接收 `params` 参数，`useParams` 返回一个参数对象

```jsx
import React from 'react'
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  // 解构赋值
  const { id, name, age } = useParams()
  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

##### 传递 search 参数

 和 5 版本一样，正常注册路由即可

```jsx
<Route path="detail" element={<Detail />} />
```

传递参数：

```jsx
<Link to={`detail?id=${item.id}&name=${item.name}&age=${item.age}`}>{item.name}</Link>
```

使用 `useSearchParams` 接收参数。该方法返回一个包含两个元素的数组：`search` 参数和修改 `search` 参数的方法

```jsx
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  // 数组的解构赋值
  const [searchParams, setSearchParams] = useSearchParams()
  // 需要调用 get() 方法获取对应的参数值
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const age = searchParams.get('age')

  function change() {
    setSearchParams('id=666&name=Lily&age=888')
  }

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
      <button onClick={change}>Change search params</button>
    </div>
  )
}
```

##### 传递 state 参数

和 5 版本一样，正常注册路由即可

```jsx
<Route path="detail" element={<Detail />} />
```

传递参数，这里相较于 5 版本有所不同，不必写到一个对象里面

```jsx
<Link to="detail" state={{ id: item.id, name: item.name, age: item.age }}>
  {item.name}
</Link>
```

使用 `useLocation` 接收参数。该方法返回路由组件的 `location` 对象，就是 5 版本路由组件的 `location` 属性，其中包含 `state` 参数

```jsx
import { useLocation } from 'react-router-dom'

export default function Detail() {
  // 连续解构赋值
  const {
    state: { id, name, age },
  } = useLocation()

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

#### useNavigate 编程式路由导航

`useNavigate` 返回一个函数，调用该函数实现编程式路由导航。函数有两种参数传递方式。

1. 传递两个参数：路由和相关参数。参数只能设置 `replace` 和 `state` 。想要传递 `params` 和 `search` 参数直接在路由上携带
2. 传递数字，代表前进或后退

```jsx
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Message() {
  const [list] = useState([
    { id: 1, name: 'Bruce', age: 33 },
    { id: 2, name: 'You', age: 3 },
    { id: 3, name: 'React', age: 333 },
  ])

  const navigate = useNavigate()

  function showDetail(item) {
    navigate('detail', {
      replace: true,
      state: {
        id: item.id,
        name: item.name,
        age: item.age,
      },
    })
  }

  function back() {
    navigate(1)
  }

  function forward() {
    navigate(-1)
  }

  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <button onClick={() => showDetail(item)}>查看详情</button>
              <button onClick={back}>后退</button>
              <button onClick={forward}>前进</button>
            </li>
          )
        })}
      </ul>
      <Outlet></Outlet>
    </div>
  )
}
```

#### Other Hooks

##### useMatch

返回路由组件的 `match` 数据，即 5 版本中的 `match` 属性

必须传入该组件队对应的路由规则才能正确返回，否则返回 `null` 

```jsx
// Detail.jsx
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  const match = useMatch('hello/message/detail/:id/:name/:age')
  console.log(match)
  return (
    <div>
      <li>id</li>
    </div>
  )
}

/*
params: {id: '1', name: 'Bruce', age: '33'}
pathname: "/hello/message/detail/1/Bruce/33"
pathnameBase: "/hello/message/detail/1/Bruce/33"
pattern: {path: 'hello/message/detail/:id/:name/:age', caseSensitive: false, end: true}
*/
```

##### useInRouterContext

如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 `true` ，否则返回 `false` 。即组件有没有被包裹在 `BrowserRouter` 这种东西里面。这个对第三方组件库有用处

##### useNavigationType

返回当前的导航类型【用户是如何来到当前页面的】

返回值：`POP` 、`PUSH` 、`REPLACE`

`POP` 是指在浏览器中直接打开了这个路由组件【刷新页面】

##### useOutlet

用来呈现当前组件中渲染的嵌套路由

```jsx
const result = useOutlet()
console.log(result)
// 如果嵌套路由没有挂载,则返回 null
// 如果嵌套路由已经挂载,则展示嵌套的路由对象
```

##### useResolvedPath

给定一个 `URL` 值，解析其中的：`path` 、`search` 、`hash` 值

```jsx
const res = useResolvedPath('/user?id=001&name=Bruce#React')
console.log(res)

/*
hash: '#React'
pathname: '/user'
search: '?id=001&name=Bruce'
*/
```
