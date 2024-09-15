import {Component} from 'react'

import MovieDBNavbar from '../MovieDBNavbar'

import EachMovieCard from '../EachMovieCard'

import './index.css'

class TopRatedMoviesPage extends Component {
  state = {topRatedMovies: [], pageNumber: 1}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  onClickPrevBtn = async () => {
    const {pageNumber} = this.state

    if (pageNumber > 1) {
      await this.setState(prevState => ({pageNumber: prevState.pageNumber - 1}))
    }
    this.getTopRatedMovies()
  }

  onClickNextBtn = async () => {
    await this.setState(prevState => ({pageNumber: prevState.pageNumber + 1}))
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {pageNumber} = this.state
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US&page=${pageNumber}`

    const response = await fetch(url, {method: 'GET'})
    const parsedData = await response.json()

    const updatedData = parsedData.results.map(eachMovie => ({
      adult: eachMovie.adult,
      id: eachMovie.id,
      genreIds: eachMovie.genre_ids,
      originalLanguage: eachMovie.original_language,
      originalTitle: eachMovie.original_title,
      overview: eachMovie.overview,
      popularity: eachMovie.popularity,
      posterPath: eachMovie.poster_path,
      releaseDate: eachMovie.release_date,
      title: eachMovie.title,
      voteAverage: eachMovie.vote_average,
      voteCount: eachMovie.vote_count,
    }))

    await this.setState({topRatedMovies: updatedData})
  }

  render() {
    const {topRatedMovies, pageNumber} = this.state
    return (
      <div className="top-rated-page-bg">
        <MovieDBNavbar />
        <h1 className="top-rated-movies-heading"> Top Rated </h1>
        <div className="prev-btn-and-page-no-container">
          <button
            className="prev-btn"
            type="button"
            onClick={this.onClickPrevBtn}
          >
            Prev
          </button>
          <p className="page-no"> Page No. </p>
          <p className="page-no"> {pageNumber} </p>
          <button
            className="prev-btn"
            onClick={this.onClickNextBtn}
            type="button"
          >
            Next
          </button>
        </div>
        <ul className="movie-cards-container">
          {topRatedMovies.map(eachMovie => (
            <EachMovieCard eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TopRatedMoviesPage
