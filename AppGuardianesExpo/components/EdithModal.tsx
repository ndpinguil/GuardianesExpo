import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TextInput, Platform } from "react-native";
import { Button, H3, Input, TextArea } from "tamagui";
import { Stack } from "expo-router";
import { Cancel } from "axios";
import { Feather } from "@expo/vector-icons";
import { saveFilm } from "~/app/service/BasicPetitions";
import { createForms } from "~/app/utils/functions";

const EditModal = ({closeEditModal,isCreate, data, header, currentProfile}: { closeEditModal: () => void, isCreate: boolean, data: FetchResponses, header: string, currentProfile: FetchResponses}) => {
  //console.log("DATA RECEIVED: ",currentProfile)
  const [form,setForm]=useState<Forms>({})
  const [formModel, setFormModel]=useState<string[]>([])
  function createForm(){
    let currentProfileAux=currentProfile;
    if(isCreate){currentProfile={}}
    let {basicForm,modelBasicForm}=createForms(header,currentProfile,!isCreate?currentProfileAux.id:null)
    //console.log("NEW CREATE FORM");
    //console.log("Basic Form-->",basicForm)
    //console.log("ModelBasicForm-->",modelBasicForm)

      if(header==="scene"){
        if(isCreate){
          (basicForm as SceneForm).filmId=(currentProfileAux as Scene).id as number
        }

      }
      if(header==="character"){
        if(isCreate){
          (basicForm as CharacterForm).sceneId=(currentProfileAux as Character).id as number
        }

      }


    setForm(basicForm);
    setFormModel(modelBasicForm)
  }
  const handleChange = (name:string,newValue:string) => {

    console.log("Value: ",newValue)
    setForm(prevState => ({
      ...prevState,
      [name]: newValue
    }));
    console.log("E=>",form)
  };
  const confirmFormUpload = () => {
    console.log("Is Create: ",isCreate)
    if(!isCreate){
      console.log('---------------------');
      setForm((prevState:{})=>{
        console.log("ALGO",{ ...prevState, id: currentProfile.id })
        return { ...prevState, id: currentProfile.id };
      })
    }
    if(Platform.OS==='web'){
      if(confirm("Seguro de subir los siguientes datos?")){
        saveFilm(header,form)
      }else{console.log("Rechazado")}
    }
    return Alert.alert("Subida de Datos", "Esta seguro de subir los cambios realizados?", [
      {
        text: "CANCELAR",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "ACEPTAR", onPress: () => {console.log("Form To Upload:",form); return saveFilm(header,form)} }
    ]);
  }

  useEffect(() => {
    setForm({})
    setFormModel([])
    createForm()
  }, []);
  return (

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeaderView}>
              <View style={{flex:1}}>
                <H3 style={{fontWeight:900, color:'rgba(255,255,255,0.54)'}}>{header.toUpperCase()}</H3>
              </View>
              <View>
                <Pressable
                  style={styles.button}
                  onPress={() => closeEditModal()}>
                  <Feather name="x-circle" size={30} color="white"/>
                </Pressable>
              </View>
            </View>
            <View style={{flex: 2,height:'100%', width:'80%'}}>
              <Image style={{resizeMode:'contain', width:'100%',height:'100%'}} source={require('../../assets/MovieLogo.png')} />
            </View>
            <View style={styles.modalBodyView} >
            {formModel.map((value,index)=>{
              //console.log(value)
              return(
                <View style={{width:'100%'}}>
                  <H3>{value}</H3>
                  <Input
                    value={form[value]?.toString()}
                    componentName={value}
                    onChangeText={newValue => handleChange(value,newValue)}
                    borderWidth={2} width={200} maxWidth={200} style={{backgroundColor:'black'}}/>
                </View>
              )
            })
            }
            </View>
            <View style={styles.modalBottomView}>
              <Button onPress={confirmFormUpload} style={{backgroundColor: '#752D59', width:'80%', alignSelf: 'flex-start' }}>{isCreate?"Create":"Edit"}</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalHeaderView:{
      flex: 1,
      flexDirection: 'row',
    width:'100%'
  },
  modalBodyView:{
    flex: 5,
    height: '100%'
  },
  modalBottomView:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  modalView: {
    width:'80%',
    height: '80%',
    margin: 20,
    backgroundColor: '#2d091f',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#570354',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color:'#2d091f',
    borderRadius: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputStyles:{
    width:200,
    borderWidth: 1,
    padding: 10,
  }
});

export default EditModal;