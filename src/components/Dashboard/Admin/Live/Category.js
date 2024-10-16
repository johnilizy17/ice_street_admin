import Packages from '@/components/Packages';
import { Box, Center, Flex, Image, Spinner, Switch } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { adminDeleteLivesCategory, adminOnlineLivesCategory } from 'services/admin-services';
import LiveProduct from './Cat/LiveProduct';


export default function Category({ cat, id, fetchGames }) {

    function solution(num) {
        return num % 2 === 0 ? 'Even' : 'Odd'
    }

    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [number, setNumber] = useState(1)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const DeleteCategory = async (id) => {
        try {
            setLoading(true);
            const res = await adminDeleteLivesCategory(id);
            fetchGames()
            setToggle(false)
        } catch (error) {
            console.log(error, "erorr at get all games")
            setLoading(false)
        }
    }

    const OnlineCategory = async (id, state) => {
        try {
            setToggle(true);
            const res = await adminOnlineLivesCategory(id, { status: state });
            fetchGames()
            setToggle(false)
        } catch (error) {
            console.log(error, "erorr at get all games")
            setToggle(false)
        }
    }

    useEffect(() => {

        if (cat.status === 2) {
            setNumber(1)
        } else {
            setNumber(2)
        }
    }, [])

    return (
        <div>
            <Box>
                <Flex alignItems={"center"} mt="20px" justifyContent="space-between" bg={cat.category_id.color} p="10px" borderRadius={"13px"}>
                    <Flex alignItems={"center"}>
                        <Box ml="30px" fontSize={"18px"} fontWeight="800" color={cat.category_id.Header_Color}>
                            {capitalizeFirstLetter(cat.category_id.title)}
                        </Box>
                    </Flex>

                    <Flex>
                        <Center mr="20px" cursor={"pointer"} onClick={() => { Router.push(`/dashboard/admin/live/${cat._id}`) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </Center>
                        <Center cursor={"pointer"} onClick={() => { DeleteCategory(cat._id) }}>
                            {loading ?
                                <Spinner color="red" size="sm" />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                            }                        </Center>
                    </Flex>
                    <Center onClick={() => { OnlineCategory(cat._id, number) }}>
                        {toggle ?
                            <Spinner color="red" size="sm" />
                            :
                            <Switch colorScheme="green" mt="-5px" size='md' isChecked={cat.status === 1 ? false : true} />
                        }   </Center>
                </Flex>
                    <LiveProduct Item={cat.product_id} /> 
            </Box>
        </div>
    )
}