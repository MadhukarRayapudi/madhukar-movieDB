import './index.css'

const EachCastCard = props => {
  const {eachCast} = props

  return (
    <li className="each-cast-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${eachCast.imageUrl}`}
        alt={eachCast.originalName}
        className="cast-img"
      />
      <p className="name">
        <span className="name-span">Name</span>: {eachCast.originalName}
      </p>
      <p className="name">
        <span className="name-span">Character</span>: {eachCast.characterName}
      </p>
    </li>
  )
}

export default EachCastCard
