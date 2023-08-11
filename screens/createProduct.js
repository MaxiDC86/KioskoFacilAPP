import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../model/product";
import Button from "../UI/Button";
import { insertProduct, deleteProduct, deleteAll } from "../util/database";

function CreateProduct() {
  const navigation = useNavigation();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredBarCode, setEnteredBarCode] = useState("");

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }
  function changePriceHandler(enteredPrice) {
    setEnteredPrice(enteredPrice);
  }
  function changeBarCodeHandler(enteredBarCode) {
    setEnteredBarCode(enteredBarCode);
  }

  async function crearHandler() {
    const product = new Product(
      enteredTitle,
      parseInt(enteredPrice),
      parseInt(enteredBarCode)
    );

    await insertProduct(product);

    navigation.navigate("PRODUCTOS");
  }
  async function borrarHandler() {
    await deleteProduct(8);
  }
  async function borrarTodoHandler() {
    await deleteAll();
  }

  return (
    <View>
      <Text>Product name:</Text>
      <TextInput onChangeText={changeTitleHandler} value={enteredTitle} />
      <Text>Product Price:</Text>
      <TextInput onChangeText={changePriceHandler} value={enteredPrice} />
      <Text>Product Bar Code:</Text>
      <TextInput onChangeText={changeBarCodeHandler} value={enteredBarCode} />
      <View>
        <Button onPress={crearHandler}>Crear producto.</Button>
      </View>
      <View>
        <Button onPress={borrarHandler}>Borrar producto.</Button>
      </View>
      <View>
        <Button onPress={borrarTodoHandler}>Borrar todos los productos.</Button>
      </View>
    </View>
  );
}

export default CreateProduct;
