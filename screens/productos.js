import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

function Productos() {
  const navigation = useNavigation();
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

  function productHandler(element) {
    console.log("producto " + element.title + " selecionado");
    navigation.navigate("Details", { product: element });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={loadedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => productHandler(item)}>
            <View style={styles.tag}>
              <View>
                <Text style={styles.text}>
                  {item.title} ${item.price} C:{item.barCode}
                </Text>
              </View>
              <View>
                <Image style={styles.image} source={{ uri: item.imageUri }} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Productos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tag: {
    padding: 2,
    margin: 4,
    flexDirection: "row",
    backgroundColor: "#19cfd2",
  },
  image: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 15,
    marginRight: 5,
    color: "white",
  },
});
