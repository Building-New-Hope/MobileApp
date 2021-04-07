import React, { useState } from "react";

import Counter from "react-native-counters";

function ItemCounter({  // TODO: change this to just props
  id,
  price,
  quantity,
  increment,
  decrement,
  updateTotal,
  total,
}) {

  const [counter, setCounter] = useState(quantity);
  // TODO: Bug with a previous item's quantity going to zero and then glitching the next items start count. Resolves itself on rerender

  const handleCounter = (number, type) => {
    if (type === "-") {
      decrement(id);
      setCounter(counter - 1);
      updateTotal(total - price); // do this for now ig
    } else {
      increment(id);
      setCounter(counter + 1);
      updateTotal(total + price);
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
