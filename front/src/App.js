import React from 'react';
import {
    ChakraProvider,
    Box
} from '@chakra-ui/react';
import theme from './style/theme';


function App() {
    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">

            </Box>
        </ChakraProvider>
    );
}

export default App;
