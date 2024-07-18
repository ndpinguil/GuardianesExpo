import axios from 'axios'
const baseUrl = 'http://10.0.3.114:8082';
export const fetchFilms = async (ruta:string): Promise<Array<FetchResponses>> => {
  const url = `${baseUrl}/${ruta}`;
  const response = await axios.get(url);
  //console.log(response.data);
  return response.data
};
export const saveFilm = async (ruta:string,form:Forms) => {
  const url = `${baseUrl}/${ruta}`;
  //console.log(url)
  const response = await axios.post(url,form).catch((error)=>{console.log("Error:")});
  //console.log(response?.data);
};

export const deleteFilm = async (ruta: string,id:number) => {
  const url = `${baseUrl}/${ruta}`;
  //console.log(id)
  const response = await axios.delete(`${url}/delete/${id}`).catch((error)=>{console.log("Error:")});
  //console.log(response?.data);
  return "Borrado Exitoso"
};