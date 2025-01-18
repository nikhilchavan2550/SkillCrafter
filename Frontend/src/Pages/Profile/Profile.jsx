import React from "react";
import "./Profile.css";
import Box from "./Box";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useUser();
  const [profileUser, setProfileUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const navigate = useNavigate();

  const skillColors = ["#3BB4A1", "#FF6B6B", "#FFD700", "#546E7A", "#A9DCE3"]; // Distinct colors for skills

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/user/registered/getDetails/${username}`);
        setProfileUser(data.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
          if (error.response.data.message === "Please Login") {
            localStorage.removeItem("userInfo");
            setUser(null);
            await axios.get("/auth/logout");
            navigate("/login");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);

  const convertDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" }).replace("/", "-");
  };

  const connectHandler = async () => {
    try {
      setConnectLoading(true);
      const { data } = await axios.post(`/request/create`, {
        receiverID: profileUser._id,
      });

      toast.success(data.message);
      setProfileUser((prevState) => ({
        ...prevState,
        status: "Pending",
      }));
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "Please Login") {
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/login");
        }
      }
    } finally {
      setConnectLoading(false);
    }
  };

  return (
    <div className="profile-container" style={{ backgroundColor: "#000", color: "#EAEAEA", minHeight: "100vh" }}>
      <div className="container" style={{ padding: "20px" }}>
        {loading ? (
          <div className="row d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <div className="profile-box" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div>
                <img
                  src={profileUser?.picture}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "2px solid #A9DCE3",
                    marginBottom: "10px",
                  }}
                />
                {user?.username !== username && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={profileUser?.status === "Connect" ? connectHandler : undefined}
                      style={{
                        backgroundColor: profileUser?.status === "Connect" ? "#3BB4A1" : "#333",
                        color: "#EAEAEA",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {connectLoading ? <Spinner animation="border" size="sm" /> : profileUser?.status}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h1 style={{ fontSize: "2.5rem", fontFamily: "Oswald, sans-serif" }}>{profileUser?.name}</h1>
                <p style={{ fontSize: "1.2rem", fontFamily: "Montserrat, sans-serif" }}>
                  {profileUser?.bio || "No bio provided"}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.2rem" }}>Rating: </span>
                  <span style={{ color: "#FFD700" }}>
                    {Array.from({ length: profileUser?.rating || 5 }).map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {user?.username === username && (
                    <Link to="/edit_profile">
                      <button
                        style={{
                          backgroundColor: "#3BB4A1",
                          color: "#000",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Edit Profile
                      </button>
                    </Link>
                  )}
                  <Link to={`/report/${username}`}>
                    <button
                      style={{
                        backgroundColor: "#FF6B6B",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Report
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginTop: "20px" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "Oswald, sans-serif", marginBottom: "10px" }}>Skills</h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {profileUser?.skillsProficientAt?.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: skillColors[index % skillColors.length],
                      color: "#000",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            {profileUser?.education?.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h2 style={{ fontSize: "2rem", fontFamily: "Oswald, sans-serif", marginBottom: "10px" }}>Education</h2>
                {profileUser?.education?.map((edu, index) => (
                  <Box
                    key={index}
                    head={edu.institution}
                    date={`${convertDate(edu.startDate)} - ${convertDate(edu.endDate)}`}
                    spec={edu.degree}
                    desc={edu.description}
                    score={edu.score}
                  />
                ))}
              </div>
            )}

            {/* Projects */}
            {profileUser?.projects?.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h2 style={{ fontSize: "2rem", fontFamily: "Oswald, sans-serif", marginBottom: "10px" }}>Projects</h2>
                {profileUser?.projects?.map((project, index) => (
                  <Box
                    key={index}
                    head={project.title}
                    date={`${convertDate(project.startDate)} - ${convertDate(project.endDate)}`}
                    desc={project.description}
                    skills={project.techStack}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
