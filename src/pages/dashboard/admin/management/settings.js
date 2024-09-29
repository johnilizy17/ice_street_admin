import AdvertSettingsForm from "@/components/Dashboard/Admin/Adverts/AdvertSettingsForm";
import { SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Text,
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import { useRouter } from "next/router";
import React from "react";

function AdvertSettings() {
	return (
		<Box>
			<Box>
				<Heading fontSize="2xl" color="pink.500">
					General Advert Settings
				</Heading>
				<Box mt="8">
					<AdvertSettingsForm />
				</Box>
			</Box>
		</Box>
	);
}

export default withAdmin(AdvertSettings);
