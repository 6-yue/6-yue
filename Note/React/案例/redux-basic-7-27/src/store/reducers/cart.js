// 购物车数据的默认值
const initialState = [
  {
    'id': 1,
    'goods_name':
      '班俏BANQIAO超火ins潮卫衣女士2020秋季新款韩版宽松慵懒风薄款外套带帽上衣',
    'goods_img': 'https://www.escook.cn/vuebase/pics/1.png',
    'goods_price': 108,
    'goods_count': 1,
    'goods_state': true,
  },
  {
    'id': 2,
    'goods_name':
      '嘉叶希连帽卫衣女春秋薄款2020新款宽松bf韩版字母印花中长款外套ins潮',
    'goods_img': 'https://www.escook.cn/vuebase/pics/2.png',
    'goods_price': 129,
    'goods_count': 2,
    'goods_state': true,
  },
  {
    'id': 3,
    'goods_name':
      '思蜜怡2020休闲运动套装女春秋季新款时尚大码宽松长袖卫衣两件套',
    'goods_img': 'https://www.escook.cn/vuebase/pics/3.png',
    'goods_price': 198,
    'goods_count': 1,
    'goods_state': false,
  },
]

// 购物车的 reducer
const cart = (state = initialState, action) => {
  return state
}

export default cart
