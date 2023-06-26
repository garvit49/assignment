import React, { useState } from 'react';
import './searchbar.css'; // Assuming you have a CSS file named SearchBar.css in the same directory

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [images, setImages] = useState([]);

  const searchImages = () => {
    fetch(`https://pixabay.com/api/?key=29986633-6239e1e9388639d3a1c631945&q=${inputText}&image_type=photo`)
      .then(response => response.json())
      .then(data => {
        if (data.hits && data.hits.length > 0) {
          setImages(data.hits);
        } else {
          setImages(null);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="search-bar">
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={searchImages}>Search</button>
      {images === null && <p>No images found</p>}
      {images && images.map((image, index) => (
        <img className="image-style" key={index} src={image.webformatURL} alt={image.tags} />
      ))}
    </div>
  );
};

export default SearchBar;
