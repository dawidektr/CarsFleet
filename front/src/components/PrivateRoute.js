import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {  useSelector } from 'react-redux/es/exports';
import {  getUsersAuthStatus, getUsersLoading } from '../features/users/usersSlice';
import { Box } from '@chakra-ui/react';

const PrivateRoute = () => {
    
    let loading = useSelector(getUsersLoading);
    let isAuth = useSelector(getUsersAuthStatus);

    if(loading === true)
    {
        return <Box>Loading ...</Box>;
    }
   

    return isAuth === true  ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;