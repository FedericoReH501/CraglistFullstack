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
            main: '#0B4970',
        },
        secondary: {
            main: '#e9e822',
        },
    },
    typography: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        fontWeightLight: 200,
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 100,
                padding: '0 30px',
            },
        },
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
