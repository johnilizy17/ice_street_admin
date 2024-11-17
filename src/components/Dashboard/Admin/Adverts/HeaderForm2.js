import {
    Box,
    Flex,
    VStack,
    Stack,
    Center,
    useToast,
    Button,
    Text,
    Select,
    Input
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import CustomInput from "@/components/Form/CustomInput";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatValidationErrors } from "utils";
import Script from "next/script";
import DisplayValidationErrors from "@/components/Form/DisplayValidationErrors";
import { adminupdateHeader } from "services/admin-services";
import { useRouter } from "next/router";
import { ImagePath } from "services/Variable";

function HeaderForm2({
    admin = false,
    data,
    children,
    callback = async () => null,
}) {
    const [errors, setErrors] = useState([]);
    const [images, setImage] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [initialValues, setInitialValues] = useState({})
    const [type, setType] = useState("picture");
    const [displayImage, setDisplayImage] = useState(false);
    const [text, setText] = useState("")
    const [specification, setSpecification] = useState("")
    const { query } = useRouter()

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        page: Yup.string().required("Page is required")
    });
    const toast = useToast();
    const router = useRouter();

    const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true);
      const data = await adminupdateHeader(values);

            toast({
                position: "top-right",
                description: "The Header is successfully upload",
                status: "success",
                isClosable: true
            });
            setTimeout(() => {
                router.push("/dashboard/admin/header");
            }, 900);
        } catch (error) {
            toast({
                position: "top-right",
                title: "Header failed to upload",
                description: "",
                status: "error",
                isClosable: true
            });
        } finally {
            setSubmitting(false);
        }
    };


    function loadFile(event, setFieldValue) {
        setType("picture");
        const imageFile = event.target.files[0]
        setImage(imageFile);
        setDisplayImage(true);
        const advert_file = document.getElementById("output");
        advert_file.src = URL.createObjectURL(event.target.files[0]);
    }

    useEffect(() => {
        if (query.title) {
            setTimeout(() => {
                setInitialValues(query)
            }, 500)
        }
    }, [query.title])

    return (
        <>
            <DisplayValidationErrors errors={errors} />
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleProfileUpdate}
                validationSchema={validationSchema}
            >
                {({
                    setFieldValue,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    values
                }) => {
                    return (
                        <Form>
                            <Box w="full" mb="30px">
                                <CustomInput
                                    label="Title"
                                    name="title"
                                    fieldProps={{ type: "text" }}
                                />
                            </Box>
                            <Box w="full" mb="30px">
                                <CustomInput
                                    label="Description"
                                    name="description"
                                    fieldProps={{ type: "text" }}
                                />
                            </Box>
                            <Box w="full" mb="30px">
                                <CustomInput
                                    label="Page"
                                    name="page"
                                    fieldProps={{ type: "text" }}
                                />
                            </Box>
                            <Center mt="4">
                                <Button
                                    isDisabled={isSubmitting}
                                    isLoading={isSubmitting}
                                    type="submit"
                                    mt="4"
                                    colorScheme="blackAlpha"
                                    textTransform="capitalize"
                                >
                                    Save Change
                                </Button>
                            </Center>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default HeaderForm2;