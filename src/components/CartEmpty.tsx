import {FC} from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: FC = () => 
  <div className="cart cart--empty">
    <h2>
      Cart is empty<span>😕</span>
    </h2>
    <p>
      You haven't ordered a product
      <br />
      For order return to the main page
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Back</span>
    </Link>
  </div>