import CategoryUpdateForm from "@/components/Dashboard/Admin/Adverts/CategoryUpdateForm";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function CategoryUpdate() {

	const [data, setData] = useState({})
	const router = useRouter()

	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]}  color="pink.500">
				Edit categories
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
			categories to edit of  Products.
			</Text>
			<Container maxW="container.md" mx="0">
				<CategoryUpdateForm initialValues={router.query} />
			</Container>
		</Box>
	);
}

export default withAdmin(CategoryUpdate);
