import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/bookMessages';

export const listBooks = (
    pageNumber = '', 
    sort = '',
) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_LIST_REQUEST });

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/book/paginate/12?page=${pageNumber}&sort=${sort}`
        );

        const authors = await axios.get(process.env.REACT_APP_API_URL+`/api/author`);

        const dataAuthor = authors.data.data;

        dispatch({
            type: types.BOOK_LIST_SUCCESS,
            payload: { data, dataAuthor }
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailBook = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/book/${id}`);

        const authors = await axios.get(process.env.REACT_APP_API_URL+`/api/author`);

        const genres = await axios.get(process.env.REACT_APP_API_URL+`/api/genre`);

        const publishers = await axios.get(process.env.REACT_APP_API_URL+`/api/publisher`);

        const dataAuthor = authors.data.data;
        const dataGenre = genres.data.data;
        const dataPublisher = publishers.data.data;

        dispatch({
            type: types.BOOK_DETAILS_SUCCESS,
            payload: { data, dataAuthor, dataGenre, dataPublisher },
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const searchBooks = (
    keyword = '', 
    genres = '',
    priceTop,
    priceBottom,
    pageNumber = '', 
) => async (dispatch) => {
    try {
        dispatch({ type: types.BOOK_SEARCH_REQUEST });

        const { data } = await axios.get(
            process.env.REACT_APP_API_URL+`/api/book/search?keyword=${keyword}&genres=${genres}&bottom=${priceBottom}&top=${priceTop}&pageNumber=${pageNumber}`
        );

        dispatch({
            type: types.BOOK_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.BOOK_SEARCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};