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
  Spinner
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
  adminCreateProduct,
  adminGetAllAdverter,
  adminGetAllDrivers,
  adminGetProductByID,
  adminUpdateProduct
} from "services/admin-services";
import { useRouter } from "next/router";
import { MultiSelect } from "react-multi-select-component";
import parse from "html-react-parser";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
      
function ProductForm() {
  const [errors, setErrors] = useState([]);
  const [images, setImage] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [type, setType] = useState("picture");
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})
  const [data, setData] = useState({ category: [] })
  const [displayImage, setDisplayImage] = useState(false);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState([]);
  const [text, setText] = useState("")
  const [specification, setSpecification] = useState("")
  const [fetching, setFetching] = useState(true)

  const validationSchema = Yup.object({
    itemName: Yup.string().required("Organisation is required"),
    price: Yup.string().required("Title is required"),
    details: Yup.string()
      .required("details is required")
      .nullable()
  });
  const toast = useToast();
  const router = useRouter();

  const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
    console.log(values)

    try {
      setSubmitting(true);
      const category_id = selected.map(p => {
        return p._id &&
          p._id
      });
        const data = await adminUpdateProduct({
          ...values,
          advert_file: images,
          advert_type: type,
          category_id: category_id[0],
          displayImage: displayImage,
          id: router.query.product,
          "spec": specification,
          "feature": text
        });


        toast({
          position: "top-right",
          description: "The Product is successfully upload",
          status: "success",
          isClosable: true
        });
        setTimeout(() => {
          router.push("/dashboard/admin/product");
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

  function loadFile(event, setFieldValue) {
    setType("picture");
    setImage(event.target.files[0]);
    setDisplayImage(true);
    const advert_file = document.getElementById("output");
    advert_file.src = URL.createObjectURL(event.target.files[0]);
  }

  const getSingleProduct = async (pageNumber) => {
    setFetching(true)
    try {
      setLoading(true);
      const dataAdmin = await adminGetProductByID(pageNumber);
      const categories = await adminGetAllDrivers(10, 2);
      const newProjects = categories.data.category.map(p => {
        return p._id &&
          { ...p, value: p._id, label: p.title }
      });
      setCategory(newProjects);
      console.log(dataAdmin.data)
      setSpecification(dataAdmin.data.spec)
      setText(dataAdmin.data.feature)
      if(dataAdmin?.data.category_id){const optionCategory = { ...dataAdmin?.data.category_id, value: dataAdmin?.data.category_id._id, label: dataAdmin?.data.category_id.title };
      setSelected([optionCategory])}

      setProduct(dataAdmin.data)
      setLoading(false);
    } catch (error) {
      console.log("errorr", error)
      setProduct([]);
    } finally {
      setLoading(false);
    }
    setFetching(false)
  };

  const fetchDriversadminGetAllDrivers = async (pageNumber) => {
    try {
      setLoading(true);
      const datas = await adminGetAllDrivers(pageNumber);
      setData(datas.data)
      setLoading(false);
    } catch (error) {
      console.log("errorr", error)
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDriversadminGetAllDrivers(50)
    if (router.query.product) getSingleProduct(router.query.product)
  }, [router.query.product])



  return (
    <>
      <DisplayValidationErrors errors={errors} />
      {fetching ?
        <Center h="full" w="full" mt="8">
          <Spinner color="red" size="xl" />
        </Center>
        :
        <Formik
          enableReinitialize={true}
          initialValues={product}
          onSubmit={handleProfileUpdate}
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
                        <img
                          src={product.image}
                          style={
                            {
                              width: "100%",
                              height: "100%",
                              objectFit: "contain"
                            }
                          }
                        />
                      )}
                      <img
                        id="output"
                        style={
                          displayImage
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
                      <MultiSelect
                        options={category}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </Box>
                    <Box w="full">
                      <CustomInput
                        label="Name of Item"
                        name="itemName"
                        fieldProps={{ type: "text" }}
                      />
                    </Box>
                    <Box w="full">
                      <CustomInput
                        label="Price"
                        name="price"
                        fieldProps={{ type: "text" }}
                      />
                    </Box>
                    <Box w="full">
                      <CustomInput
                        label="Detail"
                        name="details"
                        fieldProps={{ type: "text" }}
                      />
                    </Box>
                    <div className="editor">
                      <label style={{ "color": "grey" }}> Features</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          setText(data)
                        }}
                      />
                    </div>
                    <div>
                      <h2>Content</h2>
                      <p>{parse(text)}</p>
                    </div>
                    <div className="editor">
                      <label style={{ "color": "grey" }}> Specification</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={specification}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          setSpecification(data)
                        }}
                      />
                    </div>
                    <div>
                      <h2>Content</h2>
                      <p>{parse(specification)}</p>
                    </div>
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
      }    </>
  );
}

export default ProductForm;
