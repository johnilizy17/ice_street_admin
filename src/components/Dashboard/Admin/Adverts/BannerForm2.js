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
import {
    adminCreateAdvert,
    adminUpdateBanner,
    adminImageUpload,
    adminGetAllAdverter
} from "services/admin-services";
import { useRouter } from "next/router";
import { ImagePath } from "services/Variable";

function BannerForm2({
    admin = false,
    data,
    children,
    callback = async () => null,
}) {
    const [errors, setErrors] = useState([]);
    const [images, setImage] = useState();
    const [drivers, setDrivers] = useState([]);
    const [initialValues, setInitialValues] = useState({})
    const [type, setType] = useState("picture");
    const [displayImage, setDisplayImage] = useState(false);
    const [text, setText] = useState("")
    const [specification, setSpecification] = useState("")
    const { query } = useRouter()

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        discount: Yup.string().required("Discount is required"),
        button: Yup.string().required("Button Text is required")
    });
    const toast = useToast();
    const router = useRouter();

    const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true);

            let image_link
            if (images) {
                image_link = await adminImageUpload({ advert_file: images })
                console.log(image_link, "images")
               
                const data = await adminUpdateBanner({
                    ...values,
                    image: image_link
                });
            } else {
                const data = await adminUpdateBanner({
                    ...values
                });
            }

            toast({
                position: "top-right",
                description: "The Banner is successfully upload",
                status: "success",
                isClosable: true
            });
            setTimeout(() => {
                router.push("/dashboard/admin/banner");
            }, 900);
        } catch (error) {
            toast({
                position: "top-right",
                title: "Banner failed to upload",
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
        if (query.image) {
            setTimeout(() => {
                setInitialValues(query)
                setType("picture");
                console.log(ImagePath + query.image, "image")
                const imageFile = ImagePath+"/" + query.image
                setDisplayImage(true);
                const advert_file = document.getElementById("output");
                advert_file.src = imageFile
            }, 500)
        }
    }, [query.image])

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
                            <Stack spacing="6" direction={["column", "column", "row"]}>
                                <VStack spacing="6" align="stretch" w="full">
                                    <Center borderWidth="thin" rounded="sm" w="full" h="64">
                                        {!displayImage && (
                                            <svg
                                                width="124"
                                                height="102"
                                                viewBox="0 0 124 102"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M110.714 0H13.2857C5.94821 0 0 6.85005 0 15.3V86.7C0 95.15 5.94821 102 13.2857 102H110.714C118.052 102 124 95.15 124 86.7V15.3C124 6.85005 118.052 0 110.714 0ZM115.143 59.0885L87.2739 26.9944C85.5446 25.0033 82.7411 25.0033 81.0119 26.9944L44.2858 69.2885L29.7024 52.494C27.9732 50.5029 25.1697 50.5029 23.4404 52.494L8.85705 69.2885V15.3C8.85705 12.4833 10.8398 10.1999 13.2857 10.1999H110.714C113.16 10.1999 115.143 12.4833 115.143 15.3V59.0885H115.143Z"
                                                    fill="#DADADA"
                                                />
                                            </svg>
                                        )}
                                        <img
                                            id="output"
                                            style={
                                                displayImage && type == "picture"
                                                    ? {
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }
                                                    : { display: "none" }
                                            }
                                        />
                                    </Center>
                                    <Text
                                        fontWeight="400"
                                        fontSize="14px"
                                        lineHeight="203.52%"
                                        color="#6B6B6B"
                                    >
                                        Upload Image
                                    </Text>

                                    <Text
                                        fontWeight="400"
                                        mt="0px"
                                        mb="5px"
                                        fontSize="14px"
                                        color="#6B6B6B"
                                    >
                                        Image dimension 350px Width x 334px Height
                                    </Text>
                                    <Flex
                                        w="full"
                                        border="0.3px solid #404040"
                                        h="50px"
                                        align="center"
                                        pl="10px"
                                        box-shadow="2px 8px 20px rgba(255, 170, 156, 0.1)"
                                    >
                                        <Box display="none">
                                            <Field
                                                label="advert_file"
                                                type="file"
                                                id="advert_file"
                                                name="advert_file"
                                                className="advert_file"
                                                style={{ display: "none" }}
                                                onChange={(event) => {
                                                    loadFile(event, setFieldValue);
                                                }}
                                                multiple
                                                accept="image/*"
                                            />
                                        </Box>
                                        <label
                                            for="advert_file"
                                            style={{
                                                width: 123,
                                                color: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: 33,
                                                background: "#404040",
                                                boxShadow: "2px 8px 45px rgba(233, 211, 255, 0.25)",
                                                borderradius: 3
                                            }}
                                        >
                                            Select Image
                                        </label>
                                    </Flex>

                                    <Text
                                        fontWeight="400"
                                        fontSize="14px"
                                        lineHeight="203.52%"
                                        color="#6B6B6B"
                                    >
                                        You can upload the following formats PNG, JPEG, JPG, GIF
                                    </Text>
                                </VStack>
                                <VStack
                                    spacing="6"
                                    pt="15px"
                                    align="stretch"
                                    w="full"
                                    maxW="72"
                                >

                                    <Box w="full">
                                        <CustomInput
                                            label="Title"
                                            name="title"
                                            fieldProps={{ type: "text" }}
                                        />
                                    </Box>
                                    <Box w="full">
                                        <CustomInput
                                            label="Details"
                                            name="discount"
                                            fieldProps={{ type: "text" }}
                                        />
                                    </Box>
                                    <Box w="full">
                                        <CustomInput
                                            label="Button"
                                            name="button"
                                            fieldProps={{ type: "text" }}
                                        />
                                    </Box>
                                    <Box w="full">
                                        <CustomInput
                                            label="Background Color"
                                            name="color"
                                            fieldProps={{ type: "text" }}
                                        />
                                        <Box h="50px" mt="20px" w="full" display="flex" justifyContent="center" alignItems="center" bg={values.color}>
                                        </Box>
                                    </Box>
                                    <Box w="full">
                                        <CustomInput
                                            label="Text Color"
                                            name="text_color"
                                            fieldProps={{ type: "text" }}
                                        />
                                        <Box h="50px" mt="20px" w="full" display="flex" justifyContent="center" alignItems="center" bg={values.text_color}>
                                        </Box>
                                    </Box>
                                </VStack>
                            </Stack>
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

export default BannerForm2;