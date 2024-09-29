import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";

function DriverHistory() {
	return (
		<Box>
			<Box borderWidth="thin" py="6" px="4" borderRadius="md" mt="4">
				<Heading
					fontWeight="semibold"
					fontSize="sm"
					textTransform="uppercase"
					mb="8"
				>
					Activity History
				</Heading>

				<Table variant="unstyled">
					<Thead bg="gray.100">
						<Tr>
							<Th>Date/Time</Th>
							<Th>Description</Th>
						</Tr>
					</Thead>
					<Tbody>
						{Array(10)
							.fill("")
							.map((_, index) => (
								<Tr key={index} bg={index % 2 ? "gray.50" : "white"}>
									<Td fontSize="sm">Jul 21, 2021/9:00 AM</Td>
									<Td fontSize="sm">You hit 100 points</Td>
								</Tr>
							))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
}

export default DriverHistory;
