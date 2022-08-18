import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import Form from './components/Form'
import "./App.css";

function App() {
  
  const [movies, fetchMovies] = useState([]);
  const [loader, isLoading] = useState(false);
  const [error, isError] = useState(null);

  // async function fetchMovieHandler() {
  const fetchMovieHandler = useCallback(async () => {
    isLoading(true);
    isError(null);

    try {
      const response = await fetch("https://movies-app-8a39b-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something Went Wrong... Retrying");
      }
      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          description: data[key].desc,
          releaseDate: data[key].rdate
        })
      }
     
      fetchMovies(loadedMovies);
    } catch (error) {
      isError(error.message);
    }
    isLoading(false);
  }, []);

  useEffect(fetchMovieHandler, [fetchMovieHandler]);

 async function formHandler(event){
    event.preventDefault();
    const NewMovieObj = {
      title: event.target[0].value,
      desc: event.target[1].value,
      rdate: event.target[2].value
    }
    const response = await fetch('https://movies-app-8a39b-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(NewMovieObj),
    })
    const data = await response.json()
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <Form onClick={formHandler}/>
      </section>

      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loader && <MoviesList movies={movies}  getMovies={fetchMovieHandler}/>}
        {loader && !error && <p>Loading... Please Wait..</p>}
        {!loader && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
