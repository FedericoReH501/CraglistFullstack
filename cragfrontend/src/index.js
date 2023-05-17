import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'
import { createStore } from 'redux';
import{Provider} from 'react-redux'
import userReducer from './reducers/userReducer';
const client = new QueryClient()

const store = createStore(userReducer)

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

