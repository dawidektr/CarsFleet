import React from 'react';
import {
    ChakraProvider,
    Flex
} from '@chakra-ui/react';

import theme from './style/theme';
import Header from './Layouts/Header';
import Page from './Layouts/Page';
import Footer from './Layouts/Footer';

function App() {

    return (
        <ChakraProvider theme={theme}>
            <Flex textAlign="center" fontSize="xl" minH={'100vh'} flexDirection={'column'}>
                <Header />
                <Page />
                <Footer />
            </Flex>
        </ChakraProvider>
    );
}

export default App;
