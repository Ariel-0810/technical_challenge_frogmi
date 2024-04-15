// import { Link, useLocation } from "react-router-dom"

// const Card = (props) => {
  //   const location = useLocation();
  
  //   // ? Si la ruta actual es diferente de "/home", no se muestra el botón de cerrar
//   const showCloseButton = location.pathname === "/home"

//   return (
//     <div className={styles.card}>
//       {showCloseButton && (
//         <button onClick={props.onClose} className={styles.buttonX}>
//           X
//         </button>
//       )}
//       <div className={styles.icon}>
//         <img src={props.img} alt="" className={styles.img} />
//       </div>
//       <p>{props.name}</p>
//       <div className={styles.content}>
//         <p>Continent: {props.continent}</p>
//         <button className={styles.moreInfo}>
//           <Link to={`/home/${props.id}`}>Mas info</Link>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Card;

// Card.js
import React from 'react';
import styles from "./Card.module.css"
 import { Link, useLocation } from "react-router-dom"

const Card = ({ feature }) => {
       const location = useLocation();

// ? Si la ruta actual es diferente de "/home", no se muestra el botón de cerrar
  //  const showCloseButton = location.pathname !== "/home"
  
  console.log("feature in Card--->>>", feature);
  //Desestructura el objeto feature para acceder a las propiedades necesarias
  return (
    <div className={styles.card}>
             {/* {showCloseButton && (
         <button onClick={feature.onClose} className={styles.buttonX}>
           X
         </button>
       )} */}
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
