import React from "react";
import "./style.css";

const Features = () => {
  return (
    <div className="features anim" id="features">
      <h1 className="heading">
        {" "}
        our <span>features</span>{" "}
      </h1>

      <div className="box-container anim">
        <div className="box" id="box-1">
          <img src="/images/products/cadeira1.png"></img>
          <h3>Fresh and organic</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            earum!
          </p>
          <a href="" className="btn">
            read more
          </a>
        </div>

        <div className="box" id="box-2">
          <img src="/images/products/cadeira2.png"></img>
          <h3>Fresh and organic</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            earum!
          </p>
          <a href="" className="btn">
            read more
          </a>
        </div>

        <div className="box" id="box-3">
          <img src="/images/products/cadeira3.png"></img>
          <h3>Fresh and organic</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            earum!
          </p>
          <a href="" className="btn">
            read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
