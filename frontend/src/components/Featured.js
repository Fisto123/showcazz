import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./featured.scss";
const Featured = () => {
  const [input, setInput] = useState("");
  const nav = useNavigate();
  const handleSearch = (e) => {
    nav(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect services freelance services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <input
                type="text"
                placeholder="Try building mobile app"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web design</button>
            <button>Word press</button>
            <button>AI Services design</button>
            <button>Logo design</button>
            <button>IT Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
