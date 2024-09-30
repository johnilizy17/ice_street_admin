import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Container, Flex, Heading, IconButton, Switch, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import TwoFactorAuthentication from './TwoFactorAuthentication';


export const DefaultSettingsPage = ({ setActiveView }) => {

    const pages = [
        {
            id: 1,
            title: "Two Factor Authentication",
            description: "Help protect your account from unauthorized access by requiring a second authentication method in addition to your Awefun password. You can choose a text message, authentication app, or security key.",
            component: <TwoFactorAuthentication />,
        },
        {
            id: 2,
            title: "Change Password",
            description: "Use a unique password to login to your account instead of your Awefun password.",
            component: <ChangePasswordForm />,
        },
    ]
    return (
        <VStack w="full" align="stretch" spacing="8">
            {
                pages.map(page => {
                    return (

                        <Flex key={page.id} align="center" role="navigation" cursor="pointer" onClick={() => { setActiveView({ title: page.title, component: page.component }) }}>
                            <Box mr="4" w="full" flex="1">
                                <Heading mb="2" fontWeight="normal" fontSize="md">{page.title}</Heading>
                                <Text fontSize="sm" color="gray.500">{page.description}</Text>
                            </Box>
                            <Box>
                                <ChevronRightIcon color="gray.500" fontWeight="normal" fontSize="2xl" />
                            </Box>
                        </Flex>
                    )
                })
            }
        </VStack>
    )
}
function SecuritySettings() {
    const [activeView, setActiveView] = useState(null);
    return (
        <>
            <Flex px={["4", "4", "8"]} py="4" w="full" borderBottomWidth="thin" align="center">
                {
                    activeView?.component &&
                    <ChevronLeftIcon cursor="pointer" role="button" mr="2" px="0" fontSize="xl" onClick={() => setActiveView(null)} />
                }
                <Heading fontWeight="normal" fontSize="lg">{activeView?.title ?? "Settings"}</Heading>
            </Flex>
            <Container px={["4", "4", "8"]} py="8" w="full" mx="0">
                {activeView?.component ?? <DefaultSettingsPage setActiveView={setActiveView} />}
            </Container>
        </>
    )
}

export default SecuritySettings;
