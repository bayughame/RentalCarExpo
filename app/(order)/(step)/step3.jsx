import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "@/components/Grid";
 
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { useSelector } from "react-redux";
 
export default function Step3() {
 
  const { data } = useSelector(selectOrder);
 
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.rekContainer}>
          <Text>Invoice</Text>
          <Row style={styles.boxInvoice}>
            <Text>INV/xx/xx-xxxx/</Text>
            <TouchableOpacity onPress={() => copyToClipboard("xxxx-xxxx-xxxx")}>
              <Ionicons color={"#3C3C3C"} name={"download-outline"} size={18} />
            </TouchableOpacity>
          </Row>
        </View>
 
        <View style={styles.rekContainer}>
          <Text>E-Tiket</Text>
 
          <Row style={styles.boxEtiket}>
            {/* <TouchableOpacity onPress={() => copyToClipboard(data.price)}>
              <Ionicons color={"#3C3C3C"} name={"image-outline"} size={18} />
            </TouchableOpacity> */}
 
            <Pressable style={styles.uploadImage}>
            {data.slip != null ? (                                                   // fitur conditional rendering
              <Image source={{uri: data.slip}} style={styles.image} onError= {(e) => console.log("image step 3", e)} />
            ) : (
              <Ionicons color={"#3C3C3C"} name={"image-outline"} size={18} />
            )}
            </Pressable>
 
            {/* <Text> Pdf Viewer</Text> */}
          </Row>
 
          <Text>
            Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
          </Text>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
 
  rekContainer: {
    paddingVertical: 10,
    gap: 5,
  },
 
  boxInvoice: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
 
  boxEtiket: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    height: "125%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
 
  uploadImage: {
    backgroundColor: "#D0D0D0",
    borderWidth: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    objectFit: "contain"
  },
});