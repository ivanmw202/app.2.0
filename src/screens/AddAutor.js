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
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from "expo-linear-gradient";
import { URL_BASE } from "../config/URL_BASE";

import { useState, useEffect } from "react";
const AddAutor = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [apellido_materno, setApellido_materno] = useState("");
  const [matricula, setMatricula] = useState("");
  const [asesor_interno, setAsesor_interno] = useState("");
  const [asesor_externo, setAsesor_externo] = useState("");
  const [carrera, setCarrera] = useState(null);
  const [campus, setCampus] = useState(null);

  //inicializar las lista de las carreras
  const [listaCarreras, setListaCarreras] = useState([]);
  const [listaCampus, setListaCampus] = useState([]);

  //obtener la lista de campus de la api
  const getListaCampus = async () => {
    const url = `${URL_BASE}/gestion/lista/campus/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setListaCampus(response);
  };

  //obtener la lista de carreras de la api
  const getListaCarreras = async () => {
    const url = `${URL_BASE}/gestion/lista/carreras/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    setListaCarreras(response);
  };

  //envia los datos a la api en formato JSON
  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync("token");
    const data = {
      firts_name: first_name,
      last_name: last_name,
      apellido_materno: apellido_materno,
      matricula: matricula,
      asesor_interno: asesor_interno,
      asesor_externo: asesor_externo,
      carrera: carrera,
      campus: campus,
    };
    const url = `${URL_BASE}/gestion/autor/create/`;
    const request = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const response = await request.json();
    console.log(response);
  };
  const pickerItems = listaCarreras.map((item) => ({
    label: item.nombre,
    value: item.id,
  }));
  useEffect(() => {
    getListaCampus();
    getListaCarreras();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#FFCC00",
              flex: 1,
              padding: 18,
              width: 400,
            }}
          ></View>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require("../../assets/iconos/autor.png")}
            ></Image>
          </View>
          <SafeAreaView>
            <TextInput
              placeholder="Nombre(s)"
              style={styles.input}
              label="first_name"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={first_name}
              onChangeText={(text) => setFirst_name(text)}
            />
            <TextInput
              placeholder="Apellido Paterno"
              style={styles.input}
              label="Last_name"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={last_name}
              onChangeText={(text) => setLast_name(text)}
            />
            <TextInput
              placeholder="Apellido Materno"
              style={styles.input}
              label="Apellido_paterno"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={apellido_materno}
              onChangeText={(text) => setApellido_materno(text)}
            />
            <TextInput
              placeholder="Matricula"
              style={styles.input}
              label="Matricula"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={matricula}
              onChangeText={(text) => setMatricula(text)}
            />
            <TextInput
              placeholder="Asesor Interno"
              style={styles.input}
              label="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={asesor_interno}
              onChangeText={(text) => setAsesor_interno(text)}
            />
            <TextInput
              placeholder="Asesor Externo"
              style={styles.input}
              label="Password"
              returnKeyType="done"
              value={asesor_externo}
              onChangeText={(text) => setAsesor_externo(text)}
            />
            <RNPickerSelect
              placeholder={{ label: "Selecciona una carrera", value: null }}
              onValueChange={(value) => setCarrera(value)}
              items={pickerItems}
            />
            <Button
              title="ver lista"
              onPress={() => alert(JSON.stringify(listaCarreras))}
            />
            <Button
              title="ver piker items"
              onPress={() => alert(JSON.stringify(pickerItems))}
            />
            <Button
              title="ver carerra seleccionada"
              onPress={() => alert(carrera)}
            />

            <TouchableOpacity Styles={styles.containerR}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonR}
              >
                <Text style={styles.textR}>AGREGAR AUTOR</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity Styles={styles.containerIN}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>CANCELAR</Text>
              </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingStart: 30,
    padding: 10,
    width: 350,
    height: 50,
    padding: 10,
    marginTop: 5,
  },

  Button: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 400,
    height: 150,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 20,
    marginRight: 45,
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
    width: "47%",
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
    marginTop: 0,
    marginBottom: 0,
  },
  textIN: {
    fontSize: 15,
    color: "#fff",
  },
});

export default AddAutor;
