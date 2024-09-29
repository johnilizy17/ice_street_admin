import Footer from '@/components/LandingPage/Footer';
import Navbar from '@/components/LandingPage/Navbar';
import { Box, Container, Flex, Heading, Image, Square, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

function AboutUs() {
    return (
        <>
            <Head>
                <title>Massbuy - About Us</title>
                <meta property="og:title" content="Massbuy - About Us" key="title" />
                <meta
                    property="og:description"
                    content="Awefun"
                    key="description"
                />
            </Head>
            <Flex minH="100vh" flexDir="column">
                <Navbar />
                <Box flex="1" h="full">
                    <Container maxW="container.lg">
                        About Us
                    </Container>
                </Box>
                <Footer />
            </Flex>
        </>
    )
}

export default AboutUs;
