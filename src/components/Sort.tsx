import { FC, memo, useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSort } from '../redux/filter/slice';
import { SortPropertyEnum, SortType } from '../redux/filter/types';

export const list: ListItem[] = [ // массив обьектов
  { name: 'popular ↓', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'popular ↑', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'price ↓', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'price ↑', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'title ↓', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'title ↑', sortProperty: SortPropertyEnum.TITLE_ASC },
];

type ListItem = {
  name: string;
  sortProperty: SortPropertyEnum
}

type SortPropsType = {
  value: SortType
}

export const Sort: FC<SortPropsType> = memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null); // По умолчанию в useRef мы передаем null | HTMLDivElement. Пишем null если изначально ничего нету

  const [open, setOpen] = useState(false);

  const onSelectedItem = (obj: ListItem) => { // получает обьект из sortItem
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { // Click это MouseEvent
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) { // просто вместо path should composedPath
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside); // нужно сказать если небыл клик на sort - скрыть окошко
    return () => document.body.removeEventListener('click', handleClickOutside);

    // useEffect если сейчас компонент должен исчезнуть из страницы unmountиться то мы должны удалить обработчик body на клик. То есть мы передаем ссылку на создание и удалении функции
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onSelectedItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})
