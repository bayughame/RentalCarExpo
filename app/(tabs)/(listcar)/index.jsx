import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import {useState, useEffect } from 'react'
import CarList from '../../../components/CarList';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useDispatch, useSelector,usseDispatch } from "react-redux";
import {getCar, selectCar} from '@/redux/reducers/car/carSlice'

export default function listcar() {
  const {data, isLoading} = useSelector (selectCar)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal;  // UseEffect cleanup
    dispatch(getCar(signal))

    setLoading(true); //loading state

    return () => {
        // cancel request sebelum component di close
        controller.abort();
    };
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        loading ? 
        <ActivityIndicator 
          style={{marginTop: 30}}
          animating={true} 
          size="large" 
          color="#00ff00" />
        :
        <View>
           <Text>0 results</Text>
        </View>
      }
      ListHeaderComponent={
        <Text style={styles.title}>Daftar Mobil</Text>
      }
      renderItem={({item}) => (
        <CarList
          key={item.id}
          image={{uri: item.image}}
          carName={item.name}
          passengers={5}
          baggage={4}
          price={item.price}
          onPress={()=>
            router.navigate('/detail/'+item.id)
          }
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true
      }}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight + 10, 
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title:{
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    marginBottom: 15
  }
})