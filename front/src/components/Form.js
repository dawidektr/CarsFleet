import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
const Form = ({formik}) => {
    return (
        <Box width={'400px'} margin={'0 auto'} mt={5}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Marka
                    </FormLabel>
                    <Input
                        id="mark"
                        name="mark"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mark}
                        placeholder="Wpisz markę samochodu"
                    />
                    {formik.touched.mark && formik.errors.mark ? (
                        <Text color={'red'} textAlign={'center'}>
                            {formik.errors.mark}
                        </Text>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Model
                    </FormLabel>
                    <Input
                        id="model"
                        name="model"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.model}
                        placeholder="Wpisz model samochodu"
                    />
                    {formik.touched.model && formik.errors.model ? (
                        <Text color={'red'} textAlign={'center'}>
                            {formik.errors.model}
                        </Text>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Rok produkcji
                    </FormLabel>
                    <Input
                        type={'number'}
                        id="year"
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                        placeholder="Wpisz rok produkcji"
                    />
                    {formik.touched.year && formik.errors.year ? (
                        <Text color={'red'} textAlign={'center'}>
                            {formik.errors.year}
                        </Text>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Data włączenia do firmy
                    </FormLabel>
                    <Input
                        type={'date'}
                        id="launchDate"
                        name="launchDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.launchDate}
                        placeholder="Wpisz datę włączenia do firmy"
                    />
                    {formik.touched.launchDate && formik.errors.launchDate ? (
                        <Text color={'red'} textAlign={'center'}>
                            {formik.errors.launchDate}
                        </Text>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={'2xl'} textAlign={'center'}>
                        Przebieg
                    </FormLabel>
                    <Input
                        type="number"
                        id="mileage"
                        name="mileage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mileage}
                        placeholder="Wpisz przebieg"
                    />
                    {formik.touched.mileage && formik.errors.mileage ? (
                        <Text color={'red'} textAlign={'center'}>
                            {formik.errors.mileage}
                        </Text>
                    ) : null}
                </FormControl>
                <Box textAlign={'center'} mt={5}>
                    <Button type="submit" colorScheme="blue">
                            Wyślij
                    </Button>
                </Box>
            </form>
                
        </Box>
    );
};

export default Form;