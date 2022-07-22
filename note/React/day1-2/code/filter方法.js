let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let r = arr.filter((item) => {
  return item % 2 == 0
})
console.log(r)

// 数组去重
let r1,
  arr1 = [
    'apple',
    'strawberry',
    'banana',
    'pear',
    'apple',
    'orange',
    'orange',
    'strawberry',
  ]
r1 = arr1.filter((element, index, self) => {
  return self.indexOf(element) === index
})
console.log(r1.toString())
