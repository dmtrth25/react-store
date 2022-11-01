import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      sortBy,
      order,
      category,
      search,
      currentPage
    } = params
    const { data } = await axios.get<Pizza[]>(
      `https://62cbe9a4a080052930a12457.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data
  }
)