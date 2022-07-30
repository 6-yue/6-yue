# Redux Toolkit

## 基本使用

**目标**：能够使用 redux toolkit 来配置 redux

**内容**：

Redux Toolkit（RTK）是官方推荐的使用 Redux 的方式

它包装了 Redux，包含了使用 Redux 开发应用时常用的包，比如，redux-thunk。RTK 提供的 API 简化了繁琐且重复的配置，比如，创建 store 时的合并 reducer、配置 redux-thunk、redux 开发者工具等。从而，简化了 Redux 的使用

简化方式：

1. RTK 通过 `createSlice` API，来将 action、reducer 整合到一块
2. 内部集成了第三方库 `immer.js`，响应式数据，可以直接修改（注意：虽然可以直接修改，但是实际上内部还是不可变数据）

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  // action 类型的前缀
  name: 'counter',
  // 当前 slice 的初始状态
  initialState,
  // reducers 中的函数，会自动被解析为 action
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// 导出 reducer
export default counterSlice.reducer
```

**步骤**：

1. 安装 RTK：`npm i @reduxjs/toolkit`
2. 安装链接库：`npm i react-redux`
2. 在 index.js 中配置 Provider

```jsx
import { Provider } from 'react-redux'
import { store } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

4. 在 store/index.js 中 配置 store

```jsx
import { configureStore } from '@reduxjs/toolkit'
import counter from './slices/counter'

export const store = configureStore({
  reducer: {
    counter,
  },
})
```

5. 在 slices/counter.js 中创建 slice，处理同步 action

```jsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counter = createSlice({
  // action type 前缀
  name: 'counter',
  // 当前 slice 的初始状态
  initialState,
  // reducers 中的函数，会自动被解析为 action
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 导出 reducer
export default counter.reducer
```

6. 组件中，分发 action 来发起状态更新
   - action 类型的格式为：'slice的name/reducer名称'，也就是 `'counter/increment'`

```jsx
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button
        onClick={() =>
          dispatch({
            type: 'counter/increment',
          })
        }
      >
        +1
      </button>
    </div>
  )
}

export default App
```

## 使用 action creator

**目标**：能够在RTK中使用 action creator 创建 action

**内容**：

createSlice 的配置项 `reducers`，做了两件事情：

1. 接收 state 和 action，然后，更新状态
1. 创建 action creator 函数

**核心代码**：

1. 从 counter slice 中拿到 reducers 创建的 action creator 函数

```js
export const counter = createSlice({
  // action type 前缀
  name: 'counter',
  // 当前 slice 的初始状态
  initialState,
  // reducers 中的函数，会自动被解析为 action
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 拿到 reducers 创建的 action creator 并导出
export const { increment, decrement, incrementByAmount } = counter.actions
```

2. 在组件中使用 action creator 函数，来更新状态

```jsx
// 导入 action creator 函数
import { increment } from './store/slices/counter'

const App = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button
        onClick={() =>
    			// 通过 action creator 创建 action，并分发
          dispatch(increment())
        }
      >
        +1
      </button>
    </div>
  )
}
```

## 异步操作

**目标**：能够使用RTK处理异步操作

**内容**：

RTK 中内置了 `redux-thunk` 中间件，可以通过 `createAsyncThunk` 函数，来创建一个 thunk action

语法：

```js
import { createAsyncThunk } from '@reduxjs/toolkit'

// thunk action
// 参数：
// 	第一个参数：类型，该类型只是一个标识，可以在 Redux 开发者工具中展示
// 	第二个参数：回调函数，该回调函数的有两个参数，1 分发action时的参数  2 thunkAPI，包含了 dispatch/getState 等
// 返回值：thunk action creator
const incrementAsync = createAsyncThunk(type, payloadCreator)
```

示例：

```js
// 创建 thunk action
const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    // amount => 10
    const response = await sleep(2000)
  }
)

// 分发 thunk action
dispatch(incrementAsync(10)) // 此处的 10 会传递给上面的 amount 参数
```

```js
// 创建 thunk action
const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount, { dispatch, getState }) => {
    const response = await sleep(2000)
    
    // 继续分发其他 action
    // dispatch( 其他action )
    
    // 获取 redux 状态
    // const state = getState()
  }
)
```

处理异步操作完成后的状态：

- 说明：RTK 中采用了 Promise 的状态（pending/fullfiled/rejected），来作为 thunk action 处理过程的状态
  - 如果异步操作进行中，此时，thunk action 的状态为：`pending`
  - 如果异步操作成功（完成），此时，thunk action 的状态为：`fulfilled`
  - 如果异步操作失败，此时，thunk action 的状态为：`rejected`
- 简单来说，我们只处理 `fulfilled` 状态即可

