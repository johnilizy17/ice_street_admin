import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

function TabCollectionCenters() {
	return (
		<>
			<Text mb="4">
				See all our Outlets. Come in to get your Tablet and installation
			</Text>
			<SimpleGrid columns={["1", "2", "4"]} spacing="4">
				{Array(6)
					.fill("")
					.map((_, index) => {
						return (
							<Box p="4" key={index} rounded="md" shadow="md" bg="white">
								<Heading fontSize="lg" fontWeight="medium" mb="1">
									Yaba
								</Heading>
								<Text color="gray.600" fontSize="sm">
									Suite 12, 2nd Floor, Pavillon Towers, 123 Herbert Macaulay
									Way, Yaba, Lagos State
								</Text>
							</Box>
						);
					})}
			</SimpleGrid>
		</>
	);
}

export default TabCollectionCenters;
