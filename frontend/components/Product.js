/*
We will render a Product component for each object in the ProductsList.json manifest. 
Holds a lot of state for the different options for each item i.e grind/size.

TODO refactor state
Too many hooks.

*/

import React, { useState, useEffect } from "react";
import { SolidButton } from "./Button";
import { ListItem, Text } from "react-native-elements";
import QuickView from "./QuickView";

const Product = (props) => {
  let image;
  if (props.image) 
    image = props.image;
  else 
    image = require("../../assets/images/2ozbag.jpg"); // have to use the require here bc it only works w/ static values

  //const image = props.image ?? ("../../assets/images/2ozbag.jpg"); // why isnt default case working
  const name = props.name;
  const initialPrice = props.price;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log(); // takes two clicks after state mutation in quick view .. bug
    setModalVisible(!isModalVisible);
  };

  // <ModalTrigger trigger={toggleModal => <SolidButton onPress={toggleModal} text={name}}> <QuickView>
  return (
    <ListItem className="product" key={name}>
      <QuickView
        addProduct={props.addProduct}
        setVisible={toggleModal}
        isVisible={isModalVisible}
        name={name}
        initPrice={initialPrice}
        image={image}
      ></QuickView>

      <SolidButton onPress={toggleModal} text={name} />
      {/* TODO: add hover and style the button, signal its a quickview */}

      {/*   <SolidButton
        onPress={addToCart}
        text={isAdded ? "ADDED" : "ADD TO CART"}
      /> */}
    </ListItem>
  );
};

export default Product;
