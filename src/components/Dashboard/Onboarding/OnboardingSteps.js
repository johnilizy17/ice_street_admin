import {
	Box,
	Center,
	Circle,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import React from "react";
import ProfileOnboarding from "./ProfileOnboarding";
import TabCollectionCenters from "./TabCollectionCenters";

function OnboardingSteps({ showSummary, setShowSummary }) {
	const tabs = [
		{
			title: "Profile",
			component: (
				<ProfileOnboarding
					showSummary={showSummary}
					setShowSummary={setShowSummary}
				/>
			),
		},
		{
			title: "Register/Pickup Tab",
			component: <TabCollectionCenters />,
		},
	];
	return (
		<Tabs variant="unstyled">
			{showSummary && (
				<TabList
					align="center"
					// spacing="8"
					mb="4"
					// justifyContent="space-between"
				>
					{tabs.map((item, index) => (
						<Tab
							key={index}
							color="gray.600"
							// bg="gray.100"
							_selected={{ color: "white", bg: "pink.500" }}
							py="2"
							px="4"
							rounded="md"
							_notFirst={{ ml: "4" }}
						>
							<Center flexDir="column" w="fit-content">
								<Text mb="1">{item.title}</Text>
								<Circle w="2" h="2" bg={index == 0 ? "white" : "gray.600"} />
							</Center>
						</Tab>
					))}
				</TabList>
			)}
			<TabPanels>
				{tabs.map((item, index) => (
					<TabPanel key={index} p="0">
						<Box>{item.component}</Box>
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}

export default OnboardingSteps;
