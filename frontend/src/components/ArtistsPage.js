// src/components/ArtistsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArtistsPage.css';
import NavigationBar from './NavigationBar';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 10;

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL + '/api/all-artists/';
    axios.get(apiUrl)
      .then(response => {
        setArtists(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching artists:', err);
        setError('Error fetching artists');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading artists...</p>;
  if (error) return <p>{error}</p>;

  // Filter the artists based on the search query (case-insensitive)
  const filteredArtists = artists.filter(artist =>
    artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Default view: top 10 artists grid and remaining artists in a paginated table
  const topArtists = artists.slice(0, 10);
  const remainingArtists = artists.slice(10);
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = remainingArtists.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalPages = Math.ceil(remainingArtists.length / artistsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <NavigationBar />
      <div className="artists-container">
        <h1>Your Artists</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          // Display search results when a search query is active
          <div>
            <h2>Search Results</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Artist</th>
                  <th>Total Seconds Played</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtists.map((artist, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{artist.artist_name}</td>
                    <td>{artist.total_seconds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Default view: top 10 grid and paginated table for remaining artists
          <div>
            {/* Top 10 Artists Grid */}
            <div className="top-artists">
              {topArtists.map((artist, index) => (
                <div key={index} className="top-artist">
                  <h3>{artist.artist_name}</h3>
                  <p>{artist.total_seconds} sec</p>
                </div>
              ))}
            </div>

            {/* Paginated Table for Remaining Artists */}
            <h2>Other Artists</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Artist</th>
                    <th>Total Seconds Played</th>
                  </tr>
                </thead>
                <tbody>
                  {currentArtists.map((artist, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstArtist + index + 11}</td>
                      <td>{artist.artist_name}</td>
                      <td>{artist.total_seconds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
              <span> Page {currentPage} of {totalPages} </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ArtistsPage;

