import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'
import { createStore,combineReducers } from 'redux';
import{Provider} from 'react-redux'
import userReducer from './reducers/userReducer';
import showCragsReducer from './reducers/showCragsReducer';
import cragsFilterReducer from './reducers/cragsFilterReducer';
const client = new QueryClient()
const reducer = combineReducers({
  user:userReducer,
  crags: showCragsReducer,
  filter: cragsFilterReducer
})
const store = createStore( reducer)

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

