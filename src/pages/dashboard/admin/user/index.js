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
	Tabs, TabList, TabPanels, Tab, TabPanel, Select,
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers, adminExportDriversAsCsv, adminSearchForADriver, adminGetAllUser } from "services/admin-services";
import ReactPaginate from "react-paginate";
import { IoIosArrowDown } from 'react-icons/io'
import { MdPrint } from 'react-icons/md'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import DriverTableComponent from "@/components/Dashboard/Admin/DriverManagement/DriverTableComponent";
import UserTableComponent from "@/components/Dashboard/Admin/DriverManagement/UserTableComponet";


function DriverManagement() {
	const [drivers, setDrivers] = useState([]);
	const [pendingDrivers, setPendingDrivers] = useState([]);
	const [verifiedDrivers, setVerifiedDrivers] = useState([]);
	const [unverifiedDrivers, setUnverifiedDrivers] = useState([]);

	const [loading, setLoading] = useState(false);
	const [driversStat, setDriversStat] = useState({ total: "", pending: "", verified: "", not_verified: "" })
	const [value, setValue] = useState('')


	//Pagination
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState();
	let refresh

	const fetchDriversadminGetAllUsers = async (id, search) => {
		try {
			refresh = []
			setLoading(true);
			const { data: { data } } = await adminGetAllUser(id, search);
			setDrivers(data.users)
			setTotalPages(data.pageNumber)
			setLoading(false);
		} catch (error) {
			console.log("errorr", error)
			setDrivers([]);
		} finally {
			setLoading(false);
		}
		refresh = ""
	};



	const handleInputValue = (e) => {
		console.log(e.currentTarget.value, "value at input")
		setValue(e.currentTarget.value)

	}
	const searchBtn = async () => {
		fetchDriversadminGetAllUsers(10, value);
	}
	const clearSearch = () => {
		fetchDriversadminGetAllUsers(10, "");
	}



	const exportData = async () => {
		try {
			const resp = await adminExportDriversAsCsv()
			const url = window.URL.createObjectURL(new Blob([resp?.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `drivers_info.csv`);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.log(error, "An error occurred here")
		}
	}


	useEffect(() => {
		fetchDriversadminGetAllUsers(10, "")
	}, [refresh])

	const changePage = ({ selected }) => {
		fetchDriversadminGetAllUsers((selected + 1) * 10, value);
	}





	return (
		<Box >
			<Box
				p={["4", "4", "8", "10"]}
				rounded="lg"
				overflow="hidden"
				bgImage="/infographics/bg/admin-summary-bg.jpg"
				bgRepeat="no-repeat"
				bgSize="cover"
				color="white"
			>
				<Heading fontSize={["lg", "2xl"]}>Users Management</Heading>
				<Text fontSize={["sm", "md"]}>Monitor user statistics easily</Text>
			</Box>

			<Tabs>

				{
					loading ?
						<Box>
							<Center h="full" w="full" mt="8">
								<Spinner color="red" size="xl" />
							</Center>
						</Box>
						:
						
							drivers.length > 0 ? (
								<>
									<Flex justifyContent="space-between" p="5px 0" m="10px 5px 0px 5px" flexDir={["column", "row"]} overflowX="visible">
										<Stack spacing={[0, 5]} direction={["column", "row"]} alignItems={["normal", "center"]}>
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
											<HStack>
												<MdPrint fontSize="20px" color="#000000" />
												<Text fontSize={["10px", "12px", "14px"]}>Print Document</Text>
											</HStack>
											<HStack >
												<BsFillCloudArrowDownFill fontSize="20px" color="#000000" />
												<Text cursor="pointer" fontSize={["12px", "14px"]} onClick={exportData}>Export as .csv</Text>
											</HStack>
										</HStack>
									</Flex>
									<TabPanels>
										<TabPanel>
											<UserTableComponent drivers={drivers} />
										</TabPanel>
									</TabPanels>
								</>)
								:
								<Center h="full" flex="1">
									<Image src="/infographics/no-data.svg" maxW="96" w="full" />
								</Center>
						}
				<HStack justify="space-between" align="center">
					<Text fontSize={["10px", "12px", "15px"]} color="#1d1d3d">Showing 15 out of {totalPages}</Text>
					{totalPages > 1 && <ReactPaginate
						previousLabel={"Prev"}
						nextLabel={"Next"}
						pageCount={totalPages}
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


		</Box>
	);
}

export default withAdmin(DriverManagement);