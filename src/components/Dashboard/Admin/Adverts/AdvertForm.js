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
  adminGetAllAdverter
} from "services/admin-services";
import { useRouter } from "next/router";

function AdvertForm({
  admin = false,
  children,
  callback = async () => null,
  initialValues = {
    organisation_name: "",
    advert_title: "",
    link: "",
    target: "",
    duration: "",
    sms_text: "",
      email_subject: "",
      email_body: "",
      email_title: "",
  }
}) {
  const [errors, setErrors] = useState([]);
  const [images, setImage] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [type, setType] = useState("picture");
  const validationSchema = Yup.object({
    organisation_name: Yup.string().required("Organisation is required"),
    advert_title: Yup.string().required("Title is required"),
    link: Yup.string().required("link duration is required"),
    target: Yup.number()
      .integer("Please provide a valid number")
      .required("Target is required")
      .nullable(),
    duration: Yup.number()
      .integer("Please provide a valid number")
      .required("Duration is required"),
      sms_text: Yup.string().required("sms text is required"),
      email_subject: Yup.string().required("email subject is required"),
      email_body: Yup.string().required("email body is required"),
      email_title: Yup.string().required("email title is required"),
  });
  const toast = useToast();
  const router = useRouter();

  const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
   console.log(values)

    try {
      setSubmitting(true);
      console.log(images);
      const data = await adminCreateAdvert({
        ...values,
        advert_file: images,
        advert_type: type
      });

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

  const [displayImage, setDisplayImage] = useState(false);

  function loadFile(event, setFieldValue) {
    setType("picture");
    setImage(event.target.files[0]);
    setDisplayImage(true);
    const advert_file = document.getElementById("output");
    advert_file.src = URL.createObjectURL(event.target.files[0]);
  }

  function loadFile2(event, setFieldValue) {
    setType("video");
    setImage(event.target.files[0]);
    setDisplayImage(true);
    var advert_file2 = document.getElementById("advert_file2");
    var player = document.getElementById("output2");
    console.log("hello");

    player.src = URL.createObjectURL(event.target.files[0]);
  }

  useEffect(() => {
    const fetchDriversadminGetAllDrivers = async () => {
      try {
        const {
          data: { data }
        } = await adminGetAllAdverter();
        setDrivers(data.data);
      } catch (error) {
        setDrivers([]);
      }
    };
    fetchDriversadminGetAllDrivers();
  }, []);

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
                    />{" "}
                    :
                    <video
                      id="output2"
                      controls
                      style={
                        type == "video"
                          ? {
                              width: "100%",
                              height: "100%",
                              objectFit: "contain"
                            }
                          : { display: "none" }
                      }
                    ></video>
                  </Center>
                  <Text
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="203.52%"
                    color="#6B6B6B"
                  >
                    Upload Image/Video
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
                      <Field
                        label="advert_file2"
                        type="file"
                        id="advert_file2"
                        name="advert_file2"
                        className="advert_file2"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          loadFile2(event, setFieldValue);
                        }}
                        accept=".mp4"
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
                    <label
                      for="advert_file2"
                      style={{
                        width: 123,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 33,
                        marginLeft: 10,
                        background: "#404040",
                        boxShadow: "2px 8px 45px rgba(233, 211, 255, 0.25)",
                        borderradius: 3
                      }}
                    >
                      Select Video
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
                    <Select
                      name="organisation_name"
                      value={values.color}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ height: 50, width: "100%" }}
                    >
                      <option value="" label="Select a Organisation Name">
                        Select a color{" "}
                      </option>
                    {drivers.map((d)=>(  <option value={d.advertisers_name} label={d.advertisers_name}></option>))}
                    </Select>
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
									colorScheme="pink"
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
                  colorScheme="pink"
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

export default AdvertForm;
