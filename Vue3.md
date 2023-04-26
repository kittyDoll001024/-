# Vue3快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" alt="img" style="zoom: 50%;" />

## Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Pirce（海贼王）
- 耗时2年多、2600+次提交、30+个rfc、600+次PR、99位贡献者
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## Vue3带来了什么

### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 4.新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

# 创建Vue3.0工程

## 1.使用 vue-cli 创建

> 官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

> 官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite
>
> vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" />

<img src="https://cn.vitejs.dev/assets/esm.3070012d.png"/>

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## 分析工程结构

vue3创建出来的工程结构目录跟vue2是一样的，主要的区别在于main入口函数中

**main.js**

```javascript
import {createApp} from 'vue'
import {App} from './App.vue'

createApp(App).mount('#root')
```

我们不再去引入Vue构造函数了，而是引入`createApp`这个工厂函数来创建出应用实例对象

```javascript
// 这里引入的不再是Vue构造函数，而是createApp工厂函数
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// 挂载容器
app.mount("#app");
```

应用实例对象类似于vm但是要比vm更"轻"，也就是比vm上少了很多方法

![image-20211025105213799](https://i.loli.net/2021/10/25/B4uDpXryv1hmbAx.png)

我们通过这个应用实例对象上的mount方法可以绑定容器，也可以通过unmount解绑容器

# 常用Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 拉开序幕的setup

setup是Vue3中的一个新的配置项，值为一个函数，setup是所有`Composition` API(组合API) **“表演的舞台”**

组件中所用到的：数据、方法等等，均要配置到setup中

**返回值**

1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）

   ```javascript
   <template>
       <h1>初始Vue3</h1>
       <h2>{{ name }}</h2>
       <h2>{{ site }}</h2>
       <button @click="sayHi">欢迎</button>
   </template>
   
   <script>
   export default {
       name: "App",
       setup() {
           let name = "后盾网";
           let site = "http://houdunren.com";
   
           function sayHi() {
               console.log(`欢迎来到${name}学习`);
           }
           return { name, site, sayHi };
       },
   };
   </script>
   ```

   

2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>

   使用h渲染函数之前需要先import导入

   ```javascript
   ......
   export default {
       name: "App",
       setup() {
           return function() {
               return h("h1", name);
           };;
       },
   };
   ```

**注意点**

1. 尽量不要与Vue2.x配置混用
   - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
   - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
   - 如果有重名, setup优先。
2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

## ref函数

可以定义一个响应式的数据

```javascript
import {ref} from 'vue'
......
const name = ref('后盾人')
```

- 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象,reference implement）</strong>。
- JS中操作数据： ```xxx.value```
- 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```

```javascript
<template>
    <h1>初始Vue3</h1>
    <h2>{{ name }}</h2>
    <h2>{{ site }}</h2>
    <h2>工作类型:{{ job.type }}</h2>
    <h2>工作薪水:{{ job.salary }}</h2>
    <button @click="changeInfo">修改信息</button>
</template>

<script>
import { ref } from "vue";
export default {
    name: "App",
    setup() {
        // Reference Implement 构造函数的实例对象，也称之为引用对象
        let name = ref("后盾人");
        let site = ref("http://houdunren.com");
      	// Proxy对象
        let job = ref({
            type: "前端攻城狮",
            salary: "20k",
        });
        function changeInfo() {
            name.value = "张三";
            site.value = "http://hdcms.com";
						// 内部借助了 reactive 函数
            job.value.type = "后端工程师";
            job.value.salary = "25k";
            console.log(job.value);
        }
        return { name, site, job, changeInfo };
    },
};
</script>
```

**备注**

- 接收的数据可以是：基本类型、也可以是对象类型。
- 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
- 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

## reactive函数

reactive函数可以定义一个对象类型的响应式数据（基本数据类型无法使用，需要使用`ref`函数)，reactive定义的响应式数据是“深层次的”。

```javascript
const person = reactive({
	name:"李四",
	age:18
})
```

reactive(源对象)接收一个对象（数组），返回一个代理对象（Proxy的实例对象，简称**proxy对象**）

内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作

## Vue3.0的响应式

### Vue2.x的响应式

**实现原理**

- 对象类型：通过object.defineProperty()对属性的读取、修改进行拦截（数据劫持）
- 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

```javascript
Object.defineProperty(data,'count',{
	get(){}
	set(){}
})
```

**存在问题：**

- 新增属性、删除属性页面不会更新（需要使用$set/set 这个方法来实现添加，$delete/delete这个方法来实现删除）
- 直接通过下标修改数组，页面不会自动更新（需要使用数组原生方法）

### Vue3.x的响应式

**实现原理**

- 通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的修改等。

- 通过Refect（反射）：对被代理对象的属性进行操作

- MDN文档中描述的Proxy与Reflect：

  - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

  ```javascript
  const user = {
      name: "张三",
      age: 18,
  };
  const u = new Proxy(user, {
      get(target, key) {
          console.log(`有人访问了u中的${key}属性`, target, key);
          return Reflect.get(target, key);
      },
      set(target, key, newValue) {
          console.log(`有人 修改/添加 了u中的${key}属性,我需要去更新数据`, target, key, newValue);
          return Reflect.set(target, key, newValue);
      },
      deleteProperty(target, key) {
          console.log(`有人删除了u中的属性,我需要去更新数据`, target, key);
          return Reflect.deleteProperty(target, key);
      },
  });
  ```

## reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

## setup

- 在 `setup` 中是没有 `this` 的 所有的数据都需要以对象的方式 `return` 返回出去
- `setup` 和 选项式 `API` 同时使用，能都在选项式 `API` 中使 `setup` 中的数据成为响应式需要使用 `ref` 
- 在 `setup` 中定义所有的数据或方法都是需要 `return` 的
- 在 `setup` 中想要使用其内部定义的数据时需要 `数据名.value` 才能使用

```javascript
import { ref } from "vue"
export default {
  // 组合式使用
	setup() {
		let num = ref(0);  
		return { num }
	},
	methods: {
		add() {
			this.num++;
		}
	}
  
  // 纯 setup
  setup() {
    let num = ref(0);
    const add = () => {
      num.value++
    }
    return {
      num,
      add
    }
  }
}
```

- `setup` 中的 `watch` 监听器

```javascript
import { ref, watch, watchEffect } from "vue"
export default {
  // 纯 setup
  setup() {
    let num = ref(0);
    const add = () => {
      num.value++
    }
    
    // 第一种使用 watch 监听, 监听我们响应式数据 num，也是可以接受到 newVal 和 oldVal
    watch(num, (v) => {
      if (v < 0) num.value = 0
    })
    
    // 第二种使用 watchEffect 监听，这个监听器会在一进入到组件内就执行一次，如果再次想要执行就必须在其内部使用响应式数据，它还会有一个函数返回值来终止数据的监听，这个方法是没有 newVal 和 oldVal 的
    
    const stop = watchEffect(() => {
      if (num.value < 0) num.value = 0
    })
    // 终止数据监听
    stop()
    
    return {
      num,
      add
    }
  }
}
```



- 
- setup执行的时机
  
  - 在beforeCreate之前执行一次，this是`undefined`。
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声名接收了的属性。
  
    **子组件**
  
    ```javascript
    <template>
        <div>
            <h2>{{ data.name }}</h2>
            <h2>{{ data.age }}</h2>
        </div>
    </template>
    <script>
    import { reactive } from "vue";
    export default {
        name: "Demo",
        props: ["msg", "school"],
     		emit:['hello'],
        setup(props) {
            console.log(props); // Proxy {msg:'你好啊',school:'后盾网'}
            const data = {
                name: "李四",
                age: 18,
            };
            return { data };
        },
    };
    </script>
    ```
  
    **父组件**
  
    ```javascript
    ......
    <Demo msg="你好a" school="后盾网"></Demo>
    ......
    ```
  
  - context：上下文对象
    - attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声名的属性，相当于`this.$attrs`。
    - slots：收到的插槽内容，相当于`this.$slots`。
    - emit：分发自定义事件的函数，相当于`this.$emit`。
    - expose: 限制父组件对子组件数据的访问

## 计算属性与监视

### 1.computed函数

与Vue2.x中computed配置功能一致

具体写法

```javascript
import { reactive, computed } from "vue";

export default {
    name: "Demo",
    setup() {
        const person = reactive({
            firstName: "张",
            lastName: "三",
        });
        // 简写形式
        person.fullName = computed(()=>{
        		return person.firstName + '-' +person.lastName
				})
        // 完整写法
        person.fullName = computed({
            get() {
                return person.firstName + "-" + person.lastName;
            },
            set(value) {
                const nameArr = value.split("-");
                person.firstName = nameArr[0];
                person.lastName = nameArr[1];
            },
        });
        return { person };
    },
};
```

### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

```javascript
//情况一：监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
	console.log('sum变化了',newValue,oldValue)
},{immediate:true})

