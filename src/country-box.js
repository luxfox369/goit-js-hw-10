import fetchCountries from "./fetchCountries";
import DEBOUNCE_DELAY from "./index";
import debounce from "lodash.debounce";
import Notiflix from "notiflix";

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
   
};
document.body.insertAdjacentHTML('afterbegin', '<h2>REST Countries service</h2>');
refs.input.style.width = "250px";
//refs.input.innerHTML = "<input type='text' id='search-box' placeholder='Type name of country...' />";
refs.input.cssText = "input::placeholder {  color: blue;  font-size: 1.2em;  font-style: italic;}";

const debouncedInput = debounce(onSearch, DEBOUNCE_DELAY,{leading:true,trailing:false});
refs.input.addEventListener('input', debouncedInput);


function onSearch(e) {
   
  const searchCountry = e.target.value.trim();
  if (searchCountry=== "") { //якщо коримтувач очистив input чистимо попередній показ
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
    return;
  }
  fetchCountries(searchCountry)
      .then((countries) => {
          //console.log(countries);
        if (!countries.length || countries.length >10) {
          refs.info.innerHTML = ""; //чистимо попередні дані на екрані 1-ої країни
          refs.list.innerHTML = ""; //чистимо попередні дані на екрані список
          return;
        }
          if (countries) {
            if (countries.length > 1) {
              const  span_style = "style='display:inline-block; padding:10px; font-size:20px;font-weight:600px'";
              const  img_style = "style='width:70px; height:50px; display: inline-block ;padding-right:10px'";
              let markup = countries.map(({ name: { official }, flags: { svg } }) =>
                `<li class='item'><img ${img_style} src="${svg}" alt="${official}"/><span ${span_style}>${official}</span></li>`).join('');
              refs.list.innerHTML = markup; //додаємо список країн які містять в назві введені символи
              refs.item = document.querySelector('.item');
              refs.item.addEventListener('click', chooseItem); //клікнувши по item надається розширена інфа по цій країні
              refs.info.innerHTML = ""; //чистимо дані 1-ої країни
                        
             
              refs.list.style.cssText = "list-style:none;display:flex;gap:10px;flex-direction:column;align-items:flex-start;font-size:25px;padding:10px;";
            }
            else if (countries.length === 1) {
              const { name: { official }, flags: { svg }, capital, population, languages } = countries[0];
              const language = Object.values(languages).join(", ");
              markup = `<img width="250" height="150" src="${svg}" alt="${official}"/><p>Official name :<b>${official}</b></p><p> Capital :<b> ${capital}</b></p><p>Population :<b>${population}</b></p><p>Languages :<b>${language}</b></p>`;
              refs.list.innerHTML = "";
              refs.info.innerHTML = markup;
              refs.span = document.querySelectorAll('.span');
              refs.p = document.querySelectorAll('p');
              refs.p.style.cssText = "padding-left:5px;";
              refs.span.style.cssText = "font-size:25px;font-weight:700px;font-style:italic;";
            }
          }
      })
      .catch((error) => {
       Notiflix.Notify.failure(error);
      })
  
};
function chooseItem(e) {
  
  if (e.target.nodeName !== "LI") {
    return;
  }
    refs.input.value = e.target.textContent;
    return fetchCountries(refs.input.value);
  }

