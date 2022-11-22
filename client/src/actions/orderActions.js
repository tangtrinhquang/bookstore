import axios from 'axios'
import { logout } from './userActions'
import * as types from '../messages/orderMessages'
import { CART_CLEAR_ITEMS } from '../messages/cartMessages'

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_CREATE_REQUEST,
        })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.post(process.env.REACT_APP_API_URL+`/api/order`, order, config)

        dispatch({
            type: types.ORDER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })

        localStorage.removeItem('cartItems')
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST,
        })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/order/${id}`, config)

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(
            process.env.REACT_APP_API_URL+`/api/order/${orderId}/pay`,
            paymentResult,
            config,
        )

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const deliverOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: types.ORDER_DELIVER_REQUEST })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(
            process.env.REACT_APP_API_URL+`/api/order/${order._id}/deliver`,
            {},
            config,
        )

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: message,
        })
    }
}

export const listMyOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_LIST_MY_REQUEST,
        })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/order/my_orders`, config)

        dispatch({
            type: types.ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}