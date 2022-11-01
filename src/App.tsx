import { Suspense, lazy } from 'react'
import Loadable from 'react-loadable';
import Home from "./pages/Home";
import Main from "./layouts/Main";

import './scss/app.scss'

import {
  Routes,
  Route,
} from "react-router-dom";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'),
  loading: () => <div>Loading the page...</div>,
});
const FullItem = lazy(() => import(/* webpackChunkName: "FullItem" */'./pages/FullItem'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Loading the page...</div>}>
            <Cart />
          </Suspense>} />
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Loading the page...</div>}>
            <FullItem />
          </Suspense>} />
        <Route path="*" element={
          <Suspense fallback={<div>Loading</div>}>
            <NotFound />
          </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
