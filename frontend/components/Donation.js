import React, { useState } from 'react';
import { View, Modal, Pressable, Image, Text } from 'react-native';
import theme from '../constants/theme';

const Donation = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Would you like to donate</Text>
            <Text style={styles.modalText}>
              Hurricane IOTA ETA relief effort?
            </Text>
            <Image
              style={styles.modalImg}
              source={require('../../assets/images/logo.jpg')}
              resizeMode="contain"
            ></Image>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.modalButtons]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>DONATE</Text>
              </Pressable>
              <View style={styles.space}></View>
              <Pressable
                style={[styles.modalButtons]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CHECKOUT</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>CHECKOUT</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  modalButtons: {
    height: 30,
    width: '50%',
    borderRadius: 8,
    paddingVertical: 3,
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    color: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 400,
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    fontWeight: 'bold',
  },
  modalImg: {
    flex: 1,
    height: '30%',
    aspectRatio: 0.7,
    resizeMode: 'contain',
  },
});

export default Donation;
