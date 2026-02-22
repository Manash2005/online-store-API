import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">{data.title}</h1>
        <p className="home-description">{data.description}</p>
        <button className="shop-btn">Shop Now</button>
      </div>
    </div>
  );
};

export default Home;