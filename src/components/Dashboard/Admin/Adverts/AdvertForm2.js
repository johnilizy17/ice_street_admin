import {
  Box,
  Flex,
  VStack,
  Stack,
  Center,
  useToast,
  Button,
  Text
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
import { adminUpdateAdvert } from "services/admin-services";
import { useRouter } from "next/router";

function AdvertForm({
  fetchedData,
  admin = false,
  children,
  callback = async () => null,
  initialValues = {
    organisation_name: fetchedData.organisation_name,
    advert_title: fetchedData.advert_title,
    target: fetchedData.target,
    duration: fetchedData.duration,
    link: fetchedData.link
      ? fetchedData.link?.replace("https://qr-code.awefun.io/", "")
      : fetchedData.link
  }
}) {
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [images, setImage] = useState(fetchedData.image_path);
  const AdData = router.query;

  console.log(fetchedData.image_path);
  const validationSchema = Yup.object({
    organisation_name: Yup.string().required("Organisation is required"),
    advert_title: Yup.string().required("Title is required"),
    target: Yup.number()
      .integer("Please provide a valid number")
      .required("Target is required")
      .nullable(),
    duration: Yup.number()
      .integer("Please provide a valid number")
      .required("Duration is required")
  });
  const toast = useToast();
  const [displayImage, setDisplayImage] = useState(false);

  const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
    // const formData = formData()
    // formData.append({"advert_file":image})

    try {
      setSubmitting(true);
      console.log(images);
      if (
        fetchedData.link?.replace("https://qr-code.awefun.io/", "") == values.link
      ) {
        delete values.link;
        const data = await adminUpdateAdvert({
          ...values,
          image: images,
          id: AdData.advertId,
          ad_type: fetchedData.ad_type
        });
      } else {
        const data = await adminUpdateAdvert({
          ...values,
          image: images,
          id: AdData.advertId,
          ad_type: fetchedData.ad_type
        });
      }
      toast({
        position: "top-right",
        description: "The Advert is successfully upload",
        status: "success",
        isClosable: true
      });
      setTimeout(() => {
        router.push("/dashboard/admin/adverts");
      }, 900);
    } catch (error) {
      toast({
        position: "top-right",
        title: "Advert failed to upload",
        description: "",
        status: "error",
        isClosable: true
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setImage(fetchedData.image_path);
    setTimeout(() => {
      setImage(fetchedData.image_path);
    }, 900);
  }, [images]);

  function loadFile(event, setFieldValue) {
    setImage(event.target.files[0]);
    setDisplayImage(true);
    const advert_file = document.getElementById("output");
    advert_file.src = URL.createObjectURL(event.target.files[0]);
  }

  return (
    <>
      <DisplayValidationErrors errors={errors} />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleProfileUpdate}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <Stack spacing="6" direction={["column", "column", "row"]}>
                <VStack spacing="6" align="stretch" w="full">
                  <Center borderWidth="thin" rounded="sm" w="full" h="64">
                    {fetchedData.ad_type == "picture" ? (
                      <img
                        src={fetchedData.image_path}
                        alt="advert image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                      />
                    ) : (
                      <video
                        src={fetchedData.image_path}
                        width="100%"
                        height="100%"
                        controls
                      ></video>
                    )}
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
                    You can upload the following formats PNG, JPEG, JPG, MP4 &
                    GIF
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
                      label="Organisation"
                      name="organisation_name"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Title"
                      name="advert_title"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Link"
                      name="link"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Target"
                      name="target"
                      fieldProps={{ type: "number" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Duration"
                      name="duration"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="SMS Text"
                      name="sms_text"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Email Subject"
                      name="email_subject"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Email Title"
                      name="email_title"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="full">
                    <CustomInput
                      label="Email Body"
                      name="email_body"
                      type = "textarea"
                      fieldProps={{ type: "textarea" }}
                    />
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
                  type="submit"
                  mt="4"
                  colorScheme="blackAlpha"
                  textTransform="capitalize"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
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

export default AdvertForm;
