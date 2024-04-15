// import React from 'react'

// import { useEffect} from 'react'

// import { useDispatch } from 'react-redux'
// import { getAllCountries } from "../../redux/actions/actions"

// import Card from '../Card/Card'


// const Cards = ({ countries, onClose }) => { 
  
//   const dispatch = useDispatch();



//   useEffect(() => {
//     if (!countries.length) {
//         dispatch(getAllCountries())
//     }
//   }, [dispatch, countries.length]);

//   return (
//     <div className={styles.containerCard}>
//       {countries.map((country) => (
//         <Card
//           key={country.id} 
//           img={country.flag}
//           name={country.name}
//           continent={country.continent}
//           id = {country.id} 
//           onClose= {() => onClose(country.id)}
//         /> 
        
//       ))}
//     </div>
//   )
// }

// export default Cards;

// Cards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Cards.module.css'

const Cards = () => {
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/features?page=${currentPage}&per_page=${perPage}`)
      .then(response => {
        setFeatures(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage, perPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)}>{i}</button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.cards}>
        {features.map(feature => (
          <Card key={feature.id} feature={feature.attributes} />
        ))}
      </div>
      <div className={styles.pagination_bottom}>
        <button
          className={styles.paginationButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        {renderPageNumbers()}
        <button
          className={styles.paginationButton}
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
  
};

export default Cards;
