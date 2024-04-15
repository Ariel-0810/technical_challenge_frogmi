// import React, { useState } from 'react'

// import lupa from "../../img/lupa.png"

// export default function SearchBar({ onSearch }) {
//   const [searchCountry, setSearchCountry] = useState('')

//   const changeHandler = (event) => {
//     setSearchCountry(event.target.value)
//   }

//   return (
//     <div className={styles.searchContainer}>
//       <input
//         type="text"
//         name="search"
//         placeholder="Buscar Terremoto"
//         value={searchCountry}
//         onChange={changeHandler}
//       />
//       <img src={lupa} alt="Buscar" className={styles.iconNav} onClick={() => onSearch(searchCountry)}/>
//     </div>
//   )
// }

// SearchBar.jsx
import React from 'react';
import MagTypeDropdown from '../FetchFeature/FetchFeature'; // Ajusta la ruta según la ubicación de tu componente MagTypeDropdown
import styles from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      {/* Agrega aquí cualquier otra funcionalidad de tu barra de búsqueda */}
      <MagTypeDropdown />
    </div>
  );
};

export default SearchBar;