```js
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    const response = await sleep(2000)
    // 1 在该回调函数中，返回要异步操作的数据
    // 	 此处返回的数据，会传递给 fulfilled 的 action.payload
    return amount // 10
  }
)


export const counterSlice = createSlice({
  // ...
  
  // 2 通过该配置项来处理 thunk action 返回的数据
  extraReducers: (builder) => {
    builder
    	// 等待 incrementAsync 异步操作完成
      .addCase(incrementAsync.fulfilled, (state, action) => {
      	// action => { type, payload }
      	//	 payload 是 incrementAsync return 的数据，此处为： 10
        state.value += action.payload
      })
  },
})
```

完整示例：

```jsx
// 导入创建异步 action 的函数
import { createAsyncThunk } from '@reduxjs/toolkit'

// 模拟异步操作
// 调用方式： sleep(2000)，表示让代码睡2000ms，后面的代码会在 2s 后再执行
const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay))

const initialState = {
  value: 0,
}

// thunk action 进行一步操作
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await sleep(2000)
    // 返回异步操作的结果数据
    return amount
  }
)

export const counterSlice = createSlice({
  // ...
  
  // 通过该配置项来处理 thunk action
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
      	// 更新状态
        state.value += action.payload
      })
  },
})

// 分发 thunk action
dispatch(incrementAsync(10)) // 此处的 10 会传递给上面的 amount 参数
```

## 综合案例-购物车案例

<img src="images/image-20201223110712000-16362089372116-8572512.png" style="width: 800px" />

### 1. 使用模板搭建案例结构

**目标**：能够使用案例模板搭建结构

**内容**：

将项目模板拷贝到项目中

### 2. 使用 RTK 配置 Redux

**目标**：能够在购物车案例中使用RTK配置Redux

**内容**：

store/slices/cart.js 中：

```js
import { createSlice } from '@reduxjs/toolkit'

const cart = createSlice({
  name: 'cart',
  initialState: [],
})

export default cart.reducer
```

store/index.js 中：

```js
import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cart'

const store = configureStore({
  reducer: {
    cart,
  },
})

export default store
```

index.js 中：

```jsx
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

// 导入 bootstrap 样式文件：
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import store from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 3. 商品列表渲染

**目标**：能够完成商品列表的数据渲染

**步骤：**

1. 进入组件时，使用 useEffect hook 分发 action 来获取商品列表数据
2. 在 cart slice 中，创建 thunk action，并发送请求获取数据，并返回
3. 在 extraReducers 中，处理 thunk action 成功状态，并将商品列表数据保存到 redux 中
4. 在 App 中通过 useSelector 获取到商品列表状态数据
5. 使用列表渲染，渲染商品列表
6. 将每个商品的数据通过组件的 props 传递给 GoodsItem 组件
7. 在 GoodsItem 组件中，拿到商品属性，进行渲染

**核心代码**：

slices/cart.js 中：

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getGoodsList = createAsyncThunk('cart/getGoodsList', async () => {
  const res = await axios.get('http://localhost:8888/cart')
  return res.data
})

const cart = createSlice({
  name: 'cart',
  initialState: [],

  extraReducers: builder => {
    builder.addCase(getGoodsList.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default cart.reducer
```

App.js 中：

```jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getGoodsList } from './store/slices/cart'

const App = () => {
  const dispatch = useDispatch()
  const goodsList = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getGoodsList())
  }, [dispatch])

  return (
    <div className="app">

      {goodsList.map(item => (
        <GoodsItem key={item.id} {...item} />
      ))}

    </div>
  )
}

export default App
```

GoodsItem/index.js 中：

```jsx
import './index.scss'
const GoodsItem = ({
  id,
  goods_name,
  goods_img,
  goods_price,
  goods_count,
  goods_state,
}) => {
  return (
    <div className="cart-goods-item">
      <div className="left">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={`input-${id}`}
          />
          <label className="custom-control-label" htmlFor={`input-${id}`}>
            <img src={goods_img} alt="" />
          </label>
        </div>
      </div>
      <div className="right">
        <div className="top">{goods_name}</div>
        <div className="bottom">
          <span className="price">¥ {goods_price}</span>
          <span>counter组件</span>
        </div>
      </div>
    </div>
  )
}

export default GoodsItem
```

### 4. 商品选中功能

**目标**：能够完成商品的选中切换功能

**分析说明**：对于 checkbox 表单项来说，在使用受控组件获取值的时候，需要指定 `checked` 属性

**步骤：**

1. 在 GoodsItem 组件中通过传递过来的选中状态值作为复选框的 checked 值
2. 给 checkbox 绑定 change 事件
3. 在 change 事件中，分发 thunk action 来更新 redux 状态
4. 在 slices/cart.js 中，创建修改商品选中状态的 thunk action：changeGoodsState
5. 在 changeGoodsState 中，发送请求修改接口数据，并返回要修改商品的 id 和 勾选状态
6. 在 extraReducers 中，处理该 thunk action，并更新 redux 状态

