import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

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
  const [movies, fetchMovies] = useState([])
  const [loader, isLoading] = useState(false)
  async function  fetchMovieHandler(){
    isLoading(true);

  const response =  await fetch('https://swapi.dev/api/films/')
  

  const data = await response.json()

      const tranformMovies = data.results.map((movieData)=>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
    });
    fetchMovies(tranformMovies)
    isLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
       {!loader && <MoviesList movies={movies} />}
       {loader && <p>Loading... Please Wait..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
