import axios from 'axios'
import * as types from '../messages/userMessages'
import { ORDER_LIST_MY_RESET } from '../messages/orderMessages'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        console.log(process.env.REACT_APP_API_URL);

        const { data } = await axios.post(
            process.env.REACT_APP_API_URL+`/api/auth/login`,
            { email, password },
            config,
        );

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        document.location.href = '/';
    } catch (error) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: types.USER_LOGOUT })
    dispatch({ type: types.USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/login'
}

export const register = (name, email, password, phone, address, province, district, ward) => async (dispatch) => {
    try {
        dispatch({
            type: types.USER_REGISTER_REQUEST,
        })

        const { data } = await axios.post(
            process.env.REACT_APP_API_URL+`/api/auth/register`,
            { name: name, email: email, password: password, phone: phone, address: address, province_id: province, district_id: district, ward_id: ward }
        )

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_DETAILS_REQUEST })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/user/${id}`, config)

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
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
            type: types.USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST })

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(process.env.REACT_APP_API_URL+`/api/user/${user.user_id}`, user, config)

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}