import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { SolidButton, CartButton } from "../components/Button";
import Anchor from "../components/Anchor";
import { Icon } from "react-native-elements";

function Home(props) {
	
  const navigation = props.navigation;
  const options = {  // the upper right corner cart button has some bugs with total updating
    headerTitle: "Building New Hope",
    headerRight: () => <CartButton onPress={"Cart"} />,
  };
  
  
  /*const options = {
    headerTitle: "Building New Hope",
    headerRight: () => (
      <SolidButton
        icon={<Icon name="cart" type="evilicon" size={30} />}
        onPress={
          props.route.params
            ? () =>
                navigation.navigate("Cart", {
                  products: props.route.params.products,
                })
            : () =>
                console.log("no params yet, state should be lifted to home?")
        }
        color="red"
        title="NA"
      />
    ),
  };*/  
  
  
  React.useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation]);

  return (
	<View style={styles.containerParent}>  
		<ImageBackground
            source={require("../../assets/images/longbeans.jpg")}
            style={styles.image}
            imageStyle={styles.image_imageStyle}			
		>
			
			<View style={styles.containerChild}>
				<Image
				source={require("../../assets/images/transparentlogo.png")}
				resizeMode="contain"
				style={styles.logo}
				></Image>			
				<Text style={styles.text1}>MORE THAN JUST COFFEE</Text>
		
        
				{/*   <TouchableOpacity
					onPress={() => navigation.navigate("About Us")}
					style={{alignSelf:"center"}}
					> 
					<Text style={styles.orderNow1}>About Us</Text>
					</TouchableOpacity> */}
				{/*  <Anchor style={styles.aboutUs} href="https://www.buildingnewhope.org/about">About Us</Anchor>  */}
		  
        
				<TouchableOpacity
					onPress={() => navigation.navigate("Catalog")}
					style={styles.button}
				>
					<Text style={styles.orderNow1}>ORDER NOW</Text>
				</TouchableOpacity>			
			</View>
		</ImageBackground>
	</View>
  );
}

const styles = StyleSheet.create({

  containerParent: {
    flex: 1,
	justifyContent: "center",
    alignItems: "center",	
  },
  
  containerChild: {
    flex: 1,
	justifyContent: "center",
    alignItems: "center",	
  },

  image: {
    width: 388.6,
    height: 730.6,
  },
  
  image_imageStyle: {
    opacity: 0.87,
  },
  
  logo: {
    width: 200,
    height: 200,
	marginTop: '-15%',
  },
  
  text1: {
    color: "rgba(255,255,255,1)",
    fontSize: 22,
  },

  button: {
	marginTop: '24%',
    backgroundColor: "rgba(237,167,47,1)",
	height: 45,
	width: 150,
	justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: 'saddlebrown',	
  },
  
  orderNow1: {
    color: "rgba(253,253,253,1)",
    fontSize: 19,
  },


});

export default Home;
