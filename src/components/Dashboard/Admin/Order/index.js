import { cashFormat } from '@/components/cashFormat';
import { Box, Button, Center, Flex, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import Router from 'next/router';
import Categories from 'pages/dashboard/admin/categories';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { adminGetAddPackage, adminGetAllDrivers, adminGetDeletePackage, adminGetProduct, adminGetSingleOrder, adminGetUpdatePackage } from 'services/admin-services';

export default function ViewOrder({ packageId }) {

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedProduct2, setSelectedProduct2] = useState([{ item: { price: "1,000" } }])
    const [packageTitle, setPackageTitle] = useState("")
    const [packageLoading, setPackageLoading] = useState(false)
    const toast = useToast()
    

    const fetchDriversadminGetAllDrivers = async (e, s) => {
        try {
            setLoading(true);
            if (s) {
                const singlePackage = await adminGetSingleOrder(Router.query?.packageId)
                setSelectedProduct2(singlePackage?.data.package)
                console.log(singlePackage?.data.payment)
                setData(singlePackage.data.payment)
            }
             } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriversadminGetAllDrivers("", true);
    }, []);


    const sum = 0

    
    async function Delivered() {
        setPackageLoading(true)
        try {
            Router.push("/dashboard/admin/tab-management")
            toast({
                position: "top-right",
                title: "package successfully delivered",
                status: "success",
                isClosable: true,
            });

        } catch (error) {
            toast({
                position: "top-right",
                title: "package failed deleted",
                status: "error",
                isClosable: true,
            });

        }

        setPackageLoading(false)
    }

    return (
        <Box w="full">
            {loading?
            <Center>
            	<Spinner color="red" size="xl" />
                </Center>
            :
            <Flex  w="full" wrap={["wrap", "nowrap"]} justifyContent="space-between">
                
                <Box w={["full", "417px"]} mb="30px" bg="#fff" p="10px" >
                    <Box borderBottom="1px solid #D9D9D9" p="10px" m="10px" mb="20px">
                        <Center fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                            Package
                        </Center>
                    </Box>
                    <Flex justifyContent={"space-between"}>
                          
                    </Flex>
                    {selectedProduct2.product_id.length > 0 ?
                        <>
                            {selectedProduct2.product_id.map((p, id) => (
                                <Flex key={id} justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="10px" mr="5px" alignItems="center">
                                    <Flex>
                                        <Center w="60px" h="60px" border="1px solid #EEEDED" p="8px" borderRadius={"12px"} >
                                            <Image src={p.item.image} alt="package item" />
                                        </Center>
                                        <Box ml="18px" w={"full"} fontWeight={"600"} fontSize="12px">
                                            <Box>{p.item.itemName}</Box>
                                            <Box mt="20px" fontWeight="bold">{cashFormat(p.item.price)}</Box>
                                        </Box>
                                    </Flex>
                                </Flex>))}
                            <Flex justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="5px" mr="5px" alignItems="center">
                                <Flex mr="12px" fontWeight={"600"} fontSize="12px">
                                    <Box>Items: </Box> <Text ml="3px">{selectedProduct2.product_id.length}</Text>
                                </Flex>
                                {

                                    <Box>
                                        <Flex alignItems={"center"}>
                                            <Text w="60px">Amount: </Text> <Text color="#000" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat(selectedProduct2.total)}</Text>
                                        </Flex>
                                        <Box>
                                            <Flex alignItems={"center"}>
                                                <Text w="60px">Balance: </Text> <Text color="red" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat(selectedProduct2.balance)}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box>
                                            <Flex alignItems={"center"}>
                                                <Text w="60px">Paid: </Text> <Text color="green" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat(selectedProduct2.paid)}</Text>
                                            </Flex>
                                        </Box>

                                    </Box>}
                            </Flex>
                            <Center>
                                <Button
                                    isLoading={packageLoading}
                                    onClick={() => Delivered()}
                                    disabled={selectedProduct2.status === "confirmed"? false:true}
                                    mt="20px" bg="lightgreen" color="#fff" >
                                    Delivered
                                </Button>
                            </Center>
                        </>
                        :
                        <Center p="40px">
                           No product
                        </Center>
                    }
                </Box>
                <Box w={["full", "417px"]} mb="30px" ml={["0px", "20px"]} bg="#fff" p="10px" >
                    <Box borderBottom="1px solid #D9D9D9" p="10px" m="10px" mb="20px">
                        <Center fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                            Payment History
                        </Center>
                    </Box>
                    <Flex justifyContent={"space-between"}>
                          
                    </Flex>
                    {data.length > 0 ?
                        <>
                        <Flex>
                        <Center  w="100px" p="8px" borderRadius={"12px"} >
                                     <Text>Method</Text>
                                        </Center>
                            
                                        <Center  w="100px" p="8px" borderRadius={"12px"} >
                                     <Text>Details</Text>
                                        </Center>
                            
                        </Flex>
                            {data.map((p, id) => (
                                <Flex key={id} justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="10px" mr="5px" alignItems="center">
                                    <Flex>
                                        <Center  w="100px" p="8px" borderRadius={"12px"} >
                                     <Text>{p.method}</Text>
                                        </Center>
                                        <Box ml="18px" w={"full"} fontWeight={"600"} fontSize="12px">
                                            <Box>{p.referrence}</Box>
                                            <Box color="lightgreen">{cashFormat(p.amount)}</Box>
                                        </Box>
                                    </Flex>
                                                                    </Flex>))}
                                                    </>
                        :
                        <Center p="40px">
                            No Payment Made
                        </Center>
                    }
                </Box>

            </Flex>
}
        </Box>
    )
}