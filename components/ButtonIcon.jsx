import {Pressable, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

export default function ButtonIcon({onPress, style, ...rest}) {
  return (
    <Pressable style={styles.box} onPress={onPress}>
        <Ionicons  size={24} style={style} {...rest} />
    </Pressable>
  )
}  

const styles = StyleSheet.create({
    box:{
        borderRadius: 8,
        backgroundColor: '#A43333',
        padding: 20,
    }
})