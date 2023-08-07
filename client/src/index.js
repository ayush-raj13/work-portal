import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as AuthTokenProvider } from '../src/context/authToken'
import { store } from './store';
import App from './App';
import { NavigationProvider } from './context/navigation';
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <AuthTokenProvider>
            <StoreProvider store={store}>
                <NavigationProvider>
                    <App />
                </NavigationProvider>
            </StoreProvider>
        </AuthTokenProvider>
    </CookiesProvider>
);
