import { Box, Text, VStack, Heading, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { loginUser } from "utils";
import CustomInput from "../Form/CustomInput";
import { registerDriver } from "services/driver-services";
import { useRouter } from "next/router";

function DriverSignupForm() {
	const toast = useToast();
	const router = useRouter();
	const [rememberMe, setRememberMe] = useState(false);

	const validationSchema = Yup.object({
		first_name: Yup.string().required("firstname is required"),
		last_name: Yup.string().required("lastname is required"),
		phone: Yup.string()
            .required("Phone number is required")
            .matches(
		        /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
		        "Invalid phone number"
             ),
		email: Yup.string()
			.email("Kindly provide a valid email address")
			.required("Email address is required"),
		password: Yup.string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum"),
		password_confirmation: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords do not match")
			.required("Kindly confirm the password"),
		

	});

	const registerAndLoginDriver = async (
		values,
		{ setSubmitting, resetForm }
	) => {
		try {
			setSubmitting(true);
			const {
				data: {
					data: { access_token, expires_in, user }	,
				},
			} = await registerDriver({
				email: values.email,
				password: values.password,
				password_confirmation: values.password_confirmation,
				first_name: values.first_name,
				last_name:values.last_name,
				phone:values.phone
			});
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
			const emailErr = error?.response?.data?.errors?.email
			toast({
				position: "top-right",
				title: "Signup failed",
				description: emailErr? emailErr : error?.response?.data?.message,

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
				Start making some extra earnings
			</Heading>
			<Text color="gray.500">Enter your details to proceed further</Text>
			<Box my="4">
				<Formik
					initialValues={{ email: "", password: "" ,first_name:"",last_name:"",phone:""}}
					onSubmit={registerAndLoginDriver}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<VStack my="6" spacing="4">
							    <Box w="full">
									<CustomInput
										label="First name"
										name="first_name"
										fieldProps={{ type: "first_name" }}
									/>
								</Box>
								<Box w="full">
									<CustomInput
										label="Last name"
										name="last_name"
										fieldProps={{ type: "last_name" }}
									/>
								</Box>
								<Box w="full">
									<CustomInput
										label="Phone number"
										name="phone"
										fieldProps={{ type: "phone" }}
									/>
								</Box>
								<Box w="full">
									<CustomInput
										label="Email Address"
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
								<Box w="full">
									<CustomInput
										label="Confirm Password"
										name="password_confirmation"
										fieldProps={{ type: "password" }}
									/>
								</Box>
							</VStack>

							<Button
								isDisabled={isSubmitting}
								isLoading={isSubmitting}
								type="submit"
								w="full"
								mt="4"
								colorScheme="blackAlpha"
								textTransform="capitalize"
							>
								Sign up
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}

export default DriverSignupForm;
