import {Component} from 'react'

// import {CiStar} from 'react-icons/ci'

import MovieDBNavbar from '../MovieDBNavbar'

import EachCastCard from '../EachCastCard'

import './index.css'

class SingleMovieDetailsPage extends Component {
  state = {movieDetails: [], castDetails: []}

  componentDidMount() {
    this.getSearchedMovieDetails()
  }

  getSearchedMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US`

    const movieDetails = await fetch(url, {method: 'GET'})
    const parsedMovieDetails = await movieDetails.json()
    // console.log(parsedMovieDetails)
    const updatedMovieDetails = {
      title: parsedMovieDetails.title,
      posterPath: parsedMovieDetails.poster_path,
      releaseDate: parsedMovieDetails.release_date,
      runtime: parsedMovieDetails.runtime,
      genres: parsedMovieDetails.genres,
      overview: parsedMovieDetails.overview,
      rating: parsedMovieDetails.vote_average,
      votes: parsedMovieDetails.vote_count,
    }

    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=00422fa257f90b09d34ccab35d289e80&language=en-US`
    const castDetails = await fetch(castUrl, {method: 'GET'})
    const parsedCastDetails = await castDetails.json()
    // console.log(parsedCastDetails)

    const updatedCastDetails = parsedCastDetails.cast.map(eachCast => ({
      id: eachCast.id,
      characterName: eachCast.character,
      originalName: eachCast.original_name,
      imageUrl: eachCast.profile_path,
    }))
    // console.log(updatedCastDetails)

    // console.log(updatedMovieDetails)
    await this.setState({
      movieDetails: updatedMovieDetails,
      castDetails: updatedCastDetails,
    })
  }

  render() {
    const {movieDetails, castDetails} = this.state
    return (
      <>
        <MovieDBNavbar />
        <div className="single-movie-details-page">
          <div className="image-and-movie-details-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`}
              alt={movieDetails.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h1 className="movie-name"> {movieDetails.title} </h1>
              <div className="movie-details-excluding-title">
                <p className="rating"> {movieDetails.rating} </p>
                <p className="rating-count"> ({movieDetails.votes}) | </p>
                <p className="duration">
                  duration: {movieDetails.runtime}min |
                </p>
                <div className="force-line-break"> </div>
                <p className="genre"> Genre: </p>
                {movieDetails.genres &&
                  movieDetails.genres.length > 0 &&
                  movieDetails.genres.map(eachGenre => (
                    <p className="genre" key={eachGenre.id}>
                      {eachGenre.name}.
                    </p>
                  ))}
                <div className="force-line-break"> </div>
                <div className="release-date-and-overview-container">
                  <p className="release-date">
                    Release Date:
                    <span className="date-span">
                      {movieDetails.releaseDate}
                    </span>
                  </p>
                  <div className="force-line-break"> </div>
                  <div className="overview-container">
                    <p className="about-heading"> About: </p>
                    <p className="overview">{movieDetails.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="cast-heading">CAST</h1>
          <ul className="cast-details-container">
            {castDetails.map(eachCast => (
              <EachCastCard eachCast={eachCast} key={eachCast.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default SingleMovieDetailsPage
//  <CiStar className="star-icon" />
