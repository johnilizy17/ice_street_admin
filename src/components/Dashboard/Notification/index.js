import { Box, Button, Center, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NotificationVendDisplay from './DisplayNofication';

export default function Notification({ display, setDisplay }) {

    const [walletTransition, setWalletTransition] = useState(false)

    const [loading, setLoading] = useState(true);
    const [tracker, setTracker] = useState();
    const [disable, setDisable] = useState(false);
    const [notificationsData, setNotifictionData] = useState([{ uniqueID: "12", header: "created account", text: "welcome to regiz, your account has been created successfull" }]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (display) {
            setTimeout(() => { setWalletTransition(true) }, 1000)
        }
    }, [display])

    return (
        <Box position={"fixed"} top="0px" left={"0px"} display={display ? "" : "none"} bg="#0000007a" h="100vh" w="100vw" zIndex={120} transition="1s ease-in">
            <Box bg="#fff" w="340px" h="100%" position="absolute" right="0px" borderTopLeftRadius={"40px"} transform={walletTransition ? "translateX(0px)" : "translateX(360px)"} transition={"all 1s ease-in"}>
                <Box bg="#000000" h="65px" display="flex" justifyContent={"space-between"} alignItems="center" p={"15px"} borderTopLeftRadius={"40px"} cursor="pointer">
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                        setTimeout(() => setDisplay(!display), 1000)
                        setWalletTransition(false)
                    }}>
                        <path d="M22.5 8L7.5 23" stroke="#c7062c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.5 8L22.5 23" stroke="#c7062c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <Box display="flex" alignItem="center" >
                        <Text mr="19px" color="#c7062c" fontWeight={800} fontSize="16.5px" lineHeight="31px">
                            Notification
                        </Text>
                        <svg width="24" height="6" style={{ marginTop: 12 }} viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.8829 2.95948C22.8829 1.50114 21.7904 0.318923 20.4429 0.318923C19.0953 0.318923 18.0029 1.50114 18.0029 2.95948C18.0029 4.41782 19.0953 5.6001 20.4429 5.6001C21.7904 5.6001 22.8829 4.41782 22.8829 2.95948Z" fill="#c7062c" stroke="#007575" stroke-width="0.5" stroke-miterlimit="22.9256" />
                            <path d="M14.3815 2.95949C14.3815 1.50115 13.289 0.318933 11.9415 0.318933C10.5939 0.318933 9.50146 1.50115 9.50146 2.95949C9.50146 4.41783 10.5939 5.6001 11.9415 5.6001C13.289 5.6001 14.3815 4.41783 14.3815 2.95949Z" fill="#c7062c" stroke="#007575" stroke-width="0.5" stroke-miterlimit="22.9256" />
                            <path d="M5.88 2.95948C5.88 1.50114 4.78758 0.318928 3.44 0.318928C2.09242 0.318928 1 1.50114 1 2.95948C1 4.41783 2.09242 5.6001 3.44 5.6001C4.78758 5.6001 5.88 4.41783 5.88 2.95948Z" fill="#c7062c" stroke="#007575" stroke-width="0.5" stroke-miterlimit="22.9256" />
                        </svg>
                    </Box>
                </Box>
                <Box bg="#c7062c" h="100%" p="20px">
                    {notificationsData.map((item, i) => (
                        <div key={i}>
                            <NotificationVendDisplay
                                item={item}
                                id={i}
                                disable={disable}
                                setDisable={setDisable}
                                tracker={tracker}
                                setTracker={setTracker}
                            />
                        </div>
                    ))}
                </Box>


            </Box>
        </Box>
    )
}