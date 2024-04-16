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

- 创建代理配置文件 `setupProxt.js`
- 编写 `setupProxt.js` 配置具体代理规则

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

