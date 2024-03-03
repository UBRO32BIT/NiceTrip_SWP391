import { api } from '../api';

const MakeReservation = (type: string, data: any) => {
    return api.post(`/reservation/create?type=${type}`, data)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error making reservation:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}

const ExecutePayment = (data: any) => {
    return api.post('/payment/execute-payment', data)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetReservationById = (reservationId : any) =>{
    return api.get(`/reservation/${reservationId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            // Handle errors here, you might want to log or show a user-friendly message
            console.error('Error fetching resort by ID:', error);
            throw error; // Re-throw the error to let the caller handle it if needed
        })
}
const GetReservationOfUser = (userId : any) =>{
    return api.get(`/reservation/of-user/${userId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            console.error('Error fetching resort by ID:', error);
            throw error; 
        })
}
const GetReservationOfPost = (postId : any) =>{
    return api.get(`/reservation/of-post/${postId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            console.error('Error fetching resort by ID:', error);
            throw error; 
        })
}
const ConfirmReservation = (reservationId : any) =>{
    return api.patch(`/reservation/${reservationId}/confirm`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            console.error('Error fetching resort by ID:', error);
            throw error; 
        })
}
const GetTripOfUser = (userId : any) =>{
    return api.get(`/trip/of/${userId}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            console.error('Error fetching resort by ID:', error);
            throw error; 
        })
}

const ConfirmReservationByToken = (reservationId: any, token : any) =>{
    return api.patch(`/reservation/${reservationId}/confirm?token=${token}`)
        .then((res) => {
            return res.data.data
        })
        .catch((error) => {
            console.error('Error fetching resort by ID:', error);
            throw error;
        })
}

export {
    MakeReservation,
    GetReservationById,
    ExecutePayment,
    GetReservationOfUser,
    GetReservationOfPost,
    ConfirmReservation,
    GetTripOfUser,
    ConfirmReservationByToken
}