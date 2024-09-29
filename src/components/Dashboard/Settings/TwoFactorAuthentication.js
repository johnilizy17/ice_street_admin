import { Box, Flex, Heading, Switch, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

function TwoFactorAuthentication() {

    const [MFAIsActive, setMFAIsActive] = useState(true);
    const toggleMFA = async (e) => {
        const newState = e.target.checked
        setMFAIsActive(newState)
        return null
    }

    return (

        <Flex align="center">
            <Box mr="4" w="full" flex="1">
                <Heading mb="2" fontWeight="normal" fontSize="md">Text message (SMS)</Heading>
                <Text fontSize="sm" color="gray.500">Use text messages (SMS) to receive verification codes. For your protection, phone numbers used for two-factor authentication can't be used to reset your password when two-factor authentication is on.</Text>
            </Box>
            <Box>
                <Switch colorScheme="green" id='mfa' onChange={toggleMFA} value={MFAIsActive} colorScheme="red" isChecked={MFAIsActive} />
            </Box>
        </Flex>
    )
}

export default TwoFactorAuthentication;
