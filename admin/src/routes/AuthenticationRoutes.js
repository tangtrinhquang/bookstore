import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import Login from '../tabs/Authentication/Login';
import Register from '../tabs/Authentication/Register';

export default function AuthenticationRoutes() {
    return (
        <ScrollToTop>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </ScrollToTop>
    );
};