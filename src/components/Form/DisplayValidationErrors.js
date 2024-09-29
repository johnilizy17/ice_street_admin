import { Box, Text } from "@chakra-ui/react";
import React from "react";

function DisplayValidationErrors({ errors = [] }) {
	if (errors && errors.length > 0) {
		return (
			<Box mb="8" borderColor="red" borderWidth="thin" p="2" rounded="md">
				{errors.map((error) => (
					<Text color="red" fontSize="sm">
						{error}
					</Text>
				))}
			</Box>
		);
	} else {
		return null;
	}
}

export default DisplayValidationErrors;
