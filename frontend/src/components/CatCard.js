import React from "react";
import { Link } from "react-router-dom";
import "./catcard.scss";
const CatCard = ({ items }) => {
  return (
    <Link to={`/gigs?cat=${items?.cat}`}>
      <div className="catcard">
        <img src={items?.img} alt="" />
        <span className="desc">{items?.desc}</span>
        <span className="title">{items?.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
