import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/publisherMessages';

export const listPublisher = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.PUBLISHER_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/publishers?keyword=${keyword}&pageNumber=${pageNumber}`
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

export const createPublisher = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PUBLISHER_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/publishers`, {}, config);

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

        const { data } = await axios.get(`/api/publishers/${id}`);

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

export const updatePublisher = (publisher) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PUBLISHER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/publishers/${publisher._id}`,
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

export const deletePublisher = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PUBLISHER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/publishers/${id}`, config);

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