import React from "react";
import "./Box.css";

const Box = ({ head, date, spec, desc, skills, score }) => {
  const skillColors = ["#3BB4A1", "#FF6B6B", "#FFD700", "#546E7A", "#A9DCE3"]; // Distinct skill colors

  const boxStyle = {
    backgroundColor: "#1c1c1e", // Slightly lighter black
    color: "#EAEAEA", // Light gray text
    border: "1px solid #3BB4A1", // Light blue-green border
    borderRadius: "10px",
    padding: "20px",
    margin: "10px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
  };

  const skillBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  };

  const individualSkillStyle = (index) => ({
    backgroundColor: skillColors[index % skillColors.length], // Cycle through skill colors
    color: "#000", // Text color
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "0.85rem",
  });

  return (
    <div style={boxStyle}>
      <h5 style={{ marginBottom: "0.6rem", fontFamily: "Oswald, sans-serif", fontSize: "1.5rem" }}>{head}</h5>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.9rem",
          marginBottom: "10px",
          color: "#A9DCE3",
        }}
      >
        <i>{spec}</i>
        <i>{date}</i>
      </div>

      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "1rem",
          color: "#EAEAEA",
          marginBottom: "10px",
          lineHeight: "1.6",
        }}
      >
        {desc}
      </p>
      {skills && (
        <>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.9rem", color: "#A9DCE3" }}>
            <i>Skills Used:</i>
          </p>
          <div style={skillBoxStyle}>
            {skills?.map((skill, index) => (
              <div key={index} style={individualSkillStyle(index)}>
                {skill}
              </div>
            ))}
          </div>
        </>
      )}
      {score && (
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.9rem",
            color: "#A9DCE3",
            marginTop: "10px",
          }}
        >
          <i>Grade / Percentage: {score}</i>
        </p>
      )}
    </div>
  );
};

export default Box;
