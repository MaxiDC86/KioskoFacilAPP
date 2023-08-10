import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

function VentaActual({ route }) {
  const navigation = useNavigation();

  const product = route.params?.product;

  function buttonFinalizarHandler() {
    navigation.navigate("OPERACIONES");
  }

  function buttonAgregarHandler() {
    navigation.navigate("Agregar Producto");
  }
  return (
    <View>
      <ScrollView>
        <Text>{product}</Text>
      </ScrollView>
      <View>
        <Button onPress={buttonAgregarHandler}>Agregar producto.</Button>
      </View>
      <View>
        <Button onPress={buttonFinalizarHandler}>Finalizar Compra.</Button>
      </View>
    </View>
  );
}

export default VentaActual;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  tag: {},
  logo: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
  },
});
