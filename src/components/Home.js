import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="ml-5 homepage">
      <img
        className="white-t-shirt"
        src="https://static.pullandbear.cn/2/photos//2020/I/0/2/p/9678/537/084/9678537084_4_1_8.jpg?t=1602059761858&imwidth=430"
        alt="white-t-shirt"
      />
      <img
        className="black-t-shirt"
        src="https://static.pullandbear.cn/2/photos//2020/I/0/2/p/9678/539/800/9678539800_4_1_8.jpg?t=1602754646734&imwidth=430"
        alt="black-t-shirt"
      />
      <p className="h2 ml-3 winter">Winter?</p>
      <p className="display-1 ml-3 new-collection">New Collection</p>
      <Link to="/shop" className="d-flex align-items-center bottom-text">
        <p className="ml-3 see-all mt-3 mr-4">see all</p>
        <div className="line-arrow">
          <hr className="line"></hr>
          <div className="arrow"></div>
        </div>
      </Link>
    </div>
  );
}
