import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Button } from "react-native";
import { Card, Text } from "react-native-elements";

import { SolidButton, CartButton } from "../components/Button";


import Products from "../components/Products";

/* 
This module renders all the items available and lets the user navigate to the Cart.

We will hold a lot of the app's state here. Holds the items to be passed to the cart as well as the 
calculated total. We could put this into the Home page just so all the stuff is accesible in there, but there might be trade offs in terms of performance.
 Every single add to Cart causes a rerender in the Catalog.
*/


/* 
TODO 
https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
*/

//const about = "New Hope Coffee is grown by the farmers of the El Porvenir Cooperative located in León, Nicaragua.  The certified organically grown, bird-friendly, arabica beans are harvested, patio-sun dried, and hand-selected by the farmers.  The green beans are roasted to order by 19 Coffee Company, a specialty micro-roaster in Pittsburgh, PA.  The coffee has a smooth body, bright acidity, with chocolate, tropical fruit, and earthy notes."

const Catalog = (props) => {
  const navigation = props.navigation;
  const [totalProducts, updateProducts] = useState([]);
  const [cartTotal, setTotal] = useState(0);

  useEffect(() => {  // recalculate the total every time we mutate the products in cart
    setTotal(
      totalProducts.reduce((total, e) => {
        console.log(`total: ${total}, current price: ${e.price}`);
        return total + e.price * e.quantity;
      }, 0)
    );

   // console.log("current sum excluding the last one added", cartTotal);
  }, [totalProducts]);

  const handleGoToCart = () => {
    //https://reactnavigation.org/docs/navigation-prop/
    console.log(cartTotal)
    navigation.navigate("Cart", {
      products: totalProducts, //
      total: cartTotal,
      increment: incrementProduct, // to change the totalProducts state when on a different screen
      decrement: decrementProduct,
    });
  };

  const handleAddProduct = (selected) => {
    if (
      totalProducts.some(
        (p) => p.id === selected.id && p.size === selected.size
      )
    ) {
      incrementProduct(selected);
    } else {
      // the size, type, or grind is new
      updateProducts(totalProducts.concat(selected));
    }
  };

  const incrementProduct = (selected) => {
    let index = totalProducts.findIndex((i) => i.id === selected.id);
    let tempProducts = [...totalProducts]; // copies the array
    tempProducts[index].quantity++;
    updateProducts(tempProducts);
    navigation.setParams({
      total: cartTotal,
    });
  };

  const decrementProduct = (selected) => {
    let index = totalProducts.findIndex((i) => i.id === selected.id);
    let tempProducts = [...totalProducts];
    tempProducts[index].quantity--;

    if (tempProducts[index].quantity === 0) {
      const id = tempProducts[index].id;
      tempProducts = tempProducts.filter((p) => p.id !== id);
    } // the removed product will only be gone on the next cart open

    updateProducts(tempProducts);
    navigation.setParams({    // this is not functioning properly.
      total: cartTotal,
      products: totalProducts,
    });
  };

  React.useLayoutEffect(() => { // 
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
						title={'Reset cart'}
						onPress={() => updateProducts([])}
						color="firebrick"
					/>
				</View>
			</View>
		
		
{/* **** I don't think we need an Exit and Cart buttons here. Users can use the navigation bar for that. ****
	    <Button
			title={'Exit'}
			onPress={() =>
				navigation.navigate("Home", {
				products: totalProducts,
			})}
			color="rgba(237,167,47,1)"
		/>   
		<CartButton onPress={handleGoToCart} />
*/}	    
      </Card>
	  </ScrollView>

    </>
  );
};

//************************ STYLES START **************************

const styles = StyleSheet.create({
	productsContainer: {
		flexDirection: "column",
		marginLeft: '-4%',
		marginRight: '-4%',
	},
    resetCartButtonParent: {
		width: "100%",
		//justifyContent: "center",
		//alignItems: "center",
		marginTop: '10%',
	},
    resetCartButton: {
		width: "35%",
		margin: '3%',
		marginBottom: '5%',
	},  
});
//************************** STYLES END **************************

export default Catalog;
