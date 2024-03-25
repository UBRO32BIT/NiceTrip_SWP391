import { api } from '../api';

const GetResort = () => {
    return api.get('/resort')
        .then((res) => {
            return res.data.data.results
        })
        .catch((error) => {
            console.error(error);
            throw error;
        })
}
const GetResortById = async (id: string) => {
    try {
        const response = await api.get(`/resort/${id}`);
        return response.data.data;
    } catch (error) {
        // Handle errors here, you might want to log or show a user-friendly message
        console.error('Error fetching resort by ID:', error);
        throw error; // Re-throw the error to let the caller handle it if needed
    }
}

const UploadResort = async (data: FormData) => {
    return api.post('/resort', data)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            throw Error(error.response.data.message)
        })
}

export {
    GetResort,
    GetResortById,
    UploadResort
}