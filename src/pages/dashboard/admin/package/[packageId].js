import CreatePackage from "@/components/Dashboard/Admin/Package/CreatePackage";
import EditPackage from "@/components/Dashboard/Admin/Package/EditPackage";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";

function CreateAdvert(packageId) {

	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]}  color="pink.500">
				Edit Package
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
			Edit Package offerings. All promotions created are added to the promotion table and are made active for customers.
			</Text>
			<Container maxW="container.md" mx="0">
				<EditPackage packageId={packageId} />
			</Container>
		</Box>
	);
}

export default withAdmin(CreateAdvert);
