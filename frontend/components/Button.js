import React from "react";
import { Button, Text } from "react-native-elements";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";

import theme from "../constants/theme";
/* 
Component for the buttons in our app. We could have multiple kinds of buttons or just one
Still need to style it further
 */

// https://reactnativeelements.com/docs/button/#props
const SolidButton = (props) => {
  return (
    <View>
      <Button
        size={30}
        icon={props.icon}
        buttonStyle={styles.solidButton}
        title={props.text}
        titleStyle={styles.buttonText}
        onPress={props.onPress}
      />
    </View>
  );
};

const CartButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.cartButton} onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require("../../assets/images/shopping-cart.png")}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

const CheckOutButton = (props) => {
  // TODO
  return (
    <Button
      icon={<Icon name="credit-card" type="evilicon" size={30} />}
      onPress={props.onPress}
      title='Check Out'
      titleStyle={styles.buttonText}
      buttonStyle={styles.checkoutButton}
    />
  );
};

export { SolidButton, CartButton, CheckOutButton };

const styles = StyleSheet.create({
  solidButton: {
    height: 40,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.button,
  },
  checkoutButton: {
    height: 50,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.button,
  },
  cartButton: {
    height: 40,
    width: 40,
  },
  image: {
    flex: 1,
  },
  buttonText: {
    color: theme.colors.textBlack,
    //fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: theme.fontSizes.body,
    textAlign: "center",
  },
});
