import React, { useState } from "react";

import Counter from "react-native-counters";

function ItemCounter({ item, increment, decrement, updateTotal, total }) {
  const [counter, setCounter] = useState(item.quantity);

  const handleCounter = (number, type) => {
    if (type === "-") {
      decrement(item);
      setCounter(counter - 1);
      updateTotal(total - item.price); // do this for now ig
    } else {
      increment(item);
      setCounter(counter + 1);
      updateTotal(total + item.price);
    }
  };
  return (
    <>
      <Counter
        buttonStyle={{
          borderColor: "#333",
          borderWidth: 2,
          borderRadius: 25,
        }}
        buttonTextStyle={{
          color: "#333",
        }}
        countTextStyle={{
          color: "#333",
        }}
        start={counter}
        onChange={handleCounter}
      />
    </>
  );
}

export default ItemCounter;
