/*
We will render a Product component for each object in the ProductsList.json manifest. 
*/
import {
  StyleSheet,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";

import React, { useState, useEffect } from "react";
import { SolidButton } from "./Button";
import { ListItem, Text, Tooltip } from "react-native-elements";
import QuickView from "./QuickView";

//import ProductModel from "../utils/ProductModel";

const Product = (props) => {
  let image;
  if (props.image) image = props.image;
  else image = require("../../assets/images/coffee.jpg"); // have to use the require here bc it only works w/ static values

  //const image = props.image ?? ("../../assets/images/coffee.jpg"); // why isnt default case working
  const name = props.name;
  const initialPrice = props.price;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ListItem className="product" key={name}>
      <View>
        <QuickView
          addProduct={props.addProduct}
          setVisible={toggleModal}
          isVisible={isModalVisible}
          name={name}
          initPrice={initialPrice}
          image={image}
        ></QuickView>

        <TouchableOpacity
          style={styles.productTile}
          onPress={
            name == "Subscribe"
              ? () =>
                  Linking.openURL(
                    "https://www.buildingnewhope.org/product-page/subscribe"
                  )
              : toggleModal
          }
        >
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image1}
          >
            <View style={styles.rectFiller}></View>
            <View style={styles.rect}>
              <Text style={styles.productName}>{name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {name == "Subscribe" ? (
          <Text style={styles.priceStyle}>(Opens Browser)</Text>
        ) : (
          <Text style={styles.priceStyle}>From ${initialPrice}</Text>
        )}

        <Button
          onPress={
            name == "Subscribe"
              ? () =>
                  Linking.openURL(
                    "https://www.buildingnewhope.org/product-page/subscribe"
                  )
              : toggleModal
          }
          title={name == "Subscribe" ? "Go" : "See more"}
          color="rgba(237,167,47,1)"
        />
      </View>
    </ListItem>
  );
};

//************************ STYLES START **************************

const styles = StyleSheet.create({
  priceStyle: {
    color: "dimgrey",
    fontWeight: "normal",
    fontSize: 14.9,
  },

  productTile: {
    width: 130,
    height: 130,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "flex-end",
    marginLeft: "-1.5%",
    marginBottom: "1%",
  },

  image1: {
    flex: 1,
    marginBottom: -1,
    marginTop: 1,
  },

  rectFiller: {
    flex: 1,
  },

  rect: {
    height: 27,
    backgroundColor: "rgba(21,19,19,0.5)",
    marginBottom: 1,
  },

  productName: {
    color: "rgba(247,252,253,1)",
    fontSize: 15,
    marginTop: 7,
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
//************************** STYLES END **************************

export default Product;
