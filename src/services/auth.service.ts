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
            console.log(err);
            throw err;
        })
}
const sendEmailVerification = () => {
    return api.get(`/email/send-verification-email`)
        .then((res) => {
            return res.data;
        })
        .catch((err)=> {
            console.log(err);
            throw err;
        })
}
const checkEmailToken = (token: string) => {
    return api.get(`/email/verify-email/?token=${token}`)
        .then((res) => {
            return res.data;
        })
        .catch((err)=> {
            console.log(err);
            throw err;
        })
}
export {
    RegisterWithCredentials,
    LoginWithUsernameAndPassword,
    UpdateUser,
    sendEmailVerification,
    checkEmailToken,
}