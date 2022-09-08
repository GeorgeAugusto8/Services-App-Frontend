import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Image, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-root-toast';
import { Metrics } from '../constants/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ModalSelectPhoto } from '../components';
import axios from "axios";
import { getToken } from '../services/AsyncStorage';

export default ({ visible, setModal, refreshData }) => {
  const [modalSelect, setModalSelect] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [text, setText] = useState(null);

  const sucessToast = () => {
    Toast.show('Post registrado com sucesso.',
      {
        duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
        backgroundColor: '#79D233', textColor: '#000000'
      }
    )
    setModal(false)
  }

  const addImage = (uri) => {
    setPhotos([...photos, { uri: uri }])
  }

  const postRequest = async (data) => {
    const token = await getToken()
    return axios.post(`http://10.0.2.2:3000/posts`, data , { 'headers': { 'auth-token': token } })
      .then((response) => { return response })
      .catch(e => { return e })
  }

  const addPost = async () => {
    if (checkInfo()) {
      const post = {
        text: text,
        images: photos.map(p => p.uri)
      }

      const response = await postRequest(post)
      if (response && response.status === 200) {
        sucessToast()
        refreshData()
      } 
      else {
        Toast.show('Falha ao registrar post, verifique a sua conexão.',
          {
            duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
            backgroundColor: 'rgb(200,0,0)', textColor: '#ffffff'
          })
      }

    }

  }

  const checkInfo = () => {
    if (
      !text || !photos
    ) {
      Toast.show('Você deve preencher todos os campos',
        {
          duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
          backgroundColor: 'rgb(200,0,0)', textColor: '#ffffff'
        })

      return false

    } else return true

  }

  return (
    <View >
      <Modal backdropOpacity={0.3} isVisible={visible}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleModal}>Novo post</Text>
          <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />

          <ScrollView style={{ height: Metrics.screenHeight * 0.6 }}>

            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => navigation.navigate('Details')}>
                <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
              </Pressable>
              <View>
                <Pressable onPress={() => navigation.navigate('Details')}>
                  <Text style={styles.name}>João da Silva</Text>
                </Pressable>
                <Text>1 s</Text>
              </View>

            </View>

            <TextInput
              multiline={true}
              placeholder='Texto'
              numberOfLines={5}
              style={[styles.dateInput, { textAlignVertical: 'top', height: 160, padding: 5, }]}
              onChangeText={t => setText(t)}
            />

            <Pressable style={styles.attachView} onPress={() => setModalSelect(true)}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Anexar arquivos</Text>
              <Ionicons name="attach" color='rgba(0,0,0,0.8)' size={30} />
            </Pressable>

            <FlatList
              data={photos}
              horizontal={true}
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) =>
                <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
              }
            />
          </ScrollView>


          <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 5 }}>
            <Pressable style={{ padding: 10 }} onPress={() => addPost()}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> Confirmar</Text>
            </Pressable>

            <View style={{ height: 40, backgroundColor: '#d3d3d3', width: 1 }} />

            <Pressable style={{ padding: 10 }} onPress={() => setModal(false)}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> Cancelar</Text>
            </Pressable>
          </View>

        </View>

      </Modal>

      <ModalSelectPhoto visible={modalSelect} setModal={setModalSelect} addImage={addImage} />
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
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    padding: 10,
    borderBottomEndRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  attachView: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#000000',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#e5e5e5',
    marginBottom: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
    alignSelf: 'center'
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
  resultImage: {
    margin: 15,
    height: Metrics.baseHeight * 0.5,
    width: Metrics.baseHeight * 0.5,
    borderRadius: Metrics.baseHeight * 0.25,
    borderWidth: 0.5,
    borderColor: '#363431',
  },
  name: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },

});

