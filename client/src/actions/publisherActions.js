import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/publisherMessages';

export const listPublisher = ( pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_LIST_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            }
        };

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/publisher?pageNumber=${pageNumber}`, config
        );

        dispatch({
            type: types.PUBLISHER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.PUBLISHER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createPublisher = (publisher) => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_CREATE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.post(process.env.REACT_APP_API_URL+`/api/publisher`, publisher, config);

        dispatch({
            type: types.PUBLISHER_CREATE_SUCCESS,
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
            type: types.PUBLISHER_CREATE_FAIL,
            payload: message,
        });
    };
};

export const detailPublisher = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_DETAILS_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/publisher/${id}`, config);

        dispatch({
            type: types.PUBLISHER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.PUBLISHER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const updatePublisher = (publisher) => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_UPDATE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.put(
            process.env.REACT_APP_API_URL+`/api/publisher/${publisher.publisher_id}`,
            publisher,
            config
        );

        dispatch({
            type: types.PUBLISHER_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.PUBLISHER_DETAILS_SUCCESS,
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
            type: types.PUBLISHER_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deletePublisher = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_DELETE_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        await axios.delete(process.env.REACT_APP_API_URL+`/api/publisher/${id}`, config);

        dispatch({
            type: types.PUBLISHER_DELETE_SUCCESS,
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
            type: types.PUBLISHER_DELETE_FAIL,
            payload: message,
        });
    };
};