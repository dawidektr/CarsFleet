import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
import {   auth, login, register } from '../features/users/usersSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();

    // const navigate = useNavigate();
    // const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            rpassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(4, 'Imię za krótkie, co najmniej 4 znaki')
                .max(50, 'Maksymalnie 50 znaków')
                .required('Wpisz imię'),
            surname: Yup.string()
                .min(6, 'Nazwisko za krótkie, co najmniej 4 znaki')
                .max(50, 'Maksymalnie 50 znaków')
                .required('Wymagane nazwisko'),
            email: Yup.string()
                .min(6, 'Login za krótki, co najmniej 6 znaków')
                .max(255, 'Maksymalnie 255 znaków')
                .required('Wpisz email')
                .email("Wpisz email"),
            password: Yup.string()
                .max(50, 'Maksymalnie 50 znaków')
                .min(6, 'Hasło za krótkie, co najmniej 6 znaków')
                .required('Wymagane hasło')
                .matches(/^(?=.*[A-Z])/,"Hasło musi zawierać co najmniej 1 dużą literę")
                .matches(  /^(?=.*[!@#\\$%\\^&\\*])/,"Hasło musi zawierać co najmniej 1 znak specjalny")
                .matches(/^(?=.{6,20}$)\D*\d/, "Hasło musi zawierać co najmniej 1 cyfrę"),
            rpassword: Yup.string()
                .required('Wymagane hasło')
                .oneOf([Yup.ref('password')], 'Hasła się nie zgadzają'),
        }),
        onSubmit: async values => {
            try {
                const  userData = {
                    name:values.name,
                    surname:values.surname,
                    email:values.email,
                    password:values.password
                };
                
        
                await dispatch(register(userData)).unwrap();
                await dispatch(login(userData)).unwrap();
                await dispatch(auth()).unwrap();
                  
            } catch (err) {
                console.error("Błąd dodawania", err);
            } 
        },
    });

    return (
        <Box flexGrow={1}>
            <Text fontSize={'3xl'} textAlign={'center'} mt={5}>
        Rejestracja
            </Text>
            <Box width={'400px'} margin={'0 auto'} mt={5}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            name
                        </FormLabel>
                        <Input
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder="Wpisz imię"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <Text color={'red'} textAlign={'center'}>
                                {formik.errors.name}
                            </Text>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            surname
                        </FormLabel>
                        <Input
                            id="surname"
                            name="surname"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.surname}
                            placeholder="Wpisz nazwisko"
                        />
                        {formik.touched.surname && formik.errors.surname ? (
                            <Text color={'red'} textAlign={'center'}>
                                {formik.errors.surname}
                            </Text>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Email
                        </FormLabel>
                        <Input
                            type={'email'}
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Wpisz email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text color={'red'} textAlign={'center'}>
                                {formik.errors.email}
                            </Text>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Hasło
                        </FormLabel>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Wpisz hasło"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Text color={'red'} textAlign={'center'}>
                                {formik.errors.password}
                            </Text>
                        ) : null}
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Powtórz hasło
                        </FormLabel>
                        <Input
                            type="password"
                            id="rpassword"
                            name="rpassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rpassword}
                            placeholder="Wpisz hasło"
                        />
                        {formik.touched.rpassword && formik.errors.rpassword ? (
                            <Text color={'red'} textAlign={'center'}>
                                {formik.errors.rpassword}
                            </Text>
                        ) : null}
                    </FormControl>
                    <Box textAlign={'center'} mt={5}>
                        <Button type="submit" colorScheme="blue">
              Zajerestruj się
                        </Button>
                    </Box>
                </form>
                {/* {error && (
                    <Text color={'red'} textAlign="center" fontSize={'2xl'}>
                        {error}
                    </Text>
                )} */}
            </Box>
        </Box>
    );
};

export default RegisterPage;