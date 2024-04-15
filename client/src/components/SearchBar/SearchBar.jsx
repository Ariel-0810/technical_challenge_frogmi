import React from 'react';
import MagTypeDropdown from '../FetchFeature/FetchFeature';
import styles from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <MagTypeDropdown />
    </div>
  );
};

export default SearchBar;
