import CustomInput from "@/components/Form/CustomInput";
import { SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import withAdmin from "HOC/withAdmin";
import { useRouter } from "next/router";
import React from "react";
import AdvertForm from "@/components/Dashboard/Admin/Adverts/AdvertForm";
import AdminListing from "@/components/Dashboard/Admin/Adverts/AdminListing";

function AdvertManagement() {
	const router = useRouter();

	return (
		<Box>
			<Flex
				p={["4", "4", "8", "10"]}
				rounded="lg"
				overflow="hidden"
				bgImage="/infographics/bg/admin-summary-bg.jpg"
				bgRepeat="no-repeat"
				bgSize="cover"
				color="white"
				align="center"
				justify="space-between"
			>
				<Box>
					<Heading fontSize="2xl">Admin Management</Heading>
					<Text fontSize="md">Monitor Admin permission easily!</Text>
				</Box>
				<ButtonGroup>
			
					<Button
						onClick={() => router.push("/dashboard/admin/adverts/create")}
						color="pink.600"
					>
						Add Admin
					</Button>
				</ButtonGroup>
			</Flex>
			<Box>
				<AdminListing />
			</Box>
		</Box>
	);
}

export default withAdmin(AdvertManagement);
