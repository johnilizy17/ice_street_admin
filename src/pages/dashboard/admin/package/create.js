import CreatePackage from "@/components/Dashboard/Admin/Package/CreatePackage";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";

function CreateAdvert() {

	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]}  color="pink.500">
				Create Package
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
			Create Package offerings. All promotions created are added to the promotion table and are made active for customers.
			</Text>
			<Container maxW="container.md" mx="0">
				<CreatePackage />
			</Container>
		</Box>
	);
}

export default withAdmin(CreateAdvert);
