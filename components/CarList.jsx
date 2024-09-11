import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  PressableeSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Row, Col } from "./Grid";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function CarList({
  carName,
  onPress,
  image,
  passengers,
  baggage,
  price,
  style,
}) {
  return (
    <Pressable style={{ ...styles.card, ...style }} onPress={onPress}>
      <Row alignItem={"center"} gap={20}>
        <Col>
          <Image style={styles.img} source={image} />
        </Col>
        <Col>
          <Text style={styles.carName}> {carName}</Text>
          <Row gap={5}>
            <Row style={styles.textIcon}>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Row>
            <Row>
              <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
              <Text style={styles.carName}>{baggage}</Text>
            </Row>
          </Row>
          <Text style={styles.price}>{formatCurrency.format(price)}</Text>
        </Col>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // boxShaddow: '',
    // shadowColor: '#rgba(0,0,0,0.2)',
    // shadowOffset:{
    //   width: 0,
    //   height: 3,
    // },
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    elevation: 1.5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  img: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5C885F",
  },
  textIcon: {
    flexDirection: "row",
    alignItem: "center",
    gap: 2,
  },
});
