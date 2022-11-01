import React, { FC, useRef, useCallback, useEffect } from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Categories, Sort, ItemBlock, Pagination, Skeleton} from '../components'

// import Categories, from '../components/Categories';
// import Sort from '../components/Sort'status;
// import ItemBlock from '../components/ItemBlock';         // Bad exports
// import Pagination from '../components/Pagination';
// import Skeleton from '../components/ItemBlock/Skeleton';

import { useAppDispatch } from '../redux/store';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoriesType, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  

  const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoriesType, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoriesType(idx));
  }, []) // создайся при первом рендере и больше не пересоздавайся
  // если будут перерисовки не пересоздавай эту функцию

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
        sortBy, // передаем наши элементы
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    // Можно вообще убрать try catch ибо у нас все отрабатывается внутри ассинхронного экшена фетч пицца и обрабатываем статусы и ошибки pending fulfilled rejected и тд

    window.scrollTo(0, 0);
  };

  // // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoriesType: categoriesType > 0 ? categoriesType : null,
  //       sortType,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true }); // берем целый обьект и преврщаем в целую строчку чтобы в дальнейшем вшить его в адресную строку

  //     navigate(`/?${queryString}`); // Мы хотим передать ? ибо не передается в консоле на примере и нашу строку
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams)); // Заствялем обьект быть SearchPizzaParams
  //   }
  //   isMounted.current = true; // Ага при следующем рендер тру - тогда делаем логику и так дальше
  //   // При самом первои рендере у нас будет false он ничего не выполнит - потом хоп уже isMounted true
  //   // у нас dispatch заставит приложение пересоватся то уже if(is<ounted.current) будет true
  // }, [categoriesType, sortType, currentPage]);

  // // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams // с помощью qs мы парсим b substring обрезаем ?
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy); // импортируем list from sort и находим sortProperty и сравниваем с нашим pararms.sortType
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoriesType: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0] // из URL парсим строчки но в redux сохраняем так как нам говорит redux
  //         // Если нашлась то делаем sort если нет то мы берем первое значение
  //       }), // в итоге в редкс мы передадим обьект со всеми полями что нам нужны
  //        // нам нужно передать все параметры но сделать как в переменной сорт
  //     ); // Все эти свойства с помощью dispatch мы должны передать их в редакс

  //     isSearch.current = true; // До того как выполнится следующий useEffect мы заранее проверяем нужно ли нам заранее делать поиск через url
  //   } // Если тут есть чтото то мы будем это парсить из наших параметров и превращать их в обьект
  // }, []); // sortType -> sortBy convert

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      // Если сейчас нету поиска по query параметрам.
      getPizzas(); // если этого нету - то мы делаем fetch запрос
    } // после того как иы поняли что тут ничего нету

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
