import Notiflix from "notiflix";
import { refs } from "./refs";
export default fetchCountries ;
const BASE_URL = 'https://restcountries.com/v3.1/name/'; //https://restcountries.com/v3.1/name/deutschland
const API_KEY = "";

const OPTIONS = {
  headers: {
   // Authorization: API_KEY,
  },
};
//https://restcountries.com/v3.1/name?fields=name,capital,currencies  
//https://restcountries.com/v3.1/sweden?fields=name.official,capital,population,flags.svg,languages
const searchParams = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
 
  //console.log(`${BASE_URL}${name}${searchParams}`);
  return fetch(`${BASE_URL}${name}${searchParams}`, OPTIONS) 
    .then(response => {
         if (!response.ok) {
           Notiflix.Notify.failure("Oops, there is no country with that name");
           refs.list.innerHTML = "";
           refs.info.innerHTML = "";
           return;
            }
        else return response.json();
      })
    .then((data) => {
      console.log("data.length ",data.length);
      if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        refs.list.innerHTML = "";
        refs.info.innerHTML = "";
        return;
      }
       return data;
    })
      .catch(error => {
        console.log(error);
      });
  }

