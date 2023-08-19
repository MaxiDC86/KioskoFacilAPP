import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchBarCode } from "../util/database";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productFound, setProductFound] = useState(false);
  const [text, setText] = useState("Codigo todavía no leido!");
  const [imagenProduct, setImagenProduct] = useState(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const [productRead, setProductRead] = useState(null);
  const [qtyProduct, setQtyProduct] = useState(1);
  const [barCodeRead, setBarcodeRead] = useState(null);

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
    if (product[0] == undefined) {
      setText("Producto con codigo " + parseInt(data) + " no encontrado!");
      setProductFound(false);
      setBarcodeRead(parseInt(data));
    } else {
      setProductFound(true);
      setText(
        product[0].title + " $" + product[0].price + " CG:" + product[0].barCode
      );
      setProductRead(product);
      setImagenProduct(product[0].imageUri);
    }
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
    setImagenProduct("https://reactnative.dev/img/tiny_logo.png");
  }
  const plusHandler = () => {
    setQtyProduct(qtyProduct + 1);
  };
  const minusHandler = () => {
    if (qtyProduct > 1) {
      setQtyProduct(qtyProduct - 1);
    }
  };
  function createProductHandler() {
    navigation.navigate("Crear Producto", { barCode: barCodeRead });
  }

  return (
    <View style={styles.container}>
      <View style={scanned ? styles.barcodeboxScanned : styles.barcodebox}>
        {isFocused ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 300, width: 350 }}
          />
        ) : null}
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && !productFound && (
        <View style={{ marginBottom: 80 }}>
          <Button
            title={"CREAR PRODUCTO NUEVO"}
            onPress={createProductHandler}
          />
        </View>
      )}
      {scanned && (
        <View style={styles.buttonsContainer}>
          <View>
            <Image
              style={styles.imagenProducto}
              source={{
                uri: imagenProduct,
              }}
            />
          </View>
          {productFound && (
            <>
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
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Button title={"-"} onPress={minusHandler} color="red" />
                </View>
              </View>
              <View style={styles.Button}>
                <Button
                  title={"¿Escanear nuevamente?"}
                  onPress={() => scanAgain()}
                  color="blue"
                />
              </View>
            </>
          )}
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
    fontSize: 30,
    margin: 2,
  },
  cantidad: {
    fontSize: 30,
  },
  barcodebox: {
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "grey",
  },
  barcodeboxScanned: {
    height: 0,
    width: 0,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  Buttons: {
    flex: 1,
    flexDirection: "row",
    marginTop: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  imagenProducto: {
    marginBottom: 30,
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
});
