import { Box, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Delivery({ data }) {
    const [userData, setData] = useState({email:[], firstname:"", lastname:"", phone:""})


    return (
        <Box className=' w-full rounded-[10px] pb-[57px] bg-white '  mt="30px">
            <Box mb="20px" className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                <p className=' lg:font-bold lg:text-lg text-sm ' >Delivery Address</p>
            </Box>
            {data.map((info, id) => (
            <Box bg="#fff" p="20px" borderRadius={"19px"} mb="20px" key={id} className=' w-full px-0 lg:px-[46px] py-[27px] grid grid-cols-1 lg:grid-cols-2 gap-6 pb-[50px] ' >
               
                    <Box key={id} className=' border border-[#D9D9D9] rounded-[5px] w-full' >
                        <Box mb="20px" className=' w-full p-[9px] border-b border-[#D9D9D9] justify-between flex items-center ' >
                            <p className=' text-[13px] text-[#767575] font-semibold ' >Default Delivery Address</p>
                           </Box>
                        <Box className=' w-full py-[19px] px-[17px]' >
                            <Box display="flex" justifyContent={"start"} alignItems="center" className=' flex items-center my-[14px] ' >
                                <Box mt="10px" mr="20px"  className=' w-14 ' >
                                    <Image src='/icon/colorcall.svg' alt="call" width="14px" />
                                </Box>
                                <p style={{marginTop:10}} >{info.address}</p>
                            </Box>
                            <Box display="flex" justifyContent={"start"} alignItems="center" className=' flex items-center ' >
                                <Box mt="10px" mr="20px"  className=' w-14 ' >
                                    <Image src='/icon/location.svg' alt="location" width="14px" />
                                </Box>
                                <p style={{marginTop:10}} >0{info.phone}</p>
                            </Box>
                        </Box>
                    </Box>
            </Box>))}
        </Box>
    )
} 