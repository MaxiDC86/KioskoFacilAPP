import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchOperations } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function Stock() {
  const isFocused = useIsFocused();

  const [loadedOperation, setLoadedOperations] = useState([]);

  useEffect(() => {
    async function getOperations() {
      const operations = await fetchOperations();

      setLoadedOperations(operations);
    }
    if (isFocused) {
      getOperations();
    }
  }, [isFocused]);

  return (
    <View>
      <FlatList
        data={loadedOperation}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            op:{item.operationNumber} {item.title} ${item.price} QTY:{item.qty}{" "}
            CB:{item.barCode}
          </Text>
        )}
      />
    </View>
  );
}

export default Stock;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginRight: 3,
    marginBottom: 3,
    fontSize: 15,
    backgroundColor: "grey",
    color: "white",
  },
});
