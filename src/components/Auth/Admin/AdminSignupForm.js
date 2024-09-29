import { Box, Text, VStack, Heading, Button, useToast, Img,Radio, RadioGroup, Center,Flex,FormLabel,Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/router";
import CustomInput from "@/components/Form/CustomInput";
import Link from "next/link";
import {registerAdmin} from "services/admin-services"

function AdminSignupForm(){
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

	const registerAndLoginAdmin = async (
		values,
		{ setSubmitting, resetForm }
	) => {
		try {
			setSubmitting(true);
			const data = await registerAdmin({
				email: values.email,
				password: values.password,
				password_confirmation: values.password_confirmation,
				first_name: values.first_name,
				last_name:values.last_name,
				phone:values.phone
			});
            console.log(data, 'dataa')
			toast({
				position: "top-right",
				description: "Registration Successful",
				status: "success",
				isClosable: true,
			});
			const { redirect: redirectUrl = "/auth/admin/login" } =
				router.query;
			router.push(redirectUrl);
			resetForm();
		} catch (error) {
            console.log(error.response, "erorrrrrr")
			const emailErr = error?.response?.data?.errors?.email
            const phoneErr = error?.response?.data?.errors.phone
			toast({
				position: "top-right",
				title: "Signup failed",
				description: (emailErr || phoneErr)? (emailErr || phoneErr) : error?.response?.data?.message,

				status: "error",
				isClosable: true,
			});
		} finally {
			setSubmitting(false);
		}
	};

    return(
        <>
        <Box>
			<Heading fontSize={["20px","25px","32px"]} mb="2" textAlign="center">
				Let's Get You Started
			</Heading>
			<Text fontSize={["12px","14px","16px"]} color="gray.500" textAlign="center">
				Enter your details to proceed further
			</Text>
			<Box my="4">
				<Formik
					initialValues={{ email: "", password: "" ,first_name:"",last_name:"",phone:"" }}
					onSubmit={registerAndLoginAdmin}
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
								colorScheme="pink"
								textTransform="capitalize"
							>
								Sign In
							</Button>
							 <Flex mt="2" fontSize="sm" justify="center">
                                <Text color="gray.500" mr="2" fontSize={["10px","12px"]}>Already have an account?</Text>
                                <ChakraLink as={Link} href="/auth/admin/login">
                                    <Button type="button" colorScheme="red" size="sm" variant="link" fontSize={["10px","12px"]}>login</Button>
                                </ChakraLink>
                            </Flex>
							 
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
        </>
    )
}

export default AdminSignupForm