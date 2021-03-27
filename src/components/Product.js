/*
We will render a Product component for each object in the ProductsList.json manifest. 
Holds a lot of state for the different options for each item i.e grind/size.

TODO refactor state
Too many hooks.

*/
import {
  StyleSheet,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import React, { useState, useEffect } from "react";
import { SolidButton } from "./Button";
import { ListItem, Text, Tooltip } from "react-native-elements";
import QuickView from "./QuickView";

import ProductModel from "../utils/ProductModel";

const Product = (props) => {

  const image = require("../../assets/images/coffee.jpg");
  const name = props.name;
  const initialPrice = props.price;

  const [isAdded, setAdded] = useState(false); // if the product has been added to cart
  const [size, setSize] = useState(12);
  const [grind, setGrind] = useState("WHOLE");
  const [isModalVisible, setModalVisible] = useState(false);

  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    calcPrice();
  }, [size, setSize]);

  const changeSize = (event) => {
    event.preventDefault();
    setVisible(true);
  };

  const calcPrice = () => {
    let temp;
    if (size == 12) temp = 12.75;
    else if (size == 16) temp = 15.75;
    else if (size == 80) temp = 70.0;
    setPrice(temp);
  };

  const addToCart = async (event) => {
    event.preventDefault();
    setAdded(true);
    props.addProduct(new ProductModel(name, size, grind, price));
    setTimeout(() => setAdded(false), 1000000); // arbitrary number for now
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    
	<ListItem className="product" key={name + size + grind}>
	<View>	
		<QuickView
			setVisible={toggleModal}
			isVisible={isModalVisible}
			name={name}
			size={size}
			setSize={setSize}
			initGrind={grind}
			setGrind={setGrind}
			addToCart={addToCart}
		></QuickView>
	  
		<TouchableOpacity style={styles.productTile} onPress={toggleModal}>		
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

		<Text style={styles.priceStyle}>
			${price}
		</Text>

		<Button
			onPress={addToCart}
			title={isAdded ? 'ADDED' : 'ADD TO CART'}
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
	fontSize: 18.5,
  },
  
  productTile: {
    width: 130,
    height: 130,
    backgroundColor: "rgba(230, 230, 230,1)",
    elevation: 18,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "flex-end",
	marginLeft: '-1.5%',
	marginBottom: '1%',
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
	textTransform: 'uppercase',
  },

});
//************************** STYLES END **************************


export default Product;
