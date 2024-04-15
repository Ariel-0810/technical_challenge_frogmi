import React from 'react';
import styles from "./Card.module.css"
import { Link, useLocation } from "react-router-dom"

const Card = ({ feature }) => {
  const location = useLocation();

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h4>Title: {feature.title}</h4>
        <p>Magnitude: {feature.magnitude}</p>
        <p>Place: {feature.place}</p>
        <button className={styles.moreInfo}>
          <Link to={`/home/${feature.external_id}`}>Mas info</Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
