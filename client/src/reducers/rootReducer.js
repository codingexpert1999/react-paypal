import {combineReducers} from 'redux'
import transactionReducer from './transactionReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    transaction: transactionReducer
})

export default rootReducer;