**核心代码**：

slice/cart.js 中：

```js
export const changeGoodsState = createAsyncThunk(
  'cart/changeGoodsState',
  async ({ id, goods_state }) => {
    await axios.patch(`http://localhost:8888/cart/${id}`, {
      goods_state,
    })

    return {
      id,
      goods_state,
    }
  }
)

const cart = createSlice({
  extraReducers: builder => {
    
    builder.addCase(changeGoodsState.fulfilled, (state, action) => {
      const goodsItem = state.find(item => item.id === action.payload.id)
      goodsItem.goods_state = action.payload.goods_state
    })
  },
})

```

GoodsItem/index.js 中：

```jsx
import { useDispatch } from 'react-redux'
import { changeGoodsState } from '../../store/slices/cart'

const GoodsItem = ({
  id,
  goods_state,
}) => {
  const dispatch = useDispatch()

  const onChange = e =>
    dispatch(
      changeGoodsState({
        id,
        goods_state: e.target.checked,
      })
    )

  return (
    <input
      type="checkbox"
      className="custom-control-input"
      id={`input-${id}`}
      checked={goods_state}
      onChange={onChange}
      />
  )
}
```

### 5. 商品全选功能

**目标**：能够完成商品全选切换功能

**分析说明**：

全选按钮是否选中，分为 3 种情况：

1. 进入页面时，判断所有商品是否都选中，如果都选中了，让全选按钮也选中；否则，不选中
2. 切换商品的选中状态，全选按钮的选中状态会随之切换
3. 切换全选按钮的选中状态，商品的选中状态会随之切换

其中，情况1和情况2可以看做一种情况：**只要状态改变，就重新计算全选按钮的选中状态**

接下来，按照上面的 3 种情况，来实现该功能。

情况1和情况2：进入页面控制全选按钮的选中状态

**步骤**：

1. 在 CartFooter 组件中根据购物车数据，得到全选按钮的选中状态 isCheckAll
2. 将 isCheckAll 作为全选按钮的 checked 属性值

**核心代码：**

CartFooter.js 中：

```jsx
export const CartFooter = () => {
  const goodsList = useSelector(state => state.cart)
  const isCheckAll = goodsList.every(item => item.goods_state)
  
  return (
    <div className="my-footer">
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="footerCheck"
          checked={isCheckAll}
        />
        <label className="custom-control-label" htmlFor="footerCheck">
          全选
        </label>
      </div>
      <div>
        <span>合计:</span>
        <span className="price">¥ 100</span>
      </div>
      <button type="button" className="footer-btn btn btn-primary">
        结算 (0)
      </button>
    </div>
  )
}
```

情况3：切换全选按钮的选中状态，控制商品的选中状态

**说明**：

- json-server 开启的接口服务，没有提供批量修改数据功能，因此，需要我们手动遍历，为每个商品都发送一次请求，来修改数据

**步骤**：

1. 在 slices/cart.js 中创建 thunk action：changeAllGoodsState
2. 在 CartFooter 组件中，给全选按钮添加 change 事件
3. 在 change 事件中，分发 changeAllGoodsState 这个 thunk action
4. 在 changeAllGoodsState 中，通过参数 getState 拿到购物车中的所有数据
5. 遍历购物车数据，为每个商品单独发送一次请求
6. 在 changeAllGoodsState 中返回商品选中状态
7. 在 extraReducers 中，更新商品选中状态

**核心代码**：

CartFooter.js 中：

```jsx
const CartFooter = () => {
  const dispatch = useDispatch()

  const onChangeAll = e => {
    changeAllGoodsState(e.target.checked)
  }
	return (
  	<input
      type="checkbox"
      className="custom-control-input"
      id="footerCheck"
      checked={isCheckAll}
      onChange={onChangeAll}
    />
  )
}
```

slices/cart.js 中：

```jsx
export const changeAllGoodsState = createAsyncThunk(
  'cart/changeAllGoodsState',
  async (goods_state, { getState }) => {
    const { cart: goodsList } = getState()
    goodsList.forEach(item =>
      axios.patch(`http://localhost:8888/cart/${item.id}`, {
        goods_state,
      })
    )

    return goods_state
  }
)

