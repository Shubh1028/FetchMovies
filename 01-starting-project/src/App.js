import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, fetchMovies] = useState([]);
  const [loader, isLoading] = useState(false);
  const [error, isError] = useState(null);
  async function fetchMovieHandler() {
    isLoading(true);
    isError(null)

    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Something Went Wrong... Retrying");
      }
      const data = await response.json();
      const tranformMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      fetchMovies(tranformMovies);
    } catch(error) {
      isError(error.message)

     setInterval(fetchMovieHandler, 5000);
    }
    isLoading(false);


    // const data = await response.json()

    //     const tranformMovies = data.results.map((movieData)=>{
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseDate: movieData.release_date
    //       }
    //   });
    //   fetchMovies(tranformMovies)
    //   isLoading(false)
  }
 

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>

      </section>
      <section>
        {!loader && <MoviesList movies={movies} />}
        {loader && !error && <p>Loading... Please Wait..</p>}
        {!loader && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
