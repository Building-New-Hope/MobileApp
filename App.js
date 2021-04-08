import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./frontend/navigation/TabNavigator";

import Splash from "./frontend/screens/Splash";
import {
  Poppins_400Regular,
  Philosopher_400Regular,
} from "./assets/fonts/google-fonts/dev";
import { loadAsync } from "expo-font";

// https://reactnavigation.org/docs/tab-based-navigation
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // load in for 2 seconds
        await loadAsync({ Poppins_400Regular, Philosopher_400Regular }).then(() =>
          console.log("fonts loaded")
        );
        //TODO: could fetch products from Wix API
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
  //TODO: https://reactnavigation.org/docs/stack-navigator  - Transitions
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
