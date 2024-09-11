import { View, Text } from 'react-native'
import React from 'react'
import BookItem from './coba2';

export default function Library() {
  const buku = [
    { judul: 'Seni Berpikir Jernih', penulis: 'Rolf Dobelli' },
    { judul: 'Atomic Habits', penulis: 'James Clear' },
    { judul: 'Rich Dad Poor Dad', penulis: 'Robert T. Kiyosaki' }
  ]; 
  return (
    <View>
      <Text>Daftar Judul:</Text>
      {buku.map((judul,index) =>{
        <BookItem key={index} BookItem={judul}/>
      })}
    </View>
  )
  
}
