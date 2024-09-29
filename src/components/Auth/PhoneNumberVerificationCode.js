import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Flex, HStack, Text, Link as ChakraLink } from '@chakra-ui/layout'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import link from 'next/link'
import React, { useState } from 'react'
import { Select } from '@chakra-ui/select'
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'

function PhoneNumberVerification({ initialValues = {
    phone_number: "",
}, callback = () => null }) {
    const toast = useToast()

    const [resendingVerificationCode, setResendingVerificationCode] = useState(false)
    const verifyPhoneNumber = async (values) => {
        try {
            const formData = {
                code: values.verification_code,
                phone_number: initialValues.phone_number
            }
            // const res = await axios.post('url', formData)
            // console.log(res)
            console.log('Verifying with:', formData)
            toast({
                position: "top-right",
                title: "Verification completed",
                description: 'Your verification was successfull',
                status: "success",
                isClosable: true,
            });
            // Add toast notification for verification code sent
        } catch (error) {
            console.log(error)
            // Add toast notification for error sending verification code
        }
    }
    const sendVerification = async (values) => {
        try {
            // const res = await axios.post('url', values.phone_number)
            // console.log(res)
            console.log('Sending verification with values:', values)
            toast({
                position: "top-right",
                title: "Code sent",
                description: 'Please check your phone',
                status: "success",
                isClosable: true,
            });
            // Add toast notification for verification code sent
        } catch (error) {
            console.log(error)
            // Add toast notification for error sending verification code
        }
    }
    const resendVerificationCode = async () => {
        try {
            setResendingVerificationCode(true)
            await sendVerification(initialValues)
        } finally {
            setResendingVerificationCode(false);
        }
    }
    const completeVerification = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true)
            await verifyPhoneNumber(values)
            callback(values)
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Box>
            <Text fontSize="sm" color="gray.500">Step 2 of 3</Text>
            <Text fontWeight="bold" fontSize="xl">Phone number verification</Text>
            <Formik
                enableReinitialize={true}
                initialValues={{ verification_code: '' }}
                onSubmit={completeVerification}
                validationSchema={Yup.object({
                    verification_code: Yup.string().required("Verification code is required"),
                })}
            >
                {({ isSubmitting, isValid, setFieldValue, dirty }) => (
                    <Form>
                        <Box my="4">
                            <Text mb="1" fontSize="sm" color="gray.500">Please input the verification code sent to your phone number.</Text>
                            <HStack justify="center">

                                <Field name="verification_code">
                                    {({ form }) => (
                                        <PinInput onComplete={value => setFieldValue('verification_code', value)} isInvalid={form.errors.verification_code && form.touched.verification_code} otp id="verification_code">
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                        </PinInput>
                                    )}
                                </Field>
                            </HStack>
                        </Box>
                        <Button disabled={resendingVerificationCode || isSubmitting || !isValid || !dirty} type="submit" w="full" mt="4" colorScheme="red" textTransform="capitalize" >Continue</Button>
                        <Flex wrap="wrap" mt="2" fontSize="sm" display={resendingVerificationCode ? 'none' : 'flex'}>
                            <Text color="gray.500" mr="2">Didn't get code?</Text>
                            <Button onClick={resendVerificationCode} colorScheme="red" size="sm" variant="link">Resend Code</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default PhoneNumberVerification
