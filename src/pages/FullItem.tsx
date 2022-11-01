import { FC, useState, useEffect} from 'react';
import axios from 'axios';

import { useParams, useNavigate, Link } from 'react-router-dom';

const FullItem: FC = () => {
  const [pizza, setPizza] = useState<{ // Продукт либо обьект либо undefined и передаем тип <></>
    imageUrl: string
    title: string
    price: number
  }>(); // Мы ничего не передаем undefined

  const { id } = useParams(); // через деструктуризацию вытащим id
  // Он также как и useParams делает перерисовку если в адресной строке что то поменяется

  const navigate = useNavigate(); // используем после неправильного ввода в uri перенаправление после alerta
  useEffect(() => {
    async function fetchPizza() {
      // делаем async функцию потому что нельзя писать в useEffect
      try {
        const { data } = await axios.get('https://62cbe9a4a080052930a12457.mockapi.io/items/' + id); // прикручиваем id
        setPizza(data); // устанавливаем в елемент
      } catch (error) {
        alert('Error when getting pizza!'); // если ошибка
        navigate('/'); // переход сюда
      }
    }

    fetchPizza(); // нужно вызвать
  }, []);

  if (!pizza) {
    // Если пицца пустая (undefined) то загрузка
    // до того как рендерить я делаю проверку нудно ли мне делать это если не undefined
    return <>Loading...</>;
  }

  return (
    <div className="container--item">
      <img src={pizza.imageUrl}></img> {/*рендер елементов*/}
      <h2>{pizza.title}</h2>
      <h3>Description:</h3>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic provident porro, autem sapiente dolorum commodi tempora sed delectus exercitationem? Assumenda minima at ipsam pariatur quidem rerum minus placeat voluptatum sapiente dolorum, earum nostrum harum, enim omnis ullam optio sint sequi!</div>
      <div className='price'>Price: {pizza.price} $</div><br />
      <Link to='/efer'>
        <button className='button button--outline button--add'>
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default FullItem;
