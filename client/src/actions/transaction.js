import axios from 'axios'
import {toast} from 'react-toastify'
import {API} from '../config'
import {GET_TRANSACTIONS, SAVE_TRANSACTION} from "../actionTypes/transaction"

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
        console.log(transactionDetails)
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