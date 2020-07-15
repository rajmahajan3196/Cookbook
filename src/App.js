import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const APP_ID = "c3c65c23";
  const APP_KEY = "c7da5b60d30ea4ad26cf6dd9c2265d23";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('apple');

  //use effect runs when page renders
  useEffect(() => {
    getRecipes();
  }, [query]);
  // [] signifies that it will run only once
  const getRecipes = async () => {
    //API call
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits); //sets all the recepies in the state
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <center>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder='Search..' />
          <button className="search-button" type="submit">
            Search
        </button></center>
      </form>
      <div className="recipes-text">
        {recipes.map((
          recipe // map is like for loop
        ) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
