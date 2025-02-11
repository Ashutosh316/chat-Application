import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Toaster} from "react-hot-toast";
import store from './redux/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
      <App />
      <Toaster/>
      </PersistGate>
    

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

