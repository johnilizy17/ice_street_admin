import { cashFormat2 } from '@/components/cashFormat';
import { Box, Button, Center, Flex, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import Categories from 'pages/dashboard/admin/categories';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { adminPackagePayment, adminGetAllDrivers, updatePackagePayment, adminGetProduct, adminGetSingleOrder, adminGetUpdatePackage } from 'services/admin-services';
import { ImagePath } from 'services/Variable';

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
    const router = useRouter()

    const fetchDriversadminGetAllDrivers = async (e, s) => {
        try {
            setLoading(true);
            if (s && router.query.packageId) {
                const singlePackage = await adminGetSingleOrder(router.query.packageId)
                setSelectedProduct2(singlePackage.data[0].product_id)
                const payment = await adminPackagePayment(router.query.packageId)
                console.log(payment.data, singlePackage.data[0], "payment")
                if (payment.data) {
                    setSelectedProduct2(payment.data.product_id)
                }
                setData(payment.data)
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriversadminGetAllDrivers("", true);
    }, [router.query.packageId]);


    const sum = 0


    async function Delivered(e) {
        setPackageLoading(true)
        try {
            const product = await updatePackagePayment(router.query.packageId, { status: e })
            setLoading(true)
            Router.push("/dashboard/admin/tab-management")
            toast({
                position: "top-right",
                title: `package successfully ${e}`,
                status: "success",
                isClosable: true,
            });

        } catch (error) {
            toast({
                position: "top-right",
                title: "delivery error",
                status: "error",
                isClosable: true,
            });
        }

        setPackageLoading(false)
    }

    function sumProduct() {
        const totalResult = selectedProduct2.map((a, b) => {
            return (a.item.price - ((a.item.price) * 10 / 100)) * a.qty
        })
        const total = totalResult.reduce((a, b) => a + b)
        return total
    }
    return (
        <Box w="100%" >
            {loading ?
                <Center>
                    <Spinner color="black" size="xl" />
                </Center>
                :
                <Flex w="100%" flexDir="column">

                    <Box w={["100%"]} mb="30px" bg="#fff" p="10px" >
                        <Box borderBottom="1px solid #D9D9D9" p="10px" m="10px" mb="20px">
                            <Center fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                                Product Details
                            </Center>
                        </Box>
                        <Flex justifyContent={"space-between"}>

                        </Flex>
                        {selectedProduct2.length > 0 ?
                            <>
                                {selectedProduct2.map((p, id) => (
                                    <Flex key={id} justifyContent={"space-between"} borderBottom="1px solid #D9D9D9" ml="10px" mr="5px" alignItems="center">
                                        <Flex flexDir={["column", "column", "column", "row"]}>
                                            <Center w="300px" p="20px" overflow="hidden" h="200px" border="1px solid #EEEDED" borderRadius={"12px"} >
                                                <Box>
                                                    <Image objectFit="cover" src={ImagePath + "/" + p.item.image} alt="package item" />
                                                </Box>
                                            </Center>
                                            <Box mb="30px" mt={["10px", "10px", "10px", "0px"]} ml="18px" w={"full"} fontWeight={"600"} fontSize="12px">
                                                <Box>Name:{p.item.itemName}</Box>
                                                <Box mt="10px" fontWeight="bold">Price: {cashFormat2(p.item.price - (p.item.price) * 10 / 100)}</Box>
                                                <Box mt="10px" fontWeight="bold">QTY: {p.qty}</Box>
                                                <Box mt="10px" fontWeight="bold">Size: {p.size}</Box>
                                                <Box mt="10px" fontWeight="bold" w="100%">details: {p.item.details}</Box>
                                            </Box>
                                        </Flex>
                                    </Flex>))}
                                <Flex justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="5px" mr="5px" alignItems="center">
                                    <Flex mr="12px" fontWeight={"600"} fontSize="12px">
                                        <Box>Items: </Box> <Text ml="3px">{selectedProduct2.length}</Text>
                                    </Flex>
                                    {

                                        <Box>
                                            <Flex alignItems={"center"}>
                                                <Text w="80px">Amount: </Text> <Text color="#000" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat2(sumProduct())}</Text>
                                            </Flex>
                                            <Box>
                                                <Flex alignItems={"center"}>
                                                    <Text w="80px">Shipping:</Text> <Text color="red" ml="10px" fontSize={"12px"} fontWeight="600">{data ? data.shipping : 0}</Text>
                                                </Flex>
                                            </Box>

                                            <Box>
                                                <Flex alignItems={"center"}>
                                                    <Text w="80px">Paid: </Text> <Text color="green" ml="10px" fontSize={"12px"} fontWeight="600">{data ? data.total : cashFormat2(0)}</Text>
                                                </Flex>
                                            </Box>

                                        </Box>}
                                </Flex>
                                <Center justifyContent="space-between">
                                    <Button
                                        isLoading={packageLoading}
                                        onClick={() => Delivered("confirm")}
                                        disabled={data && data.status === "active" || data && data.status === "shipped" ? false : true}
                                        mt="20px" bg="black" color="#fff" >
                                        Delivered
                                    </Button>
                                    <Button
                                        isLoading={packageLoading}
                                        onClick={() => Delivered("shipped")}
                                        disabled={data && data.status === "active" || data && data.status === "shipped" ? false : true}
                                        mt="20px" bg="yellow" color="#000" >
                                        Shipping
                                    </Button>
                                    <Button
                                        isLoading={packageLoading}
                                        onClick={() => Delivered("cancel")}
                                        disabled={data && data.status === "active" || data && data.status === "shipped" ? false : true}
                                        mt="20px" bg="red" color="#fff" >
                                        Cancel
                                    </Button>
                                </Center>
                            </>
                            :
                            <Center p="40px">
                                No product
                            </Center>
                        }
                    </Box>
                    {data ?
                        <>
                            <Center mt="20px" fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                                Shipping Details
                            </Center>
                            <Flex>
                                <Box borderRight="1px solid green">
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Country</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>State</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>City</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Address</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Postal</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Status</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Email</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Phone</Text>
                                    </Flex>
                                    <Flex mt="5px" fontWeight="900" w="80px" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>Name</Text>
                                    </Flex>
                                </Box>
                                <Box ml="10px" mt="3px">
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.country}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.state}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.city}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.address}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.post}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.status}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.user_id.phone}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.user_id.email}</Text>
                                    </Flex>
                                    <Flex mt="5px" fontSize="12px" color="gray" h="50px" justifyContent="start" p="8px" borderRadius={"12px"} >
                                        <Text>{data.user_id.firstname ? data.user_id.firstname : "Guest"} {data.user_id.lastname ? data.user_id.lastname : ""}</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                        </>
                        :
                        <Center p="40px">
                            No Payment Made
                        </Center>
                    }
                </Flex>
            }
        </Box>
    )
}