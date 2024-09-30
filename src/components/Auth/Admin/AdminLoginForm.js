import {
	Box,
	Flex,
	Text,
	Link as ChakraLink,
	VStack,
	Heading,
	useToast,
	FormLabel,
	Button,
	Radio,
	RadioGroup

} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import { loginUser } from "utils";
import { useRouter } from "next/router";
import { loginAdmin, userData } from "services/admin-services";
import CustomInput from "@/components/Form/CustomInput";

function AdminLoginForm() {
	const toast = useToast();
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
			console.log("hereee")
			const data = await loginAdmin({ email: values.email, password: values.password });
			
			localStorage.setItem("token", data.access_token)
			const access_token = data?.access_token
			const expires_in = new Date().getDate() + 5
			// login function for the user
			loginUser({
				token: access_token,
				expires_in,
				remember_me: rememberMe,
				});
			toast({
				position: "top-right",
				description: "Welcome back",
				status: "success",
				isClosable: true,
			});
			const redirectUrl = "/dashboard/admin/summary"
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
			console.log(err)
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Box>
			<Heading fontSize={["20px", "25px", "32px"]} mb="2" textAlign="center">
				Welcome back
			</Heading>
			<Text fontSize={["12px", "14px", "16px"]} color="gray.500" textAlign="center">
				Enter your details to proceed further
			</Text>
			<Box my="4">
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={initiateLogin}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<VStack my="6" spacing="4">
								<Box w="full">
									<CustomInput
										float
										label="Email"
										name="email"
										fieldProps={{ type: "email" }}
									/>
								</Box>
								<Box w="full">
									<CustomInput
										float
										label="Password"
										name="password"
										fieldProps={{ type: "password" }}
									/>
								</Box>

							</VStack>
							<Flex
								align="center"
								justify={["center", "space-between"]}
								w="full"
								flexDir={['column', 'row']}
								p="20px 0 40px 0"

							>
								<FormLabel m="0" htmlFor="remember-me" display="flex" alignItems="center">
									<RadioGroup onChange={(e) => setRememberMe("remember-me")} value={rememberMe} >
										<Radio colorScheme="blackAlpha" value="remember-me"></Radio>
									</RadioGroup>

									<Text ml="2" mb="2" fontWeight="400" fontSize="14px" fontFamily="Open Sans">
										Remember Email
									</Text>
								</FormLabel>
								{/* <Text color="gray.500" fontSize="sm">Forgotten password?</Text> */}
								<Box>
									<ChakraLink href="/auth/admin/reset-password">
										<Button
											type="button"
											color="rgba(255, 66, 104, 1)"
											fontSize="14px"
											variant="link"
											fontWeight='400'
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
								Sign In
							</Button>

						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}

export default AdminLoginForm;
