import * as types from '../messages/genreMessages';

export const genreListReducer = (state = { genres: [] }, action) => {
    switch(action.type) {
        case types.GENRE_LIST_REQUEST:
            return { loading: true, genres: []};
        case types.GENRE_LIST_SUCCESS:
            return {
                loading: false,
                genres: action.payload.genres,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
            };
        case types.GENRE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const genreDetailReducer = (
    state = { genre: {} },
    action
) => {
    switch(action.type) {
        case types.GENRE_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.GENRE_DETAILS_SUCCESS:
            return { loading: false, genre: action.payload };
        case types.GENRE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const genreDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.GENRE_DELETE_REQUEST:
            return { loading: true };
        case types.GENRE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.GENRE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const genreCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.GENRE_CREATE_REQUEST:
            return { loading: true };
        case types.GENRE_CREATE_SUCCESS:
            return { loading: false, success: true, genre: action.payload };
        case types.GENRE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.GENRE_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const genreUpdateReducer = (state = { genre: {} }, action) => {
    switch (action.type) {
        case types.GENRE_UPDATE_REQUEST:
            return { loading: true };
        case types.GENRE_UPDATE_SUCCESS:
            return { loading: false, success: true, genre: action.payload };
        case types.GENRE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.GENRE_UPDATE_RESET:
            return { genre: {} };
        default:
            return state;
    };   
};