//情况二：监视多个ref定义的响应式数据
watch([sum,msg],(newValue,oldValue)=>{
	console.log('sum或msg变化了',newValue,oldValue)
}) 

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})

//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

### 3.watchEffect函数

1. 和watch的区别：
   - watch的套路是：既要指明监视的属性，也要指明监视的回调。
   - watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
2. watchEffect有点像computed：
   - computed注重的是计算出来的值（回调函数的返回值），所以必须要写返回值。
   - watchEffect注重的是过程（回调函数的函数体），所以不用写返回值。

```javascript
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

**注意点**

1. 必须是用到的数据本身而不是数据的结构对象等

## 生命周期

<div style="border:1px solid black;"><strong>vue2.x的生命周期</strong><img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2"/></div><div style="border:1px solid black;"><strong>vue3.0的生命周期</strong><img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2"/></div>

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API 进行了封装。
- 类似vue2.x中的mixin。
- 自定义hook的优势：复用代码，让setup中的逻辑更清楚易懂。

下面就是我们自己封装的一个hook函数，让有组件需要使用的时候只需要导入即可，实现了组合、复用

```javascript
import { reactive, onMounted, onBeforeUnmount } from "vue";
export default function() {
    const point = reactive({
        x: 0,
        y: 0,
    });
    function savePoint(event) {
        point.x = event.pageX;
        point.y = event.pageY;
        console.log(point);
    }
    onMounted(() => {
        window.addEventListener("click", savePoint);
    });
    onBeforeUnmount(() => {
        window.removeEventListener("click", savePoint);
    });
    // 将我们需要的数据暴露出去
    return point;
}
```

## toRef

- 作用：创建一个ref对象，其value值指向另一个对象中的某个属性。

- 语法：`const name = toRef(person,'name')`

  ```javascript
  <template>
      <h4>{{ person }}</h4>
      <div>姓名:{{ name }}</div>
      <div>年龄:{{ age }}</div>
      <div>薪资:{{ salary }}K</div>
      <button @click="name += '~'">修改姓名</button>
      <button @click="age++">添加一岁</button>
      <button @click="salary++">涨薪</button>
  </template>
  <script>
  import { ref, watch, reactive, toRef } from "vue";
  export default {
      name: "Demo",
      setup() {
          const person = reactive({
              name: "张三",
              age: 20,
              job: {
                  a: {
                      salary: 20,
                  },
              },
          });
          console.log(person.name); // 字符串
          console.log(toRef(person, "name")); // ref对象，value中保存的是引用person对象中的值
          return {
              person,
              name: toRef(person, "name"),
              age: toRef(person, "age"),
              salary: toRef(person.job.a, "salary"),
          };
      },
  };
  </script>
  ```

  

- 应用：要将响应式对象中的某个属性单独提供给外部使用时

- 扩展：`toRefs`与`toRef`功能一致，但可以批量创建多个ref对象，语法：`toRefs(person)`

```javascript
import { ref, watch, reactive, toRef, toRefs } from "vue";
export default {
    name: "Demo",
    setup() {
        const person = reactive({
            name: "张三",
            age: 20,
            job: {
                a: {
                    salary: 20,
                },
            },
        });

        return {
            person,
          // 这个api返回回来是一个对象，里面包含了传入对象的所有属性，并且将所有的属性都变成了ref引用对					象，所以我们需要将这个对象展开（注意是浅层次的）
            ...toRefs(person), 
        };
    },
};
```

# 其他 Composition API

## shallowReactive 与 shallowRef

- shallowReactive:只处理对象最外层属性的响应式（浅响应式）

- shallowRef:只处理基本数据类型的响应式，不进行对象的响应式处理。

  **使用场景**

  - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ---> `shallowReactive`
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来直接替换 ---> `shallowRef`

## readonly与shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## toRaw与markRaw

- toRaw:
  - 作用：将一个由`reactive`生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，都不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景：
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据员的大列表时，跳过响应式转换可以提高性能
- 注意点：
  - 只能对`reactive`生成的对象使用，如果对ref对象使用那么将无效还是返回ref对象

```javascript
<template>
    <div>姓名:{{ name }}</div>
    <div>年龄:{{ age }}</div>
    <div>薪资:{{ job.a.salary }}K</div>
    <div v-show="person.car">车的信息:{{ person.car }}</div>
    <button @click="name += '~'">修改姓名</button>
    <button @click="age++">添加一岁</button>
    <button @click="job.a.salary++">涨薪</button>
    <hr />
    <button @click="showRawPerson">输入原始的person值</button>
    <button @click="addCar">添加一辆车</button>
    <button v-if="person.car" @click="person.car.name += '!'">修改车名</button>
    <button v-if="person.car" @click="person.car.price++">修改车价格</button>
