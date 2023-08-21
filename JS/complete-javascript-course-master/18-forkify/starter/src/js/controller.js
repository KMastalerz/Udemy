import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import {MODAL_CLOSE_SEC} from './config.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime'

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    // 1. Get hash from url
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 2. Update reuslts view to mark selected search
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
   
    // 3. Loading recipe
    await model.loadRecipe(id);

    // 4. Rendering recipe
    recipeView.render(model.state.recipe);
  }
  catch(err){
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();

    if(!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render initial pagination
    paginationView.render(model.state.search);
  }
  catch(err){
    console.error('controlSearchResults: ', err);
  }
}

const controlPagination = async function(goTo){
  //Render results
  resultsView.render(model.getSearchResultsPage(goTo))
  //Change buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //Update recipe servings (in state)
  model.updateServings(newServings);

  //Update recipe view
  recipeView.update(model.state.recipe);
}

const controlChangeBookmark = function(){
  const bookmarked = model.state.recipe.bookmarked;
  //Add bookmark to state
  if(!bookmarked)  model.addBookmark(model.state.recipe);
  //Remove bookmark from state
  if(bookmarked)  model.deleteBookmark(model.state.recipe.id);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //render bookmarkd
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){

  try{
    //Show loading spinner
    addRecipeView.renderSpinner();

    //Upload the new recipe
    await model.uploadRecipe(newRecipe);
    
    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //render bookmarks
    bookmarksView.render(model.state.bookmarks);

    // chande ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    //window.history.back(); -> go back

    //close form window
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }
  catch(err){
    addRecipeView.renderError(err);
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlChangeBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init();