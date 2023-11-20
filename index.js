// base endpoint ot get data from
const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const data = [];

// gets the data from the source
fetch(url)
  .then((response) => response.json())
  .then((fetchedData) => data.push(...fetchedData));

// finds all matches
const findMatchedCities = (query, arr) => {
  return arr.filter((place) => {
    const regex = new RegExp(query, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

// adds comma to numbers
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// displays the result to the screen
function displayData() {
  const foundMatches = findMatchedCities(this.value, data);
  if (!foundMatches) {
    return suggestions.innerHTML = ''
  }
  const html = foundMatches.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`)
    return `
  <li>
  <span class='name'>${cityName}, ${stateName}</span>
    <span class='population'>${numberWithCommas(place.population)}</span>   
  <li>
  `
  }).join('');
  output.innerHTML = html;
}

//  refreshes the page
const refreshScreen = () => {
  window.location.reload('Refresh');
}

// DOM elements
const searchInput = document.querySelector(".search");
const output = document.querySelector(".output");
const btn = document.querySelector('button');

// add events listeners to DOM elements
searchInput.addEventListener("change", displayData);
searchInput.addEventListener("keyup", displayData);

btn.addEventListener('click', refreshScreen);