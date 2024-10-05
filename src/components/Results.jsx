import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Results({ element, artwork, loading }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {loading ? (
        <div className="spinner"></div>
      ) : artwork ? (
        <div className="artwork">
          <img src={artwork} alt="Artwork" width="1500" />
        </div>
      ) : (
        <p>No artwork available</p>
      )}
    </div>
  );
}