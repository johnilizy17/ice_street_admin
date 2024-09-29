import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
	return (
		<Box bg="gray.900" color="white">
			<Container maxW="container.xl" py="6">
				<Text textAlign="center">
					&copy; Copyright 2021 Awefun. All rights reserved
				</Text>
			</Container>
		</Box>
	);
}

export default Footer;
