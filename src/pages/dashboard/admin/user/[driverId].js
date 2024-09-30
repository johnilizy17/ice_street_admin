import DriverHistory from "@/components/Dashboard/Admin/DriverManagement/DriverHistory";
import DriverInformation from "@/components/Dashboard/Admin/DriverManagement/DriverInformation";
import DriverTabInformation from "@/components/Dashboard/Admin/DriverManagement/DriverTabInformation";
import {
	Box,
	Center,
	Circle,
	Flex,
	Heading,
	HStack,
	Img,
	Image,
	Spinner,
	Stack,
	StackDivider,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";
import { adminGetDriverProfile ,driversGetPoints,driversWithdrawals,getDriversPayoutInfo} from "services/admin-services";
import {FaMoneyBillWaveAlt} from 'react-icons/fa'
import {MdSmartphone} from 'react-icons/md'
import {HiCursorClick} from 'react-icons/hi'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useRouter } from "next/router";
import DriverPaymentInformation from "@/components/Dashboard/Account/DriverPaymentInformation";
import DriverPaymentRecords from "@/components/Dashboard/Admin/DriverManagement/DriverPaymentRecords";
import { set } from "nprogress";
import { cashFormat } from "@/components/cashFormat";


function SingleDriverManagement({ driverId }) {
	
	const [driver, setDriver] = useState({});
	const [loading, setLoading] = useState(false);

	const [points, setPoints] = useState()
	const [Info, setInfo] = useState()
	
	const router = useRouter()

	
	useEffect(() => {
		const fetchDriver = async () => {
			try {
				setLoading(true);
				const res = await adminGetDriverProfile(driverId);
			console.log(res)
				setDriver(res);
			} catch (error) {
				setDriver({});
			} finally {
				setLoading(false);
			}
		};
		fetchDriver()
	}, []);

	
	const tabs = [
		{
			title: "User Info.",
			component: <DriverInformation driver={driver.user} delivery={driver.delivery} />,
		},
		{
			title: "User Payment Info",
			component: <DriverPaymentRecords id={driverId}/>
		},
		/*{
			title: "Tab Info.",
			component: <DriverTabInformation driver={driver} driver_id={driverId} />,
		},
		{
			title: "History",
			component: <DriverHistory driver={driver} />,
		},*/
	];
	if (loading) {
		return (
			<Center w="full" h="full">
				<Spinner color="red" size="xl" />
			</Center>
		);
	}
	return (
		<Box>
			<span onClick={() =>router.push(`/dashboard/admin/driver-management`)} style={{margin:"30px 0"}}><AiOutlineArrowLeft fontSize={25} color="#414272" /></span>
			<Box
				px={["4", "4", "8", "10"]}
				py={["4", "4", "8"]}
				rounded="lg"
				overflow="hidden"
				position="relative"
				color="white"
				bg="linear-gradient(-90deg, #FF4268 10.94%, #414272 94.6%)"
			>
				<Stack mb="8" w="100%" direction="row" justify="space-between" align="center">
					<HStack>
						<Circle size={["5","10"]} bg="gray.400" />
						<Heading fontSize={["15px","md","lg","2xl"]}>
							{driver.user && driver.user.firstname + " " + driver.user.lastname}
						</Heading>
					</HStack>
					<Box>
						<HStack
							bg="white"
							rounded="full"
							py="0.5"
							pl="3"
							pr="1"
							align="center"
						>
							<Text fontSize={["10px","12px"]} color="gray.600">
								{driver.user && driver.user. status ==="verified"? "active": driver.status==="pending"? "pending": "not active"}
							</Text>
						</HStack>
					</Box>
				</Stack>
				<Stack justifyContent="center" direction={["column", "column", "column","row"]}>
				 {  driver.status !== "verified" && <Box
						p="4"
						bg="white"
						rounded="md"
						color="gray.600"
						w="full"
						maxW="64"
						flex="4"
					>
					    <Box mt="20">
					       <Text color="#001242" fontSize={["10px","sm"]}>Pending Tasks</Text>
					      {driver.status ==="not-verified" && <Flex alignItems="center"><Image src="/brand/loading-status.png"/><Text> Verfication</Text>
						   </Flex>}
					       <Flex alignItems="center"><Image src="/brand/loading-status.png"/><Text fontSize={["10px","sm"]}> Register & Assign new tablet</Text></Flex>
					    </Box>
						
					</Box>}
					<Box
						p="4"
						bg="rgba(255,255,255,0.1)"
						rounded="md"
						color="gray.600"
						w="full"
						maxW="64"
						flex="4"
					>
						<Circle color="#FFFFFF" size="10" bg="rgba(255, 255, 255, 0.13)" rounded="full" mr="4"><FaMoneyBillWaveAlt/></Circle> 
						<Heading fontSize="2xl" mt="4" color="white">
						{cashFormat(Math.round(driver?.wallet ? driver?.wallet.amount : "0"))} Wallet
						</Heading>
						<Stack
							justify="space-between"
							direction="row"
							align="center"
							mt="4"
						>
							{/*<Text fontSize="sm" color="white" >Balance</Text>
							    <Text fontSize="sm" color="white" >80/100 pts</Text>*/}
						</Stack>
					</Box>
					<Stack
						divider={<StackDivider/>}
						direction={["column", "column", "column","row"]}
						py="4"
						bg="linear-gradient(#955086 0%, #E66081 100%)"
						rounded="md"
						color="white"
					>
						<Box px="4" w="full">
							<Circle
								size="10"
								bg="rgba(255,255,255,0.2)"
								rounded="full"
								mr="4"
							> <MdSmartphone/>
						    </Circle>
							<Heading fontSize="2xl" mt="4">
								{driver.package}
							</Heading>
							<Text mt="4" fontSize="sm">
								No Orders
							</Text>
						</Box>
						<Box px="4" w="full">
							<Circle
								size="10"
								bg="rgba(255,255,255,0.2)"
								rounded="full"
								mr="4"> 
								<MdSmartphone/>
							</Circle>
							<Heading fontSize="2xl" mt="4">
								{driver?.transaction}
							</Heading>
							<Text mt="4" fontSize="sm">
								No tranaction
							</Text>
						</Box>
						 
					</Stack>
				</Stack>
			</Box>
			<Tabs variant="unstyled" mt="8" isLazy>
				<TabList
					align="center"
					// spacing="8"
					mb="4"
					// justifyContent="space-between"
					p="1"
					borderColor="purple.500"
					borderWidth="2px"
					borderRadius="md"
					w="fit-content"
				>
					{tabs.map((item, index) => (
						<Tab
							key={index}
							color="gray.600"
							// bg="gray.100"
							_selected={{ color: "white", bg: "purple.500" }}
							py="2"
							px="4"
							rounded="md"
							_notFirst={{ ml: "4" }}
						>
							<Text mb="1" textTransform="uppercase">
								{item.title}
							</Text>
						</Tab>
					))}
				</TabList>
				<TabPanels>
					{tabs.map((item, index) => (
						<TabPanel key={index} p="0">
							<Box>{item.component}</Box>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Box>
	);
}

export default withAdmin(SingleDriverManagement);

export async function getServerSideProps(ctx) {
	return {
		props: { driverId: ctx.query?.driverId ?? "" },
	};
}
