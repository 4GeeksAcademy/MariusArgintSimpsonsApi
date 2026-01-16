import { useEffect } from "react";
import PropTypes from "prop-types";
import nelsonImg from "../images/nelson.png";

export const NelsonPopup = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      pointerEvents: "none",
      animation: "fadeIn 0.3s ease-out"
    }}>
      <div style={{
        backgroundColor: "#FFD90F",
        border: "5px solid #000",
        borderRadius: "20px",
        padding: "10px",
        textAlign: "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        animation: "popIn 0.3s ease-out",
        overflow: "hidden"
      }}>
        <img
          src={nelsonImg}
          alt="Nelson Muntz saying Ha-Ha"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

NelsonPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
