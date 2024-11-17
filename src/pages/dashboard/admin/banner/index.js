import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    Spinner,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Select,
    ButtonGroup,
    IconButton,
    Switch
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers, adminGetBanner, adminUpdateProductStatus, admimDeleteBanner } from "services/admin-services";
import { FaFacebook } from 'react-icons/fa'
import { BiMenuAltLeft } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { MdPrint } from 'react-icons/md'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { cashFormat } from "@/components/cashFormat";
import ReactPaginate from "react-paginate";
import { ImagePath } from "services/Variable";


function DriverManagement() {
    const router = useRouter();
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState()
    const [page, setPage] = useState(10)
    const fetchDriversadminGetAllDrivers = async (e, s) => {
        try {
            setLoading(true);
            const data = await adminGetBanner();
            console.log(data, "data")
            setDrivers(data.data);

            setLoading(false);
        } catch (error) {
            setDrivers([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDriversadminGetAllDrivers(10);
    }, []);

    if (loading) {
        return (
            <Center h="full" w="full" mt="8">
                <Spinner color="red" size="xl" />
            </Center>
        )
    }

    const changePage = ({ selected }) => {
        setPage(selected)
        fetchDriversadminGetAllDrivers((selected + 1) * 10, search);
    }

    const DeleteProduct = async (e) => {
        try {
            setLoading(true);
            const deleting = await admimDeleteBanner(e);
            const data = await adminGetBanner(page, search);

            setDrivers(data.data);

            setLoading(false);
        } catch (error) {
            setDrivers([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box w="100%">
            <Flex
                p={["4", "4", "8", "10"]}
                rounded="lg"
                overflow="hidden"
                bgImage="/infographics/bg/admin-summary-bg.jpg"
                bgRepeat="no-repeat"
                bgSize="cover"
                color="white"
                align="center"
                justify="space-between"
            >
                <Box>
                    <Heading fontSize={["lg", "2xl"]}>Banner Management</Heading>
                    <Text fontSize={["sm", "md"]}>Monitor banner statistics easily</Text>
                </Box>
                <ButtonGroup>
                    <a href="/dashboard/admin/banner/create">
                        <Button
                            color="pink.600"
                            fontSize={["12px", "14px"]}

                        >
                            Add Banner
                        </Button>
                    </a>
                </ButtonGroup>
            </Flex>
            {drivers ? (
                <>
                    <Flex justifyContent="space-between" p="5px 0" m="10px 5px 0px 5px" flexDir={["column", "row"]} overflowX="visible">
                        <Stack spacing={[0, 5]} direction={["column", "row"]} alignItems={["normal", "center"]}>
                            <Box>
                                <Select fontSize="10px" bg="#F3F3F3" icon={<IoIosArrowDown />} placeholder='sort by' >
                                    <option value='a-z'>A-Z</option>
                                    <option value='z-a'>Z-A</option>
                                </Select>
                            </Box>
                            <Flex alignItems="center">
                                <Input fontSize="12px" placeholder='Search...' />
                                <Button m="20px 5px" fontSize="12px">search</Button>
                                <Button fontSize="12px" >clear</Button>
                            </Flex>
                        </Stack>

                        <HStack p="10px 0 5px 0">
                            {/*<HStack>
								   <Text fontSize="14px">Show</Text>
								    <Input w="30px" size="sm" type="number"  min="1" max="10"></Input>
								    <Text fontSize="14px">entries</Text>
						        </HStack>*/}
                            <HStack>
                                <MdPrint fontSize="20px" color="#000000" />
                                <Text fontSize={["10px", "12px", "14px"]}>Print Document</Text>
                            </HStack>
                            <HStack >
                                <BsFillCloudArrowDownFill fontSize="20px" color="#000000" />
                                <Text cursor="pointer" fontSize={["12px", "14px"]} >Export as .csv</Text>
                            </HStack>
                        </HStack>
                    </Flex>
                    <Box w="100%" overflowX="auto">
                        <Table variant="unstyled" w="100%" overflowY="scroll">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th>S/N</Th>

                                    <Th>Image</Th>
                                    <Th>Title</Th>
                                    <Th>Details</Th>
                                    <Th>Background</Th>
                                    <Th>Text Color</Th>
                                    <Th>Date Created</Th>
                                    <Th>Edit</Th>
                                    <Th>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {drivers && drivers.map((driver, index) => (
                                    <Tr
                                        key={index}
                                        bg={index % 2 ? "gray.50" : "white"}
                                        cursor="pointer"
                                    >

                                        <Td fontSize="sm">
                                            {index}
                                        </Td>

                                        <Td fontSize="sm" onClick={() =>
                                            router.push(
                                                {pathname:`/dashboard/admin/banner/${driver._id}`, query:driver}
                                            )
                                        }>
                                            <Image src={`${ImagePath}/${driver.image}`} alt="product image" w="50px" />
                                        </Td>
                                        <Td fontSize="sm" onClick={() =>
                                            router.push(
                                                {pathname:`/dashboard/admin/banner/${driver._id}`, query:driver}
                                            )
                                        }>
                                            {driver.title}
                                        </Td>
                                        <Td fontSize="sm">
                                            {driver.discount}
                                        </Td>
                                        <Td fontSize="sm">
                                            {driver.color}
                                        </Td>
                                        <Td fontSize="sm">
                                            {driver.text_color}
                                        </Td>
                                        <Td fontSize="sm">
                                            {driver.createdAt.substring(0, 10)}
                                        </Td>
                                        <Td color="green" onClick={() => router.push({pathname:`/dashboard/admin/banner/${driver._id}`, query:driver})}>
                                            Edit
                                        </Td>
                                        <Td color="red" onClick={() => DeleteProduct(driver._id)}>
                                            Delete
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </>)
                :
                <Center h="full" flex="1">
                    <Image src="/infographics/no-data.svg" maxW="96" w="full" />
                </Center>
            }
        </Box>
    );
}

export default withAdmin(DriverManagement);