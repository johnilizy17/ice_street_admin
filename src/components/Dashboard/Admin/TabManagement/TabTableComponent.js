import React from 'react'
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Button
} from "@chakra-ui/react"
import {IoIosCheckmarkCircle, IoIosCloseCircle} from "react-icons/io"
import { useRouter } from 'next/router'

const TabTableComponent = ({tabs}) => {

	console.log(tabs)
	const router = useRouter()
  return (
    <Table variant="unstyled" w="100%" overflowY="scroll">
						<Thead bg="gray.100">
							<Tr>
								<Th>IMEI</Th>
								<Th>Phone number</Th>
								<Th>Status</Th>
							</Tr>
						</Thead>
						<Tbody>
							{tabs.map((tab, index) =>
							 (
								
								<Tr
									key={tab.id}
									bg={index % 2 ? "gray.50" : "white"}
									onClick={() =>
										router.push(
											`/dashboard/admin/tab-management/${tab.id}`
										)
									}
									cursor="pointer"
								>
									<Td fontSize="sm">
										{tab.imei }
									</Td>
									<Td fontSize="sm">{tab.phone_number}</Td>
									<Td fontSize="sm">
									<Button fontSize={["10px", "14px"]} _focus={{outline:"none"}} size="sm" borderRadius={10} bg={ tab.status ==="assigned"? "#EBFFEB" : "#FAF0F0"} color={ tab.status ==="verified"? "green": "red"} rightIcon={tab.status == "assigned"? <IoIosCheckmarkCircle/> : <IoIosCloseCircle/>}>
								{/**/} {tab.status === "assigned"? "assigned": "unassigned"}</Button>
									</Td>
								</Tr>
								)
								)}		
						</Tbody>
					</Table>
  )
}

export default TabTableComponent
