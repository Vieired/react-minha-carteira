import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GlobalStyles from './styles/GlobalStyles';

import { useTheme } from './hooks/theme';

import Routes from './routes';

const App: React.FC = () => {
    const { theme } = useTheme();
    // console.log("NODE_ENV: ", process.env.NODE_ENV);
    // console.log("REACT_GOOGLE_APP_CLIENT_ID: ", process.env.REACT_GOOGLE_APP_CLIENT_ID);

    return (
        <GoogleOAuthProvider
            clientId={process?.env?.REACT_GOOGLE_APP_CLIENT_ID || ''}
        >
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <ToastContainer
                    theme="colored"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    role="alert" // para acessibilidade
                />
                <Routes />
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;