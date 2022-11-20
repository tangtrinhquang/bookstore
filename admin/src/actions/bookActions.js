import axios from 'axios';
import { logout } from '../actions/userActions';
import * as types from '../messages/bookMessages';

export const listBooks = (pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_LIST_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/book?pageNumber=${pageNumber}`,
            config
        );

        const details = await Promise.all(data.data.map((el) => {
                return axios.get(process.env.REACT_APP_API_URL+`/api/author/${el.author_id}`, config)
            })
        )

        const gNames = await Promise.all(data.data.map((el) => {
                return axios.get(process.env.REACT_APP_API_URL+`/api/genre/${el.genre_id}`, config)
            })
        )   

        const pNames = await Promise.all(data.data.map((el) => {
                return axios.get(process.env.REACT_APP_API_URL+`/api/publisher/${el.publisher_id}`, config)
            })
        )

        dispatch({
            type: types.BOOK_LIST_SUCCESS,
            payload: { data, details, gNames, pNames }
        });

    } catch (error) {
        dispatch({
            type: types.BOOK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const detailBook = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/book/${id}`);

        dispatch({
            type: types.BOOK_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    };
};

export const createBook = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.data.access_token}`,
            }
        };

        const { data } = await axios.post(process.env.REACT_APP_API_URL+`/api/book`, {}, config);

        dispatch({
            type: types.BOOK_CREATE_SUCCESS,
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
            type: types.BOOK_CREATE_FAIL,
            payload: message,
        });
    };
};

export const updateBook = (book) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.data.access_token}`,
            },
        };

        const { data } = await axios.put(  //post
        process.env.REACT_APP_API_URL+`/api/book/${book._id}`,
            book,
            config
        );

        dispatch({
            type: types.BOOK_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: types.BOOK_DETAILS_SUCCESS,
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
            type: types.BOOK_UPDATE_FAIL,
            payload: message,
        });
    };
};

export const deleteBook = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.BOOK_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.data.access_token}`,
            },
        };

        await axios.delete(process.env.REACT_APP_API_URL+`/api/book/${id}`, config);

        dispatch({
            type: types.BOOK_DELETE_SUCCESS,
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
            type: types.BOOK_DELETE_FAIL,
            payload: message,
        });
    };
};
