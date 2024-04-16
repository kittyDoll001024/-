# Pinia

一个全新的用于 `vue` 的状态管理库

下一个版本的 `vuex`，也就是 `vuex5.0`

`pinia` 已经被纳入官方账户。

## 安装 Pinia

```shell
yarn add pinia
npm install pinia
```

## 基本使用

### 创建 Pinia 示例并挂在

```js
// main.js
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';

// 创建 Pinia 实例
const pinia = createPinia();

// 挂载到Vue根实例
createApp(App).use(pinia).mount('#app');
```

如果使用 `vue2`，需要安装一个插件，并创建一个 `pinia` 注入到应用的 `root` 

```js
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他选项...
  // ...
  // 注意同一个pinia实例可以在多个Vue应用中使用
  pinia,
})
```

### 定义 Store

`Store` 是使用 `defineStore` 定义的，第一个参数是整个应用种 `store` 的唯一名称

> 建议：
>
> 可以位 `defineStore` 的返回值任意命名，但是最好使用 `use` 加上 `store` 的名称和 `Store` 
>
> 例如：`useUserStore\useCartStore`

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // 具体代码...
})
```

### Store 中的选项

类似于 `vue` 的选项 `API`，可以传递一个带有 `state\actions\getters` 属性的选项对象

```js
import { defineStore } from "pinia"

/* 
 * 1. 定义并导出容器
 * 	 -> 参数1：容器的 ID，必须唯一，将来 Pinia 会把所有的容器挂在到根容器
 *	 -> 参数2：选项对象
 */
export const useMainStore = defineStore("main", {
  /*
  * 类似于组件的 data，用来存储全局状态的
  *	1. 必须是函数，这样是为了在服务器渲染的时候避免交叉请求导致的数据状态污染
  * 2. 必须是箭头函数
  */ 
  state: () => {
    return {}
  },
  /*
  * 类似于组件的 computed，用来封装计算属性，有缓存的功能
  */ 
  getters: {},
  /*
  * 类似于组件的 methods，、封装业务逻辑，修改 state
  */ 
  actions: {}
})
```

### 状态使用

如果你要在组件中使用，就需要先将 `store` 引你入进来，并在 `setup` 中声明调用

```js
import { useMainStore } from '../store';

export default ({
  setup(){
    const mainStore = useMainStore();
    console.log(mainStore.count); // 这样就可以在组件中获取到Store中的count了
  },
})
```

接下来就是在模板中使用

```js
<template>
    <p>{{ mainStore.count }}</p>
    <p>{{ mainStore.foo }}</p>
</template>
```

那么，这样就会产生一个问题，每次都需要 `mainStore` 这样就很麻烦

**问题来了怎么解决？**如果你对ES6了解的话可能会想到解构出来。但是这样取出来的数据是有问题的，它已经丢失了响应式，也就是一次性的。

```js
// Pinia 其实就是把 state 数据都做了 reactive 处理了
const { count, foo } = mainStore;
```

就像上面这段代码，结构出来的数就已经失去了响应式，如果之后对数据的修改 `vue` 是无法检测到数据变化的。

**解决方法：这里就需要使用 `pinia` 为我们提供的 `storeToRefs` API 这就类似 `vue3` 中的 `toRefs`**

```js
import { storeToRefs } from 'pinia'

export default ({
  setup(){
    const mainStore = useMainStore();
		const { count, foo } = storeToRefs(mainStore);

    return {
      count,
      foo,
    }
  },
})
```

### 状态更新和 actions

`actions` 相当于组件中的方法。他们可以使用 `defineStore` 中的 `actions` 属性来定义，并且他们非常适合定义业务逻辑

> 注：不能使用箭头函数定义 `actions` 因为箭头函数绑定外部 `this`

例如：这里我们需要修改 `state` 中的 `count\foo\arr`  

```js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 100,
    foo: 'bar',
    arr: [1, 2, 3],
  }),
  ...
}
```

```js
<template>
    <p>{{ count }}</p>
    <p>{{ foo }}</p>
    <p>{{ arr }}</p>
    <hr />
    <p>
        <button @click="handleChangeState">修改数据</button>
    </p>
</template>

<script setup>
	...
  const handleChangeState = () =>{
    ...
  }
</script>
```

> 第一种：最简单的方式修改

```js
mainStore.count++;
mainStore.foo = 'hello';
```

> 第二种：如果是需要修改多个数据，建议使用 `$patch` 批量更新

```js
mainStore.$patch({
  count: mainStore.count + 1,
  foo: 'hello',
  // 由于是以对象形式传递的，显然如果要给数组追加元素不是一个很好的选择
  arr: [...mainStore.arr, 4],
});
```

> 第三种：更好的批量更新方法，`$patch` 也可以传递一个函数

```js
mainStore.$patch((state) => {
  // 这里接收的形参就是state
  state.count++;
  state.foo = 'hello';
  state.arr.push(4);
});
```

> 第四种：逻辑比较多的时候可以封装发哦 `actions` 里面

```js
mainStore.changeState(); // 在修改数据的方法中可以直接调用这个封装在actions里面的函数

