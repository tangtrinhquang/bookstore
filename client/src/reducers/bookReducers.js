import * as types from '../messages/bookMessages';

export const bookListReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_LIST_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_LIST_SUCCESS:
            return {
                loading: false,
                books: action.payload.data,
                authors: action.payload.dataAuthor,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
            };
        case types.BOOK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookDetailsReducer = (
    state = { book: {} },
    action
) => {
    switch (action.type) {
        case types.BOOK_DETAILS_REQUEST:    
            return { ...state, loading: true };
        case types.BOOK_DETAILS_SUCCESS:
            return { 
                    loading: false, 
                    book: action.payload.data,
                    authors: action.payload.dataAuthor,
                    genres: action.payload.dataGenre,
                    publishers: action.payload.dataPublisher,  
                };
        case types.BOOK_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookNewReleasesReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_RELEASE_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_RELEASE_SUCCESS:
            return { loading: false, books: action.payload };
        case types.BOOK_RELEASE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bookSearchReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case types.BOOK_SEARCH_REQUEST:
            return { loading: true, books: [] };
        case types.BOOK_SEARCH_SUCCESS:
            return { 
                loading: false, 
                books: action.payload.books,
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count, 
            };
        case types.BOOK_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};