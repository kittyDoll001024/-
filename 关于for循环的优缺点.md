# JS 中的 forEach、for in、for of和for的遍历优缺点

### forEach: (可以携带三个参数，第一个 value，第二个 index， 第三个 数组本身)

- 缺点：不能同时遍历多个集合，在遍历的时候无法修改和删除集合数据，方法中不能使用 break，continue等语句跳出循环，或者使用 retunr 从函数体返回，对于空数组不会执行回调函数，无法遍历对象
- 优点：遍历的时候更加简洁，效率和 for 循环相同，不用关心集合下标的问题，减少出错的效率
- 定义：用于调用数组的每个元素，并将元素传递给回调函数

````
//我们先用它来遍历数组
  let arry=[9,8,7,6,5,4]
  array.forEach(function(value,index,arr){
      console.log(value)
  })
//输出结果为9 8 7 6 5 4

//首先有人疑问它能不能用来遍历对象（一开始我也不知道）？
//我们用它来遍历对象试试可不可以
   let obj={a:1,b:2,c:3,d:4}
   obj.forEach(function(value,index,oObj){
       console.log(value)
   }
//输出结果会是obj.forEach is not a function，
//所以forEach不可以遍历对象，这也是它和for in的一个区别
````

### for in：(它大部分用于遍历对象)

- 缺点：某些情况下，会出现随机顺序的遍历，因为里面的值是 string 类型，所以增加了转换过程，因此开销较大
- 优点：可以遍历数组的键名，遍历对象简洁方便
- 定义：用于循环遍历数组或对象属性，for in 循环里面的 index 是 string 类型的，代码每执行一次，就会对数组的元素或者对象的属性进行一次操作

````
//首先遍历对象
   let person={name:"老王",age:23,city:"大唐"}
   let text=""
   for (let i in person){
      text+=person[i]
   }
   输出结果为：老王23大唐

//其次在尝试一些数组
   let arry=[1,2,3,4,5]
   for (let i in arry){
        console.log(arry[i])
    }
//能输出出来，证明也是可以的
````

### for of：(可遍历 map、object、array、string等) 用来遍历数据，比如组中的值

- 缺点：不适用于处理有的原生对象 (原生对象是一个子集，包含一些在运动过程中动态创建的对象)
- 优点：避免了 for in 的所有缺点，可以使用 break，continue 和 return，不仅支持数组的遍历，还可以遍历伪数组或类似数组的对象，支持字符串的遍历最简洁，最直接的遍历数组的语法，支持 map 和 set 对象遍历

````
//遍历数组
   let arr=["nick","freddy","mike","james"];
    for (let item of arr){
        console.log(item)
    }
//暑促结果为nice freddy mike james


//遍历对象
   let person={name:"老王",age:23,city:"唐山"}
   for (let item of person){
        console.log(item)
    }
//我们发现它是不可以的
//但是它和forEach有个解决方法，结尾介绍
````

### for：

- 缺点：结构比 while 循环复杂，容易出现编码错误
- 优点：程序简洁，结构清晰，循环初始化，循环变量化，循环体和循环条件位置突出

````
//首先它和forEach,forof一样不可以遍历对象
//解决办法：就是把对象先转化为数组类型- -
//有一个对象：
     let obj={a:1,b:2,c:3}
//用Object.keys属性转化
     let obj2=Object.keys(obj)
//最后就可以用来遍历了
   for (let i=0;i<obj2.length;i++){
     console.log(obj2[i])
   }
//输出结果就能出来了，forEach，for of同理
````

