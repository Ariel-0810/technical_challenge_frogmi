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
    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={currentPage === i ? styles.activePage : styles.pageNumber}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
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
          className={styles.pagination_bottom}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        {renderPageNumbers()}
        <button
          className={styles.pagination_bottom}
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );  
};

export default Cards;
