export const getErrorMessage = (error) => {
    if (error.response && error.response.data) {
        const data = error.response.data;
        return data.message ? data.message : data;
    } else {
        return error.message ? error.message : 'Internal error';
    }
};
