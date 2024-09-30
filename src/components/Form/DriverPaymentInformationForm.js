import {
	Box,
	Flex,
	Text,
	VStack,
	Stack,
	Heading,
	Button,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CustomInput from "@/components/Form/CustomInput";
import { updateDriverProfile } from "services/driver-services";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "app/features/auth/driverSlice";
import { formatValidationErrors } from "utils";
import { banksInNigeria, VALIDATION_FAILED } from "utils/constants";
import DisplayValidationErrors from "./DisplayValidationErrors";
import PropType from "prop-types";

function DriverPaymentInformationForm({ children }) {
	const [errors, setErrors] = useState([]);
	const { user } = useSelector((state) => state.driver);
	const initialValues = {
		bank_name: user?.bank_name ?? "",
		bank_account_number: user?.bank_account_number ?? "",
	};
	const validationSchema = Yup.object({
		bank_name: Yup.string().required("Bank name is required"),
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
			const { bank_name, bank_account_number } = values;
			const {
				data: { data: user },
			} = await updateDriverProfile({ bank_name, bank_account_number });
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
									name="bank_name"
									type="select"
									// fieldProps={{ placeholder: "Bank Name" }}
								>
									<option value="">Select Bank</option>
									{banksInNigeria.map((bank) => (
										<option key={bank.id}>{bank.name}</option>
									))}
								</CustomInput>
							</Box>
							<Box w="full">
								<CustomInput
									label="Account Number"
									name="bank_account_number"
									fieldProps={{ type: "number" }}
								/>
							</Box>
						</VStack>
						{children(formikProps)}
					</Form>
				)}
			</Formik>
		</>
	);
}
DriverPaymentInformationForm.propTypes = {
	children: PropType.func.isRequired,
};
DriverPaymentInformationForm.defaultProps = {
	children: (formikProps) => (
		<Flex justify="center" mt="4">
			<Button
				isLoading={formikProps.isSubmitting}
				type="submit"
				mt="4"
				colorScheme="blackAlpha"
				textTransform="capitalize"
			>
				Save Changes
			</Button>
		</Flex>
	),
};

export default DriverPaymentInformationForm;
