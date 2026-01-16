import { useState } from "react";
import { Link } from "react-router-dom";
import introVideo from "../assets/video/intro.mp4";

export const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
      height: "100vh",
      minHeight: "500px",
      overflow: "hidden",
      marginBottom: "30px"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}>
        <video
          src={introVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
        />
      </div>

      <button
        onClick={() => setIsMuted(!isMuted)}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 10,
          backgroundColor: "rgba(255, 217, 15, 0.8)",
          border: "2px solid #000",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "40px 20px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontFamily: "'Creepster', cursive",
          fontSize: "clamp(2rem, 8vw, 4.5rem)",
          color: "#FFD90F",
          textShadow: "5px 5px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          marginBottom: "20px",
          padding: "0 10px"
        }}>
          Welcome to Springfield!
        </h1>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", padding: "0 15px" }}>
          <a
            href="#characters"
            style={{
              backgroundColor: "#FFD90F",
              color: "#000",
              border: "3px solid #000",
              padding: "clamp(10px, 2vw, 15px) clamp(15px, 3vw, 30px)",
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "10px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Meet the Characters
          </a>
          <Link
            to="/episodes"
            style={{
              backgroundColor: "#87CEEB",
              color: "#000",
              border: "3px solid #000",
              padding: "clamp(10px, 2vw, 15px) clamp(15px, 3vw, 30px)",
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "10px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Watch Episodes
          </Link>
          <Link
            to="/locations"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "3px solid #000",
              padding: "clamp(10px, 2vw, 15px) clamp(15px, 3vw, 30px)",
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "10px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Explore Locations
          </Link>
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)"
      }} />
    </div>
  );
};
