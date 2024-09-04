import {Component} from 'react'

import MovieDBNavbar from '../MovieDBNavbar'

import EachMovieCard from '../EachMovieCard'

import './index.css'

class UpComingMovies extends Component {
  state = {upComingMovies: []}

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US&page=1'
    const response = await fetch(url, {method: 'GET'})
    const parsedData = await response.json()

    const updatedData = parsedData.results.map(eachMovie => ({
      adult: eachMovie.adult,
      id: eachMovie.id,
      backdropPath: eachMovie.backdrop_path,
      genreIds: eachMovie.genre_ids,
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

    await this.setState({upComingMovies: updatedData})
  }

  render() {
    const {upComingMovies} = this.state
    return (
      <div className="upcoming-movies-page">
        <MovieDBNavbar />
        <h1 className="upcoming-movies-heading"> Upcoming </h1>
        <ul className="movie-cards-container">
          {upComingMovies.map(eachMovie => (
            <EachMovieCard eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default UpComingMovies
