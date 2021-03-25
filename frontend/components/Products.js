import React from 'react';
import { StyleSheet, View } from 'react-native'
import Product from "./Product";

import list from '../constants/ProductList.js' // TODO: Wix API collection GET request for dynamic products.

const Products = (props) => {
  let productsData;
  
  // put state in cart component

  productsData = list.map((product, i) => {
    console.log(product)
    return (
      <>
      <Product
        key={product.name}
        name={product.name}
        image={product.image}
        price={product.price}
        navigation={props.navigation}
        addProduct={props.addProduct}
        products={props.products}  // products is the items so far added to cart, passed down from Catalog
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