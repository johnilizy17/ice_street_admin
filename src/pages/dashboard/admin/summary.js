import { cashFormat } from "@/components/cashFormat";
import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import withAdmin from "HOC/withAdmin";
import moment from "moment";
import Head from "next/head";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { adminGetDashboardSummary } from "services/admin-services";
import { authService } from "utils";

function DashboardHome() {
  const { user } = useSelector((state) => state.admin);
  const {
    isLoading,
    error,
    data: dashboardStats = {
      pending_verifications: 0,
      total_drivers: 0,
      dashboard: {},
      userNumber: 0,
      payment: [],
      transaction: []
    },
    isFetching
  } = useQuery("dashboardSummary", async () => {
    const res = await adminGetDashboardSummary();
    console.log(res)
    return res.data;
  });

  return (
    <Flex flex="1" h="full" flexDir="column">
      <Head>
        <title>Ice Street - Admin Dashboard</title>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
        <meta
          property="og:title"
          content="Ice Street - Admin Dashboard"
          key="title"
        />
        <meta property="og:description" content="Awefun" key="description" />
      </Head>
      <Flex w="full" flex="1" flexDir="column">
        <Stack direction={["column", "column", "row"]} w="full">
          <Box p="4" bg="#22233F" rounded="md" color="white" w="full" flex="4">
            <Flex
              w="45.05px"
              h="45.05px"
              justify="center"
              bg="gray.200"
              rounded="full"
              mr="4"
            >
              <Center>
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4397 18.0988H15.6856V0.904938C15.6856 0.405148 15.2804 0 14.7807 0H2.11152C1.61173 0 1.20658 0.405148 1.20658 0.904938V18.0988H0.452469C0.202593 18.0988 0 18.3014 0 18.5512V19.3053H16.8922V18.5512C16.8922 18.3014 16.6896 18.0988 16.4397 18.0988ZM4.82634 2.86564C4.82634 2.61576 5.02893 2.41317 5.2788 2.41317H6.78703C7.03691 2.41317 7.2395 2.61576 7.2395 2.86564V4.37387C7.2395 4.62374 7.03691 4.82634 6.78703 4.82634H5.2788C5.02893 4.82634 4.82634 4.62374 4.82634 4.37387V2.86564ZM4.82634 6.48539C4.82634 6.23551 5.02893 6.03292 5.2788 6.03292H6.78703C7.03691 6.03292 7.2395 6.23551 7.2395 6.48539V7.99362C7.2395 8.24349 7.03691 8.44609 6.78703 8.44609H5.2788C5.02893 8.44609 4.82634 8.24349 4.82634 7.99362V6.48539ZM6.78703 12.0658H5.2788C5.02893 12.0658 4.82634 11.8632 4.82634 11.6134V10.1051C4.82634 9.85526 5.02893 9.65267 5.2788 9.65267H6.78703C7.03691 9.65267 7.2395 9.85526 7.2395 10.1051V11.6134C7.2395 11.8632 7.03691 12.0658 6.78703 12.0658ZM9.65267 18.0988H7.2395V14.9315C7.2395 14.6816 7.4421 14.479 7.69197 14.479H9.2002C9.45008 14.479 9.65267 14.6816 9.65267 14.9315V18.0988ZM12.0658 11.6134C12.0658 11.8632 11.8632 12.0658 11.6134 12.0658H10.1051C9.85526 12.0658 9.65267 11.8632 9.65267 11.6134V10.1051C9.65267 9.85526 9.85526 9.65267 10.1051 9.65267H11.6134C11.8632 9.65267 12.0658 9.85526 12.0658 10.1051V11.6134ZM12.0658 7.99362C12.0658 8.24349 11.8632 8.44609 11.6134 8.44609H10.1051C9.85526 8.44609 9.65267 8.24349 9.65267 7.99362V6.48539C9.65267 6.23551 9.85526 6.03292 10.1051 6.03292H11.6134C11.8632 6.03292 12.0658 6.23551 12.0658 6.48539V7.99362ZM12.0658 4.37387C12.0658 4.62374 11.8632 4.82634 11.6134 4.82634H10.1051C9.85526 4.82634 9.65267 4.62374 9.65267 4.37387V2.86564C9.65267 2.61576 9.85526 2.41317 10.1051 2.41317H11.6134C11.8632 2.41317 12.0658 2.61576 12.0658 2.86564V4.37387Z"
                    fill="#414272"
                  />
                </svg>
              </Center>
            </Flex>
            <Heading fontSize="2xl" mt="6">
              {dashboardStats?.pending_verifications ?? 0}
            </Heading>
            <Text fontSize="sm" mt="4" display="flex" align="center">
              Pending withdraws and offline payment
              <svg
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginTop: 6, marginLeft: 9.82 }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 7.9425L3.435 4.5L0 1.0575L1.0575 0L5.5575 4.5L1.0575 9L0 7.9425Z"
                  fill="white"
                />
              </svg>
            </Text>
          </Box>
          <Box p="4" bg="white" rounded="md" color="#22233F" w="full" flex="3">
            <Flex
              w="45.05px"
              h="45.05px"
              justify="center"
              bg="gray.200"
              rounded="full"
              mr="4"
            >
              <Center>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9649 2.42326e-06C8.79512 0.00120421 6.67439 0.645786 4.87092 1.85224C3.06744 3.05869 1.66221 4.77284 0.832915 6.77791C0.00362058 8.78299 -0.212491 10.9889 0.211907 13.1168C0.636306 15.2447 1.68215 17.199 3.2172 18.7325C4.75225 20.266 6.70756 21.3099 8.83588 21.7322C10.9642 22.1545 13.1699 21.9362 15.1742 21.1049C17.1784 20.2736 18.8912 18.8667 20.0958 17.062C21.3005 15.2573 21.943 13.1359 21.942 10.9661C21.9415 9.52526 21.6572 8.09859 21.1052 6.76762C20.5533 5.43665 19.7445 4.22746 18.7252 3.20911C17.7058 2.19076 16.4958 1.38321 15.1643 0.832585C13.8328 0.281959 12.4058 -0.000955263 10.9649 2.42326e-06ZM18.524 13.92C18.0963 13.7827 17.2736 13.7402 16.9674 13.372C16.8143 13.1873 16.9152 12.4959 16.9152 12.4959C17.4788 12.5291 18.0417 12.4183 18.5507 12.1739C18.756 12.0524 18.6613 12.0318 18.5507 11.8519C18.1621 10.8156 18.0442 9.69736 18.208 8.6028C18.2422 8.15629 18.1644 7.70831 17.9818 7.29945C17.7991 6.89058 17.5173 6.53377 17.1619 6.26133C16.65 6.00026 16.0798 5.87475 15.5057 5.89681C15.0507 5.88616 14.5976 5.95948 14.1691 6.11309C11.9321 7.00982 13.2517 9.97463 12.4862 11.6721C12.3538 11.9564 12.1642 12.0573 12.4971 12.2262C12.9794 12.4339 13.4972 12.5465 14.0221 12.5579C14.0221 12.5579 14.0379 13.2225 14.0221 13.2869C13.9638 13.5458 13.4 13.7244 13.1885 13.7827C12.8939 13.8636 12.6049 13.9639 12.3234 14.0828C12.2815 14.1002 12.2463 14.1306 12.2231 14.1696C12.1999 14.2086 12.19 14.2541 12.1948 14.2992C12.1996 14.3443 12.2188 14.3867 12.2497 14.42C12.2805 14.4532 12.3213 14.4756 12.3659 14.4838C12.5721 14.5192 12.7752 14.5704 12.9735 14.6369C13.8789 14.8716 14.7132 15.3242 15.4036 15.9553C16.0336 16.5823 16.4093 17.4202 16.4583 18.3077C16.4695 18.4257 16.4483 18.5446 16.3972 18.6516C16.346 18.7586 16.2668 18.8497 16.1679 18.9152L15.8678 19.1048C15.8455 19.118 15.8202 19.1252 15.7943 19.1258C15.7684 19.1263 15.7428 19.1202 15.72 19.108C15.6971 19.0958 15.6778 19.0779 15.6639 19.056C15.65 19.0342 15.642 19.0091 15.6406 18.9833C15.6496 18.2291 15.4212 17.4912 14.9877 16.8741C14.5542 16.257 13.9375 15.7918 13.225 15.5446C12.5129 15.3016 11.7426 15.2809 11.0305 15.033C10.8143 14.9589 10.3865 14.869 10.3015 14.6211C10.2341 14.3666 10.2006 14.1043 10.2019 13.841C10.1913 13.6409 10.1861 13.4405 10.1861 13.2396C10.1861 13.1071 10.5238 12.8276 10.598 12.7074C10.8355 12.1891 10.9598 11.6261 10.9625 11.0561C11.4218 11.1776 11.4789 10.3331 11.5591 10.0755C11.6174 9.89565 11.8228 8.9734 11.4218 8.83123C11.54 8.58605 11.6121 8.32121 11.6344 8.04994C11.7686 7.36543 11.7475 6.65952 11.5725 5.98429C11.3463 5.33785 10.9226 4.77886 10.3613 4.38637C9.80009 3.99388 9.12965 3.78776 8.44484 3.79714C7.74909 3.74 7.05285 3.90139 6.4532 4.25883C5.85356 4.61626 5.3804 5.15192 5.09971 5.79109C4.8819 6.46339 4.83102 7.1786 4.95147 7.87496C4.9711 8.20586 5.05357 8.52999 5.19449 8.83002C4.8567 8.97826 4.95147 9.7632 5.01466 9.95397C5.0985 10.2225 5.17262 11.1885 5.65258 11.0561C5.68527 11.4886 5.75519 11.9175 5.86157 12.338C5.94956 12.6102 6.09736 12.8593 6.29414 13.067C6.38892 13.1727 6.4363 13.1885 6.43144 13.3198C6.44855 13.7406 6.4151 14.162 6.33181 14.5749C6.22609 14.9759 5.34516 15.1448 4.99521 15.2189C4.24037 15.3134 3.50347 15.5181 2.80806 15.8265C1.95558 14.3912 1.49637 12.7566 1.47668 11.0874C1.457 9.41813 1.87755 7.77317 2.69596 6.31819C3.51437 4.86321 4.70174 3.64959 6.13848 2.79957C7.57522 1.94955 9.21059 1.49314 10.8799 1.47633C13.3976 1.456 15.8211 2.43274 17.6212 4.19326C18.9873 5.53495 19.917 7.2575 20.2887 9.13586C20.6605 11.0142 20.4571 12.961 19.705 14.722C19.3993 14.346 18.9905 14.0673 18.5288 13.92H18.524Z"
                    fill="#FF4268"
                  />
                </svg>
              </Center>
            </Flex>
            <Heading fontSize="2xl" mt="6">
              {dashboardStats?.userNumber ?? 0}
            </Heading>
            <Text fontSize="sm" mt="4">
              Total users
            </Text>
          </Box>
          <Box p="4" bg="white" rounded="md" color="#22233F" w="full" flex="3">
            <Flex w="45.05px" h="45.05px" bg="gray.200" rounded="full" justify="center" mr="4">
              <Center>
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.49461 9.26656C11.0535 9.26656 13.1279 7.19217 13.1279 4.63328C13.1279 2.07439 11.0535 0 8.49461 0C5.93572 0 3.86133 2.07439 3.86133 4.63328C3.86133 7.19217 5.93572 9.26656 8.49461 9.26656Z"
                    fill="#57D0EF"
                  />
                  <path
                    d="M12.7415 11.5833H4.24718C1.90428 11.5833 0 13.4875 0 15.8304V18.1471C0 18.7865 0.518928 19.3054 1.15832 19.3054H15.8304C16.4698 19.3054 16.9887 18.7865 16.9887 18.1471V15.8304C16.9887 13.4875 15.0844 11.5833 12.7415 11.5833Z"
                    fill="#57D0EF"
                  />
                </svg>
              </Center>
            </Flex>
            <Heading fontSize="2xl" mt="6">
              {dashboardStats?.dashboard && dashboardStats?.dashboard.orders ? cashFormat(dashboardStats?.dashboard.orders) : 0}
            </Heading>
            <Text fontSize="sm" mt="4">
              Total Orders
            </Text>
          </Box>
          <Box p="4" bg="white" rounded="md" color="#22233F" w="full" flex="3">
            <Flex
              w="45.05px"
              h="45.05px"
              justify="center"
              bg="gray.200"
              rounded="full"
              mr="4"

            >
              <Center>
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.4995 5.7411C16.7057 1.3077 14.9309 0 13.9868 0C12.5135 0 12.1355 1.0953 8.99988 1.1322C5.86428 1.0953 5.48628 0 4.01298 0C3.06888 0 1.29318 1.3077 0.499384 5.7411C0.0466844 8.2719 -0.444716 12.0501 0.726184 12.5037C2.18328 13.068 2.67738 11.6568 4.27758 10.4643C5.90208 9.2556 6.68148 8.9712 8.99988 8.9712C11.3183 8.9712 12.0977 9.2556 13.7222 10.4643C15.3224 11.6559 15.8165 13.068 17.2736 12.5037C18.4445 12.0501 17.9531 8.2728 17.4995 5.7411ZM5.39988 6.3162C4.92249 6.3162 4.46466 6.12656 4.12709 5.78899C3.78953 5.45143 3.59988 4.99359 3.59988 4.5162C3.59988 4.03881 3.78953 3.58097 4.12709 3.24341C4.46466 2.90584 4.92249 2.7162 5.39988 2.7162C5.87727 2.7162 6.33511 2.90584 6.67268 3.24341C7.01024 3.58097 7.19988 4.03881 7.19988 4.5162C7.19988 4.99359 7.01024 5.45143 6.67268 5.78899C6.33511 6.12656 5.87727 6.3162 5.39988 6.3162ZM11.6999 6.3162C11.4612 6.3162 11.2323 6.22138 11.0635 6.0526C10.8947 5.88381 10.7999 5.65489 10.7999 5.4162C10.7999 5.17751 10.8947 4.94859 11.0635 4.7798C11.2323 4.61102 11.4612 4.5162 11.6999 4.5162C11.9386 4.5162 12.1675 4.61102 12.3363 4.7798C12.5051 4.94859 12.5999 5.17751 12.5999 5.4162C12.5999 5.65489 12.5051 5.88381 12.3363 6.0526C12.1675 6.22138 11.9386 6.3162 11.6999 6.3162ZM13.4999 4.5162C13.2612 4.5162 13.0323 4.42138 12.8635 4.2526C12.6947 4.08381 12.5999 3.85489 12.5999 3.6162C12.5999 3.37751 12.6947 3.14859 12.8635 2.9798C13.0323 2.81102 13.2612 2.7162 13.4999 2.7162C13.7386 2.7162 13.9675 2.81102 14.1363 2.9798C14.3051 3.14859 14.3999 3.37751 14.3999 3.6162C14.3999 3.85489 14.3051 4.08381 14.1363 4.2526C13.9675 4.42138 13.7386 4.5162 13.4999 4.5162Z"
                    fill="#FFBD31"
                  />
                </svg>
              </Center>
            </Flex>
            <Heading fontSize="2xl" mt="6">
              {dashboardStats?.dashboard && dashboardStats?.dashboard?.sales ? cashFormat(dashboardStats?.dashboard.sales) : 0}
            </Heading>
            <Text fontSize="sm" mt="4">
              Sales
            </Text>
          </Box>
        </Stack>
        <Stack direction={["column", "column", "row"]} w="full" mt="4" flex="1">
          <Box bg="white" w="full" h="400px" rounded="md" p="4">
            <Heading fontWeight="medium" fontSize="xl" mb="4">
              Adverts
            </Heading>
            <Center h="full">
              <Image src="/infographics/no-data.svg" maxW="96" w="full" />
            </Center>
            {/* <Table variant="striped">
							<Tbody>
								{Array(10)
									.fill("")
									.map((_, index) => (
										<Tr key={index}>
											<Td>Jul 21, 2021/9:00 AM</Td>
											<Td>You hit 100 points</Td>
										</Tr>
									))}
							</Tbody>
						</Table> */}
          </Box>
          <VStack
            w="full"
            maxW="sm"
            flexDir="column"
            h="full"
            align="stretch"
            spacing="4"
          >
            <VStack p="4" bg="white" h="full" rounded="md" shadow="sm">
              <Flex w="full" justify="space-between">
                <Box>
                  <Heading fontSize="lg" w="full" fontWeight="normal">
                    Transactions
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    See most recent  Transactions
                  </Text>
                </Box>
              </Flex>
              <Divider />
              {dashboardStats.transaction.length == 0 ?
                <Flex h="full">
                  <Center>
                    <Spinner size="xl" />
                  </Center>
                </Flex>
                :
                <Table variant="unstyled" w="full" overflowY="scroll">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>S/N</Th>

                      <Th>Name</Th>
                      <Th>Amount</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dashboardStats.transaction.map((driver, index) => (
                      <Tr
                        key={index}
                        bg={index % 2 ? "gray.50" : "white"}
                        cursor="pointer"
                      >

                        <Td fontSize="sm">
                          {index}
                        </Td>

                        <Td fontSize="sm">
                          {driver.user_id.firstname} {driver.user_id.lastname}
                        </Td>
                        <Td fontSize="sm">
                          {cashFormat(driver.amount)}
                        </Td>
                        <Td fontSize="sm" w="80px">

                          {driver.createdAt.substring(0, 10)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              }
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default withAdmin(DashboardHome);
