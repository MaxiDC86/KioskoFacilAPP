import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import Button from "../UI/Button";

import { updateProduct } from "../util/database";

function Details({ route }) {
  const navigation = useNavigation();
  const [imagen, setImagen] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const [titleProd, setTitleProd] = useState("");
  const [priceProd, setPriceProd] = useState("");

  const id = route.params?.product.id;
  const title = route.params?.product.title;
  const price = route.params?.product.price;
  const barCode = route.params?.product.barCode;
  const imageUri = route.params?.product.imageUri;

  const isFocused = useIsFocused();

  useEffect(() => {
    setImagen(imageUri);
    setPriceProd(price);
    setTitleProd(title);
  }, [isFocused]);

  function buttonReturnHandler() {
    navigation.navigate("PRODUCTOS");
  }
  async function buttonUpdateHandler() {
    if (titleProd === "") {
      setTitleProd(title);
    }
    if (priceProd === "") {
      setPriceProd(price);
    }
    const updateSuccess = await updateProduct(
      id,
      titleProd,
      priceProd,
      barCode,
      imageUri
    );
    if (updateSuccess) {
      navigation.navigate("PRODUCTOS");
    }
  }
  return (
    <View>
      <View>
        <Text style={styles.text}>Actual: {title}</Text>
        <TextInput
          style={styles.text}
          onChangeText={setTitleProd}
          value={titleProd}
          placeholder="Nombre nuevo"
        />
      </View>
      <View>
        <Text style={styles.text}>${price}</Text>
        <TextInput
          style={styles.text}
          value={priceProd}
          onChangeText={setPriceProd}
          placeholder="Precio nuevo"
        />
      </View>
      <Text style={styles.text}>Codigo de barras: {barCode}</Text>
      <Image
        style={styles.imagenProducto}
        source={{
          uri: imagen,
        }}
      />
      <Button onPress={buttonUpdateHandler}>Guardar modificación.</Button>
      <Button onPress={buttonReturnHandler}>Volver a productos</Button>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
  },
  imagenProducto: {
    width: 300,
    height: 300,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
});
