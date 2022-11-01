import { FC, memo } from 'react';

type CategoriesProps = {
  value: number
  onChangeCategory: (i: number) => void // это функция которая принимает определенное количество параметров
  // void - функция не требует return ничего
  // если пропсы не поменялись наша функция перерисовки не делает
  // это к ts мы должны сказать что наша функция получит и что она вернет; void - ничего
}

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сlosed'];

export const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => { // автоматическая типизация пропсов компонента
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
})
