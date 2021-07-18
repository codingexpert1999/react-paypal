import { GET_TRANSACTIONS, SAVE_TRANSACTION, SET_LOADING, REFUND_COMPLETED, GET_REFUNDS } from "../actionTypes/transaction";

const initialState = {
    transactions: [],
    loading: false,
    refunds: []
}

const transactionReducer = (state=initialState, {type, payload}) => {
    let transactions = state.transactions
    let refunds = state.refunds;

    switch(type){
        case GET_TRANSACTIONS:
            return {...state, transactions: payload}
        case SAVE_TRANSACTION:
            transactions.push(payload)
            return {...state, transactions}
        case SET_LOADING:
            return {...state, loading: payload}
        case REFUND_COMPLETED:
            transactions = transactions.filter(transaction => transaction._id !== payload.transactionId)
            refunds.push(payload.refund);
            return {...state, transactions, refunds}
        case GET_REFUNDS:
            return {...state, refunds: payload}
        default:
            return state
    }
}

export default transactionReducer;