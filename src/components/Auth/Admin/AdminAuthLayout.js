import { Flex, Container, Box, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AdminAuthLayout({ children }) {
	const [currentRoute, setCurrentRoute] = useState('Login')
	const router = useRouter();
	useEffect(() => {
		if (router.pathname == "/auth/admin/login") {
			setCurrentRoute("Login")
		} else if (router.pathname == "/auth/admin/signup") {
			setCurrentRoute("Sign Up")
		} else if (router.pathname == "/auth/admin/reset-password") {
			setCurrentRoute("Reset Password")
		}
	})
	/*const goToAuthPage = () =>
		router.push(
			router.pathname == "/auth/signup" ? "/auth/login" : "/auth/signup"
		);*/

	return (
		<Flex bgImage="url(./images/shape.png)" minH="100vh" flexDir="column" bgSize="100% `100%" bgRepeat="no-repeat" bgColor="rgba(65, 66, 114, 1)">
			<Box bg="white">
				<Container maxW="container.xl" position="relative">
					<Flex w="full" p="4">
						<Box
							h={["30px", "50px"]}
							w={"44"}
							px="3"
							py="3"
							rounded="md"
							role="button"
							onClick={() => router.push("/")}
						>
							<Image src="/brand/awefun-colored-text-logo.png" />
						</Box>
						<Text my="auto" ml={[2, 4]} fontWeight="800" fontSize={["12px", "16px"]}>
							Admin {currentRoute}
						</Text>
						{/* <Button ml="auto" variant="outline" onClick={goToAuthPage}>
							{router.pathname == "/auth/login" ? "Signup" : "Login"}
						</Button> */}
					</Flex>
				</Container>
			</Box>
			<Flex

				h="full"
				align="center"
				w="full"
				flexDir="column"
				bgImage="url(./images/shape.png)"
				flex="1"
				p="20px 0"
			>
				{children}
			</Flex>
		</Flex>
	);
}

export default AdminAuthLayout;
