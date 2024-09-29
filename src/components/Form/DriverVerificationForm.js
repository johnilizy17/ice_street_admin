import {
	Button,
	Box,
	Flex,
	Text,
	VStack,
	Stack,
	Heading,
	Center,
	Image,
	useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CustomInput from "@/components/Form/CustomInput";
import { updateDriverProfile } from "services/driver-services";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "app/features/auth/driverSlice";
import { formatValidationErrors } from "utils";
import { VALIDATION_FAILED } from "utils/constants";
import DisplayValidationErrors from "./DisplayValidationErrors";
import PropType from "prop-types";

function DriverVerificationForm({ children }) {
	const [errors, setErrors] = useState([]);
	const {
		user: { verification_type = "", bank_account_number = "" },
	} = useSelector((state) => state.driver);
	const initialValues = { verification_type, bank_account_number };
	const validationSchema = Yup.object({
		verification_type: Yup.string().required("Verification type is required"),
		bank_account_number: Yup.number()
			.integer()
			.required("Account number is required"),
	});
	const toast = useToast();
	const dispatch = useDispatch();
	const handleProfileUpdate = async (values, { setSubmitting }) => {
		try {
			setErrors([]);
			setSubmitting(true);
			const { verification_type, bank_account_number } = values;
			const {
				data: { data: user },
			} = await updateDriverProfile({ verification_type, bank_account_number });
			dispatch(setUser(user));
			toast({
				description: "Profile updated successfully",
				position: "top-right",
				status: "success",
			});
		} catch (error) {
			const errorSummary =
				error?.response?.data?.message ??
				"An error occured updating your profile";
			toast({
				description: errorSummary,
				position: "top-right",
				status: "error",
			});

			if (errorSummary === VALIDATION_FAILED) {
				const validationErrors = formatValidationErrors(error);
				setErrors(validationErrors);
			}
			throw error;
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<>
			<DisplayValidationErrors errors={errors} />
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				onSubmit={handleProfileUpdate}
				validationSchema={validationSchema}
			>
				{(formikProps) => (
					<Form>
						<VStack spacing="6" align="stretch">
							<Box w="full">
								<CustomInput
									name="verification_type"
									type="select"
									fieldProps={{ placeholder: "Select ID Type" }}
								>
									<option>Driver's License</option>
									<option>Passport</option>
									<option>National ID</option>
								</CustomInput>
							</Box>
							<Box w="full">
								<Center bg="purple.50" p="4" rounded="md" flexDir="column">
									<Image w="10" src={"/icons/upload.svg"} />
									<Text my="3">Upload File</Text>
									<Button bg="purple.500" colorScheme="purple">
										Upload File
									</Button>
								</Center>
							</Box>
						</VStack>
						{children(formikProps)}
					</Form>
				)}
			</Formik>
		</>
	);
}
DriverVerificationForm.propTypes = {
	children: PropType.func.isRequired,
};
DriverVerificationForm.defaultProps = {
	children: (formikProps) => (
		<Flex justify="center" mt="4">
			<Button
				isLoading={formikProps.isSubmitting}
				type="submit"
				mt="4"
				colorScheme="pink"
				textTransform="capitalize"
			>
				Save Changes
			</Button>
		</Flex>
	),
};

export default DriverVerificationForm;
