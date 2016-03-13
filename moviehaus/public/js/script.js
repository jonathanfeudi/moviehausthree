'use strict'

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {movies:{}}
  },

  renderMovieSearch:function(data) {
    // console.log('render', data)
    this.state.movies = JSON.parse(data)
    this.state.movies = this.state.movies.Search
    this.setState({ movies: this.state.movies })
    console.log(this.state.movies)

  },

  renderMyMovie : function(key) {
    return (
    <Movie key={key} index={key} details={this.state.movies[key]} />

    )
      console.log('im in the renderMyMovie')
  },


  render:function() {
    return (
      <div>

        <h1>MovieHaus</h1>

        <CreateMovieForm renderMovieSearch={this.renderMovieSearch}/>
        <h3>{Object.keys(this.state.movies).map( this.renderMyMovie )}</h3>

      </div>
    )
  }
});

const CreateMovieForm = React.createClass({
  handleSearch:function(event) {
    event.preventDefault();
    name = this.refs.name.value
    this.searchMovie(name);
    this.refs.movieForm.reset();
  },

  searchMovie:function(name){
    var that = this;
    $.get('/movies?t=' + name, function(data, status ){
        // console.log(data)
    })
    .done(function( data ) {
      that.props.renderMovieSearch(data);
    });

    // return !this.filterComplete(key)
  },

  render:function() {
    return (
      <form className="movie-search" ref="movieForm" onSubmit={this.handleSearch}>
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

const Movie = React.createClass({

  render : function (){
    console.log('im in the movie')
    return(
      <div>
        <h1>{this.props.details.Title}</h1>
        <h2>{this.props.details.Year}</h2>
        
      </div>
    )
  }
})



ReactDOM.render(<App />, document.querySelector('#container'))
