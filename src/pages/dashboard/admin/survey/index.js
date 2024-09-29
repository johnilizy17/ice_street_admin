import React, { useEffect, useState } from 'react'
import { Box,
	  Center,
	  Flex,
	  Heading,
	  Text,
    Button,
    Stack,  
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, 
    VStack, HStack,
    Input,
    useToast, Radio, RadioGroup
} from '@chakra-ui/react'
import withAdmin from 'HOC/withAdmin'
import SurveyTableComponent from '@/components/Dashboard/Admin/Survey/SurveyTableComponent';
import { adminAddSurvey, adminDownloadAllSurveyResponse } from 'services/admin-services';

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();


  const [surveys, setSurveys] = useState([])

  const [optCountValue, setOptCountValue] = useState('')
  const [typevalue, setTypeValue] = useState('custom')
  const [questionsValue, setQuestionsValue] = useState('')


 const [optionsErr, setOptionsErr] = useState('')
 const [quesErr, setQuesErr] = useState('')


  
  const submit = async ()=>{

       if(questionsValue==''){return setQuesErr('required')}

       if(optCountValue ==''){return setOptionsErr('required') }

       const allNodes = document.querySelectorAll("#option")

       
      for (let i = 0; i < allNodes.length; i++) {

          if(allNodes[i].value.trim()===''){
            toast({
              position: "top-right",
              title: "options error",
              description: "fill all options",
              status: "error",
              isClosable: true,
            });
            break
            return
          }
       
      }
      //if all input field is validated, then

      let options = []
      allNodes.forEach(element => {

       options = [...options, element.value]
        
      });
      
      const values={
        question: questionsValue,
        type: typevalue,
        option: options
      }
      console.log(values)

     //call endpoint to add data
     try {
      const data = await adminAddSurvey(values)
      console.log(data, "data")
      toast({
        position: "top-right",
        title: "Survey added",
        description: data.message,
        status: "success",
        isClosable: true,
      });

      //set input values
      setQuestionsValue('') 
      setOptCountValue('')


     } catch (error) {
        console.log(error)
     }
      
   }
   
    
   const exportData = async ()=>{
		try {
			const resp = await adminDownloadAllSurveyResponse()
			const url = window.URL.createObjectURL(new Blob([resp?.data]));
			const link = document.createElement("a");
			link.href = url;
            link.setAttribute("download", `Survey responses.csv`);
            document.body.appendChild(link);
             link.click();
		} catch (error) {
			console.log(error, "An error occurred here")
		}
	}


  return (
    <Box w="100%" overflowX="auto">
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
					<Heading fontSize={["md",null,"2xl"]}>Survey</Heading>
					<Text fontSize={["sm",null,"md"]}>Add and view survey</Text>
				</Box>
			</Flex>
      <Stack direction="row" my="4" justify="space-between">
            <Text color="#414272" fontSize={20} fontWeight={500}>Survey Questions</Text>
					<HStack>
             <Button _hover={{color:"#414272", bg:"white", border:"1px solid #414272"}} borderRadius="5px" color="white" bg="#414272" onClick={onOpen} fontSize={[10, 12, 14]}>Add New</Button>
					    <Button variant="ghost" color="#414272" borderRadius="5px" onClick={exportData} fontSize={[10, 12, 14]} border="1px solid #414272">Download all survey</Button>
          </HStack>
			</Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Survey Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box w="100%">
           
            <VStack align="normal"  w="100%" spacing={8}>
                <Box w="100%"  justify="space-between">
                    <label class="form_label" htmlFor="question">Survey question<span style={{color: "red"}}>*</span></label>
                    <Box>
                        <Input class="form_input" name="question" type="text" placeholder="What's the question?" value={questionsValue} onChange={(e)=>{setQuesErr(''); setQuestionsValue(e.target.value)}}/>
                      <Text color="red" fontSize="14px">{quesErr}</Text>
                    </Box>
                </ Box>
                <RadioGroup onChange={setTypeValue} value={typevalue}>
                  <Text fontSize={14}>Choose Survey Type</Text>
                    <HStack >
                        <Radio value='custom'>custom</Radio>
                         <Radio value='verification'>verification</Radio>
                    </HStack>
                  </RadioGroup>
                <Box justify="space-between">
                    <label class="form_label" htmlFor="options">How many options will this question have?<span style={{color: "red"}}>*</span></label>
                    <Box>
                        <Input class="form_input" name="options" placeholder="Input the number of options e.g 3" type="number" value={optCountValue } onChange={(e)=>{setOptionsErr('');setOptCountValue(e.target.value)}} />
                          <Text color="red" fontSize="14px">{optionsErr}</Text>
                    </Box>
                </Box>
               {(optCountValue>0 && questionsValue !=='') &&  [...Array(parseInt(optCountValue)).keys()].map((option)=>{
                  return (
                      <Box justify="space-between" >
                         <label class="form_label" htmlFor="options">option {option +1}<span style={{color: "red"}}>*</span></label>
                        <Box>
                            <Input class="form_input" name="option" id="option" placeholder={`Input option ${option +1}`} type="text"/>
                            <Text color="red" fontSize="14px" id={`option${option+1}`}></Text>
                         </Box>
                      </Box>
                  
                  )
                })
              }

            </VStack>
                    
           </Box>
          </ModalBody>
          <ModalFooter>
              <HStack justify="space-between" w="100%">
                  <Button bg="#25AEFC" color="white" onClick={onClose}_hover={{border:"2px solid #25AEFC", bg:"#ffffff", color:"#25AEFC"}}>
                    Close
                  </Button>
                  <Button onClick={submit} borderRadius={10}  _hover={{border:"1px solid #25AEFC", bg:"#ffffff", color:"#25AEFC"}} bg="#25AEFC" color="white">Save Changes
                  </Button>
              </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SurveyTableComponent />
    </Box>
  )
}

export default withAdmin(index)