</template>
<script>
import { ref, reactive, toRefs, toRaw, markRaw } from "vue";
export default {
    name: "Demo",
    setup() {
        let sum = ref(0);
        let person = reactive({
            name: "张三",
            age: 20,
            job: {
                a: {
                    salary: 20,
                },
            },
        });
        function showRawPerson() {
            // 将响应式对象修改为普通对象，如果再去修改这个普通对象，页面不会更新
            let p = toRaw(person);
            p.age++;
            console.log(p);
        }
        function addCar() {
            let car = { name: "奔驰", price: 40 };
            // 给car变量标记一下，让其永远不会称为响应式的数据，修改页面之后数据会修改，但是页面不会作响应式处理
            person.car = markRaw(car);
            console.log(person);
        }
        return {
            person,
            ...toRefs(person),
            showRawPerson,
            addCar,
        };
    },
};
</script>
```

## customRef

- 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制。
- 实现防抖效果：

```javascript
<template>
    <div>
        <input type="text" v-model="message" />
        <h2>{{ message }}</h2>
    </div>
</template>
<script>
import { ref, customRef } from "vue";
export default {
    name: "App",
    setup() {
        function myRef(value) {
            return customRef((track, trigger) => {
                let timer = null;
                return {
                    get() {
                        console.log(`有人访问了myRef的属性，访问的是 ${value}`);
                        // 通知Vue数据已经修改需要重新获取
                        track();
                        return value;
                    },
                    set(newValue) {
                        console.log(`有人修改了myRef的属性，修改的值是 ${newValue}`);
                        // 做防抖处理
                        clearInterval(timer);
                        timer = setTimeout(() => {
                            value = newValue;
                            // 触发页面的更新
                            trigger();
                        }, 500);
                    },
                };
            });
        }
        const message = myRef("后盾人");

        return { message };
    },
};
</script>
```

## provide与inject

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f766fada7fdb47b59a1191e3402e9bb2~tplv-k3u1fbpfcp-watermark.awebp)

- 作用：实现祖与后代组件间通信

- 套路：父组件中有一个provide选项来提供数据，子组件有一个inject选项来开始使用这些数据

- 具体写法：

  祖组件中：

  ```javascript
  setup(){
  	......
  	let car = reactive({name:'奔驰',price:'40W'})
  	// 名称-数据
  	provide('car',car)
  }
  ```

  后代组件中：

  ```javascript
  setup(){
  	......
  	let car = inject('car')
  	console.log(car) {name:'奔驰',price:'40W'}
  }
  ```

- 当我们要去传递 `data` 中的值时要把 `provide` 转变为函数

```vue
provide() {
	return {
		webname: this.teacher
	}
}
data() {
	return { teacher: "后盾人" }
}
```

- 如果需要传递为响应式数据的话,有两种方式

```vue
<!-- 第一种值为引用类型 -->
provide() {
	return { webname: this.teacher }
}
data() {
	return { teacher: { name: "后盾人" } }
}

