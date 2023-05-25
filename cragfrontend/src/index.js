import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import {HashRouter as Router} from 'react-router-dom'
import{configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import{Provider} from 'react-redux'
import userReducer from './reducers/userReducer';
import cragsReducer from './reducers/showCragsReducer';
import cragsFilterReducer from './reducers/cragsFilterReducer';
import regionReducer from './reducers/regionReducer';
const client = new QueryClient()

const store = configureStore({
  reducer:{
    user:userReducer,
    crags: cragsReducer,
    filter: cragsFilterReducer,
    region: regionReducer
  },
  middleware: [getDefaultMiddleware()[1], getDefaultMiddleware()[2]],

})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <Router>
      
          <App />
      
      </Router>
    </Provider>
  </QueryClientProvider>
)

