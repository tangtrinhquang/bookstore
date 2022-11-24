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

import AuthorList from '../tabs/Authors/AuthorList';
import AuthorEdit from '../tabs/Authors/AuthorEdit';

import GenreList from '../tabs/Genres/GenreList';
import GenreEdit from '../tabs/Genres/GenreEdit';

import PublisherList from '../tabs/Publishers/PublisherList';
import PublisherEdit from '../tabs/Publishers/PublisherEdit';

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
                        <Route path=":add" element={<BookEdit/>} />
                        <Route path=":id/edit" element={<BookEdit/>} />
                        <Route path="paginate/:pgNumber" element={<BookList/>} />
                    </Route>

                    <Route path='/users'> 
                        <Route index element={<UserList/>}/>
                        <Route path=':id/edit' element={<UserEdit/>} />  
                    </Route> 

                    <Route path='/authors'>
                        <Route index element={<AuthorList/>}/>
                        <Route path=":add" element={<AuthorEdit/>} />
                        <Route path=':id/edit' element={<AuthorEdit/>} />
                        <Route path="paginate/:pgNumber" element={<AuthorList/>} />
                    </Route>

                    <Route path='/genres'>
                        <Route index element={<GenreList/>}/>
                        <Route path=":add" element={<GenreEdit/>} />
                        <Route path=':id/edit' element={<GenreEdit/>} />
                        <Route path=":pgNumber" element={<GenreList/>} />
                    </Route>

                    <Route path='/publishers'>
                        <Route index element={<PublisherList/>}/>
                        <Route path=":add" element={<PublisherEdit/>} />
                        <Route path=':id/edit' element={<PublisherEdit/>} />
                        <Route path=":pgNumber" element={<PublisherList/>} />
                    </Route>

                    {/* <Route path='/orders'>
                        <Route index element={<OrderList/>} />
                        <Route path=':id' element={<Order/>} />
                    </Route>  */}

                    <Route path="/profile" element={<Profile/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </ScrollToTop>
        </>
    );
};