import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import {
	Box, Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr, Button, useToast,
} from "@chakra-ui/react"

import moment from "moment";

import { IoIosCheckmarkCircle } from 'react-icons/io'
import { adminDeleteCategories } from 'services/admin-services';
import { cashFormat } from '@/components/cashFormat';


function PackagesTable({ drivers,fetchDriversadminGetAllDrivers }) {

	const toast = useToast();
	const router = useRouter();

	return (
		<>
			<Box w="100%" overflowX="scroll">
				<Table variant="simple" maxW="100%" overflowX="hidden">
					<Thead bg="gray.100">
						<Tr>
							<Th fontSize={["8px", "12px"]}>s/n</Th>
							<Th fontSize={["8px", "12px"]}>Paid</Th>
							<Th fontSize={["8px", "12px"]}>Status</Th>
							<Th fontSize={["8px", "12px"]}>Name</Th>
							<Th fontSize={["8px", "12px"]}>Date</Th>
						</Tr>
					</Thead>
					<Tbody>
						{drivers?.map((driver, index) => (

							<Tr
								key={index}
								bg={index % 2 ? "gray.50" : "white"}
								cursor="pointer"
								onClick={()=>router.push(`https://api.icestreethq.com/dashboard/admin/tab-management/${driver._id}`)}
							>
								<Td fontSize={["10px", "14px"]}>
									{index}
								</Td>
								<Td fontSize={["10px", "14px"]}>{cashFormat(driver.total)}</Td>
								
								<Td fontSize={["10px", "14px"]}>{driver.status}</Td>
								<Td fontSize={["10px", "14px"]}>{driver.user_id.firstname}, {driver.user_id.lastname}</Td>
								<Td fontSize={["10px", "14px"]} color="green" >{driver.createdAt && driver.createdAt.substring(0, 10)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</>
	)
}


export default PackagesTable
