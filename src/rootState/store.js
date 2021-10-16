import createSagaMiddleware from '@redux-saga/core'
import { authSlice } from '../features/auth/state/authSlice'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import authSaga from '../features/auth/state/authSaga'
import { itemSlice } from '../features/items/state/itemSlice'
import { appSlice } from './appSlice'
import itemSaga from '../features/items/state/itemSaga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
   auth: authSlice.reducer,
   item: itemSlice.reducer,
   app: appSlice.reducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(authSaga)
sagaMiddleware.run(itemSaga)
