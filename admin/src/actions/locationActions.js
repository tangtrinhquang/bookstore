import axios from 'axios';
import * as types from '../messages/locationMessages';

export const listProvinces = () => async(dispatch) => {
    try{
        dispatch({ type: types.PROVINCE_LIST_REQUEST });

        const config = {
            headers: {
                token: process.env.REACT_APP_API_KEY,
            },
        };

        const { data } = await axios.get(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, config
        );

        dispatch({
            type: types.PROVINCE_LIST_SUCCESS,
            payload: data,
        });
    }catch (error) {
        dispatch({
            type: types.PROVINCE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listDistricts = (provinceId) => async(dispatch) => {
    try{
        dispatch({ type: types.DISTRICT_LIST_REQUEST });

        const config = {
            headers: {
                token: process.env.REACT_APP_API_KEY,
            },
        };

        const { data } = await axios.get(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, config
        );

        dispatch({
            type: types.DISTRICT_LIST_SUCCESS,
            payload: data,
        });
    }catch (error) {
        dispatch({
            type: types.DISTRICT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listWards = (districtId) => async(dispatch) => {
    try{
        dispatch({ type: types.WARD_LIST_REQUEST });

        const config = {
            headers: {
                token: process.env.REACT_APP_API_KEY,
            },
        };

        const { data } = await axios.get(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,  config
        );

        dispatch({
            type: types.WARD_LIST_SUCCESS,
            payload: data,
        });
    }catch (error) {
        dispatch({
            type: types.WARD_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};