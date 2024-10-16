import React from "react";
import AuthLayout from "@/components/Auth/AuthLayout";
import Head from "next/head";
import AdminLoginForm from "@/components/Auth/Admin/AdminLoginForm";
import withNoAdmin from "HOC/withNoAdmin";
import AdminAuthLayout from "@/components/Auth/Admin/AdminAuthLayout";
import { Container } from "@chakra-ui/react";
import AdminSignupForm from "@/components/Auth/Admin/AdminSignupForm"

function SignupPage() {
	return (
		<>
			<Head>
				<title>Ice Street - Admin Signup</title>
				<meta property="og:title" content="Ice Street - Signup" key="title" />
				<meta property="og:description" content="Awefun" key="description" />
			</Head>
			<AdminAuthLayout>
				<Container maxW={["80%","sm" ]} bg="white" my="auto" p="8" py="8" rounded="md">
					<AdminSignupForm />
				</Container>
			</AdminAuthLayout>
		</>
	);
}

export default withNoAdmin(SignupPage);
