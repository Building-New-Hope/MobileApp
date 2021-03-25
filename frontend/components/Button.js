import React from "react";
import { Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

import { Icon } from "react-native-elements";

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
        buttonStyle={styles.button}
        title={<Text style={styles.buttonText}> {props.text} </Text>}
        onPress={props.onPress}
        //containerStyle={props.style}
      />
    </View>
  );
};

const CartButton = ({ onPress }) => {
  return (
    <Button
      icon={<Icon name="cart" type="evilicon" size={30} />}
      onPress={onPress}
      color="red"
      title="Cart"
    />
  );
};

const CheckOutButton = (props) => {
  // TODO
  return (
    <Button
      icon={<Icon name="ei-credit-card" type="evilicon" size={30} />}
      onPress={props.onPress}
      color="green"
      title="Check Out"
    />
  );
};

export { SolidButton, CartButton, CheckOutButton };

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: "rgb(255,128,0)",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
