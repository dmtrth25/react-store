import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
}

// items.reduce((sum, obj) => { // Когда ты будешь добавлять новую пиццу ты должен просто пробежаться по массиву найду сумму 4рех пиц выведу их это НЕПРАВИЛЬНО
//   // Мы должны сказать сколько у каждой пиццы добавлений
//   return (obj.price * obj.count) + sum // сколько стоит пицца и * сколько раз ее добавили и + предыдущую сумму
// }, 0) // Не забудь 0 начальное состояние для sum