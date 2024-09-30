import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Heading,
	Image,
	Spinner,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetAllAdverts } from "services/admin-services";


function AdvertListing() {
	const router = useRouter();
	const [adverts, setAdverts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchAdverts = async () => {
			try {
				setLoading(true);
				const res = await adminGetAllAdverts();

				console.log(res)
				setAdverts(res?.data?.data ?? []);
			} catch (error) {
				setAdverts([]);
			} finally {
				setLoading(false);
			}
		};
		fetchAdverts();
	}, []);
	if (loading) {
		return (
			<Center h="full" w="full" mt="8">
				<Spinner color="red" size="xl" />
			</Center>
		);
	}
	if (adverts && adverts.length > 0) {
		return (
			<Box>
				<Stack direction="row" my="4">
					<Button bg="purple.100" fontSize={["12px","14px"]}>All Adverts ({adverts.length})</Button>
					<Button variant="ghost" fontSize={["12px","14px"]}>Active ({adverts.length})</Button>
					<Button variant="ghost" fontSize={["12px","14px"]}>Inactive Ads(0)</Button>
				</Stack>
			 <Box w="100%" overflowX="auto">
				<Table variant="unstyled" w="100%" size="sm" overflowX="scroll">
					<Thead bg="gray.100">
						<Tr>
							<Th py="4">Brand</Th>
							<Th py="4">Ad type</Th>
							<Th py="4">Date added</Th>
							<Th py="4">Status</Th>
							<Th py="4">Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{adverts.map((_, index) => (
							<Tr
								key={index}
								bg={index % 2 ? "gray.50" : "white"}
								onClick={() =>
									router.push({pathname:`/dashboard/admin/adverts/${_.id}`, query:_})
								}
								cursor="pointer"
							>
								<Td fontSize="sm">{_.organisation_name}</Td>
								<Td fontSize="sm">{_.ad_type}</Td>
								<Td fontSize="sm">{ _.created_at.substring(0, 10)}</Td>
								<Td fontSize="sm">{_.status}</Td>
								<Td fontSize="sm">
									<ButtonGroup>
										<Button size="sm" variant="ghost" leftIcon={<EditIcon />}>
											Edit
										</Button>
										<Button
											size="sm"
											colorScheme="red"
											variant="ghost"
											leftIcon={<DeleteIcon />}
										>
											Delete
										</Button>
									</ButtonGroup>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			  </Box>
			</Box>
		);
	}
	return (
		<Center h="full" flex="1">
			<Image src="/infographics/no-data.svg" maxW="96" w="full" />
		</Center>
	);
}

export default AdvertListing;
