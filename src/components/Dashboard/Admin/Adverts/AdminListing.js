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
import withAdmin from "HOC/withAdmin";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminGetAllAdmin, deleteAdminAccount } from "services/admin-services";


function AdvertListing() {
	const router = useRouter();
	const [adverts, setAdverts] = useState([]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchAdverts = async () => {
			try {
				setLoading(true);
				const res = await adminGetAllAdmin();

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
					<Button bg="purple.100">All Admin ({adverts.length})</Button>
				</Stack>
				<Table variant="unstyled" size="sm">
					<Thead bg="gray.100">
						<Tr>
							<Th py="4">First name</Th>
							<Th py="4">Date added</Th>
							<Th py="4">Email</Th>
							<Th py="4">Actions</Th>
							<Th py="4">Role</Th>
						</Tr>
					</Thead>
					<Tbody>
						{adverts.map((_, index) => (
							<Tr
								key={index}
								bg={index % 2 ? "gray.50" : "white"}
								cursor="pointer"
							>
								<Td fontSize="sm">{_.first_name}</Td>
								<Td fontSize="sm">{ _.created_at.substring(0, 10)}</Td>
								<Td fontSize="sm">{_.email}</Td>
								<Td fontSize="sm">{_.role}</Td>
								<Td fontSize="sm">
									<ButtonGroup>
										<Button
											size="sm"
											colorScheme="red"
											variant="ghost"
											leftIcon={<DeleteIcon />}
											onClick={()=>{deleteAdminAccount({id:_.id})}}
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
		);
	}
	return (
		<Center h="full" flex="1">
			<Image src="/infographics/no-data.svg" maxW="96" w="full" />
		</Center>
	);
}

export default AdvertListing;
