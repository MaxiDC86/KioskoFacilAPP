import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../model/product";
import Button from "../UI/Button";
import ImagePic from "../UI/ImagePicker";
import { insertProduct, deleteProduct, deleteAll } from "../util/database";

function CreateProduct({ route }) {
  const navigation = useNavigation();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredBarCode, setEnteredBarCode] = useState("");
  const [enteredImageUri, setEnteredImageUri] = useState("sin imagen");

  useEffect(() => {
    const barCode = route.params?.barCode;
    if (barCode != undefined) {
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
      <Text style={styles.text}>Producto name:</Text>
      <TextInput
        onChangeText={changeTitleHandler}
        value={enteredTitle}
        style={styles.textInput}
      />
      <Text style={styles.text}>Producto Price:</Text>
      <TextInput
        onChangeText={changePriceHandler}
        value={enteredPrice}
        style={styles.textInput}
      />
      <Text style={styles.text}>CODIGO DE BARRAS:</Text>
      <TextInput
        onChangeText={changeBarCodeHandler}
        value={enteredBarCode}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <ImagePic onTakeImage={takeImageHandler} />
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

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: "#dad7d7",
    marginHorizontal: 20,
  },
});
