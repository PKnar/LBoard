import React from "react";
import "./info.css";

const Info = () => {
  return (
    <div className="info-page">
      <p>
        <span>Student: </span>Knarik Poghosyan
      </p>
      <p>
        <span>Stack: </span> React, Node, MongoDB
      </p>
      <p>
        <span>
          Github:{" "}
          <a href="https://github.com/PKnar/LBoard" target="_blank">
            Link
          </a>
        </span>
      </p>
    </div>
  );
};

export default Info;
