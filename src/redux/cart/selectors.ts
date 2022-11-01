import { RootState } from "../store"

export const selectCart = (state: RootState) => state.cart // просто делаем именную функцию (селектор которая будет повторять)

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)
// принимаем id которое уже вернет то что нам нам в useSелектор