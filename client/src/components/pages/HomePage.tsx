import React, { FC } from "react";
import "../../styles/homePage.scss";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { RoutePaths } from "../../routes/routes";

const HomePage = ({}) => {
  return (
    <div className="promo">
      <Container>
        <h1 className="text-center">Welcome to beauty-finder!</h1>
        <h2 className="text-center">Out current statistic:</h2>
        <div className="d-flex justify-content-around mt-5">
          <div className="promo-item">
            <div className="promo-item-number">10+</div>
            <div className="promo-item-text">firms</div>
          </div>
          <div className="promo-item">
            <div className="promo-item-number">100+</div>
            <div className="promo-item-text">masters</div>
          </div>
          <div className="promo-item">
            <div className="promo-item-number">200+</div>
            <div className="promo-item-text">customers</div>
          </div>
        </div>
        <Link
          to={RoutePaths.AUTH}
          className="btn btn-primary btn-lg btn-to-catalog btn-dark"
        >
          Go to catalog <span>&#8594;</span>
        </Link>
      </Container>
    </div>
  );
};
export default HomePage;