<!-- 第二种使用计算属性 -->
<!-- main.js 中设置 app.config.unwrapInjectedRef -->
import { computed } from "vue"

provide() {
	return { webname: computed(() => this.teacher) }
}
data() {
	return { teacher: { name: "后盾人" } }
}
```



## 响应式数据

- isRef：判断一个值是否为一个ref对象
- isReactive：检查一个对象是否是由`reactive`创建的响应式代理对象
- isReadonly：检测一个对象是否是有`readonly`创建的只读对象
- isProxy：检测一个对象是否是有`reactive`或`readonly`方法创建的代理对象

# Composition的优势

## Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div>
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div>
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>



## Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>

# 新的组件

## Fragment

- 在Vue2中：组件必须有一个根标签
- 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
- 好处：减少标签层级，见效内存占用

## Teleport

- 什么是teleport？

  Teleport是一种能够将我们的组件html结构移动到指定位置的技术。

  ```javascript
  ......
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  <teleport>
  ......
  ```


## Suspense

等待异步组件时渲染一些额外内容，让应用有更好的用户体验

使用步骤：

- 异步引入组件

  ```javascript
  import {defineAsyncComponent} from 'vue'
  const Child = defineAsyncComponent(() => import('./components/Child.vue'))
  ```

- 使用Suspense包裹组件，并配置好`default`与`fallback`

  ```javascript
  <template>
      <div class="app">
          <h2>我是App组件</h2>
          <Suspense>
              <template v-slot:default>
                  <Child />
              </template>
              <template v-slot:fallback>
                  <h2>Loading...</h2>
              </template>
          </Suspense>
      </div>
  </template>
  ```

- 我们也可以通过返回`Promise`对象来实现`fallback`的加载效果,下面代码中使用到该组件的都会等到定时器结束之后返回成功状态才会渲染页面，在这之前会显示出加载的过程

  ```javascript
  export default {
      name: "Child",
      async setup() {
          let msg = ref("houdunren.com");
          const p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve(msg);
              }, 1000);
          });
          return p;
      },
  }
  ```

# Vue3新特性

## 全局 API 的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```javascript
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

