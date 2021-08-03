import { GET_TRANSACTIONS, SAVE_TRANSACTION, SET_LOADING, REFUND_COMPLETED, GET_REFUNDS, GET_SUBSCRIPTIONS, SUBSCRIBE, UNSUBSCRIBE } from "../actionTypes/transaction";

const initialState = {
    transactions: [],
    loading: false,
    refunds: [],
    subscriptions: []
}

const transactionReducer = (state=initialState, {type, payload}) => {
    let transactions = state.transactions
    let refunds = state.refunds;
    let subscriptions = state.subscriptions;

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
        case GET_SUBSCRIPTIONS:
            return {...state, subscriptions: payload}
        case SUBSCRIBE:
            subscriptions.push(payload)
            return {...state, subscriptions}
        case UNSUBSCRIBE:
            subscriptions = subscriptions.filter(subscription => subscription._id !== payload.subscriptionId)
            return {...state, subscriptions}
        default:
            return state
    }
}

export default transactionReducer;