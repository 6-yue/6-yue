import { ReactDOM } from 'react-dom/client'

const isLoading = false
const loadData = () => {
  // 1. if else
  // if (isLoading) {
  //   return <div>数据加载中……</div>
  // }
  // return <div>数据加载完成</div>
  // 2. 逻辑与
  // return !isLoading && <div>loading……</div>
  // 3. 三元表达式
  return isLoading ? <div>欢迎你,尊敬的v10用户</div> : <div>请登录，谢谢</div>
}

const el = (
  <>
    <h5>{loadData}</h5>
  </>
)

// 获取元素
const root = ReactDOM.createRoot(document.querySelector('#root'))

// 渲染
root.render(el)
