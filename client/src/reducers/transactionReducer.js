import { GET_TRANSACTIONS, SAVE_TRANSACTION } from "../actionTypes/transaction";

const initialState = {
    transactions: []
}

const transactionReducer = (state=initialState, {type, payload}) => {
    let transactions = state.transactions
    switch(type){
        case GET_TRANSACTIONS:
            return {...state, transactions: payload}
        case SAVE_TRANSACTION:
            transactions.push(payload)
            return {...state, transactions}
        default:
            return state
    }
}

export default transactionReducer;