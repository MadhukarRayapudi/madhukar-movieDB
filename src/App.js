import {Switch, Route} from 'react-router-dom'

import MovieDBHomePage from './Components/MovieDBHomePage'

import TopRatedMoviesPage from './Components/TopRatedMoviesPage'

import UpComingMovies from './Components/UpComingMovies'

import SingleMovieDetailsPage from './Components/SingleMovieDetailsPage'

import SearchedMovies from './Components/SearchedMovies'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={MovieDBHomePage} />
    <Route exact path="/top-rated" component={TopRatedMoviesPage} />
    <Route exact path="/upcoming" component={UpComingMovies} />
    <Route exact path="/movie/:id" component={SingleMovieDetailsPage} />
    <Route exact path="/search-results/:name" component={SearchedMovies} />
  </Switch>
)

export default App
