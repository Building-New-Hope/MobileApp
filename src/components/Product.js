/*
We will render a Product component for each object in the ProductsList.json manifest. 
Holds a lot of state for the different options for each item i.e grind/size.

TODO refactor state
Too many hooks.

*/

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
      <QuickView
        setVisible={toggleModal}
        isVisible={isModalVisible}
        name={name}
        size={size}
        setSize={setSize}
        initGrind={grind}
        setGrind={setGrind}
        addToCart={addToCart}
        /* could have image here */
      ></QuickView>
      <SolidButton onPress={toggleModal} text={name} />
      {/* this is really lazy rn, will change different styles for texts later */}
      <Text h3 style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>
        ${price}
      </Text>

      <SolidButton
        onPress={addToCart}
        text={isAdded ? "ADDED" : "ADD TO CART"}
      />
    </ListItem>
  );
};
export default Product;
