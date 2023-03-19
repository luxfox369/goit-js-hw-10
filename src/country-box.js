import fetchCountries from "./fetchCountries";
import DEBOUNCE_DELAY from "./index";
import Notiflix from "notiflix";

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};
 const debouncedInput = _.debounce(onSearch, DEBOUNCE_DELAY,{leading:true,trailing:false});
refs.input.addEventListener('input',debouncedInput);

function onSearch(e) {
   
  const searchCountry = e.currentTarget.value;
  if (!searchCountry) {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
    return;
   }
    fetchCountries(searchCountry)
      .then((countries) => {
          console.log(countries);
          if (countries) {
            let markup = '';
            if (countries.length > 1) {
               markup = countries.map(({ name: { official }, flags: { svg }}) => `<li><svg width="100" height="100">${flags}</svg>${name}</li>`);
             
              refs.list.innerHTML = markup;
            }
            else {
              const { name: { official }, flags: { svg }, capital, population, languages } = countries[0];
              const language = Object.values(languages).join(", ");
              markup = `<svg width="100" height="100">${flags}</svg><p>${name}</p><p>${capital}</p><p>${population}</p><p>${language}</p>`;
              refs.list.innerHTML = "";
              refs.info.innerHTML = markup;
            }
          }
      })
      .catch((error) => {
        console.log(error);
      })
  
};
function render() {
    
};
