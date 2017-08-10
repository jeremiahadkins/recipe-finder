let $ = require('jquery');
let handlebars = require('handlebars');

let $searchBox = $('.recipe-search'); 
let url = 'https://recipepuppyproxy.herokuapp.com/api/';

// default data with blank search query
fetch(url + '?q=').then(function(response) {
  return response.json();
}).then(start);

$('.search-btn').on('click', function(event) {
  event.preventDefault();
  let userSearch = $searchBox.val();
  let searchQuery = '?q=' + userSearch;

  $('.recipes-wrapper').empty();
  fetch(url + searchQuery).then(function(response) {
    return response.json();
  }).then(start);
  console.log(url);
  console.log(searchQuery);
});



function start(ajaxRequest) {
  let recipes = '';
  recipes = ajaxRequest.results;
  displayRecipe(recipes);
}


function displayRecipe(recipes){
  // this is the script tag dumbass
  // source is the template
  let $source = $('.recipe-template').html();
  
  // this compiles the script in previous tag
  // need to compile source(template)
  let template = handlebars.compile($source);

  recipes.forEach( function(recipe) {
    console.log(recipe);
    $('.recipes-wrapper').append(template(recipe));
  });
}
