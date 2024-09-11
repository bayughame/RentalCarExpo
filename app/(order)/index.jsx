import { View, Text,StyleSheet} from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-stepper';
import React, { useState,useEffect } from "react";
import Step1 from './(step)/step1';
import Step2 from './(step)/step2';
import Step3 from './(step)/step3';
import { useSelector } from 'react-redux';
import {selectOrder} from '@/redux/reducers/order/orderSlice'


export default function index() {
    const {activeStep} = useSelector(selectOrder)

  return (
    <View style={{flex: 1, backgroundColor:'#fff'}}>
    <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>         
            <Step1/>
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
            <Step2 />
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
            <Step3 />
        </ProgressStep>
    </ProgressSteps>
</View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingTop: 10, 
        paddingHorizontal: 20,
        backgroundColor: '#fff'
      }
})
