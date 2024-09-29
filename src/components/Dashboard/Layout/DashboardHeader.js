import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	useToast,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Box,
	Flex,
	Heading,
	HStack,
	Text,
	useDisclosure,
	IconButton,
	Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { logoutUser } from "utils";
import DashboardSidebar from "./DashboardSidebar";

function DashboardHeader({setToggle}) {
	const { user } = useSelector((state) => state.driver);
	const { isOpen, onOpen, onClose } = useDisclosure();
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
		<HStack p="4" shadow="sm" spacing="6">
			<IconButton
				variant="outline"
				onClick={onOpen}
				display={["block", "block", "none"]}
				icon={<HamburgerIcon />}
			/>
			<Drawer isFullHeight isOpen={isOpen} placement="left" onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent bg="#414272" px="0">
						<DrawerCloseButton />
						<DrawerBody px="0">
							<DashboardSidebar />
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
			<Flex flex="1" justify="center">
				{/* <Input d={["none", "none", "block"]} placeholder="Search" size="sm" rounded="md" bg="gray.100" maxW="md" /> */}
			</Flex>
			<HStack alignItems="center">
			<Box mr="20px" position="relative" width="25px" height="30px" onClick={()=>setToggle(true)}>
								<Center bg="pink.500" top="-4px" right="0px" borderRadius="99px" width="15px" height="15px" fontSize="10px" position="absolute" color="#fff">
									1
								</Center>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#414272" class="bi bi-bell-fill" viewBox="0 0 16 16">
									<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
								</svg>
							</Box>
				<Menu>
					<MenuButton>
						<Flex align="center">
							
							<Box w="7" h="7" bg="gray.400" rounded="full"></Box>
							<Text mx="2">
								{user?.firstname ?? ""} {user?.lastname ?? ""}
							</Text>
							<ChevronDownIcon />
						</Flex>
					</MenuButton>
					<MenuList>
						{/* <MenuItem borderBottomWidth="thin">
							<Box>
								<Heading fontSize="sm" color="red.600">
									{user?.first_name ?? ""} {user?.last_name ?? ""}
								</Heading>
							</Box>
						</MenuItem>
						<MenuItem
							fontSize="sm"
							onClick={() => router.push("/dashboard/settings")}
						>
							Settings
						</MenuItem> */}
						<MenuItem onClick={handleLogout} fontSize="sm">
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</HStack>
	);
}

export default DashboardHeader;
