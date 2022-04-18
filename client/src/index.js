import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore(),
  }}>
      <App />
  </Context.Provider>,
document.getElementById('root')
);