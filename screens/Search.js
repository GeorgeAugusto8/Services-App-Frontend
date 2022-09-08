import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, FlatList, Image, Pressable } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getToken } from '../services/AsyncStorage';
import axios from "axios";

const { width, height } = Dimensions.get('window');

const DefaultMetrics = {
    screenHeight: height,
    screenWidth: width,
    baseHeight: height * 0.1,
    baseWidth: width * 0.1
}

const categoriesTest = [
    { id: 1, name: 'pedreiro', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 2, name: 'marcineiro', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 3, name: 'faxineiro', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 4, name: 'faz tudo', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 5, name: 'cabelereiro', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 6, name: 'manicure', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 7, name: 'design de sobrancelhas', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 8, name: 'motoboy', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 9, name: 'professor particular', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
    { id: 10, name: 'segurança', img: 'https://sintricomb.com.br/wp-content/uploads/2018/12/curso.jpg' },
]



const categoriesListItem = (item, setText) => {
    return (
        <Pressable style={styles.itemContainer} onPress={() => setText(item.name)}>
            <Image style={{ flex: 1, height: '100%', width: '100%', opacity: 0.7 }} source={{ uri: item.img }} />
            <Text style={styles.itemText}>{item.name}</Text>
        </Pressable>
    )
}

const resultListItem = (item, navigation) => {
    return (
        <Pressable style={styles.resultContainer} onPress={() => navigation.navigate('Details')}>
            <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
            <View style={{ marginLeft: DefaultMetrics.baseWidth * 0.5 }}>
                <Text style={{ fontSize: 15, }}>João da Silva</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text>pedreiro</Text>
                    <Text> • encanador</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Foundation name="star" color="#fca311" size={18} />
                    <Text style={{ color: "#fca311", marginRight: 3 }}>4.4</Text>
                    <Text> • 1.3 km</Text>
                </View>

            </View>
        </Pressable>
    )
}


export default ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    const search = async () => {
        const response = await searchRequest()
        console.log(JSON.stringify(response))
     }

    const searchRequest = async () => {
        const token = await getToken()
        return axios.get(`http://10.0.2.2:3000/users?text=${searchText}`, { 'headers': { 'auth-token': token } })
            .then((response) => { return response })
            .catch(e => { return e })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', width: '88%', alignItems: 'center', justifyContent: 'center' }}>
                    <TextInput placeholder='Buscar...' style={styles.input} onChangeText={text => setSearchText(text)} value={searchText} />
                    {searchText.length > 0 && <Feather style={{ position: 'absolute', right: 20 }} name="x" color="#14213d" size={20} onPress={() => setSearchText('')} />}
                </View>
                <MaterialIcons onPress={() => search()} name="search" color="#14213d" size={25} style={{ marginLeft: 5 }} />
            </View>

            {searchText.length === 0 ?
                <View style={{ flex: 1 }}>

                    <Text style={styles.text}>Buscas Recomendadas :</Text>

                    <FlatList
                        key={'_'}
                        data={categoriesTest}
                        numColumns={2}
                        renderItem={({ item }) => categoriesListItem(item, setSearchText)}
                        keyExtractor={item => '_' + item.id}
                    />
                </View>

                :

                <View style={{ width: DefaultMetrics.screenWidth }}>
                    <FlatList
                        key={'#'}
                        numColumns={1}
                        style={{ width: DefaultMetrics.screenWidth }}
                        data={categoriesTest}
                        renderItem={({ item }) => resultListItem(item, navigation)}
                        keyExtractor={item => "#" + item.id}
                    />

                </View>

            }



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    text: {
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '2.5%'
    },
    itemContainer: {
        width: '46%',
        backgroundColor: '#e5e5e5',
        margin: DefaultMetrics.baseWidth * 0.2,
        height: DefaultMetrics.screenHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        right: 10
    },
    resultContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        height: DefaultMetrics.baseHeight * 1.1,
        borderRadius: 5,
        backgroundColor: '#fafafa',
        marginBottom: 5,
    },
    resultImage: {
        height: DefaultMetrics.baseHeight * 0.8,
        width: DefaultMetrics.baseHeight * 0.8,
        borderRadius: DefaultMetrics.baseHeight * 0.4,
        borderWidth: 0.5,
        borderColor: '#363431',
    }
});

