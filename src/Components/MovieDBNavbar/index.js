import {Component} from 'react'

import {withRouter} from 'react-router-dom'

// import SearchedMovies from '../SearchedMovies'

import './index.css'

class MovieDBNavbar extends Component {
  state = {searchBoxValue: ''}

  onClickPopularBtn = () => {
    const {history} = this.props
    history.push('/')
  }

  onClickTopRatedBtn = () => {
    const {history} = this.props
    history.push('/top-rated')
  }

  onClickUpcomingBtn = () => {
    const {history} = this.props
    history.push('/upcoming')
  }

  onClickSearchBtn = () => {
    const {searchBoxValue} = this.state
    const {history} = this.props
    history.push(`/search-results/${searchBoxValue}`)
  }

  onClickHomeBtn = () => {
    const {history} = this.props
    history.replace('/')
  }

  onChangeInputBoxValue = event =>
    this.setState({searchBoxValue: event.target.value})

  render() {
    return (
      <div className="navbar">
        <h1 className="title" onClick={this.onClickHomeBtn}>
          movieDB
        </h1>
        <div>
          <button
            className="nav-btn"
            type="button"
            onClick={this.onClickPopularBtn}
          >
            Popular
          </button>
          <button
            className="nav-btn"
            type="button"
            onClick={this.onClickTopRatedBtn}
          >
            Top Rated
          </button>
          <button
            className="nav-btn"
            type="button"
            onClick={this.onClickUpcomingBtn}
          >
            Upcoming
          </button>
        </div>
        <div className="search-box-and-btn-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search"
            onChange={this.onChangeInputBoxValue}
          />
          <button
            className="search-btn"
            type="button"
            onClick={this.onClickSearchBtn}
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieDBNavbar)
