import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
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

  //Parametros desde scanner.js
  const title = route.params?.title;
  const price = route.params?.price;
  const barCode = route.params?.barCode;
  const id = route.params?.id;
  const qty = route.params?.qty;

  useEffect(() => {
    if (isFocused) {
      var firstTime = true;
      // Recorremos el array para ver si el producto ya esta cargado.
      for (i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].product.id == id) {
          shoppingCart[i].qty = shoppingCart[i].qty + qty;
          firstTime = false;
        }
      }
      if (firstTime) {
        // [{product: , qty: },[],[]]
        setShoppingCart((curProducts) => [
          ...curProducts,
          { product: new Product(title, price, barCode, id), qty: qty },
        ]);
      }
      firstTime = true;
      setTotalShoppingCart((curValue) => curValue + price * qty);
    }
  }, [isFocused]);

  function buttonFinalizarHandler() {
    setShoppingCart([]);
    navigation.navigate("OPERACIONES");
  }
  function buttonCancelHandler() {
    Alert.alert("Cancelar Venta ActuaL?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setShoppingCart([]);
          navigation.navigate("OPERACIONES");
        },
      },
    ]);
  }

  function buttonAgregarHandler() {
    navigation.navigate("Agregar Producto");
  }
  return (
    <View>
      <FlatList
        data={shoppingCart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <Text style={styles.tag}>
            {item.product.title} ${item.product.price} QTY:{item.qty}
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
        <Button onPress={buttonFinalizarHandler}>Finalizar Venta.</Button>
      </View>
      <View>
        <Button onPress={buttonCancelHandler}>Cancelar Venta.</Button>
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
    marginTop: 20,
    marginLeft: 5,
    paddingLeft: 5,
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
