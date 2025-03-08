import React from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css';

function HomePage() {
    return (
      <div className="home-container">
        <h1>Spotify Data Explorer</h1>
        <div className="grid-container">
          {/* Songs Square */}
          <Link to="/songs" className="grid-item">
            <div className="square">
              <h2>Songs</h2>
            </div>
          </Link>
          {/* Albums Square */}
          <Link to="/albums" className="grid-item">
            <div className="square">
              <h2>Albums</h2>
            </div>
          </Link>
          {/* Artists Square */}
          <Link to="/artists" className="grid-item">
            <div className="square">
              <h2>Artists</h2>
            </div>
          </Link>
          {/* Calendar Square */}
          <Link to="/calendar" className="grid-item">
            <div className="square">
              <h2>Calendar</h2>
            </div>
          </Link>
          {/* World Map Square */}
          <Link to="/world-map" className="grid-item">
            <div className="square">
              <h2>World Map</h2>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default HomePage;