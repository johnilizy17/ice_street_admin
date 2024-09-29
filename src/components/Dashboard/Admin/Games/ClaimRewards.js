import { Box, Flex, Center, Text, Stack, Img } from '@chakra-ui/react'
import React from 'react'

const ClaimRewards = ({claimReward}) => {

    console.log(claimReward, "claim reward")
  return (
    <Box w={["100%","100%","100%"]} border="2px solid #F0F0F0" p={2} >
        <Flex justifyContent="space-between" alignItems="center" borderBottom="1px solid #D0D1FF">
          <Box  p={2} borderBottom="2px solid #414272">
            <Text fontWeight="bold" fontSize={["10px", "12px","16px"]} color="#22233F">Claim Reward</Text>
            <Text fontSize={["10px", "12px","12px","14px"]}>See who is to get an Awefun reward</Text>
          </Box>
           <Center cursor="pointer" _hover={{bg:"#d2e4f7"}} transition="all 0.3s linear" p={["10px 15px",null,"5px 10px"]} bg="#ECEDEE" borderRadius="16px">
               <Text fontSize="12px" color="#303030">view all</Text>
            </Center>
        </Flex>
        <Stack spacing={6} mt="10px" overflowY="scroll" h="300px">
            {claimReward.length >0?
                claimReward?.map((data)=>{
                  const {email, points, name, phone} = data
                return (
                <Flex justifyContent="space-between" border="2px solid #F0F0F0" borderRadius="6px" p={2} m={2}>
                    <Box>
                        <Text fontSize="14px" fontWeight="700" color="#22233F">{name}</Text>
                        <Text color="#979797"  fontWeight="400" fontSize="10px">{email}</Text>
                        <Text color="#979797" fontWeight="400" fontSize="10px">{phone}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="700" color="#22233F" fontSize="12px">{points}</Text>
                        <Text fontSize="9px"  borderRadius="3px" p="5px 12px" bgImage="linear-gradient(to right, #009F7C ,#2CAB73 ,#69BB66, #96C75D, #B2CE57 ,#BCD155)">Reward</Text>
                    </Box>
                </Flex>
              )
            })
            :
           <Center h="full" flex="1">
                <Img src="/infographics/no-data.svg" maxW="96" w="full" />
             </Center> }

        </Stack>
    </Box>
  )
}

export default ClaimRewards
