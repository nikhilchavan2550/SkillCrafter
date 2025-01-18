import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import ProfileCard from "./ProfileCard";

const Discover = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const [webDevUsers, setWebDevUsers] = useState([]);
  const [mlUsers, setMlUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user/registered/getDetails`);
        setUser(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/auth/logout");
        navigate("/login");
      }
    };

    const getDiscoverUsers = async () => {
      try {
        const { data } = await axios.get("/user/discover");
        setDiscoverUsers(data.data.forYou);
        setWebDevUsers(data.data.webDev);
        setMlUsers(data.data.ml);
        setOtherUsers(data.data.others);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/auth/logout");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
    getDiscoverUsers();
  }, []);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 4fr", // Sidebar (1fr) and content (4fr)
    gap: "20px",
    backgroundColor: "#000000", // Black background
    minHeight: "100vh",
    padding: "20px",
  };

  const navBarStyle = {
    backgroundColor: "#a9dce3", // Light blue background for navigation
    padding: "15px",
    borderRadius: "10px",
    height: "fit-content",
  };

  const navLinkStyle = {
    color: "#546E7A", // Darker blue text
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    marginBottom: "10px",
    textDecoration: "none",
    display: "block",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#EAEAEA",
    textAlign: "center",
  };

  const navLinkHoverStyle = {
    backgroundColor: "#546E7A", // Darker blue on hover
    color: "#FFFFFF", // White text on hover
  };

  const headingStyle = {
    fontFamily: "Josefin Sans, sans-serif",
    color: "#a9dce3", // Light blue
    marginTop: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const profileCardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <Nav className="flex-column">
          <Nav.Link
            href="#for-you"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
          >
            For You
          </Nav.Link>
          <Nav.Link
            href="#popular"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
          >
            Popular
          </Nav.Link>
          <Nav.Link
            href="#web-development"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
          >
            Web Development
          </Nav.Link>
          <Nav.Link
            href="#machine-learning"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
          >
            Machine Learning
          </Nav.Link>
          <Nav.Link
            href="#others"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
          >
            Others
          </Nav.Link>
        </Nav>
      </div>
      <div className="content-container">
        {loading ? (
          <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <h1 id="for-you" style={headingStyle}>
              For You
            </h1>
            <div style={profileCardsContainer}>
              {discoverUsers.length > 0 ? (
                discoverUsers.map((user) => (
                  <ProfileCard
                    profileImageUrl={user?.picture}
                    name={user?.name}
                    rating={user?.rating || 5}
                    bio={user?.bio}
                    skills={user?.skillsProficientAt}
                    username={user?.username}
                  />
                ))
              ) : (
                <h1 style={headingStyle}>No users to show</h1>
              )}
            </div>

            <h1 id="popular" style={headingStyle}>
              Popular
            </h1>
            <h2 id="web-development" style={headingStyle}>
              Web Development
            </h2>
            <div style={profileCardsContainer}>
              {webDevUsers.length > 0 ? (
                webDevUsers.map((user) => (
                  <ProfileCard
                    profileImageUrl={user?.picture}
                    name={user?.name}
                    rating={4}
                    bio={user?.bio}
                    skills={user?.skillsProficientAt}
                    username={user?.username}
                  />
                ))
              ) : (
                <h1 style={headingStyle}>No users to show</h1>
              )}
            </div>

            <h2 id="machine-learning" style={headingStyle}>
              Machine Learning
            </h2>
            <div style={profileCardsContainer}>
              {mlUsers.length > 0 ? (
                mlUsers.map((user) => (
                  <ProfileCard
                    profileImageUrl={user?.picture}
                    name={user?.name}
                    rating={4}
                    bio={user?.bio}
                    skills={user?.skillsProficientAt}
                    username={user?.username}
                  />
                ))
              ) : (
                <h1 style={headingStyle}>No users to show</h1>
              )}
            </div>

            <h2 id="others" style={headingStyle}>
              Others
            </h2>
            <div style={profileCardsContainer}>
              {otherUsers.length > 0 ? (
                otherUsers.map((user) => (
                  <ProfileCard
                    profileImageUrl={user?.picture}
                    name={user?.name}
                    rating={4}
                    bio={user?.bio}
                    skills={user?.skillsProficientAt}
                    username={user?.username}
                  />
                ))
              ) : (
                <h1 style={headingStyle}>No users to show</h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;
