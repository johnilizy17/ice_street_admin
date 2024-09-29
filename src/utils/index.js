
const { logoutUser, loginUser, authService } = require("./auth");

export { logoutUser, loginUser, authService }

/**
 * It takes the error object returned by the API call and parses it into a list of error messages
 * @param error - The error object returned by axios.
 * @returns An array of error messages.
 */
export const formatValidationErrors = (error) => {
    let errors = []
    const validationErrors = error?.response?.data?.errors ?? {}
    if (validationErrors && Object.entries(validationErrors).length > 0) {
        Object.values(validationErrors).forEach(validationErrorField => {
            if (validationErrorField && Array.isArray(validationErrorField) && validationErrorField.length > 0) {
                validationErrorField.forEach(errorMessage => {
                    errors.push(errorMessage)
                })
            }
        });
    }
    return errors
}