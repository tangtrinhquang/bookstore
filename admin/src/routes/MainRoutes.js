import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'
import Dashboard from '../tabs/Dashboard/Dashboard';
import BookList from '../tabs/Books/BookList';
import BookEdit from '../tabs/Books/BookEdit';
import Profile from '../tabs/OtherSettings/Profile';
import NotFound from '../tabs/OtherSettings/404';

export default function MainRoutes() {
    return (
        <>
            <ScrollToTop>
                <Routes>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/books" component={BookList} />
                    <Route path="/books/:id/edit" component={BookEdit} />
                    <Route path="/books/:pageNumber" component={BookList} />
                    <Route path="/profile" component={Profile} />
                    <Route path="*" component={NotFound} />
                </Routes>
            </ScrollToTop>
        </>
    );
};