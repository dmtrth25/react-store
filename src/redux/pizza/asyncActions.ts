import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>( // эта функция говорит дай мне префикс, какие то данные и может какие то доп опции
  'pizza/fetchPizzasStatus', // имя у нас name: 'pizza'
  // пицца должна сделать какой то ассинхронный экшен
  async (params) => { // Мы хотим сделать ассинхронную функцию
    const {
      sortBy,
      order,
      category,
      search,
      currentPage
    } = params // вытащим эелементы
    const { data } = await axios.get<Pizza[]>( // перенесли запрос сюда
      `https://62cbe9a4a080052930a12457.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data // data как массив пицц
  }
)