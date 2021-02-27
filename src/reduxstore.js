import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import itemsReducer from './redux/ActionReducer'

const store = createStore(itemsReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store
