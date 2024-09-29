import DriverPersonalInformationForm from "@/components/Form/DriverPersonalInformationForm";
import {
	Box,
	Container,
	Flex,
	Heading,
	Text,
	useToast,
} from "@chakra-ui/react";
import { setUser } from "app/features/auth/driverSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDriverProfile } from "services/driver-services";

function PersonalInformation() {
	
	const dispatch = useDispatch();
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
		console.log(data, "dataaaa")
	};

	const {
		user: {
			first_name = data?.first_name || '',
			last_name = data?.last_name || "",
			email = data?.email || "",
			phone = data?.phone || "",
			address = data?.address || "",
			city =  data?.city || "",
			zip_code = data?.zip_code || "",
			hobby = data?.hobby || "",
			sport = data?.sport || "",
			bio = data?.bio ||  "",
			favorite_food = data?.favorite_food || "",
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

	return (
		<>
			<Flex
				px={["4", "4", "8"]}
				py="4"
				w="full"
				borderBottomWidth="thin"
				align="center"
			>
				{/* {
            activeView?.component &&
            <ChevronLeftIcon cursor="pointer" role="button" mr="2" px="0" fontSize="xl" onClick={() => setActiveView(null)} />
        } */}
				<Heading fontWeight="normal" fontSize="lg">
					Personal Information
				</Heading>
			</Flex>
			<Container maxW="container.lg" p={["4", "4", "8"]}>
				<DriverPersonalInformationForm
					initialValues={initialValues}
					callback={handleProfileUpdate}
				/>
			</Container>
		</>
	);
}

export default PersonalInformation;
