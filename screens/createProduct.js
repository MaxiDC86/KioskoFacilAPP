import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../model/product";
import Button from "../UI/Button";
import ImagePicker from "../UI/ImagePicker";
import { insertProduct, deleteProduct, deleteAll } from "../util/database";

function CreateProduct({ route }) {
  const navigation = useNavigation();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredBarCode, setEnteredBarCode] = useState("");
  const [enteredImageUri, setEnteredImageUri] = useState("sin imagen");

  useEffect(() => {
    if (route.params.barCode != undefined) {
      setEnteredBarCode(route.params.barCode.toString());
    }
  }, []);

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }
  function changePriceHandler(enteredPrice) {
    setEnteredPrice(enteredPrice);
  }
  function changeBarCodeHandler(enteredBarCode) {
    setEnteredBarCode(enteredBarCode);
  }
  function takeImageHandler(imageUri) {
    setEnteredImageUri(imageUri);
  }

  async function createProduct() {
    const product = new Product(
      enteredTitle,
      parseInt(enteredPrice),
      parseInt(enteredBarCode),
      enteredImageUri
    );

    await insertProduct(product);
  }

  function crearHandler() {
    Alert.alert(
      "Confirma que los datos ingresados son corrector?",
      "Nombre: " + enteredTitle + " $" + enteredPrice + " CB:" + enteredBarCode,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            createProduct();
            navigation.navigate("PRODUCTOS");
          },
        },
      ]
    );
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
      <ImagePicker onTakeImage={takeImageHandler} />
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
