import { ArrowBackIcon } from '@chakra-ui/icons'
import { Avatar, Box, Flex, HStack, Tag, Text, VStack, TagLabel, Input, Textarea, InputGroup, InputRightElement } from '@chakra-ui/react'
import withAdmin from 'HOC/withAdmin'
import React, { useEffect, useState } from 'react'
import {FiSend} from "react-icons/fi"
import { Scrollbars, scrollToBottom } from 'react-custom-scrollbars';

const data = [1,2,3,4,5,6,7,8,9,0,3]

const index = () => {

    const [chatBoxDisplay, setChatBoxDisplay] = useState(true)
    const [chatListDisplay, setChatListDisplay] = useState(true)
    const [chatSidebar, setChatSidebar] = useState(true)
    const [chatBox, setChatBox] = useState(true)
    const [smallScreenSize, setSmallScreenSize] = useState(false)
    const [bigScreenSize, setBigScreenSize] = useState(true)


    const [size, setSize] = useState()

    useEffect(() => {
        function updateSize() {
          setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, [size]);

    useEffect(()=>{
        console.log(size,"size")
       if( size <=800){
        console.log(`size ${size} is less than 800`)
         setChatBoxDisplay(false)
         setChatListDisplay(true)
         setSmallScreenSize(true)
       }
       if( size >=800){
        console.log(size,"size smaller than 500")
         setChatBoxDisplay(true)
         setChatListDisplay(true)
         setSmallScreenSize(false)
       }
       console.log(smallScreenSize, "small screen size")
    },[size])

    const openChat = ()=>{
        console.log(window.innerWidth, "window width")
        if( size >=800){
          return
         }
        setChatBoxDisplay(true)
        setChatListDisplay(false)
    }

    const back = ()=>{
        setChatListDisplay(true)
        setChatBoxDisplay(false)
    }
  return (
      <>
         <Flex w="100%" h="500px" border="2px solid #979797">
          
          { chatListDisplay===true && 
          <Box w={[smallScreenSize===true ? "100%" :"40%"]} border="1px solid #efefef" 
          h="100%" 
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">
            <Scrollbars>
                 <VStack spacing={5}>
                   {
                    data.map((item)=>{
                        return (
                            <HStack onClick={openChat} w="100%" className="support-box" cursor="pointer" _hover={{bg:"#ec3554da"}} justifyContent="space-between" p={4}>
                              <Flex alignItems="center">
                                <Avatar
                                  src='https://bit.ly/sage-adebayo'
                                   size='md'
                                   name='Segun Adebayo'
                                   ml={-1}
                                  mr={2}
                                 />
                                  <Box  _hover={{transition: "all .5s linear", color:"white"}}>
                                    <Text className='support-text' fontSize={["16px","14px","14px","16px"]} fontWeight="700" color="#ec3554da">JavaScript Mastery</Text>
                                    <Text color="#22233F" className='support-text'  fontSize={["10px","12px"]} >Stay safe</Text>
                                </Box>
                              </Flex>
                                <Text color="#22233F" className='support-text' fontSize={["10px","8px"]}>June 25th</Text>
                            </HStack>
                        )
                    })
                  }
                </VStack>
             </Scrollbars>
          </Box>}

        { chatBoxDisplay===true && 
        <Box id='chatbox' w={smallScreenSize===true?"100%" : "60%"}   h="100%" pos="relative">
            <Box display={smallScreenSize==true?"block": "none"} onClick={back} fontSize={30} m="10px">
                <ArrowBackIcon/>
            </Box>
             <HStack p={2} justifyContent="center">
               <Avatar></Avatar>
               <Text fontSize={["16px","20px"]} fontWeight="700" color="#22233F">JavaScript Mastery</Text>
             </HStack>
             <Scrollbars 
                 
                  style={{ width: "97%", height: "70%"}}>
               <Box h="70%">
                   <VStack p={3} spacing="5" w="100%" alignItems="normal" mb="50px">
                  {data.map(()=>{
                  return ( 
                     <Box>
                        <Tag size='lg' colorScheme='red' borderRadius='full' textAlign="left">
                          <Avatar
                            src='https://bit.ly/sage-adebayo'
                            size='xs'
                            name='Segun Adebayo'
                            ml={-1}
                            mr={2}
                          />
                         <TagLabel>Way to go</TagLabel>
                      </Tag>
                      <Text fontSize="10px" fontWeight={700}>22.15pm</Text>
                    </Box>
                     )
                   })}
                 {
                  data.map(()=>{
                    return (
                       <Flex justifyContent="flex-end">
                          <Box>
                              <Tag size='lg' colorScheme='red' borderRadius='full' textAlign="left">
                                <Avatar
                                   src='https://bit.ly/sage-adebayo'
                                   size='xs'
                                  name='Segun Adebayo'
                                   ml={-1}
                                   mr={2}
                                />
                                  <TagLabel>Way to go</TagLabel>
                               </Tag>
                               <Text alignItems="end" fontSize="10px" fontWeight={700}>22.15pm</Text>
                           </Box>

                        </Flex>
                        )
                        })
                       }
                  </VStack>
                </Box >
             </Scrollbars>
               <Box bg="#ea3d5a5e" zIndex={100} pos="absolute" h="15%" bottom={2} w="100%">
                <InputGroup>
                    <Textarea bg="#f5f5f5" placeholder='Type a message' fontStyle="italic" border="1px solid #22233F"/>
                     <InputRightElement m="10px 30px" children={<FiSend color='green.500' size={40} />} />
                </InputGroup>
                </Box>
          </Box> }
       </Flex>
      </>
  )
}

export default withAdmin(index)
