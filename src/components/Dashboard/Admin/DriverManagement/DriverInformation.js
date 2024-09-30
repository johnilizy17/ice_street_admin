import DriverPersonalInformationForm from "@/components/Form/DriverPersonalInformationForm";
import { CheckIcon, ViewIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Circle,
	Heading,
	HStack,
	Stack,
	Text,
	Flex,
	Center,
	useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
	adminGetDriverProfile,
	adminUpdateDriverProfile,
	adminVerifyDriver
} from "services/admin-services";
import Delivery from "./Delivery";

function DriverInformation({ driver, delivery}) {
	console.log(delivery)

	const toast = useToast();
	const verifyDriver = async () => {

		const id = driver.id.toString()
		console.log(typeof id, id)

		try {
			const data = await adminVerifyDriver(id)
			console.log(data, "dataaa")
		} catch (error) {
			console.log(error?.response?.data?.message, "error in response")
			toast({
				position: "top-right",
				title: "Verify Driver",
				description: error.response?.data?.message,
				status: "error",
				isClosable: true,
			});
		}

	}

	const unverifyDriver = () => {

	}

	return (
		<Box>
			<Box borderWidth="thin" p="4" borderRadius="md" mt="4">
				<Heading
					fontWeight="semibold"
					fontSize={["10px", "sm"]}
					textTransform="uppercase"
					mb="4"
				>
					Driver Information
				</Heading>
				<DriverPersonalInformationForm
					initialValues={driver}
					admin>

				</DriverPersonalInformationForm>
			</Box>
			<Box>
				{delivery && delivery.length > 0 ?
					<Delivery data={delivery} /> :
					<Center>
						No delivery address has been created
					</Center>
				}</Box>
		</Box>
	);
}

export default DriverInformation;
