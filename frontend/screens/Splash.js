import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";

export default function Splash() {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/colorlogo.png")}
          //imageStyle={{ resizeMode: "stretch" }}
          style={{ width: "100%", height: "100%", alignSelf: "center"} }
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                height: 50,
                color: "#1562b0",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Hey!
            </Text>
            <ActivityIndicator size="large" color="#1562b0" />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
