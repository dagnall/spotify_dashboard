// src/components/AlbumsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlbumsPage.css';  // Create this file for any custom styles for AlbumsPage
import NavigationBar from './NavigationBar';

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL + '/api/all-albums/';
    axios.get(apiUrl)
      .then(response => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching albums:', err);
        setError('Error fetching albums');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading albums...</p>;
  if (error) return <p>{error}</p>;

  // Filter the albums based on the search query (case-insensitive)
  const filteredAlbums = albums.filter(album => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      album.album_name.toLowerCase().includes(lowerQuery) ||
      album.artist_name.toLowerCase().includes(lowerQuery)
    );
  });

  // Default view when no search query: top 10 albums grid and remaining in a paginated table
  const topAlbums = albums.slice(0, 10);
  const remainingAlbums = albums.slice(10);
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = remainingAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(remainingAlbums.length / albumsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <NavigationBar />
      <div className="albums-container">
        <h1>Your Albums</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by album or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          // Display search results when there is a search query
          <div>
            <h2>Search Results</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Album</th>
                  <th>Artist</th>
                  <th>Total Seconds Played</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlbums.map((album, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{album.album_name}</td>
                    <td>{album.artist_name}</td>
                    <td>{album.total_seconds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Default view: top 10 albums in a grid, remaining albums in a paginated table
          <div>
            {/* Top 10 Albums Grid */}
            <div className="top-albums">
              {topAlbums.map((album, index) => (
                <div key={index} className="top-album">
                  <h3>{album.album_name}</h3>
                  <p>{album.artist_name}</p>
                  <p>{album.total_seconds} sec</p>
                </div>
              ))}
            </div>

            {/* Paginated Table for Remaining Albums */}
            <h2>Other Albums</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Total Seconds Played</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAlbums.map((album, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstAlbum + index + 11}</td>
                      <td>{album.album_name}</td>
                      <td>{album.artist_name}</td>
                      <td>{album.total_seconds}</td>
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

export default AlbumsPage;

