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
				<title>Ice Street - Admin Login</title>
				<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />			
				<meta property="og:title" content="Ice Street - Login" key="title" />
				<meta property="og:description" content="Ice Street" key="description" />
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
