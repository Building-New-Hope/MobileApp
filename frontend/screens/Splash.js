import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

export default function Splash() {
  return (
    <>
      <View style={styles.containerParent}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/colorlogo.png")}
            style={styles.logo}
            //imageStyle={{ resizeMode: "stretch" }}
          ></ImageBackground>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  containerParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },

  logo: {
    width: 170,
    height: 170,
  },
});
