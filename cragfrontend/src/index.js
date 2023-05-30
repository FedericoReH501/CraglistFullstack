import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HashRouter as Router } from 'react-router-dom'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import cragsReducer from './reducers/CragsReducer'
import cragsFilterReducer from './reducers/cragsFilterReducer'
import regionReducer from './reducers/regionReducer'
import notificationReducer from './reducers/notificationReducer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const client = new QueryClient()

const store = configureStore({
    reducer: {
        user: userReducer,
        crags: cragsReducer,
        filter: cragsFilterReducer,
        region: regionReducer,
        notification: notificationReducer,
    },
    middleware: [getDefaultMiddleware()[1], getDefaultMiddleware()[2]],
})

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    typography: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeightLight: 200,
    },
})

root.render(
    <QueryClientProvider client={client}>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Router>
        </Provider>
    </QueryClientProvider>
)
