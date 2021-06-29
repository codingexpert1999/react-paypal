import {toast} from 'react-toastify'
import axios from 'axios'
import { API } from '../config'
import { LOAD_USER, LOGIN, LOG_OUT, REGISTER } from '../actionTypes/user'

export const register = (firstName, lastName, email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const body = JSON.stringify({firstName, lastName, email, password})

        const res = await axios.post(`${API}/user/register`, body, config);

        localStorage.setItem('user', JSON.stringify(res.data))

        dispatch({type: REGISTER, payload: res.data})
    } catch (err) {
        if(err.response.data.errors){
            toast.error(err.response.data.errors[0].msg)
        }else{
            toast.error(err.response.data.error)
        }
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const body = JSON.stringify({email, password})

        const res = await axios.post(`${API}/user/login`, body, config);

        localStorage.setItem('user', JSON.stringify(res.data))

        dispatch({type: LOGIN, payload: res.data})
    } catch (err) {
        if(err.response.data.errors){
            toast.error(err.response.data.errors[0].msg)
        }else{
            toast.error(err.response.data.error)
        }
    }
}

export const loadUser = () => {
    let user = localStorage.getItem('user');

    if(user){
        return {type: LOAD_USER, payload: JSON.parse(user)}
    }else{
        return {type: 'CANNOT_LOAD_USER'}
    }
}

export const logOut = () => {
    localStorage.removeItem('user')

    return {
        type: LOG_OUT
    }
}