const cart = createSlice({
  extraReducers: builder => {
    builder.addCase(changeAllGoodsState.fulfilled, (state, action) => {
      state.forEach(item => {
        item.goods_state = action.payload
      })
    })
  },
})
```

### 6. 展示结算数量与总价

**目标**：能够展示结算数量和总价格

**步骤：**

1. 在 CartFooter 组件中计算总数量和总价格
2. 渲染数据

**核心代码**：

CartFooter.js 中：

```jsx
export const CartFooter = () => {
  const totalCount = goodsList.reduce((count, item) => {
    if (item.goods_state) {
      return count + item.goods_count
    }
    return count
  }, 0)

  const totalPrice = goodsList.reduce((count, item) => {
    if (item.goods_state) {
      return count + item.goods_count * item.goods_price
    }
    return count
  }, 0)

  return (
    <div className="my-footer">
			// ...
      <div>
        <span>合计:</span>
        <span className="price">¥ {totalPrice}</span>
      </div>
      <button type="button" className="footer-btn btn btn-primary">
        结算 ({totalCount})
      </button>
    </div>
  )
}
```

### 7. 判断商品数量

**目标**：能够根据商品数量进行不同操作

**步骤**：

1. 创建修改商品数量的函数 changeCount
1. 判断商品数量是否小于 1，
   1. 如果小于 1 就提醒：弹窗提醒是否删除该商品；如果是，就分发删除商品的 thunk action
   1. 如果不小于 1 就分发修改商品数量的 thunk action

1. 给 减、加、文本框 添加事件，来调用修改商品数量的函数，并传入相应的数据

**核心代码**：

CartCounter/index.js 中：

```jsx
import './index.scss'

const CartCounter = ({ id, count }) => {
  // 修改商品数量，该方法可以由 -、+、文本框 三个地方都来调用
  // 参数 count 为： 要修改的商品数量
  const changeCount = newCount => {
    if (newCount < 1) {
      // return alert('商品数量最少一件')
      const canDelete = window.confirm('是否从购物车中删除商品?')
      if (canDelete) {
        // 删除商品
      }
      return
    }
    // 修改数量
  }

  return (
    <div className="my-counter">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => changeCount(count - 1)}
      >
        -
      </button>
      <input
        type="input"
        className="form-control inp"
        value={count}
        onChange={e => changeCount(+e.target.value)}
      />
      <button
        type="button"
        className="btn btn-light"
        onClick={() => changeCount(count + 1)}
      >
        +
      </button>
    </div>
  )
}
```

### 8. 删除商品

**目标**：能够删除购物车商品

**步骤**：

1. 在 slices/cart.js 中，创建删除商品的 thunk action
1. 在 extraReducers 中根据 id 来删除该商品
1. 在 CartCounter 组件中，分发删除商品的 thunk action

**核心代码**：

CartCounter/index.js 中：

```jsx
import { useDispatch } from 'react-redux'
import { deleteGoods } from '../../store/slices/cart'

const CartCounter = ({ id, count }) => {
  const dispatch = useDispatch()
  const changeCount = newCount => {
    if (newCount < 1) {
      const canDelete = window.confirm('是否从购物车中删除商品?')
      if (canDelete) {
        // 删除商品
        dispatch(deleteGoods(id))
      }
      return
    }
  }
}
```

reducers/cart.js 中：

```jsx
export const deleteGoods = createAsyncThunk('cart/deleteGoods', async id => {
  await axios.delete(`http://localhost:8888/cart/${id}`)
  return id
})

const cart = createSlice({
  extraReducers: builder => {
    builder.addCase(deleteGoods.fulfilled, (state, action) => {
      const index = state.find(item => item.id === action.payload)
      state.splice(index, 1)
    })
  },
})
```

### 9. 修改商品数量

**目标**：能够修改购物车数量

**步骤**：

1. 在 slices/cart.js 中，创建修改商品数量的 thunk action
1. 在 extraReducers 中根据 id 和 数量 来修改该商品
1. 在 CartCounter 组件中，分发修改商品数量的 thunk action

**核心代码**：

slices/cart.js 中：

```js
export const updateGoodsCount = createAsyncThunk(
  'cart/updateGoodsCount',
  async ({ id, count }) => {
    await axios.patch(`http://localhost:8888/cart/${id}`, {
      goods_state: count,
    })

    return {
      id,
      count,
    }
  }
)

const cart = createSlice({
  extraReducers: builder => {
    builder.addCase(updateGoodsCount.fulfilled, (state, action) => {
      const { id, count } = action.payload
      const goods = state.find(item => item.id === id)
      goods.goods_count = count
    })
  },
})
```

CartCounter/index.js 中：

```jsx
const changeCount = newCount => {
  if (newCount < 1) {
    const canDelete = window.confirm('是否从购物车中删除商品?')
    if (canDelete) {
      // 删除商品
      dispatch(deleteGoods(id))
    }
    return
  }
  
  // 修改数量
  dispatch(updateGoodsCount({ id, count: newCount }))
}
```

