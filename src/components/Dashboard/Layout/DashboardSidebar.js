import {
	Box,
	Flex,
	Text,
	VStack,
	Link as ChakraLink,
	Divider,
	Button,
	useToast,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { logoutUser } from "utils";
import { IoIosArrowDown } from "react-icons/io";
import { ChevronDownIcon } from "@chakra-ui/icons";


function DashboardSidebar({ onboarding = false, admin = false }) {
	const menuLinks = [
		{
			id: 1,
			title: "Main Menu",
			getPages: () =>
				[
					{
						id: 1,
						title: "Dashboard",
						path: "/dashboard/admin/summary",
						icon: "dashboard.svg",
					},
					{
						id: 2,
						title: "Customer",
						path: "/dashboard/admin/user",
						icon: "drivers.svg",
					},
					{
						id: 222,
						title: "Live",
						path: "/dashboard/admin/live",
						icon: "live.svg",
					},
					{
						id: 3,
						title: "Create",
						path: "/dashboard/admin/driver-point",
						icon: "create.svg",
						children: [
							{
								id: 1,
								title: "Product",
								path: "/dashboard/admin/product/create",
								icon: "drivers.svg",
							},
							{
								id: 2,
								title: "Categories",
								path: "/dashboard/admin/categories/create",
								icon: "tags.svg",
							}
						]
					},
					{
						id: 17,
						title: "Categories",
						path: "/dashboard/admin/categories",
						icon: "tags.svg",
					},
					{
						id: 17,
						title: "Product",
						path: "/dashboard/admin/product",
						icon: "bag.svg",
					},
					{
						id: 4,
						title: "Order",
						path: "/dashboard/admin/tab-management",
						icon: "order.svg",
					},
					{
						id: 5,
						title: "Transactions",
						path: "/dashboard/admin/payment",
						icon: "payment.svg",
					},
					{
						id: 8,
						title: "Statistics",
						path: "/dashboard/admin/ad-management",
						icon: "statistics.svg",
					},
					{
						id: 13,
						title: "Banner",
						path: "/dashboard/admin/management",
						icon: "banner.svg",
					},
					{
						id: 14,
						title: "Settings",
						path: "/dashboard/admin/management",
						icon: "drivers.svg",
					}
				]


		},
	];
	const router = useRouter();
	const toast = useToast();
	const handleLogout = () => {
		logoutUser();
		toast({
			position: "top-right",
			title: "Logged out successfully",
			status: "info",
			isClosable: true,
		});
	};
	return (
		<Flex h="full" flexDir="column" overflow={"scroll"} overflowX="hidden" >
			<Box
				w={170}
				h={30}
				mx="auto"
				my="3"
				px="3"
				py="3"
				rounded="md"
				mb={["80px","80px","80px","20px"]}
				role="button"
				onClick={() => router.push("/")}
			>
				<Image display={["none","none","flex","flex"]} src="/brand/logo.png" w="full" />
				<Image display={["flex","flex","none","none"]} src="/images/logo-white.png" w="full" />
			
			</Box>
			<Flex flexDir="column" justify="space-between" h="full" flex="1">
				<VStack spacing="8">
					<VStack w="full" spacing="4">
						{menuLinks.map((menuLink) => (
							<Box w="full" key={menuLink.id}>
								<Text
									fontSize={["sm", "16px"]}
									color="white"
									px="10"
									w="full"
									mb="4"
									display={menuLink.title ? "block" : "none"}
								>
									{menuLink.title}
								</Text>
								<VStack w={["full", "300px"]} px="4" spacing={["1", "1", "2"]}>
									{menuLink.getPages().map((page) => {
										const linkIsActive = router.pathname.startsWith(page.path);
										const hasChildren = page.children !== undefined;

										if (hasChildren) {
											return (
												<Menu >
													{({ isOpen }) => (
														<>
															<MenuButton
																colorScheme="blackAlpha"
																as={Button}
																bg={linkIsActive ? "pink.500" : "transparent"}
																w="full"
																_hover={{
																	bg: linkIsActive ? "pink.500" : "rgba(0,0,0,0.2)",
																}}

															>
																<Flex
																	alignItems="center"
																	justifyContent={"space-between"}
																	w="full"
																	fontWeight={linkIsActive ? "semibold" : "normal"}
																>

																	<Image
																		w="4"
																		opacity={linkIsActive ? "1" : "0.7"}
																		filter={
																			admin
																				? !linkIsActive
																					? "invert(50%)"
																					: "brightness(0) invert(1)"
																				: "none"
																		}
																		// filter="grayscale(100%)"
																		// color={
																		// 	admin && !linkIsActive ? "gray.700" : "white"
																		// }
																		src={"/icons/" + page.icon}
																	/>
																	<Text isTruncated
																		textAlign="left"
																		ml="4"
																		w="full"
																		fontSize={[12, 14, 16]}
																		color={
																			(admin && !linkIsActive) ? "gray.700" : "white"
																		}
																		opacity={linkIsActive ? "1" : "0.7"}>
																		{page.title}
																	</Text>
																	<Box color={(admin && linkIsActive) ? "white" : "gray.400"}>
																		<ChevronDownIcon width={"20px"} height={"20px"} />
																	</Box>
																</Flex>
															</MenuButton>
															<MenuList>
																{page.children.map((nestedPage) => {
																	return (
																		<Link href={nestedPage.path}>
																			<MenuItem key={nestedPage.id} as="a" >
																				{nestedPage.title}
																			</MenuItem>
																		</Link>
																	)
																})}

															</MenuList>
														</>
													)}
												</Menu>
											)
										}

										return (
											<ChakraLink as={Link} key={page.id} href={page.path}>
												<Flex
													alignItems="center"
													w="full"
													position="relative"
													align="center"
												>
													<Button
														colorScheme="blackAlpha"
														bg={linkIsActive ? "pink.500" : "transparent"}
														w="full"
														_hover={{
															bg: linkIsActive ? "pink.500" : "rgba(0,0,0,0.2)",
														}}
														fontWeight={linkIsActive ? "semibold" : "normal"}

													>
														<Image
															w="4"
															opacity={linkIsActive ? "1" : "0.7"}
															filter={
																admin
																	? !linkIsActive
																		? "invert(50%)"
																		: "brightness(0) invert(1)"
																	: "none"
															}
															// filter="grayscale(100%)"
															// color={
															// 	admin && !linkIsActive ? "gray.700" : "white"
															// }
															src={"/icons/" + page.icon}
														/>
														<Text
															isTruncated
															textAlign="left"
															ml="4"
															w="full"
															fontSize={[12, 14, 16]}
															color={
																admin && !linkIsActive ? "gray.700" : "white"
															}
															opacity={linkIsActive ? "1" : "0.7"}
														>
															{page.title}
														</Text>
														{hasChildren ?
															<Box color={"gray.800"}>
																<IoIosArrowDown />
															</Box>
															: null}
													</Button>
												</Flex>
											</ChakraLink>
										);
									})}
								</VStack>
							</Box>
						))}
					</VStack>
				</VStack>
				<Box px="6" pb={["3", "3", "6"]}>
					<Divider mb={["2", "2", "4"]} />
					<Button
						onClick={handleLogout}
						w="full"
						bg="pink.500"
						colorScheme="blackAlpha"
					>
						<Text mr="4" color="white">
							Logout
						</Text>
						<Image src="/icons/logout.svg" />
					</Button>
				</Box>
			</Flex>
		</Flex >
	);
}

export default DashboardSidebar;
