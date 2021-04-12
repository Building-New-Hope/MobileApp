/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Text, Divider } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import HidibleView from './HidibleView';
import Modal from 'react-native-modal'; // could also use Overlay from R-N-E
import DropDownPicker from 'react-native-dropdown-picker';

import { SolidButton } from './Button';
import ProductImage from './ProductImage';

import ProductModel from '../constants/ProductModel';
import coffee from '../constants/coffee';
const grinds = coffee.grinds; // for our drop down menus
const sizes = coffee.sizes;

import theme from '../constants/theme';

/* 
 A quick view for each product when clicked on
 We use the react native modal package, examples here
 https://github.com/react-native-modal/react-native-modal/tree/master/example/src
 */

function QuickView(props) {
  const name = props.name;
  // (Not necessary) TODO: add product description / details
  // Note on TODO: Ms. Soledad said she didn't want the SPECS like she has in her website.

  const [isAdded, setAdded] = useState(false);
  const [size, setSize] = useState(12);
  const [grind, setGrind] = useState('WHOLE');
  const [price, setPrice] = useState(12.75);
  const [imageUrl, setImageUrl] = useState(props.image);

  const [isDDVisible, setDDVisible] = useState({
    // DD - DropDown
    sizeVisible: false,
    grindVisible: false,
  });

  const changeVisibility = (state) => {
    setDDVisible({
      sizeVisible: false, // to hide our drop downs
      grindVisible: false,
      ...state,
    });
  };


  useEffect(() => {
    let temp = price;
    if (size == 12 && props.name !== 'Decaf') {
      setImageUrl(require('../../assets/images/12ozbag.jpg'));
      temp = 12.75;
    } else if (size == 16) {
      setImageUrl(require('../../assets/images/16ozbag.jpg'));
      temp = 15.75;
    } else if (size == 80) {
      setImageUrl(require('../../assets/images/5lbbag.jpg'));
      temp = 70.0;
    }
    setPrice(temp);
  }, [size, setSize]);

  useEffect(() => {
    setAdded(false); // when size or grind changes, signal addability
  }, [size, grind]);

  const addToCart = async (event) => {
    event.preventDefault();
    setAdded(true);
    props.addProduct(new ProductModel(name, size, grind, price));
    setTimeout(() => setAdded(false), 5000); // arbitrary number for now
  };

  return (
    //https://www.npmjs.com/package/react-native-dropdown-picker#available-item-properties
    <Modal
      style={styles.parentContainer}
      isVisible={props.isVisible}
      backdropColor="#e8dbc3"
      backdropOpacity={0.95}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      animationIn="zoomInUp"
      animationOut="fadeOutDownBig"
      //onBackdropPress={props.setVisible} I suggest to remove this because users should be able to press anywhere on the QuickView page without it collapsing.
      onSwipeComplete={props.setVisible}
      //Let's keep the swiping function, though. It's really cool.
      swipeDirection="right"
    >
      <View style={styles.mainContainer}>
        <View style={styles.backButton}>
          <SolidButton onPress={props.setVisible} text="< BACK" />
        </View>

        <View style={styles.imageAndDetails}>
          <Text style={styles.productName}>{name}</Text>
          <ProductImage url={imageUrl} />
          <View style={styles.details}>
            <Text style={styles.productDetails}>{size} oz</Text>
            <Text style={styles.productDetails2}>${price}</Text>
          </View>
        </View>

        <View style={styles.dropAndButton}>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              items={grinds}
              defaultValue={grind}
              containerStyle={{ height: 40 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                color: '#39739d',
              }}
              selectedLabelStyle={{
                fontWeight: 'bold',
                color: '#39739d',
              }}
              onChangeItem={(item) => setGrind(item.value)} //
              isVisible={isDDVisible.grindVisible}
              onOpen={() => changeVisibility({ grindVisible: true })}
              onClose={() => changeVisibility({ grindVisible: true })}
            />
            <Divider style={styles.divider} />
            <DropDownPicker
              style={{ paddingVertical: 10 }}
              containerStyle={{ width: 150, height: 70 }}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                color: '#39739d',
              }}
              selectedLabelStyle={{
                fontWeight: 'bold',
                color: '#39739d',
              }}
              items={sizes}
              defaultValue={size}
              containerStyle={{ height: 40 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              onChangeItem={(item) => {
                setSize(item.value);
              }}
              isVisible={isDDVisible.sizeVisible}
              onOpen={() => changeVisibility({ sizeVisible: true })}
              onClose={() => changeVisibility({ sizeVisible: false })}
            />
          </View>
          <View style={styles.cartButtonParent}>
            <View style={styles.cartButton}>
              <SolidButton
                text={isAdded ? 'ADDED' : 'ADD TO CART'}
                onPress={addToCart}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default QuickView;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    height: 500,
    justifyContent: 'space-around',
    margin: '8%',
    marginBottom: '10%',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: 170,
    marginTop: '1%',
  },
  dropAndButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 170,
    marginTop: '-7%',
  },
  dropDownContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
  },
  dropDown: {
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#fafafa',
  },
  divider: {
    width: 150,
    height: 1,
    alignSelf: 'center',
  },
  imageAndDetails: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '-8%',
    marginTop: '-13%',
  },
  modalDrop: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  productName: {
    fontFamily: theme.fonts.secondary,
    color: theme.colors.textBlack,
    fontWeight: 'normal',
    fontSize: 24,
    marginBottom: '2.5%',
  },
  productDetails: {
    fontFamily: theme.fonts.secondary,
    color: theme.colors.textBlack,
    fontWeight: 'normal',
    fontSize: 18,
    marginBottom: '8%',
  },
  productDetails2: {
    fontFamily: theme.fonts.secondary,
    color: theme.colors.textBlack,
    fontWeight: 'normal',
    fontSize: 20,
    marginBottom: '8%',
  },
  cartButton: {
    width: '38%',
  },
  cartButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    width: '20%',
    marginTop: '-5%',
  },
  modalContent: {},
  modalText: {},
});
