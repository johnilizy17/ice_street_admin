import AdvertForm from "@/components/Dashboard/Admin/Adverts/AdvertForm";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React from "react";

function CreateAdvert() {
	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]}  color="pink.500">
				Create Adverts
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
			Create advert offerings. All promotions created are added to the promotion table and are made active for customers.
			</Text>
			<Container maxW="container.md" mx="0">
				<AdvertForm />
			</Container>
		</Box>
	);
}

export default withAdmin(CreateAdvert);
