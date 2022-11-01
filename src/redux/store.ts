import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterSlice from './filter/slice'
import cartSlice from './cart/slice'
import pizzaSlice from './pizza/slice'

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice
  },
})

export type RootState = ReturnType<typeof store.getState> // RootState - глобальный стейт
// вытащи getState - оно вернет все хранилище - простой дай нам тип
// ReturnType - Дай нам функцию и я ее содержимое сделаю типом

type AppDispatch = typeof store.dispatch // Возьми тип и преврати его в переменную
export const useAppDispatch: () => AppDispatch = useDispatch // создали хук в который