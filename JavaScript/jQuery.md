# jQuery

是一个`JavaScript`库，有很多封装的`api`提供使用

## 基本使用

当`JavaScript`脚本被提前加载的时候如果不加`window.onload`是无法获取到没有解析的DOM元素的

`window.onload`只可以写一次，如果写了多次那么只会执行最后一次

```javascript
<script>
  window.onload = function(){
    const btn = document.querySelect('button')
    console.log(btn)
	}  
</script>
<button>点击</button>
```

### defer

该属性是`script`标签的属性，添加该属性之后，会等着页面元素加载之后执行脚本

```javascript
<script src="./1.js" defer></script>
<button>点击</button>
```

### 入口文件

`jQuery`为我们提供了入口文件供我们使用，类似于`DOMContentLoaded`(不会等图片链接加载)，入口函数可以使用多次

```javascript
$(document).ready(function(){
	alert(2)
})
```

下面是入口函数的简写形式

```javascript
$(function(){
	console.log('入口文件')
})
```

### 获取元素

我们可以通过`$('选择器')`的方式来获取元素

```javascript
$('选择器')
$('.box')
$('#box')
$('box')
```

使用`jQuery`获取的DOM元素是`jQuery`元素对象，不可以使用原生的方法

下面获取到的`jQuery`元素对象是没有`innerHTMl`属性的，所以不会生效

```javascript
<body>
  <div>hdcms.com</div>
</body>
<script>
  $(function () {
    $("div").innerHTML = "houdunren.com";
  });
</script>
```

换成`jQuery`中的方法就可以使用

```javascript
<body>
  <button>点击</button>
  <div>hdcms.com</div>
</body>
<script>
  $(function () {
    $("div").html("houdunren.com");
    console.log($("div"));
  });
</script>
```

注意点：

1. `jQuery`元素对象不可以使用原生方法
2. 原生方法不可以使用`jQuery`的方法

### 元素对象转换

将`jQuery`对象转换为原生DOM对象，通过`$('div')[0]`的方式

```javascript
<script>
  $(function () {
    console.log($("div")[0]);
    $("div")[0].innerHTML = "houdunren.com";
  });
</script>
```

`$('div').get(0)`也可以转换为原生DOM元素

```javascript
<script>
  $(function () {
    $("div").get(0);
    console.log($("div").get(0));
  });
</script>
```

### noConflict

多库共存，`noConflict`可以将$符号的控制权转给其他的库

```javascript
jQuery.noConflict()

jQuery(function(){
	jQuery('#box')
})
```

如果既想使用$其他的库也需要使用$，那么可以使用传参的方式解决

```javascript
<script src="../jquery.min.js"></script>
<script src="./1.js"></script>
......
jQuery.noConflict()
console.log($) // 123
(function($){
  $('#div').html('houdunren.com')
},(jQuery))
```

### 基本选择器

1. :`fist` 第一个元素
2. :`last` 最后一个元素
3. `:eq(index)` 指定索引的元素
4. `:not("选择器")` 去除指定元素之后的伪数组
5. `:gt(index)` 匹配所有大于给定索引值的元素
6. `:odd` 匹配所有索引为奇数的
7. `:event` 匹配所有索引为偶数的(索引从0开始)

`eq`可以选择获取到的伪数组对应的索引

```javascript
$('li:eq(2)')
```

### 样式

`.css('属性名'，'属性值')`可以为`jQuery`元素设置样式

```javascript
$('#container').css('backgroundColor','hotpink')
```

如果设置的样式较多可以传递对象

```javascript
$('#container').css({
	backgroundColor:'hotpink',
	fontSize:'30px',
	color:'#f404040'
})
```

## 操作元素

`jQuery`为我们提供了很多`DOMapi`接口可以让我们很方便的操作`dom`元素

### 添加节点-子元素

#### append

往某个元素中追加元素，追加到元素末尾

`$(parentDom).append(childrenDom)`具体使用

```javascript
.......
	<div></div>
	<script>
	  $(function () {
	    const p = document.createElement("p");
	    $("div").append(p);
	  });
	</script>
......
```

我们还可以添加字符串

