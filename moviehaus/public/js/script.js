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



  render : function (){
    console.log('im in the movie')
    return(
      <div className="row">
        <h3>{this.props.details.Title}</h3>
        <img src={this.props.details.Poster} />
        <form ref="addMovieForm">
          <input type="hidden" defaultValue={this.props.details.Poster}  />
          <input type="hidden" defaultValue={this.props.details.Title} />
          <input type="hidden" defaultValue={this.props.details.Year} />
          <input type="submit" defaultValue="Add" />
        </form>
        </div>
    )
  }
})



ReactDOM.render(<App />, document.querySelector('#container'))
