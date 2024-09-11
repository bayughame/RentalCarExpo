import { View, StyleSheet } from 'react-native'
import React from 'react'

export  function Container({style, children}) {
    return (
      <View style={{...styles.container,style}}>
        {children}
      </View>
    )
  }

export  function Row({alignItem, justifyContent,style, children}) {
  return (
    <View style={{
        ...styles.row,
        alignItems: alignItem? alignItem : 'baseline',
        justifyContent: justifyContent? justifyContent : 'flex-start',
        ...style
    }}>
      {children}
    </View>
  )
}


export  function Col({style,children}) {
    return (
      <View style={style}>
        {children}
      </View>
    )
  }

  const styles = StyleSheet.create({
    container:{
        paddingHorizontal : 20,

    },
    row:{
        flexDirection : 'row',
    }
  })