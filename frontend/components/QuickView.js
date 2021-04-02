import React, { useEffect, useState } from "react";
import { Text, Divider } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal"; // could also use Overlay from R-N-E
import DropDownPicker from "react-native-dropdown-picker";
import Counter from './Counter';

import { SolidButton } from "./Button"
import ProductImage from "./ProductImage";

import ProductModel from "../constants/ProductModel";
import coffee from "../constants/coffee";
const grinds = coffee.grinds; // for our drop down menus
const sizes = coffee.sizes;

/* 

 A quick view for each product when clicked on
 We use the react native modal package, examples here
 https://github.com/react-native-modal/react-native-modal/tree/master/example/src
 */

function QuickView(props) {
  const name = props.name;
  // TODO: add product description / details

  const [isAdded, setAdded] = useState(false);
  const [size, setSize] = useState(12);
  const [grind, setGrind] = useState("WHOLE");
  const [price, setPrice] = useState(12.75);
  const [imageUrl, setImageUrl] = useState(props.image);

  const [isDDVisible, setDDVisible] = useState({
    sizeVisible: false,
    grindVisible: false,
  });

  const changeVisibility = (state) => {
    setDDVisible({
      sizeVisible: false, // to hide our drop downs
      grindVisible: false,
      ...state,
    });
  };

  useEffect(() => {
    let temp;
    if (size == 12) {
      if (props.name !== "Decaf")
        // this is pretty ugly rn but works if we want to keep the unique pic of Decaf
        setImageUrl(require("../../assets/images/12ozbag.jpg"));
      temp = 12.75;
    } else if (size == 16) {
      setImageUrl(require("../../assets/images/16ozbag.jpg"));
      temp = 15.75;
    } else if (size == 80) {
      setImageUrl(require("../../assets/images/5lbbag.jpg"));
      temp = 70.0;
    }
    setPrice(temp);
  }, [size, setSize]);

  useEffect(() => {
    setAdded(false); // when size or grind changes, signal addability
  }, [size, grind]);

  const addToCart = async (event) => {
    event.preventDefault();
    setAdded(true);
    props.addProduct(new ProductModel(name, size, grind, price));
    setTimeout(() => setAdded(false), 5000); // arbitrary number for now
  };

  return (
    //https://www.npmjs.com/package/react-native-dropdown-picker#available-item-properties
    <View style={{ flex: 1 }}>
      <View>
        <Modal
          style={{ margin: 30 }}
          isVisible={props.isVisible}
          backdropColor="#e8dbc3"
          backdropOpacity={0.95}
          animationIn="zoomInUp"
          animationOut="fadeOutDownBig"
          onBackdropPress={props.setVisible}
          onSwipeComplete={props.setVisible}
          swipeDirection="right" 
        >
          <View style={styles.backButton}>
            <SolidButton onPress={props.setVisible} text={"< BACK"} />
          </View>

          <Text style={styles.productName}>{name}</Text>
          <ProductImage image={imageUrl} />
          <Text style={styles.productDetails}>
            ${price} {size} oz
          </Text>

          <DropDownPicker
            style={{ paddingVertical: 10 }}
            containerStyle={{ width: 150, height: 70 }}
            labelStyle={{
              fontSize: 14,
              textAlign: "left",
              color: "red",
            }}
            selectedLabelStyle={{
              fontWeight: "bold",
              color: "#39739d",
            }}
            items={sizes}
            defaultValue={size}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            onChangeItem={(item) => {
              //   console.log("changing,,, hmmmmmmm");
              setSize(item.value);
            }}
            isVisible={isDDVisible.sizeVisible}
            onOpen={() => changeVisibility({ sizeVisible: true })}
            onClose={() => changeVisibility({ sizeVisible: false })}
          />
          <Divider />

          <DropDownPicker
            items={grinds}
            defaultValue={grind}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            selectedLabelStyle={{
              fontWeight: "bold",
              color: "#39739d",
            }}
            onChangeItem={(item) => setGrind(item.value)} //
            isVisible={isDDVisible.grindVisible}
            onOpen={() => changeVisibility({ grindVisible: true })}
            onClose={() => changeVisibility({ grindVisible: true })}
          />
          <View style={styles.cartButtonParent}>
            <View style={styles.cartButton}>
              <SolidButton
                text={isAdded ? "ADDED" : "Add Item"}
                onPress={addToCart}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default QuickView;

const styles = StyleSheet.create({
  modalContent: {},
  modalText: {},
  modalDrop: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  productName: {
    color: "black",
    fontWeight: "normal",
    fontSize: 28,
    marginBottom: "1%",
  },
  productDetails: {
    color: "black",
    fontWeight: "normal",
    fontSize: 20,
    marginBottom: "8%",
  },
  cartButton: {
    width: "50%",
  },
  cartButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "7%",
  },
  backButton: {
    width: "20%",
  },
});
