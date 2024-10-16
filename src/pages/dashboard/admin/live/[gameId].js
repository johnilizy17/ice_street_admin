import EditCategory from "@/components/Dashboard/Admin/Package/EditCategory";
import EditPackages from "@/components/Dashboard/Admin/Package/EditPackages";
import { Box, Center, Container, Flex, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetSinglePackageById } from "services/admin-services";

function CreateAdvert() {

	const toast = useToast()
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(async () => {
		setLoading(true)
		if (Router.query.gameId) {
			try {
				const data = await adminGetSinglePackageById(Router.query.gameId);
				console.log(data.data)
				setData(data.data)

				toast({
					position: "top-right",
					title: "package successfully created",
					status: "success",
					isClosable: true,
				});
				setLoading(false)
			} catch (error) {
				toast({
					position: "top-right",
					title: error,
					status: "error",
					isClosable: true,
				});
				setLoading(false)
			}
		}
	}, [Router.query.gameId])

	return (
		<Box>
			<Flex ml={["14px"]} mb={["29px"]} alignItems="center">
				<svg onClick={() => { Router.push("//dashboard/admin/live") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
					<path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
				</svg>

				<Heading ml={["14px"]} fontSize="2xl" color="pink.500">
					Edit Category to Live
				</Heading>
			</Flex>
			<Text ml={["14px"]} mb={["29px"]}>
				Edit Category to Live offerings. All promotions created are added to the promotion table and are made active for customers.
			</Text>
			{
				loading ?
					<Center h="full" w="full" mt="8">
						<Spinner color="red" size="xl" />
					</Center>
					:
					<>
						<Box >
							<EditCategory datas={data.product_id} id={data.category_id} />
						</Box>
					</>
			}		</Box>
	);
}

export default withAdmin(CreateAdvert);
