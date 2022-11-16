import { combineReducers } from 'redux';

import {
    bookListReducer,
    bookDetailsReducer,
    bookCreateReducer,
    bookUpdateReducer,
    bookDeleteReducer,
} from './bookReducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateProfileReducer,
    userListReducer,
    userUpdateReducer,
    userDeleteReducer,
} from './userReducers';

import { 
    authorListReducer,
    authorDetailReducer,
    authorCreateReducer,
    authorDeleteReducer,
    authorUpdateReducer,
} from './authorReducers'

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

// import {
//     orderDetailReducer,
//     orderPayReducer,
//     orderDeliverReducer,
//     orderListReducer,
// } from './orderReducers';

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetail: bookDetailsReducer,
    bookCreate: bookCreateReducer,
    bookUpdate: bookUpdateReducer,
    bookDelete: bookDeleteReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    authorList: authorListReducer,
    authorDetail: authorDetailReducer,
    authorCreate: authorCreateReducer,
    authorDelete: authorDeleteReducer,
    authorUpdate: authorUpdateReducer,

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

    // orderDetail: orderDetailReducer,
    // orderPay: orderPayReducer,
    // orderDeliver: orderDeliverReducer,
    // orderList: orderListReducer,
});

export default reducer;