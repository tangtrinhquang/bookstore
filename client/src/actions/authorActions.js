import axios from 'axios';
import * as types from 'src/messages/authorMessages';

export const listAuthors = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_LIST_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/author?keyword=${keyword}&pageNumber=${pageNumber}`, config
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

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/author/${id}`, config);

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

export const listTopAuthors = () => async (dispatch) => {
    try {
        dispatch({ type: types.AUTHOR_TOP_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/authors/top` , config);

        dispatch({
            type: types.AUTHOR_TOP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.AUTHOR_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}