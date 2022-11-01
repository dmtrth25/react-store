import { FC, useState, useEffect} from 'react';
import axios from 'axios';

import { useParams, useNavigate, Link } from 'react-router-dom';

const FullItem: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>();

  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62cbe9a4a080052930a12457.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error when getting pizza!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container--item">
      <img src={pizza.imageUrl}></img>
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
