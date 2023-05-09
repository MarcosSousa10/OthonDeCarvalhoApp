import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Modal, ScrollView,Image,TextInput, Text} from "react-native";
import React, {useState} from 'react';
import axios from "axios";
import Scanner from "./src/components/Scanner";

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [type, setType] = React.useState("");
  const [data, setData] = React.useState("");

  const onCodeScanned = (type, data) => {
    setType(type);
    setCod(data);
    setModalVisible(false);
  };
  const [cod, setCod] = useState('');
  const [descricao, setDescricao] = useState([]);
  const [codprod, setCodprod] = useState([]);
  const [unidade, setUnidade] = useState([]);
  const [produtopai, setProdutopai] = useState([]);
  const [estoquecd, setEstoquecd] = useState([]);
  const [estoqueothon, setEstoqueothon] = useState([]);
  const [estoquedispothon, setEstoquedispothon] = useState([]);
  const [qtachegar, setQtachegar] = useState([]);
  const [giromes, setGiromes] = useState([]);
  const [qtvendida3meses, setQtvendida3meses] = useState([]);

  const Task = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/java/codauxiliar/${cod}`)
      .then(Response => {
        setCodprod(Response.data.codprod);
        setUnidade(Response.data.unidade);
        setProdutopai(Response.data.produtopai);
        setEstoquecd(Response.data.estoquecd);
        setEstoqueothon(Response.data.estoqueothon);
        setEstoquedispothon(Response.data.estoquedispothon);
        setQtachegar(Response.data.qtachegar);
        setGiromes(Response.data.giromes);
        setQtvendida3meses(Response.data.qtvendida3meses);
        setDescricao(Response.data.descricao);
      });
  };

  const saveTask = async cod => {
    await axios
      .get(`http://187.72.17.137:4444/java/codigo/${cod}`)
      .then(Response => {
        setCodprod(Response.data.codprod);
        setUnidade(Response.data.unidade);
        setProdutopai(Response.data.produtopai);
        setEstoquecd(Response.data.estoquecd);
        setEstoqueothon(Response.data.estoqueothon);
        setEstoquedispothon(Response.data.estoquedispothon);
        setQtachegar(Response.data.qtachegar);
        setGiromes(Response.data.giromes);
        setQtvendida3meses(Response.data.qtvendida3meses);
        setDescricao(Response.data.descricao);
      });
  };

  return (
    <View> 
       <ScrollView
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
      }}>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Scanner onCodeScanned={onCodeScanned} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
{/* 
      <StatusBar style="auto" />

      <Text>Type: {type}</Text>
      <Text>Data: {data}</Text> */}

      
    
      <Image source={require('./src/Image/othon.png')} />
      {/* <View> */}
       
        <TextInput
          onChangeText={setCod}
          value={cod}
          placeholder="Favor Inserir o Codigo do Produto"
          keyboardType="numeric"
          style={{
            padding: 7,
            color: 'black',
            borderRadius: 70,
            margin: 15,
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 2,
          }}
        />
        <Text style={{color: 'red', textAlign: 'center', paddingBottom: 15}}>
          {descricao}
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Codigo Do Produto: {codprod}
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Unidade: {unidade}
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Produto Pai: {produtopai}
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Estoque CD: {estoquecd} PC
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Estoque Othon: {estoqueothon} PC{' '}
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Quantidade Vendida em 3 Meses: {qtvendida3meses} PC
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Giro Mes: {giromes} PC
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Quantidade Pedida: {qtachegar} PC
        </Text>
        <Text style={{paddingBottom: 10, color: 'black'}}>
          Estoque Disponivel Othon: {estoquedispothon} PC
        </Text>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('./src/Image/download.png')}
            style={styles.imageForeground}
          />
        </View>
        <Button title="Escanear" onPress={() => setModalVisible(true)} />
        {cod.length > 6 || data.length > 1  ? (
          <Button
            title="Codigo Auxiliar"
            style={{borderRadius: 70}}
            onPress={() => {
              
              Task(cod);
            }}
            color="#841584"
          />
        ) : (
          <Button
            style={{borderRadius: 70}}
            title="Codigo do Produto"
            onPress={() => {
              saveTask(cod);
            }}
            color="#841584"
          />
        )}
      {/* </View> */}
    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
   modal: {
     flex: 1,
     alignItems: "center",
     justifyContent: "space-around",
     backgroundColor: "lightgrey",
   },
  imageForeground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
});