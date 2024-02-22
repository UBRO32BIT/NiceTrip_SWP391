import { api } from '../api';
import {
    createSessionCookies,
    getRefreshToken,
    getToken,
    removeSessionCookies
} from '../utils/tokenCookies'

interface LoginData {
    username: String;
    password: String;
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
export {
    LoginWithUsernameAndPassword,
    UpdateUser
}