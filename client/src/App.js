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
    fetch('http://localhost:3000/api/v1/features')
      .then(response => response.json())
      .then(data => {
        setFeatures(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function onClose(id) {
    setFeatures(oldFeatures => oldFeatures.filter(feature => feature.id !== id));
  }
  function onSearch(title) {
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
      </Routes>
    </div>
  );
}

export default App;