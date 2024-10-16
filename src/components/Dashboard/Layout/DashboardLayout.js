import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Notification from "../Notification";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout({ children, onboarding = true, admin = true}) {

   const [toggle, setToggle] = useState(false);

	return (
		<>
		<Flex w="full" minH="100vh">
			<Box
				w="75"
				borderRightWidth="thin"
				borderColor="gray.100"
				display={["none", "none", "block"]}
				flexShrink="0"
				bg={admin ? "white" : "#414272"}
				h="100vh"
				position="sticky"
				top="0"
			>
				<DashboardSidebar onboarding={onboarding} admin={admin} />
			</Box>
			<Flex flex="1" w="full" flexDir="column">
				<Box w="full" borderBottomWidth="thin" borderBottomColor="gray.100">
					<DashboardHeader setToggle={setToggle}/>
				</Box>
				<Box
					px={["4", "4", "6"]}
					h="full"
					flex="1"
					w="full"
					py="8"
					bg="#FAFAFA"
				>
					{children}
				</Box>
			</Flex>
		</Flex>
		 <Notification display={toggle}  setDisplay={setToggle} />
</>
	);
}

export default DashboardLayout;
