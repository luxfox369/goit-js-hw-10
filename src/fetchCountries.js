//export  fetchCountries ;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const API_KEY = '';
// const OPTIONS = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };
//  let page = 1;
  
 export function  fetchCountries(name) {
      return fetch(`${BASE_URL}${name}`, OPTIONS) //https://restcountries.com/v3.1/name/{name}
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({country}) => {country})
      .catch(error => {
        console.error(error);
      });
  }
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages 