```javascript
.......
	<div></div>
	<script>
	  $(function () {
	    const p = `<p>houdunren.com</p>`
	    $("div").append(p);
	  });
	</script>
......
```

#### appendTo

`$(childrenDom).appendTo($(parentDom))`是append的反向操作

```javascript
.......
	<div></div>
	<script>
	  $(function () {
	    const p = document.createElement("p");
	    $(p).appendTo($('div'))
	  });
	</script>
......
```

#### prepend

往某个元素中追加元素，追加到元素开头

`$(parentDom).prepend(childrenDom)`具体使用

```javascript
.......
	<div>
  	<p>hdcms.com</p>  
  </div>
	<script>
	  $(function () {
	    const p = document.createElement("p");
    	p.innerHTMl = 'houdunren.com';
	    $("div").prepend(p);
	  });
	</script>
......
```

#### prependTo

`$(childrenDom).prependTo($(parentDom))`是append的反向操作

```javascript
.......
	<div>
   	<p>hdcms.com</p>    
  </div>
	<script>
	  $(function () {
	    const p = document.createElement("p");
    	p.innerHTML = 'houdunren.com'
	    $(p).prependTo($('div'))
	  });
	</script>
......
```

### 添加元素-同级

#### after

往某个元素后追加元素同级别

`$(sibilingDom).after(nextSibilingDom`)`具体使用,下面的代码会往每一个ul 的li后面追加一个houdunren.com，因为jQuery是具有[隐式迭代]([jQuery隐式迭代_天宇-CSDN博客_隐式迭代](https://blog.csdn.net/chenshanqiang/article/details/103455337))的

```javascript
......
<ul>
  <li>hdcms.com</li>
  <li>hdcms.com</li>
</ul>
<script>
  $(document).ready(function () {
    $("ul li").after("<li>houdunren.com</li>");
  });
</script>
......
```

#### insertAfter

`$(nextSibilingDom).after(sibilingDom`)`是after的反向操作

```javascript
......
<ul>
  <li>hdcms.com</li>
  <li>hdcms.com</li>
</ul>
<script>
  $(document).ready(function () {
  	("<li>houdunren.com</li>").insertAfter($('ul li'))
  });
</script>
......
```

#### before

往某个元素前面追加元素同级别

`$(sibilingDom).before(previousSibilingDom`)`具体使用,下面的代码会往每一个ul 的li前面追加一个houdunren.com，因为jQuery是具有[隐式迭代]([jQuery隐式迭代_天宇-CSDN博客_隐式迭代](https://blog.csdn.net/chenshanqiang/article/details/103455337))的

```javascript
.......
	<ul>
	  <li>hdcms.com</li>
	  <li>hdcms.com</li>
	</ul>
	<script>
	  $(document).ready(function () {
	    const li = document.createElement("li");
	    li.innerHTML = "houdunren.com";
	    $("ul li").before(li);
	  });
	</script>
......
```

#### insertBefore

`('<li>houdunren.com</li>').insertBefore($('ul li'))`是before的反向操作

```javascript
.......
	<ul>
	  <li>hdcms.com</li>
	  <li>hdcms.com</li>
	</ul>
	<script>
	  $(document).ready(function () {
	    const li = document.createElement("li");
	    li.innerHTML = "houdunren.com";
	    $(li).insertBefore($('ul li'))
	  });
	</script>
......
```

### 删除元素

#### remove

`$('div').remove()`可以删除使用该方法的元素

这个方法不会把匹配的元素从`jQuery`对象中删除，因而可以在将来再使用这些匹配的元素。

但除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除。

```javascript
......
	<button id="btn">删除元素</button>
	<script>
	  $(document).ready(function () {
	    $("#btn").click(function () {
	      alert("houdunren.com");
        
	      const btn = $(this).remove();
	      $("body").append(btn);
	    });
	  });
	</script>
