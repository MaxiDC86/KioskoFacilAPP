import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../model/product";
import Button from "../UI/Button";
import { insertProduct } from "../util/database";

function CreateProduct() {
  const navigation = useNavigation();

  async function crearHandler() {
    const product = new Product("milanesa", 7500, 88341234, 1);

    await insertProduct(product);

    navigation.navigate("PRODUCTOS");
  }

  return (
    <View>
      <Text>Product creation form</Text>
      <View>
        <Button onPress={crearHandler}>Crear producto.</Button>
      </View>
    </View>
  );
}

export default CreateProduct;
