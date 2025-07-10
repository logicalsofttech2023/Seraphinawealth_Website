  import React from "react";

const Loader = () => {
  return (
    <div className="loader-wrap">
      {" "}
      <div className="preloader">
        {" "}
        <div className="preloader-close">x</div>{" "}
        <div id="handle-preloader" className="handle-preloader">
          {" "}
          <div className="animation-preloader">
            {" "}
            <div className="spinner" />{" "}
            <div className="txt-loading">
              {" "}
              <span data-text-preloader="S" className="letters-loading">
                {" "}
                S{" "}
              </span>{" "}
              <span data-text-preloader="E" className="letters-loading">
                {" "}
                E{" "}
              </span>{" "}
              <span data-text-preloader="R" className="letters-loading">
                {" "}
                R{" "}
              </span>{" "}
              <span data-text-preloader="A" className="letters-loading">
                {" "}
                A{" "}
              </span>{" "}
              <span data-text-preloader="P" className="letters-loading">
                {" "}
                P{" "}
              </span>{" "}
              <span data-text-preloader="H" className="letters-loading">
                {" "}
                H{" "}
              </span>{" "}
              <span data-text-preloader="I" className="letters-loading">
                {" "}
                I{" "}
              </span>{" "}
              <span data-text-preloader="N" className="letters-loading">
                {" "}
                N{" "}
              </span>{" "}
              <span data-text-preloader="A" className="letters-loading">
                {" "}
                A{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Loader;
