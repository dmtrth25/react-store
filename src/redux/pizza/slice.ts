import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pizza, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload // в payload идет сразу data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => { // Выполнение запроса фетч пицца ожидание
      state.status = Status.LOADING // сохраняем 'loading' в отдельном ключе
      state.items = [] // очищаем пиццы во время загрузки
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => { // Выполнение запроса fetch пицца ожидание
      state.items = action.payload;
      state.status = Status.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, (state) => { // Выполнение запроса фетч пицца ожидание
      state.status = Status.ERROR
      state.items = [] // чтобы у нас не вернулись старые пиццы очищаем
    })
  }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer