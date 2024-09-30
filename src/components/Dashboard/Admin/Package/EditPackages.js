import { cashFormat } from '@/components/cashFormat';
import { Box, Button, Center, Flex, Heading, Image, Input, Spinner, Switch, Text, useToast } from '@chakra-ui/react';
import Router from 'next/router';
import Categories from 'pages/dashboard/admin/categories';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { adminAddLivePackage, adminGetAddPackage, adminGetAllDrivers, adminGetProduct, adminSearchPackages, adminUpdateLivePackage } from 'services/admin-services';

export default function AddPackages({datas, id}) {

    const [selected, setSelected] = useState([id]);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([id]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedProduct2, setSelectedProduct2] = useState(datas)
    const [packageTitle, setPackageTitle] = useState("")
    const [packageLoading, setPackageLoading] = useState(false)
    const toast = useToast()
    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

    const fetchDriversadminGetAllDrivers = async (e, s) => {
        try {
            setLoading(true);
            if (s) {
                const data = await adminGetAllDrivers(10, 1);
                
            }
            const product = await adminSearchPackages(e)
            setData(product.data)
            setLoading(false);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriversadminGetAllDrivers("", true);
    }, []);


    async function AddPackage() {
        setPackageLoading(true)
        const category_id = selected.map(p => {
            return p._id &&
                p._id
        });

        const product = selectedProduct2.map(p => {
            return p._id &&
                p._id
        })

        if (category_id.length === 0) {
            toast({
                position: "top-right",
                title: "kindly select a category",
                status: "error",
                isClosable: true,
            });

        } 
        else if (category_id.length > 1) {
            toast({
                position: "top-right",
                title: "you can only select one category",
                status: "error",
                isClosable: true,
            });

        } else {

            const AddPackageData = {
                "category_id": category_id,
                status: 2,
                type:2,
                "package_id":[...product]
        }

            try {
                const data = await adminUpdateLivePackage( Router.query.gameId,AddPackageData);
                Router.push("/dashboard/admin/live")
                toast({
                    position: "top-right",
                    title: "package successfully created",
                    status: "success",
                    isClosable: true,
                });

            } catch (error) {
                toast({
                    position: "top-right",
                    title: error,
                    status: "error",
                    isClosable: true,
                });

            }
    }

    setPackageLoading(false)
}

const [isHover, setIsHover] = React.useState(-1)

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


return (
    <Flex wrap={["wrap", "nowrap"]}  w="full" justifyContent="space-between">
       
            <Box w={["full", "50%"]} mr="20px" mb="30px" p={["18px", "44px"]} bg="#fff" >
                <Center>
                    <Flex border="1px solid #D9D9D9" h="40px" mb="70px" borderRadius="5px" p="10px" w="80%" alignItems={"center"}>
                        <svg width="20" height="22" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7438 10.8348L14.7786 14.9466C14.9204 15.0912 15.0001 15.2873 15 15.4918C14.9999 15.6962 14.9202 15.8923 14.7782 16.0368C14.6363 16.1813 14.4439 16.2625 14.2433 16.2624C14.0426 16.2623 13.8502 16.181 13.7084 16.0364L9.67361 11.9246C8.46745 12.8767 6.95069 13.3247 5.4319 13.1775C3.91311 13.0304 2.50637 12.2991 1.49785 11.1325C0.489335 9.96593 -0.0451967 8.45161 0.00299711 6.89763C0.0511909 5.34365 0.67849 3.86675 1.75728 2.76738C2.83607 1.668 4.28532 1.02873 5.8102 0.979617C7.33508 0.930503 8.82104 1.47523 9.9658 2.50299C11.1106 3.53075 11.8281 4.96434 11.9725 6.51211C12.1169 8.05989 11.6773 9.60559 10.7431 10.8348H10.7438ZM6.00028 11.6762C7.1937 11.6762 8.33824 11.1931 9.18211 10.3331C10.026 9.47315 10.5001 8.30677 10.5001 7.09057C10.5001 5.87438 10.026 4.708 9.18211 3.84803C8.33824 2.98805 7.1937 2.50492 6.00028 2.50492C4.80686 2.50492 3.66232 2.98805 2.81845 3.84803C1.97457 4.708 1.50049 5.87438 1.50049 7.09057C1.50049 8.30677 1.97457 9.47315 2.81845 10.3331C3.66232 11.1931 4.80686 11.6762 6.00028 11.6762Z" fill="#979494" />
                        </svg>
                        <Input _focus={{ border: "none" }} border="none" onChange={(e) => {
                            fetchDriversadminGetAllDrivers(e.target.value, false);
                        }} w="full" outline={"none"} />
                    </Flex>
                </Center>
                {loading ?
                    <Center flexDirection={"column"}>
                        <Spinner size="xl" color={"#FE7062"} />
                        <Text mt="10px">searching</Text>
                    </Center> :
                    <Flex p={["5px","20px"]} wrap={"wrap"}>
                        {data.map((items, id) => (
                            <Flex key={id} mr="10px" justifyContent={"space-between"} alignItems="center">
                                <Box mb="20px" position="relative" boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.25)"}
                                    _hover={{ boxShadow: "0px 0px 16px #D2301C" }} background="#fff" h="502px" w="285px" borderRadius={"5px"}>
                                    <Box borderBottom={"1px solid #D9D9D9"} >
                                        <Flex justifyContent={"space-between"} p="10px" alignItems="center">
                                            <Box
                                                fontWeight={"600"}
                                                fontSize={"18px"}
                                                lineHeight={"22px"}
                                                color={"#000000"}
                                            >
                                                {capitalizeFirstLetter(items.title)}
                                            </Box>
                                            <Flex justifyContent={"end"} alignItems="center">
                                                <Box
                                                    fontWeight={"700"}
                                                    fontSize={"18px"}
                                                    lineHeight={"22px"}
                                                    color={"#e35c1b"}
                                                >
                                                    {cashFormat(items.total)}
                                                </Box>

                                            </Flex>
                                        </Flex>
                                    </Box>

                                    <Box mt="23px" overflowX={"hidden"} height="380px">
                                        {items.product.map((product, id) => (
                                            <Center mb="32px">
                                                <Flex w="200px">
                                                    <Box
                                                        width="49px"
                                                        height="57px">
                                                        <Image
                                                            src={product.item.image} alt="object image" />
                                                    </Box>
                                                    <Box ml="24px">
                                                        <Box
                                                            fontFamily='Inter'
                                                            fontStyle="normal"
                                                            fontWeight="500"
                                                            fontSize="14px"
                                                            lineHeight="17px"
                                                            color="#000000"

                                                        >{product.item.itemName}</Box>
                                                        <Box
                                                            fontFamily='Inter'
                                                            fontStyle="normal"
                                                            fontWeight="700"
                                                            fontSize="16px"
                                                            lineHeight="19px"
                                                            color="#000000"

                                                        >{cashFormat(product.item.price)}</Box>
                                                    </Box>
                                                </Flex>
                                            </Center>))}
                                    </Box>
                                    <Center>
                                        <Button
                                            onClick={() => {
                                                const productData = data
                                                const deletItems = productData.splice(id, 1)
                                                setSelectedProduct([deletItems])
                                                setData(productData)
                                                const array = selectedProduct2
                                                array.unshift(...deletItems)
                                                setSelectedProduct2(array)
                                            }}
                                            w="90%" h="43px" _hover={{ background: "#D2301C", color: "#fff" }} color="#D2301C" bottom="10px" border="1px solid #D2301C" position="absolute">
                                            <Center>
                                                ADD
                                            </Center>
                                        </Button>
                                    </Center>

                                </Box>

                            </Flex>))}
                    </Flex>
                }
            </Box>

            <Box w={["full", "417px"]} mb="30px" bg="#fff" p="10px" >
                <Box borderBottom="1px solid #D9D9D9" p="10px" m="10px" mb="20px">
                    <Center fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                        Category
                    </Center>
                </Box>
                <Flex justifyContent={"space-between"}>

                    <Box fontWeight={"600"} mr="20px" fontSize="14px" lineHeight={"17px"}>
                        <Box mb="10px">Category</Box>
                        <Box w="160px">
                         <Heading>
                            {selected[0].title}
                         </Heading>
                        </Box>
                    </Box>
                </Flex>
                {selectedProduct2.length > 0 ?
                    <>
                        {selectedProduct2.map((items, id) => (
                            <Flex key={id} mr="10px" justifyContent={"space-between"} alignItems="center" p="33px">
                                <Box mb="20px" position="relative" boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.25)"}
                                    _hover={{ boxShadow: "0px 0px 16px #D2301C" }} background="#fff" h="502px" w="285px" borderRadius={"5px"}>
                                    <Box borderBottom={"1px solid #D9D9D9"} >
                                        <Flex justifyContent={"space-between"} p="10px" alignItems="center">
                                            <Box
                                                fontWeight={"600"}
                                                fontSize={"18px"}
                                                lineHeight={"22px"}
                                                color={"#000000"}
                                            >
                                                {capitalizeFirstLetter(items.title)}
                                            </Box>
                                            <Flex justifyContent={"end"} alignItems="center">
                                                <Box
                                                    fontWeight={"700"}
                                                    fontSize={"18px"}
                                                    lineHeight={"22px"}
                                                    color={"#e35c1b"}
                                                >
                                                    {cashFormat(items.total)}
                                                </Box>

                                            </Flex>
                                        </Flex>
                                    </Box>

                                    <Box mt="23px" overflowX={"hidden"} height="380px">
                                        {items.product.map((product, id) => (
                                            <Center mb="32px">
                                                <Flex w="200px">
                                                    <Box
                                                        width="49px"
                                                        height="57px">
                                                        <Image
                                                            src={product.item.image} alt="object image" />
                                                    </Box>
                                                    <Box ml="24px">
                                                        <Box
                                                            fontFamily='Inter'
                                                            fontStyle="normal"
                                                            fontWeight="500"
                                                            fontSize="14px"
                                                            lineHeight="17px"
                                                            color="#000000"

                                                        >{product.item.itemName}</Box>
                                                        <Box
                                                            fontFamily='Inter'
                                                            fontStyle="normal"
                                                            fontWeight="700"
                                                            fontSize="16px"
                                                            lineHeight="19px"
                                                            color="#000000"

                                                        >{cashFormat(product.item.price)}</Box>
                                                    </Box>
                                                </Flex>
                                            </Center>))}
                                    </Box>
                                    <Center>
                                        <Button
                                            onClick={() => {
                                                const productData = selectedProduct2
                                                const deletItems = productData.splice(id, 1)
                                                setSelectedProduct([deletItems])
                                                setSelectedProduct2(selectedProduct2)
                                            }}
                                            w="90%" h="43px" _hover={{ background: "#D2301C", color: "#fff" }} color="#D2301C" bottom="10px" border="1px solid #D2301C" position="absolute">
                                            <Center>
                                                REMOVE
                                            </Center>
                                        </Button>
                                    </Center>

                                </Box>

                            </Flex>))}
                        <Flex justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="5px" mr="5px" alignItems="center">
                            <Flex mr="12px" fontWeight={"600"} fontSize="12px">
                                <Box>Items: </Box> <Text ml="3px">{selectedProduct2.length}/14</Text>
                            </Flex>

                        </Flex>
                        <Center>
                            <Button
                                isLoading={packageLoading}
                                onClick={() => AddPackage()}
                                mt="20px" bg="#E35C1B" color="#fff" >
                                Add Live Product
                            </Button>
                        </Center>
                    </>
                    :
                    <Center p="40px">
                        Select a package
                    </Center>
                }
            </Box>


    </Flex>
)
}