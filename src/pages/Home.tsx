import React, { FC, useRef, useCallback, useEffect } from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Categories, Sort, ItemBlock, Pagination, Skeleton} from '../components'

import { useAppDispatch } from '../redux/store';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoriesType, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  

  const isSearch = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoriesType, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoriesType(idx));
  }, [])

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoriesType > 0 ? `category=${categoriesType}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if(!isSearch.current) {
      getPizzas();
    } 

    isSearch.current = false;
  }, [categoriesType, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => <ItemBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesType} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">All products</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Error happened<span>😕</span>
          </h2>
          <p>It was not possible to get pizzas. Please try again later</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
