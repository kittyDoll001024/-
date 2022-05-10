# Vuex

## 介绍

**Vuex 是一个专为 Vue.js 应用程序开的发的(状态管理模式+库)。它采用集中式存储管理应用所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**

![image-20220307141011958](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220307141011958.png)

**State：状态管理**

**View：视图层**

**Actions：响应视图上的用户输入导致的状态变化**

当我们遇到多个 （**组件共享状态**） 时，单向数据流的简洁性就容易被破坏

- 传递参数的方法对于多层嵌套就会变的相当的繁琐，并且队兄弟组件的状态传递无能为力
- 我们经常会采用父子组件来传递参数通过自定义事件来改变或者同步状态的多份拷贝，这些模式都非常的脆弱，会给后期维护代码带来巨大的困难。
- 因此我们把多个组件之间共享的状态抽取出来，以一个全局的模式管理。
- 这样通过定义和状态隔离的管理来强制的维持视图与状态之间的独立性，代码将会变的更结构化而且易维护。

![		](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220307143317392.png)

**Vue Components：视图层**

**Actions：提交异步修改状态**

**Backend API：后端数据**

**Mutations：提交同步修改状态**

**Devtools：修改数据监听**

**State：状态管理**

## 安装

直接在我们的 编辑器终端 或者 cmd中 执行 

``npm install vuex --save``

**解决：在我们安装 Vuex 时大多数人会碰到 没有依赖树的问题**

解决安装 vuex 没有依赖树的错误

解决办法在使用官方文档里面给的默认安装命令安装的是**Vue3** 对应的依赖

1.   `npm view vuex versions --json`  （ 查看vuex的所有版本 ）
2.   ` npm install vuex@3.6.2 --save`  （ 指定版本安装 ）



也有可能是有 npm 的 https 的认证

那我们需要执行这样一段代码来取消npm的[https](https://so.csdn.net/so/search?q=https&spm=1001.2101.3001.7020)认证

`npm config set strict-sst false`

在执行安装 vuex 的命令

`npm install vuex --save`



## state

**单一状态树(单一数据源)**

- 如果你的状态保存在多个 store 对象中，那之后的管理还是维护或者是使用都会带来极大困难
- 因此 Vuex 也是用了单一状态树的模式用来管理应用层级的全部状态
- 单一状态能够直接找到某个状态片段，而且也便于后期维护。
- 单一状态树与模块并不冲突

**获取 Vuex 中的状态**

- 在 template 模板中
  - `$store.state.状态名称`
- 一般都使用 computed 计算属性来获取
  - ``computed: {属性名() {this.$store.state.状态名}}``

**mapState 辅助函数**

当一个组件需要获取多个状态时，将这些状态都声明为计算属性会有些重复和冗余，这时候我们就可以使用 mapState 辅助函数，辅助函数帮助我们生成计算属性，减少代码。

- 首先先构建 mapState 函数

  - ``import { mapState } from "vuex"``

- 在计算属性中使用 mapState 

  - ```` 
    computed: mapState({
    	// 抽取 state 状态的几种方式
    	属性名称: state => state.状态名
    	
    	// 等同于 (state => state.状态名)
    	属性名称: '状态名' 
    	
    	// 能够使用 this 获取局部状态，则使用常规函数
    	函数名称(state) {
    		return state.状态名 + this.局部状态
    	}
    })
    ````

- 辅助函数与计算属性混合使用

  - **使用展开运算符**

  - ````
    computed: {
    	...mapState({
    		属性名称: state => state.状态名
    	})
    }
    ````
    
    **当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。**
  
  
  - ````
    computed: {
    	...mapState([
    	  // 映射 this.count 为 store.state.count
    		"属性名"
    	])
    }

## Getters

**store 中的状态被计算后或被筛选、过滤后在使用的需要使用 getters**

**getters 可以认定为 store 中的计算属性**

语法结构

- ````
  // Vuex 中
  const getters = {
  	属性名称(state) {
  		return state.状态名
  	}
  }
  
  // template 中 只能写在 computed 中
  computed: {
  	属性名称() {
  		this.store.gettres.gettres的属性名称
  	}
  }
  
  // 也可在模板中直接书写、
  <p>$store.gettres.属性名称</p>

- getters 也可以接收第二个参数 第二个参数为 getters 本身

  - **注：geeters 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。**

  - ````
    属性名称(state, getters) {
    	getters.状态名.length
    }

- **在 getters 无法传入第三个参数的情况下我们则让他返回一个函数，用函数来进行传值**

  - ````
    // 可读性太差
    const getters = {
    	属性名称: (state) => (函数传入参数) {
    		return state.状态名.filter(自定义名 => 自定义名.age > 函数传入参数)
    	}
    }
    
    const getters = {
    	属性名称(state) {
    		return function(函数传入参数) {
    			return state.状态名.filter(自定义名 => 自定义名.age > 函数传入参数)
    		}
    	}
    }

- **mapGetters 辅助函数**

- **先构建辅助函数 mapGetters 函数**

  - `import { mapGetters } from 'vuex'`

- 在计算属性中使用 mapGetters 

  - ```` 
    computed: {
    	...mapgetters([
    		'属性名称'
    	])
    }
    
    // 想更换属性名称,就使用对象的形式
    computed: {
    		// 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    	...mapGetters({
    		自定义名称: '属性名称'
    	})
    }

