#### api

1. vue2：选项式api vue3也支持选项式api 两种api是共存的关系
2. vue3：组合式api 
   1. 抽象成单个小函数：setup桶里面不再编写具体的业务代码 而是只负责把小函数组合回来 所以我们把新的 api 称作组合式api

#### 格式化工具

1. vue2是：vuter
2. vue3是：vetur 或者 volar

#### 语法

```js
setup
      作用：入口函数 一切的入口从这里开始执行 其他组合式api的书写位置 自动执行
      执行时机: breforeCreate之前 
      注意事项: setup函数中是不可以使用this this不指向当前的组件实例对象 [函数调用 + 抛弃this]
```

```js
<template>
  <!-- vue3不在限制模板中唯一的根元素 -->
  <div>
    <button @click="show">显示</button>
    <button @click="hide">隐藏</button>
    <button @click="changeRed">红色</button>
    <button @click="changeGreen">绿色</button>
  </div>
  <!-- 被控制的盒子 -->
  <div
    v-if="flag"
    style="width: 300px; height: 300px; border: 1px solid #ccc"
    :style="{ color: color }"
  >
    this is div
  </div>
</template>

<script>
// vue2风格  选项式api  vue3 也是支持你熟悉的选项式api 俩种api是共存的关系
// vue3风格  组合式api  先不要细节语法 重点观察风格！！！
// 抽象成单个小函数: setup桶里面不再编写具体的业务代码 而是只负责把小函数组合回来 所以我们把新的api
// 称作组合式api

import { ref } from 'vue'
function useFlag () {
  const flag = ref(true)
  function show () {
    flag.value = true
  }
  function hide () {
    flag.value = false
  }
  return {
    flag, show, hide
  }
}

function useColor () {
  const color = ref('')
  function changeRed () {
    color.value = 'red'
  }
  function changeGreen () {
    color.value = 'green'
  }
  return {
    color, changeRed, changeGreen
  }
}
export default {
  name: 'App',
  setup () {
    // 功能1
    const { flag, show, hide } = useFlag()
    // 功能2
    const { color, changeRed, changeGreen } = useColor()
    return {
      flag, show, hide,
      color, changeRed, changeGreen
    }
  }
}
</script>

<style>
</style>
```

##### 响应式api - reactive

```js
响应式api - reactive
      作用:生成响应式数据 传入一个对象 然后调用这个方法 返回一个响应式的新对象
      语法:
        1.从vue中导入这个reactive函数
        2.在setup中执行这个函数 并且传入一个对象
        3.在一个变量接受一下函数的返回值 -> 响应式数据对象
        4.如果模板中用到这个数据 必须return出去 刚开始学容易丢

        注意事项:响应式丢失问题
        vue3响应式底层依赖proxy 展开运算符 解构赋值都有可能丢失响应式
        可以通过简单的打印看一下 对象的结构表现 如果带有proxy标识 说明是响应式
        如果就是一个普通的对象结构 说明不是响应式的
```

##### 响应式api - ref

```js
响应式api - ref
      作用:生成响应式数据,既可能支持简单类型也可以支持对象类型 reactive可以做的 ref都可以 reactive不能做的 ref也可以
      语法:
        1.从vue中导入ref函数
        2.setup中执行这个函数 并且传入想要处理的数据[简单类型 + 复杂类型]
        3.模板中如果要使用 必须return出去 模板中不需要加.value 自动解套的动作
        4.如果不是模板中使用,是在setup中修改 必须加上.value才能进行获取和修改[切记]
```

##### reactive vs ref

```js
reactive vs ref

      1. 在实际开发时候的选择
         结论：一律用ref [表单场景: 明确知道对象中的key是什么 选择性的使用reactive]
         ref更加强大 既可以支持简单类型也可以支持复杂类型 -> 心智负担尽量轻一些

      2. ref本身返回的是一个对象,对象中有一个value属性 它身上才放着数据
         模板中不用考虑.value的事儿 自动帮助我们解套  但是在setup做修改获取的时候别忘了.value

      3. vue3 Object.defineProperty -> Proxy
         vue2 对象的新增属性不能做响应式识别 - $set
              数组下标修改   

         vue3 不存在  响应式更加强大

         注意响应式丢失问题: 遇到...展开运算符  遇到结构赋值 -> 造成响应式丢失问题
```

##### 计算属性

```js
计算属性
      什么是计算属性？
      依赖一个已经存在的响应式数据经过一定的计算得到一个新的响应式数据 并且他们的计算关系
      会一直存在 只要依赖的数据发生变化 会自动计算求出新值
      1. 计算特性你变我也变  2. 缓存特性 你不变我就不变直接走缓存

      vue2和vue3计算属性的理念一点都没变 只是api上发生了一些变化


      组合式api - computed

      语法:
       1. 从vue中导入 computed函数
       2. 在setup入口执行这个函数  
          const comValue = computed(()=>{
            return 计算关系
          })

       3. 模板中中用需要return 
      
      注意事项：默认情况下计算属性只有getter 它是只读的 只能获取不能修改
      如果想修改 需要定义set方法 -> 自己查阅文档看看set方法如何实现？
```

##### watch监听器

```js
watch 监听器
      watch是用来干嘛的？
      监听某个属性的变化 变化之后执行一个回调函数 在回调中可以执行自定义逻辑 
      并且watch还支持立即执行和深度监听
      1. 基础的watch监听
      2. 增加额外的参数

      响应式api - watch
      语法：
       1. 从vue中导入这个函数
       2. setup执行这个函数 
          watch(()=>{
            return 要监听的数据
          },()=>{
            // 监听的数据变化的时候要执行的逻辑
          })


      注意事项：深度监听有可能造成性能损耗 所以呢默认是不开启的 建议大家如果明确要监听某个属性的变化
      建议直接精确的写到属性的位置即可 不要开启深度监听

      如果你遇到的场景要监听的属性非常多 层次也不确定  这个时候可以开启
```

##### 生命周期函数

```js
生命周期函数
      语法:
        on + '生命周期的名称' = onMounted -> 函数
        onMounted(()=>{
          // 自定义逻辑 执行时机就是在dom完全挂载之后执行
        })

      注意:每个生命周期函数都可以执行多次 传入的回调函数 按注册顺序依次执行
```

##### 父子组件通信

```js
我直接炸裂,ok?
```

