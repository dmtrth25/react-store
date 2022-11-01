import React, { FC, useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce'; //отложить вызовы АПИ, что бы они не происходили слишком часто
import styles from './Search.module.scss';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // ссылка на инпут

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    // document.querySelector('input').focus(); // Плохая практика - так нельзя при вводе инпута при клике на крестик фокус остается - лучше использовать useRef
    // if(inputRef.current) { // исключи null и скажи что должно быть только положительное значение - наведи на current
    // }
    inputRef.current?.focus(); // Если нету в current и может быть null ? то тогда не вызывай focus()
    // Если что то есть ну тогда вызови
  };

  const updateSearchValue = useCallback(
    // оптимизируем
    debounce((str: string) => {
      // при первом рендере создайся и больше не создавайся
      dispatch(setSearchValue(str)); // передаем уже не в контекст а в dispatch setSearchValue наше str элемент
    }, 250),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => { // ts мы должны сказать что event это определенный тип события
    setValue(event.target.value); // Делаем функцию которая будет отрабатывать на onChange
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput} // Отработка
        className={styles.input}
        placeholder="Search..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}
