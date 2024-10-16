import { Flex, Container, Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function AuthLayout({ children }) {
	const router = useRouter();
	const goToAuthPage = () =>
		router.push(
			router.pathname == "/auth/driver/signup"
				? "/auth/driver/login"
				: "/auth/driver/signup"
		);
	return (
		<Flex minH="100vh">
			<Box
				w="full"
				minH="full"
				bgImg="/images/awefun-bg.jpeg"
				bgRepeat="no-repeat"
				bgSize="cover"
				bgPos="top-left"
				flex="1"
			>
				{/* <Box color="white">
                    hello
                </Box> */}
			</Box>
			<Flex
				justify="space-between"
				align="center"
				w="full"
				maxW="lg"
				flexDir="column"
			>
				<Container maxW="sm" bg="white" position="relative">
					<Flex w="full" p="4">
						<Button ml="auto" variant="outline" onClick={goToAuthPage}>
							{router.pathname == "/auth/driver/signup" ? "Login" : "Signup"}
						</Button>
					</Flex>
				</Container>
				<Container maxW="sm" bg="white" position="relative">
					{children}
				</Container>
				<Box w="full" bg="#414272" p="4" color="white">
					<Text textAlign="center">©2020. Awefun. All Rights Reserved</Text>
				</Box>
			</Flex>
		</Flex>
	);
}

export default AuthLayout;
