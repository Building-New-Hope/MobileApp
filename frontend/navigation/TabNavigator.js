import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator}></Tab.Screen>
      {/* </Tab.Navigator><Tab.Screen name="" component={}></Tab.Screen> Other stack navigator ex: Contact */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
