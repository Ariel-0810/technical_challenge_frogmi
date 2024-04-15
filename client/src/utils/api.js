
const fetchFeatures = async (mag_type) => {
    // Construir la URL base
    let url = 'http://localhost:3000/api/v1/features';
  
    try {
      const response = await fetch(url);
      console.log("response en api---->",response);
    // Agregar filtros de mag_type si se proporcionan
    if (mag_type && mag_type.length > 0) {
      const magTypeQuery = mag_type.map(type => `filters[mag_type]=${mag_type}`).join('&');
      url += `${magTypeQuery}&`;
    } 
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("data de api.js--->",data);
      return data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw new Error('Failed to fetch features');
    }
  };
  
  export default fetchFeatures;
  