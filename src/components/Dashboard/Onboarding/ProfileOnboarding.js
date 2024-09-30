import DriverPaymentInformationForm from "@/components/Form/DriverPaymentInformationForm";
import DriverVerificationForm from "@/components/Form/DriverVerificationForm";
import DriverPersonalInformationForm from "@/components/Form/DriverPersonalInformationForm";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	Box,
	Button,
	Center,
	Circle,
	Container,
	Flex,
	Heading,
	HStack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { updateDriverProfile } from "services/driver-services";
import { setUser } from "app/features/auth/driverSlice";
import { useSelector } from "react-redux";
const SaveOrProceed = (formikProps, setTabIndex) => (
	<HStack
		bg="gray.50"
		mx="-4"
		mb="-8"
		justify={["space-between", "space-between", "flex-end"]}
		align="center"
		mt="4"
		pt="6"
	>
		<Button
			isLoading={formikProps.isSubmitting}
			type="submit"
			bg="white"
			colorScheme="blackAlpha"
			textTransform="capitalize"
			variant="outline"
		>
			Save & Continue Later
		</Button>
		<Button
			disabled={!formikProps.isValid}
			isLoading={formikProps.isSubmitting}
			colorScheme="blackAlpha"
			textTransform="capitalize"
			rightIcon={<ChevronRightIcon color="white" />}
			onClick={async () => {
				try {
					await formikProps.submitForm();
					setTabIndex((prevValue) => prevValue + 1);
				} catch (error) {}
			}}
		>
			Next
		</Button>
	</HStack>
);
function ProfileOnboarding({ showSummary, setShowSummary }) {
	const [tabIndex, setTabIndex] = useState(0);
	const toast = useToast();

	const handleProfileUpdate = async (values) => {
		const {
			data: { data: user },
		} = await updateDriverProfile({
			first_name: values.first_name,
			last_name: values.last_name,
			address: values.address,
			city: values.city,
			zip_code: values.zip_code,
			hobby: values.hobby,
			sport: values.sport,
			bio: values.bio,
			favorite_food: values.favorite_food,
		});
		dispatch(setUser(user));
		toast({
			description: "Profile updated successfully",
			position: "top-right",
			status: "success",
		});
	};

	const {
		user: {
			first_name = "",
			last_name = "",
			email = "",
			phone = "",
			address = "",
			city = "",
			zip_code = "",
			hobby = "",
			sport = "",
			bio = "",
			favorite_food = "",
		},
	} = useSelector((state) => state.driver);

	const initialValues = {
		first_name,
		last_name,
		email,
		phone,
		address,
		city,
		zip_code,
		hobby,
		sport,
		bio,
		favorite_food,
	};

	const tabs = [
		{
			title: "Profile",
			isComplete: true,
			component: (
				<Box bg="white" py="8" px="4" rounded="md">
					<Heading fontSize="xl" fontWeight="medium" color="gray.600" mb="6">
						Complete your profile
					</Heading>

					<DriverPersonalInformationForm
						initialValues={initialValues}
						callback={handleProfileUpdate}
					>
						{(formikProps) => SaveOrProceed(formikProps, setTabIndex)}
					</DriverPersonalInformationForm>
				</Box>
			),
		},
		{
			title: "Verification",
			isComplete: false,
			component: (
				<Box bg="white" py="8" px="4" rounded="md">
					<Heading fontSize="xl" fontWeight="medium" color="gray.600" mb="6">
						Verification
					</Heading>
					<DriverVerificationForm>
						{(formikProps) => SaveOrProceed(formikProps, setTabIndex)}
					</DriverVerificationForm>
				</Box>
			),
		},
		{
			title: "Payments",
			isComplete: true,
			component: (
				<Box bg="white" py="8" px="4" rounded="md">
					<Heading fontSize="xl" fontWeight="medium" color="gray.600" mb="6">
						Payment Info
					</Heading>
					<DriverPaymentInformationForm>
						{(formikProps) => (
							<HStack
								bg="gray.50"
								mx="-4"
								mb="-8"
								justify={["space-between", "space-between", "flex-end"]}
								align="center"
								mt="4"
								pt="6"
							>
								<Button
									disabled={!formikProps.isValid}
									isLoading={formikProps.isSubmitting}
									colorScheme="blackAlpha"
									textTransform="capitalize"
									rightIcon={<ChevronRightIcon color="white" />}
									onClick={async () => {
										try {
											await formikProps.submitForm();
											setShowSummary(true);
										} catch (error) {}
									}}
								>
									Finish
								</Button>
							</HStack>
						)}
					</DriverPaymentInformationForm>
				</Box>
			),
		},
	];

	if (showSummary) {
		return (
			<Box mt="6">
				<Text mb="4">
					Set-up personal information, submit ID and Payment information.
				</Text>
				<Accordion
					bg="white"
					rounded="md"
					shadow="md"
					px="4"
					onClick={() => setShowSummary(false)}
				>
					{[
						{
							title: "Complete your profile",
							icon: "icons/profile.svg",
						},
						{
							title: "Verification (Submit ID)",
							icon: "icons/badge.svg",
						},
						{
							title: "Setup your payment information",
							icon: "icons/card.svg",
						},
					].map((item, index) => (
						<AccordionItem
							key={index}
							_first={{ borderTop: "none" }}
							_last={{ borderBottom: "none" }}
							py="2"
						>
							<h2>
								<AccordionButton px="0">
									<Flex flex="1" textAlign="left" align="center">
										<Box bg="#FDE9ED" w="6" h="6" rounded="sm"></Box>
										<Text ml="2">{item.title}</Text>
									</Flex>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							{/* <AccordionPanel pb={4} px="0">
					{item.component}
				</AccordionPanel> */}
						</AccordionItem>
					))}
				</Accordion>
			</Box>
		);
	}
	return (
		<Container maxW="container.md" p="0">
			<Tabs variant="unstyled" index={tabIndex} onChange={setTabIndex}>
				<TabList
					align="center"
					spacing="8"
					mb="4"
					justifyContent="space-between"
				>
					{tabs.map((item, index) => (
						<Tab
							key={index}
							bg={item.isComplete ? "pink.500" : "transparent"}
							_selected={{
								color: "white",
								bg: item.isComplete ? "pink.500" : "gray.100",
							}}
							py="2"
							px="4"
							rounded="md"
						>
							<Center flexDir="column" w="fit-content">
								<Text
									mb="1"
									color={
										(index == tabIndex && !item.isComplete) ||
										(index != tabIndex && !item.isComplete)
											? "gray.600"
											: "white"
									}
								>
									{item.title}
								</Text>
								<Circle
									w="2"
									h="2"
									bg={
										index == tabIndex && item.isComplete ? "white" : "gray.600"
									}
								/>
							</Center>
						</Tab>
					))}
				</TabList>
				<TabPanels>
					{tabs.map((item, index) => (
						<TabPanel key={index} p="0">
							{item.component}
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Container>
	);
}

export default ProfileOnboarding;
