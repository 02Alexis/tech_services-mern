export const getErrorMessage = (
  error
) => {

  return (
    error?.response?.data?.message ||
    error?.message ||
    "Error inesperado"
  );

};