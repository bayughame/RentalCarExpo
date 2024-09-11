import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Field email is required"),
  password: Yup.string()
    .min(8, "Field password must be at least 8 characters")
    .max(20, "Too Long!")
    .required("Field password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
});

export default function register(values) {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: "User",
          }),
        }
      );
      const body = await req.json();
      console.log(body);
      if (!req.ok)
        throw new Error(
          body.message || body.errors[0].message || "Something Went Wrong!"
        );
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("/");
      }, 1000);
    } catch (e) {
      setErrorMessage(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        // router.navigate(null);
      }, 1000);
    }
  };

  return (
    <View>
      <Image
        source={require("@/assets/images/logo-tmmin.png")}
        style={{
          margin: 23,
        }}
      />
      <Text style={styles.heading}>Sign Up</Text>
      <Formik
        initialValues={{ 
          email: "",
          name:'',
          password:''
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => handleSubmit(value)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name*</Text>
              <TextInput 
              onBlur={handleBlur('name')}
              onChangeText={handleChange('name')}
              style={styles.formInput} placeholder="name" />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email*</Text>
              <TextInput
                style={styles.formInput}
                onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
                placeholder="jhondee@gmail.com"
              />
              {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Create Password*</Text>
              <TextInput
                style={styles.formInput}
                secureTextEntry={true}
                onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
                placeholder="6+ karakter"
              />
              {errors.password && touched.password ? <Text>{errors.password}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              {/* <Button color='#3D7B3F' title="Sign Up" style={styles.signIn} /> */}
              <Text style={styles.textRegister}>
                Already have an account?
                <Link style={styles.linkRegister} href="./">
                  {" "}
                  Sign In here
                </Link>
              </Text>
            </View>
          </>
        )}
      </Formik>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons size={32} name={"close-circle"} color={"red"} />
              <Text>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons size={32} name={"checkmark-circle"} color={"green"} />
              <Text>Berhasil Register!</Text>
            </>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "PoppinsBold",
  },
  formContainer: {
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    color: "black",
    borderBlockColor: "grey",
    fontFamily: "PoppinsBold",
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#0000001A",
  },
  formButton: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
  },
});
