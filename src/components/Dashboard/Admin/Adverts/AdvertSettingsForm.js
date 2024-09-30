import CustomInput from "@/components/Form/CustomInput";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Radio,
	RadioGroup,
	VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useRouter } from "next/router";
function AdvertSettingsForm() {
	const router = useRouter();
	const initialValues = {
		randomise_ads: "No",
		image_ads_runtime: 10,
		ads_after_games: 10,
	};
	const validationSchema = Yup.object({
		randomise_ads: Yup.string().required("Ramdomise ad option is required"),
		image_ads_runtime: Yup.number()
			.integer("Please provide a valid number")
			.required("Image ad runtime is required"),
		ads_after_games: Yup.number()
			.integer("Please provide a valid number")
			.required("Ads after game is required"),
	});
	return (
		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			onSubmit={() => null}
			validationSchema={validationSchema}
		>
			{(formikProps) => (
				<Form>
					<VStack spacing="8" align="stretch">
						<Box maxW="64" w="full">
							<Box>
								<Field name="randomise_ads">
									{({ field, form }) => (
										<FormControl
											isInvalid={form.errors.duration && form.touched.duration}
										>
											<FormLabel color="gray.500" fontSize="xs">
												Randomise Ads
											</FormLabel>
											<RadioGroup id="randomise_ads" defaultValue="No">
												<Flex
													rounded="md"
													borderWidth="thin"
													overflow="hidden"
													w="fit-content"
												>
													<Box
														py="2"
														px="4"
														bg={
															formikProps.values.randomise_ads == "Yes"
																? "#414272"
																: "white"
														}
														color={
															formikProps.values.randomise_ads == "Yes"
																? "white"
																: "gray.600"
														}
														position="relative"
													>
														Yes
														<Radio
															{...field}
															value="Yes"
															position="absolute"
															opacity="0"
															inset="0"
														>
															{/* Yes */}
														</Radio>
													</Box>
													<Box
														py="2"
														px="4"
														bg={
															formikProps.values.randomise_ads == "No"
																? "#414272"
																: "white"
														}
														color={
															formikProps.values.randomise_ads == "No"
																? "white"
																: "gray.600"
														}
														position="relative"
													>
														No
														<Radio
															{...field}
															value="No"
															position="absolute"
															opacity="0"
															inset="0"
														>
															{/* No */}
														</Radio>
													</Box>
												</Flex>
											</RadioGroup>
											<FormErrorMessage fontSize="xs" lineHeight="none">
												{form.errors["randomise_ads"]}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Box>
						</Box>
						<Box maxW="64" w="full">
							<CustomInput
								label="Image ads runtime settings"
								name="image_ads_runtime"
								type="select"
							>
								<option value="10">10 seconds</option>
								<option value="15">15 seconds</option>
								<option value="30">30 seconds</option>
							</CustomInput>
						</Box>
						<Box maxW="64" w="full">
							<CustomInput
								label="Ads after games"
								name="ads_after_games"
								type="select"
							>
								<option>10</option>
								<option>15</option>
								<option>30</option>
							</CustomInput>
						</Box>
					</VStack>
					<HStack align="center" mt="4">
						<Button
							isLoading={formikProps.isSubmitting}
							onClick={() => router.push("/dashboard/admin/adverts")}
							bg="white"
							colorScheme="blackAlpha"
							textTransform="capitalize"
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							isLoading={formikProps.isSubmitting}
							colorScheme="blackAlpha"
							textTransform="capitalize"
							type="submit"
						>
							Save
						</Button>
					</HStack>
				</Form>
			)}
		</Formik>
	);
}

export default AdvertSettingsForm;
