import './App.css'

const Node = () => (
  <div className="node">
    Node
    <SubNode />
  </div>
)
const SubNode = () => (
  <div className="sub-node">
    SubNode
    <Child />
  </div>
)
const Child = () => <div className="child">Child</div>

export default function App() {
  return (
    <div className="app">
      <h1>我是App组件</h1>
      <Node />
    </div>
  )
}
