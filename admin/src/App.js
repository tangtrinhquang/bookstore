import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from './routes/MainRoutes';
import AuthRoutes from './routes/AuthenticationRoutes';

function App() {
    return (
        <Router>
            <AuthRoutes />
            <MainRoutes />
        </Router>
    );
}

export default App;