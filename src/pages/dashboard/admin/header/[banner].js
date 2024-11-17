import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { adminGetSingleAdverter } from "services/admin-services";
import HeaderForm2 from "@/components/Dashboard/Admin/Adverts/HeaderForm2";

function CreateHeader() {

	return (
		<Box>
			<Heading fontSize="2xl" ml={["14px"]} mb={["29px"]} color="pink.500">
				<Flex ml={["14px"]} mb={["29px"]} alignItems="center">
					<svg onClick={() => { Router.back() }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-backspace-fill" viewBox="0 0 16 16">
						<path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
					</svg>

					<Heading ml={["14px"]} fontSize="2xl" color="pink.500">
					Edit Header
					</Heading>
				</Flex>
			</Heading>
			<Box border="1px solid #F1F3F8" borderRadius="5px" p="31" w="full" mx="0">
				<HeaderForm2 />
			</Box>
		</Box>
	);
}

export default withAdmin(CreateHeader);
