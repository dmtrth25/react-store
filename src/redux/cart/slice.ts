import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, CartSliceState } from "./types"

import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { getCartFromLS } from "../../utils/getCartFromLS"

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<CartItem>) { // PayloadAction тип для actions <> указываем что именно
      const findItem = state.items.find(obj => obj.id === action.payload.id) // Если в стейте items был найден обьект у которого id равен action.payload.id
      if (findItem) {
        findItem.count++ // сделай count ++ и редакс сделает перерисовку
      } else { // иначе такого обьекта нету и мы его добавляем в массив
        state.items.push({
          ...action.payload, // берем все что пришло с компонента
          count: 1 // и в конец добавляем один елемент - говорим что добавлен только один продукт
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0 // После очистики очищаем тоже
    }
  }
})


export const { setItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer