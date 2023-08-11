import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../model/product";
import { useIsFocused } from "@react-navigation/native";

function VentaActual({ route }) {
  const navigation = useNavigation();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalShoppingCart, setTotalShoppingCart] = useState(0);
  const isFocused = useIsFocused();
  const title = route.params?.title;
  const price = route.params?.price;
  const barCode = route.params?.barCode;
  const id = route.params?.id;

  useEffect(() => {
    if (isFocused) {
      setShoppingCart((curProducts) => [
        ...curProducts,
        new Product(title, price, barCode, id),
      ]);
      setTotalShoppingCart((curValue) => curValue + price);
    }
  }, [isFocused]);

  function buttonFinalizarHandler() {
    setShoppingCart([]);
    navigation.navigate("OPERACIONES");
  }

  function buttonAgregarHandler() {
    navigation.navigate("Agregar Producto");
  }
  return (
    <View>
      <FlatList
        data={shoppingCart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.tag}>
            {item.title} ${item.price}
          </Text>
        )}
      />
      <View>
        <Text style={styles.totalPrice}>
          Total de esta compra ${totalShoppingCart}
        </Text>
      </View>

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
  tag: {
    padding: 2,
    margin: 5,
    fontSize: 16,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
  },
  totalPrice: {
    padding: 4,
    margin: 5,
    fontSize: 22,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
  },
});
