import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import ProfileCard from "./ProfileCard";

// ✅ Load from .env
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "https://skillcrafter.onrender.com";

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
        const { data } = await axios.get(`${SERVER_URL}/user/registered/getDetails`, {
          withCredentials: true, // 🔹 Ensure cookies (JWT) are sent
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        });
        setUser(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
        navigate("/login");
      }
    };

    const getDiscoverUsers = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/user/discover`, {
          withCredentials: true, // ✅ Ensure authentication
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        });
        setDiscoverUsers(data.data.forYou);
        setWebDevUsers(data.data.webDev);
        setMlUsers(data.data.ml);
        setOtherUsers(data.data.others);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
    getDiscoverUsers();
  }, [navigate, setUser]);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h1>Discover Users</h1>
          {discoverUsers.map((user) => (
            <ProfileCard key={user.username} profileImageUrl={user.picture} name={user.name} />
          ))}
        </>
      )}
    </div>
  );
};

export default Discover;
