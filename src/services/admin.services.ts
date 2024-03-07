import { api } from '../api';
const GetAllAccount = () => {
    return api.get(`/admin/account-list`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}

export{
    GetAllAccount
}