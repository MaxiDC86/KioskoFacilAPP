import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { insertProduct, fetchProducts } from "../util/database";
import { Product } from "../model/product";

function Scanner() {
  const navigation = useNavigation();

  async function scannerHandler() {
    const product = new Product("Galletitas", 1500, 82341234);

    await insertProduct(product);
    navigation.navigate("Venta Actual");
  }

  return (
    <View style={styles.container}>
      <Text> ESCANEANDO PRODUCTO!!!</Text>
      <TouchableOpacity onPress={scannerHandler}>
        <Image
          source={require("../images/codigo_barras.png")}
          style={styles.stretch}
        />
      </TouchableOpacity>
      <Image source={require("../images/sube_logo.png")} style={styles.logo} />
    </View>
  );
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 300,
    height: 200,
    resizeMode: "stretch",
  },
  logo: {
    marginTop: 80,
    width: 150,
    height: 150,
    resizeMode: "stretch",
  },
});
