import React from 'react';
import { StyleSheet, View } from 'react-native'
import Product from "./Product";

import list from '../constants/ProductList.json' // TODO: Wix API collection GET request for dynamic products.

const Products = (props) => {
  let productsData;
  
  // put state in cart component

  productsData = list.map((product, i) => {
    
    return (
      <>
      <Product
        key={i}
        name={product.name}
        description={product.description}
        price={product.price}
        size={product.size}
        grind={product.grind}
        navigation={props.navigation}
        addProduct={props.addProduct}
        products={props.products}  // products is the items so far added to cart
      />
      </>
    );
  });

  return (
   <View style = {styles.container}>
      {productsData}
    </View>
    
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
      // TODO: styling the products
      alignItems: 'center',
      justifyContent: 'center'
  }
}); 