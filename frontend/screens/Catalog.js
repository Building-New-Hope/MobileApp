import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { Card } from 'react-native-elements';

import { CartButton } from '../components/Button';

import Products from '../components/Products';
import ShoppingCartStorage from '../utils/ShoppingCartStorage';
/* 
This module renders all the items available and lets the user navigate to the Cart.

We will hold a lot of the app's state here. Holds the items to be passed to the cart as well as the 
calculated total. We could put this into a custom hook w/ the increment / decrement functions. 

TODO: might be fixed? inconsistent.
https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
*/

const Catalog = ({ navigation }) => {
  // const { products } = useProducts([]);
  const [totalProducts, setProducts] = useState([]);
  const [cartTotal, setTotal] = useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, cartTotal]); // update it per cartTotal

  const options = {
    headerTitle: 'Catalog',
    headerRight: () => <CartButton onPress={handleGoToCart} />,
  };

  useEffect(() => {
    // get the latest cached products on every opening of Catalog. Kind of a weird data flow but it works
    const fetchLocal = async () => {
      const currentProducts = await ShoppingCartStorage.getProducts();
      setProducts(currentProducts); // local storage products that have peistedrs
    };
    fetchLocal();
  }, []);

  useEffect(() => {
    // recalculates the total every time we mutate the products in cart
    setTotal(
      totalProducts.reduce((total, e) => {
        return total + e.price * e.quantity;
      }, 0)
    );
    // console.log("current sum excluding the last one added", cartTotal);
  }, [totalProducts]);

  // refact to not pass full data - think i need all of it though. could alternatively make the products its own state w/ attached functions
  const handleGoToCart = () => {
    //https://reactnavigation.org/docs/navigation-prop/
    navigation.navigate('Cart', {
      products: totalProducts,
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
      incrementProduct(selected.id);
    } else {
      // the size, type, or grind is new
      setProducts(totalProducts.concat(selected));
    }
    await ShoppingCartStorage.addProduct(selected);
  };

  const incrementProduct = (id) => {
    let index = totalProducts.findIndex((i) => i.id === id);
    let newProducts = [...totalProducts]; // copies the array
    newProducts[index].quantity++;
    setProducts(newProducts);
    ShoppingCartStorage.incrementProduct(id);
  };

  const decrementProduct = (id) => {
    let index = totalProducts.findIndex((i) => i.id === id);
    let newProducts = [...totalProducts];
    newProducts[index].quantity--;

    if (newProducts[index].quantity === 0) {
      const id = newProducts[index].id;
      newProducts = newProducts.filter((p) => p.id !== id);
    } // the removed product will only be gone on the next cart open
    setProducts(newProducts);
    ShoppingCartStorage.decrementProduct(id);
  };

  const resetProducts = async () => {
    await ShoppingCartStorage.clearProducts();
    setProducts([]);
  };
  console.log('how many times rendering'); // rendering too many times, twice for each add to product, 3 times on entry.
  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>Our Coffee</Card.Title>
          {/*   <Image src={require('../../assets/images/colorlogo.png')} /> */}
          <Card.Divider />

          <View style={styles.productsContainer}>
            <Products
              navigation={navigation}
              addProduct={handleAddProduct}
              products={totalProducts}
            />
          </View>

          <View style={styles.resetCartButtonParent}>
            <View style={styles.resetCartButton}>
              <Button
                title={'Reset cart'}
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
    flexDirection: 'column',
    marginLeft: '-4%',
    marginRight: '-4%',
  },
  resetCartButtonParent: {
    width: '100%',
    //justifyContent: "center",
    //alignItems: "center",
    marginTop: '10%',
  },
  resetCartButton: {
    width: '35%',
    margin: '3%',
    marginBottom: '5%',
  },
});
//************************** STYLES END **************************

export default Catalog;
