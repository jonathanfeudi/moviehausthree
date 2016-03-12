'use strict'

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {movies:{}}
  },

  render:function() {
    return ( <h1>hoola</>)
  }

});



ReactDOM.render(<App />, document.querySelector('#container'))
