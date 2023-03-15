import React from "react";
import "./slider.scss";
import Slider from "infinite-react-carousel";
const Slide2 = ({ children, arrowsScroll }) => {
  return (
    <div className="slider">
      <div className="container">
        <Slider dots slidesToShow={5} arrowScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide2;
