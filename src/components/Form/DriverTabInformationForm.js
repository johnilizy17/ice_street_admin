import { Box, Flex, VStack, Stack, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import CustomInput from "@/components/Form/CustomInput";


function DriverTabInformationForm({
	children,
	admin= false,
	initialValues = {
		imei: "",
		phone: "",
	},
}) {
	
	return (
		<>
			<Formik
			 initialValues={initialValues}>
				{(formikProps) => {
					return (
						<Form>
							<VStack spacing="6" align="stretch">
								<Stack spacing="6" direction={["column", "column", "row"]}>
									<Box w="full">
										<CustomInput
											label="IMEI"
											name="imei"
											fieldProps={{ type: "text", disabled: true }}
										/>
									</Box>
									<Box w="full">
										<CustomInput
											label="Phone Number"
											name="phone"
											fieldProps={{ type: "number", disabled: true }}
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



export default DriverTabInformationForm;
