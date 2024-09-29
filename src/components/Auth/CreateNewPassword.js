import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, Link as ChakraLink, VStack, Heading } from '@chakra-ui/layout'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import { changeDriverPassword } from 'services/driver-services'

function CreateNewPassword() {
    const router = useRouter()
    const toast = useToast()
    const initialValues = {
        email: "",
    }
    const validationSchema = Yup.object({
        password: Yup.string().required("Password is required"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required("Kindly confirm the password"),
    });
    const changePassword = async ({ old_password, password, password_confirmation }, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true)
            await changeDriverPassword({ old_password, password, password_confirmation })

            toast({
                position: "top-right",
                title: "Password Changed",
                description: 'Password was changed successfully',
                status: "success",
                isClosable: true,
            });
            router.push('/auth/login')
        } catch (error) {
            console.log(error)

            toast({
                position: "top-right",
                title: "An error occured",
                description: 'Please try again',
                status: "error",
                isClosable: true,
            });
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Box p="3" my="4">
            <Heading textAlign="center" fontSize="2xl">
                Create New Password
            </Heading>

            <Box mt="4">
                <Formik
                    initialValues={initialValues}
                    onSubmit={changePassword}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, isValid, dirty }) => (
                        <Form>
                            <VStack my="6">
                                <Box w="full">
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel mb="1" fontSize="sm" color="gray.500">Create your password</FormLabel>
                                                <Input {...field} id="password" bg="white" type="password" placeholder="********" />
                                                <FormErrorMessage fontSize="xs" lineHeight="none">{form.errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Box>
                                <Box w="full">
                                    <Field name="confirm_password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.confirm_password && form.touched.confirm_password}>
                                                <FormLabel mb="1" fontSize="sm" color="gray.500">Confirm password</FormLabel>
                                                <Input {...field} id="confirm_password" bg="white" type="password" placeholder="********" />
                                                <FormErrorMessage fontSize="xs" lineHeight="none">{form.errors.confirm_password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Box>
                            </VStack>

                            <Button disabled={isSubmitting || !isValid || !dirty} type="submit" w="full" colorScheme="red" textTransform="capitalize">Confirm and return to Log In</Button>
                            <Flex mt="2" fontSize="sm">
                                <Text color="gray.500" mr="2">Don't have an account</Text>
                                <ChakraLink as={Link} href="/">
                                    <Button type="button" colorScheme="red" size="sm" variant="link">Sign Up</Button>
                                </ChakraLink>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default CreateNewPassword


