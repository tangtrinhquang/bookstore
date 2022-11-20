import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/genreMessages';

export const listGenres = (pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.GENRE_LIST_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            }
        };

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/genre?pageNumber=${pageNumber}`, config
        );

        dispatch({
            type: types.GENRE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GENRE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createGenre = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.GENRE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const { data } = await axios.post(process.env.REACT_APP_API_URL+`/api/genres`, {}, config);

        dispatch({
            type: types.GENRE_CREATE_SUCCESS,
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
            type: types.GENRE_CREATE_FAIL,
            payload: message,
        });
    };
};

export const detailGenre = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.GENRE_DETAILS_REQUEST });

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/genres/${id}`);

        dispatch({
            type: types.GENRE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GENRE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const updateGenre = (genre) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.GENRE_UPDATE_REQUEST });

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
            process.env.REACT_APP_API_URL+`/api/genres/${genre._id}`,
            genre,
            config
        );

        dispatch({
            type: types.GENRE_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.GENRE_DETAILS_SUCCESS,
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
            type: types.GENRE_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteGenre = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.GENRE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(process.env.REACT_APP_API_URL+`/api/genres/${id}`, config);

        dispatch({
            type: types.GENRE_DELETE_SUCCESS,
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
            type: types.GENRE_DELETE_FAIL,
            payload: message,
        });
    };
};