export const getError = (error) =>{
    return error.message && error.response.data.message
          ? error.response.data.message: error.message
}