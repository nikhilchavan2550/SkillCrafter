import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const containerStyle = {
    minHeight: "90.4vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // Black background
  };

  const loginBoxStyle = {
    height: "200px",
    display: "flex",
    backgroundColor: "#000000", // Black background for the box
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    border: "2px solid #a9dce3", // Light blue border
    borderRadius: "10px",
    boxShadow: "10px 10px 10px #546E7A", // Darker blue shadow
    zIndex: "999",
  };

  const titleStyle = {
    fontSize: "50px",
    fontFamily: "Oswald, sans-serif", // Font family
    color: "#a9dce3", // Light blue for the title
    textAlign: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: "#a9dce3", // Light blue button background
    color: "#546E7A", // Darker blue text
    fontFamily: "Montserrat",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const hoverButtonStyle = {
    backgroundColor: "#546E7A", // Darker blue background on hover
    color: "#a9dce3", // Light blue text on hover
    fontFamily: "Montserrat",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.5s ease-in-out", // Transition effect
  };

  const imageStyle = {
    position: "absolute",
    left: "10px", // Position the above image to the left
    top: "80px", // Add some space from the top
    width: "400px",
    marginBottom: "20px", // Add margin bottom to create space between image and login box
  };

  const imageBelowStyle = {
    position: "absolute",
    right: "10px", // Position the below image to the right
    bottom: "50px", // Add some space from the bottom
    width: "400px",
    marginBottom: "20px", // Add margin bottom to create space between image and login box
  };

  return (
    <div style={containerStyle}>
      <img src={"/assets/images/1.png"} alt="Above Image" style={imageStyle} />
      <div style={loginBoxStyle}>
        <h1 style={titleStyle}>LOGIN</h1>
        <div style={buttonContainerStyle}>
          <Button
            style={isHovered ? hoverButtonStyle : buttonStyle} // Apply style based on hover state
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
            onClick={handleGoogleLogin}
          >
            <FaGoogle /> Login with Google
          </Button>
        </div>
      </div>
      <img src={"/assets/images/2.png"} alt="Below Image" style={imageBelowStyle} />
    </div>
  );
};

export default Login;
