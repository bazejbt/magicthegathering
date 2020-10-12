const cardsEndpoint = "https://api.magicthegathering.io/v1/cards"
const typeEndpoint = "https://api.magicthegathering.io/v1/types"
let fetchedCards;

(() => {
    const userName = localStorage.getItem("username");
      document.querySelector("#header-brand").innerText = `Hello, Planeswalker ${userName}`;
})()

const getTypesDropDown = async () => {
    let typesHtml = "";
    const response = await fetch(typeEndpoint);
    const result = await response.json();
    result.types.forEach(element => {
    typesHtml += `
    <a class="dropdown-item" href="#" id="${element}">${element}</a>
    `    
    });
    document.querySelector("#type-filter").innerHTML = typesHtml;
}

const getAllCards = async() => {
    const response = await fetch(cardsEndpoint);
    const result = await response.json();
    fetchedCards = result.cards;
    render(fetchedCards); 
} 

const clearFilter = () => {
    render(fetchedCards);
}

const render = (cards) => {
    let cardsHtml = "";
    cards.forEach(element => {
        let {imageUrl, name} = element
        if(!imageUrl) {
            imageUrl = `https://i.4pcdn.org/tg/1406992988053.jpg`
        } 
        cardsHtml +=
        `
        <div class="card">
            <img class="card-img" src="${imageUrl}" alt="">
            <h3 class="card-name">${name}</h3>
        </div>
        `
    });
    document.querySelector(".card-list").innerHTML = cardsHtml;
}

const filterByType = (cards, type) => {
    let filteredCards = cards.filter(card => card.type === type)
    render(filteredCards);
}

const filterByColor = (cards, color) => {
    let filteredCards = cards.filter(card =>{
        if(color === "C"){
            console.log(card.colorIdentity);
            if(card.colorIdentity.length === 0){
                return true
            } else {
                return false
            }
        } else {
            return card.colorIdentity.includes(color)
        }

    });
    render(filteredCards);

}

const sortCards = (cards, sortType) => {
    let sortedCards;
        if(sortType === 'sort-asc'){
        sortedCards = cards.sort((a, b) => {
            let nameA = a.name.toUpperCase(); 
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
        })
        } else {
        sortedCards = cards.sort((a, b) => {
            let nameA = a.name.toUpperCase(); 
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
              // names must be equal
              return 0;
        })
    }
    render(sortedCards); 
}

const searchedCard = (cards, input) => {
    let filteredCards = cards.filter(card => card.name.toLowerCase().includes(input.toLowerCase()));
    render(filteredCards);
}

document.querySelector("#color-filter").addEventListener("click", function(e){
    let filterLetter = e.target.id.substring(0, 1);
    filterByColor(fetchedCards, filterLetter);
})

document.querySelector("#clear-filter").addEventListener("click", function(){
    clearFilter();
})

document.querySelector("#type-filter").addEventListener("click", function(e){
    let typeFilter = e.target.id;
    filterByType(fetchedCards, typeFilter);
})

document.querySelector("#sort-control").addEventListener("click", function(e){
    sortCards(fetchedCards, e.target.id);
})

document.querySelector("#search-input").addEventListener("keyup", function(e){
    console.log(e.target.value);
    searchedCard(fetchedCards, e.target.value);
})

getTypesDropDown();
getAllCards();