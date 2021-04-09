import React, { useEffect, useState } from "react";

import { Text, Card } from "react-native-elements";
import { View, StyleSheet, ScrollView } from "react-native";
import { CheckOutButton } from "../components/Button";
import Counter from "../components/Counter";
import Divider from "react-native-btr/src/Components/Separator";
import { SolidButton } from "../components/Button";

import findGrindDesc from "../utils/findGrindDesc";
import ShoppingCartStorage from "../utils/ShoppingCartStorage";
import { getToken } from "../services/payments";

import theme from "../constants/theme";

/* 
This is a seperate screen for the cart to be displayed. If not React Navigation parameters were passed we will
render the Empty Cart
 */

const EmptyCart = ({ navigation }) => {
  return (
    <View style={styles.nothingHere}>
      <Text style={styles.title}>Nothing Here Yet</Text>

      <SolidButton
        text="Continue Shopping"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Catalog")}
      />
    </View>
  );
};

const Cart = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [total, updateTotal] = useState(route.params.total);

  useEffect(() => {
    const fetchData = async () => {
      let { products } = route.params;
      setItems(products);
    };
    console.log("Route parameters: ", route.params);
    if (route.params)
      // passed params w/ react navigation. Currently the only was to navigate to cart is through Catalog so params will always be passed
      // In the future there should be support for w/o params using localstorage or other context options
      fetchData();
  }, []);

  let cartItems = items
    .filter((i) => i.quantity != 0)
    .map((i) => {
      // filter so that it disappears -
      // bugs with the Counter - resets the remaining products counter to 0 only if it was added after the one removedmap((i) => {
      return (
        <View key={i.id} style={styles.productContainerParent}>
          <View style={styles.productContainer}>
            <View style={styles.productDetails}>
              <Text style={styles.productDetailsText} >
                {i.name}
              </Text>
              <Text style={styles.productDetailsText2}>
                {findGrindDesc(i.grind)}
              </Text>
              <Text style={styles.productDetailsText2}>
                {i.size} oz ${i.price}
              </Text>
            </View>

            <View style={styles.productQuantity}>
              <Counter // each item will have its seperate Counter for adding more / subtracting
                item={i}
                increment={route.params.increment}
                decrement={route.params.decrement}
                updateTotal={updateTotal}
                total={total}
              />
            </View>
          </View>
          <Divider />
        </View>
      );
    });

  if (!items || items.length == 0) {
    return <EmptyCart navigation={navigation} />;
  } else {
    return (
      <ScrollView>
        <Card>
          <View style={styles.cardColor}>
            <View style={styles.card}>
              <Card.Title>MY CART</Card.Title>
              {cartItems}
              <Divider />
              <Text style={{ fontWeight: "bold", marginTop: "5%" }}>
                TOTAL ${total}
              </Text>
            </View>
            <CheckOutButton onPress={getToken} />
            {/* TODO: checkout flow event handler */}
          </View>
        </Card>
      </ScrollView>
    );
  }
};

export default Cart;

//********Styling********

const styles = StyleSheet.create({
  nothingHere: {
    flex: 0.4,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontFamily: theme.fonts.secondary,
    fontSize: 27,
  },
  button: {
    height: 40,
    width: 150,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.button,
  },
  card: {
    margin: "4.7%",
  },
  cardColor: {
    backgroundColor: "#e8dbc3",
    margin: "-4.7%",
  },
  productContainerParent: {
    flexDirection: "column",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "4%",
    marginTop: "3%",
  },
  productDetails: {
    height: 75,
    justifyContent: "space-between",
  },
  productQuantity: {
    height: 75,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  productDetailsText: {
    fontSize: 19.5,
    fontFamily: theme.fonts.secondary,
  },
  productDetailsText2: {
    marginBottom: "3%",
  },
});
