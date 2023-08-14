import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import Button from "../UI/Button";

function Details({ route }) {
  const navigation = useNavigation();
  const [imagen, setImagen] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const title = route.params?.product.title;
  const price = route.params?.product.price;
  const barCode = route.params?.product.barCode;
  const imageUri = route.params?.product.imageUri;
  const isFocused = useIsFocused();

  useEffect(() => {
    setImagen(imageUri);
  }, [isFocused]);

  function buttonReturnHandler() {
    navigation.navigate("PRODUCTOS");
  }
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>${price}</Text>
      <Text style={styles.text}>Codigo de barras: {barCode}</Text>
      <Image
        style={styles.logo}
        source={{
          uri: imagen,
        }}
      />
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
  logo: {
    width: 300,
    height: 300,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});
