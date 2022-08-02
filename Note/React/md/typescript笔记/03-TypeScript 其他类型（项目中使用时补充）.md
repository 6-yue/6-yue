# TypeScript 其他类型

## 元组类型

**目标**：能够知道元组类型的使用场景

- 场景：在地图中，使用经纬度坐标来标记位置信息
- 可以使用数组来记录坐标，那么，该数组中只有两个元素，并且这两个元素都是数值类型

```ts
let position: number[] = [116.2317, 39.5427]
```

- 使用 number[] 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字
- 更好的方式：`元组 Tuple`
- 元组类型是另一种类型的数组，它确切地知道包含多少个元素，**以及特定索引对应的类型**

```ts
let position: [number, number] = [39.5427, 116.2317]
```

- 解释：
  1. 元组类型可以确切地标记出有多少个元素，以及每个元素的类型
  2. 该示例中，元素有两个元素，每个元素的类型都是 number

---

## 字面量类型-基本使用

**目标**：能够知道什么是字面量类型

- 思考以下代码，两个变量的类型分别是什么?

```ts
let str1 = 'Hello TS'
const str2 = 'Hello TS'
```

- 通过 TS 类型推论机制，可以得到答案：
  1. 变量 str1 的类型为：string
  2.  变量 str2 的类型为：'Hello TS'

- 解释:
1. str1 是一个变量(let)，它的值可以是任意字符串，所以类型为: string
2. str2 是一个常量(const)，它的值不能变化只能是 'Hello TS'，所以，它的类型为: 'Hello TS'

- 注意：此处的 'Hello TS'，就是一个**字面量类型**，也就是说某个特定的字符串也可以作为 TS 中的类型
- 任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用
  - 字面量：`{ name: 'jack' }` `[]` `18` `20` `'abc'` `false` `function() {}`

### 使用模式和场景

**目标**：能够使用字面量类型配合联合类型指定一组明确可选值列表

- 使用模式：**字面量类型配合联合类型一起使用**
- 使用场景：用来表示一组明确的可选值列表
- 比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

```ts
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，会有类型提示：
changeDirection('up')
```

- 解释：参数 direction 的值只能是 up/down/left/right 中的任意一个
- 优势：相比于 string 类型，使用字面量类型更加精确、严谨 

## 枚举类型-基本使用（了解）

**目标**：能够知道枚举类型

- 枚举的功能类似于**字面量类型+联合类型组合**的功能，也可以表示一组明确的可选值
- 枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个

```ts
// 创建枚举
enum Direction { Up, Down, Left, Right }

// 使用枚举类型
function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection(Direction.Up)
```

- 解释:
  1. 使用 `enum` 关键字定义枚举
  2. 约定枚举名称以大写字母开头
  3. 枚举中的多个值之间通过 `,`（逗号）分隔
  4. 定义好枚举后，直接使用枚举名称作为类型注解

### 枚举类型-数字枚举

- 问题：我们把枚举成员作为了函数的实参，它的值是什么呢?
- 解释：通过将鼠标移入 Direction.Up，可以看到枚举成员 Up 的值为 0
- 注意：枚举成员是有值的，默认为：从 0 开始自增的数值
- 我们把，枚举成员的值为数字的枚举，称为：`数字枚举`
- 当然，也可以给枚举中的成员初始化值

```ts
// Down -> 11、Left -> 12、Right -> 13
enum Direction { Up = 10, Down, Left, Right }

enum Direction { Up = 2, Down = 4, Left = 8, Right = 16 }
```

### 枚举类型-字符串枚举

- 字符串枚举：枚举成员的值是字符串
- 注意：字符串枚举没有自增长行为，因此，**字符串枚举的每个成员必须有初始值**

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

### 枚举类型-枚举实现原理

- 枚举是 TS 为数不多的非 JavaScript 类型级扩展(不仅仅是类型)的特性之一
- 因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值(枚举成员都是有值的)
- 也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，**枚举类型会被编译为 JS 代码**

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 会被编译为以下 JS 代码：
var Direction;

(function (Direction) {
  Direction['Up'] = 'UP'
  Direction['Down'] = 'DOWN'
  Direction['Left'] = 'LEFT'
  Direction['Right'] = 'RIGHT'
})(Direction || Direction = {})
```

- 说明：枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表
- 一般情况下，**推荐使用字面量类型+联合类型组合的方式**，因为相比枚举，这种方式更加直观、简洁、高效

## 类型断言

**目标**：能够使用类型断言指定更具体的类型

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，

```ts
const aLink = document.getElementById('link')
```

- 注意：该方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a 标签特有的 href 等属性
- 因此，这个**类型太宽泛(不具体)**，无法操作 href 等 a 标签特有的属性或方法
- 解决方式：这种情况下就需要**使用类型断言指定更加具体的类型**
- 使用类型断言：

```ts
const aLink = document.getElementById('link') as HTMLAnchorElement
```

- 解释:
  1. 使用 `as` 关键字实现类型断言
  2. 关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
  3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了

- 另一种语法，使用 `<>` 语法，这种语法形式不常用知道即可:

```ts
// 该语法，知道即可：
const aLink = <HTMLAnchorElement>document.getElementById('link')
```

*技巧：在浏览器控制台，通过 `__proto__` 获取 DOM 元素的类型*
