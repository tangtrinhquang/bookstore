import axios from 'axios';
import * as types from '../messages/cartMessages';

export const addToCart = (id, quantity) => async(dispatch, getState) => {

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    const config = {
        headers: {
            Authorization: `Bearer ${userData.data.access_token}`,
        },
    };
    
    const { data } = await axios.get(process.env.REACT_APP_API_URL+`/api/book/${id}`, config);
    console.log(data);

    const newPrice = data.sales ? data.sales : data.data.price;

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            book: data.data.book_id,
            name: data.data.name,
            image: data.data.image,
            price: newPrice,
            countInStock: data.data.countInStock,
            quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: types.CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: types.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};