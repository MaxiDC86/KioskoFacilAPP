import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function Productos() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getProducts() {
      const products = await fetchProducts();

      setLoadedProducts(products);
    }
    if (isFocused) {
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
      getProducts();
    }
  }, [isFocused]);

  return (
    <View>
      <FlatList
        data={loadedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            Nombre: {item.title} Precio: {item.price} Codigo: {item.barCode}
          </Text>
        )}
      />
    </View>
  );
}

export default Productos;

const styles = StyleSheet.create({});
