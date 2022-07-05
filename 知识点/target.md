2022-4-22 今日目标

#### 复习Git以及Ajax
哎呀，今天学习的内容好生的难呀~
```js
<script>
    const xhr=new XMLHttpRequest()
    xhr.open('GET',URL)
    xhr.send()
    xhr.addEventListener('load',function(){
      console.log(JSON.parse(xhr.response))
      console.log(JSON.parse(xhr.response).data)
      console.log(JSON.parse(xhr.response).data[0])
      console.log(JSON.parse(xhr.response).data[0].title)
    })
  </script>
```

#### 有价值的知识

1. axios封装
2. 常规的增删改查
3. 插件化的全局组件注册
4. 通用工具栏组件封装
5. 导入导出的前端实现
6. 基于el-upload二次封装上传组件
7. 树形数据处理以及各种数据的格式化

#### 数组渲染

```js
console.log(this.list)
	this.list.forEach((item)=>{
	console.log(item.questionIDs)
})
```

#### 回调函数

```js
说人话就是, 一个函数A,作为另一个函数B的参数,那么函数A就被称为回调函数。 对,回调函数A就是一个普普通通的函数,它被其他函数B作为参数在B的内部调用,那么在这个时候A才能被称为B的回调函数。 回调函数这个概念是相互的,一个单独的函数是无法叫做回调函数的,它只能被称为XXX(被谁在内部调用)的回调函数
```
