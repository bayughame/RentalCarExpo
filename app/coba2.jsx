import { View, Text } from 'react-native'
import React from 'react'

export default function BookItem({namaBuku}) {
  return (
    <View>
      <Text>{namaBuku}</Text>
    </View>
  )
}