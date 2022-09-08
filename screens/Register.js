import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, ScrollView } from 'react-native';
import { Metrics } from '../constants/Metrics';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-root-toast';
import axios from "axios";

export default ({ navigation }) => {
    const [userType, setUserType] = useState("Usuário");
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [description, setDescription] = useState(null);
    const [tagText, setTagText] = useState(null);
    const [tags, setTags] = useState([]);
    const [workDaysText, setWorkDaysText] = useState('Segunda');
    const [workDays, setWorkDays] = useState([]);
    const [workStart, setWorkStart] = useState(null);
    const [showHour1, setShowHour1] = useState(false);
    const [workEnd, setWorkEnd] = useState(null);
    const [showHour2, setShowHour2] = useState(false);
    const [job, setJob] = useState(null);

    const addTag = () => {
        if (tagText !== null && tagText !== '') tags.push(tagText)
        setTags([...tags])
        setTagText(null)
    }

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag))
    }

    const addWorkDay = () => {
        if (workDaysText !== null && workDaysText !== '') workDays.push(workDaysText)
        setWorkDays([...workDays])
        setWorkDaysText(null)
    }

    const removeDay = (workDay) => {
        setWorkDays(workDays.filter(w => w !== workDay))
    }

    const registerUser = async () => {
        if ( checkInfo() ) {
            var data = await returnData()
            const response = await registerRequest(data)

            if (response && response.status === 201) {
                Toast.show('Cadastro realizado com sucesso',
                    {
                        duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
                        backgroundColor: '#79D233', textColor: '#ffffff'
                    })

                navigation.goBack()

            } else {
                Toast.show('Falha ao processar informações, verifique sua conexão com a internet.',
                    {
                        duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
                        backgroundColor: 'rgb(200,0,0)', textColor: '#ffffff'
                    })
            }

        }
    }

    const registerRequest = async (data) => {
        return axios.post(`http://10.0.2.2:3000/auth/register`, data)
            .then((response) => { return response })
            .catch(e => { return e })
    }


    const returnData = async () => {
        var data
        if (userType === "Usuário") {
            data = {
                registerType: "Client",
                name: name,
                email: email,
                password: password,
            }
        } else {
            var avaiableDays = workDays.map(d => EnumDays[d])

            data = {
                registerType: "ServiceProvider",
                name: name,
                email: email,
                password: password,
                description: description,
                tags: tags,
                avaiableDays: avaiableDays,
                avaiableTime: [workStart, workEnd],
                occupations: [job]
            }
        }

        return data
    }

    const checkInfo = () => {
        if (
            userType === "Service Provider"
            &&
            (!name || !email || !password || !description || tags.length === 0 || !workDays.length === 0 || !workStart || !workEnd || !job)
            ||
            (!name || !email || !password)
        ) {
            Toast.show('Você deve preencher todos os campos',
                {
                    duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
                    backgroundColor: 'rgb(200,0,0)', textColor: '#ffffff'
                })

            return false

        } else return true

    }

    const EnumDays = {
        'Domingo' : 1,
        'Segunda' : 2,
        'Terça' : 3,
        'Quarta' : 4,
        'Quinta' : 5,
        'Sexta' : 6,
        'Sábado' : 7,
    }
        
    

    return (
        <ScrollView style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#ffffff" size={20} />
                </Pressable>
                <Text style={styles.name} >Novo Cadastro</Text>

            </View>

            <View style={{ width: '99%', height: 0.5, backgroundColor: '#363431', marginBottom: 10, marginTop: 5, alignSelf: 'center' }} />

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tipo da conta :</Text>

            <View style={{ borderRadius: 10, backgroundColor: "#ffffff", width: Metrics.screenWidth * 0.9, marginVertical: 15 }}>
                <Picker
                    mode={'dropdown'}
                    selectedValue={userType}
                    onValueChange={(itemValue) =>
                        setUserType(itemValue)
                    }>
                    <Picker.Item style={{ fontSize: 14 }} label="Usuário" value="Usuário" />
                    <Picker.Item style={{ fontSize: 14 }} label="Prestador de serviços" value="Prestador de serviços" />
                </Picker>
            </View>

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nome :</Text>
            <TextInput style={styles.dateInput} onChangeText={t => setName(t)} value={name} />

            {userType === "Prestador de serviços" &&
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Descrição :</Text>
                    <TextInput style={styles.dateInput} onChangeText={t => setDescription(t)} value={description} />

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tags :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={styles.dateInputTag} onChangeText={t => setTagText(t)} value={tagText} />

                        <Pressable style={styles.button} onPress={() => addTag()}>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>Adicionar</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                        data={tags}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) =>
                            <View >
                                <Text style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 10, margin: Metrics.baseWidth * 0.2 }}>{`#${item}`}</Text>
                                <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="x" color="#14213d" size={15} onPress={() => removeTag(item)} />
                            </View>
                        }
                    />

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dias da semana disponíveis para trabalho :</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <View style={{ backgroundColor: "#ffffff", width: Metrics.screenWidth * 0.7 }}>
                            <Picker
                                mode={'dropdown'}
                                selectedValue={workDaysText}
                                onValueChange={(itemValue) =>
                                    setWorkDaysText(itemValue)
                                }>
                                <Picker.Item style={{ fontSize: 13 }} label="Segunda" value="Segunda" />
                                <Picker.Item style={{ fontSize: 13 }} label="Terça" value="Terça" />
                                <Picker.Item style={{ fontSize: 13 }} label="Quarta" value="Quarta" />
                                <Picker.Item style={{ fontSize: 13 }} label="Quinta" value="Quinta" />
                                <Picker.Item style={{ fontSize: 13 }} label="Sexta" value="Sexta" />
                                <Picker.Item style={{ fontSize: 13 }} label="Sábado" value="Sábado" />
                                <Picker.Item style={{ fontSize: 13 }} label="Domingo" value="Domingo" />
                            </Picker>
                        </View>

                        <Pressable style={styles.button} onPress={() => addWorkDay()}>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>Adicionar</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                        data={workDays}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) =>
                            <View >
                                <Text style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 10, margin: Metrics.baseWidth * 0.2 }}>{item}</Text>
                                <Feather style={{ position: 'absolute', right: 0, top: 0 }} name="x" color="#14213d" size={15} onPress={() => removeDay(item)} />
                            </View>
                        }
                    />

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horário disponível para trabalho :</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horario de inicio :</Text>

                            <Pressable onPress={() => setShowHour1(true)}>
                                <Text style={styles.dateInputHour}>{workStart === null ? '--:--' : moment(workStart).format('LT')}</Text>
                            </Pressable>
                            {showHour1 &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    mode="time"
                                    locale="pt-BR"
                                    is24Hour={true}
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, hour) => { setWorkStart(hour), setShowHour1(false) }}
                                />
                            }
                        </View>

                        <View style={{ marginLeft: Metrics.screenWidth * 0.2 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Horario de fim :</Text>

                            <Pressable onPress={() => setShowHour2(true)}>
                                <Text style={styles.dateInputHour}>{workEnd === null ? '--:--' : moment(workEnd).format('LT')}</Text>
                            </Pressable>
                            {showHour2 &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    mode="time"
                                    locale="pt-BR"
                                    is24Hour={true}
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, hour) => { setWorkEnd(hour), setShowHour2(false) }}
                                />
                            }
                        </View>

                    </View>

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Profissão :</Text>
                    <TextInput style={styles.dateInput} onChangeText={t => setJob(t)} value={job} />

                </View>
            }

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Email :</Text>
            <TextInput style={styles.dateInput} onChangeText={t => setEmail(t)} value={email} />

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Senha :</Text>
            <TextInput style={styles.dateInput} onChangeText={t => setPassword(t)} value={password} />

            <Pressable style={styles.buttonFinish} onPress={() => registerUser()}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Cadastrar</Text>
            </Pressable>

            <View style={{ height: 50 }} />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonBack: {
        height: Metrics.baseHeight * 0.4,
        width: Metrics.baseHeight * 0.4,
        borderRadius: Metrics.baseHeight * 0.2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        justifyContent: 'center',
        width: Metrics.screenWidth * 0.9
    },
    dateInputHour: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth * 0.3
    },
    dateInputTag: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth * 0.7
    },
    button: {
        width: Metrics.screenWidth * 0.19,
        height: Metrics.baseHeight * 0.7,
        borderRadius: Metrics.baseHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        backgroundColor: '#ffffff',
        marginLeft: 5
    },
    buttonFinish: {
        width: Metrics.screenWidth * 0.60,
        height: Metrics.baseHeight * 0.8,
        borderRadius: Metrics.baseHeight * 0.1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        backgroundColor: '#14213d',
        marginTop: 10
    },

});

