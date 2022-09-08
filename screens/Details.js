import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, Image, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { FlatList } from 'react-native-gesture-handler';
import { Post } from '../components';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import { ModalHire } from '../components'


const { width, height } = Dimensions.get('window');

const DefaultMetrics = {
    screenHeight: height,
    screenWidth: width,
    baseHeight: height * 0.1,
    baseWidth: width * 0.1
}

const tagsTest = [
    "pedreiro", "obras", "encanador", "faz tudo", "reformas", "rebaixamento de teto"
]

const postsTest = [
    { id: 1 }, { id: 2 }, { id: 3 }
]

const renderTag = (item) => {
    return <View style={styles.tags}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>#{item}</Text>
    </View>
}

export default ({ navigation }) => {
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(null);
    const [hourStart, setHourStart] = useState(null);
    const [hourEnd, setHourEnd] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showHour1, setShowHour1] = useState(false);
    const [showHour2, setShowHour2] = useState(false);

    const sucessToast = () => {
        Toast.show('Oferta enviada a João, acompanhe o andamento em sua agenda',
            {
                duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
                backgroundColor: '#79D233', textColor: '#000000'
            }
        )
        setModal(false)
    }

    return (
        <ScrollView >
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#ffffff" size={20} />
                </Pressable>
                <Text style={styles.name} >João da Silva</Text>

            </View>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />

                <View style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Foundation name="star" size={23} />
                            <Text style={{ marginRight: 3, fontSize: 18, }}> 4.4</Text>
                        </View>
                        <Text>clas..</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 3, fontSize: 18, }}>1.3 km</Text>
                        </View>
                        <Text>dist..</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 3, fontSize: 18, }}> (64)</Text>
                        </View>
                        <Text>aval..</Text>
                    </View>

                </View>

            </View>

            <View style={{ padding: 10 }}>
                <Text>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </Text>


                <FlatList
                    contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}
                    data={tagsTest}
                    renderItem={({ item }) => renderTag(item)}
                />

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Chat')}>
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Mensagem</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Calendar')}>
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Agenda</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => setModal(true)} >
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Contratar</Text>
                </Pressable>
            </View>


            <View style={{ width: '100%', height: 0.5, backgroundColor: '#363431', margin: 10 }}></View>

            <FlatList
                data={postsTest}
                renderItem={({ item }) => <Post item={item} />}
                keyExtractor={item => item.id}
            />

            <ModalHire visible={modal} onClickCancel={setModal}/>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBack: {
        height: DefaultMetrics.baseHeight * 0.4,
        width: DefaultMetrics.baseHeight * 0.4,
        borderRadius: DefaultMetrics.baseHeight * 0.2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    name: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    resultImage: {
        margin: 20,
        height: DefaultMetrics.baseHeight * 1.5,
        width: DefaultMetrics.baseHeight * 1.5,
        borderRadius: DefaultMetrics.baseHeight * 0.75,
        borderWidth: 0.5,
        borderColor: '#363431',
    },
    tags: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    button: {
        width: DefaultMetrics.screenWidth * 0.28,
        borderRadius: DefaultMetrics.baseHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        backgroundColor: '#ffffff'
    },
    modalContainer: {
        width: DefaultMetrics.screenWidth * 0.95,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignSelf: 'center',
    },
    titleModal: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '95%',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        height: DefaultMetrics.screenHeight * 0.080,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15
    },
    input2: {
        marginTop: 5,
        width: '90%',
        padding: 10,
        height: DefaultMetrics.screenHeight * 0.050,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

