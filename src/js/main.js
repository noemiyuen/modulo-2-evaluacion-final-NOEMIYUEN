'use strict';

//Traer elementos HTML

const inputElement = document.querySelector('.js-input');
const btnSearchElement = document.querySelector('.js-btnSearch');
const characterList = document.querySelector('.js-characterList');
const favoriteList = document.querySelector('.js-favouriteList');

//variables Globales
let allCharacters = [];
let favCharacters = [];



//Crear en Dom HTML
function renderCharacter (objetoCharacter, section){
  section.innerHTml='';

  for(const character of objetoCharacter) {
    const listElement = document.createElement('li');
    listElement.classList.add('section__list--element');

    const article = document.createElement('article');
    article.classList.add('article');
    article.id = character.char_id;

    const imgCh = document.createElement('figure');
    imgCh.classList.add('article__imgBox');
    const imgChcont = document.createElement('img');
    imgChcont.src = character.img;
    imgChcont.classList.add('article__imgBox--img');
    imgChcont.dataset.alt=`foto de ${character.name} `;
    imgCh.appendChild(imgChcont);

    const nameCh = document.createElement('h3');
    nameCh.classList.add('article__name');
    const nameText = document.createTextNode(character.name);

    nameCh.appendChild(nameText);
    const statusCh = document.createElement ('p');
    statusCh.classList.add('article__status');
    const statusText = document.createTextNode(character.status);
    statusCh.appendChild(statusText);
    article.appendChild(imgCh);
    article.appendChild(nameCh);
    article.appendChild(statusCh);
    listElement.appendChild(article);

    section.appendChild(listElement);
  }
  cardListener ();
}

let userSearch = '';
const urlApiAll ='https://breakingbadapi.com/api/characters';
/* let urlApName =`https://breakingbadapi.com/api/characters?name=${userSearch}`; */



//Traernos la infomación de la API

function fetchCharacters (url) {
  fetch(url)
    .then((response)=>response.json())
    .then((jsonData)=>{
      allCharacters = jsonData;
      renderCharacter (allCharacters,characterList);
    });
    }



//eventos
//-botón busqueda

function handleClickSearch(event) {
  characterList.innerHTML='';
  event.preventDefault();
  userSearch = inputElement.value.toLowerCase();
  const filterdCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));

  renderCharacter (filterdCharacters,characterList);
}
//-evento en tarjetas selección y favoritos

function cardListener () {
  const articlesElementAll = document.querySelectorAll('.article');
  for (const article of articlesElementAll) {
    article.addEventListener('click', handleClickCard);
  }
}

function handleClickCard (event){
  const selected = event.currentTarget;
  selected.classList.toggle('selected');
  const selectedId= parseInt(selected.id);
  console.log(selectedId);

  const selectedCharacter = allCharacters.find((eachCharacter)=> eachCharacter.char_id=== selectedId);
  console.log(selectedCharacter);

  const selectedCharacterIndex = favCharacters.findIndex((eachCharacter) => eachCharacter.char_id=== selectedId);
  console.log(selectedCharacterIndex);
  if (selectedCharacterIndex === -1) {
    favCharacters.push(selectedCharacter);

  } else {
    favCharacters.splice(selectedCharacterIndex, 1);
  }
  console.log(favCharacters);

  localStorage.setItem('favoritesStorage', JSON.stringify(favCharacters));
  favoriteList.innerHTML='';

  renderCharacter (favCharacters,favoriteList);

}

//llamar a las funciones
fetchCharacters (urlApiAll);
btnSearchElement.addEventListener('click', handleClickSearch);
const savedFavourites = JSON.parse(localStorage.getItem('favoritesStorage'));
console.log(savedFavourites);
if (savedFavourites !== null) {
    favCharacters = savedFavourites;
    renderCharacter (favCharacters,favoriteList);
  }

