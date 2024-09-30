import { cashFormat } from '@/components/cashFormat';
import { Box, Button, Center, Flex, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import Router from 'next/router';
import Categories from 'pages/dashboard/admin/categories';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { adminGetAddPackage, adminGetAllDrivers, adminGetDeletePackage, adminGetProduct, adminGetSinglePackage, adminGetUpdatePackage } from 'services/admin-services';

export default function EditPackage({ packageId }) {

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
                const data = await adminGetAllDrivers(10, 1);
                const singlePackage = await adminGetSinglePackage(Router.query?.packageId)
                const newProjects = data.data.category.map(p => {
                    return p._id &&
                        { ...p, value: p._id, label: p.title }
                });
                setCategory(newProjects);
                setPackageTitle(singlePackage?.data.title)
                const optionCategory = [{ ...singlePackage?.data.category_id, value: singlePackage?.data.category_id._id, label: singlePackage?.data.category_id.title }]
                setSelected(optionCategory)
                setSelectedProduct2(singlePackage?.data.product)
            }
            const product = await adminGetProduct(e)
            console.log(product)
            setData(product.data.products)
            setLoading(false);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDriversadminGetAllDrivers("", true);
    }, []);


    const sum = selectedProduct2.reduce((accumulator, object) => {
        return accumulator + JSON.parse(object.item.price.replaceAll(",", ""));
    }, 0);

    async function AddPackage() {
        setPackageLoading(true)
        const category_id = selected.map(p => {
            return p._id &&
                p._id
        });
        const product = selectedProduct2.map(p => {
            return p.item._id &&
                { "item": p.item._id, qty: 1 }
        })
        const AddPackageData = {
            "title": packageTitle,
            "category_id": category_id[0],
            "total": sum,
            "product": product
        }

        if (packageTitle.length > 0) {
            try {
                const data = await adminGetUpdatePackage(Router.query?.packageId, AddPackageData);
                Router.push("/dashboard/admin/package")
                toast({
                    position: "top-right",
                    title: "package successfully updated",
                    status: "success",
                    isClosable: true,
                });

            } catch (error) {
                toast({
                    position: "top-right",
                    title: "package failed updated",
                    status: "error",
                    isClosable: true,
                });

            }

        } else {
            toast({
                position: "top-right",
                title: "add package name updated",
                status: "error",
                isClosable: true,
            })
        }
        setPackageLoading(false)
    }

    async function DeletePackage() {
        setPackageLoading(true)
        try {
            const data = await adminGetDeletePackage(Router.query?.packageId);
            Router.push("/dashboard/admin/package")
            toast({
                position: "top-right",
                title: "package successfully deleted",
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
        <Box>
            <Button isLoading={packageLoading} onClick={()=>{DeletePackage()}} bg="red" color="#fff" mb="20px">
                Delete Package
            </Button>
            <Flex wrap={"wrap"} justifyContent="space-between">
                <Box w={["full", "732px"]} mb="30px" p={["18px", "44px"]} bg="#fff" >
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
                        data.map((items, id) => (
                            <Flex key={id} justifyContent={"space-between"} alignItems="center" p="33px">
                                <Flex>
                                    <Center w="60px" h="60px" border="1px solid #EEEDED" p="8px" borderRadius={"12px"} >
                                        <Image src={items.image} alt="package item" />
                                    </Center>
                                    <Box ml="25px" w={["90px", "180px"]} fontWeight={"600"} fontSize="12px">
                                        {items.itemName}
                                    </Box>
                                </Flex>
                                <Button
                                    onClick={() => {
                                        const productData = data
                                        const deletItems = productData.splice(id, 1)
                                        setSelectedProduct([deletItems])
                                        setData(productData)
                                        const array = selectedProduct2
                                        array.push({ item: deletItems[0] })
                                        setSelectedProduct2(array)
                                    }}
                                    bg="#FE7062" color="#fff">
                                    ADD
                                </Button>
                            </Flex>))}
                </Box>

                <Box w={["full", "417px"]} mb="30px" bg="#fff" p="10px" >
                    <Box borderBottom="1px solid #D9D9D9" p="10px" m="10px" mb="20px">
                        <Center fontWeight={"600"} fontSize="20px" lineHeight={"17px"}>
                            Package
                        </Center>
                    </Box>
                    <Flex justifyContent={"space-between"}>
                        <Box>
                            <Box mb="10px" fontWeight={"600"} fontSize="14px" lineHeight={"17px"}>Package Name</Box>
                            <Input w="160px"
                                value={packageTitle}
                                onChange={(e) => {
                                    setPackageTitle(e.target.value)
                                }} />
                        </Box>
                        <Box fontWeight={"600"} mr="20px" fontSize="14px" lineHeight={"17px"}>
                            <Box mb="10px">Category</Box>
                            <Box w="160px">
                                <MultiSelect
                                    options={category}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </Box>
                        </Box>
                    </Flex>
                    {selectedProduct2.length > 0 ?
                        <>
                            {selectedProduct2.map((p, id) => (
                                <Flex key={id} justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="10px" mr="5px" alignItems="center">
                                    <Flex>
                                        <Center w="60px" h="60px" border="1px solid #EEEDED" p="8px" borderRadius={"12px"} >
                                            <Image src={p.item.image} alt="package item" />
                                        </Center>
                                        <Box ml="18px" w={["100px", "130px"]} fontWeight={"600"} fontSize="12px">
                                            <Box>{p.item.itemName}</Box>
                                            <Box>{cashFormat(p.item.price)}</Box>
                                        </Box>
                                    </Flex>
                                    <Button
                                        onClick={() => {
                                            const productData = selectedProduct2
                                            const deletItems = productData.splice(id, 1)
                                            setSelectedProduct([deletItems])
                                            setSelectedProduct2(selectedProduct2)
                                        }}
                                        bg="#FE7062" color="#fff" fontSize="15px">
                                        REMOVE
                                    </Button>
                                </Flex>))}
                            <Flex justifyContent={"space-between"} padding="23px" borderBottom="1px solid #D9D9D9" ml="5px" mr="5px" alignItems="center">
                                <Flex mr="12px" fontWeight={"600"} fontSize="12px">
                                    <Box>Items: </Box> <Text ml="3px">{selectedProduct2.length}</Text>
                                </Flex>
                                {

                                    <Box>
                                        <Flex alignItems={"center"}>
                                            <Text w="60px">Amount: </Text> <Text color="#E35C1B" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat(sum)}</Text>
                                        </Flex>
                                        <Box>
                                            <Flex alignItems={"center"}>
                                                <Text w="60px">Daliy: </Text> <Text color="#E35C1B" ml="10px" fontSize={"12px"} fontWeight="600">{cashFormat(sum / 365)}</Text>
                                            </Flex>
                                        </Box>

                                    </Box>}
                            </Flex>
                            <Center>
                                <Button
                                    isLoading={packageLoading}
                                    onClick={() => AddPackage()}
                                    mt="20px" bg="#E35C1B" color="#fff" >
                                    Update package
                                </Button>
                            </Center>
                        </>
                        :
                        <Center p="40px">
                            Select a product
                        </Center>
                    }
                </Box>

            </Flex>
        </Box>
    )
}