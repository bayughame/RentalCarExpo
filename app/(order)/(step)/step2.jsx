import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrder,
  setStateByName,
  putOrderSlip,
} from "@/redux/reducers/order/orderSlice";
import { selectUser } from "../../../redux/reducers/auth/loginSlice";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";

// tambahan import untuk select User

import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "@/components/Grid";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import ModalPopup from "@/components/Modal";

function getData24() {
  const date24 = new Date(); // your date object
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

// const paymentMethods = ["BCA", "BNI", "Mandiri"];

export default function step2({ setActiveStep }) {
  const { errorMessage, status, data } = useSelector(selectOrder);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const car = useSelector(selectCarDetail);
  const [modalVisible, setModalVisible] = useState(false);

  // const { data, carId, setActiveStep, status, errorMessage } = useSelector(selectOrder);

  const [image, setImage] = useState(null); // setelah install image picker atur state nya

  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  const copyToClipboard = async (text) => {
    const str = text.toString();
    await Clipboard.setStringAsync(str);
  };

  const pickImage = async () => {
    // copas dari web expo image picker
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        name:
          result.assets[0].fileName == null
            ? "gambar.jpg"
            : result.assets[0].fileName,
        type: result.assets[0].mimeType, // mimeType = jenis file (jpg, jpeg, png)
      });
    }
  };

  const handleUpload = () => {
    if (image !== null) {
      const formData = new FormData(); // fungsi membuat form seperti di HTML
      formData.append("slip", image); // fungsi append untuk nama
      // console.log("image", image);
      dispatch(
        putOrderSlip({
          token: user.data.access_token,
          id: data.id,
          formData: formData,
        })
      );
    }
  };

  useEffect(() => {
    if (status === "upload-success") {
      setTimeout(() => {
        dispatch(setStateByName({ name: "activeStep", value: 2 }));
      }, 2000);
    } else {
      console.log("errorMessage", errorMessage);
    }
  }, [status]);
  // console.log("status", status);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Row style={styles.countDownWrapper}>
          <Text style={styles.countDownText}>
            Selesaikan Pembayaran Sebelum
          </Text>

          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabelStyle={{ display: "none" }}
            onFinish={() => Alert("finished")}
            timeToShow={["H", "M", "S"]}
            size={12}
            showSeparator={true}
          />
        </Row>

        <Text style={styles.countDownDate}>{getData24()}</Text>

        <CarList
          image={{ uri: car.data.image }}
          carName={car.data.name}
          passengers={5}
          baggage={4}
          price={car.data.price}
        />

        <Text style={styles.textBold}>Lakukan Transfer Ke :</Text>

        <View>
          <Button style={styles.paymentMethod}>
            <Text style={styles.paymentBox}>BCA</Text>
            <Text style={styles.paymentText}>BCA Transfer</Text>
          </Button>
        </View>

        <View style={styles.rekContainer}>
          <Text>Nomor Rekening</Text>
          <Row style={styles.boxRek}>
            <Text>xxxx-xxxx-xxxx</Text>
            <TouchableOpacity onPress={() => copyToClipboard("xxxx-xxxx-xxxx")}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={18} />
            </TouchableOpacity>
          </Row>
        </View>

        <View style={styles.rekContainer}>
          <Text>Total Bayar</Text>
          <Row style={styles.boxRek}>
            <Text>{formatIDR(car.data.price)}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(car.data.price)}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={18} />
            </TouchableOpacity>
          </Row>
        </View>

        <View>
          <Text style={styles.textBold}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.formButton1}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textPayment1}>Konfirmasi Pembayaran</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formButton2}
            onPress={() => {
              // setActiveStep(2);
            }}
          >
            <Text style={styles.textPayment2}>Lihat Daftar Pesanan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Text style={styles.textBold}>Konfirmasi Pembayaran</Text>

          <Text style={styles.textBold}>
            Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
            akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan
            konfirmasi.
          </Text>

          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabelStyle={{ display: "none" }}
            onFinish={() => Alert("finished")}
            timeToShow={["M", "S"]}
            size={12}
            showSeparator={true}
          />

          <Text style={styles.textBold}>Upload Bukti Pembayaran</Text>

          <Text style={styles.textBold}>
            Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
            upload bukti bayarmu
          </Text>

          <Pressable style={styles.uploadImage} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.image} />
            ) : (
              <Ionicons color={"#3C3C3C"} name={"image-outline"} size={18} />
            )}
          </Pressable>

          <View style={styles.footerModal}>
            <TouchableOpacity
              style={styles.formButton1}
              onPress={() => handleUpload()}
            >
              <Text style={styles.textPayment1}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.formButton2}
              onPress={() => {
                // setActiveStep(2);
              }}
            >
              <Text style={styles.textPayment2}>Lihat Daftar Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },

  paymentMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
    borderWidthBottom: 1,
    borderColorBottom: "#D0D0D0",
    borderRadius: 5,
  },

  paymentBox: {
    width: "30%",
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    marginRight: 20,
  },

  check: {
    marginLeft: "auto",
    marginVertical: 5,
    color: "green",
  },

  paymentText: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#000000",
    marginTop: 10,
  },

  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },

  promoText: {
    fontFamily: "Poppinsbold",
    fontSize: 14,
  },

  textPayment1: {
    fontFamily: "PoppinsBold",
    color: "#ffffff",
    textAlign: "center",
  },

  textPayment2: {
    fontFamily: "PoppinsBold",
    color: "#3D7B3F",
    textAlign: "center",
  },

  promoInput: {
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },

  promosForm: {
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },

  footerModal: {
    backgroundColor: "#ffffff",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
  },

  formButton1: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },

  formButton2: {
    backgroundColor: "#ffffff",
    borderColor: "#3D7B3F",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },

  rekContainer: {
    paddingVertical: 10,
    gap: 5,
  },

  countDownText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },

  countDownWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  countDownDate: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },

  boxRek: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalBackground: {
    alignItems: "center",
    width: "90%",
    backgroundColor: "#ffffff",
    elevation: 20,
    borderRadius: 4,
    padding: 20, // ga ngaruh ke background
  },

  uploadImage: {
    backgroundColor: "#D0D0D0",
    borderWidth: 1,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    borderWidth: 1,
    width: 250,
    height: 250,
  },
});