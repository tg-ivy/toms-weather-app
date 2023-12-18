console.log("hi")

// Event declarations

const inputEl = document.getElementById('search-input');
const submitEL = document.getElementById('search-button');

submitEL.addEventListener('click', (e) => {
    e.preventDefault();
    clickOnMe();
});

function clickOnMe() {
    console.log('hi again');
};



