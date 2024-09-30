import {
	Button,
	Input,
	Box,
	Flex,
	Text,
	Link as ChakraLink,
	VStack,
	Heading,
	FormControl,
	FormErrorMessage,
	FormLabel,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import { sendAdminPasswordResetLink } from "services/admin-services";

function PasswordResetForm({ admin = false }) {
	const toast = useToast();
	const initialValues = {
		email: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Kindly provide a valid email address")
			.required("Email address is required"),
	});
	const handlePasswordReset = async (
		{ email },
		{ setSubmitting, resetForm }
	) => {
		try {
			setSubmitting(true);
			await sendAdminPasswordResetLink({ email });

			toast({
				position: "top-right",
				title: "Reset link sent",
				description: "Please check your email address",
				status: "success",
				isClosable: true,
			});
			setResetLinkSent(true);
		} catch (error) {
			console.log(error);

			toast({
				position: "top-right",
				title: "Request failed",
				description: "Please try again",
				status: "error",
				isClosable: true,
			});
		} finally {
			setSubmitting(false);
		}
	};
	const [resetLinkSent, setResetLinkSent] = useState(false);
	return (
		<Box p="3" my="4">
			<Heading textAlign="center" fontSize="2xl">
				{resetLinkSent ? "Check your Email" : "Reset Password"}
			</Heading>

			<Box mt="4">
				<Formik
					initialValues={initialValues}
					onSubmit={handlePasswordReset}
					validationSchema={validationSchema}
				>
					{({ isSubmitting, isValid, dirty, values }) =>
						resetLinkSent ? (
							<VStack>
								<Text w="full" textAlign="center" my="4">
									Password Reset Link has been sent to {values.email}. Please
									click the reset link to continue.
								</Text>
								<ChakraLink
									as={Link}
									href={admin ? "/auth/admin" : "/auth/driver"}
								>
									<Button
										type="button"
										w="full"
										colorScheme="red"
										textTransform="capitalize"
									>
										Return to Log In
									</Button>
								</ChakraLink>
								<Flex mt="2" fontSize="sm" w="full">
									<Text color="gray.500" mr="2">
										Can't find any reset link?
									</Text>
									<Button
										onClick={() => setResetLinkSent(false)}
										type="button"
										colorScheme="red"
										size="sm"
										variant="link"
									>
										Resend Link
									</Button>
								</Flex>
							</VStack>
						) : (
							<Form>
								<VStack my="6">
									<Box w="full">
										<Field name="email">
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.email && form.touched.email}
												>
													<FormLabel mb="1" fontSize="sm" color="gray.500">
														Enter your email
													</FormLabel>
													<Input
														{...field}
														id="email"
														bg="white"
														type="email"
														placeholder="johndoe@example.com"
													/>
													<FormErrorMessage fontSize="xs" lineHeight="none">
														{form.errors.email}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</Box>
								</VStack>

								<Button
									disabled={isSubmitting || !isValid || !dirty}
									type="submit"
									w="full"
									colorScheme="red"
									textTransform="capitalize"
								>
									Send Reset Link
								</Button>
								<Flex mt="2" fontSize="sm">
									<Text color="gray.500" mr="2">
										Never mind,
									</Text>
									<ChakraLink
										as={Link}
										href={admin ? "/auth/admin/login" : "/auth/driver/login"}
									>
										<Button
											type="button"
											colorScheme="red"
											size="sm"
											variant="link"
										>
											Return to Log In
										</Button>
									</ChakraLink>
								</Flex>
							</Form>
						)
					}
				</Formik>
			</Box>
		</Box>
	);
}

export default PasswordResetForm;
