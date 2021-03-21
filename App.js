import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./src/screens/Home";
import Catalog from "./src/screens/Catalog";
import About from "./src/screens/About";
import ProductsPage from "./src/screens/ProductsPage";
import Cart from "./src/screens/Cart";
import Splash from "./src/screens/Splash";

const Stack = createStackNavigator(); // https://reactnavigation.org/docs/hello-react-navigation

// https://reactnavigation.org/docs/tab-based-navigation

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 4000)); // load in for 2 seconds
        // load fonts/ assets
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []); // do it only once

  
  if (!appIsReady) {
    return <Splash />;
  } 
  //https://reactnavigation.org/docs/stack-navigator   transitions to add
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "rgb(237,167,47)" },
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About Us" component={About} />
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
