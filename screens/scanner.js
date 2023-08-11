import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchBarCode } from "../util/database";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Codigo todavía no leido!");
  const [productRead, setProductRead] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);
  // Check permission and return the screens.
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Abriendo la camara!</Text>
      </View>
    );
  }

  // What happens when we can scan the bar code
  async function handleBarCodeScanned({ data }) {
    setScanned(true);
    const product = await fetchBarCode(parseInt(data));
    setText(
      product[0].title + " $" + product[0].price + " CG:" + product[0].barCode
    );
    setProductRead(product);
  }
  function productPressHandler() {
    navigation.navigate("Venta Actual", {
      title: productRead[0].title,
      price: productRead[0].price,
      barCode: productRead[0].barCode,
      id: productRead[0].id,
    });
  }
  function scanAgain() {
    setScanned(false);
    setText("Codigo todavía no leido!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        {isFocused ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 300, width: 350 }}
          />
        ) : null}
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <View style={styles.buttonsContainer}>
          <View style={styles.Button}>
            <Button
              title={"¿Escanear nuevamente?"}
              onPress={() => scanAgain()}
              color="blue"
            />
          </View>
          <View style={styles.Button}>
            <Button
              title={"AGREGAR A CARRITO"}
              onPress={productPressHandler}
              color="green"
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: 300,
    height: 200,
    resizeMode: "stretch",
  },
  maintext: {
    fontSize: 20,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    marginTop: 40,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "grey",
  },
  buttonsContainer: {
    flex: 1,
  },
  Button: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
  },
});
