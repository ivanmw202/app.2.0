import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as SecureStore from "expo-secure-store";
//import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { URL_BASE } from "../config/URL_BASE";
//import RNPickerSelect from "react-native-picker-select";
const AddFile = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18, width: 400, }}
          ></View>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require("../../assets/iconos/archivo.png")}
            ></Image>
          </View>
          {/* carga de archivos pdf */}
          <SafeAreaView>
            <View style={styles.containerbotonesx}>

              <TouchableOpacity Styles={styles.containerx}>
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FFCC00", "#685B96", "#7A4780"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonR}
                >
                  <Text style={styles.textR}>Archivo pdf</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TextInput style={styles.inputBotonesx}>hola</TextInput>


              {/*  carga de imagnes  */}
              <TouchableOpacity Styles={styles.containerx}>
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FFCC00", "#685B96", "#7A4780"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonR}
                >
                  <Text style={styles.textR}>Imagen</Text>
                  
                </LinearGradient>
                
              </TouchableOpacity>
              <TextInput style={styles.inputBotonesx}>hola</TextInput>
              
            </View>

            <TextInput
              placeholder="Titulo"
              style={styles.input}
              label="first_name"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
            /* value={titulo}
            onChangeText={(text) => {
              setTitulo(text);
            }} */
            />
            {/* <RNPickerSelect
              onValueChange={(value) => setTipoPublicacion(value)}
              items={listaDeTiposPublicacion.map((item) => {
                return {
                  label: item.nombre,
                  value: item.id,
                };
              })}
            /> */}

            <TextInput
              placeholder="Resumen"
              style={styles.input}
              label="Resumen"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
            /*  value={resumen}
            onChangeText={(text) => {
              setResumen(text);
            }} */
            />
            {/* <RNPickerSelect
              onValueChange={(value) => setAutor(value)}
              items={listaDeAutores.map((item) => {
                return {
                  label: item.nombres,
                  value: item.id,
                };
              })}
            /> */}
            <TextInput
              placeholder="materia"
              style={styles.input}
              label="materia"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
            /* value={materia}
            onChangeText={(text) => {
              setMateria(text);
            }} */
            />
            <TextInput
              placeholder="fecha de publicacion"
              style={styles.input}
              label="fecha publicacion"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType="date"
              keyboardType="date"
            />
            <TextInput
              placeholder="tipo de publicacion"
              style={styles.input}
              label="tipo de publicacion"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType="number"
              keyboardType="number"
            />
            <TextInput
              placeholder="Autor"
              style={styles.input}
              label="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TouchableOpacity Styles={styles.containerIN}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Crear Archivo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              Styles={styles.containerIN}
              onPress={() => {
                navigation.navigate("Inside", { staff: staff });
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Cancelar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  containerbotonesx: {
    marginBottom: "10%",
    marginRight: "10%",
    margin: "10%",
    borderWidth: 1,
    width: "150%",
    backgroundColor:'#fff',
    
    borderRadius: 15,
    padding: 10,
    marginTop: "-5%",
  },
  inputBotonesx: {
    height: "2%",
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingStart: 10,
    padding: 10,
    width: 320,
    height: 50,
    right: 15,
    marginTop: 5,

  },
  buttonx: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "47%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: "2%",
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingStart: 30,
    padding: 10,
    width: 300,
    height: 50,
    marginTop: 5,
    marginRight: "5%",
    marginLeft: "20%",
  },

  Button: {
    marginTop: 10,
  },

  img: {
    width: 400,
    height: 150,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 5,
    marginRight: 3,
    marginBottom: 50,
    marginTop: 10,
    alignContent: "center",
  },

  containerR: {
    flex: 1,
    alignItems: "center",
    width: 200,
    marginTop: 100,
  },
  buttonR: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "38%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  textR: {
    fontSize: 15,
    color: "#fff",
  },

  containerIN: {
    flex: 1,
    alignItems: "center",
    width: 100,
  },
  buttonIN: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "47%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom:15,
    left:20,
  },
  textIN: {
    fontSize: 15,
    color: "#fff",
  },
});

export default AddFile;
