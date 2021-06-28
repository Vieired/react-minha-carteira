import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './app.routes';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Routes;