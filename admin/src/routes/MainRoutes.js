import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import Dashboard from '../tabs/Dashboard/Dashboard';
import Login from '../tabs/Authentication/Login';
import Register from '../tabs/Authentication/Register';

import BookList from '../tabs/Books/BookList';
import BookEdit from '../tabs/Books/BookEdit';

import UserList from '../tabs/Users/UserList';
import UserEdit from '../tabs/Users/UserEdit';

import OrderList from '../tabs/Orders/OrderList';
import OrderDTL from '../tabs/Orders/Order';

import Profile from '../tabs/OtherSettings/Profile';
import NotFound from '../tabs/OtherSettings/404';

export default function MainRoutes() {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />

                    <Route path="/books">
                        <Route index element={<BookList/>} />
                        <Route path=":id/edit" element={<BookEdit/>} />
                        <Route path=":pageNumber" element={<BookList/>} />
                    </Route>

                    <Route path='/users'> 
                        <Route index element={<UserList/>}/>
                        <Route path=':id/edit' element={<UserEdit/>} />  
                    </Route> 

                    <Route path='/authors'></Route>

                    <Route path='/orders'>
                        <Route index element={<OrderList/>} />
                        <Route path=':id' element={<OrderDTL/>} />
                    </Route> 

                    <Route path="/profile" element={<Profile/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </ScrollToTop>
        </>
    );
};