import React, { useState, useRef} from 'react'
import { Box, Flex, Text, Img, Input, HStack, Button, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import {HiDotsHorizontal} from 'react-icons/hi'
import CustomInput from '@/components/Form/CustomInput'
import { adminUpdateSingleGame,adminUpdateSingleGameImage } from 'services/admin-services'
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { set } from 'nprogress'

const SingleGames = ({data}) => {

    const {name, image_link, description, id} = data
    const toast = useToast();
    const router = useRouter(); 
    const [isActive, setIsActive] = useState(false)
    const hiddenFileInput = useRef(null);

    const validationSchema = Yup.object({
		game_name: Yup.string().required("Game name is required"),
	});


    const submitDetails = async (
      values,
      { setSubmitting, resetForm }) =>{
      try {
         setSubmitting(true)
         
            const data = await adminUpdateSingleGame({
               name: values.game_name,
               game_category_id : id.toString()
            })
        toast({
          position: "top-right",
          title: "Game updated",
          description: "Game updated successfully",
          status: "success",
          isClosable: true,
        });
        
        router.push(
          {
            pathname: '/dashboard/admin/games',
            query: {upload:true},
          },
          '/dashboard/admin/games', // "as" argument
          )
        
         resetForm();
         setIsActive(!isActive)
      } catch (error) {
         console.log(error, "error")
         toast({
            position: "top-right",
            title: "Game update error",
            description: "Update Error",
            status: "error",
            isClosable: true,
          });
      }finally {
         setSubmitting(false);
       }

    }
    const updateFile =async (e) => {
      const formData = new FormData()
      formData.append("image", (e.target.files[0]))
      formData.append("game_category_id",id.toString())
      try {
        const  data = await adminUpdateSingleGameImage(formData); 
        toast({
          position: "top-right",
          title: "Image uploaded",
          description: "Image uploaded successfully",
          status: "success",
          isClosable: true,
        });
        router.push(
          {
            pathname: '/dashboard/admin/games',
            query: {upload:true},
          },
          '/dashboard/admin/games', // "as" argument
          )
         setIsActive(!isActive)
      } catch (error) {
         console.log(error)
         toast({
          position: "top-right",
          title: "Image upload",
          description: "Error uploading image",
          status: "error",
          isClosable: true,
        });
      }
      console.log(data, "image uploaded")
    };
    

   
      const handleClick = event => {
      hiddenFileInput.current.click();
      };

  return (
  <Box w="100%" id={id} borderRadius="10px">
		<Link href={`/dashboard/admin/games/${id}`}>
			<Img h="150px" w="100%" src={image_link}></Img>
		</Link>
		<Flex border="1px solid #EBEBEB" justifyContent="space-between" p="20px">
			<Text fontSize="16px" color="#424373">{name}</Text>
			<Box onClick={() => setIsActive(!isActive)} borderRadius="2px" p="1" bg="rgba(236, 236, 236, 0.5)"><HiDotsHorizontal/> </Box>
		</Flex>
	    {
         isActive && 
          <Box p={[1,1,1,3]} borderRadius="5px" bg="#FFFFFF" boxShadow="0px 4px 15px 0px rgba(0, 0, 0, 0.15)"> 
             <Flex justifyContent="space-between" alignItems={["unset","center"]} p={[1,1,1,3]} borderBottom="1px solid #D8D8D8" flexDir={["column", "column","column","row"]}>
                <Text
                  fontSize={["12px" ,"14px", "17px"]}
                  color="#424373"
                  fontWeight="600"
                  >Edit {name}</Text>
                  <HStack>
                     <Text cursor="pointer" onClick={handleClick} fontSize={["6px", "8px"]} color="#FF4268">Change Thumbail</Text>
                     <Input
					         ref={hiddenFileInput}
                        display={"none"}
                        placeholder={"UPLOAD"}
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateFile(e)}
              ></Input>
                     <Img borderRadius="5px" w={["28px","36px" ]} objectFit="contain" src={image_link}/>
                  </HStack>
             </Flex>
              <Formik
                initialValues={{ game_name: ""}}
                onSubmit={submitDetails}
                validationSchema={validationSchema}
              >
                {
                  ({isSubmitting})=>(
                     <Form>
                        <Box  m={[2,2,2,4]}>
                           <CustomInput
                            label="Game Name"
                            name="game_name"
                            fieldProps={{ type: "game_name" }}/>
                        </Box>
                        <Box>
                          <Button isDisabled={isSubmitting}
								              isLoading={isSubmitting} 
                                type="submit"
                                 _hover={{color:"#FF4268", 
                                 bg:"white", border:"1px solid #FF4268"}} color="white" 
                                 fontSize={[8, 12]}
                                 size={["sm","lg" ]}
                                 p={2}
                                 h="35px"
                                  borderRadius="3px" bg="#FF4268"
                                  >Save
                          </Button>
                        </Box>
                     </Form>
                  )
                }
              </Formik>
          </Box>
        }
	</Box>
  )
}

export default SingleGames
