import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  postLogin,
  selectUser,
} from "../../redux/reducers/auth/loginSlice";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Login() {
  const { errorMessage, isModalVisible, isError } = useSelector(selectUser);
  const dispatch = useDispatch();

  // const [modalVisible, setModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    console.log("test submit", formData);
    dispatch(postLogin(formData));
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const {
      data: { idToken },
    } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(idToken, googleCredential);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  function onAuthStateChanged(user) {
    console.log(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      // setModalVisible(true)
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) router.replace("../(tabs)");
      }, 2000);
    }
  }, [isModalVisible]);

  return (
    <View>
      <Image source={require("@/assets/images/logo-tmmin.png")} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          onChangeText={(text) => handleChange("email", text)}
          style={styles.formInput}
          placeholder="johndee@gmail.com"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          onChangeText={(text) => handleChange("password", text)}
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.formButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.textButton}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.textRegister}>
          Don't have an account?{` `}
          <Link style={styles.linkRegister} href="./Register">
            Sign up for free
          </Link>
        </Text>
      </View>
      <View>
        <Text>or</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons size={32} name={"close-circle"} color={"red"} />
              <Text>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons size={32} name={"checkmark-circle"} color={"green"} />
              <Text>Berhasil Login!</Text>
            </>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
    textDecorationLine: "underline",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
  },
  formButton: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  textButton: {
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
});
