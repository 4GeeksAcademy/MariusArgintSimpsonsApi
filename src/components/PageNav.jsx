import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PageNav = ({ currentPage }) => {
  const navigate = useNavigate();

  const pages = [
    { path: "/", label: "Characters", hash: "characters" },
    { path: "/episodes", label: "Episodes" },
    { path: "/locations", label: "Locations" }
  ];

  const filteredPages = pages.filter(page => page.path !== currentPage);

  const buttonStyle = {
    backgroundColor: "#87CEEB",
    color: "#000",
    border: "3px solid #000",
    fontWeight: "bold",
    borderRadius: "10px",
    transition: "transform 0.2s",
    textDecoration: "none",
    padding: "0.375rem 0.75rem",
    display: "inline-block",
    cursor: "pointer"
  };

  const handleCharactersClick = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("characters");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="d-flex justify-content-center gap-2 mb-4">
      {filteredPages.map(page => (
        page.hash ? (
          <button
            key={page.path}
            className="btn"
            style={buttonStyle}
            onClick={handleCharactersClick}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {page.label}
          </button>
        ) : (
          <Link
            key={page.path}
            to={page.path}
            className="btn"
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {page.label}
          </Link>
        )
      ))}
    </div>
  );
};

PageNav.propTypes = {
  currentPage: PropTypes.string.isRequired
};
