import DriverPaymentInformationForm from "@/components/Form/DriverPaymentInformationForm";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

function DriverPaymentInformation() {
	return (
		<>
			<Flex
				px={["4", "4", "8"]}
				py="4"
				w="full"
				borderBottomWidth="thin"
				align="center"
			>
				{/* {
            activeView?.component &&
            <ChevronLeftIcon cursor="pointer" role="button" mr="2" px="0" fontSize="xl" onClick={() => setActiveView(null)} />
        } */}
				<Heading fontWeight="normal" fontSize="lg">
					Payment Information
				</Heading>
			</Flex>
			<Container maxW="sm" py="4" p={["4", "4", "8"]} mx="0">
				<Text mb="8" color="gray.500" fontSize="sm">
					Receive payments, bonuses, and more to your account number
				</Text>
				<DriverPaymentInformationForm />
			</Container>
		</>
	);
}

export default DriverPaymentInformation;
