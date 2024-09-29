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
import AdvertListing from "@/components/Dashboard/Admin/Adverts/AdvertListing";

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
					<Heading fontSize="2xl">Adverts</Heading>
					<Text fontSize={["sm","md"]}>Monitor user statistics easily!</Text>
				</Box>
				<ButtonGroup>
					<IconButton
						onClick={() => router.push("/dashboard/admin/adverts/settings")}
						variant="outline"
						icon={<SettingsIcon />}
						size={["sm","md"]}
					/>
					<Button
						onClick={() => router.push("/dashboard/admin/adverts/create")}
						color="pink.600"
						fontSize={["12px","14px"]}
						
					>
						Add Advert
					</Button>
				</ButtonGroup>
			</Flex>
			<Box>
				<AdvertListing />
			</Box>
		</Box>
	);
}

export default withAdmin(AdvertManagement);
