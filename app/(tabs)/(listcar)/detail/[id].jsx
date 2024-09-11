import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row } from "@/components/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarDetail,
  selectCarDetail,
} from "../../../../redux/reducers/car/carDetailsSlice";
const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
 
export default function detail() {
  const { id } = useLocalSearchParams();
 
  const { data, isLoading } = useSelector(selectCarDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
 
    dispatch(getCarDetail(id));
    return () => {
      controller.abort();
    };
  }, [id]);
  return (
    <View style={style.Container}>
      <View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            size={40}
            marginTop={20}
            name="arrow-back-outline"
            color={"#000000"}
          />
        </TouchableOpacity>
        <Text style={style.viewid}>{data?.name}</Text>
        <View style={style.Icond} gap={16}>
          <Row gap={16}>
            <Row>
              <Ionicons size={16} name="people-outline" color={"#8A8A8A"} />
              <Text style={style.capacityText}>3</Text>
            </Row>
            <Col>
              <Text>
                <Ionicons size={16} name="bag-outline" color={"#8A8A8A"} />
                <Text style={style.capacityText}> 4</Text>
              </Text>
            </Col>
          </Row>
        </View>
 
        <ScrollView>
          <Image
            style={style.imagetext}
            source={{ uri: data.image }}
            height={200}
            width={200}
          />
          <View style={style.detailContent}>
            <Text style={style.Textid}>Tentang Paket</Text>
 
            <Text style={style.Textid}>Include</Text>
            <Text style={style.generalText}>
              {"\u2022"} Apa saja yang termasuk dalam paket misal durasi max 12
              jam
            </Text>
            <Text style={style.generalText}>
              {"\u2022"} Sudah termasuk bensin selama 12 jam
            </Text>
            <Text style={style.generalText}>
              {"\u2022"} Sudah termasuk Tiket Wisata
            </Text>
            <Text style={style.generalText}>
              {"\u2022"} Sudah termasuk Tiket Wisata Sudah termasuk pajak
            </Text>
            <Text style={style.Textid}>Exclude</Text>
            <Text style={style.generalText}>
              {"\u2022"} Tidak termasuk biaya makan sopir Rp 75.000/hari
            </Text>
            <Text style={style.generalText}>
              {"\u2022"} Jika overtime lebih dari 12 jam akan ada tambahan biaya
              Rp 20.000/jam
            </Text>
            <Text style={style.generalText}>
              {"\u2022"} Tidak termasuk akomodasi penginapan
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={style.footer}>
        <Text style={style.textprice}>{formatCurrency.format(data.price)}</Text>
        <Pressable
          style={style.button}
          onPress={() => router.navigate("/(order)")}
        >
          <Text style={style.signIn}>Lanjutkan Pembayaran</Text>
        </Pressable>
      </View>
    </View>
  );
}
 
const style = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  viewid: {
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginTop: 20,
  },
  imagetext: {
    marginLeft: 110,
    marginTop: Constants.statusBarHeight,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    marginLeft: 30,
    marginRight: 30,
  },
  signIn: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  textprice: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
 
    marginBottom: 10,
  },
  Textid: {
    fontFamily: "PoppinsBold",
    marginTop: 5,
  },
  generalText: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginTop: 10,
    color: "#8A8A8A",
  },
 
  footer: {
    // position: "fixed",
    backgroundColor: "#eeeeee",
    padding: 20,
    marginTop: -75,
  },
  detailContent: {
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,1)",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },
  Icond: {
    alignItems: "center",
 
    marginTop: 10,
  },
  capacityText: {
    color: "#8A8A8A",
    marginLeft: 5,
  },
  price: {
    color: "#5CB85F",
  },
});