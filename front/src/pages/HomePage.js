import React from "react";
import { Flex, Heading,Button} from "@chakra-ui/react";
import CarsTable from "../features/cars/CarsTable";
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../features/users/usersSlice";
const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <Flex
            width={"100%"}
            flexDirection={"column"}
            flexGrow={1}
            alignItems={"center"}
            alignContent={"center"}
            
        >
            <Heading
                textAlign={"center"}
                mt={4}
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                letterSpacing={"3px"}
                textShadow="2px 2px 5px black"
                fontFamily={"roboto"}
            >
                Zarządzanie flotą samochodów
            </Heading>

            <Link to={'/add'}><Button mt={5} mb={5}>Dodaj samochód</Button></Link>
            <Button onClick={()=>dispatch(logout())}>Wyloguj się</Button>



            <Heading
                textAlign={"center"}
                mt={4}
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                letterSpacing={"3px"}
                textShadow="2px 2px 5px black"
                fontFamily={"roboto"}
            >
               Lista dostępnych samochodów
            </Heading>
            

            <CarsTable/>

        </Flex>
    );
};

export default HomePage;
