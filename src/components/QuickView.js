import React from "react";
import { Text, Image } from "react-native-elements";
import { View, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

import { SolidButton } from "./Button";
/* 

 A quick view for each product when clicked on
 We use the react native modal package, examples here
 https://github.com/react-native-modal/react-native-modal/tree/master/example/src
 */

/* 

 https://www.npmjs.com/package/react-native-dropdown-picker */
const sizes = [
  { label: "12 oz", value: 12 },
  { label: "16 oz", value: 16 },
  { label: "5 lbs", value: 80 },
];

const grinds = [
  { label: "Whole bean", value: "WHOLE" },
  { label: "Drip", value: "Drip" },
  { label: "Coarse for French Press", value: "FRENCHPRESS" },
  { label: "Coarse for Cold Brew", value: "COLDBREW" },
  { label: "Espresso Grind", value: "ESPRESSO" },
];

function QuickView(props) {
  const name = props.name;

  // Add functionality in the quickview

  const setSize = props.setSize;

  return (
    // the issue is with the Modal element.. where it goes away and is slow to repop up

    <View style={{ flex: 1 }}>
      <Modal
        isVisible={props.isVisible}
        animationIn="zoomInUp"
        animationOut="slideOutRight"
        backdropColor="#B4B3DB"
        backdropOpacity={0.9}
        onBackdropPress={props.setVisible}
      >
        <Image
          source={require("../../assets/images/coffee.jpg")}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text h3>
          {name} {props.size}
        </Text>
        <DropDownPicker
          items={sizes}
          defaultValue={props.size}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          onChangeItem={(item) => setSize(item.value)}
        />
        <DropDownPicker
          items={grinds}
          defaultValue={props.initGrind}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          onChangeItem={(item) => props.setGrind(item.value)} // error when using label
        />

        <SolidButton text={"Add to Cart"} onPress={props.addToCart} />
        <SolidButton onPress={props.setVisible} text={"exit"} />
      </Modal>
    </View>
  );
}

export default QuickView;
