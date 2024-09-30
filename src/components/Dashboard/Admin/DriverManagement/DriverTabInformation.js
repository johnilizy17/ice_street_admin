import DriverTabInformationForm from "@/components/Form/DriverTabInformationForm";
import { Box, Heading, useToast,Button, Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon, Flex,Text,} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {IoIosCheckmarkCircle} from 'react-icons/io'
import { adminUpdateDriverTabInfo, adminGetDriverTabInfo  } from "services/admin-services";

function DriverTabInformation({driver_id, driver}) {
	const [driverTabInfo, setDriverTabInfo] = useState({
		imei: "",
		phone: "",
	});

	const handleDriverTabInformationUpdate = async (values) => {
		
	};

	useEffect(()=>{
		
		const fetchTab = async () => {
			console.log("your id is", driver_id)
			try {
				const res = await adminGetDriverTabInfo({ driver_id: parseInt(driver_id) });
				console.log(res, "resssssssssssss")
				
			} catch (error) {
				console.log(error, "erorrr heree")
			} 
		};
		//fetchTab();
	},[])
	return (
		<>
	<Box>
		{driver.verified_at? <Box>
			<Box borderWidth="thin" py="6" px="4" borderRadius="md" mt="4">
				<Heading
					fontWeight="semibold"
					fontSize="sm"
					textTransform="uppercase"
					mb="8"
				>
					Tab Information
				</Heading>
				<DriverTabInformationForm
					initialValues={driverTabInfo}
					callback={handleDriverTabInformationUpdate}
				>
				</DriverTabInformationForm>
				<Button mt="10" variant='none' _focus={{border:"none"}} _hover={{bg: driver.verified_at? "#EBFFEB": "#FAF0F0"}} bg={driver.verified_at? "#EBFFEB": "#FAF0F0"} color={driver.verified_at? "green": "red"} rightIcon={<IoIosCheckmarkCircle/>}>
                    {driver.verified_at ? "Tab Assigned" : "Tab Not Assigned"}
				</Button>
			</Box>
	    </Box>
		:
		<Box mt="20px">
		    <Accordion defaultIndex={[0]} allowMultiple _focus={{border: "none"}}>
			    <AccordionItem borderTopLeftRadius="24px" borderTopRightRadius="24px">
				    <h2>
					    <AccordionButton p="5" _focus={{border: "none"}} bg="#FF4268" borderTopLeftRadius="24px" borderTopRightRadius="24px">
						    <Box flex='1' textAlign='left'>Add a Tablet</Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                   <AccordionPanel pb={4}>
                        <Flex m="30px 0" alignItems="center" justifyContent="space-between">
							<Text fontSize="sm">
								IMEI <br/>
								254257373687989480
							</Text>
							<Text fontSize="sm" p="3" bg="rgba(209, 7, 7, 0.08)" color="#E45141">Unassigned</Text>
							<Text fontSize="sm" p="3" bg="#E45141" color="white">Assign this Tab</Text>
						</Flex>
						<Flex m="30px 0" alignItems="center" justifyContent="space-between">
							<Text fontSize="sm">
								IMEI <br/>
								254257373687989480
							</Text>
							<Text fontSize="sm" p="3" bg="rgba(209, 7, 7, 0.08)" color="#E45141">Unassigned</Text>
							<Text fontSize="sm" p="3" bg="#E45141" color="white">Assign this Tab</Text>
						</Flex>
                    </AccordionPanel>
                </AccordionItem>
		    </Accordion>
		</Box>}
	</Box>
		</>
		
	);
}

export default DriverTabInformation;