......
```

#### detach

`$('div').detach()`可以删除使用该方法的元素

这个方法不会把匹配的元素从`jQuery`对象中删除，因而可以在将来再使用这些匹配的元素。

与`remove()`不同的是，所有绑定的事件、附加的数据等都会保留下来。

```javascript
......
	<button id="btn">删除元素</button>
	<script>
	  $(document).ready(function () {
	    $("#btn").click(function () {
	      alert("houdunren.com");
        
	      const btn = $(this).remove();
	      $("body").append(btn);
	    });
	  });
	</script>
......
```

#### empty

`$('div').empty()`删除匹配的元素集合中所有的子节点。

```javascript
<ul>
  <li>hdcms.com</li>
  <li>hdcms.com</li>
</ul>
<div class="container">houdunren.com</div>
<button id="btn">删除元素</button>
<script>
  $(document).ready(function () {
    $("#btn").click(() => {
      $("ul").empty();
    });
  });
</script>
```

第二种清空的方式

```javascript
<ul>
  <li>hdcms.com</li>
  <li>hdcms.com</li>
</ul>
<button id="btn">删除元素</button>
<script>
  $(document).ready(function () {
    $("#btn").click(() => {
      $("ul").html("");
    });
  });
</script>
```

### 属性操作

#### attr

`$('div').attr('key',[value])`可以读取或设置属性

```javascript
<div class="container">houdunren.com</div>
<script>
  $(document).ready(function () {
    console.log($("div").attr("class")); // container
    $("div").attr("name", "houdunren.com");
    console.log($("div").attr("name")); // houdunren.com
  });
</script>
```

如果设置的属性值较多我们可以采用传递配置对象的方式

```javascript
<div class="container">houdunren.com</div>
<script>
  $(document).ready(function () {
    $("div").attr({
			name:'houdunren.com',
      title:'userName'
    });
 		console.log($('div').attr('name')) // houdunren.com
   	console.log($('div').attr('title')) // userName
  });
</script>
```

获取属性值只可以一个一个获取

函数形式,下面函数形式可以将site属性的值设置为host属性

```javascript
......
$(document).ready(function () {
  $(".container").attr({
    site: "houdunren.com",
    title: "userName",
    host: 8080,
  });
  $(".container").attr("site", function () {
    return this.host;
  });
  $("#btn").click(() => $(".container").removeAttr("class"));
});
......
```

#### removeAttr

`$('div').removeAttr('attrbutes')`可以删除一个元素的属性

```javascript
......
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      background: hotpink;
      height: 50px;
      color: white;
      text-align: center;
      line-height: 50px;
    }
  </style>
......
<body>
  <div class="container">houdunren.com</div>
  <button id="btn">删除元素</button>
</body>
<script>
  $(document).ready(function () {
  	$("#btn").click(() => $(".container").removeAttr("class"));
  });
</script>
```

### 类名操作

#### addClass

`$('div').addClass('class')`调用该方法可以为元素添加指定类名

如果要添加多个类名，那么还是字符串形式，多个类名之间用空格分隔

```javascript
......
	<style>
	  button.active {
	    background: hotpink;
	    color: white;
	    border: none;
	  }
	</style>
......
<body>
  <button>hdcms</button>
  <button>hdcms</button>
  <button>hdcms</button>
  <button>hdcms</button>
  <button>hdcms</button>
  <button>hdcms</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  });
</script>
```

#### removeClass

`$('div').removeClass('class')`调用该方法可以把元素的指定类名删除

```javascript
......
	<style>
    div.container {
      width:100px;
      height:100px;
      background: green;
    }
  </style>
......
<body>
  <div class="container"></div>
	<button>删除类名</button>
</body>
<script>
  $(function () {
		$('button').click(() => {
      $('.container').removeClass('container')
    })
  });
</script>
```

#### hasClass

`$('div').hasClass('class')`该方法用于检测元素是否是存在指定类名，返回值是布尔值

```javascript
......
	<style>
    div.container {
      width:100px;
      height:100px;
      background: green;
    }
  </style>
......
<body>
  <div class="container"></div>
	<button>删除类名</button>
</body>
<script>
  $(function () {
		$('button').click(() => {
      console.log($('div').hasClass('container')) //true
    })
  });
