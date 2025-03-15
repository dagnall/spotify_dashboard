// src/components/NavigationBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define all navigation items (excluding Home)
  const navItems = [
    { name: 'Songs', path: '/songs' },
    { name: 'Albums', path: '/albums' },
    { name: 'Artists', path: '/artists' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'World Map', path: '/world-map' }
  ];

  // Filter out the item that matches the current path
  const filteredNavItems = navItems.filter(item => item.path !== currentPath);

  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <Link to="/" className="nav-home">Home</Link>
      </div>
      <div className="nav-right">
        {filteredNavItems.map((item, index) => (
          <Link key={index} to={item.path} className="nav-item">
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
