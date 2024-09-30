import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";
import { Center, Spinner } from "@chakra-ui/react";
import { fetchAdminProfile } from "app/features/auth/adminSlice";
import { fetchDriverProfile } from "app/features/auth/driverSlice";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const withAdmin = (WrappedComponent) => {
	return (props) => {
		const dispatch = useDispatch();
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const verifyUser = async () => {
				try {
					 dispatch(fetchAdminProfile());
					setVerified(true);
				} catch (error) {
					setVerified(false);
				}
			};
			verifyUser();
		}, []);

		return (
			<DashboardLayout admin>
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
export default withAdmin;
