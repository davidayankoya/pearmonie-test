import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Http } from 'utils/api'
import { STORE_TOKEN } from "constants/constants";
import Notify from "utils/notify";
import { toggleLoading } from "./uiSlice";
import { AuthCreds, UserModel } from "types/auth/auth.type";
import { AuthService } from "services/auth/auth.service";

// const mockUser: UserModel = {
//     id: 1,
//     firstName: 'Evano',
//     lastName: 'Pius',
//     email: 'piusevanotheboy@gmail.com',
// }

interface AuthState {
    isAuthenticated: boolean,
    user: UserModel | null,
    isLoading: boolean,
    networkFail: boolean,
    checkedAuth: boolean,
}

const initialState: AuthState = {
    isAuthenticated: true,
    user: null,
    isLoading: false,
    networkFail: false,
    checkedAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogin: (state, action: { payload: { token: string } }) => {
            localStorage.setItem(STORE_TOKEN, action.payload.token)
            Http.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
        },
        authUser: (state, action: { payload: { user: UserModel } }) => {
            state.user = action.payload.user
        },
        authLogout: (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem(STORE_TOKEN)
            Http.defaults.headers.common['Authorization'] = ''
        },
        setNetworkFail: (state, action: { payload: boolean }) => {
            state.networkFail = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(loginReq.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginReq.fulfilled, (state, { payload }) => {
            state.user = payload.user
            state.isAuthenticated = true;
            state.isLoading = false
        })
        builder.addCase(loginReq.rejected, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false
        })
        builder.addCase(authCheckReq.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(authCheckReq.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.isAuthenticated = payload.isAuthenticated;
            state.isLoading = false
            state.checkedAuth = true
        })
        builder.addCase(authCheckReq.rejected, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false
            state.checkedAuth = true
        })
        builder.addCase(logoutReq.fulfilled, (state, { payload }) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem(STORE_TOKEN)
            Http.defaults.headers.common['Authorization'] = ''
        })
        builder.addCase(logoutReq.rejected, (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem(STORE_TOKEN)
            Http.defaults.headers.common['Authorization'] = ''
        })
    },
})

export const authCheckReq = createAsyncThunk(
    "auth/authCheck",
    async (params, thunkAPI) => {
        const token = localStorage.getItem(STORE_TOKEN)
        const authenticated = !!token
        if (authenticated) {
            Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        thunkAPI.dispatch(toggleLoading(true))
        try {
            const response = await AuthService.fetchUser()
            const result = {
                user: response?.user,
            }
            thunkAPI.dispatch(toggleLoading(false))
            return {
                user: {
                    ...result.user,
                    full_name: `${result.user?.firstName} ${result.user?.lastName}`
                },
                isAuthenticated: authenticated
            }
        } catch (error) {
            thunkAPI.dispatch(toggleLoading(false));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const loginReq = createAsyncThunk(
    "auth/login",
    async (params: AuthCreds, thunkAPI) => {
        thunkAPI.dispatch(toggleLoading(true))
        try {
            const response = await AuthService.login(params)
            const result = {
                user: {
                    email: response?.email,
                    firstName: response?.firstName,
                    lastName: response?.lastName,
                    username: response?.username,
                    gender: response?.gender,
                    image: response?.image,
                    // company: {
                    //     title: 'Project Manager',
                    //     department: '',
                    //     name: '',
                    //     address: undefined,
                    // }
                },
                token: response?.accessToken
            }
            thunkAPI.dispatch(authSlice.actions.authLogin({ token: result.token }))
            thunkAPI.dispatch(toggleLoading(false))
            Notify.success(`Logged In`)
            return {
                user: {
                    ...result.user,
                    full_name: `${result.user?.firstName ?? ''} ${result.user?.lastName ?? ''}`
                }
            }
        } catch (error) {
            thunkAPI.dispatch(toggleLoading(false));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const logoutReq = createAsyncThunk(
    "auth/logout",
    async (params: undefined, thunkAPI) => {
        thunkAPI.dispatch(toggleLoading(true))
        try {
            // const response = await AuthService.logout()
            thunkAPI.dispatch(authSlice.actions.authLogout())
            thunkAPI.dispatch(toggleLoading(false))
            Notify.success(`Logged Out`)
        } catch (error) {
            thunkAPI.dispatch(toggleLoading(false));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const { authUser, authLogout, setNetworkFail } = authSlice.actions
export default authSlice.reducer;