Vue2.0中的directive中有3个钩子函数，其中表示dom元素创建好的是inserted

Vue3.0中的direction的钩子函数数量和组件是一直的，其中表示dom元素创建好的是mounted

## ref 获取子组件内的数据

在 `vue2.x` 中可以使用 `this.$refs` 方式获取子组件内中数据和方法

在 `vue3.x` 中 `ref` 的使用方式发生了一些变化，同时在子组件中使用 `expose` 方法也对父组件想要访问数据的操作做了限制

```vue
<!-- 父组件 -->
<template>
	<Child ref="child" />
</template>

<script>
  import { ref } from "vue"
	export default {
    const child = ref()
    
    // 如果不在生命周期内部使用时，由于子组件没有渲染完成的情况下是访问不到子组件的数据和方法的，此刻就需要进行判断
    // 此判断代表第一次渲染时如果没有就不再获取，有的时候在进行获取
    console.log(child.value?.num)
    
    return {
      child
    }
  }
</script>

<!-- 子组件 -->
<script>
  import { ref } from "vue"
	export default {
    const num = ref(10)
    
    expose({ num }) // 可以让外界访问 num
    
    return {
      num
    }
  }
</script>

```





## 其他属性

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```javascript
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```javascript
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- `v-model` 指令扩展为 `modelValue` 和 `onUpdate:modelValue` 在模板编译过程中 [详细文档](https://v3.cn.vuejs.org/guide/migration/v-model.html#%E6%A6%82%E8%A7%88)
- 当我们去更新数据的时候就可以去使用`emit('onUpdate:modelValue',数据)`来进行更新数据,modelValue可以使用props来接受

#### template 标签

`template` 标签在 html 文档中可以参加逻辑判断但是不会被渲染

#### v-moedl 语法糖

父组件传值给子组件，子组件如果想修改这个值并且影响到父组件只能是在将这个值传回给父组件

`vue2.x` 写法

```vue
<!-- 父组件 -->
<template>
	<Children :value="title" @updata:value="change" />
</template>

<script>
	export default {
    data() {
      return { title: "后盾人" }
    },
    methods: {
      change(v) {
        this.title = v
      }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<input type="text" :value="content" @input="change" />
</template>

<script>
	export default {
    props: ["value"],
    emits: ["update:value"]
    data() {
      return { content: this.value }
    },
    methods: {
      change(event) {
      	this.content = event.target.value
      	this.$emit("update:value", event.target.value)
    	}
    }
  }
</script>
```

`vue3.x` 写法极简

这种语法糖是 `v-model` 代替了 `v-bind/v-on` 且有一定的书写要求例如 `update` 只能用这个

极简的书写风格在子组件中不能将父组件的值再次在子组件中赋值

```vue
<!-- 父组件 -->

<!-- v-model:value="title": value 就是我们传给子组件中的名称 -->
<template>
	<Children v-model:value="title" />
</template>

<script>
	export default {
    data() {
      return { title: "后盾人" }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<input type="text" :value="value" @input="$emit('update:value', $event.target.value)" />
</template>

<script>
	export default {
    props: ["value"],
    emits: ["update:value"]
  }
</script>
```

#### 自定义修饰符

在父组件调用处，在 `v-model` 后使用自定义修饰符，在子组件中通过 `modelModifiers` 可以获取到自定义修饰名称，返回布尔值

可以有多个修饰符

```vue
<!-- 父组件 -->
<template>
	<Child v-model.value="message" />
</template>

<!-- 子组件 -->
<script>
	export default {
    props: ["modelModifiers"], // 需要注册才能使用
    mounted() {
      console.log(this.modelModifiers) // { value: true }
    }
  }
</script>
```

如果说你需要指定值的话 `modelModifiers` 中 `model` 就需要换成你指定的值

```vue
<!-- 父组件 -->
<template>
	<Child v-model:value.chartgpt="message" />
</template>

<!-- 子组件 -->
<script>
	export default {
    props: ["valueModifiers"], // 需要注册才能使用
    mounted() {
      console.log(this.valueModifiers) // { chartgpt: true }
    }
  }
</script>
```

#### 插槽props

插槽有很多种例如：默认插槽，具名插槽

```vue
<!-- 父组件 -->
<template>
	<Child v-for="item in arrList" :key="item.id" :item="item">
  	<template #default="slotProps">
      {{ slotProps.content }}
			<button>删除</button>
		</template>
  </Child>
</template>

<script>
	export default {
    data() {
      return { arrList }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<div>
    {{ item.title }}
    <slot content="沐沐汐"></slot>   <!-- 默认插槽 -->
  </div>
</template>

<script>
	export default {
    props: ["item"]
  }
</script>
```

# 测试数据

使用 `json-server` 开启数据测试

使用方式

`yarn add global json-server`

`json-server --watch --port 3003 --host 127.0.0.1 db.json`

批量生成测试数据需要借用 `mockjs` 来完成

`yarn init`

`yarn add mockjs`

......
