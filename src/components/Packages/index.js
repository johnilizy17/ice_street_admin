import React from 'react'
import { Box, Button, Center, Flex, Image, Switch } from '@chakra-ui/react'
import Router from 'next/router'
import Link from 'next/link'
import { cashFormat } from '../cashFormat'
import { adminGetUpdatePackage } from 'services/admin-services'

export default function Packages({ Items, d,
    fetchDriversadminGetAllDrivers }) {

    const [isHover, setIsHover] = React.useState(-1)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <div className=' w-full ' >

            <Flex wrap="wrap" mt="20px" fontFamily="Open Sans" className=' w-full flex overflow-x-auto lg:grid grid-cols-1 lg:grid-cols-4 gap-7 px-4 lg:px-8 py-4 lg:py-12 ' justifyContent={["center", "start"]} >
                {Items.map((item, index) => {
                    return (
                        <Box mb="20px" mr="30px" position="relative" boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.25)"}
                            _hover={{ boxShadow: "0px 0px 16px #D2301C" }} background="#fff" h="502px" w="285px" borderRadius={"5px"}>
                            <Box borderBottom={"1px solid #D9D9D9"} >
                                <Flex justifyContent={"space-between"} p="10px" alignItems="center">
                                    <Box
                                        fontWeight={"600"}
                                        fontSize={"18px"}
                                        lineHeight={"22px"}
                                        color={"#000000"}
                                    >
                                        {capitalizeFirstLetter(item.title)}
                                    </Box>
                                    <Flex justifyContent={"end"} alignItems="center">
                                        <Box
                                            fontWeight={"700"}
                                            fontSize={"18px"}
                                            lineHeight={"22px"}
                                            color={"#e35c1b"}
                                        >
                                            {cashFormat(item.total)}
                                        </Box>
                                    </Flex>
                                    {d && <Box onClick={async () => {
                                        console.log(item.status)
                                        if (item.status == 2) {
                                            await adminGetUpdatePackage(item._id, { status: 1});
                                        } else {
                                            await adminGetUpdatePackage(item._id, { status: 2 });

                                        }
                                        fetchDriversadminGetAllDrivers(10, "");
                                    }}>

                                        <Switch colorScheme="green" isChecked={item.status === 2 ? true : false} />
                                    </Box>}
                                </Flex>
                            </Box>

                            <Box mt="23px" overflowX={"hidden"} height="380px">
                                {item.product.map((product, id) => (
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

                                            <Center position="absolute" bottom="10px" w="100%" left="0px">
                                                <Button
                                                    onClick={() => {
                                                        Router.push(`/dashboard/admin/package/${item._id}`)
                                                    }}
                                                    w="90%" h="43px" _hover={{ background: "#D2301C", color: "#fff" }} color="#D2301C" border="1px solid #D2301C">
                                                    <Center>
                                                        View Package
                                                    </Center>
                                                </Button>
                                            </Center>
                                        </Flex>
                                    </Center>))}
                            </Box>

                        </Box>
                    )
                })}
            </Flex>
        </div>
    )
} 