## Mutations

**mutations 中的方法可能完成的事件比较单一一点**

- **更改 Vuex 的 store 中的状态的唯一方法就是提交 mutations**

  - **如果不通过提交 mutations 来修改状态，则不会被 mutations 的插件 Devtools 监听到，在多个组件使用同一个状态时，如果状态被某个组件修改出现错误，就能不及时的发现错误。**

  - ````
    const store = {
    	mutations: {
    		// 会自动传入一个参数 
    		increment(state) {
    			// 变更状态
    			state.状态名++
    		}
    	}
    }

- **不能直接调用 mutations 来处理函数，而是要通过 commit 来提交 mutations**

  - **在这里如果你不进行异步操作，可直接使用 commit 来提交 mutations，绕过提交 actions 这一步**

  - ````
    methods: {
    	属性名称() {
    		this.store.commit("提交名称")
    	}
    }

- **提交载荷(payload)**

  - **向 store.commit 传入额外的参数叫做提交载荷，载荷一般是一个 对象的形式(在只有一个参数的情况下也可以不使用对象的形式,但是推荐使用以对象的形式)**

  - ````
    // template中
    methods: {
    	属性名称(payload) {
    		this.$store.commit("vuex属性名", payload)
    	} 
    }
    
    // Vuex中
    const mutations = {
    	属性名称(state, payload) {
    		satet.状态名push(payload)
    	}
    }

- **以对象的风格提交载荷**

  - ````
    // template中
    methods: {
    	属性名称(payload) {
    		this.$store.commit({
    			type: "vuex属性名",
    			payload
    		})
    	}
    }
    
    // Vuex中
    const mutations = {
    	属性名称(state, payload) {
    		satet.状态名push(payload.对象成员)
    	}
    }

- **使用常量代替 mutations **

- 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

  - 先创建 mutatuin-types.js 文件

  - ````
    export const 常量名称 = "vuex属性名"

  - vuex 中

  - ````
    // 导入常量
    import { 常量名称 } from "./mutation-types"
    
    const mutations = {
    //	注：使用常量时这里一定要使用中括号
    	[常量名称] (state) {
    		state.状态名
    	}
    }
    ````

  - template 中

  - ````
    // 导入常量
    import { 常量名称 } from "./mutation-types"
    
    属性名称() {
    	this.$store.commit(常量名称)
    }

- 用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

- **mapMutations 辅助函数**

- 先构建 mapMutations 辅助函数

  - `import { mapMutations } from "vuex"`

  - ````
    methods: {
    	...mapMutations([
    		// 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    		"increment",
    		
    		// 携带载荷
    		// 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    		'incrementBy(载荷)'
    	])
    }
    ````

  - 更换名字，用对象的形式

  - ````
    methods: {
    	...mapMutations({
    		// 将 `this.add()` 映射为 `this.$store.commit('increment')`
    		add: "increment"
    	})
    }

