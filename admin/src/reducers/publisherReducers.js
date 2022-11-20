import * as types from '../messages/publisherMessages';

export const publisherListReducer = (state = { publishers: [] }, action) => {
    switch(action.type) {
        case types.PUBLISHER_LIST_REQUEST:
            return { loading: true, publishers: []};
        case types.PUBLISHER_LIST_SUCCESS:
            return {
                loading: false,
                publishers: action.payload.data,
                // pages: action.payload.pages,
                // page: action.payload.page,
                // count: action.payload.count,
            };
        case types.PUBLISHER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const publisherDetailReducer = (
    state = { publisher: {} },
    action
) => {
    switch(action.type) {
        case types.PUBLISHER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.PUBLISHER_DETAILS_SUCCESS:
            return { loading: false, publisher: action.payload };
        case types.PUBLISHER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const publisherDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PUBLISHER_DELETE_REQUEST:
            return { loading: true };
        case types.PUBLISHER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case types.PUBLISHER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

export const publisherCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PUBLISHER_CREATE_REQUEST:
            return { loading: true };
        case types.PUBLISHER_CREATE_SUCCESS:
            return { loading: false, success: true, publisher: action.payload };
        case types.PUBLISHER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.PUBLISHER_CREATE_RESET:
            return {};
        default:
            return state;
    };
};

export const publisherUpdateReducer = (state = { publisher: {} }, action) => {
    switch (action.type) {
        case types.PUBLISHER_UPDATE_REQUEST:
            return { loading: true };
        case types.PUBLISHER_UPDATE_SUCCESS:
            return { loading: false, success: true, publisher: action.payload };
        case types.PUBLISHER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case types.PUBLISHER_UPDATE_RESET:
            return { publisher: {} };
        default:
            return state;
    };   
};