</script>
```

#### toggleClass

`$('div').toggleClass('active')`切换类，如果有指定的这个类，那么就删除，如果没有就添加上

```javascript
......
	<style>
    div.container {
      width:100px;
      height:100px;
      background: green;
    }
		div.active{
      background:red!important;
    }
  </style>
......
<body>
  <div class="container"></div>
	<button>删除类名</button>
</body>
<script>
  $(function () {
		$('.container').click(function () {
      $(this).toggle('.active')
    })
  });
</script>
```

#### clone

`$("div").clone()`可以克隆元素，参数可以传递布尔值，如果是true那么会节点的事件都会被克隆

```
$('p').clone().appendTo($('.container'))
```



## 方法选择器

### next

`$('div').next()`该方法可以获取元素的下一个节点

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
    console.log($(".item1").next()); // item2
  });
</script>
```

### prev

`$('div').next()`该方法可以获取元素的上一个节点

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
    console.log($(".item2").prev()); // item1
  });
</script>
```

### siblings

`$('div').sibling()`可以获取指定元素所有的兄弟，里面添加选择器参数就是找到对应选择器的兄弟

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
    console.log($(".item2").siblings()); // item1 item3
  });
</script>
```

### children

`$('div').children()`可以获取指定元素的所有子集，传递选择器参数就是指定选择器

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
    console.log($("ul").children()); // item1 item2 item3
    console.log($("ul").children('.item1')); // item1
  });
</script>
```

### parent

`$('div').parent()`可以获取指定元素的父级

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
		console.log($('item1').parent()) // ul
  });
</script>
```

### parents

`$('div').parent()`可以获取指定元素所有的父级

```javascript
<body>
  <ul>
    <li class="item1">houdunren.com</li>
    <li class="item2">hdcms.com</li>
    <li class="item3">hd.com</li>
  </ul>
</body>
<script>
  $(function () {
		console.log($('item1').parents()) // ul body html
  });
</script>
```

### find

`$('html').find('button')`可以查询到指定元素的某一个后代 类似于 `div li`后代选择器，只能获得单独一个

```javascript
<button>点击</button>
<script>
  $(function () {
    $("button").click(function () {
      console.log($("html").find("button"));
    });
  });
</script>
```

### eq

`$('html').eq('body')`可以获取指定元素的第n个元素，只能获得单独一个，传递的参数是索引号，获取回来的是jquery对象，get方法获取到的是真是dom元素

```javascript
<ul>
  <li class="item1">houdunren.com</li>
  <li class="item2">houdunren.com</li>
  <li class="item3">houdunren.com</li>
</ul>
<button>点击</button>
<script>
  $(function () {
    $("button").click(function () {
      console.log($("li").eq(1)); // item2
    });
  });
</script>
```

## 基本动画

### show

`$('div').show()`可以将指定元素显示

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").show()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                       |
| -------- | -------- | ------------------------------------------ |
| [500m]   | 否       | 第一个参数，可以指定动画完成需要的时间     |
| callback | 否       | 第二个参数，可以指定动画完成之后执行的回调 |

### hide

`$('div').hide()`可以将指定元素隐藏

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").hide()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                       |
| -------- | -------- | ------------------------------------------ |
| [500m]   | 否       | 第一个参数，可以指定动画完成需要的时间     |
| callback | 否       | 第二个参数，可以指定动画完成之后执行的回调 |

### toggle

`$('div').toggle()`可以将指定元素显示或者隐藏，如果目前是显示那么就隐藏

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").toggle()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                       |
| -------- | -------- | ------------------------------------------ |
| [500m]   | 否       | 第一个参数，可以指定动画完成需要的时间     |
| callback | 否       | 第二个参数，可以指定动画完成之后执行的回调 |

## 淡入淡出动画

### fadeIn

`$('div').fadeIn()`可以将指定元素显示出，并且是淡入淡出的效果

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").fadeIn()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                       |
| -------- | -------- | ------------------------------------------ |
| [500m]   | 否       | 第一个参数，可以指定动画完成需要的时间     |
| callback | 否       | 第二个参数，可以指定动画完成之后执行的回调 |

### fadeOut

