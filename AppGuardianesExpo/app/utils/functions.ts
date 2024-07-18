export function createForms(Header:String, data: FetchResponses, id:number|null=null){
  let basicForm:Forms= {};
  //console.log("------------------")
  //console.log("Received Id: ",id)
  if(Header==="film"){
    data=data as Film;
    //console.log("--------FILM----------")
    basicForm={
      budget: data.budget,
      director: data.director,
      duration: data.duration,
      title: data.title,
      id
    }
    console.log("IDK***",basicForm)
  }else if(Header==="scene"){
    data=data as Scene;
    basicForm={
      budget: data.budget,
      description: data.description,
      filmId: data.filmId,
      id,
      minutes: data.minutes,
      title: data.title
    }
  }else if(Header==="character"){
    data=data as Character;
    basicForm={
      actor: data.actor,
      description: data.description,
      id,
      priceMinute: data.priceMinute,
      sceneId: data.sceneId
    }
  }
  // @ts-ignore
  const modelBasicForm: string[] = Object.keys(basicForm).filter(key => key !== "id" && key !== "filmId" && key !== "sceneId").reverse();
  //console.log("Model Basic Form:",modelBasicForm)
  //console.log("Bais Form:",basicForm)
  // @ts-ignore
  return { basicForm, modelBasicForm}
}