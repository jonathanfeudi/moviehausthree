'use strict'

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {movies:{}}
  },

  searchMovie:function(name){
    console.log(name)
    $.get('/movies?t=' + name, function(data, status){
        console.log(data)
    });
    // return !this.filterComplete(key)
  },

  render:function() {
    return (
      <div>
        <h1>MovieHaus</h1>
        <CreateMovieForm searchMovie={this.searchMovie}/>
      </div>
    )
  }
});

const CreateMovieForm = React.createClass({
  movieSearch:function(event) {
    event.preventDefault();
    name = this.refs.name.value
    this.props.searchMovie(name);
    this.refs.movieForm.reset();

  },
  render:function() {
    return (
      <form className="movie-search" ref="movieForm" onSubmit={this.movieSearch}>
        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="movie_name">Search By Title</label>
            <input type="text"  id="movie_name" ref="name" />
          </div>
        </div>
        <div className="row">
          <button className="searchButton" type="submit" name="action">Add Movie</button>
        </div>
      </form>
    )
  }
})



ReactDOM.render(<App />, document.querySelector('#container'))
