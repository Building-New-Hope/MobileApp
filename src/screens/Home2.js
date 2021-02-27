import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function Home2(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconStackRow}>
        <View style={styles.iconStack}>
          <Icon name="menu" style={styles.icon}></Icon>
          <ImageBackground
            source={require("../assets/images/patryk-gauza-vs0tzSHVcac-unsplash.jpg")}
            resizeMode="contain"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <View style={styles.rect}>
              <Text style={styles.orderNow}>Order Now</Text>
            </View>
          </ImageBackground>
          <Image
            source={require("../assets/images/logo.jpg")}
            resizeMode="contain"
            style={styles.image2}
          ></Image>
          <Text style={styles.loremIpsum}>More than Just Coffee</Text>
        </View>
        <Image
          source={require("../assets/images/coffee.jpg")}
          resizeMode="contain"
          style={styles.image3}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    top: 212,
    left: 398,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40
  },
  image: {
    top: 0,
    left: 0,
    width: 583,
    height: 1096,
    position: "absolute"
  },
  image_imageStyle: {
    opacity: 0.82
  },
  rect: {
    width: 185,
    height: 63,
    backgroundColor: "rgba(237,167,47,1)",
    marginTop: 722,
    marginLeft: 172
  },
  orderNow: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 42,
    width: 125,
    fontSize: 24,
    marginTop: 18,
    marginLeft: 34
  },
  image2: {
    top: 368,
    width: 200,
    height: 200,
    position: "absolute",
    left: 165
  },
  loremIpsum: {
    top: 608,
    left: 110,
    position: "absolute",
    fontFamily: "alegreya-sc-regular",
    color: "rgba(255,255,255,1)",
    height: 46,
    width: 342,
    fontSize: 30
  },
  iconStack: {
    width: 583,
    height: 1096
  },
  image3: {
    width: 200,
    height: 200,
    marginLeft: 12,
    marginTop: 297
  },
  iconStackRow: {
    height: 1096,
    flexDirection: "row",
    flex: 1,
    marginRight: -343,
    marginLeft: -77,
    marginTop: -151
  }
});

export default Home2;
