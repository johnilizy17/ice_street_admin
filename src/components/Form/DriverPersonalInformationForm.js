import { Box, Flex, VStack, Stack, Heading, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import CustomInput from "@/components/Form/CustomInput";


function DriverPersonalInformationForm({
	admin = false,
	children,
	callback = async () => null,
	initialValues = {
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
	},
}) {

	return (
		<>
			<Formik
				initialValues={initialValues}
			>
				{(formikProps) => {
					return (
						<Form>
							<VStack spacing="6" align="stretch">
								<Stack spacing="6" direction={["column", "column", "row"]}>
									<Box w="full">
										<CustomInput
											label="First Name"
											name="firstname"
											value={formikProps.values.firstname}
											fieldProps={{ type: "text", disabled: admin }}
										/>
									</Box>
									<Box w="full">
										<CustomInput
											label="Last Name"
											name="lastname"
											fieldProps={{ type: "text", disabled: admin }}
										/>
									</Box>
								</Stack>
								<Stack spacing="6" direction={["column", "column", "row"]}>
									<Box w="full">
										<CustomInput
											label="Email Address"
											name="email"
											fieldProps={{ type: "email", disabled: admin }}
										/>
									</Box>
									<Box w="full">
										<CustomInput
											label="Phone Number"
											name="phone"
											fieldProps={{
												type: "number",
												disabled: admin
											}}
										/>
									</Box>
								</Stack>
							</VStack>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}
/* DriverPersonalInformationForm.propTypes = {
	children: PropTypes.func.isRequired,
};
DriverPersonalInformationForm.defaultProps = {
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
};*/

export default DriverPersonalInformationForm;
