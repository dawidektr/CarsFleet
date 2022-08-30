import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useNavigate} from 'react-router-dom';
import { auth, login } from '../features/users/usersSlice';


  
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try {
            const  userData = {
                email:email,
                password:password
            };

            await dispatch(login(userData)).unwrap();
            await dispatch(auth()).unwrap();
            
            navigate(`/`, { replace: true });
        } catch (err) {
            setError(err.message);
        } 

    };
  
   
    return (
        <Box flexGrow={1}>
            <Text fontSize={'2xl'} textAlign={'center'} marginTop={5}>
          Musisz się zalogować by przejść dalej
            </Text>
            <Box w={'400px'} margin={'0 auto'} marginTop={8}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Login
                        </FormLabel>
                        <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Wpisz email"
                        />
                    </FormControl>
                    <FormControl mt={5}>
                        <FormLabel fontSize={'2xl'} textAlign={'center'}>
                            Hasło
                        </FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Wpisz hasło"
                        />
                    </FormControl>
                    <Box textAlign={'center'} mt={5}>
                        <Button type="submit" colorScheme="blue">
                            Zaloguj się
                        </Button>
                    </Box>
                </form>
            </Box>
  
            <Text textAlign={'center'} fontSize={'2xl'} mt={5}>
                    Jeśli nie posiadasz jeszcze konta{' '}
            </Text>
            <Box textAlign={'center'} mt={5}>
                <Link to="/register">
                    <Button colorScheme="blue">Zarejestruj się</Button>
                </Link>
            </Box>
            {error && (
                <Text color={'red'} textAlign="center" fontSize={'2xl'}>
                    {error}
                </Text>
            )}
        </Box>
    );
};
  
export default Login;