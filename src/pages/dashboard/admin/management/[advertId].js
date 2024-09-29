import AdvertForm from "@/components/Dashboard/Admin/Adverts/AdvertForm2";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Container,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  Flex,
  useToast
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  adminGetSingleAdverts,
  adminDeleteAdverts,
  adminGetQRDetails
} from "services/admin-services";
import Countdown from "react-countdown";
import moment from "moment";

function ManageSingleAdvert() {
  const toast = useToast();
  const router = useRouter();
  const AdData = router.query;
  const [fetchedData, setFetchedData] = useState([]);
  const [Download, setDownload] = useState(false)
  const [qrcodeData,setQrcodeData ] = useState([])

  const deletefunction = async () => {
    try {
      const { data } = await adminDeleteAdverts(AdData.id);
      toast({
        position: "top-right",
        title: "Advert updated successfully",
        description: "",
        status: "success",
        isClosable: true
      });

      setTimeout(() => {
        router.push("/dashboard/admin/adverts");
      }, 900);
    } catch (error) {
      toast({
        position: "top-right",
        title: "Advert failed to delete Advert",
        description: "",
        status: "error",
        isClosable: true
      });
    }
  };


  const downloadDate = [qrcodeData, fetchedData]
  const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToCSV = (apiData, fileName) => {
  setDownload(true)
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
  setDownload(false)
};


  const GetData = async () => {
    try {
      const qr = await adminGetQRDetails({id:AdData.advertId})
      setQrcodeData(qr)
      const { data } = await adminGetSingleAdverts(AdData.advertId);
      setFetchedData(data);
    } catch (error) {
      toast({
        position: "top-right",
        title: "Advert failed to fetch Advert",
        description: "",
        status: "error",
        isClosable: true
      });
    }
  };

  function numberWithCommas(x) {
    return x?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    GetData();
  }, []);

  const Completionist = () => (
    <Flex>
      <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
        <Flex
          size="10"
          bg="rgba(255,255,255,0.2)"
          borderRadius="4px"
          mt="5px"
          w="40px"
          h="40px"
          justify="center"
          align="center"
        >
          <Heading fontSize="2xl" color="red">
            0
          </Heading>
        </Flex>
        <Text fontSize="10px" fontWeight="300" mt="4px">
          Days
        </Text>
      </Box>
      <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
        <Flex
          size="10"
          bg="rgba(255,255,255,0.2)"
          borderRadius="4px"
          mt="5px"
          w="40px"
          h="40px"
          justify="center"
          align="center"
        >
          <Heading fontSize="2xl" color="red">
            {" "}
            0
          </Heading>
        </Flex>
        <Text fontSize="10px" fontWeight="300" mt="4px">
          Hours
        </Text>
      </Box>
      <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
        <Flex
          size="10"
          bg="rgba(255,255,255,0.2)"
          borderRadius="4px"
          mt="5px"
          w="40px"
          h="40px"
          justify="center"
          align="center"
        >
          <Heading fontSize="2xl" color="red"></Heading>
        </Flex>
        <Text fontSize="10px" fontWeight="300" mt="4px">
          Minutes
        </Text>
      </Box>
    </Flex>
  );

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <Flex>
          <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
            <Flex
              size="10"
              bg="rgba(255,255,255,0.2)"
              borderRadius="4px"
              mt="5px"
              w="40px"
              h="40px"
              justify="center"
              align="center"
            >
              <Heading fontSize="2xl" color="green">
                {hours}
              </Heading>
            </Flex>
            <Text fontSize="10px" fontWeight="300" mt="4px">
              hours
            </Text>
          </Box>
          <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
            <Flex
              size="10"
              bg="rgba(255,255,255,0.2)"
              borderRadius="4px"
              mt="5px"
              w="40px"
              h="40px"
              justify="center"
              align="center"
            >
              <Heading fontSize="2xl" color="green">
                {minutes}
              </Heading>
            </Flex>
            <Text fontSize="10px" fontWeight="300" mt="4px">
              Minute
            </Text>
          </Box>
          <Box size="10" mr="14px" rounded="full" w="40px" h="50px">
            <Flex
              size="10"
              bg="rgba(255,255,255,0.2)"
              borderRadius="4px"
              mt="5px"
              w="40px"
              h="40px"
              justify="center"
              align="center"
            >
              <Heading fontSize="2xl" color="green">
                {seconds}
              </Heading>
            </Flex>
            <Text fontSize="10px" fontWeight="300" mt="4px">
              seconds
            </Text>
          </Box>
        </Flex>
      );
    }
  };

  const number = 86400000 * AdData.duration;

  return (
    <Box>
      <Stack
        direction={["column", "column", "row"]}
        mb="2"
        justify={["flex-start", "flex-start", "space-between"]}
      >
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<ArrowBackIcon />}
          onClick={() => router.push("/dashboard/admin/adverts")}
        >
          Back to adverts
        </Button>
        <Button
          colorScheme="green"
          size="sm"
          variant="ghost"
          leftIcon={<DeleteIcon />}
          onClick={deletefunction}
        >
          Delete
        </Button>
      </Stack>
      <Box
        px={["4", "4", "8", "10"]}
        py={["4", "4", "8"]}
        rounded="lg"
        overflow="hidden"
        position="relative"
        color="white"
        bg="linear-gradient(-90deg, #FF4268 10.94%, #414272 94.6%)"
      >
        <Stack mb="8" direction="row" justify="space-between" align="center">
          <HStack>
            <Circle size="10" bg="gray.400" />
            <Heading fontSize="xl" fontWeight="normal">
              {fetchedData.organisation_name}
            </Heading>
          </HStack>
          <Box>
            <HStack
              bg="white"
              rounded="full"
              py="0.5"
              pl="3"
              pr="1"
              align="center"
            >
              <Text fontSize="sm" color="gray.600">
                {fetchedData.status}
              </Text>
              <Circle
                size="4"
                bg={fetchedData.status == "active" ? "green.400" : "red.400"}
              />
            </HStack>
          </Box>
        </Stack>
        <Stack direction={["column", "column", "row"]}>
          <Box
            p="4"
            bg="white"
            rounded="md"
            color="gray.600"
            w="full"
            maxW="64"
            flex="4"
          >
            3600000
            <Stack justify="space-between" direction="row" align="center">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="17.5" cy="17.5" r="17.5" fill="#424373" />
                <path
                  d="M17.4983 9.58203C18.4515 9.58203 19.3651 9.75066 20.2114 10.0586L19.2653 11.0039C17.8336 10.6146 16.3134 10.7092 14.941 11.2731C13.5687 11.8371 12.4211 12.8387 11.6768 14.1221C10.9324 15.4056 10.633 16.8991 10.8252 18.3703C11.0173 19.8415 11.6901 21.208 12.7391 22.2573C13.788 23.3067 15.1543 23.98 16.6255 24.1726C18.0966 24.3652 19.5902 24.0663 20.8739 23.3224C22.1577 22.5785 23.1596 21.4312 23.724 20.0591C24.2884 18.6869 24.3836 17.1667 23.9947 15.7349L24.94 14.7896C25.2562 15.6583 25.4175 16.5758 25.4166 17.5003C25.4166 21.8734 21.8715 25.4185 17.4983 25.4185C13.1252 25.4185 9.58008 21.8734 9.58008 17.5003C9.58008 13.1271 13.1252 9.58203 17.4983 9.58203ZM17.4983 12.7503C17.8994 12.7501 18.299 12.8006 18.6874 12.9007V14.1412C17.9256 13.8717 17.0948 13.8692 16.3314 14.1341C15.568 14.399 14.9174 14.9155 14.4862 15.5989C14.0551 16.2823 13.869 17.092 13.9587 17.8951C14.0484 18.6982 14.4084 19.4469 14.9797 20.0184C15.551 20.5898 16.2996 20.9501 17.1026 21.0401C17.9056 21.1301 18.7154 20.9444 19.3989 20.5135C20.0825 20.0826 20.5993 19.4321 20.8645 18.6688C21.1296 17.9054 21.1274 17.0747 20.8582 16.3128H22.0987C22.3464 17.272 22.2879 18.2846 21.9316 19.2089C21.5752 20.1333 20.9388 20.9231 20.1113 21.4678C19.2839 22.0125 18.3068 22.2849 17.3169 22.2468C16.327 22.2087 15.3738 21.862 14.5906 21.2554C13.8075 20.6487 13.2336 19.8123 12.9493 18.8634C12.665 17.9144 12.6846 16.9003 13.0052 15.9629C13.3258 15.0256 13.9315 14.212 14.7374 13.6359C15.5434 13.0599 16.5093 12.7502 17.4999 12.7503H17.4983ZM19.0817 17.5003C19.0816 17.8406 18.9718 18.1718 18.7687 18.4448C18.5656 18.7179 18.2799 18.9182 17.954 19.0161C17.628 19.1141 17.2793 19.1044 16.9593 18.9885C16.6393 18.8727 16.3652 18.6568 16.1775 18.3729C15.9898 18.089 15.8986 17.7522 15.9174 17.4124C15.9362 17.0727 16.0639 16.748 16.2817 16.4865C16.4995 16.225 16.7957 16.0406 17.1265 15.9607C17.4573 15.8808 17.8051 15.9096 18.1182 16.0428L19.4799 14.6812L19.4791 12.1565C19.4792 11.9991 19.5419 11.8482 19.6532 11.7369L21.6324 9.75778C21.7154 9.67485 21.8212 9.61838 21.9363 9.59552C22.0514 9.57265 22.1707 9.58441 22.2791 9.6293C22.3876 9.6742 22.4803 9.75022 22.5455 9.84777C22.6108 9.94531 22.6456 10.06 22.6457 10.1774V12.3544H24.8228C24.9402 12.3546 25.0549 12.3894 25.1524 12.4547C25.25 12.5199 25.326 12.6126 25.3709 12.721C25.4158 12.8295 25.4275 12.9488 25.4047 13.0639C25.3818 13.179 25.3253 13.2847 25.2424 13.3678L23.2632 15.3469C23.152 15.4583 23.0011 15.521 22.8437 15.5211H20.3182L18.9566 16.8828C19.0373 17.0728 19.0817 17.281 19.0817 17.5003ZM22.5975 14.3336L23.3891 13.5419H22.0512C21.8937 13.5419 21.7427 13.4794 21.6314 13.368C21.52 13.2567 21.4575 13.1057 21.4575 12.9482V11.6103L20.6666 12.4019V14.2869C20.6831 14.3018 20.6987 14.3177 20.7133 14.3344H22.5975V14.3336Z"
                  fill="white"
                />
              </svg>

              <Flex
                justify="center"
                align="center"
                bg="#614371"
                fontSize="10px"
                color="#FFF"
                w="44px"
                h="28px"
                borderRadius="6px"
              >
                Plays
              </Flex>
            </Stack>
            <Heading fontSize="sm" mt="60px" color="#424373">
              Target
            </Heading>
            <Text fontSize="2xl" mt="4px" color="#424373">
              {fetchedData.target}
            </Text>
          </Box>
          <Stack
            divider={<StackDivider />}
            direction={["column", "column", "row"]}
            py="4"
            bg="rgba(255,255,255,0.2)"
            rounded="md"
            color="white"
            pl="20px"
          >
            <Box px="4" w="full">
              <Circle
                size="10"
                bg="rgba(255,255,255,0.2)"
                rounded="full"
                mr="4"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 2.75C6.33333 2.75 2.75 6.33333 2.75 10.75C2.75 15.1667 6.33333 18.75 10.75 18.75C15.1667 18.75 18.75 15.1667 18.75 10.75C18.75 6.33333 15.1667 2.75 10.75 2.75Z"
                    stroke="white"
                    stroke-width="1.375"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M11 5.5V11.6875H15.125"
                    stroke="white"
                    stroke-width="1.375"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Circle>
              <Text fontSize="sm" mt="24px" mb="4px">
                Ads RunTime
              </Text>
              <Countdown
                daysInHours={true}
                date={moment(AdData.created_at).valueOf() + number}
                renderer={renderer}
              />
            </Box>
            <Box px="4" w="full">
              <Circle
                size="10"
                bg="rgba(255,255,255,0.2)"
                rounded="full"
                mr="4"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.67422 1.12527C11.4742 1.23777 13.1617 2.13777 14.3992 3.37527C15.8617 4.95027 16.6492 6.86277 16.6492 9.11277C16.6492 10.9128 15.9742 12.6003 14.8492 14.0628C13.7242 15.4128 12.1492 16.4253 10.3492 16.7628C8.54922 17.1003 6.74922 16.8753 5.17422 15.9753C3.59922 15.0753 2.36172 13.7253 1.68672 12.0378C1.01172 10.3503 0.899219 8.43777 1.46172 6.75027C2.02422 4.95027 3.03672 3.48777 4.61172 2.47527C6.07422 1.46277 7.87422 1.01277 9.67422 1.12527ZM10.2367 15.6378C11.6992 15.3003 13.0492 14.5128 14.0617 13.2753C14.9617 12.0378 15.5242 10.5753 15.4117 9.00027C15.4117 7.20027 14.7367 5.40027 13.4992 4.16277C12.3742 3.03777 11.0242 2.36277 9.44922 2.25027C7.98672 2.13777 6.41172 2.47527 5.17422 3.37527C3.93672 4.27527 3.03672 5.51277 2.58672 7.08777C2.13672 8.55027 2.13672 10.1253 2.81172 11.5878C3.48672 13.0503 4.49922 14.1753 5.84922 14.9628C7.19922 15.7503 8.77422 15.9753 10.2367 15.6378Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 5.62523L7.62412 5.15723L12.6866 8.53223V9.46823L7.62412 12.8432L6.75 12.3752V5.62523ZM7.875 6.67598V11.3245L11.3614 9.00023L7.875 6.67598Z"
                    fill="white"
                  />
                </svg>
              </Circle>
              <Flex mt="14" w="80px" fontSize="sm" h="40px">
                Times Played
              </Flex>
              <Heading fontSize="2xl" mt="2">
                {fetchedData.clicks}
              </Heading>
            </Box>
            <Box px="4" w="full">
              <Circle
                size="10"
                bg="rgba(255,255,255,0.2)"
                rounded="full"
                mr="4"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3372 9.7875C18.6021 7.88603 17.326 6.24164 15.6665 5.05755C14.007 3.87347 12.0369 3.20161 9.99974 3.125C7.96256 3.20161 5.99248 3.87347 4.33299 5.05755C2.67349 6.24164 1.39733 7.88603 0.662234 9.7875C0.612589 9.92482 0.612589 10.0752 0.662234 10.2125C1.39733 12.114 2.67349 13.7584 4.33299 14.9424C5.99248 16.1265 7.96256 16.7984 9.99974 16.875C12.0369 16.7984 14.007 16.1265 15.6665 14.9424C17.326 13.7584 18.6021 12.114 19.3372 10.2125C19.3869 10.0752 19.3869 9.92482 19.3372 9.7875V9.7875ZM9.99974 15.625C6.68723 15.625 3.18723 13.1688 1.91848 10C3.18723 6.83125 6.68723 4.375 9.99974 4.375C13.3122 4.375 16.8122 6.83125 18.081 10C16.8122 13.1688 13.3122 15.625 9.99974 15.625Z"
                    fill="white"
                  />
                  <path
                    d="M10 6.25C9.25832 6.25 8.5333 6.46993 7.91661 6.88199C7.29993 7.29404 6.81928 7.87971 6.53545 8.56494C6.25162 9.25016 6.17736 10.0042 6.32206 10.7316C6.46675 11.459 6.8239 12.1272 7.34835 12.6517C7.8728 13.1761 8.54098 13.5333 9.26841 13.6779C9.99584 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.706 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.75 9.00544 13.3549 8.05161 12.6517 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61108 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45158 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58187 7.8826 9.02732 7.6445 9.51228 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5Z"
                    fill="white"
                  />
                </svg>
              </Circle>
              <Text mt="14" fontSize="sm" h="40px">
                Views
              </Text>
              <Heading fontSize="2xl" mt="2">
                {fetchedData.views}
              </Heading>
            </Box>
            <Box px="4" w="full">
              <Circle
                size="10"
                bg="rgba(255,255,255,0.2)"
                rounded="full"
                mr="4"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.32227 1.58301C7.47974 1.58301 7.63076 1.64556 7.74211 1.75691C7.85346 1.86826 7.91602 2.01929 7.91602 2.17676V4.15592C7.91602 4.3134 7.85346 4.46442 7.74211 4.57577C7.63076 4.68712 7.47974 4.74967 7.32227 4.74967C7.16479 4.74967 7.01377 4.68712 6.90242 4.57577C6.79107 4.46442 6.72852 4.3134 6.72852 4.15592V2.17676C6.72852 2.01929 6.79107 1.86826 6.90242 1.75691C7.01377 1.64556 7.16479 1.58301 7.32227 1.58301ZM3.5381 3.14259C3.64943 3.0314 3.80034 2.96895 3.95768 2.96895C4.11503 2.96895 4.26594 3.0314 4.37727 3.14259L5.76268 4.52801C5.82102 4.58237 5.86781 4.64792 5.90026 4.72075C5.93271 4.79358 5.95016 4.8722 5.95157 4.95193C5.95297 5.03165 5.93831 5.11084 5.90845 5.18477C5.87858 5.2587 5.83414 5.32586 5.77775 5.38225C5.72137 5.43863 5.65421 5.48308 5.58028 5.51294C5.50635 5.5428 5.42716 5.55747 5.34744 5.55606C5.26771 5.55465 5.18909 5.5372 5.11626 5.50475C5.04342 5.4723 4.97787 5.42551 4.92352 5.36717L3.5381 3.98176C3.42691 3.87043 3.36445 3.71952 3.36445 3.56217C3.36445 3.40483 3.42691 3.25392 3.5381 3.14259ZM11.1064 3.14259C11.2176 3.25392 11.2801 3.40483 11.2801 3.56217C11.2801 3.71952 11.2176 3.87043 11.1064 3.98176L9.72102 5.36717C9.66666 5.42551 9.60111 5.4723 9.52828 5.50475C9.45544 5.5372 9.37682 5.55465 9.2971 5.55606C9.21737 5.55747 9.13818 5.5428 9.06425 5.51294C8.99032 5.48308 8.92316 5.43863 8.86678 5.38225C8.8104 5.32586 8.76595 5.2587 8.73609 5.18477C8.70622 5.11084 8.69156 5.03165 8.69296 4.95193C8.69437 4.8722 8.71182 4.79358 8.74427 4.72075C8.77672 4.64792 8.82351 4.58237 8.88185 4.52801L10.2673 3.14259C10.3786 3.0314 10.5295 2.96895 10.6868 2.96895C10.8442 2.96895 10.9951 3.0314 11.1064 3.14259ZM1.97852 6.92676C1.97852 6.76929 2.04107 6.61826 2.15242 6.50691C2.26377 6.39556 2.41479 6.33301 2.57227 6.33301H4.55143C4.7089 6.33301 4.85993 6.39556 4.97128 6.50691C5.08263 6.61826 5.14518 6.76929 5.14518 6.92676C5.14518 7.08423 5.08263 7.23525 4.97128 7.3466C4.85993 7.45795 4.7089 7.52051 4.55143 7.52051H2.57227C2.41479 7.52051 2.26377 7.45795 2.15242 7.3466C2.04107 7.23525 1.97852 7.08423 1.97852 6.92676ZM8.45197 6.71776C7.7751 6.13667 6.72852 6.61801 6.72852 7.51022V16.4355C6.72852 17.3934 7.91206 17.8462 8.55093 17.1321L10.6203 14.8181C10.8388 14.5743 11.146 14.4302 11.473 14.4167L14.513 14.2948C15.4606 14.2568 15.8707 13.0764 15.1503 12.4581L8.45277 6.71776H8.45197ZM7.91602 16.0602V7.82213L14.1005 13.1231L11.4247 13.23C11.1042 13.243 10.7897 13.3201 10.4996 13.4569C10.2095 13.5937 9.94988 13.7874 9.73606 14.0264L7.91602 16.0602Z"
                    fill="white"
                  />
                </svg>
              </Circle>
              <Text mt="14" w="80px" fontSize="sm" h="40px">
                Click Rate
              </Text>
              <Heading fontSize="2xl" mt="2">
                {fetchedData.clicks}
              </Heading>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box mt="4">
        <Box
          px={["4", "4", "8", "10"]}
          mb="4"
          py={["4", "4", "8"]}
          rounded="lg"
          overflow="hidden"
          position="relative"
          color="white"
          bg="linear-gradient(-90deg, #FF4268 10.94%, #414272 94.6%)"
        >
          <Stack mb="8" direction="row" justify="space-between" align="center">
            <HStack>
              <Circle size="10" bg="gray.400" />
              <Heading fontSize="xl" fontWeight="normal">
                QR-code statistics
              </Heading>
            </HStack>

            <Box>
              <HStack>
                <Button
                  mt="4"
                  colorScheme="pink"
                  textTransform="capitalize"
                  bg="green"
                  onClick={async ()=>{
                    exportToCSV(downloadDate,fetchedData.organisation_name )
                  }}
                  isDisabled={Download}
                  isLoading={Download}
                >
                  Download
                </Button>
              </HStack>
            </Box>
          </Stack>

          <Stack direction={["column", "column", "row"]}>
            <Stack
              divider={<StackDivider />}
              direction={["column", "column", "row"]}
              py="4"
              bg="rgba(255,255,255,0.2)"
              rounded="md"
              color="white"
              pl="20px"
            >
              <Box px="4" w="full">
                <Circle
                  size="10"
                  bg="rgba(255,255,255,0.2)"
                  rounded="full"
                  mr="4"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.67422 1.12527C11.4742 1.23777 13.1617 2.13777 14.3992 3.37527C15.8617 4.95027 16.6492 6.86277 16.6492 9.11277C16.6492 10.9128 15.9742 12.6003 14.8492 14.0628C13.7242 15.4128 12.1492 16.4253 10.3492 16.7628C8.54922 17.1003 6.74922 16.8753 5.17422 15.9753C3.59922 15.0753 2.36172 13.7253 1.68672 12.0378C1.01172 10.3503 0.899219 8.43777 1.46172 6.75027C2.02422 4.95027 3.03672 3.48777 4.61172 2.47527C6.07422 1.46277 7.87422 1.01277 9.67422 1.12527ZM10.2367 15.6378C11.6992 15.3003 13.0492 14.5128 14.0617 13.2753C14.9617 12.0378 15.5242 10.5753 15.4117 9.00027C15.4117 7.20027 14.7367 5.40027 13.4992 4.16277C12.3742 3.03777 11.0242 2.36277 9.44922 2.25027C7.98672 2.13777 6.41172 2.47527 5.17422 3.37527C3.93672 4.27527 3.03672 5.51277 2.58672 7.08777C2.13672 8.55027 2.13672 10.1253 2.81172 11.5878C3.48672 13.0503 4.49922 14.1753 5.84922 14.9628C7.19922 15.7503 8.77422 15.9753 10.2367 15.6378Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.75 5.62523L7.62412 5.15723L12.6866 8.53223V9.46823L7.62412 12.8432L6.75 12.3752V5.62523ZM7.875 6.67598V11.3245L11.3614 9.00023L7.875 6.67598Z"
                      fill="white"
                    />
                  </svg>
                </Circle>
                <Flex mt="14" w="80px" fontSize="sm" h="40px">
                  Name of Device
                </Flex>
                <Heading fontSize="2xl" mt="2">
                  {qrcodeData.length}
                </Heading>
              </Box>
              <Box px="4" w="full">
                <Circle
                  size="10"
                  bg="rgba(255,255,255,0.2)"
                  rounded="full"
                  mr="4"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.3372 9.7875C18.6021 7.88603 17.326 6.24164 15.6665 5.05755C14.007 3.87347 12.0369 3.20161 9.99974 3.125C7.96256 3.20161 5.99248 3.87347 4.33299 5.05755C2.67349 6.24164 1.39733 7.88603 0.662234 9.7875C0.612589 9.92482 0.612589 10.0752 0.662234 10.2125C1.39733 12.114 2.67349 13.7584 4.33299 14.9424C5.99248 16.1265 7.96256 16.7984 9.99974 16.875C12.0369 16.7984 14.007 16.1265 15.6665 14.9424C17.326 13.7584 18.6021 12.114 19.3372 10.2125C19.3869 10.0752 19.3869 9.92482 19.3372 9.7875V9.7875ZM9.99974 15.625C6.68723 15.625 3.18723 13.1688 1.91848 10C3.18723 6.83125 6.68723 4.375 9.99974 4.375C13.3122 4.375 16.8122 6.83125 18.081 10C16.8122 13.1688 13.3122 15.625 9.99974 15.625Z"
                      fill="white"
                    />
                    <path
                      d="M10 6.25C9.25832 6.25 8.5333 6.46993 7.91661 6.88199C7.29993 7.29404 6.81928 7.87971 6.53545 8.56494C6.25162 9.25016 6.17736 10.0042 6.32206 10.7316C6.46675 11.459 6.8239 12.1272 7.34835 12.6517C7.8728 13.1761 8.54098 13.5333 9.26841 13.6779C9.99584 13.8226 10.7498 13.7484 11.4351 13.4645C12.1203 13.1807 12.706 12.7001 13.118 12.0834C13.5301 11.4667 13.75 10.7417 13.75 10C13.75 9.00544 13.3549 8.05161 12.6517 7.34835C11.9484 6.64509 10.9946 6.25 10 6.25ZM10 12.5C9.50555 12.5 9.0222 12.3534 8.61108 12.0787C8.19995 11.804 7.87952 11.4135 7.6903 10.9567C7.50108 10.4999 7.45158 9.99723 7.54804 9.51227C7.6445 9.02732 7.8826 8.58186 8.23223 8.23223C8.58187 7.8826 9.02732 7.6445 9.51228 7.54804C9.99723 7.45157 10.4999 7.50108 10.9567 7.6903C11.4135 7.87952 11.804 8.19995 12.0787 8.61107C12.3534 9.0222 12.5 9.50555 12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5Z"
                      fill="white"
                    />
                  </svg>
                </Circle>
                <Text mt="14" fontSize="sm" h="40px">
                  Small device
                </Text>
                <Heading fontSize="2xl" mt="2">
                  {0}
                </Heading>
              </Box>
              <Box px="4" w="full">
                <Circle
                  size="10"
                  bg="rgba(255,255,255,0.2)"
                  rounded="full"
                  mr="4"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.32227 1.58301C7.47974 1.58301 7.63076 1.64556 7.74211 1.75691C7.85346 1.86826 7.91602 2.01929 7.91602 2.17676V4.15592C7.91602 4.3134 7.85346 4.46442 7.74211 4.57577C7.63076 4.68712 7.47974 4.74967 7.32227 4.74967C7.16479 4.74967 7.01377 4.68712 6.90242 4.57577C6.79107 4.46442 6.72852 4.3134 6.72852 4.15592V2.17676C6.72852 2.01929 6.79107 1.86826 6.90242 1.75691C7.01377 1.64556 7.16479 1.58301 7.32227 1.58301ZM3.5381 3.14259C3.64943 3.0314 3.80034 2.96895 3.95768 2.96895C4.11503 2.96895 4.26594 3.0314 4.37727 3.14259L5.76268 4.52801C5.82102 4.58237 5.86781 4.64792 5.90026 4.72075C5.93271 4.79358 5.95016 4.8722 5.95157 4.95193C5.95297 5.03165 5.93831 5.11084 5.90845 5.18477C5.87858 5.2587 5.83414 5.32586 5.77775 5.38225C5.72137 5.43863 5.65421 5.48308 5.58028 5.51294C5.50635 5.5428 5.42716 5.55747 5.34744 5.55606C5.26771 5.55465 5.18909 5.5372 5.11626 5.50475C5.04342 5.4723 4.97787 5.42551 4.92352 5.36717L3.5381 3.98176C3.42691 3.87043 3.36445 3.71952 3.36445 3.56217C3.36445 3.40483 3.42691 3.25392 3.5381 3.14259ZM11.1064 3.14259C11.2176 3.25392 11.2801 3.40483 11.2801 3.56217C11.2801 3.71952 11.2176 3.87043 11.1064 3.98176L9.72102 5.36717C9.66666 5.42551 9.60111 5.4723 9.52828 5.50475C9.45544 5.5372 9.37682 5.55465 9.2971 5.55606C9.21737 5.55747 9.13818 5.5428 9.06425 5.51294C8.99032 5.48308 8.92316 5.43863 8.86678 5.38225C8.8104 5.32586 8.76595 5.2587 8.73609 5.18477C8.70622 5.11084 8.69156 5.03165 8.69296 4.95193C8.69437 4.8722 8.71182 4.79358 8.74427 4.72075C8.77672 4.64792 8.82351 4.58237 8.88185 4.52801L10.2673 3.14259C10.3786 3.0314 10.5295 2.96895 10.6868 2.96895C10.8442 2.96895 10.9951 3.0314 11.1064 3.14259ZM1.97852 6.92676C1.97852 6.76929 2.04107 6.61826 2.15242 6.50691C2.26377 6.39556 2.41479 6.33301 2.57227 6.33301H4.55143C4.7089 6.33301 4.85993 6.39556 4.97128 6.50691C5.08263 6.61826 5.14518 6.76929 5.14518 6.92676C5.14518 7.08423 5.08263 7.23525 4.97128 7.3466C4.85993 7.45795 4.7089 7.52051 4.55143 7.52051H2.57227C2.41479 7.52051 2.26377 7.45795 2.15242 7.3466C2.04107 7.23525 1.97852 7.08423 1.97852 6.92676ZM8.45197 6.71776C7.7751 6.13667 6.72852 6.61801 6.72852 7.51022V16.4355C6.72852 17.3934 7.91206 17.8462 8.55093 17.1321L10.6203 14.8181C10.8388 14.5743 11.146 14.4302 11.473 14.4167L14.513 14.2948C15.4606 14.2568 15.8707 13.0764 15.1503 12.4581L8.45277 6.71776H8.45197ZM7.91602 16.0602V7.82213L14.1005 13.1231L11.4247 13.23C11.1042 13.243 10.7897 13.3201 10.4996 13.4569C10.2095 13.5937 9.94988 13.7874 9.73606 14.0264L7.91602 16.0602Z"
                      fill="white"
                    />
                  </svg>
                </Circle>
                <Text mt="14" w="80px" fontSize="sm" h="40px">
                  Large Device
                </Text>
                <Heading fontSize="2xl" mt="2">
                  {fetchedData.clicks}
                </Heading>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Container maxW="container.md" mx="0">
          <AdvertForm fetchedData={fetchedData} />
        </Container>
      </Box>
    </Box>
  );
}

export default withAdmin(ManageSingleAdvert);
