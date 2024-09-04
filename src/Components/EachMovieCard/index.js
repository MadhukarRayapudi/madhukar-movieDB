import {CiStar} from 'react-icons/ci'

import {Link} from 'react-router-dom'

// import SingleMovieDetailsPage from '../SingleMovieDetailsPage'

import './index.css'

const EachMovieCard = props => {
  const {eachMovie} = props

  return (
    <li className="each-movie-card">
      <Link to={`/movie/${eachMovie.id}`} className="link">
        <img
          src={`https://image.tmdb.org/t/p/w500${eachMovie.posterPath}`}
          alt={eachMovie.title}
          className="movie-img"
        />
        <h1 className="movie-title"> {eachMovie.title} </h1>
        <div className="rating-and-details-btn-container">
          <div className="star-icon-and-rating-container">
            <CiStar className="star-icon" />
            <p className="movie-rating"> {eachMovie.voteAverage} </p>
            <p className="movie-rating"> ({eachMovie.voteCount}) </p>
          </div>
          <button className="view-details-btn" type="button">
            View Details
          </button>
        </div>
      </Link>
    </li>
  )
}

export default EachMovieCard
