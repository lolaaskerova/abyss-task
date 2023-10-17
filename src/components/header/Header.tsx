import React from "react";
import "./Header.scss";

type IProps = {
  center: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: number;
  updateZoom: (newZoom: number) => void;
};

const Header: React.FC<IProps> = ({
  center,
  zoomIn,
  zoomOut,
  zoom,
  updateZoom,
}) => {
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
          <button onClick={() => zoomOut()} className="zoom-out">
            −
          </button>
          <div className="percent">
            <button className="full">{zoom}%</button>
            <ul>
              <li onClick={() => updateZoom(20)}>20%</li>
              <li onClick={() => updateZoom(30)}>30%</li>
              <li onClick={() => updateZoom(40)}>40%</li>
              <li onClick={() => updateZoom(50)}>50%</li>
              <li onClick={() => updateZoom(60)}>60%</li>
              <li onClick={() => updateZoom(70)}>70%</li>
              <li onClick={() => updateZoom(80)}>80%</li>
              <li onClick={() => updateZoom(90)}>90%</li>
              <li onClick={() => updateZoom(100)}>100%</li>
              <li onClick={() => updateZoom(110)}>110%</li>
              <li onClick={() => updateZoom(120)}>120%</li>
              <li onClick={() => updateZoom(130)}>130%</li>
              <li onClick={() => updateZoom(140)}>140%</li>
              <li onClick={() => updateZoom(150)}>150%</li>
            </ul>
          </div>
          <button onClick={() => zoomIn()} className="zoom-in">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
