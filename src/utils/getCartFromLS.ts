import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : [] // когда из json парсится parse не знает что мы хотим спарсить укажем as CartItem[]
  const totalPrice = calcTotalPrice(items)
  return {
    items: items as CartItem[],
    totalPrice
  }
}