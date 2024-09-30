import AdminLoginForm from "@/components/Auth/Admin/AdminLoginForm";
import AuthLayout from "@/components/Auth/AuthLayout";
import Head from "next/head";
import withNoAdmin from "HOC/withNoAdmin";
import AdminAuthLayout from "@/components/Auth/Admin/AdminAuthLayout";
import {Container} from "@chakra-ui/react"

function HomePage() {
	return (
		<>
			<Head>
				<title>Massbuy - Admin Login</title>
				<meta property="og:title" content="Massbuy - Login" key="title" />
				<meta property="og:description" content="Awefun" key="description" />
			</Head>
			<AdminAuthLayout>
			    <Container maxW={["80%","sm" ]} bg="white" my="auto" p="8" py="4" rounded="md">
					<AdminLoginForm />
				</Container>
			</AdminAuthLayout>
			
		</>
	);
}

export default withNoAdmin(HomePage);
