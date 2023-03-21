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
  if (searchCountry=== "") { 
    resetResult(); //якщо користувач очистив input чистимо попередній показ
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
              arrayCountries = [...countries]; // нова копія масива countries можна робити з рядками/масивами/обєктами 
                                               //так можна склеювати масиви [...countries,...otherCountries]
                                               //і обєкти {...firstObject,...secondObject} так всі ключі/їх знасення додадуться в новий обєкт
                                               // порядок має значення бо якщо зустрінеться той самий ключ то в результаті буде те що останній
              resetResult();                   
              markupList(countries);
              refs.list.addEventListener('click', clickOnCountry ); //клікнувши по item надається розширена інфа по цій країні
            
            }
            else if (countries.length === 1) {
              arrayCountries == [...countries] ; //якщо так не зробити то посилання те саме і зміна в одному буде і в другому
              resetResult();
              markupOne(countries);
            }
          }
      })
      .catch((error) => {
       console.log('from catch ',error);
      })
  
};
function markupList(listCountries) {
  const markup = listCountries.map(({ name: { official }, flags: { svg } }) =>
    //кнопка для кліку по назві
    `<li class='item'><img class="img" src="${svg}" alt="${official}"/><button type="button">${official}</button></li>`).join('');
   //без кліка по назві
   // `<li class='item'><img class="img" src="${svg}" alt="${official}"/><span class="span">${official}</span></li>`).join('');
  refs.list.innerHTML = markup; //додаємо список країн які містять в назві комбінацію введених символів
}

function markupOne(countries) {
        //name:{common:"",official:"",} flags:{png:"http.....",srs:"http....",languages{"first","second"}
   const { name: { official }, flags: { svg }, capital, population, languages } = countries[0]; 
   const language = Object.values(languages).join(", "); //перебирає щначення ключів і склеює в пядок ,розділяючи символами ", "
          const   markup = `<img class="img large" src="${svg}" alt="${official}"/><p>Official name :${official}</p><p> Capital : ${capital}</p><p>Population :${population}</p><p>Languages :${language}</p>`;
          refs.info.innerHTML = markup;
}

function clickOnCountry(e) {
 
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  refs.input.value = e.target.textContent; //при кліку текст кнопки(назва країни) заноситься в input
  resetResult(); //очищається список на екрані
  const country = Array.from(arrayCountries).find(country => country.name.official === refs.input.value); //витягає обєкт з масиву  списку країн
  const arrayForRender = [];
  arrayForRender.push(country);//для markupOne потрібний перший елемент масиву,тому створюємо і додаємо знайдений обєкт
  //console.log(" arrayForRender ", arrayForRender);
  markupOne(arrayForRender);
}

export function resetResult() {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
}
//перший елемент масиву результату
/*[0:{
capital: ['Ottawa']
flags:{png: 'https://flagcdn.com/w320/ca.png', svg: 'https://flagcdn.com/ca.svg', alt: 'The flag of Canada is composed of a red vertical b…d red maple leaf is centered in the white square.'}
languages:{eng: 'English', fra: 'French'}
name: {common: 'Canada', official: 'Canada', nativeName: {…}}
population: 38005238 }
[[Prototype]]Object
length: 1
[[Prototype]]: Array(0) ]*/

