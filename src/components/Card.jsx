import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCharacterImage } from "../utils/simpsonsData";
import { escapeSVG, formatGender } from "../utils/formatters";

export const Card = ({ item, onAddFavorite, isFavorite }) => {
  const handleImageError = (e) => {
    const svg = `
      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#FFD90F"/>
        <text x="150" y="150" font-size="24" text-anchor="middle" fill="#000" font-weight="bold">${escapeSVG(item.name)}</text>
      </svg>
    `;
    e.target.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className="card h-100" style={{
      backgroundColor: "#87CEEB",
      border: "3px solid #000",
      borderRadius: "10px"
    }}>
      <img
        src={getCharacterImage(item.id)}
        className="card-img-top"
        alt={`Portrait of ${item.name}, character from The Simpsons`}
        onError={handleImageError}
        style={{
          height: "250px",
          objectFit: "contain",
          backgroundColor: "#87CEEB",
          padding: "10px"
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center" style={{
          fontWeight: "bold",
          color: "#000",
          fontSize: "1.1rem"
        }}>
          {item.name}
        </h5>
        {item.gender && (
          <p className="text-center mb-2" style={{ color: "#000", fontSize: "0.9rem" }}>
            {formatGender(item.gender)}
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Link
            to={`/character/${item.id}`}
            className="btn btn-sm"
            style={{
              backgroundColor: "#FFD90F",
              color: "#000",
              border: "2px solid #000",
              fontWeight: "bold"
            }}
          >
            Learn more!
          </Link>
          <button
            className="btn btn-sm"
            onClick={() => onAddFavorite(item)}
            aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
            aria-pressed={isFavorite}
            style={{
              fontSize: "1.5rem",
              background: isFavorite ? "#FFD90F" : "transparent",
              border: "2px solid #000",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              transition: "all 0.2s ease",
              color: isFavorite ? "#FF0000" : "#000"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span aria-hidden="true">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    occupation: PropTypes.string,
  }).isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};
