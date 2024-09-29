import CategoryForm from "@/components/Dashboard/Admin/Adverts/CategoryForm";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React from "react";

function CreateAdvert() {
	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]}  color="pink.500">
				Create categories
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
			categories to add to product and packages.
			</Text>
			<Container maxW="container.md" mx="0">
				<CategoryForm />
			</Container>
		</Box>
	);
}

export default withAdmin(CreateAdvert);
