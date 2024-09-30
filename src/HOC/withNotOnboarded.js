import { Center, Spinner } from "@chakra-ui/react";
import { fetchDriverProfile } from "app/features/auth/driverSlice";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function withNotOnboarded(WrappedComponent) {
	return (props) => {
		const dispatch = useDispatch();
		const router = useRouter();
		const { isOnboarded } = useSelector((state) => state.auth);
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const verifyUser = async () => {
				try {
					await dispatch(fetchDriverProfile());
					if (isOnboarded) {
						router.push("/dashboard/driver/summary");
					} else {
						setVerified(true);
					}
				} catch (error) {
					setVerified(false);
				}
			};
			verifyUser();
		}, []);

		if (verified) {
			return <WrappedComponent {...props} />;
		} else {
			return (
				<Center h="100vh" w="full">
					<Spinner color="red" size="xl" />
				</Center>
			);
		}
	};
}

export default withNotOnboarded;
