import {
	FormLabel,
	Button,
	Box,
	Flex,
	Text,
	Link as ChakraLink,
	VStack,
	Heading,
	useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import { loginUser } from "utils";
import CustomInput from "../Form/CustomInput";
import { loginDriver } from "services/driver-services";
import { useRouter } from "next/router";

function DriverLoginForm() {
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Kindly provide a valid email address")
			.required("Email address is required"),
		password: Yup.string().required("Password is required"),
	});
	const initiateLogin = async (values, { setSubmitting, resetForm }) => {
		try {
			setSubmitting(true);
			const {data:{
				data
			}} = await loginDriver({ email: values.email, password: values.password });
			const access_token = data?.access_token
			const expires_in = data?.expires_in
			const user = data?.user
			//console.log('data',data,access_token, expires_in, user )
			loginUser({
				token: access_token,
				expires_in,
				remember_me: rememberMe,
				user,
			});
			toast({
				position: "top-right",
				description: "Welcome back",
				status: "success",
				isClosable: true,
			});
			const { redirect: redirectUrl = "/dashboard/driver/summary" } =
				router.query;
			router.push(redirectUrl);
			resetForm();
		} catch (error) {
			toast({
				position: "top-right",
				title: "Login failed",
				description: error?.response?.data?.message,
				status: "error",
				isClosable: true,
			});
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Box>
			<Heading fontSize="2xl" mb="2">
				Welcome back
			</Heading>
			<Text color="gray.500">Enter your details to proceed further</Text>
			<Box my="4">
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={initiateLogin}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<VStack my="8" spacing="6">
								<Box w="full">
									<CustomInput
										label="Email"
										name="email"
										fieldProps={{ type: "email" }}
									/>
								</Box>
								<Box w="full">
									<CustomInput
										label="Password"
										name="password"
										fieldProps={{ type: "password" }}
									/>
								</Box>
							</VStack>
							<Flex
								align="center"
								justify="space-between"
								flexWrap="wrap"
								w="full"
							>
								<FormLabel m="0" htmlFor="remember-me">
									<input
										type="checkbox"
										id="remember-me"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
									/>
									<Text display="inline-block" ml="2" fontSize="sm">
										Remember Email
									</Text>
								</FormLabel>
								{/* <Text color="gray.500" fontSize="sm">Forgotten password?</Text> */}
								<Box>
									<ChakraLink as={Link} href="/auth/driver/reset-password">
										<Button
											type="button"
											colorScheme="blackAlpha"
											size="sm"
											variant="link"
										>
											Recover Password
										</Button>
									</ChakraLink>
								</Box>
							</Flex>

							<Button
								isDisabled={isSubmitting}
								isLoading={isSubmitting}
								type="submit"
								w="full"
								mt="4"
								colorScheme="blackAlpha"
								textTransform="capitalize"
							>
								Log In
							</Button>
							{/* <Flex mt="2" fontSize="sm" justify="center">
                                <Text color="gray.500" mr="2">Don't have an account?</Text>
                                <ChakraLink as={Link} href="/auth/driver/signup">
                                    <Button type="button" colorScheme="red" size="sm" variant="link">Sign Up</Button>
                                </ChakraLink>
                            </Flex> */}
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}

export default DriverLoginForm;
