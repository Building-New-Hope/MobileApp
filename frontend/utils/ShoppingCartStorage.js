import AsyncStorage from "@react-native-async-storage/async-storage";

/*
Abstraction for the the asynclocalStorage API
*/

class ShoppingCartStorage {
  constructor(namespace = "shoppingCart") {
    this.namespace = namespace; // prefix we throw in front of the keys
  }

  // # denotes private method
  static #removeDuplicates = (products) => {
    let map = new Map();
    //  We will consolidate duplicates under one Object in the map
    products.forEach((item) => {
      if (map.has(item.id)) {
        map.get(item.id).quantity++;
      } else {
        map.set(item.id, Object.assign(item, {})); // .assign merges the two objects together
      }
    });
    return [...map.values()];
  };

  // static for now
  static async getProducts() {
    const rawProducts = await AsyncStorage.getItem(
      `${this.namespace}:products`
    );

    let convertedProducts = rawProducts ? JSON.parse(rawProducts) : [];
    const cleanedArr = this.#removeDuplicates(convertedProducts);

    return rawProducts ? cleanedArr : [];
  }
  // should i pass ID or the actual product obj. is there a performance diff?
  static async addProduct(product) {
    const currentProducts = await this.getProducts();
    /* if ( // handle duplicates later
      currentProducts.some( 
        (p) => p.id === product.id && p.size === product.size
      )
    ) {
      //console.log("e")
      await incrementProduct(product); // cant find it? hellooooooooooo
      return;
    } */
    const newProducts = [...currentProducts, product];

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts)
    );
  }

  static async incrementProduct(product) {
    const currentProducts = await this.getProducts();
    let index = currentProducts.findIndex((i) => i.id === product.id);
    let newProducts = [...currentProducts];
    newProducts[index].quantity++;
    // console.log("after increment: ", newProducts);

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts)
    );
  }

  static async decrementProduct(product) {
    const currentProducts = await this.getProducts();
    let index = currentProducts.findIndex((i) => i.id === product.id);
    let newProducts = [...currentProducts];
    newProducts[index].quantity--;
    //console.log("after decrement: ", newProducts);

    await AsyncStorage.setItem(
      `${this.namespace}:products`,
      JSON.stringify(newProducts)
    );
  }
  static async removeProduct(product) {}

  static async clearProducts() {
    await AsyncStorage.removeItem(`${this.namespace}:products`);
  }
}

export default ShoppingCartStorage;
