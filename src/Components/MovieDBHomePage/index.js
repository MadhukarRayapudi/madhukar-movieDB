import {Component} from 'react'

import EachMovieCard from '../EachMovieCard'

import MovieDBNavbar from '../MovieDBNavbar'

import './index.css'

class MovieDBHomePage extends Component {
  state = {popularMovies: [], pageNumber: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickPrevBtn = async () => {
    const {pageNumber} = this.state

    if (pageNumber > 1) {
      await this.setState(prevState => ({pageNumber: prevState.pageNumber - 1}))
    }
    this.getPopularMovies()
  }

  onClickNextBtn = async () => {
    await this.setState(prevState => ({pageNumber: prevState.pageNumber + 1}))
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US&page=${pageNumber}`
    const options = {
      method: 'GET',
    }
    const popularMovies = await fetch(url, options)
    console.log(popularMovies.ok)
    if (popularMovies.ok) {
      const jsonResponse = await popularMovies.json()
      // console.log(jsonResponse)
      const updatedData = jsonResponse.results.map(eachMovie => ({
        adult: eachMovie.adult,
        backdropPath: eachMovie.backdrop_path,
        genreIds: eachMovie.genre_ids,
        id: eachMovie.id,
        originalLanguage: eachMovie.original_language,
        originalTitle: eachMovie.original_title,
        overview: eachMovie.overview,
        popularity: eachMovie.popularity,
        posterPath: eachMovie.poster_path,
        releaseDate: eachMovie.release_date,
        title: eachMovie.title,
        video: eachMovie.video,
        voteAverage: eachMovie.vote_average,
        voteCount: eachMovie.vote_count,
      }))
      // console.log(updatedData)
      await this.setState({popularMovies: updatedData})
    } else {
      console.log('Error retrieving data')
    }
  }

  render() {
    const {popularMovies, pageNumber} = this.state
    return (
      <>
        <MovieDBNavbar />
        <div className="home-page-excluding-nav">
          <h1 className="popular-movies-heading"> Popular </h1>
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
            {popularMovies.map(eachMovie => (
              <EachMovieCard eachMovie={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default MovieDBHomePage
