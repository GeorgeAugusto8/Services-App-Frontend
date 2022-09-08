import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Metrics } from '../constants/Metrics';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default ({ visible, setModal, addImage }) => {
    const openCamera = () => {
        setModal(false)
        launchCamera({}, (response) => {
            if (!response.didCancel) addImage({ uri: response.uri, type: response.type, name: response.fileName })
        });
    }

    const openGalery = () => {
        setModal(false)
        launchImageLibrary({}, (response) => {
            if (!response.didCancel) addImage({ uri: response.uri, type: response.type, name: response.fileName })
        })
    }


    return (
        <View>
            <Modal backdropOpacity={0.2} isVisible={visible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.titleModal}>Selecione uma opção :</Text>
                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />

                    <View style={{ height: 90, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => openCamera()}>
                            <FontAwesome color='#000000' name='camera' size={25} />
                            <Text style={{ fontWeight: 'bold' }}>Camera</Text>
                        </Pressable>

                        <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => openGalery()}>
                            <FontAwesome color='#000000' name='file-image-o' size={25} />
                            <Text style={{ fontWeight: 'bold' }}>Galeria</Text>
                        </Pressable>


                    </View>

                    <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />
                    <Pressable style={{ padding: 10 }} onPress={() => setModal(false)}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> Cancelar</Text>
                    </Pressable>

                </View>

            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        width: Metrics.screenWidth * 0.95,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignSelf: 'center'
    },
    titleModal: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10
    }
});

