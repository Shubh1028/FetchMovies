import React from 'react'
import '../App.css'

const Form = (props) => {
    return (
        <section>
        <form onSubmit={props.onClick}>
          <div>
            <label htmlFor="title">Title</label>
            <input type='text' id="title" />
          </div>
          <div>
            <label htmlFor="openingText">Opening Text</label>
            <textarea id="openingText" rows={5}/>
          </div>
          <div>
            <label htmlFor="rdate">Release Date</label>
            <input type='date' id="rdate" />
          </div>
          <button type='submit'>Add Movie</button>
        </form>
        </section>
    )
}

export default Form