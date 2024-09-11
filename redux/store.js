import {combineReducers, configureStore} from '@reduxjs/toolkit'
import reactotron from '@/ReactotronConfig'
import carSlice from './reducers/car/carSlice'
import carDetailSlice from './reducers/car/carDetailsSlice'
import userSlice from './reducers/auth/loginSlice'
import orderSlice from './reducers/order/orderSlice'

// npm i @reduxjs/toolkit react-redux

export const store = configureStore({
        reducer:{
            car: carSlice,
            carDetail: carDetailSlice,
            order: orderSlice,
            user: userSlice,
            
        },
    enhancers:
    (getDefaultEnhancers) => 
         __DEV__? getDefaultEnhancers()
     .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
})

