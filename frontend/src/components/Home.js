
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState([]);

  // Fetch message from Hello Service
  useEffect(() => {
    axios
      .get("/hello/")
      .then((response) => {
        setMessage(response.data.msg);
      })
      .catch((error) => {
        console.error("Error fetching Hello Service:", error);
      });
  }, []);

  // Fetch user profiles from Profile Service
  useEffect(() => {
    axios
      .get("/profile/fetchUser")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Profile Service:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>{message || "Loading message..."}</h1>

      <div>
        <h2>Profile</h2>

        {profile.length === 0 ? (
          <p>No user profiles found.</p>
        ) : (
          profile.map((user, index) => (
            <div key={user._id || index}>
              <h3>Name: {user.name}</h3>
              <h3>Age: {user.age}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
