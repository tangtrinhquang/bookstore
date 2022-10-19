import { configureStore } from 'redux';
import reducer from './reducers/combineReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const storage = configureStore(
    reducer,
    initialState,
);

export default storage;