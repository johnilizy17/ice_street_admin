import { cashFormat } from '@/components/cashFormat';
import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';

export default function LiveProduct({ Item }) {

 
    return (
        <Box mt="40px">

            <Flex wrap="wrap" alignItems={"center"} justifyContent={["center", "start"]} >
                {
                    Item.map((pro, id) => (
                        <Flex key={id} borderRadius="16px" mr={["0px", "30px"]}  w="320px" h="180px" p="20px" bg="#fff" mb="30px">
                            <Box w="100px" h="100px">
                            <Image h="100px"  src={pro.image} alt="image product" />
                            </Box>
                            <Box ml="20px" pl="10px">
                                <Box fontSize={"14px"}>{pro.itemName}</Box>
                                <Box fontWeight={"800"}>{cashFormat(pro.price)}</Box>
                            </Box>
                        </Flex>
                    ))
                }
            </Flex>

        </Box>
    )
}