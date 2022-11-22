import { combineReducers } from 'redux';

import { 
    bookListReducer,
    bookDetailsReducer,
    bookNewReleasesReducer,
    bookSearchReducer,
} from './bookReducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
} from './userReducers';

import {
    orderCreateReducer,
    orderDetailReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
} from './orderReducers';

import {
    authorListReducer,
    authorDetailReducer,
    authorTopReducer
} from './authorReducers';

import { 
    genreListReducer,
    genreDetailReducer,
    genreCreateReducer,
    genreDeleteReducer,
    genreUpdateReducer,
} from './genreReducers'

import { 
    publisherListReducer,
    publisherDetailReducer,
    publisherCreateReducer,
    publisherDeleteReducer,
    publisherUpdateReducer,
} from './publisherReducers'    

import { cartReducer } from './cartReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetail: bookDetailsReducer,
    bookNewReleases: bookNewReleasesReducer,
    bookSearch: bookSearchReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,

    authorList: authorListReducer,
    authorDetail: authorDetailReducer,
    authorTop: authorTopReducer,

    genreList: genreListReducer,
    genreDetail: genreDetailReducer,
    genreCreate: genreCreateReducer,
    genreDelete: genreDeleteReducer,
    genreUpdate: genreUpdateReducer,

    publisherList: publisherListReducer,
    publisherDetail: publisherDetailReducer,
    publisherCreate: publisherCreateReducer,
    publisherDelete: publisherDeleteReducer,
    publisherUpdate: publisherUpdateReducer,
});

export default reducer;