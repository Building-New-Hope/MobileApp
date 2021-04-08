import "react-native-gesture-handler";
import * as React from "react";
import Native from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './src/screens/Home'

import Catalog from "./src/screens/Catalog";
import ProductsPage from './src/screens/ProductsPage'

import Cart from "./src/screens/Cart";


const Stack = createStackNavigator(); // https://reactnavigation.org/docs/hello-react-navigation


// https://reactnavigation.org/docs/navigating/ READ
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Catalog" component={Catalog} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
