import axios from 'axios';
import * as types from '../messages/userMessages';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

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
    localStorage.removeItem('userInfo');
    dispatch({ type: types.USER_LOGOUT });
    dispatch({ type: types.USER_DETAILS_RESET });
    dispatch({ type: types.USER_LIST_RESET });
    document.location.href = '/login';
};

export const register = (name, email, password, phone, address) => async (dispatch) => {
    try {
        dispatch({
            type: types.USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            process.env.REACT_APP_API_URL+`/api/auth/register`,
            { name, email, password, phone, address },
            config
        );

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_DETAILS_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/user/${id}`, config);

        dispatch({
            type: types.USER_DETAILS_SUCCESS,
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
            type: types.USER_DETAILS_FAIL,
            payload: message,
        });
    };
};

export const updateUserProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(process.env.REACT_APP_API_URL+`/api/user/${user.user_id}`, user, config);

        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    };
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: types.USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/user`, config);

        dispatch({
            type: types.USER_LIST_SUCCESS,
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
            type: types.USER_LIST_FAIL,
            payload: message,
        });
    };
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_DELETE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        await axios.delete(process.env.REACT_APP_API_URL+`/api/user/${id}`, config);

        dispatch({ type: types.USER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_DELETE_FAIL,
            payload: message,
        });
    };
};

export const updateUser = (user) => async (dispatch) => {
    console.log(user);
    try {
        dispatch({ type: types.USER_UPDATE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(process.env.REACT_APP_API_URL+`/api/user/${user.user_id}`, user, config);

        dispatch({ type: types.USER_UPDATE_SUCCESS });

        dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });

        dispatch({ type: types.USER_DETAILS_RESET });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.USER_UPDATE_FAIL,
            payload: message,
        });
    };
};