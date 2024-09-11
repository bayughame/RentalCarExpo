import {createSlice} from '@reduxjs/toolkit'
import { fetchCars } from './carApi'
import { isLoading } from 'expo-font'

const carSlice = createSlice({
    name: 'car',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMassage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCars.pending,(state, action)=>{          
            state.isLoading = true
        })
        builder.addCase(fetchCars.fulfilled,(state, action)=>{
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchCars.rejected,(state, action)=>{
            state.isError = true
            state.errorMassage = action.error
        })
    }
})

export const getCar = fetchCars
export const selectCar =  state => state.car //selector
export default carSlice.reducer