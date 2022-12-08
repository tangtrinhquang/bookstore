import axios from 'axios';
import { logout } from './userActions';
import * as types from '../messages/orderMessages';

export const getOrderDetail = (id, userId) => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_DETAILS_REQUEST,
        });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/order/${id}`, config);

        const books = await axios.get(process.env.REACT_APP_API_URL+`/api/book`, config);

        const user = await axios.get(process.env.REACT_APP_API_URL+`/api/user/${userId}` , config);

        dispatch({
            type: types.ORDER_DETAILS_SUCCESS,
            payload: {data, books, user}
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
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        });
    };
};

export const payOrder = (orderId, paymentResult, toName, toPhone, toAddress, toWard, toDist, toProvince ) => async (dispatch) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const token = {
            headers: {
                token: process.env.REACT_APP_API_KEY,
            },
        };

        const order_items = await axios.get(process.env.REACT_APP_API_URL+`/api/orderdetail/${orderId}`, config);
        const items = order_items.data.data.map(item => {
            return {
              "book_id": item.book_id,
              "name": item.name,
              "quantity": item.quantity,
              "weight": item.weight
            }
          })

        const totalWeight = items.reduce((sum, item) => sum + item.weight*1.0, 0)

        const body = {
            "payment_type_id": 2,
            "note": "Giao hàng cẩn thận !",
            "from_name": "TANDYM BOOKSHOP",
            "from_phone": "0902375381",
            "from_address": "273 An Dương Vương",
            "from_ward_name": "Phường 3",
            "from_district_name": "Quận 5",
            "from_province_name": "TP Hồ Chí Minh",
            "required_note": "CHOXEMHANGKHONGTHU",
            "return_name": "TANDYM BOOKSHOP",
            "return_phone": "0902375381",
            "return_address": "273 An Dương Vương",
            "return_ward_name": "Phường 3",
            "return_district_name": "Quận 5",
            "return_province_name": "TP Hồ Chí Minh",
            "client_order_code": null,
            "to_name": toName,
            "to_phone": toPhone,
            "to_address": toAddress,
            "to_ward_name": toWard,
            "to_district_name": toDist,
            "to_province_name": toProvince,
            "cod_amount": 0,
            "content": null,
            "weight": totalWeight,
            "length": 20,
            "width": 15,
            "height": 10,
            "pick_station_id": null,
            "deliver_station_id": null,
            "insurance_value": 150000,
            "service_type_id": 2,
            "coupon": null,
            "pick_shift": null,
            "pickup_time": null,
            "items": items,
        }

        const { data } = await axios.post(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create`,  
            body,
            token
        );


        const update = await axios.put(process.env.REACT_APP_API_URL+`/api/order/${orderId}`, { status: "Processed"}, config);

        dispatch({
            type: types.ORDER_PAY_SUCCESS,
            payload: data
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
            type: types.ORDER_PAY_FAIL,
            payload: message,
        });
    };
};

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: types.ORDER_LIST_REQUEST,
        });

        const userData = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.access_token}`,
            },
        };

        const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/order`, config);

        dispatch({
            type: types.ORDER_LIST_SUCCESS,
            payload: data,
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
            type: types.ORDER_LIST_FAIL,
            payload: message,
        });
    };
};