import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./App/store";
import { BrowserRouter } from 'react-router-dom';
import { fetchCars } from './features/cars/carsSlice';
import { auth } from './features/users/usersSlice';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

store.dispatch(fetchCars());
store.dispatch(auth());
root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App fontFamily={"roboto"} />              
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

