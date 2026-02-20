import { useEffect, useState } from "react";
import API from "../api/axios";

function Home() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await API.get("/home");
        setHomeData(response.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      {homeData ? (
        <>
          <h1>{homeData.title}</h1>
          <p>{homeData.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
