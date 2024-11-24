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
  Spinner,
  Input,
  IconButton,
  useDisclosure
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
  adminImageUpload,
  adminUpdateProduct
} from "services/admin-services";
import { useRouter } from "next/router";
import { MultiSelect } from "react-multi-select-component";
import parse from "html-react-parser";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ImagePath } from "services/Variable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function ProductForm() {
  const [errors, setErrors] = useState([]);
  const [images, setImage] = useState(["", "", ""]);
  const [drivers, setDrivers] = useState([]);
  const [type, setType] = useState("picture");
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState([]);
  const [color2, setColor2] = useState("");
  const [product, setProduct] = useState({})
  const [data, setData] = useState({ category: [] })
  const [displayImage, setDisplayImage] = useState(false);
  const [selected, setSelected] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected2, setSelected2] = useState([]);
  const [selected3, setSelected3] = useState([]);
  const [selected4, setSelected4] = useState([]);
  const [category, setCategory] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
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
      const category_id2 = selected2.map(p => {
        return p._id &&
          p._id
      });
      const category_id3 = selected3.map(p => {
        return p._id &&
          p._id
      });
      console.log(images)
      const image_2 = await adminImageUpload({ advert_file: images[1] })
      const image_3 = await adminImageUpload({ advert_file: images[2] })
      const image_1 = images[0].length > 2 ? images[0] : product.image
      const data = await adminUpdateProduct({
        ...values,
        advert_type: type,
        image: image_1,
        image_2: image_2,
        image_3: image_3,
        color: color,
        category_id: category_id[0],
        gender: selected3[0].value,
        brand: category_id2[0],
        type: category_id3[0],
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
      console.log(error, "error")
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
    const imageFile = images
    imageFile[0] = event.target.files[0]
    setDisplayImage(true);
    const advert_file = document.getElementById("output");
    advert_file.src = URL.createObjectURL(event.target.files[0]);
  }

  function loadFile2(event, setFieldValue) {
    setType("picture");
    const imageFile = images
    imageFile[1] = event.target.files[0]
    setImage(imageFile);
  }


  function loadFile3(event, setFieldValue) {
    setType("picture");
    const imageFile = images
    imageFile[2] = event.target.files[0]
    setImage(imageFile);
  }

  const getSingleProduct = async (pageNumber) => {
    setFetching(true)
    try {
      setLoading(true);
      const dataAdmin = await adminGetProductByID(pageNumber);
      const categories = await adminGetAllDrivers(10, 2);
      const brand = categories.data.category.filter(p => {
        return p._id && p.style === 4 &&
          { ...p, value: p._id, label: p.title }
      });
      const type = categories.data.category.filter(p => {
        return p._id && p.style === 5 &&
          { ...p, value: p._id, label: p.title }
      });
      const collection = categories.data.category.filter(p => {
        return p._id && p.style === 3 &&
          { ...p, value: p._id, label: p.title }
      });
      const newProjects = collection.map(p => {
        return p._id && p.style === 3 &&
          { ...p, value: p._id, label: p.title }
      });
      const newProjects2 = brand.map(p => {
        return p._id && p.style === 4 &&
          { ...p, value: p._id, label: p.title }
      });
      const type2 = type.map(p => {
        return p._id && p.style === 5 &&
          { ...p, value: p._id, label: p.title }
      });
      setCategory2(newProjects2);
      setCategory3(type2);
      setCategory(newProjects);
      console.log(dataAdmin.data)
      setSpecification(dataAdmin.data.spec)
      setText(dataAdmin.data.feature)
      if (dataAdmin?.data.category_id) {
        const optionCategory = { ...dataAdmin?.data.category_id, value: dataAdmin?.data.category_id._id, label: dataAdmin?.data.category_id.title };
        setSelected([optionCategory])
      }

      setProduct(dataAdmin.data)
      if (dataAdmin.data.color) {
        setColor(dataAdmin.data.color)
      }
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
    // fetchDriversadminGetAllDrivers(50)
    if (router.query.product) getSingleProduct(router.query.product)
  }, [router.query.product])



  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Colour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => {
                setColor2(e.target.value)
              }}
              placeholder="Add Product Color" />
            <Center mt="10px">
              <Button onClick={(e) => {
                if (color2.length > 1) {
                  setColor([...color, color2])
                  onClose()
                } else {
                  toast({
                    position: "top-right",
                    title: "Color can not be added",
                    description: "",
                    status: "error",
                    isClosable: true
                  });
                }
              }} bg="black" colorScheme="blackAlpha">
                Submit
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
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
                          src={ImagePath + "/" + product.image}
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
                    <Box mt="10px">
                      <Box fontWeight="800" mb="10px">Second Image</Box>
                      <Input
                        onChange={(event) => {
                          loadFile2(event);
                        }}
                        type="file" placeholder="First Image" />
                    </Box>
                    <Box mt="10px">
                      <Box fontWeight="800" mb="10px">Third Image</Box>
                      <Input
                        onChange={(event) => {
                          loadFile3(event);
                        }}
                        type="file" placeholder="First Image" />
                    </Box>
                  </VStack>
                  <VStack
                    spacing="6"
                    pt="15px"
                    align="stretch"
                    w="full"
                    maxW="72"
                  >
                    <Box mb="-20px">Collections</Box>
                    <Box w="full">
                      <MultiSelect
                        options={category}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </Box>
                    <Box mb="-20px">Gender</Box>
                    <Box w="full">
                      <MultiSelect
                        options={[{ value: 1, label: "Male" }, { value: 2, label: "Female" }, { value: 3, label: "Unisex" }]}
                        value={selected3}
                        onChange={setSelected3}
                        labelledBy="Select"
                      />
                    </Box>

                    <Box>Brand</Box>
                    <Box mt="-50px" w="full">
                      <MultiSelect
                        options={category2}
                        value={selected4}
                        onChange={setSelected4}
                        labelledBy="Select"
                      />
                    </Box>
                    <Box>Type</Box>
                    <Box mt="-50px" w="full">
                      <MultiSelect
                        options={category3}
                        value={selected2}
                        onChange={setSelected2}
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
                        label="Discount"
                        name="discount"
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
                    <Box w="full">
                      <Center justifyContent="space-between">
                        <Box fontWeight="800">Product Colors</Box> <Button onClick={() => onOpen()}>Add Color</Button>
                      </Center>
                      {color.length > 0 &&
                        <Center mt="10px" justifyContent="space-between">
                          <Center>
                            {color.map((a, b) => (
                              <Box mr="10px" bg={a} w="30px" h="30px">

                              </Box>
                            ))}
                          </Center>
                          <IconButton onClick={() => setColor([])}>
                            <svg width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                          </IconButton>
                        </Center>
                      }
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
                  </VStack>
                </Stack>
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
      }    </>
  );
}

export default ProductForm;
