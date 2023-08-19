import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Operations from "./screens/operations";
import Productos from "./screens/productos";
import Scanner from "./screens/scanner";
import VentaActual from "./screens/ventaActual";
import CreateProduct from "./screens/createProduct";
import Details from "./screens/details";

import IconButton from "./UI/IconButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { init, init_operations } from "./util/database";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function MyTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="OPERACIONES"
        component={Operations}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="clipboard" />
          ),
        })}
      />
      <BottomTab.Screen
        name="VENDER"
        component={Scanner}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="cart" />
          ),
        })}
      />
      <BottomTab.Screen
        name="PRODUCTOS"
        component={Productos}
        options={({ navigation }) => ({
          headerRight: ({ tintColor }) => (
            <IconButton
              color={tintColor}
              icon="add"
              size={34}
              onPress={() => navigation.navigate("Crear Producto")}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="grid" />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [dbInitialized2, setDbInitialized2] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
    init_operations()
      .then(() => {
        setDbInitialized2(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized || !dbInitialized2) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackVisible: false,
          }}
        >
          <Stack.Screen name="Kiosko Facíl" component={MyTabs} />
          <Stack.Screen name="Venta Actual" component={VentaActual} />
          <Stack.Screen name="Agregar Producto" component={Scanner} />
          <Stack.Screen name="Crear Producto" component={CreateProduct} />
          <Stack.Screen name="Details" component={Details} />
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
  activityIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginTop: 350,
  },
});
