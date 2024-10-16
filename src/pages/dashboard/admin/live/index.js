import { SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	Flex,
	Heading,
	Image,
	Img,
	SimpleGrid,
	Spinner,
	Text,
} from "@chakra-ui/react";

import withAdmin from "HOC/withAdmin";
import React, { useEffect, useState } from "react";
import { adminGetAllLivesCategory } from "services/admin-services";
import Link from "next/link";
import SingleGames from "@/components/Dashboard/Admin/Games/SingleGames";
import { useRouter } from 'next/router'
import Category from "@/components/Dashboard/Admin/Live/Category";

function Live() {

	const [isActive, setIsActive] = useState(false);
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const { query } = useRouter()


	const fetchGames = async () => {

		try {
			setLoading(true);
			const res = await adminGetAllLivesCategory();
			console.log(res.data, "games")
			setGames(res?.data);
		} catch (error) {
			console.log(error, "erorr at get all games")
			setLoading(false)
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {

		fetchGames();
	}, [query.upload]);


	if (loading) {
		return (
			<Center h="full" w="full" mt="8">
				<Spinner color="red" size="xl" />
			</Center>
		);
	}
	console.log(games, "Gamess")
	return (
		<Flex h="full" flex="1" flexDir="column">
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
					<Heading fontSize={["md", null, "2xl"]}>Live</Heading>
					<Text fontSize={["sm", null, "md"]}>Edit and Add more Live products</Text>
				</Box>
			</Flex>


			<SimpleGrid columns={[2, 3]} mt="20px" spacing={10}>
				<Link href="/dashboard/admin/live/create">
					<Box borderRadius="10px" cursor="pointer">
						<Img w="full" src="/brand/new-game.png"></Img>
					</Box>
				</Link>
			</SimpleGrid>
			{games.length > 0 ?
				<>
					{games.map((cat, id) => (<Category cat={cat} id={id} fetchGames={fetchGames} />))}
				</>
				:
				<Center h="full" flex="1">
					<Image src="/infographics/no-data.svg" maxW="96" w="full" />
				</Center>}
		</Flex>
	);
}

export default withAdmin(Live);
