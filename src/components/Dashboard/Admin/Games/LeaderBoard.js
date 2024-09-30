import React from 'react'
import { Center, Flex, Box, Text, HStack, Stack, Img} from '@chakra-ui/react'

const LeaderBoard = ({leaderboard, name}) => {

    const capitalize =(text) =>  text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  return (
  <Box w={["100%","100%","100%"]} border="2px solid #F0F0F0" p={2} >
     <Flex justifyContent="space-between" alignItems="center" borderBottom="1px solid #D0D1FF">
        <Box  p={2} borderBottom="2px solid #414272">
            <Text fontWeight="bold" fontSize={["10px", "12px","16px"]} color="#22233F">Leader Board</Text>
            <Text fontSize={["10px", "12px","12px","14px"]}>See who is topping the {name && capitalize(name)} chart </Text>
        </Box>
        <Center cursor="pointer" _hover={{bg:"#d2e4f7"}} transition="all 0.3s linear" p={["10px 15px",null,"5px 10px"]} bg="#ECEDEE" borderRadius="16px">
            <Text fontSize="12px" color="#303030">view all</Text>
        </Center>
      </Flex>

    <Stack spacing={6} mt="10px" overflowY="scroll" h="300px">
      {leaderboard.length >0?
        leaderboard?.map((data)=>{
            const {name, points} = data
            return (
            <Flex justifyContent="space-between">
               <HStack spacing={[5,8]}>
                   <Img src="/brand/trophy.png"/> 
                    <Box>
                        <Text fontSize="14px" fontWeight="700" color="#22233F">{name}</Text>
                        <Text color="#979797" fontSize="8px">{name}</Text>
                        <Text color="#979797" fontSize="8px">played 365 times</Text>
                    </Box>
                </HStack>
                <Box>
                    <Text fontWeight="700" color="#22233F" fontSize="17px">{points}</Text>
                    <Text fontSize="14px">Points</Text>
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

export default LeaderBoard
