import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { SolidButton } from "../components/Button";
import Anchor from "../components/Anchor";
import { Icon } from "react-native-elements";

//import Icon from "react-native-vector-icons/Feather";

/* 
Home Page for our app, has an about us link that goes to the website and a button signaling to order now
Building New Hope coffee is socially responsible and environmentally
        friendly. Our coffee is certified organic, shade-grown and certified
        bird- friendly by Smithsonian Migratory Bird Center, fair and direct
        trade coffee. Our dark roasted beans are single-source and come from El
        Porvenir in Nicaragua, a worker-owned farming cooperative we’ve
        partnered with since 2002.
*/

function Home(props) {
  const navigation = props.navigation;

  const options = {
    headerTitle: "Building New Hope",
 /*   headerRight: () => (
      <SolidButton
        icon={<Icon name="cart" type="evilicon" size={30} />}
        onPress={
          props.route.params
            ? () =>
                navigation.navigate("Cart", {
                  products: props.route.params.products,
                })
            : () =>
                console.log("no params yet, state should be lifted to home?")
        }
        color="red"
        title="NA"
      />
    ), */
  };
  React.useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconStackRow}>
        <View style={styles.iconStack}>
          <Icon name="menu" style={styles.icon}></Icon>
         
          <ImageBackground
            source={require("../../assets/images/longbeans.jpg")}
            resizeMode="contain"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <Image
              source={require("../../assets/transparentlogo.png")}
              resizeMode="contain"
              style={styles.image4}
            ></Image>
          </ImageBackground>
          <Text style={styles.loremIpsum}>More than Just Coffee</Text>
        {/*   <TouchableOpacity
            onPress={() => navigation.navigate("About Us")}
            style={{alignSelf:"center"}}
          > 
            <Text style={styles.orderNow1}>About Us</Text>
          </TouchableOpacity> */}
          {/*  <Anchor style={styles.aboutUs} href="https://www.buildingnewhope.org/about">About Us</Anchor>  */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Catalog")}
            style={styles.button}
          >
            <Text style={styles.orderNow1}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/12ozbag.jpg")}
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
    flexDirection: "row",
  },
  icon: {
    top: 212,
    left: 398,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  image: {
    top: 0,
    left: 0,
    width: 583,
    height: 1096,
    position: "absolute",
  },
  //chaned opacity to 1
  image_imageStyle: {
    opacity: 1,
  },
  //changed this back to pixels 
  image4: {
    width: 213,
    height: 200,
    marginTop: 357,
    marginLeft: 170,
  },
  loremIpsum: {
    top: 575,
    left: 145,
    position: "absolute",
    fontFamily: "calibri-regular",
    color: "rgba(255,255,255,1)",
    height: 46,
    width: 274,
    fontSize: 20,
    textAlign: "center",
  },
  //made button and ordernow percentages to accomodate for different phones 
  button: {
    top: '68%',
    width: '37%',
    height: '5.5%',
    position: "absolute",
    backgroundColor: "rgb(255,128,0)",
    left: '30%',
    borderRadius: 12,
    paddingVertical: '4%',
    paddingHorizontal: '1%',
  },
  orderNow1: {
    fontFamily: "calibri-light",
    color: "rgba(253,253,253,1)",
    height: '70%',
    width: '50%',
    fontSize: 20,
    marginTop: '3%',
    marginLeft: '26%',
  },
  iconStack: {
    width: 583,
    height: 1096,
  },
  image3: {
    width: 200,
    height: 200,
    marginLeft: 12,
    marginTop: 297,
  },
  iconStackRow: {
    height: 1096,
    flexDirection: "row",
    flex: 1,
    marginRight: -343,
    marginLeft: -77,
    marginTop: -151,
  },
});

export default Home;