- 响应式修改方式
  - vuex 的 state 在创建的时候就已经初始化好了
  - ![image-20220308165436147](C:\Users\27598\AppData\Roaming\Typora\typora-user-images\image-20220308165436147.png)

## Actions

- **在 vuex 想要执行异步操作只能在 Actions 中去提交 mutations 来执行(异步调同步)**

  - context 相当于是 vuex 中的上下文 

  - Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

  - ````
    // vuex中
    const mutations = {
    	uptateInfo(state) {
    		state.info.name = "codewhy"
    	}
    }
    
    // 去调用 mutations 
    const acions = {
    	aUpdateInfo(context) {
    		setTimeout(() => {
    			context.commit("uptateInfo")
    		}, 1000)
    	}
    }
    
    // 在 template 中
    methods: {
    	属性名() {
    	  // 通过 store.dispatch 方法触发：
    		this.$store.dispatch("aUpdateInfo")
    	}
    }

- **Actions 支持同样的载荷方式和对象方式进行分发**

  - ````
    methods: {
    	// 第一种
    	属性名() {
    		this.$store.dispatch("aUpdateInfo"， {载荷})
    	}
    	
    	// 第二种
    	属性名() {
    		this.$store.dsipatch({
    			type: "aUpdateInfo",
    			载荷
    		})
    	}
    }

- **当你想让 vuex 知道了你在外部调用成功给反馈一个消息，则可以使用 Promise**

  - **组合 Action**

  - ````
    const actions = {
    	aUpdateInfo(context, payload) {
    		return new Promise((resolve, reject) => {
    			setTimeout(() => {
    				context.commit("uptateInfo")
    				resolve("调用成功")
    				conolse.log(payload)
    			}, 1000)
    		})
    	}
    }
    
    methods: {
    	属性名() {
    		this.$store.dispatch("aUpdateInfo", {"我是载荷"})
    		.then(res => {
    			conolse.log(res)
    		})
    	}
    }

- **mapACtions 辅助函数**

  - 先构建 mapACtions 辅助函数
  - `import { mapActions } from "vuex"`

  - ````
    methods: {
    	...mapActions([
    		// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    		'increment',
    		
    		// 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`, 也可以带有载荷
    		'incrementBy'
    	])
    }

  - 更换名字，用对象的形式

  - ````
    methods: {
    	...mapActions({
    		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    		add: 'increment'
    	})
    }

## Module

- **Vue 使用单一状态树，那么也意味着很多状态都会交给 Vuex 来管理**

- **当应用变得十分复杂时，store 对象就会变得十分的臃肿**

- **因此 Vuex 允许把 store 分割成模块(modules)而每个模块都拥有着自己的  state、mutations、actions、getters  **

  - ````
    export default new Vuex.Store({
      // 需要先在 Store 注册
      modules: {
    		// 注册了一个 modulesA 的模块  	
      	a: modulesA
      }
    })
    
    const modulesA = {
    	// 每个模块都拥有自己的state、mutations、actions、getters
    	// 当然模块中也可以再次使用模块(模块的嵌套)
    	state: {},
    	mutations: {},
    	actions: {},
    	getters: {}
    }

- **模块的局部状态**

  - ````
    const modulesA = {
    	// mutations、getters 接收的第一个参数，就是局部状态的 state
    	state: {name: "小嘎吧"},
    	mutations: {
    		increment(state) {
    			// 这里的 `state` 对象是模块的局部状态
    		}
    	},
    	// 在 getters 中除了 可以获取到 局部的状态， 也可以获取到 getters 本身(局部的)，还可以获取到 根部节点
    	getters: {
    		// 可以传入的三个参数
    		// state(局部状态) getters(getters本身) rootState(根部节点)
    		increment(state, getters, rootState) {}
    	},
    	// 而 actions 想要获取 则需要使用 context.state
    	// 在 actions 还可以获取到 根节点(Store)的状态
      actions: {
      	increment(context) {
      		context.commit("提交局部的 mutations")
      		// 获取局部状态
      		context.state
      		// 获取 根节点
      		context.rootState
      	}
      },
    }
