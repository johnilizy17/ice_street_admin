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
	Text,
	Tabs, TabList, TabPanels, Tab, TabPanel, Select, ButtonGroup, IconButton,
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers, adminExportDriversAsCsv, adminSearchForADriver, adminGetAllPoints, adminGetAllUserPackage, adminGetAllOffline } from "services/admin-services";
import ReactPaginate from "react-paginate";
import { IoIosArrowDown } from 'react-icons/io'
import { MdPrint } from 'react-icons/md'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import PaymentTable from "@/components/Dashboard/Admin/DriverManagement/PaymentTable";
import { useRouter } from "next/router";
import OfflineTable from "@/components/Dashboard/Admin/DriverManagement/OfflineTable";
import PackagesTable from "@/components/Dashboard/Admin/DriverManagement/Packages";


function DriverManagement() {
	const [drivers, setDrivers] = useState([]);
	const [data, setData] = useState([]);
	const [pendingDrivers, setPendingDrivers] = useState([]);
	const [verifiedDrivers, setVerifiedDrivers] = useState([]);
	const [unverifiedDrivers, setUnverifiedDrivers] = useState([]);

	const [loading, setLoading] = useState(false);
	const [driversStat, setDriversStat] = useState({ total: "", pending: "", verified: "", not_verified: "" })
	const [value, setValue] = useState('')
	const [typestate, setTypeState] = useState()

	const router = useRouter()

	//Pagination
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState();


	const fetchDriversadminGetAllDrivers = async (pageNumber, type) => {
		setTypeState(type)
		try {
			setLoading(true);
			const dataw = await adminGetAllUserPackage(pageNumber, type);
			console.log(dataw?.data.package)
			setData(dataw?.data.package)
			setLoading(false);
		} catch (error) {
			console.log("errorr", error)
		
		} finally {
			setLoading(false);
		}
	};


	const fetchDriversadminGetAllOffline = async (pageNumber, type) => {
		setData([])
		try {
			setLoading(true);
			const datas = await adminGetAllOffline(pageNumber, type);
			datas.data.offline && setDrivers([...datas?.data.offline])
			console.log(datas.data.offline)
			setLoading(false);
		} catch (error) {
			console.log("errorr", error)
		} finally {
			setLoading(false);
		}
	};

	const sortedAscending = (data) => {

		let dataCopy = [...data]
		const sorted = dataCopy.sort((a, b) => {
			let fa = a.first_name.toLowerCase(),
				fb = b.first_name.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});

		return sorted
	}

	const sortedDescending = (data) => {

		let dataCopy = [...data]
		const sorted = dataCopy.sort((a, b) => {
			let fa = a.first_name.toLowerCase(),
				fb = b.first_name.toLowerCase();

			if (fb < fa) {
				return -1;
			}
			if (fb > fa) {
				return 1;
			}
			return 0;
		});

		return sorted
	}
	const handleSelectValue = (e) => {
		console.log(e.currentTarget.value, "valueeee")
		if (e.currentTarget.value === "a-z") {

			//sort all drivers in ascending order
			const allDriversSorted = sortedAscending(drivers)
			console.log(allDriversSorted, "sorted drivers")
			setDrivers(allDriversSorted)

			//sort verified drivers in ascending order
			const verifiedDriversSorted = sortedAscending(verifiedDrivers)
			console.log(verifiedDriversSorted)
			setVerifiedDrivers(verifiedDriversSorted)

			//sort not_verified drivers in ascending order
			const unverifiedDriversSorted = sortedAscending(unverifiedDrivers)
			setUnverifiedDrivers(unverifiedDriversSorted)
			console.log(unverifiedDriversSorted)

			//sort pending drivers in ascending order
			const pendingDriversSorted = sortedAscending(pendingDrivers)
			console.log(pendingDriversSorted)
			setPendingDrivers(pendingDriversSorted)

		} else if (e.currentTarget.value === "z-a") {

			//sort all drivers in descending
			const result = sortedDescending(drivers)
			console.log(result)
			//setDrivers(sortedDescending)

			//sort all drivers in Descending order
			const allDriversSorted = sortedDescending(drivers)
			console.log(allDriversSorted, "sorted drivers")
			setDrivers(allDriversSorted)

			//sort verified drivers in Descending order
			const verifiedDriversSorted = sortedDescending(verifiedDrivers)
			console.log(verifiedDriversSorted)
			setVerifiedDrivers(verifiedDriversSorted)

			//sort not_verified drivers in Descending order
			const unverifiedDriversSorted = sortedDescending(unverifiedDrivers)
			setUnverifiedDrivers(unverifiedDriversSorted)
			console.log(unverifiedDriversSorted)

			//sort pending drivers in Descending order
			const pendingDriversSorted = sortedDescending(pendingDrivers)
			console.log(pendingDriversSorted)
			setPendingDrivers(pendingDriversSorted)
		}
	}

	const handleInputValue = (e) => {
		console.log(e.currentTarget.value, "value at input")
		setValue(e.currentTarget.value)

	}
	const searchBtn = async () => {
		console.log(value, "event for search")
		if (value.trim() === "") {
			return
		}
		try {
			const { data: { data } } = await adminSearchForADriver({ search: value, id: pageNumber })
			console.log(data, "result")

		} catch (error) {
			console.log(error, "an error occurred")

		}
	}
	const clearSearch = () => {
		fetchDriversadminGetAllDrivers(10, "");
	}


	useEffect(() => {
		window.scroll(0, 0);
		fetchDriversadminGetAllDrivers(10, "")
	}, [pageNumber])

	const changePage = ({ selected }) => {
		fetchDriversadminGetAllDrivers(selected + 1*10, typestate);
	}





	return (
		<Box >
			<Flex
				p={["4", "4", "8", "10"]}
				rounded="lg"
				overflow="hidden"
				bgImage="/infographics/bg/admin-summary-bg.jpg"
				bgRepeat="no-repeat"
				bgSize="cover"
				color="white"
				justifyContent={"space-between"}
				alignItems="center"
			>
				<Box>
					<Heading fontSize={["lg", "2xl"]}>Order</Heading>
					<Text fontSize={["sm", "md"]}>Monitor The order statistics easily</Text>
				</Box>
			</Flex>

			{drivers ? (
				<>
					<Tabs>
						<TabList p="10px 0 3px 0" mt="20px" display="flex" overflowX="visible" overflowY="hidden">
						<Tab onClick={() => { fetchDriversadminGetAllDrivers(10, "") }} fontSize={["10px", "14px", "16px"]}>ALL<Box bg="blackAlpha" p={["2px 5px", "3px 10px"]} fontSize="10px" borderRadius="5px" m="10px" color="white">{driversStat.verified}</Box></Tab>
							<Tab onClick={() => { fetchDriversadminGetAllDrivers(10, "paying") }} fontSize={["10px", "14px", "16px"]} > Active<Box bg="#414272" p={["2px 5px", "3px 10px"]} fontSize="10px" borderRadius="5px" m="10px" color="white">{driversStat.total}</Box> </Tab>
							<Tab onClick={() => { fetchDriversadminGetAllDrivers(10, "pending") }} fontSize={["10px", "14px", "16px"]}>Pending<Box bg="yellow" p={["2px 5px", "3px 10px"]} fontSize="10px" borderRadius="5px" m="10px" color="white">{driversStat.verified}</Box></Tab>
							<Tab onClick={() => { fetchDriversadminGetAllDrivers(10, "confirmed") }} fontSize={["10px", "14px", "16px"]}>Completed<Box bg="green" p={["2px 5px", "3px 10px"]} fontSize="10px" borderRadius="5px" m="10px" color="white">{driversStat.verified}</Box></Tab>
						</TabList>

						{
							loading ?
								<Box>
									<Center h="full" w="full" mt="8">
										<Spinner color="red" size="xl" />
									</Center>
								</Box>
								:
								<>
									<Flex justifyContent="space-between" p="5px 0" m="10px 5px 0px 5px" flexDir={["column", "row"]} overflowX="visible">
										<Stack spacing={[0, 5]} direction={["column", "row"]} alignItems={["normal", "center"]}>
											<Box>
												<Select fontSize="10px" bg="#F3F3F3" icon={<IoIosArrowDown />} placeholder='sort by' onChange={handleSelectValue} >
													<option value='a-z'>A-Z</option>
													<option value='z-a'>Z-A</option>
												</Select>
											</Box>
											<Flex alignItems="center">
												<Input fontSize="12px" placeholder='Search...' onChange={handleInputValue} />
												<Button m="20px 5px" fontSize="12px" onClick={searchBtn}>search</Button>
												<Button fontSize="12px" onClick={clearSearch}>clear</Button>
											</Flex>
										</Stack>

										<HStack p="10px 0 5px 0">
											{/*<HStack>
								   <Text fontSize="14px">Show</Text>
								    <Input w="30px" size="sm" type="number"  min="1" max="10"></Input>
								    <Text fontSize="14px">entries</Text>
						        </HStack>*/}
											<HStack >
												<BsFillCloudArrowDownFill fontSize="20px" color="#000000" />
												<Text cursor="pointer" fontSize={["12px", "14px"]}>Export as .csv</Text>
											</HStack>
										</HStack>
									</Flex>
									<TabPanels>
										<TabPanel>
											<PackagesTable drivers={data} fetchDriversadminGetAllDrivers={fetchDriversadminGetAllDrivers} />
										</TabPanel>

										<TabPanel>
											<PackagesTable drivers={data} fetchDriversadminGetAllDrivers={fetchDriversadminGetAllDrivers} />
										</TabPanel>
										<TabPanel>
											<PackagesTable drivers={data} fetchDriversadminGetAllDrivers={fetchDriversadminGetAllDrivers} />
										</TabPanel>
										<TabPanel>
											<PackagesTable drivers={data} fetchDriversadminGetAllDrivers={fetchDriversadminGetAllDrivers} />
										</TabPanel>

									</TabPanels>
								</>
						}
						{data.pageNumber && data.pageNumber >1	&& <ReactPaginate
										previousLabel={"Prev"}
										nextLabel={"Next"}
										pageCount={data.pageNumber}
										onPageChange={changePage}
										containerClassName={"paginationBtns"}
										previousLinkClassName={"prevBtn"}
										nextLinkClassName={"nextBtn"}
										disabledClassName={"paginationDisabled"}
										activeClassName={"paginationActive"}
									/>}

						<HStack justify="space-between" align="center">
							<Text fontSize={["10px", "12px", "15px"]} color="#1d1d3d">Showing 15 out of {totalPages}</Text>
							{totalPages > 1 && <ReactPaginate
								previousLabel={"Prev"}
								nextLabel={"Next"}
								pageCount={totalPages > 15 ? 15 : totalPages}
								onPageChange={changePage}
								containerClassName={"paginationBtns"}
								previousLinkClassName={"prevBtn"}
								nextLinkClassName={"nextBtn"}
								disabledClassName={"paginationDisabled"}
								activeClassName={"paginationActive"}
							/>
							}

						</HStack>
					</Tabs>

				</>)
				:
				<Center h="full" flex="1">
					<Image src="/infographics/no-data.svg" maxW="96" w="full" />
				</Center>
			}

		</Box>
	);
}

export default withAdmin(DriverManagement);