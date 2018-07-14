import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from '../reducers'

const rootReducer = combineReducers({
    ...reducers
})

const middewares = [thunk]

export default createStore(rootReducer, compose(applyMiddleware(...middewares)))
