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
      getProducts();
    }
  }, [isFocused]);

  return (
    <View>
      <FlatList
        data={loadedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.tag}>
            {item.title} ${item.price} C:{item.barCode}
          </Text>
        )}
      />
    </View>
  );
}

export default Productos;

const styles = StyleSheet.create({
  tag: {
    padding: 2,
    margin: 5,
    fontSize: 14,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
