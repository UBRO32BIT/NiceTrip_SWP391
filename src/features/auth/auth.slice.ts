import { createSlice, Dispatch, UnknownAction } from '@reduxjs/toolkit'


interface LoginUser {
    username: string,
    password: string
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: undefined,
    },
    reducers: {
        LoginSuccess: (state, action) => {
            const loginData = action.payload;
            state.isAuthenticated = true;
            state.user = loginData.user
        },
        Logout: (state) => {
            state.isAuthenticated = false;
            state.user = undefined
        },
    },
})

// Action creators are generated for each case reducer function
export const { LoginSuccess, Logout } = authSlice.actions

export default authSlice.reducer