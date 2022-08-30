import React from "react";
import { Routes,Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from '../components/PrivateRoute';
import RegisterPage from "../pages/RegisterPage";
import AddPage from "../pages/AddPage";
import EditPage from "../pages/EditPage";

const Page = () => {
    return (
        <Routes>
            <Route path='/' element={<PrivateRoute/>}  >
                <Route path="/" exact  element={<HomePage />}/>
                <Route path="/add" exact  element={<AddPage />}/>
                <Route path="/edit/:id" exact  element={<EditPage />}/>
            </Route>


            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    );
};

export default Page;