import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  ...
  actions: {
    // 注意：不能使用箭头函数定义，因为使用箭头函数会导致 this 指向错误
    changeState(num) {
      this.count += num;
      this.foo = 'hello';
      this.arr.push(4);

      // this.$patch({}) // 这里如果批量更新和方法二、三一样
      // this.$patch((state) => {});
    },
  },
}
```

### getters 使用

`getters` 完全等同于 `store` 下 `state` 的计算值。可以使用 `defineStore` 中的 `getters` 属性来定义他们，并且他们将 `state` 作为第一个参数接收，以鼓励使用箭头函数。如果你使用的是普通函数的话，这个参数是可选的不接收可以使用 `this` 

```js
export const useMainStore = defineStore('main', {
  state: () => ({
    count: 100,
  }),
  getters: {
    // 函数接收一个可选的参数，是 state 对象
    /* count10(state) {
            console.log('count10 被调用了');
            return state.count * 10;
        }, */

    // 🔴 如果是在ts中的话，this的类型是推导不出来的，所以需要手动指定
    /* count10() {
            console.log('count10 被调用了');
            return this.count * 10;
        }, */
    count10: (state) => state.count * 10,
  },
},
```

```js
// store/index.js
import { defineStore } from 'pinia';

// 1、定义容器
// 参数1：容器名称 ID ，必须唯一，将来 Pinia 会把所有的容器挂载到根容器
// 参数2：选项对象
// 返回值：一个函数，调用得到容器实例
export const useMainStore = defineStore('main', {
    /**
     * 类似于组件的 data，用来存储全局状态的
     * 1、必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致数据的状态污染
     * 2、必须是箭头函数：这是为了更好的 TS 类型推导
     */
    state: () => ({
        count: 100,
        foo: 'bar',
        arr: [1, 2, 3],
    }),
    /**
     * 类似于组件的 computed，用来封装计算属性，有缓存功能
     */
    getters: {
        // 函数接收一个可选的参数，是 state 对象
        /* count10(state) {
            console.log('count10 被调用了');
            return state.count * 10;
        }, */

        // 🔴 如果是在ts中的话，this的类型是推导不出来的，所以需要手动指定
        /* count10() {
            console.log('count10 被调用了');
            return this.count * 10;
        }, */
        count10: (state) => state.count * 10,
    },

    /**
     * 类似于组件的 methods，用来封装业务逻辑，修改 state
     */
    actions: {
        // 🔴 注意：不能使用箭头函数定义，因为使用箭头函数会导致 this 指向错误
        changeState(num) {
            this.count += num;
            this.foo = 'hello';
            this.arr.push(4);

            // this.$patch({})
            // this.$patch((state) => {});
        },
    },
});
// 2、使用容器中的 state

// 3、修改 state

// 4、容器中的 action 的使用
```

```js
// HelloWord.vue
<template>
  <p>{{ mainStore.count }}</p>
  <p>{{ mainStore.foo }}</p>
  <p>{{ mainStore.arr }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>

  <hr />

  <p>{{ count }}</p>
  <p>{{ foo }}</p>

  <hr />

  <p>
    <button @click="handleChangeState">修改数据</button>
  </p>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '../store';

  const mainStore = useMainStore();

  console.log(mainStore.count);

  // 这是有问题的，因为这样拿到的数据不是响应式的，是一次性的
  // Pinia 其实就是把 state 数据都做了 reactive 处理了
  // const { count, foo } = mainStore;

  // 解决办法就是使用 storeToRefs
  // 把解构出来的数据做 ref 响应式代理
  const { count, foo } = storeToRefs(mainStore);

  const handleChangeState = () => {
    // 方法一：最简单的方式就是这样
    // mainStore.count++;
    // mainStore.foo = 'hello';

    // 方法二：如果需要修改多个数据，建议使用 $patch 批量更新
    /* mainStore.$patch({
        count: mainStore.count + 1,
        foo: 'hello',
        arr: [...mainStore.arr, 4],
    }); */

    // 方法三 更好的批量更新的方法：$patch 也可以传入一个函数
    /* mainStore.$patch((state) => {
        state.count++;
        state.foo = 'hello';
        state.arr.push(4);
    }); */

    // 方法四：逻辑比较多的时候可以封装到 actions 里面
    mainStore.changeState(10);
  };
</script>
```







































