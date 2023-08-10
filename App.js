import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Operations from "./screens/operations";
import Productos from "./screens/productos";
import Scanner from "./screens/scanner";
import VentaActual from "./screens/ventaActual";
import CreateProduct from "./screens/createProduct";

import IconButton from "./UI/IconButton";

import { init } from "./util/database";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function MyTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="OPERACIONES" component={Operations} />
      <BottomTab.Screen name="VENDER" component={Scanner} />
      <BottomTab.Screen name="PRODUCTOS" component={Productos} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return (
      <View>
        <Text>Loading!!!!</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Kiosko Facíl"
            component={MyTabs}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  icon="add"
                  size={34}
                  onPress={() => navigation.navigate("Crear Producto")}
                />
              ),
            })}
          />
          <Stack.Screen name="Venta Actual" component={VentaActual} />
          <Stack.Screen name="Agregar Producto" component={Scanner} />
          <Stack.Screen name="Crear Producto" component={CreateProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
