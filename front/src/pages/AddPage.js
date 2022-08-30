import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";

import {
    Box,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { addNewCar, fetchCars } from '../features/cars/carsSlice';
import Form from '../components/Form';

const AddPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todayDate = new Date().toISOString().slice(0, 10);
    

    const formik = useFormik({
        initialValues: {
            mark: '',
            model: '',
            year: '',
            launchDate: '',
            mileage: '',
        },
        validationSchema: Yup.object({
            mark: Yup.string()
                .required('Wpisz markę samochodu'),
            model: Yup.string()
                .required('Wpisz model samochodu'),
            year: Yup.number()
                .required('Wpisz rocznik produkcji samochodu')
                .positive("Wpisz tylko liczby dodatnie")
                .min(1900,"Co najmniej rok 1900"),
            launchDate: Yup.date()
                .required('Wpisz datę włączenia samochodu do firmy')
                .min('01-01-1970',"Co najmniej 1970 rok")
                .max(`${todayDate}`,"Maksymalnie dzisiejszy dzień"),           
            mileage: Yup.number()
                .required('Podaj przebieg')
                .positive('Liczba musi być dodatnia')
                .min(0)
        }),
        onSubmit: async values => {
            try {
                const  carData = {
                    mark:values.mark,
                    model:values.model,
                    year:values.year,
                    launchDate:values.launchDate,
                    mileage:values.mileage
                };
                
        
                await dispatch(addNewCar(carData)).unwrap();
                await dispatch(fetchCars()).unwrap(); 
                navigate(`/`, { replace: true });
               
                  
            } catch (err) {
                console.error("Błąd dodawania", err);
            } 
        },
    });

    return (
        <Box flexGrow={1}>
            <Text fontSize={'3xl'} textAlign={'center'} mt={5}>
        Dodaj samochód
            </Text>
            <Form formik={formik} />
        </Box>
    );
};

export default AddPage;