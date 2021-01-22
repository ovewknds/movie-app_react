import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

/* Function Component
const likeFood = [
  
  {
    id : 1,
    name : "watermelon",
    samdasoo : "jhonmat",
    rating : 5
  },
  {
    id : 2,
    name : "strawberry",
    samdasoo : "fruits",
    rating : 4.9
  },
  {
    id : 3,
    name : "waffle",
    samdasoo : "bread",
    rating : 4.8
  }
]

function Food({name, samdasoo, rating}) {
  return(
  <div>
    <h3>I like {name}</h3>
    <h4>{rating}/5.0</h4>
    <h2>and {samdasoo}</h2>
  </div>
  );
}

Food.propTypes = {
  name : PropTypes.string.isRequired,
  samdasoo : PropTypes.string.isRequired,
  rating : PropTypes.number.isRequired
};

function App() {
  return (
    <div>
    {likeFood.map(brunch => (
      <Food key={brunch.id} name={brunch.name} samdasoo={brunch.samdasoo} rating={brunch.rating} />
      ))}
  </div>
  );
}
*/


/*Class Component

class App extends React.Component{
  state = {
    count : 0
  };

  add = () => {
    this.setState(current => ({ count : current.count + 1 }));
  };
  minus = () => {
    this.setState(current => ({ count : current.count - 1 }));
  };

  render() {
    return(
      <div>
        <h1>The number is : {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    )
  };
};
*/



class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  };

  getMovies = async () => {
    const {data : { data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading : false});
  };

  componentDidMount(){
    this.getMovies();
  };
  render(){
    const { isLoading, movies } = this.state;
    return (
      <section class="container">
        {isLoading 
          ? (<div class="loader">
            <span class="loader__text">Loading...</span>
          </div>) 
          : ( <div class= "movies">
            {movies.map(movie => (
              <Movie 
              key={movie.id}
              id={movie.id} 
              year={movie.year} 
              title={movie.title} 
              summary={movie.summary}
              poster={movie.medium_cover_image}
              />
            ))}
          </div>
          )
        }
      </section>
    );
  };
};
export default App;
