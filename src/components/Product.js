/*
This code is pretty ugly and verbose...
Will refactor after everything is fully working.
Too many hooks.

Add bean option
*/

import React, { useState } from "react";
import Button from "./Button";
import { ListItem, Text, Tooltip } from "react-native-elements";
import { BottomSheet } from "react-native-btr";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = (props) => {
  const id = props.id;
  const image = props.image;
  const name = props.name;
  const initialPrice = props.price;
  const grind = props.grind; // should this be state so its interactive .. and where or be further up the chain so cart can see
  const description = props.description;
  const navigation = props.navigation;

  const [isAdded, setAdded] = useState(false);
  const [size, setSize] = useState(12);
  const [sizeVisible, setVisible] = useState(false);
  const [sizeSelected, setSelected] = useState(false);
  
  const [price, setPrice] = useState(initialPrice)

  const sizes = [
    {
      oz: 12,
      onPress: () => {
        setSize(12);
        setVisible(false);
        setSelected(true);
      },
    },
    {
      oz: 16,
      onPress: () => {
        setSize(16);
        setVisible(false);
        setSelected(true);
      },
    },
    {
      oz: 80, // this is not working in the button sheet
      setPress: () => {
        setSize(80);
        setVisible(false);
        setSelected(true);
      },
    },
    {
      oz: "Cancel",
      style: { backgroundColor: "red" },
      //titleStyle: { color: 'white' },
      onPress: () => setVisible(false),
    },
  ];

  const changeSize = (event) => {
    event.preventDefault();
    setVisible(true);
    calcPrice();
  };

  const calcPrice = () => {
    let temp ;
    if (size == 12) temp = 12
    else if (size == 16) temp = 16
    else if (size == 80) temp = 80

    setPrice(temp)
  };

  const addToCart = async (event) => {
    event.preventDefault();
    setAdded(true);
    const jsonProduct = JSON.stringify(props);
    await AsyncStorage.setItem("product", jsonProduct);
    navigation.navigate("Items in Cart", {
      name: name,
      price: price,
      size: size,
    });
    setTimeout(() => setAdded(false), 5000);
  };

  return (
    <ListItem className="product">
      <Text>{name}</Text>
      <Text>${price}</Text>

      {/* <Tooltip popover={<Text>{description}</Text>}> // hovering descriptions can be put here*/}
      {/* <Text>Learn More</Text> */}
      {/* </Tooltip> */}

      <Button onPress={addToCart} text={isAdded ? "ADDED" : "ADD TO CART"} />
      <Button onPress={changeSize} text={sizeSelected ? size+ " oz" : "Choose size"} />
      <BottomSheet visible={sizeVisible}>
        {sizes.map((l, i) => (
          <ListItem key={i} onPress={l.onPress} containerStyle={l.style}>
            <ListItem.Content>
              <ListItem.Title>{l.oz}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </ListItem>
  );
};
export default Product;
