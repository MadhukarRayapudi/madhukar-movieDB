import {Component} from 'react'

import EachMovieCard from '../EachMovieCard'

import MovieDBNavbar from '../MovieDBNavbar'

import './index.css'

class SearchedMovies extends Component {
  state = {searchedMovieDetails: []}

  componentDidMount() {
    this.getSearchedMovieDetails()
  }

  getSearchedMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {name} = params
    // console.log(name)

    const url = `https://api.themoviedb.org/3/search/movie?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US&query=${name}&page=1`

    const response = await fetch(url, {method: 'GET'})
    const parsedResponse = await response.json()
    console.log(parsedResponse)

    const updatedResponse = parsedResponse.results.map(eachResult => ({
      id: eachResult.id,
      title: eachResult.title,
      voteAverage: eachResult.vote_average,
      voteCount: eachResult.vote_count,
      posterPath: eachResult.poster_path,
    }))
    await this.setState({searchedMovieDetails: updatedResponse})
  }

  render() {
    const {searchedMovieDetails} = this.state
    return (
      <>
        <MovieDBNavbar />
        <ul className="searched-movies-container">
          {searchedMovieDetails.map(eachMovie => (
            <EachMovieCard eachMovie={eachMovie} />
          ))}
        </ul>
      </>
    )
  }
}

export default SearchedMovies
