import React, { useEffect, useState } from 'react'
import { Box, Flex, Text,Button, useToast, Stack,HStack} from '@chakra-ui/react';
import withAdmin from 'HOC/withAdmin'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {RiDownload2Fill} from 'react-icons/ri'
import Link from "next/link";
import { useRouter } from 'next/router';
import { adminGetSingleSurveyResult,adminDownloadSingleSurveyResponse } from 'services/admin-services';
import PieChart from '@/components/Dashboard/Admin/Survey/Piechart';
import { data } from '@/components/Dashboard/Admin/Games/Graph';

const SingleSurvey = () => {

    const router = useRouter()
    const  {surveyId} = router.query

    const [labels, setLabels] = useState([])
    const [survey, setSurvey] = useState()
    const [totalStat, setTotalStat] = useState([])

    //console.log(surveyId)

    const getSurveyResult = async()=>{
        try {
            const {data} = await adminGetSingleSurveyResult(surveyId) 
           console.log(data, "ooo")
            setSurvey(data)
            const filtLabel = data.map((item)=>{
                return item.option
            })

            const uniqLabel = [...new Set(filtLabel)];

            setLabels(uniqLabel)
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(()=>{
        getSurveyResult()
    },[surveyId])

    useEffect(()=>{
        
        let data = []
        labels.forEach(element => {
            let stat = {}
        const filt = survey?.filter((item)=>{
            return item.option === element
        })
            stat['label'] = element
            stat['count'] = filt.length
            data = [...data, stat]
        });

       setTotalStat(data)
       
    },[survey, labels])

    const exportData = async (id)=>{
		try {
			const resp = await adminDownloadSingleSurveyResponse(id)
			const url = window.URL.createObjectURL(new Blob([resp?.data]));
			const link = document.createElement("a");
			link.href = url;
            link.setAttribute("download", `Survey response.csv`);
            document.body.appendChild(link);
             link.click();
		} catch (error) {
			console.log(error, "An error occurred here")
		}
	}


  return (
    <Box w="100%">
       <Link m="20px 0" href="/dashboard/admin/survey"><AiOutlineArrowLeft  fontSize="25px"/></Link> 
        <Flex justifyContent="space-between">
            <Text color="#414272" fontSize="24px">Survey Question</Text>
            <Button variant="ghost" color="#414272" borderRadius="5px" onClick=  {()=>exportData(surveyId)} fontSize={[10, 12, 14]} border="1px solid #414272">Download this survey</Button>
        </Flex>
        <Flex flexDir={["column", "column","column", "row"]} mt="30px" justifyContent="space-between" w="100%" >
                <Box p={2} mb="30px" border="1px solid #F0F0F0" w={["100%","100%","100%","50%"]}>
                    <Box borderBottom="1px solid #D0D1FF">
                        <Text fontSize="17px" fontWeight="700" color="#0A2843">Survey I Statistics<span></span></Text>
                        <Text borderBottom="1px solid #414272" color="#656565" fontSize="11px">See the rate at which people participated in the survey</Text>
                    </Box>
                    <Box w="100%">
                     <PieChart surveyId={surveyId} stat={totalStat}/>
                   </Box>
                </Box>
            <Stack p={2} mb="30px" border="1px solid #F0F0F0" w={["100%","100%","100%","50%"]} spacing="24px" flexDir="column">
                  <HStack spacing={[5,8]}>
                        <Text fontSize="20px" fontWeight="700" color="#ef506b">Total number that participated in survey</Text>
                         <Text fontStyle="italic" color="#979797" fontWeight={800} fontSize="40px">{survey && survey.length}</Text>
                </HStack>
                <Text textAlign="center" fontSize={15}>Survey Options Statistics</Text>
                {
                    totalStat.map((item)=>{
                        return(
                            <HStack justify="space-between">
                                 <Text fontSize="14px" fontWeight="700" color="#22233F">{item.label}</Text>
                              <Text color="#979797" fontWeight={700} fontSize="20px">{item.count}</Text>
                            </HStack>
                        )
                    })
                }
            </Stack>
        </Flex>
    </Box>
  )
}

export default withAdmin(SingleSurvey)
