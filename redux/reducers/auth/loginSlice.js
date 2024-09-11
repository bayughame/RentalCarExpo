import {createSlice} from '@reduxjs/toolkit'
import {postLogin} from './authApi'
import * as SecureStore from 'expo-secure-store'

const getStore = () => SecureStore.getItem('user') && JSON.parse(SecureStore.getItem('user'))
const setStore = (value) => SecureStore.setItem ('user', JSON.stringify(value))

const loginSlice = createSlice({
    name: 'user',
    initialState:{
        isLoading:false,
        data: getStore() ? getStore() : {},
        isModalVisible: false,
        isLogin: getStore()? true : false,
        isError : false,
        errorMessage: null,
    },
    reducers:{
        closeModal : (state) => {
            state.isModalVisible = false
            state.isError = false
            state.errorMessage = null
        },
        logout: (state) => {
            state.data = {}
            state.isLogin = false
            SecureStore.deleteItemAsync('user')
        }
    },

    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(postLogin.fulfilled, (state,action) => {
            state.isLoading = false
            state.isLogin= true
            state.data = action.payload
            state.isModalVisible=true
            setStore(action.payload)
        })
        builder.addCase(postLogin.rejected, (state,action) => {       
            state.isLoading = false  
            state.isError = true
            state.errorMessage = action.payload
            state.isModalVisible=true
        })
    }
       
    
})

export {postLogin}
export const {closeModal, logout} = loginSlice.actions
export const selectUser = state => state.user
export default loginSlice.reducer