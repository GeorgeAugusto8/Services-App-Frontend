import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import { Metrics } from '../constants/Metrics';

export default ({visible, onClickCancel}) => {
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
        onClickCancel(false)
    }

    return (
        <View >
            <Modal backdropOpacity={0.3} isVisible={visible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.titleModal}>Faça uma oferta a João :</Text>
                        <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />

                        <ScrollView style={{ padding: 10, maxHeight: Metrics.screenHeight * 0.6 }}>

                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Descrição do serviço :</Text>

                            <TextInput multiline={true} numberOfLines={2} style={[styles.dateInput, { textAlignVertical: 'top', height: 60, padding: 5 }]} />


                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Data :</Text>

                            <Pressable onPress={() => setShowCalendar(true)}>
                                <Text style={styles.dateInput}>{date === null ? 'DD/MM/AAAA' : moment(date).format('DD/MM/yyyy')}</Text>
                            </Pressable>
                            {showCalendar &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    mode="date"
                                    locale="pt-BR"
                                    is24Hour={true}
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, date) => { setDate(date), setShowCalendar(false) }}
                                />
                            }

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horario de inicio :</Text>

                                    <Pressable onPress={() => setShowHour1(true)}>
                                        <Text style={styles.dateInput}>{hourStart === null ? '--:--' : moment(hourStart).format('LT')}</Text>
                                    </Pressable>
                                    {showHour1 &&
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            mode="time"
                                            locale="pt-BR"
                                            is24Hour={true}
                                            display="default"
                                            value={new Date()}
                                            onChange={(event, hour) => { setHourStart(hour), setShowHour1(false) }}
                                        />
                                    }
                                </View>

                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horario de fim :</Text>

                                    <Pressable onPress={() => setShowHour2(true)}>
                                        <Text style={styles.dateInput}>{hourEnd === null ? '--:--' : moment(hourEnd).format('LT')}</Text>
                                    </Pressable>
                                    {showHour2 &&
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            mode="time"
                                            locale="pt-BR"
                                            is24Hour={true}
                                            display="default"
                                            value={new Date()}
                                            onChange={(event, hour) => { setHourEnd(hour), setShowHour2(false) }}
                                        />
                                    }
                                </View>

                            </View>

                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Preço a pagar :</Text>

                            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                                <MaterialIcons name="attach-money" color="#14213d" size={20} />
                                <TextInput style={styles.input2} />
                            </View>

                        </ScrollView>


                        <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 5 }}>
                            <Pressable style={{ padding: 10 }} onPress={() => sucessToast()}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> Confirmar</Text>
                            </Pressable>

                            <View style={{ height: 40, backgroundColor: '#d3d3d3', width: 1 }} />

                            <Pressable style={{ padding: 10 }} onPress={() => onClickCancel(false)}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> Cancelar</Text>
                            </Pressable>
                        </View>

                    </View>

                </Modal>
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
    name: {
        margin: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    resultImage: {
        margin: 20,
        height: Metrics.baseHeight * 1.5,
        width: Metrics.baseHeight * 1.5,
        borderRadius: Metrics.baseHeight * 0.75,
        borderWidth: 0.5,
        borderColor: '#363431',
    },
    tags: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    button: {
        width: Metrics.screenWidth * 0.28,
        borderRadius: Metrics.baseHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    modalContainer: {
        width: Metrics.screenWidth * 0.95,
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
        height: Metrics.screenHeight * 0.080,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15
    },
    input2: {
        marginTop: 5,
        width: '90%',
        padding: 10,
        height: Metrics.screenHeight * 0.050,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
});

