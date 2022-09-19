// import { configureStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import  rootReducer from './reducers'

// const rootReducer = combineReducers({ userReducer });

const Store = configureStore({ reducer: rootReducer })


export default Store