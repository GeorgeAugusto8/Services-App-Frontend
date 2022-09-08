
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Metrics } from '../constants/Metrics';

export default ({ navigation }) => {
    const [conversations, setConversations] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

    const chatListItem = (item, navigation) => {
        return (
            <Pressable style={styles.resultContainer} onPress={() => navigation.navigate('Chat')}>
                <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
                <View style={{ marginLeft: Metrics.baseWidth * 0.5 }}>
                    <Text style={{ fontSize: 15, }}>João da Silva</Text>
                    <Text style={{marginTop: 5}}>Lorem ipsum dolor sit amet, consectetur sed  </Text>

                </View>
            </Pressable>
        )
    }

    return (
        <View >
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="#ffffff" size={20} />
                </Pressable>
                <Text style={styles.name} >Minhas conversas</Text>
            </View>

            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => chatListItem(item, navigation)}
            />

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
    resultContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        padding: 10,
        height: Metrics.baseHeight * 1.1,
        borderRadius: 5,
        backgroundColor: '#fafafa',
        marginBottom: 5,
    },
    resultImage: {
        height: Metrics.baseHeight * 0.8,
        width: Metrics.baseHeight * 0.8,
        borderRadius: Metrics.baseHeight * 0.4,
        borderWidth: 0.5,
        borderColor: '#363431',
    }
});

