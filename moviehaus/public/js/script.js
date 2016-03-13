'use strict'

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {movies:{}}
  },

  renderMovieSearch:function(data) {
    // console.log('render', data)
    this.state.movies = JSON.parse(data);
    this.setState({ movies: this.state.movies })
    console.log(this.state.movies.Search[0].Title)
    var b = this.state.movies.Search
    // var array = [];
    b.Search.forEach((movie)=> {
      console.log(movie)
    })
  },


  render:function() {
    return (
      <div>

        <h1>MovieHaus</h1>
        <CreateMovieForm renderMovieSearch={this.renderMovieSearch}/>

        <div>{}
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



ReactDOM.render(<App />, document.querySelector('#container'))
