import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchBarCode } from "../util/database";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Codigo todavía no leido!");
  const [imagenProduct, setImagenProduct] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const [productRead, setProductRead] = useState(null);
  const [qtyProduct, setQtyProduct] = useState(1);
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
    setImagenProduct(product[0].imageUri);
  }
  function productPressHandler() {
    navigation.navigate("Venta Actual", {
      title: productRead[0].title,
      price: productRead[0].price,
      barCode: productRead[0].barCode,
      imageUri: productRead[0].imageUri,
      id: productRead[0].id,
      qty: qtyProduct,
    });
  }
  function scanAgain() {
    setScanned(false);
    setText("Codigo todavía no leido!");
  }
  const plusHandler = () => {
    setQtyProduct(qtyProduct + 1);
  };
  const minusHandler = () => {
    if (qtyProduct > 1) {
      setQtyProduct(qtyProduct - 1);
    }
  };

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
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: imagenProduct,
              }}
            />
          </View>
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
          <View style={styles.Buttons}>
            <View>
              <Text style={styles.cantidad}>X {qtyProduct} </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button title={"+"} onPress={plusHandler} color="green" />
            </View>
            <View style={{ flex: 1 }}>
              <Button title={"-"} onPress={minusHandler} color="red" />
            </View>
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
    margin: 10,
  },
  cantidad: {
    fontSize: 30,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 250,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "grey",
  },
  buttonsContainer: {
    flex: 1,
  },
  Button: {
    flex: 1,
    flexBasis: "column",
    marginTop: 5,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  Buttons: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
  },
});
