import styles from "./FetchFeatures.module.css"
import React, { useState, useEffect } from 'react';
import fetchFeatures from '../../utils/api';

const MagTypeDropdown = () => {
  const [selectedMagTypes, setSelectedMagTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);

  useEffect(() => {
    const filtered = features.filter(feature => {
      return selectedMagTypes.some(type => feature.attributes.mag_type && feature.attributes.mag_type.includes(type));
    });
    setFilteredFeatures(filtered);
  }, [selectedMagTypes, features]);

  const handleMagTypeChange = async (e) => {
    const selectedTypes = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedMagTypes(selectedTypes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatures();
        setFeatures(data.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };
    fetchData();
  }, []);

  console.log("filteredFeatures en FetchFeature----->", filteredFeatures);

  return (
    <div className={styles.mag_type_dropdown_container}>
      <label htmlFor="magTypes" className={styles.mag_type_label}>Selecciona mag_types:</label>
      <select id="magTypes" multiple onChange={handleMagTypeChange} className={styles.mag_type_select} value={selectedMagTypes}>
        <option value="md">md</option>
        <option value="ml">ml</option>
        <option value="ms">ms</option>
        <option value="mw">mw</option>
        <option value="me">me</option>
        <option value="mi">mi</option>
        <option value="mb">mb</option>
        <option value="mlg">mlg</option>
      </select>
      <ul className={styles.filtered_features_list}>
      {filteredFeatures.map(feature => (
          selectedMagTypes.includes(feature.attributes.mag_type) && (
            <li key={feature.id} className={styles.feature_item}>{feature.attributes.title}</li>
          )
        ))}
      </ul>
    </div>
  );
};

export default MagTypeDropdown;


