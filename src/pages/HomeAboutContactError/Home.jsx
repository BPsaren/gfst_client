import React from 'react';
//import myImage from '../../components/asset/laptop_final.jpeg';
import myImage from '../../components/asset/home.png';
import './home.css';

export const Home = () => {
  return (
    <div className="home-container">
      <img src={myImage} alt="Laptop" className="home-cover-image" />
      
    </div>
  );
};