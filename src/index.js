import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';



import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

import { BrowserRouter } from 'react-router-dom'

const initialState = {}

const middleware = [thunk]

const store = createStore (
  rootReducer, 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)




ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
