import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '22a63f9a58msh7c94a3b5f6fe364p14d285jsn416f88ae275c' ,
    },
  });
    
  return data;
}