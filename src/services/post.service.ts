import { api } from '../api';

const UploadPost = (data: any) => {
    return api.post('/post/upload', data)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetPost = () => {
    return api.get('/post')
        .then((res) => {
            return res.data.data.results
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetPostById = (postId: string) => {
    return api.get(`/post/${postId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetPostBelongToOwner = (userId: string) => {
    return api.get(`/post/current-owner/${userId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}

export {
    UploadPost,
    GetPost,
    GetPostById,
    GetPostBelongToOwner
}