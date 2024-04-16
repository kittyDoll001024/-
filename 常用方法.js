// 微信小程序监听器
class watch {
  constructor(_this) {
    this.data = _this.data
    this.watch = _this.watch
    this.freeData = _this.__freeData__,
		this.that = _this
    this.setWatch()
  }

  setWatch() {
    Object.keys(this.watch).forEach(v => {
      let key = v.split('.');
			let newData = this.data;

			// 数组监听器 当你只需要监听数组中的某个值时调用 
			let left = key[0].indexOf("[")
			let arr = key[0].split("").splice(0, 3).join("")
			let num = key[0].split("").splice(left + 1, 1).join("") * 1
			for (const i in this.data) {
				if (i === arr) {
					if (Array.isArray(this.data[i])) {
						newData = this.data[i][num]
					} 
				}
			}

      for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个
				if (newData[key[i]] !== void 0) {
					newData = newData[key[i]] // 将nowData指向它的key属性对象
				}
      }
      let lastKey = key[key.length - 1];
      let watchFun = this.watch[v].handler || this.watch[v]; // 兼容带handler和不带handler的两种写法
      let deep = this.watch[v].deep; // 若未设置deep,则为undefine
      this.observe(newData, lastKey, watchFun, deep, this.that) // 监听nowData对象的lastKey
    })
  }

  observe(newData, lastKey, watchFun, deep, _this) {
    let value = newData[lastKey]
		// 判断deep是true 且 value 不能为空 且 value 的构造器是对象（数组内数值变化也需要深度监听）
    if (deep && value !== null && value.constructor === Object) {
      Object.keys(value).forEach(v => { // 遍历val对象下的每一个key
				this.observe(value, v, watchFun, deep) // 递归调用监听函数
			})
    }
		Object.defineProperty(newData, lastKey, {
			configurable: true,
			enumerable: true,
			get() {
				return value
			},
			set(newVal) {
				if (newVal === value) return
				watchFun.call(this.page, _this, newVal, value) // 需要监听的字段是以函数的形式需要执行函数把新值旧值返回去
				value = newVal;
				if (deep) {
					this.observe(newData, lastKey, watchFun, deep)
				}
			}
		}) 
  }
}

// 时间格式
const format = (date, timeFormat) => {
  const map = {
    "M": date.getMonth() + 1,
    "d": date.getDate(),
    "h": date.getHours(),
    "m": date.getMinutes(),
    "s": date.getSeconds(),
    "q": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  }
  timeFormat = timeFormat.replace(/([yMdhmsqS])+/g, (all, t) => {
    let value = map[t];
    if (value !== void 0) {
      if (all.length > 1) {
        value = formatNumber(value)
        value = value.substr(value.length - 2)
      }
      return value
    } else if (t === "y") {
      return (date.getFullYear() + "").substr(4 - all.length)
    }
    return all
  })
  return timeFormat
}

// 补零
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`
}

// 节流函数
const throttle = (callback, delay = 1000, options) => {
  let timer;
  let old = 0;
  if (!options) options = { leading: true, trailing: false };
  return function(...args) {
    let now = new Date().valueOf()
    if (options.leading === false && !old) {
      old = now
    }
    if (now - old > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      callback.apply(this, args)
      old = now
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        old = new Date().valueOf();
        timer = null;
        callback.apply(this, args)
      }, delay)
    }
  }
}

// 防抖函数
const debounce = (callback, delay = 1000, immediate = false) => {
  let timer = null;
  let isInvoke = false
  return function(...args) {
    if (timer !== null) clearTimeout(timer)
    if (immediate && !isInvoke) {
      callback.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        callback.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }
}

module.exports = {
  watch
}