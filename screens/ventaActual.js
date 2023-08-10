import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

function VentaActual() {
  const navigation = useNavigation();

  function buttonFinalizarHandler() {
    navigation.navigate("OPERACIONES");
  }

  function buttonAgregarHandler() {
    navigation.navigate("Agregar Producto");
  }
  return (
    <View>
      <ScrollView>
        <View>
          <Text> Lista de operaciones realizadas!!!!!</Text>
          <Image
            source={require("../images/alfajor-aguila.jpg")}
            style={styles.logo}
          />
        </View>
        <View>
          <Text> Lista de operaciones realizadas!!!!!</Text>
          <Image
            source={require("../images/alfajor-aguila.jpg")}
            style={styles.logo}
          />
        </View>
        <View>
          <Button onPress={buttonAgregarHandler}>Agregar producto.</Button>
        </View>
        <View>
          <Button onPress={buttonFinalizarHandler}>Finalizar Compra.</Button>
        </View>
      </ScrollView>
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
