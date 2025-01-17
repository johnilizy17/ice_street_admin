import { Box, Center, Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import  Router  from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers } from "services/admin-services";
import dynamic from 'next/dynamic';
const ProductForm = dynamic(() => import('@/components/Dashboard/Admin/Adverts/ProductForm'), { ssr: false });

function CreateAdvert() {

	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	const fetchDriversadminGetAllDrivers = async (pageNumber) => {
		try {
			setLoading(true);
			const data = await adminGetAllDrivers(pageNumber);
			setData(data.data)
			setLoading(false);
		} catch (error) {
			console.log("errorr", error)
			setData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDriversadminGetAllDrivers(50)
	}, [])


	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]} color="pink.500">
				
			<Flex ml={["14px"]} mb={["29px"]} alignItems="center">
					<svg onClick={() => { Router.push("//dashboard/admin/product") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-backspace-fill" viewBox="0 0 16 16">
						<path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
					</svg>

					<Heading ml={["14px"]} fontSize="2xl" color="pink.500">
					Create Product
					</Heading>
				</Flex>
			</Heading>
			<Text ml={["14px"]} mb={["29px"]}>
				Create Product offerings. All promotions created are added to the promotion table and are made active for customers.
			</Text>
			<Container maxW="container.md" mx="0">
				{data.category ?

					<ProductForm data={data.category} />
					:
					<Center h="full" w="full" mt="8">
						<Spinner color="red" size="xl" />
					</Center>
				}
			</Container>
		</Box>
	);
}

export default withAdmin(CreateAdvert);
