import { HStack, Box, useToast , Heading, Button, VStack, Text } from '@chakra-ui/react'
import withAdmin from 'HOC/withAdmin'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { adminAddTab } from 'services/admin-services'
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';

const Newtab = () => {

 const router = useRouter()
 const toast = useToast();
 const validationSchema = Yup.object({
    imei: Yup.string()
          .min(15, 'imei was be upto 15 characters')
          .max(15,'imei should not be more than 15')
          .required('imei is Required'),
    phone: Yup.string()
          .required("Phone number is required")
          .matches(
              /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
              "Invalid phone number"
           ),
});
  const addTab = async (values, { setSubmitting })=>{
      values = {imei: values.imei,
                 phone_number: values.phone}
     console.log(values, "values")
     setSubmitting(false);

     
     try {
        const data = await adminAddTab(values)
          console.log(data, "dataa")
          toast({
            position: "top-right",
            title: "Tab Added",
            description: "tab added successfully",
            status: "success",
            isClosable: true,
          });
          const { redirect: redirectUrl = "/dashboard/admin/tab-management" } =
                  router.query;
                 router.push(redirectUrl);
               resetForm();
        
     } catch (error) {
        console.log(error.response?.data, "error in sending data")
       const phoneErr = error.response?.data?.errors?.phone_number
       const imeiErr = error.response?.data?.errors?.imei
        console.log(phoneErr, imeiErr)
        toast({
          position: "top-right",
          title: error.response?.data?.message,
          description:  phoneErr && imeiErr? `phone number and imei already exists` : phoneErr? phoneErr : imeiErr,
          status: "error",
          isClosable: true,
        });
     }

  }
  return (
    <Box>
        <span onClick={() =>router.push(`/dashboard/admin/tab-management`)} style={{margin:"50px 0"}}><AiOutlineArrowLeft fontSize={20} color="#414272" /></span>
        <Heading fontSize={[18, 20, 26]} ml={["14px"]} mb={["29px"]} fontWeight="700"  color="#FF4268">
			Add New Tab
		</Heading>
        <Formik
         initialValues={{ imei:"", phone:"" }}
         validationSchema={validationSchema}
         onSubmit={addTab}
        >
            <Form>
                <Box>
                    <HStack w="100%">
                        <VStack align="baseline" w="50%">
                           <label class="form_label" htmlFor="imei">IMEI</label>
                           <Field class="form_input" name="imei" type="number"/>
                          <Text color="red" fontSize="14px"><ErrorMessage name="imei"/></Text> 
                        </VStack>
                        <VStack align="baseline" w="50%">
                           <label class="form_label" htmlFor="phone">Phone number</label>
                           <Field class="form_input"  name="phone" type="phone"/>
                          <Text color="red" fontSize="14px"> <ErrorMessage name="phone" /></Text>
                        </VStack>
                    </HStack>
                    <Button 
                       type="submit" m="60px 0" color="white" bg="#FF4268"  
                       _hover={{border:"1px solid #FF4268", color:"#FF4268", bg:"transparent"}} fontSize={[12, 14, 16]} p={5}>Add Tab</Button>
                </Box>
            </Form>
        </Formik>
    </Box>
  )
}

export default withAdmin(Newtab)
