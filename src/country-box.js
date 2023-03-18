import fetchCountries from "./fetchCountries";
import DEBOUNCE_DELAY from "./index";

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const searchCountry = e.currentTarget.value;
    fetchCountries(searchCountry)
        .then((country) => {
            console.log(country);  //official, capital, population, flags.svg, languages
        // render();
      })
      .catch((error) => {
        console.log(error);
      })
    //   .finally(() => {
    //     e.target.reset();
    //   });
    
};
function render() {
    
};
