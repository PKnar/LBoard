import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import dashBlack from "../../assets/icons/dashboard.png";
import dashWhite from "../../assets/icons/dashboard-white.png";
import add from "../../assets/icons/more.png";
import addWhite from "../../assets/icons/more-white.png";
import arrow from "../../assets/icons/arrow-right.png";
import arrowWhite from "../../assets/icons/arrow-right-white.png";
import arrowBack from "../../assets/icons/back.png";
import arrowBackWhite from "../../assets/icons/back-white.png";
import admin from "../../assets/admin.jpg";
import edit from "../../assets/icons/edit-white.png";
import info from "../../assets/icons/info.png";

const Navigation = () => {
  const navRef = useRef();
  const [rightIsClicked, setRightIsClicked] = useState(true);

  const handleArrowClick = (arrow) => {
    if (arrow === "right") {
      navRef.current.style.width = "180px";
      setRightIsClicked(true);
    } else {
      navRef.current.style.width = "12px";
      setRightIsClicked(false);
    }
  };

  return (
    <nav ref={navRef}>
      {!rightIsClicked ? (
        <img onClick={() => handleArrowClick("right")} src={arrowWhite}></img>
      ) : (
        <img
          onClick={() => handleArrowClick("back")}
          src={arrowBackWhite}
        ></img>
      )}
      <div className="admin">
        <div className="img-wrapper">
          <img src={admin} />
        </div>
        <p style={{ marginLeft: "1rem" }}>Admin</p>
      </div>
      <ul>
        <li>
          <Link to="/">
            {" "}
            <img src={dashWhite}></img>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/panel">
            <img src={edit}></img>
            Modify
          </Link>
        </li>
        <li>
          <Link to="/info">
            <img src={info}></img>
            Info
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
