import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const ProfileCard = ({ profileImageUrl, bio, name, skills, rating, username }) => {
  const cardStyle = {
    backgroundColor: "#1c1c1e", // Slightly lighter black (dark gray)
    color: "#EAEAEA", // Light gray text for readability
    border: "1px solid #a9dce3", // Light blue border for consistency
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
    transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
  };

  const cardHoverStyle = {
    transform: "scale(1.05)", // Slightly increase the size on hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // More prominent shadow on hover
  };

  const imgStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "15px",
    border: "2px solid #a9dce3", // Light blue border around image
  };

  const buttonStyle = {
    backgroundColor: "#a9dce3", // Light blue button
    color: "#546E7A", // Darker blue text
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontFamily: "Montserrat, sans-serif",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#546E7A", // Darker blue on hover
    color: "#ffffff", // White text on hover
  };

  const skillsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  };

  const skillBoxStyle = {
    backgroundColor: "#333333", // Darker gray for skill boxes
    color: "#EAEAEA", // Light gray text
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "0.9rem",
  };

  return (
    <div
      style={cardStyle}
      className="card-container"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = cardHoverStyle.transform;
        e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <img className="img-container" src={profileImageUrl} alt="user" style={imgStyle} />
      <h3>{name}</h3>
      <h6>Rating: {rating} ⭐</h6>
      <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "150px" }}>{bio}</p>
      <div className="prof-buttons">
        <Link to={`/profile/${username}`}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
              e.target.style.color = buttonHoverStyle.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = buttonStyle.backgroundColor;
              e.target.style.color = buttonStyle.color;
            }}
          >
            View Profile
          </button>
        </Link>
      </div>
      <div className="profskills">
        <h6>Skills</h6>
        <div style={skillsStyle}>
          {skills.map((skill, index) => (
            <div key={index} style={skillBoxStyle}>
              <span className="skill">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
