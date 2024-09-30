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
import React from "react";
import CustomInput from "@/components/Form/CustomInput";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatValidationErrors } from "utils";
import Script from "next/script";
import DisplayValidationErrors from "@/components/Form/DisplayValidationErrors";
import { adminCreateAdverter } from "services/admin-services";
import { useRouter } from "next/router";

function AdvertForm({
  admin = false,
  children,
  callback = async () => null,
  initialValues = {
    advertisers_name: "",
    advertisers_email: "",
    advertisers_phone: ""
  }
}) {
  const [errors, setErrors] = useState([]);
  const [images, setImage] = useState("");
  const validationSchema = Yup.object({
    advertisers_name: Yup.string().required("advertisers name is required"),
    advertisers_email: Yup.string().required("advertisers email is required"),
    advertisers_phone: Yup.number().integer("Please provide a valid number").required("Target is required").nullable()
  });
  const toast = useToast();
  const router = useRouter();

  const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      console.log(images);
      const data = await adminCreateAdverter({ ...values });

      toast({
        position: "top-right",
        description: "The Adverter is successfully upload",
        status: "success",
        isClosable: true
      });
      setTimeout(() => {
        router.push("/dashboard/admin/ad-management");
      }, 900);
    } catch (error) {
      toast({
        position: "top-right",
        title: "Adverter failed to upload",
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
        {({ setFieldValue }) => {
          return (
            <Form>
              <Stack spacing="6" direction={["column", "column", "row"]}>
                <VStack spacing="6" align="stretch" w={["full","50%"]}>
                  <Box w="100%">
                    <CustomInput
                      label="Name of Advertiser"
                      name="advertisers_name"
                      fieldProps={{ type: "text" }}
                    />
                  </Box>
                  <Box w="100%">
                    <CustomInput
                      label="Email"
                      name="advertisers_email"
                      fieldProps={{ type: "email" }}
                    />
                  </Box>
                </VStack>
                <VStack spacing="6" align="stretch" w={["full","50%"]}>
                  <Box w="full">
                    <CustomInput
                      label="advertisers_phone"
                      name="advertisers_phone"
                      fieldProps={{ type: "number" }}
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

              <Flex mt="14">
                <Button
                  type="submit"
                  mt="4"
                  mr="14"
                  colorScheme="blackAlpha"
                  textTransform="capitalize"
                >
                  Add Advertiser
                </Button>
                <Button
                  type="submit"
                  mt="4"
                  colorScheme="blackAlpha"
                  textTransform="capitalize"
                  onClick={()=>router.push("/dashboard/admin/ad-management")}
                >
                  Cancel
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
