import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/authorMessages';

export const listAuthors = ( pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_LIST_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            }
        };

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/author?pageNumber=${pageNumber}`, config
        );

        dispatch({
            type: types.AUTHOR_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailAuthor = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_DETAILS_REQUEST });

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/author/${id}`);

        dispatch({
            type: types.AUTHOR_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createAuthor = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_CREATE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            }
        };

        const { data } = await axios.post(process.env.REACT_APP_API_URL+`/api/author`, {}, config);

        dispatch({
            type: types.AUTHOR_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.AUTHOR_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updateAuthor = (author) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_UPDATE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put( //post
        process.env.REACT_APP_API_URL+`/api/author/${author._id}`,
            author,
            config
        );

        dispatch({
            type: types.AUTHOR_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.AUTHOR_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        };
        dispatch({
            type: types.AUTHOR_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteAuthor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.AUTHOR_DELETE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        await axios.delete(process.env.REACT_APP_API_URL+`/api/author/${id}`, config);

        dispatch({
            type: types.AUTHOR_DELETE_SUCCESS,
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
            type: types.AUTHOR_DELETE_FAIL,
            payload: message,
        });
    };
};