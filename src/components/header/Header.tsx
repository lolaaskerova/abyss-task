import React from "react";
import "./Header.scss";

type IProps = {
  center: () => void;
};

const Header: React.FC<IProps> = ({ center }) => {
  return (
    <div className="container header">
      <div className="icon">
        <h2>Services</h2>
        <span>0</span>
      </div>
      <div className="zoom">
        <span className="view">List View</span>
        <button
          onClick={() => center()}
          className="center"
          title="Go To Center"
        >
          ➤
        </button>
        <div className="zoom-btn">
          <button className="zoom-out">−</button>
          <div className="percent">
            <button className="full">100%</button>
            <ul>
              <li>25%</li>
              <li>30%</li>
              <li>40%</li>
              <li>50%</li>
              <li>60%</li>
              <li>70%</li>
              <li>80%</li>
              <li>90%</li>
              <li>100%</li>
              <li>125%</li>
              <li>150%</li>
            </ul>
          </div>
          <button className="zoom-in">+</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
