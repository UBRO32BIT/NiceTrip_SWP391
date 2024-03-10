import { api } from '../api';
const GetAllAccount = () => {
    return api.get(`/admin/account-list`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching accounts: ', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetAllRequest = () => {
    return api.get('/admin/request-list')
    .then((res) => {
        return res.data.data
    })
    .catch((error) => {
        // Handle errors here, you might want to log or show a user-friendly message
        console.error('Error fetching requests: ', error);
        throw error; // Re-throw the error to let the caller handle it if needed
    })
}
const GetAllResort = () => {
    return api.get('/admin/resort-list')
    .then((res) => {
        return res.data.data
    })
    .catch((error) => {
        // Handle errors here, you might want to log or show a user-friendly message
        console.error('Error fetching resorts: ', error);
        throw error; // Re-throw the error to let the caller handle it if needed
    })
}
const GetAllPost = () => {
    return api.get('/admin/post-list')
    .then((res) => {
        return res.data.data
    })
    .catch((error) => {
        // Handle errors here, you might want to log or show a user-friendly message
        console.error('Error fetching posts: ', error);
        throw error; // Re-throw the error to let the caller handle it if needed
    })
}

export{
    GetAllAccount,
    GetAllRequest,
    GetAllResort,
    GetAllPost
}