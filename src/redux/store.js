// import { configureStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, userReducer} from './reducers'
import thunk from 'redux-thunk'

// const rootReducer = combineReducers({ userReducer });

const Store = configureStore({ reducer: rootReducer })


export default Store