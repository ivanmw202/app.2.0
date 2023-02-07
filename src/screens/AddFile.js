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
import RNPickerSelect from "react-native-picker-select";
import * as SecureStore from "expo-secure-store";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { URL_BASE } from "../config/URL_BASE";

const AddFile = ({ navigation }) => {
  const staff = true;




  const [listaDeTiposPublicacion, setListaDeTiposPublicacion] = useState([]);
  const [listaDeAutores, setListaDeAutores] = useState([]);
  const getListaDeTiposDePublicacion = async () => {
    const url = `${URL_BASE}/gestion/lista/tiposdepublicacion/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
    });
    const response = await request.json();
    setListaDeTiposPublicacion(response);
    setLoading({
      list_autor: false,
      list_tiposdepublicacion: true,
    });
  };
  const getListaDeAutores = async () => {
    const url = `${URL_BASE}/gestion/lista/autores/`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
    });
    const response = await request.json();
    setListaDeAutores(response);
    setLoading({
      list_autor: true,
      list_tiposdepublicacion: true,
    });
  };
  const [titulo, setTitulo] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const [filePdf, setFilePdf] = useState(null);
  const [materia, setMateria] = useState("");
  const [fecha_publicacion, setFechaPublicacion] = useState(
    new Date()//.toISOString()//.split("T")[0]
  );
  const [resumen, setResumen] = useState("");

  const [tipoPublicacion, setTipoPublicacion] = useState(null);
  const [autor, setAutor] = useState("");



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFechaPublicacion(currentDate.toISOString().split("T")[0]);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: fecha_publicacion,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const LoadPdf = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    setFilePdf({
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
  };
  const LoadImg = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    setFileImg({
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });
  };

  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync("token");
    const url = `${URL_BASE}/gestion/book/create/`;
    if (fileImg !== null && filePdf !== null) {
      let myFormData = new FormData();
      /* myFormData.append("titulo", titulo);
      myFormData.append("resumen", resumen);
      myFormData.append("imagen", fileImg);
      myFormData.append("materia", materia);
      myFormData.append("fecha_publicacion", fecha_publicacion); //fecha pricvinoanldefault
      myFormData.append("tipo_de_publicacion", tipoPublicacion); //tipo de puclicacion porvicional deflaut
      myFormData.append("autor", autor); //tipo default provicinal
      myFormData.append("pdf", filePdf); */
      const request = await fetch(url, {
        method: "POST",
        body: myFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Token ${token}`
        },
      });
      const response = await request.json();
      console.log(response);
      alert(JSON.stringify(response));
    }
  };

  useEffect(() => {
    getListaDeAutores();
    getListaDeTiposDePublicacion();
  }, []);
  return (
    <>
      {/*  <View>
        <Text>Add new file</Text>
        <Button title="Add" onClick={LoadPdf}></Button>
        <Button onClick={handleSubmit} title="Crear"></Button>
      </View> */}
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
              source={require("../../assets/iconos/archivo.png")}
            ></Image>
          </View>


          <SafeAreaView>
            <TextInput
              placeholder="Titulo"
              style={styles.input}
              label="first_name"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={titulo}
              onChangeText={(text) => {
                setTitulo(text);
              }}
            />
            <TextInput
              placeholder="materia"
              style={styles.input}
              label="materia"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={materia}
              onChangeText={(text) => {
                setMateria(text);
              }}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Resumen"
              style={styles.input}
              label="Resumen"
              autoCapitalize="none"
              autoCompleteType=""
              textContentType=""
              keyboardType=""
              value={resumen}
              onChangeText={(text) => {
                setResumen(text);
              }}
            />
            <TouchableOpacity
              Styles={styles.containerIN} onPress={showDatepicker}

            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Selecccionar fecha</Text>
              </LinearGradient>
            </TouchableOpacity>



            <Text>Fecha: {fecha_publicacion.toLocaleString()}</Text>


            <RNPickerSelect
              onValueChange={(value) => setTipoPublicacion(value)}
              placeholder={{
                label: 'Selecciona un tipo de publicacion...',
                value: null,
              }}
              items={listaDeTiposPublicacion.map((item) => {
                return {
                  label: item.nombre,
                  value: item.id,
                };
              })}
            />

            <RNPickerSelect
              placeholder={{
                label: 'Selecciona un autor...',
                value: null,
              }}
              onValueChange={(value) => setAutor(value)}
              items={listaDeAutores.map((item) => {
                return {
                  label: (`${item.nombres} ${item.apellido_paterno} ${item.apellido_materno}`),
                  value: item.id,
                };
              })}
            />

            <TouchableOpacity Styles={styles.containerR} onPress={LoadPdf}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonR}
              >
                <Text style={styles.textR}>Cargar archivo pdf</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity Styles={styles.containerR} onPress={LoadImg}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonR}
              >
                <Text style={styles.textR}>Cargar Imagen</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              Styles={styles.containerIN}
              onPress={() => {
                handleSubmit()
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#FFCC00", "#685B96", "#7A4780"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonIN}
              >
                <Text style={styles.textIN}>Crear archivo xd</Text>
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

export default AddFile;
