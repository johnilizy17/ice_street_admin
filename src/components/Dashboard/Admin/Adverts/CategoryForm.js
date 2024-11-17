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
  adminImageUpload
} from "services/admin-services";
import { useRouter } from "next/router";

function CategoryForm({
  admin = false,
  children,
  callback = async () => null,
  initialValues = {
    image: "",
    title: "",
    type: "",
    color: "red",
    Header_Color: "white",
    style: ""
  }
}) {
  const [errors, setErrors] = useState([]);
  const [images, setImage] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [drivers, setDrivers] = useState([{ type: 1, title: "Gobal" }, { type: 2, title: "NGN" }, { type: 3, title: "GBP" }]);
  const [style, setStyle] = useState([{ type: 1, title: "Trend" }, { type: 5, title: "Type" }, { type: 2, title: "Block" }, { type: 3, title: "Collection" }, { type: 4, title: "Brand" }]);
  const [type, setType] = useState("picture");
  const validationSchema = Yup.object({
    style: Yup.string().required("style is required"),
    color: Yup.string().required("color is required"),
    title: Yup.string().required("Title is required")
  });
  const toast = useToast();
  const router = useRouter();

  function loadFile(event, setFieldValue) {
    setType("picture");
    const imageFile = event.target.files[0]
    setImage(imageFile);
    setDisplayImage(true);
    const advert_file = document.getElementById("output");
    advert_file.src = URL.createObjectURL(event.target.files[0]);
  }

  const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
    console.log(values)

    try {
      setSubmitting(true);
      const image_link = await adminImageUpload({ advert_file: images })
      const data = await adminCreateAdvert({
        ...values,
        type: 1,
        image: image_link,
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

              <Flex mt="4">
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
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default CategoryForm;
