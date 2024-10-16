import React from "react";
import PasswordResetForm from "@/components/Auth/PasswordResetForm";
import Head from "next/head";
import AdminAuthLayout from "@/components/Auth/Admin/AdminAuthLayout";
import withNoAdmin from "HOC/withNoAdmin";
import { Container } from "@chakra-ui/react";

function AdminResetPasswordPage() {
	return (
		<>
			<Head>
				<title>Ice Street - Admin Reset password</title>
				<meta
					property="og:title"
					content="Ice Street - Admin Reset password"
					key="title"
				/>
				<meta property="og:description" content="Awefun" key="description" />
			</Head>
			<AdminAuthLayout>
				<Container maxW={["80%","sm" ]} bg="white" my="auto" p="6" py="8" rounded="md">
					<PasswordResetForm admin></PasswordResetForm>
				</Container>
			</AdminAuthLayout>
		</>
	);
}

export default withNoAdmin(AdminResetPasswordPage);
