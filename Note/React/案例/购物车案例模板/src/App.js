import CartFooter from './components/CartFooter'
import CartHeader from './components/CartHeader'
import GoodsItem from './components/GoodsItem'

import './App.scss'

const App = () => {
  return (
    <div className="app">
      <CartHeader>购物车案例</CartHeader>

      <GoodsItem />

      <CartFooter />
    </div>
  )
}

export default App
