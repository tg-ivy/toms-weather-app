
// Event declarations


// For API Key
const apiKey = "7867288bff076c11ab0fe1c5a52166df"

// For form
const inputEl = document.getElementById('search-input');
const submitEL = document.getElementById('search-button');
const historyEl = document.getElementById('history-container')
let searchArr =[];

// For later use 
let userSearch;
let queryURL;

// For weather card
const cardCityName = document.getElementById('card-city-name');
const cardDate = document.getElementById('card-date')
const cardTemp = document.getElementById('temp');
const cardWind = document.getElementById('wind');
const cardHumidity = document.getElementById('humidity');

// For the weather boxes
const boxContainer = document.getElementById('weather-boxes-container')

// Event Listener that grabs user input and feeds it into fetch request to get data back into the HTML

submitEL.addEventListener('click', (e) => {
    e.preventDefault();

    userSearch = inputEl.value;
    console.log(userSearch)

    addToStorage(userSearch);
    addToHistoryElement();
    createURL(userSearch);
    fetchData();
});

// Function that puts user's search into queryURL

function createURL(search) {
    queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + apiKey + "&units=metric";
    console.log(queryURL);
}


// Function that fetches data and applies it to html

function fetchData() {
    fetch(queryURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);



        // Appending to the weather card
        cardCityName.textContent = data.city.name;
        cardDate.textContent = data.list[0].dt_txt;
        cardTemp.textContent = 'Temp: ' + data.list[0].main.temp + '°C';
        cardWind.textContent = 'Windspeed: ' + data.list[0].wind.speed + 'k/h';
        cardHumidity.textContent = 'Humidity ' + data.list[0].main.humidity;

        // Clearing any previous searches' boxes
        while (boxContainer.firstChild) {
            boxContainer.removeChild(boxContainer.lastChild);
          }

        // Appending to all boxes
        for (i = 0; i < data.list.length; i++) {
            let weatherBox = document.createElement('div')
            
            let boxDate = document.createElement('p');
            boxDate.textContent = data.list[i].dt_txt;
            weatherBox.appendChild(boxDate);

            let boxIcon = document.createElement('img')
            boxIcon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
            weatherBox.appendChild(boxIcon);

            let boxTemp = document.createElement('p');
            boxTemp.textContent = 'Temp: ' + data.list[i].main.temp + '°C'
            weatherBox.appendChild(boxTemp);

            let boxWind = document.createElement('p');
            boxWind.textContent = 'Windspeed: ' + data.list[i].wind.speed + 'k/h';
            weatherBox.appendChild(boxWind);

            let boxHumidity = document.createElement('p');
            boxHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity;
            weatherBox.appendChild(boxHumidity);

            boxContainer.appendChild(weatherBox);
        }
    })
}

// Function that adds search to local storage
function addToStorage(searchInput) {
    searchArr.push(searchInput);
    localStorage.setItem("History", JSON.stringify(searchArr));
    console.log('local below')
    console.log(localStorage)
}


// Function that appends search to search history element in HTML

function addToHistoryElement() {
    let historyArr = JSON.parse(localStorage.getItem("History"));
    for (i = 0; i < historyArr.length; i++) {
        // Appends city to search history
        let cityEl = document.createElement('div');
        cityEl.textContent = historyArr[i];
        console.log(historyEl)
        historyEl.appendChild(cityEl);

        // Adds event listener to each city element
        cityEl.addEventListener('click', (e) => {
            e.preventDefault();

            createURL(cityEl.textContent);
            fetchData();
        })
        
    }
}

// Calling the function on page load

addToHistoryElement();