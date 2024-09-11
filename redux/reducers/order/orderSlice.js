import {createSlice} from '@reduxjs/toolkit'
import { postOrder,putOrderSlip } from './orderApi'

const initialState = {
    isLoading: false,
    carId: null,
    data: {},
    status: null,
    errorMessage: null,
    isModalVisible:false,
    activeStep: 0,
    selectedBank: null,

    promo: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers:{
        setCarId: (state,{payload}) =>{
            state.carId= payload
        },

        setStateByName: (state, {payload}) =>{
            console.log(payload)
            const {name, value} = payload
            state[name] = value
        },

        resetState: (state) =>{
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postOrder.pending,(state, action)=>{          
            state.isLoading = true
            state.status = null
        })
        builder.addCase(postOrder.fulfilled,(state, action)=>{
            state.isLoading = false
            state.data = action.payload
            state.status = "success"
        })
        builder.addCase(postOrder.rejected,(state, action)=>{
            state.isLoading = true
            state.data = action.payload
            state.status = "failed"
        })

        builder.addCase(putOrderSlip.pending,(state, action)=>{          
            state.isLoading = true
            state.status = null
        })
        builder.addCase(putOrderSlip.fulfilled,(state, action)=>{
            state.isLoading = false
            state.data = action.payload
            state.status= 'upload-success'
        })
        builder.addCase(putOrderSlip.rejected,(state, action)=>{
            state.isLoading = false
            state.errorMessage = action.payload
            state.status = "failed"
        })
    }
})

export {postOrder,putOrderSlip}
export const {setCarId, setStateByName, resetState,} = orderSlice.actions
export const selectOrder = (state) => state.order
export default orderSlice.reducer

