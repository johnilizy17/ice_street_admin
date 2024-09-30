import { cashFormat } from '@/components/cashFormat';
import { Box, Center, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { adminGetAllTransaction } from 'services/admin-services';
import Router from 'next/router';
import ReactPaginate from 'react-paginate';

const DriverPaymentRecords = ({ id }) => {

  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [drivers, setDrivers] = useState([]);

  let refresh 

  const fetchDriversadminGetAllTransaction = async ( limit) => {
    try {
      refresh = []
      setLoading(true);
      const  {data}  = await adminGetAllTransaction(id, limit);
      console.log(data, "hello")
      setDrivers(data.transactions)
      setTotalPages(data.pageNumber)
      setLoading(false);
    } catch (error) {
      console.log("errorr", error)
      setDrivers([]);
    } finally {
      setLoading(false);
    }
    refresh = ""
  };

  useEffect(()=>{
    fetchDriversadminGetAllTransaction(10)
  },[refresh])

  
	const changePage = ({ selected }) => {
		fetchDriversadminGetAllTransaction((selected + 1) * 10);
	}

  return (
    <Box>
      {loading
        ?
        <Center w="full" h="full">
          <Spinner color="red" size="xl" />
        </Center> :
        <Box w="100%" overflowX="scroll">
          <Table variant="simple" maxW="100%" overflowX="hidden">
            <Thead bg="gray.100">
              <Tr>
                <Th fontSize={["8px", "12px"]}>s/n</Th>
                <Th fontSize={["8px", "12px"]}>ID</Th>
                <Th fontSize={["8px", "12px"]}>title</Th>
                <Th fontSize={["8px", "12px"]}>amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {drivers?.map((driver, index) => (

                <Tr
                  key={index}
                  bg={index % 2 ? "gray.50" : "white"}
                  cursor="pointer"
                  onClick={() =>
                    Router.push(
                      `/dashboard/admin/transaction/${driver._id}`)
                  }
                >
                  <Td fontSize={["10px", "14px"]}>
                    {index+1}
                  </Td>
                  <Td fontSize={["10px", "14px"]}>{driver._id}</Td>
                  <Td fontSize={["10px", "14px"]}>{driver.transaction_title ? driver.transaction_title: "non"}</Td>
                  <Td fontSize={["10px", "14px"]} color="green" >{cashFormat(driver.amount)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      }
      {totalPages > 1 && <ReactPaginate
						previousLabel={"Prev"}
						nextLabel={"Next"}
						pageCount={totalPages}
						onPageChange={changePage}
						containerClassName={"paginationBtns"}
						previousLinkClassName={"prevBtn"}
						nextLinkClassName={"nextBtn"}
						disabledClassName={"paginationDisabled"}
						activeClassName={"paginationActive"}
					/>
					}

    </Box>
  )
}

export default DriverPaymentRecords
