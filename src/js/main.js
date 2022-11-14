'use strict';

//Traer elementos HTML

const inputElement = document.querySelector('.js-input');
const btnSearchElement = document.querySelector('.js-btnSearch');
const characterList = document.querySelector('.js-characterList');
const favoriteList = document.querySelector('.js-favoriteList');
const btnResetFavourites = document.querySelector('.js-resetBtn');


//variables Globales
let allCharacters = [];
let favCharacters = [];
let userSearch = '';
const urlApiAll ='https://breakingbadapi.com/api/characters';


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

//Traernos la infomación de la API
function fetchCharacters (url) {
  fetch(url)
    .then((response)=>response.json())
    .then((jsonData)=>{
      allCharacters = jsonData;
      renderCharacter (allCharacters,characterList);
    });
}



//comparar tarjetas en Characters y en Favorites
/* function isInFavorite (article, renderLocalSotarge){
  for (const favArticle of favCharacters) {
  if (favArticle.id === article.id) {
    article.classList.add('selected');
  }}} */




/* function compareFavorite(){
  const articlesCharacters = characterList.querySelectorAll('.article');
  const articlesFavorites = favoriteList .querySelectorAll('.article');

  for (const article of articlesCharacters) {
    const articlesInFavoritesIndex = articlesFavorites.findIndex((eachArticle) => eachArticle.id === article.id);
    if (!articlesInFavoritesIndex === -1) {
      article.classList.add('selected');
      return allCharacters;}
  }
}
 */



//Recuperar información localStorage
function renderLocalSotarge (){
  if (savedFavourites !== null) {
    favCharacters = savedFavourites;
    renderCharacter (favCharacters,favoriteList);
  }}

//----EVENTOS----
//-botón busqueda

function handleClickSearch(event) {
  characterList.innerHTML='';
  event.preventDefault();
  userSearch = inputElement.value.toLowerCase();
  let filterdCharacters = allCharacters.filter((eachCharacter) => eachCharacter.name.toLowerCase().includes(userSearch));
  if (userSearch===''){filterdCharacters=allCharacters;}
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
  const selectedId= parseInt(selected.id);
  const selectedCharacter = allCharacters.find((eachCharacter)=> eachCharacter.char_id=== selectedId);
  const selectedCharacterIndex = favCharacters.findIndex((eachCharacter) => eachCharacter.char_id=== selectedId);

  if (selectedCharacterIndex === -1) {
    favCharacters.push(selectedCharacter);
    selected.classList.add('selected');
  } else {
    favCharacters.splice(selectedCharacterIndex, 1);
    selected.classList.remove('selected');
  }

  localStorage.setItem('favoritesStorage', JSON.stringify(favCharacters));
  favoriteList.innerHTML='';
  renderCharacter (favCharacters,favoriteList);
}


//-evento botón borrar favoritos
function cleanFavorites () {
  favCharacters = [];
  favoriteList.innerHTML='';
  localStorage.removeItem('favoritesStorage');
  const articlesCharacters = characterList.querySelectorAll('.article');
  for (const article of articlesCharacters) {
    article.classList.remove('selected');
  }
  renderCharacter (allCharacters,characterList);
}


//----LLAMAR FUNCIONES---

fetchCharacters (urlApiAll);
btnSearchElement.addEventListener('click', handleClickSearch);
const savedFavourites = JSON.parse(localStorage.getItem('favoritesStorage'));
renderLocalSotarge ();
btnResetFavourites.addEventListener('click', cleanFavorites);
