import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlice";
import {
  postOrder,
  setStateByName,
  selectOrder,
} from "@/redux/reducers/order/orderSlice";
import CarList from "@/components/CarList";
import {selectUser} from "@/redux/reducers/auth/loginSlice"
import moment from "moment";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethods = ["BCA", "MANDIRI", "BNI"];

export default function Step1({setActiveStep}) {
  const carDetail = useSelector(selectCarDetail);
  const { data, selectedBank, status, errorMessage } = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  const dispatch = useDispatch()

  const handleOrder = () => {
    const formData = {
      carId: carDetail.data.id,
      startRentAt: moment().format("YYYY-MM-DD"),
      finishRentAt: moment().add(4, "days").format("YYYY-MM-DD"),
    };
    dispatch(postOrder({token:user.data.access_token, formData}));
  };

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      dispatch(setStateByName({ name: "activeStep", value: 1 }));
    } else {
      console.log(errorMessage);
    }
  }, [status]);

  const handleNextStep = () => {
    // Kirim bank yang dipilih ke parent atau step berikutnya
    setActiveStep(1); // Lanjut ke Step2
    //   } else {
    //     Alert.alert('Pilih metode pembayaran terlebih dahulu!');
    //   }
  };

  return (
    <View style={styles.container}>
      <CarList
        image={{ uri: carDetail.data.image }}
        carName={carDetail.data.name}
        passengers={5}
        baggage={4}
        price={carDetail.data.price}
      />
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking, atau
        Mobile Banking
      </Text>
      <View>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => dispatch(setStateByName({ name: "selectedBank", value: method }))}
            style={styles.paymentMethod}
          >
            <Text style={styles.paymentBox}>{method}</Text>
            <Text style={styles.paymentText}>{method} Transfer</Text>
            {selectedBank === method && (
              <Ionicons size={20} name={"checkmark"} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text>% Pakai Kode Promo</Text>
        <View style={styles.promoContainer}>
          <TextInput
            placeholder="Tulis promomu disini"
            style={styles.formInput}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.paymentButtonText}>Terapkan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(carDetail.data.price || 0)}</Text>
        <TouchableOpacity
          disabled={!selectedBank}
          style={[styles.paymentButton, { backgroundColor: "#3D7B3F" }]}
          onPress={handleOrder}
        >
          <Text style={styles.paymentButtonText}>Bayar</Text>
        </TouchableOpacity>
      </View>
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
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#D0D0D0",
    marginBottom: 10,
  },
  paymentBox: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    marginRight: 10,
    width: "30%",
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: "#3D7B3F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  paymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsBold",
  },
  check: {
    marginLeft: "auto",
  },
});
