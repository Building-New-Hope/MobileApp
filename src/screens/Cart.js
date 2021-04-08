import React, { useEffect, useState } from "react";
import { Text, Card } from "react-native-elements";
import { SolidButton } from "../components/Button";
import Counter from "../components/Counter";
import Divider from "react-native-btr/src/Components/Separator";

import findGrindDesc from "../utils/findGrindDesc"
/* 
This is a seperate screen for the cart to be displayed. If not React Navigation parameters were passed we will
render the Empty Cart
 */

const EmptyCart = ({ navigation }) => {
  return (
    <>
      <Text h1>Nothing Here Yet</Text>
      <SolidButton
        text="Continue Shopping"
        onPress={() => navigation.navigate("Catalog")}
      />
    </>
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

    console.log(route.params);
    if (route.params) {  // passed params w/ react navigation
      fetchData();
    }
  }, []);

  let cartItems = items.map((i) => {
    return (
      <>
        <Text style={{ fontWeight: "bold" }} key={i.id}>
          {i.name} ${i.price} {i.size} oz  {findGrindDesc(i.grind)}
        </Text>
        <Counter  // each item will have its seperate Counter for adding more / subtracting
          item={i}
          increment={route.params.increment}
          decrement={route.params.decrement}
          updateTotal={updateTotal}
          total={total}
        />
      </>
    );
  });

  if (!items || items.length == 0) {
    return <EmptyCart navigation={navigation} />;
  } else {
    return (
      <Card>
        <Card.Title>CART</Card.Title>
        {cartItems}
        <Divider />
        <Text style={{ fontWeight: "bold" }}>TOTAL ${total}</Text>
      </Card>
    );
  }
};

export default Cart;
