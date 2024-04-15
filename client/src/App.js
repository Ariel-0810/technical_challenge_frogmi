
// //? React
// import { Route, Routes , useLocation} from "react-router-dom"

// //? componentes
// import Cards from './components/Cards/Cards'

// //? views
// import Landing from './views/Landing/Landing'
// import AllCountries from "./views/AllCountries/AllCountries"


// function App() {
//   const [countries, setCountries] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     // Realiza la solicitud para obtener los datos de la ruta del backend
//     fetch('http://localhost:3000/api/v1/features')
//       .then(response => response.json())
//       .then(data => {
//         setCountries(data); // Establece los datos obtenidos en el estado
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Este efecto se ejecuta solo una vez al montar el componente

//   function onClose(id) {
//     setCountries(oldCountries => oldCountries.filter(country => country.id !== id));
//   }

//   function onSearch(name) {
//     // Podrías implementar la lógica de búsqueda si la ruta del backend lo permite
//     window.alert('Búsqueda de países no implementada en el backend');
//   }

//   return (
//     <div className="App" >

//     {location.pathname !== "/" && 
//       <div>
//         <NavBar onSearch={onSearch}></NavBar> 
//       </div>
//     }

//     <Routes>
//       <Route exact path="/" element= {<Landing></Landing>} />
//       <Route path = "/home" element = {<Cards countries={countries} onClose={onClose}/>} />  
//       <Route path = "/home/:id" element= {<Detail></Detail>} />
//       <Route path="/all" element= {<AllCountries ></AllCountries>} /> 
//     </Routes>

//     </div>
//   );
// }

// export default App

// App.js
import './App.css'
import React, { useState, useEffect } from "react"
import { Routes, Route, useLocation } from 'react-router-dom';
import Form from './views/Form/Form'
import Detail from './views/Detail/Detail'
import Cards from './components/Cards/Cards';
import NavBar from './components/Navbar/Navbar'
import Landing from './views/Landing/Landing';

function App() {
  const [features, setFeatures] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Realiza la solicitud para obtener los datos de la ruta del backend
    fetch('http://localhost:3000/api/v1/features')
      .then(response => response.json())
      .then(data => {
        setFeatures(data); // Establece los datos obtenidos en el estado
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  function onClose(id) {
    setFeatures(oldFeatures => oldFeatures.filter(feature => feature.id !== id));
  }

  function onSearch(title) {
    // Podrías implementar la lógica de búsqueda si la ruta del backend lo permite
    window.alert('Búsqueda de terremotos no implementada en el backend');
  }

  function handleAddComment(id, body) {
    fetch(`http://localhost:3000/api/v1/features/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: { body } }),
    })
      .then(response => response.json())
      .then(newComment => {
        // Actualizar el estado para mostrar el nuevo comentario en la card
        setFeatures(oldFeatures =>
          oldFeatures.map(feature =>
            feature.id === id
              ? {
                  ...feature,
                  comments: [...(feature.comments || []), newComment],
                }
              : feature
          )
        );
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  }

  return (
    <div className="App">
      {location.pathname !== "/" &&
        <div>
          <NavBar onSearch={onSearch}></NavBar>
        </div>
      }
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/all" element={<Cards />} />
        <Route path="/home" element={<Cards features={features} onAddComment={handleAddComment} onClose={onClose} />} />
        <Route path="/home/:id" element={<Detail></Detail>} />
        <Route path="/create" element={<Form></Form>} />
        {/* <Route path="/all" element={<AllCountries ></AllCountries>} /> */}
      </Routes>
    </div>
  );
}

export default App;