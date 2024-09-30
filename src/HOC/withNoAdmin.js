import { Center, Spinner } from "@chakra-ui/react";
import { fetchDriverProfile } from "app/features/auth/driverSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SESSION_EXPIRED } from "utils/constants";

const withNoAdmin = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter();
		const [verified, setVerified] = useState(true);
		const dispatch = useDispatch();

		useEffect(() => {
			const verifyUser = async () => {
				try {
					const token = localStorage.getItem("token");
					// if (!token) throw SESSION_EXPIRED;
					throw new Error("Testing");

					// await dispatch(fetchDriverProfile());
					// Router.replace("/dashboard/admin");
				} catch (error) {
					setVerified(false);
					localStorage.removeItem("token");
				}
			};
			verifyUser();
		}, []);

		if (!verified) {
			return <WrappedComponent {...props} />;
		} else {
			return (
				<Center h="100vh" w="full">
					<Spinner color="red" size="xl" />
				</Center>
			);
		}
	};
};

export default withNoAdmin;
