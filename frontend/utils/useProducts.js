import { useState, useEffect, useLayoutEffect } from "react";
import ShoppingCartStorage from "./ShoppingCartStorage";

/*
Custom hook for getting the local products stored in cart. Probably gonna end up not using this. Too many abstractions 
*/
const useProducts = (initProd) => {
  const [products, setProducts] = useState(initProd);
  const fetchProducts = async () => {
    const initialProducts = await ShoppingCartStorage.getProducts();
    setProducts(initialProducts);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log('from local storage get', products)

  return { products, refetch: fetchProducts };
};
export default useProducts;
