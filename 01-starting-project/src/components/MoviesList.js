import React, {Fragment} from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';


const MovieList = (props) => {
  async function deleteHandler(id) {
    try {
      const response = await fetch(
        `https://movies-app-8a39b-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      console.log(err.message);
    }
    props.getMovies();
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Fragment>
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
        <button
        key={`Button ${movie.id}`}
        onClick={deleteHandler.bind(null, movie.id)}
      >{`Delete ${movie.title} from list`}</button>
      </Fragment>
      ))}
    </ul>
  );
};

export default MovieList;
