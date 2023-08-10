import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Operations from "./screens/operations";
import Productos from "./screens/productos";
import Scanner from "./screens/scanner";
import VentaActual from "./screens/ventaActual";

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
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Kiosko Facíl" component={MyTabs} />
          <Stack.Screen name="Venta Actual" component={VentaActual} />
          <Stack.Screen name="Agregar Producto" component={Scanner} />
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
