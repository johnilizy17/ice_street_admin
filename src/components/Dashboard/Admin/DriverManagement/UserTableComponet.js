import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import {
    Box, Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, Button, useToast,
} from "@chakra-ui/react"

import moment from "moment";

import { IoIosCheckmarkCircle } from 'react-icons/io'
import { adminDeleteCategories } from 'services/admin-services';


function UserTableComponent({ drivers, fetchDriversadminGetAllDrivers }) {


    const toast = useToast();
    const router = useRouter();

    const [pageNumber, setPageNumber] = useState(1);



    const deleteCategories = async (values) => {


        try {
            const data = await adminDeleteCategories(values);
            await fetchDriversadminGetAllDrivers(10)
            toast({
                position: "top-right",
                description: "The categories is successfully deleted",
                status: "success",
                isClosable: true
            });
        } catch (error) {
            toast({
                position: "top-right",
                title: "Category failed to delete",
                description: "",
                status: "error",
                isClosable: true
            });
        }
    };



    return (
        <>
            <Box w="100%" overflowX="scroll">
                <Table variant="simple" maxW="100%" overflowX="hidden">
                    <Thead bg="gray.100">
                        <Tr>
                            <Th fontSize={["8px", "12px"]}>s/n</Th>
                            <Th fontSize={["8px", "12px"]}>ID</Th>
                            <Th fontSize={["8px", "12px"]}>Name</Th>
                            <Th fontSize={["8px", "12px"]}>email</Th>

                            <Th fontSize={["8px", "12px"]}>Phone number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {drivers?.map((driver, index) => (

                            <Tr
                                key={index}
                                bg={index % 2 ? "gray.50" : "white"}
                                cursor="pointer"
                                onClick={() =>
                                    router.push(
                                        `/dashboard/admin/user/${driver._id}`)
                                }
                            >
                                <Td fontSize={["10px", "14px"]}>
                                    {index+1}
                                </Td>
                                <Td fontSize={["10px", "14px"]}>{driver._id}</Td>
                                <Td fontSize={["10px", "14px"]} color="green" >{driver.lastname}, {driver.firstname}</Td>
                                <Td fontSize={["10px", "14px"]}>{driver.email}</Td>
                                <Td fontSize={["10px", "14px"]} color="green" >{driver.phone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}


export default UserTableComponent
