import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/orderMessages';

export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST,
        });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(`/api/order/${id}`, config);

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        });
    };
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(
            `/api/order/${orderId}/pay`,
            paymentResult,
            config,
        );

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: message,
        });
    };
};

export const deliverOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: types.ORDER_DELIVER_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(
            `/api/order/${order._id}/deliver`,
            {},
            config,
        );

        dispatch({
            type: types.ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_DELIVER_FAIL,
            payload: message,
        });
    };
};

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_LIST_REQUEST,
        });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: types.ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.ORDER_LIST_FAIL,
            payload: message,
        });
    };
};