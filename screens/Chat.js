import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Metrics } from '../constants/Metrics';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ModalPhoto } from '../components';


export default ({ navigation }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState(false);

    const addMessage = () => {
        if (text !== '') setMessages([...messages, { type: 'text', text: text }]);
        setText('')
    }

    const renderMessage = (item) => {
        return (
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                {item.type === 'text' ?
                    <Text style={{ marginTop: 10, padding: 8, backgroundColor: '#ffffff', borderRadius: 10, marginHorizontal: Metrics.baseWidth * 0.4 }}>{item.text}</Text>
                    :
                    <Pressable onPress={() => setModalPhoto(true) }>
                        <Image style={{ width: 200, height: 200, margin: 10 }} source={{ uri: item.uri }} />
                    </Pressable>
                }
            </View>
        )
    }

    const openCamera = () => {
        setModal(false)
        launchCamera({}, (response) => { if (!response.didCancel) addImage(response.uri) });
    }

    const addImage = (uri) => {
        setMessages([...messages, { type: 'img', uri: uri }])
    }

    const openGalery = () => {
        setModal(false)
        launchImageLibrary({}, (response) => { if (!response.didCancel) addImage(response.uri) })
    }


    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#ffffff" size={20} />
                </Pressable>
                <Text style={styles.name} >Chat com João da Silva</Text>

            </View>

            <FlatList
                style={{ marginTop: 70 }}
                contentContainerStyle={{ justifyContent: 'flex-end' }}
                data={messages}
                renderItem={({ item }) => renderMessage(item)}
            />

            <View style={{ flexDirection: 'row', width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ marginLeft: 5, width: '82%', flexDirection: 'row', borderWidth: 2, borderColor: '#d3d3d3', borderRadius: 10 }}>
                    <TextInput placeholder='Digite uma mensagem' style={styles.input} onChangeText={t => setText(t)} value={text} />
                    <View style={{
                        width: '10%', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center',
                        height: Metrics.screenHeight * 0.080, borderRadius: 10
                    }}>
                        <Ionicons name="attach" color='rgba(0,0,0,0.5)' size={30} onPress={() => setModal(true)} />
                    </View>
                </View>

                <Pressable style={styles.buttonSend} onPress={() => addMessage()}>
                    <Ionicons name="send" color="#ffffff" size={20} />
                </Pressable>
            </View>

            <View>
                <Modal backdropOpacity={0.2} isVisible={modal}>
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

            <ModalPhoto visible={modalPhoto} setModal={setModalPhoto} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBack: {
        height: Metrics.baseHeight * 0.4,
        width: Metrics.baseHeight * 0.4,
        borderRadius: Metrics.baseHeight * 0.2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    buttonSend: {
        height: Metrics.screenHeight * 0.070,
        width: Metrics.screenHeight * 0.070,
        borderRadius: Metrics.screenHeight * 0.035,
        backgroundColor: '#14213d',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    name: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        height: Metrics.screenHeight * 0.080,
        backgroundColor: '#ffffff',
        padding: 10

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

