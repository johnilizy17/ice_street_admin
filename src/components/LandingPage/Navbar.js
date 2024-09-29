import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Link as ChakraLink,
	Text,
	useDisclosure,
	VStack,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
	const router = useRouter();
	const pages = [
		{
			id: 1,
			title: "Home",
			url: "/",
		},
		// {
		// 	id: 2,
		// 	title: "Priavcy Policy",
		// 	url: "/privacy-policy",
		// },
		// {
		// 	id: 3,
		// 	title: "Terms and conditions",
		// 	url: "/terms-and-conditions",
		// },
	];
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<Container maxW="container.xl" py="4">
				<Flex>
					<Box w="full" role="button" onClick={() => router.push("/")}>
						<Heading fontSize="2xl" color="purple.600">
							Awefun
						</Heading>
					</Box>
					<IconButton
						variant="outline"
						onClick={onOpen}
						display={["block", "block", "none"]}
						icon={<HamburgerIcon />}
					/>
					<HStack
						spacing="8"
						w="full"
						align="center"
						display={["none", "none", "flex"]}
					>
						{pages.map((page) => {
							const linkIsActive = router.pathname === page.url;
							return (
								<ChakraLink as={Link} key={page.id} href={page.url}>
									<Text
										cursor="pointer"
										role="navigation"
										color="gray.600"
										borderBottomWidth="3px"
										borderColor={linkIsActive ? "purple.600" : "transparent"}
										fontWeight="semibold"
										fontSize="md"
									>
										{page.title}
									</Text>
									{/* {page.title} */}
								</ChakraLink>
							);
						})}
						{/* <Flex justify="flex-end" display={["none", "none", "flex"]}> */}
						<HStack>
							<Button
								variant="outline"
								onClick={() => router.push("/auth/login")}
							>
								Login
							</Button>
							<Button
								colorScheme="purple"
								onClick={() => router.push("/auth/signup")}
							>
								Sign Up
							</Button>
						</HStack>
						{/* </Flex> */}
					</HStack>
				</Flex>
			</Container>
			<Drawer isFullHeight isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent bg="white">
						<DrawerCloseButton />
						<DrawerHeader>Awefun</DrawerHeader>
						<Divider />
						<DrawerBody>
							<VStack spacing="4" w="full" align="flex-start">
								{pages.map((page) => {
									const linkIsActive = router.pathname === page.url;
									return (
										<ChakraLink
											as={Link}
											key={page.id}
											href={page.url}
											w="full"
										>
											<Text
												cursor="pointer"
												role="navigation"
												color="gray.600"
												borderBottomWidth="3px"
												borderColor={
													linkIsActive ? "purple.600" : "transparent"
												}
												fontWeight="semibold"
												fontSize="md"
											>
												{page.title}
											</Text>
											{/* {page.title} */}
										</ChakraLink>
									);
								})}
								<Button
									w="full"
									variant="outline"
									onClick={() => router.push("/auth/login")}
								>
									Login
								</Button>
								<Button
									w="full"
									colorScheme="purple"
									onClick={() => router.push("/auth/signup")}
								>
									Sign Up
								</Button>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</Box>
	);
}

export default Navbar;
