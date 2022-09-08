import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Metrics } from '../constants/Metrics';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import AutoHeightImage from 'react-native-auto-height-image';

export default ({ visible, setModal, url }) => {


  return (
      <Modal backdropOpacity={0.4} isVisible={visible}>

        <TouchableWithoutFeedback onPress={() => setModal(false)}>
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <Feather onPress={() => setModal(false)} style={{ alignSelf: 'flex-end', marginBottom: 10 }} name="x" color="#ffffff" size={28} />
          <AutoHeightImage width={Metrics.screenWidth} source={{ uri: url }} />
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: Metrics.screenWidth * 0.95,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