`$('div').fadeOut()`可以将指定元素隐藏，并且是淡入淡出的效果

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").fadeOut()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                       |
| -------- | -------- | ------------------------------------------ |
| [500ms]  | 否       | 第一个参数，可以指定动画完成需要的时间     |
| callback | 否       | 第二个参数，可以指定动画完成之后执行的回调 |

### fadeTo

`$('div').fadeTo()`可以修改元素的透明度，以淡入淡出的效果降低到自己指定的透明度

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").fadeTo()
      });
    });
  });
</script>
```

**参数**

| 参数名    | 是否必填 | 描述                                       |
| --------- | -------- | ------------------------------------------ |
| [500ms]   | 是       | 第一个参数，可以指定动画完成需要的时间     |
| [opacity] | 是       | 第二个参数，可以指定动画降低到哪个透明度值 |
| callback  | 否       | 第三个参数，可以指定动画完成之后执行的回调 |

### fadeToggle

`$('div').fadeToggle()`可以切换显示或者隐藏的效果，根据当前的状态

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").fadeToggle()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| [500ms]  | 否       | 第一个参数，可以指定动画完成需要的时间                       |
| [500ms]  | 否       | 第二个参数，可以指定动画完成需要的时间，只能通过预定值来设置 |
| callback | 否       | 第三个参数，可以指定动画完成之后执行的回调                   |

## 滑动效果

### slideDown

`$('div').slideDown()`可以将指定元素显示出来，以滑动效果展示

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").slideDown()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| [500ms]  | 否       | 第一个参数，可以指定动画完成需要的时间                       |
| [500ms]  | 否       | 第二个参数，可以指定动画完成需要的时间，只能通过预定值来设置 |
| callback | 否       | 第三个参数，可以指定动画完成之后执行的回调                   |

### slideUp

`$('div').slideUp()`可以将指定元素隐藏，以滑动效果展示

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").slideUp()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| [500ms]  | 否       | 第一个参数，可以指定动画完成需要的时间                       |
| [500ms]  | 否       | 第二个参数，可以指定动画完成需要的时间，只能通过预定值来设置 |
| callback | 否       | 第三个参数，可以指定动画完成之后执行的回调                   |

### slideToggle

`$('div').slideUp()`可以切换显示隐藏效果，根据当前的状态，以滑动的效果

```javascript
<body>
  <div class="container"></div>
  <button>点击</button>
</body>
<script>
  $(function () {
    $("button").click(function () {
      $(".container").slideToggle()
      });
    });
  });
</script>
```

**参数**

| 参数名   | 是否必填 | 描述                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| [500ms]  | 否       | 第一个参数，可以指定动画完成需要的时间                       |
| [500ms]  | 否       | 第二个参数，可以指定动画完成需要的时间，只能通过预定值来设置 |
| callback | 否       | 第三个参数，可以指定动画完成之后执行的回调                   |

## 终止动画

`stop()`可以终止动画一般是加载元素的前面

## 绑定事件

### 单事件

我们可以通过事件名()的方式来绑定事件

```javascript
$('div').click()
```

### on

`on(evnets,[selector],fn)`方法在匹配元素上绑定一个或多个事件的事件处理函数

```javascript
$('button').on('click',function(){ 
	alert('houdunren.com')
})
```

1. events:一个或多个用空格分隔的时间类型，比如”click”或”keydown”。
2. selector:元素的子元素选择器。
3. fn:回调函数 即绑定在元素身上的监听函数。

**方法优势**

可以事件委派操作。事件委派的定义就是，把原来加给子元素身上的事件绑定在父元素身上，就是把事件委派给父元素。

下面代码中我们将事件绑定给`ul`，但是触发的对象是`li`，所以后面添加的li标签也有事件，如果直接绑定给`li`则没有

```javascript
......  
  <ul>
    <li>改革春风吹满地</li>
    <li>改革春风吹满地</li>
    <li>改革春风吹满地</li>
    <li>改革春风吹满地</li>
  </ul>
  <button>添加一个元素</button>
......
<script>
  $(function () {
    $("ul").on("click", "li", function () {
      $(this).addClass("active");
    });
    $("button").click(function () {
      $("li:first").clone().appendTo($("ul"));
    });
  });
</script>
```

