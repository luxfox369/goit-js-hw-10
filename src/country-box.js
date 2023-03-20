import fetchCountries from "./fetchCountries";
import {refs} from "./refs";
//import { DEBOUNCE_DELAY } from "./index";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
let arrayCountries = {};

refs.h2 = document.querySelector('h2');
if (!refs.h2) {
  refs.body.insertAdjacentHTML('afterbegin', '<h2>REST Countries service</h2>');
  }

const debouncedInput = debounce(onSearch, DEBOUNCE_DELAY,{leading:true,trailing:false});
refs.input.addEventListener('input', debouncedInput);

function onSearch(e) {
   
  const searchCountry = e.target.value.trim();
  if (searchCountry=== "") { //якщо коримтувач очистив input чистимо попередній показ
    resetResult();
    return;
  }
  fetchCountries(searchCountry)
      .then((countries) => {
          //console.log(countries);
        if (!countries || countries.length >10) {
          resetResult();
          return;
        }
          if (countries) {
            if (countries.length > 1) {
             // arrayCountries = { ...countries };
              resetResult();
              markupList(countries);
            //  refs.list.addEventListener('click', clickOnCountry ); //клікнувши по item надається розширена інфа по цій країні
            
            }
            else if (countries.length === 1) {
             // arrayCountries == { ...countries };
              resetResult();
              markupOne(countries);
            }
          }
      })
      .catch((error) => {
       console.log(error);
      })
  
};
function markupList(listCountries) {
  let markup = listCountries.map(({ name: { official }, flags: { svg } }) =>
                // `<li class='item'><img class="img" src="${svg}" alt="${official}"/><button type="button">${official}</button></li>`).join('');
                    `<li class='item'><img class="img" src="${svg}" alt="${official}"/><span class="span">${official}</span></li>`).join('');
  refs.list.innerHTML = markup; //додаємо список країн які містять в назві введені символи
}

function markupOne(country) {
   const { name: { official }, flags: { svg }, capital, population, languages } = country[0];
              const language = Object.values(languages).join(", ");
              markup = `<img class="img large" src="${svg}" alt="${official}"/><p>Official name :${official}</p><p> Capital : ${capital}</p><p>Population :${population}</p><p>Languages :${language}</p>`;
              refs.info.innerHTML = markup;
}

function clickOnCountry(e) {
  console.log("arrayCountries ",arrayCountries);
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  refs.input.value = e.target.textContent;
  resetResult();
  const country = Array.from(arrayCountries).find(({ name: { official } }) => official  === refs.input.value);
  console.log("country after find ", country);
  markupOne(country);
}

export function resetResult() {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
  }

