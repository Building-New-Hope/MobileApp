import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator } from './StackNavigator';

/*
A future feature could include tab navigation. The app is too simple as of now to warrant a tab for just home. In the
future when more screens are added, ex: Contact, About Us, Donation, etc. This could be useful
*/

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
