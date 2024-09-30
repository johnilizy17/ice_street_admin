import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";
import { Center, Spinner } from "@chakra-ui/react";
import { fetchDriverProfile } from "app/features/auth/driverSlice";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const dispatch = useDispatch();
		const router = useRouter();
		const { isOnboarded } = useSelector((state) => state.driver);
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const verifyUser = async () => {
				try {
					await dispatch(fetchDriverProfile());
					if (!isOnboarded) {
						router.push("/dashboard/driver/onboarding");
					} else {
						setVerified(true);
					}
				} catch (error) {
					setVerified(false);
				}
			};
			verifyUser();
		}, []);

		return (
			<DashboardLayout>
				{verified ? (
					<WrappedComponent {...props} />
				) : (
					<Center h="full" w="full">
						<Spinner color="red" size="xl" />
					</Center>
				)}
			</DashboardLayout>
		);
	};
};
export default withAuth;
