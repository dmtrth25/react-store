import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, SortPropertyEnum, SortType } from "./types"

const initialState: FilterSliceState = {
  categoriesType: 0,
  searchValue: '',
  currentPage: 1,
  sort: {
    name: 'popular',
    sortProperty: SortPropertyEnum.RATING_DESC
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoriesType(state, action: PayloadAction<number>) {
      state.categoriesType = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoriesType = Number(action.payload.categoriesType) 
      state.sort = action.payload.sort
    }
  }
})

export const { setCategoriesType, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer