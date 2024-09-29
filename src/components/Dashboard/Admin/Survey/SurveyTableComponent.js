import React, { useEffect, useState } from 'react'
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Radio,RadioGroup,HStack,Center,Image,Box, useToast
} from "@chakra-ui/react"
import { adminGetAllSurvey, adminDeleteSurveyQuestion } from 'services/admin-services'
import moment from 'moment'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const SurveyTableComponent = () => {


  const toast = useToast()
  const router = useRouter()
  const [surveys, setSurveys] = useState([])
  const [value, setValue] = useState( )

  const getAllSurvey = async()=>{
    const data = await adminGetAllSurvey()
    setSurveys(data.data)
  }
  const deleteSurvey = async(surveyId)=>{
    try {
      const data = await adminDeleteSurveyQuestion(surveyId)
      console.log(data, "data")
      toast({
        position: "top-right",
        title: "Survey Deleted successfully",
        description: data.message,
        status: "success",
        isClosable: true,
      });

      getAllSurvey() //get updated survey response
  
     } catch (error) {
        console.log(error)
        toast({
          position: "top-right",
          title: "Error deleting survey",
          description: "error deleting survey",
          status: "error",
          isClosable: true,
        });
  
     }
      
  }

  useEffect(()=>{
    getAllSurvey(), "data"
  },[])

  console.log(surveys)
  
  return (
   <Box overflow="auto" mt="40px">
      {(surveys.length > 0) ? 
      <Table  variant="simple" overflowX="scroll"  borderRadius={20} >
						<Thead whiteSpace="nowrap" >
							<Tr>
								<Th fontSize={["8px","12px"]}>Question</Th>
								<Th fontSize={["8px","12px"]}>Survey Type</Th>
								<Th fontSize={["8px","12px"]}>options</Th>
                <Th fontSize={["8px","12px"]}>Date added</Th>
                <Th fontSize={["8px","12px"]}>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{surveys?.map((survey) =>
							{ 
                console.log(survey.option)
                return (
								
								<Tr key={survey.id}
                cursor="pointer"
								>
									<Td 
                  onClick={() =>
                  router.push(
                    `/dashboard/admin/survey/${survey.id}`)
                   }
                fontSize={["10px","14px"]}>
										{survey.question}
									</Td>
									<Td 
                      onClick={() =>
                      router.push(
                    `/dashboard/admin/survey/${survey.id}`)
                    }
                     fontSize={["10px","14px"]}>{survey.type}</Td>
									<Td fontSize={["10px","14px"]}>
                  <RadioGroup 
                  onClick={() =>
                        router.push(
                    `/dashboard/admin/survey/${survey.id}`)
                      }
                onChange={setValue} value={value}>
                    <HStack>
                        {
                          survey.option.map((opt)=>{
                            console.log(opt)
                            return <Radio  size="sm" value={opt.option}>{opt.option}</Radio>
                          })
                        }
                    </HStack>
                  </RadioGroup>
									</Td>
                  <Td fontSize={["10px","14px"]}>{survey.created_at.substring(0, 10)}</Td>
                  <Td onClick={()=>deleteSurvey(survey.id)} color="red" _hover={{color:"red.600"}} transition="all .3s linear"><DeleteIcon/></Td>
								</Tr>
                
								) }
								)}		
						</Tbody>
				</Table> :
          <Center h="full" flex="1">
			        <Image src="/infographics/no-data.svg" maxW="96" w="full" />
		     </Center>
    }
     </Box>
                      
  )
}

export default SurveyTableComponent
