import { CardProps, H3, H4, H5, H6, Text } from "tamagui";
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui';
import { Subtitle } from "~/tamagui.config";
import { Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import EditModal from "~/app/components/EditModal";
import { deleteFilm } from "~/app/service/BasicPetitions";
import { createForms } from "~/app/utils/functions";
interface BasicCardsProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Array<FetchResponses>;
  pageChange: (newPage:Array<FetchResponses>) => void;
  header: string;
  changeHeader: (newHeader: string) => void;
  changeCurrentProfile: (currentProfile:FetchResponses) => void;
  changeIsCreateModel: (value:boolean) => void;
}

interface DemoCardsProps {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: FetchResponses;
  pageChange: (newPage:Array<FetchResponses>) => void;
  header: string;
  changeHeader: (newHeader: string) => void;
  changeCurrentProfile: (currentProfile:FetchResponses) => void;
  changeIsCreateModel: (value:boolean) => void;
  savePrevData: (value:FetchResponses) => void;
  prevData: FetchResponses;
}
export function BasicCards({setShowEditModal, data, pageChange, header ,changeHeader, changeCurrentProfile, changeIsCreateModel}:BasicCardsProps) {
  const [prevData, setPrevData]=useState<FetchResponses>({})
  const savePrevData=(value)=>{
    setPrevData(value)
  }

//console.log("Edit Modal=>",data);
  return (
    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
      {data.map((value,index)=>{
        return(<DemoCard key={index} data={value}
          setShowEditModal={setShowEditModal} pageChange={pageChange} header={header} changeHeader={changeHeader}
         changeCurrentProfile={changeCurrentProfile} changeIsCreateModel={changeIsCreateModel} savePrevData={savePrevData} prevData={prevData}/>)
      })}
    </XStack>
  );
}
export function DemoCard({setShowEditModal, data, pageChange, header, changeHeader, changeCurrentProfile, changeIsCreateModel, savePrevData, prevData}:DemoCardsProps) {
  const [form,setForm]=useState<Forms>({})
  const [formModel, setFormModel]=useState<string[]>([])
  //console.log("Data:",data)
  const handleDelete=(id:number)=>{
    deleteFilm(header,id)
  }

  const editModal=()=>{
    changeIsCreateModel(false);
    if(header==="scene"){
      (data as Scene).filmId=(prevData as Film).id as number
    }
    if(header==="character"){
      (data as Character).sceneId=(prevData as Scene).id as number
    }
    //console.log("Prev State:",prevData)
    changeCurrentProfile(data)
    //console.log("Setting Current Profile==>",data)
    setShowEditModal(true);
  }

  const changeNewPage=()=>{

    let newHeader=header==="film"?"scene":"character";
    //console.log("Setting New Page==>",data)
    changeHeader(newHeader)
    if(header!=="character"){pageChange((data as any)[newHeader]);}
    changeCurrentProfile(data)
    savePrevData(data)
  }

  function createForm(){
    let {basicForm,modelBasicForm}=createForms(header,data)
    console.log("NEW CREATE FORM");
    console.log("Basic Form-->",basicForm)
    console.log("ModelBasicForm-->",modelBasicForm)
    setForm(basicForm);
    setFormModel(modelBasicForm)
  }

  useEffect(() => {
    createForm()
  }, [data]);
  return (
    <Card elevate size="$4" bordered={5}  borderColor={'white'}
          animation="bouncy"
          width={"100%"}
          height={'auto'}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
          onPress={()=>{
            changeNewPage()
          }}
    >
      <Card.Header padded>
        {formModel.map((value,index)=>{
          // console.log("Data++++++",data)
          // console.log("Value++++++",value)
          return (<H5>{value}: {(data as any)[value]} </H5>)
        })}
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            editModal();
          }}>
          <Image source={require('../../assets/EditIcon.png')} />
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            handleDelete(data.id)
          }}>
          <Image source={require('../../assets/DeleteIcon.png')} />
        </Pressable>
      </Card.Footer>

      <Card.Background backgroundColor='#570838' borderRadius={5}>
      </Card.Background>

    </Card>
  );
}
