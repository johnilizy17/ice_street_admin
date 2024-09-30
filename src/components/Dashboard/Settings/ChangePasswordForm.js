import { Box, Flex, Text, VStack, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CustomInput from "@/components/Form/CustomInput";
import { changeDriverPassword } from "services/driver-services";
import { useState } from "react";

function ChangePasswordForm() {
	const [errors, setErrors] = useState([]);
	const initialValues = {
		current_password: "",
		password: "",
		password_confirmation: "",
	};
	const validationSchema = Yup.object({
		current_password: Yup.string().required("Current password is required"),
		password: Yup.string().required("Password is required"),
		password_confirmation: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords do not match")
			.required("Kindly confirm the password"),
	});
	const toast = useToast();
	const initiateLogin = async (values, { setSubmitting, resetForm }) => {
		try {
			setErrors([]);
			setSubmitting(true);
			const { current_password, password, password_confirmation } = values;
			await changeDriverPassword({
				current_password,
				password,
				password_confirmation,
			});
			resetForm();
			toast({
				description: "Password changed",
				position: "top-right",
				status: "success",
			});
		} catch (error) {
			let displayErrors = [];
			const errorSummary =
				error?.response?.data?.message ??
				"An error occured changing your password";

			toast({
				description: errorSummary,
				position: "top-right",
				status: "error",
			});

			/* Checking if the error summary is "Validation failed" and if it is, it will set the
            errors to the displayErrors array. */
			if (errorSummary == "Validation failed") {
				const validationErrors = error?.response?.data?.errors ?? {};
				if (validationErrors && Object.entries(validationErrors).length > 0) {
					Object.values(validationErrors).forEach((validationErrorField) => {
						if (
							validationErrorField &&
							Array.isArray(validationErrorField) &&
							validationErrorField.length > 0
						) {
							validationErrorField.forEach((errorMessage) => {
								displayErrors.push(errorMessage);
							});
						}
					});
				}
				setErrors(displayErrors);
			}
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<>
			{errors && errors.length > 0 && (
				<Box mb="8" borderColor="red" borderWidth="thin" p="2" rounded="md">
					{errors.map((error) => (
						<Text color="red" fontSize="sm">
							{error}
						</Text>
					))}
				</Box>
			)}
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				onSubmit={initiateLogin}
				validationSchema={validationSchema}
			>
				{({ values, isSubmitting, isValid, dirty }) => (
					<Form>
						<VStack spacing="4">
							<Box w="full">
								<CustomInput
									label="Current Password"
									name="current_password"
									fieldProps={{ type: "password" }}
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
							<Text fontSize="sm" color="gray.500">
								8 characters or longer. Combine upper and lowercase letters and
								numbers.
							</Text>
						</VStack>
						<Flex justify="center" mt="4">
							<Button
								isLoading={isSubmitting}
								type="submit"
								mt="4"
								colorScheme="blackAlpha"
								textTransform="capitalize"
							>
								Save Changes
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default ChangePasswordForm;
