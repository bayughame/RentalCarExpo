import {createSlice} from '@reduxjs/toolkit'
import {fetchCarsDetails} from './carApi'
import { isLoading } from 'expo-font'

const carDetailSlice = createSlice({
    name: 'carDetail',
    initialState:{
        data: {},
        isLoading: false,
        isError : false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCarsDetails.pending, (state,action) => {
            state.isLoading = true
        })
        builder.addCase(fetchCarsDetails.fulfilled, (state,action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCarsDetails.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.Message
        })
    }
       
    
})

export const getCarDetail = fetchCarsDetails
export const selectCarDetail = state => state.carDetail
export default carDetailSlice.reducer