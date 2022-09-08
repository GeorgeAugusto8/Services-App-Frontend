import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Metrics } from '../constants/Metrics';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { ModalHire } from '../components'

LocaleConfig.locales['pt-BR'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abri', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
    dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    dayNamesShort: ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.', 'Dom.'],
};
LocaleConfig.defaultLocale = 'pt-BR';

export default ({ navigation }) => {
    const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    var dateIndex = 0;

    const [selectedDay, setSelectedDay] = useState(moment(new Date()).format('DD/MM/yyyy'));
    const [modal,setModal] = useState(false);

    const renderHour = (item) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={{ textAlign: 'center' }}>
                    {item}
                </Text>
                <View style={{ height: 5, width: 5, backgroundColor: 'rgb(0,200,0)', borderRadius: 2.5 }}></View>
            </View>
        )
    }

    return (
        <View >
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#ffffff" size={20} />
                </Pressable>
                <Text style={styles.name} >Agenda de João da Silva</Text>

            </View>

            <View style={{ marginTop: 30 }}>

                <Calendar
                    style={{ padding: 15, borderWidth: 0.5, borderColor: '#363431', margin: 1 }}
                    dayComponent={({ date, state }) => {
                        dateIndex = dateIndex === 7 ? 1 : dateIndex + 1
                        return (
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { setSelectedDay(moment(date.dateString).format('DD/MM/yyyy')) }}>
                                <Text style={{ textAlign: 'center' }}>
                                    {date.day}
                                </Text>
                                <View style={{ height: 5, width: 5, backgroundColor: dateIndex % 6 === 0 || dateIndex % 7 === 0 ? 'rgb(200,0,0)' : 'rgb(0,200,0)', borderRadius: 2.5 }}></View>
                            </Pressable>
                        );
                    }}
                />

                <View style={{ padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{`Horários do dia ${selectedDay} : `}</Text>
                </View>

                <FlatList
                    style={{ backgroundColor: '#ffffff', padding: 5, borderWidth: 0.5, borderColor: '#363431', margin: 1 }}
                    data={hours}
                    horizontal={true}
                    renderItem={({ item }) => renderHour(item)}
                />

            </View>

            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                <Pressable style={styles.button} onPress={() => setModal(true)} >
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Contratar</Text>
                </Pressable>
            </View>

            <ModalHire visible={modal} onClickCancel={setModal}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    button: {
        width: Metrics.screenWidth * 0.28,
        borderRadius: Metrics.baseHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        backgroundColor: '#ffffff'
    },
});

