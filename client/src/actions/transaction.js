import axios from 'axios'
import {toast} from 'react-toastify'
import {API} from '../config'
import {GET_REFUNDS, GET_SUBSCRIPTIONS, GET_TRANSACTIONS, REFUND_COMPLETED, SAVE_TRANSACTION, SET_LOADING, SUBSCRIBE, UNSUBSCRIBE} from "../actionTypes/transaction"

export const getTransactions = (userId, token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const res = await axios.get(`${API}/transactions/${userId}`, config);

        dispatch({type: GET_TRANSACTIONS, payload: res.data})
    } catch (err) {
        toast.error(err.message)
    }
}

export const saveTransaction = (userId, token, transactionDetails) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const body = JSON.stringify({transactionDetails})

        const res = await axios.post(`${API}/transactions/${userId}`, body, config);

        dispatch({type: SAVE_TRANSACTION, payload: res.data})
    } catch (err) {
        toast.error(err.message)
    }
}

export const getFullRefund = (userId, token, transactionId, amount) => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING, payload: true})

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const body = JSON.stringify({amount});

        const res = await axios.post(`${API}/transactions/${transactionId}/full_refund/${userId}`, body, config)

        toast.success(res.data.message)

        dispatch({type: REFUND_COMPLETED, payload: {transactionId, refund: res.data}})
    } catch (err) {
        toast.error(err)
    }finally{
        dispatch({type: SET_LOADING, payload: false})
    }
}

export const getRefunds = (userId, token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await axios.get(`${API}/refunds/${userId}`, config);

        dispatch({type: GET_REFUNDS, payload: res.data})
    } catch (err) {
        toast.error("Refunds couldn't be fetched")
    }
}

export const getSubscriptions = (userId, token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const res = await axios.get(`${API}/subscriptions/${userId}`, config);

        dispatch({type: GET_SUBSCRIPTIONS, payload: res.data})
    } catch (err) {
        toast.error("Subscriptions couldn't be fetched")
    }
}

export const subscribe = (userId, token, subscriptionDetails) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const body = JSON.stringify({subscriptionDetails})

        const res = await axios.post(`${API}/subscribe/${userId}`, body, config);

        dispatch({type: SUBSCRIBE, payload: res.data})
    } catch (err) {
        toast.error("Couldn't subscribe. Something went wrong!")
    }
}

export const unsubscribe = (userId, token, subscriptionId, reason) => async (dispatch) => {
    try {
        dispatch({type: SET_LOADING, payload: true})

        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const body = JSON.stringify({reason})

        await axios.post(`${API}/subscriptions/${subscriptionId}/${userId}`, body, config);

        dispatch({type: UNSUBSCRIBE, payload: {subscriptionId}})
    } catch (err) {
        toast.error("Couldn't unsubscribe. Something went wrong!")
    }finally{
        dispatch({type: SET_LOADING, payload: false})
    }
}