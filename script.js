console.log("hi")

// Event declarations

const apiKey = "7867288bff076c11ab0fe1c5a52166df"

const inputEl = document.getElementById('search-input');
const submitEL = document.getElementById('search-button');
let userSearch;
let queryURL;

const cardCityName = document.getElementById('card-city-name');
const cardDate = document.getElementById('card-date')

// Event Listener that grabs user input and 

submitEL.addEventListener('click', (e) => {
    e.preventDefault();

    userSearch = inputEl.value;
    console.log(userSearch)
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
        console.log(data.city.name)
        console.log(data.list[0].dt_txt);
        // Appending to the weather card
        cardCityName.textContent = data.city.name;
        cardDate.textContent = data.list[0].dt_txt;
    })
}

