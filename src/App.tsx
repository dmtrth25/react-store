import { Suspense, lazy } from 'react'
import Loadable from 'react-loadable';
import Home from "./pages/Home";
import Main from "./layouts/Main";

import './scss/app.scss'

import {
  Routes,
  Route,
} from "react-router-dom";


// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart')); // подгрузили ленивой подгрузкой - теперь переменаня
// // Динамическим образом подгрузит когда это будет необходимо нужно компонент отрендерить

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'), // что ты хочешь ленивым образом подгружать
  loading: () => <div>Loading the page...</div>, // что будет грузится до тех пор пока грузится loader
}); // можно lazy - можно и lodable

const FullItem = lazy(() => import(/* webpackChunkName: "FullItem" */'./pages/FullItem'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}> {/*должен быть закрывающийся тег роута*/}
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Loading the page...</div>}>
            <Cart />
          </Suspense>} />
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Loading the page...</div>}>
            <FullItem /> {/*делаем роут*/}
          </Suspense>} />
        <Route path="*" element={
          <Suspense fallback={<div>Loading</div>}>
            <NotFound /> {/*делаем роут*/}
          </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
