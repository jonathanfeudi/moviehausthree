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
    <Movie key={key} index={key} details={this.state.movies[key]} addMovie={this.addMovie}/>

    )
      console.log('im in the renderMyMovie')
  },

  addMovie: function (oneMovie) {
    var updateOneMovie = (data) =>{
      var newID = data.id
      this.state.movies[newID] = data;

      this.setState({ movies: this.state.movies });
    }

    $.post('/movies/api', oneMovie)
    .done(updateOneMovie)



},



  render:function() {
    return (
      <div className="container">
        <div className="row">
          <h1>MovieHaus</h1>
        </div>
        <div className="row">
          <CreateMovieForm renderMovieSearch={this.renderMovieSearch}/>
          <h3>{Object.keys(this.state.movies).map( this.renderMyMovie )}</h3>
      </div>
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
  handleSubmit : function (event) {
    event.preventDefault()
    var oneMovie = {
      poster: this.refs.poster.value,
      title: this.refs.title.value,
      year: this.refs.year.value
  }

  this.props.addMovie(oneMovie)
  this.refs.addMovieForm.reset()
  $
  },




  render : function (){
    console.log('im in the movie')
    return(
      <div className="row">
        <h3>{this.props.details.Title}</h3>
        <img src={this.props.details.Poster} />
        <form id = "form" ref="addMovieForm" onSubmit={this.handleSubmit}>
          <input ref="poster" type="hidden" defaultValue={this.props.details.Poster}  />
          <input ref="title" type="hidden" defaultValue={this.props.details.Title} />
          <input ref="year" type="hidden" defaultValue={this.props.details.Year} />
          <input type="submit" defaultValue="Add" />
        </form>
      </div>
    )
  }
})



ReactDOM.render(<App />, document.querySelector('#container'))
