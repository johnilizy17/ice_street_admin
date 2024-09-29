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
	IconButton
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetAllDrivers, adminGetAllAdverter, adminGetAllPackages } from "services/admin-services";
import { FaFacebook } from 'react-icons/fa'
import { BiMenuAltLeft } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { MdPrint } from 'react-icons/md'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { cashFormat } from "@/components/cashFormat";
import ReactPaginate from "react-paginate";
import Package from '../../../../components/Packages'

function PackagesPage() {
	const router = useRouter();
	const [drivers, setDrivers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("")
	const [page, setPage] = useState(0)
	const fetchDriversadminGetAllDrivers = async (e, s) => {
		try {
			setLoading(true);
			const data = await adminGetAllPackages(e, s);
			setDrivers(data.data.category);
			setPage(data.data.pageNumber)
			setLoading(false);
		} catch (error) {
			setDrivers([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDriversadminGetAllDrivers(10, "");
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


	const SearchPage = ({ selected }) => {

		fetchDriversadminGetAllDrivers(page + 1, search);
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
					<Heading fontSize={["md", "lg", "md"]}>Package Management</Heading>
					<Text fontSize="md">Monitor Package statistics easily!</Text>
				</Box>
				<ButtonGroup>
					<Button
						onClick={() => router.push("/dashboard/admin/package/create")}
						color="pink.600"
						fontSize={["12px", "14px"]}

					>
						Add Package
					</Button>
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
								<Button m="20px 5px" fontSize="12px" onClick={SearchPage}>search</Button>
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
					<Package Items={drivers} d={true}
						fetchDriversadminGetAllDrivers={fetchDriversadminGetAllDrivers} />
				</>)
				:
				<Center h="full" flex="1">
					<Image src="/infographics/no-data.svg" maxW="96" w="full" />
				</Center>
			}
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

export default withAdmin(PackagesPage);
