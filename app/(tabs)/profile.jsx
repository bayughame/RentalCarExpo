import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useDispatch,useSelector } from "react-redux";
import { selectUser,logout } from "../../redux/reducers/auth/loginSlice";
 
export default function Profile() {
  const {data,isLogin} = useSelector(selectUser)
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch()
 
  useEffect(() => {
    async function fetchUserEmail() {
      const user = await secureStore.getItem("user");
      if (user) {
        const userObject = JSON.parse(user);
        setEmail(userObject.email);
      }
      console.log(user);
    }
 
    fetchUserEmail();
  }, [email]);
 
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.textStyles}>Akun</Text>
      <View style={styles.img}>
        <Image source={require("../../assets/images/Allura - Park 1.png")} />
      </View>
      <View style={styles.imageLogo}>
        <Image source={require("@/assets/images/komeng.png")} />
      </View>
      <View>
        <Text style={styles.textlogout}>Hallo! {data.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(logout())
          router.navigate("/(auth)")
        }}
      >
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight,
  },
  img: {
    marginTop: 100,
    marginLeft: 20,
    width: 312,
    height: 192,
    alignItems: "center",
    borderColor: "#000",
  },
  textStyle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#000",
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  textStyles: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#000",
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#AF392F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "PoppinsBold",
    marginLeft: 130,
    marginRight: 130,
  },
  logout: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  textlogout: {
    color: "#000",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginBottom: 40,
  },
  imageLogo: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
 
 