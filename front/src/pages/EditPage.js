import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector } from "react-redux";

import {
    Box,
    Text,
} from '@chakra-ui/react';
import { useParams,useNavigate } from 'react-router-dom';

import {  fetchCars, selectCarById, updateCar } from '../features/cars/carsSlice';
import Form from '../components/Form';

const EditPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { id } = useParams();
    
    const todayDate = new Date().toISOString().slice(0, 10);

    const car = useSelector((state) => selectCarById(state, Number(id)));

    const formik = useFormik({
        initialValues: {
            mark: car.mark || '' ,
            model: car.model || '',
            year: car.year ||'',
            launchDate: car.launchDate || '',
            mileage: car.mileage || '',
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
                    id:id,
                    mark:values.mark,
                    model:values.model,
                    year:values.year,
                    launchDate:values.launchDate,
                    mileage:values.mileage
                };
                
        
                await dispatch(updateCar(carData)).unwrap();
                await dispatch(fetchCars()).unwrap(); 
               
                navigate(`/`, { replace: true });
                  
            } catch (err) {
                setError(err.message);
            } 
        },
    });

    return (
        <Box flexGrow={1}>
            <Text fontSize={'3xl'} textAlign={'center'} mt={5}>
        Edytuj samochód
            </Text>
            <Form formik={formik} />
            {error && (
                <Text color={'red'} textAlign="center" fontSize={'2xl'}>
                    {error}
                </Text>
            )}
        </Box>
    );
};

export default EditPage;