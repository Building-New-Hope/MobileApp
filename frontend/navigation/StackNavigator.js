import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Catalog from "../screens/Catalog";
import About from "../screens/About";
import Cart from "../screens/Cart";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "black",
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About Us" component={About} />
      <Stack.Screen name="Catalog" component={Catalog} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator }
