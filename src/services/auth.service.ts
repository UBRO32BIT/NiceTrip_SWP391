import { api } from '../api';
import {
    createSessionCookies,
    getRefreshToken,
    getToken,
    removeSessionCookies
} from '../utils/tokenCookies'

export interface LoginData {
    username: String;
    password: String;
}
export interface RegisterData {
    firstName: String;
    lastName: String;
    username: String;
    password: String;
    repeatPassword: String;
    email: String
}

const RegisterWithCredentials = (data: RegisterData) => {
    return api.post('/auth/register', data)
        .then((res) => {
            if (res) {
                const token = res.data.tokens.access.token;
                const refreshToken = res.data.tokens.refresh.token;
                createSessionCookies({token, refreshToken});
                console.log(res.data);
                return res.data;
            }
        })
        .catch((error) => {
            console.log(`Register failed at services: ${error}`)
        })
        
}
const LoginWithUsernameAndPassword = (data: LoginData) => {
    return api.post('/auth/login', data)
        .then((res) => {
            const responseData = res.data;
            if (responseData) {
                const token = responseData.data.tokens.access.token
                const refreshToken = responseData.data.tokens.refresh.token
                createSessionCookies({ token, refreshToken });
                return responseData;
            }
        })
        .catch((error) => {

        })
}
const UpdateUser = (id: string, data: any) => {
    return api.post(`/user/update/${id}`, data)
        .then((res)=>{
            return res.data;
        })
        .catch((err)=>{
            return err
        })
}

const CreateVNPay = (data: any) => {
    return api.post(`/payment/create-payment-vnpay`, data)
        .then((res)=>{
            return res.data.data;
        })
        .catch((err)=>{
            return err
        })
}

const VNPayReturn = (data: any) => {
    return api.get(`/payment/vnpay_return`, { params: data }) // Use `params` to pass data as query parameters
        .then((res)=>{
            return res.data; // Response data doesn't need to be accessed via `data.data`
        })
        .catch((err)=>{
            throw err; // Rethrow the error to handle it in the component
        });
};
export {
    RegisterWithCredentials,
    LoginWithUsernameAndPassword,
    UpdateUser,
    CreateVNPay,
    VNPayReturn,
}