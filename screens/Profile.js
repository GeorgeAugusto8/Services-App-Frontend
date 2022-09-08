import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Metrics } from '../constants/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ModalSelectPhoto } from '../components';
import { profileImage } from '../services/ApiService'

export default ({ navigation }) => {
  const [modalPhoto, setModalPhoto] = useState(false)

  return (
    <View style={{ alignItems: 'center' }} >

      <View style={{ backgroundColor: '#ffffff', width: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <View>
          <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
          <Text style={{ alignSelf: 'center'}} onPress={() => setModalPhoto(true)}>alterar</Text>
        </View>
        <Text style={styles.name} >João da Silva</Text>
      </View>

      <View style={{ width: '100%', height: 0.5, backgroundColor: '#363431', marginBottom: 10 }} />

      <View style={{ marginBottom: 2, padding: 20, backgroundColor: '#ffffff', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>Dados gerais</Text>
        <AntDesign name="right" color="#14213d" size={20} />
      </View>

      <View style={{ marginBottom: 2, padding: 20, backgroundColor: '#ffffff', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>Endereço</Text>
        <AntDesign name="right" color="#14213d" size={20} />
      </View>

      <View style={{ marginBottom: 2, padding: 20, backgroundColor: '#ffffff', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>Pagamento</Text>
        <AntDesign name="right" color="#14213d" size={20} />
      </View>

      <Pressable onPress={() => navigation.navigate("Login")} style={{ alignSelf: 'flex-end', marginBottom: 2, padding: 20, backgroundColor: '#ffffff', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'rgb(200,0,0)' }}>Sair</Text>
      </Pressable>

      <ModalSelectPhoto visible={modalPhoto} setModal={setModalPhoto} addImage={(response) =>  profileImage(response)} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    margin: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  resultImage: {
    margin: 20,
    height: Metrics.baseHeight * 1.4,
    width: Metrics.baseHeight * 1.4,
    borderRadius: Metrics.baseHeight * 0.7,
    borderWidth: 0.5,
    borderColor: '#363431',
  },
});

