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
});

export default reducer;