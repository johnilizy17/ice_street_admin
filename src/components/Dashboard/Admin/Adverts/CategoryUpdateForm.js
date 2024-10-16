import {
    Box,
    Flex,
    VStack,
    Stack,
    Center,
    useToast,
    Button,
    Text,
    Select
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
    adminGetAllAdverter,
    adminUpdateAdvert,
    adminUpdateCategory
  } from "services/admin-services";
  import { useRouter } from "next/router";
  
  function CategoryUpdateForm({
    admin = false,
    children,
    callback = async () => null,
    initialValues = {
      image: "",
     title: "",
      type: "",
      color:"red",
      style:"",
      Header_Color:""
    }
  }) {
    const [errors, setErrors] = useState([]);
    const [images, setImage] = useState("");
    const router = useRouter()
    const [drivers, setDrivers] = useState([{type:1, title:"Gobal"},{type:2, title:"NGN"},{type:3, title:"GBP"}]);
    const [style, setStyle] = useState([{type:1, title:"Trend"},{type:2, title:"Block"},{type:3, title:"Collection"}, { type: 4, title: "Brand" }]);
    const [type, setType] = useState("picture");
    const validationSchema = Yup.object({
      type: Yup.string().required("Type is required"),
      style: Yup.string().required("style is required"),
      color: Yup.string().required("color is required"),
      title: Yup.string().required("Title is required")
    });
    const toast = useToast();
  
    const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
      console.log(values)
  
      try {
        setSubmitting(true);
        console.log(images);
        const data = await adminUpdateCategory({
          ...values,
          advert_file: images,
        });
        toast({
          position: "top-right",
          description: "The categories is successfully upload",
          status: "success",
          isClosable: true
        });
        setTimeout(() => {
          router.push("/dashboard/admin/categories")
        }, 900);
      } catch (error) {
        toast({
          position: "top-right",
          title: "Category failed to upload",
          description: "",
          status: "error",
          isClosable: true
        });
      } finally {
        setSubmitting(false);
      }
    };
  
    const [displayImage, setDisplayImage] = useState(false);
  
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
                  <VStack
                    spacing="6"
                    pt="15px"
                    align="stretch"
                    w="full"
                    maxW="72"
                  >
                    <Box w="full">
                      <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ height: 50, width: "100%" }}
                      >
                        <option value="" label="Select a Category type">
                          
                        </option>
                        {drivers.map((d, id) => (<option key={id} value={d.type} label={d.title}></option>))}
                      </Select>
                    </Box>
                    <Box w="full">
                      <Select
                        name="style"
                        value={values.style}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ height: 50, width: "100%" }}
                      >
                        <option value="" label="Select a Style">
                          
                        </option>
                        {style.map((d, id) => (<option key={id} value={d.type} label={d.title}></option>))}
                      </Select>
                    </Box>
                    <Box w="full">
                      <CustomInput
                        label="title"
                        name="title"
                        fieldProps={{ type: "text" }}
                      />
                    </Box>
                    <Box w="full">
                      <CustomInput
                        label="Color"
                        name="color"
                        fieldProps={{ type: "text" }}
                      />
                     <Box h="50px" mt="20px" w="full" display="flex" justifyContent="center" alignItems="center" bg={values.color} color={values.Header_Color} >
                      {values.title}
                    </Box>
                    </Box>
                    <Box w="full">
                    <CustomInput
                      label="Header Color"
                      name="Header_Color"
                      fieldProps={{ type: "text" }}
                    /> 
                    <Box h="50px" mt="20px" w="full" display="flex" justifyContent="center" alignItems="center" bg={values.color} color={values.Header_Color} >
                    {values.title}
                  </Box>
                  </Box>
                  </VStack>
                </Stack>
                {/* <Flex justify="center" mt="4">
                                  <Button
                                      isLoading={isSubmitting}
                                      type="submit"
                                      mt="4"
                                      colorScheme="blackAlpha"
                                      textTransform="capitalize"
                                  >
                                      Save Changes
                                  </Button>
                              </Flex> */}
  
                <Flex>
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
                  <Button
                    ml="20px"
                    mt="4"
                    onClick={()=>router.back()}
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    colorScheme="red"
                  >
                    Go Back
                  </Button>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
  
  export default CategoryUpdateForm;  