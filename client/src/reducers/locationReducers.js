import * as types from '../messages/locationMessages';

export const provinceListReducer = (state = { provinces: [] }, action) => {
    switch (action.type) {
        case types.PROVINCE_LIST_REQUEST:
            return { loading: true, provinces: [] };
        case types.PROVINCE_LIST_SUCCESS:
            return {
                loading: false,
                provinces: action.payload.data,
            };
        case types.PROVINCE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const districtListReducer = (state = { districts: [] }, action) => {
    switch (action.type) {
        case types.DISTRICT_LIST_REQUEST:
            return { loading: true, districts: [] };
        case types.DISTRICT_LIST_SUCCESS:
            return {
                loading: false,
                districts: action.payload.data,
            };
        case types.DISTRICT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const wardListReducer = (state = { wards: [] }, action) => {
    switch (action.type) {
        case types.WARD_LIST_REQUEST:
            return { loading: true, wards: [] };
        case types.WARD_LIST_SUCCESS:
            return {
                loading: false,
                wards: action.payload.data,
            };
        case types.WARD_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const calculateFeeReducer = (state = { fees: [] }, action) => {
    switch (action.type) {
        case types.FEE_REQUEST:
            return { loading: true, fees: [] };
        case types.FEE_SUCCESS:
            return {
                loading: false,
                fees: action.payload.data,
            };
        case types.FEE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};