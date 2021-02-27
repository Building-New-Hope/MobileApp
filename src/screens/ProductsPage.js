import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

function ProductsPage(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/coffee1.jpg")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Image
        source={require("../assets/images/coffee1.jpg")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <Icon name="shopping-cart" style={styles.icon}></Icon>
      <Text style={styles.mediumRoast}>Medium Roast</Text>
      <Text style={styles.darkRoast}>Dark Roast</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 146,
    alignSelf: "center"
  },
  image1: {
    width: 200,
    height: 200,
    marginTop: 96,
    alignSelf: "center"
  },
  icon: {
    color: "rgba(194,201,1,1)",
    fontSize: 41,
    marginTop: -586,
    marginLeft: 305
  },
  mediumRoast: {
    fontFamily: "abhaya-libre-regular",
    color: "rgba(16,16,16,1)",
    height: 46,
    width: 194,
    fontSize: 32,
    marginTop: 259,
    marginLeft: 91
  },
  darkRoast: {
    fontFamily: "abhaya-libre-regular",
    color: "rgba(16,16,16,1)",
    height: 46,
    width: 194,
    fontSize: 32,
    marginTop: 246,
    marginLeft: 111
  }
});

export default ProductsPage;
