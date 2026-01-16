import { Link } from "react-router-dom";
import homerDoh from "../images/homerdoh.webp";

export const ErrorPage = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#87CEEB",
      textAlign: "center",
      padding: "20px"
    }}>
      <img
        src={homerDoh}
        alt="Homer Simpson saying D'oh!"
        style={{
          maxWidth: "300px",
          marginBottom: "30px",
          borderRadius: "15px",
          border: "4px solid #000"
        }}
      />
      <h1 style={{
        fontFamily: "'Creepster', cursive",
        fontSize: "4rem",
        color: "#FFD90F",
        textShadow: "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
        marginBottom: "20px"
      }}>
        D'oh!
      </h1>
      <p style={{
        fontSize: "1.5rem",
        color: "#000",
        fontWeight: "bold",
        marginBottom: "30px"
      }}>
        D'oh! Page not found! But don't worry, this is made on purpose.
        <br /><br />
        <span style={{ fontSize: "1.2rem" }}>Tip: Try adding Bart to your favorites and then removing him... someone is looking for him!</span>
      </p>
      <Link
        to="/"
        style={{
          backgroundColor: "#FFD90F",
          color: "#000",
          border: "3px solid #000",
          padding: "15px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textDecoration: "none",
          borderRadius: "10px",
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      >
        Back to Springfield
      </Link>
    </div>
  );
};
