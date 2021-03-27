import { Text } from "react-native-elements";
import * as Linking from "expo-linking";

import React from "react";

/* 
Component for when we want to link to something outside our app
Pass in a href 
*/

export default function Anchor(props) {
  const handlePress = () => {
    Linking.openURL(props.href);
    props.onPress && props.onPress();
  };
  console.log(props)
  const styles = props.style;
  return (
    <Text style = {styles} h3 {...props} onPress={handlePress}>
      {props.children}
    </Text>
  );
}




