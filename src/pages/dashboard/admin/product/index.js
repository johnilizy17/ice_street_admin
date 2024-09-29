import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Image,
	Input,
	Spinner,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Select,
	ButtonGroup,
	IconButton,
	Switch
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers, adminGetAllAdverter, adminUpdateProductStatus, admimDeleteProduct } from "services/admin-services";
import { FaFacebook } from 'react-icons/fa'
import { BiMenuAltLeft } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { MdPrint } from 'react-icons/md'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { cashFormat } from "@/components/cashFormat";
import ReactPaginate from "react-paginate";


function DriverManagement() {
	const router = useRouter();
	const [drivers, setDrivers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState()
	const [page, setPage] = useState(10)
	const fetchDriversadminGetAllDrivers = async (e, s) => {
		try {
			setLoading(true);
			const data = await adminGetAllAdverter(e, s);
			setDrivers(data.data);

			setLoading(false);
		} catch (error) {
			setDrivers([]);
		} finally {
			setLoading(false);
		}
	};


	const UpdateProduct = async (e, s) => {
		try {
			setLoading(true);
			const data = await adminUpdateProductStatus(e, s);
			
			fetchDriversadminGetAllDrivers(10);
			setLoading(false);
		} catch (error) {
			setDrivers([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDriversadminGetAllDrivers(10);
	}, []);

	if (loading) {
		return (
			<Center h="full" w="full" mt="8">
				<Spinner color="red" size="xl" />
			</Center>
		)
	}

	const changePage = ({ selected }) => {
		setPage(selected)
		fetchDriversadminGetAllDrivers((selected + 1) * 10, search);
	}

	const DeleteProduct = async (e) =>{
		try {
			setLoading(true);
			const deleting = await admimDeleteProduct(e);
			const data = await adminGetAllAdverter(page, search);
		
			setDrivers(data.data);

			setLoading(false);
		} catch (error) {
			setDrivers([]);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box w="100%">
			<Flex
				p={["4", "4", "8", "10"]}
				rounded="lg"
				overflow="hidden"
				bgImage="/infographics/bg/admin-summary-bg.jpg"
				bgRepeat="no-repeat"
				bgSize="cover"
				color="white"
				align="center"
				justify="space-between"
			>
				<Box>
					<Heading fontSize={["md", "lg", "md"]}>Product Management</Heading>
					<Text fontSize="md">Monitor Product statistics easily!</Text>
				</Box>
				<ButtonGroup>
					<a href="/dashboard/admin/product/create">
					<Button
						color="pink.600"
						fontSize={["12px", "14px"]}

					>
						Add Product
					</Button>
					</a>
				</ButtonGroup>
			</Flex>
			{drivers ? (
				<>
					<Flex justifyContent="space-between" p="5px 0" m="10px 5px 0px 5px" flexDir={["column", "row"]} overflowX="visible">
						<Stack spacing={[0, 5]} direction={["column", "row"]} alignItems={["normal", "center"]}>
							<Box>
								<Select fontSize="10px" bg="#F3F3F3" icon={<IoIosArrowDown />} placeholder='sort by' >
									<option value='a-z'>A-Z</option>
									<option value='z-a'>Z-A</option>
								</Select>
							</Box>
							<Flex alignItems="center">
								<Input fontSize="12px" placeholder='Search...' />
								<Button m="20px 5px" fontSize="12px">search</Button>
								<Button fontSize="12px" >clear</Button>
							</Flex>
						</Stack>

						<HStack p="10px 0 5px 0">
							{/*<HStack>
								   <Text fontSize="14px">Show</Text>
								    <Input w="30px" size="sm" type="number"  min="1" max="10"></Input>
								    <Text fontSize="14px">entries</Text>
						        </HStack>*/}
							<HStack>
								<MdPrint fontSize="20px" color="#000000" />
								<Text fontSize={["10px", "12px", "14px"]}>Print Document</Text>
							</HStack>
							<HStack >
								<BsFillCloudArrowDownFill fontSize="20px" color="#000000" />
								<Text cursor="pointer" fontSize={["12px", "14px"]} >Export as .csv</Text>
							</HStack>
						</HStack>
					</Flex>
					<Box w="100%" overflowX="auto">
						<Table variant="unstyled" w="100%" overflowY="scroll">
							<Thead bg="gray.100">
								<Tr>
									<Th>S/N</Th>

									<Th>Image</Th>
									<Th>Name</Th>
									<Th>Price</Th>
									<Th>Date Created</Th>

									<Th>Status</Th>
									
									<Th>Delete</Th>
								</Tr>
							</Thead>
							<Tbody>
								{drivers.products && drivers.products.map((driver, index) => (
									<Tr
										key={index}
										bg={index % 2 ? "gray.50" : "white"}
										cursor="pointer"
									>

										<Td fontSize="sm">
											{index}
										</Td>

										<Td fontSize="sm" onClick={() =>
											router.push(
												`/dashboard/admin/product/${driver._id}`
											)
										}>
											<Image src={driver.image} alt="product image" w="50px" />
										</Td>
										<Td fontSize="sm" onClick={() =>
											router.push(
												`/dashboard/admin/product/${driver._id}`
											)
										}>
											{driver.itemName}
										</Td>
										<Td fontSize="sm">
											{cashFormat(driver.price)}
										</Td>
										<Td fontSize="sm">
											{driver.createdAt.substring(0, 10)}
										</Td>

										<Td fontSize="sm">
											<Box onClick={() => {
												console.log(":fdfjdf")
												if (driver.status === 2) {
													UpdateProduct(driver._id, { status: 1 })
												} else {
													UpdateProduct(driver._id, { status: 2 })
												}
											}}>
												<Switch colorScheme="green" isChecked={driver.status === 2 ? true : false} />


											</Box>
										</Td>
										<Td color="red" onClick={()=>DeleteProduct(driver._id)}>
											Delete
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				</>)
				:
				<Center h="full" flex="1">
					<Image src="/infographics/no-data.svg" maxW="96" w="full" />
				</Center>
			}{
				console.log(drivers.pageNumber)}
			{drivers.pageNumber && drivers.pageNumber > 1 && <ReactPaginate
				previousLabel={"< Prev"}
				nextLabel={"Next >"}
				forcePage={page}
				pageCount={drivers.pageNumber}
				onPageChange={changePage}
				containerClassName={"paginationBtns"}
				previousLinkClassName={"prevBtn"}
				nextLinkClassName={"nextBtn"}
				disabledClassName={"paginationDisabled"}
				activeClassName={"paginationActive"}
			/>}


		</Box>
	);
}

export default withAdmin(DriverManagement);
