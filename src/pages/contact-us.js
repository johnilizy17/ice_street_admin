import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

function ContactUs() {
    return (
        <>
            <Head>
                <title>Massbuy - Contact Us</title>
                <meta property="og:title" content="Massbuy - Contact Us" key="title" />
                <meta
                    property="og:description"
                    content="Awefun"
                    key="description"
                />
            </Head>
            <Flex minH="100vh" flexDir="column">
                <Navbar />
                <Box flex="1" h="full">
                    <Container maxW="container.xl" py="10">
                        Contact page
                    </Container>
                </Box>
                <Footer />
            </Flex>
        </>
    )
}

export default ContactUs;
