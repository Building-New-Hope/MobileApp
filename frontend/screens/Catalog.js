import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Button } from "react-native";
import { Card } from "react-native-elements";

import { CartButton } from "../components/Button";

import Products from "../components/Products";
import ShoppingCartStorage from "../utils/ShoppingCartStorage";
import useProducts from "../utils/useProducts";
/* 
This module renders all the items available and lets the user navigate to the Cart.

We will hold a lot of the app's state here. Holds the items to be passed to the cart as well as the 
calculated total. We could put this into the Home page just so all the stuff is accesible in there, but there might be trade offs in terms of performance.
Every single add to Cart causes a rerender in the Catalog.

 TODO: TODO 
https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
*/

const Catalog = (props) => {
  const navigation = props.navigation;
  // const { products } = useProducts([]);
  const [totalProducts, setProducts] = useState([]);
  const [cartTotal, setTotal] = useState(0);

  useEffect(() => {
    const fetchLocal = async () => {
      const currentProducts = await ShoppingCartStorage.getProducts();
      setProducts(currentProducts); // local storage products that have peistedrs
    };
    fetchLocal();
  }, []);

  useEffect(() => {
    // recalculate the total every time we mutate the products in cart
    setTotal(
      totalProducts.reduce((total, e) => {
        return total + e.price * e.quantity;
      }, 0)
    );

    // console.log("current sum excluding the last one added", cartTotal);
  }, [totalProducts]);

  const handleGoToCart = () => {
    //https://reactnavigation.org/docs/navigation-prop/
    navigation.navigate("Cart", {
      products: totalProducts, //
      total: cartTotal,
      increment: incrementProduct, // to change the totalProducts state when on a different screen
      decrement: decrementProduct,
    });
  };

  const handleAddProduct = async (selected) => {
    if (
      totalProducts.some(
        (p) => p.id === selected.id && p.size === selected.size // redundancy here
      )
    ) {
      incrementProduct(selected);
    } else {
      // the size, type, or grind is new
      setProducts(totalProducts.concat(selected));
    }
    await ShoppingCartStorage.addProduct(selected);
  };

  const incrementProduct = (selected) => {
    let index = totalProducts.findIndex((i) => i.id === selected.id);
    let newProducts = [...totalProducts]; // copies the array
    newProducts[index].quantity++;
    setProducts(newProducts);
    ShoppingCartStorage.incrementProduct(selected);
  };

  const decrementProduct = (selected) => {
    let index = totalProducts.findIndex((i) => i.id === selected.id);
    let newProducts = [...totalProducts];
    newProducts[index].quantity--;

    if (newProducts[index].quantity === 0) {
      const id = newProducts[index].id;
      newProducts = newProducts.filter((p) => p.id !== id);
    } // the removed product will only be gone on the next cart open
    setProducts(newProducts);
    ShoppingCartStorage.decrementProduct(selected);
  };

  const resetProducts = async () => {
    await ShoppingCartStorage.clearProducts();
    setProducts([]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, cartTotal]); // update it per cartTotal

  const options = {
    headerTitle: "Catalog",
    headerRight: () => <CartButton onPress={handleGoToCart} />,
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>Buy Coffee</Card.Title>
          <Card.Divider />

          <View style={styles.productsContainer}>
            <Products
              key={1} // actually still whining here "need unique key"
              navigation={navigation}
              addProduct={handleAddProduct}
              products={totalProducts}
            />
          </View>

          <View style={styles.resetCartButtonParent}>
            <View style={styles.resetCartButton}>
              <Button
                title={"Reset cart"}
                onPress={resetProducts}
                color="firebrick"
              />
            </View>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

//************************ STYLES START **************************

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "column",
    marginLeft: "-4%",
    marginRight: "-4%",
  },
  resetCartButtonParent: {
    width: "100%",
    //justifyContent: "center",
    //alignItems: "center",
    marginTop: "10%",
  },
  resetCartButton: {
    width: "35%",
    margin: "3%",
    marginBottom: "5%",
  },
});
//************************** STYLES END **************************

export default Catalog;
