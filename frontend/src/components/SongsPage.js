// src/components/SongsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SongsPage() {
  // State for songs, loading, errors and the current page of the table
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10; // Number of songs to display per page in the table

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL + '/api/all-songs/';
    axios.get(apiUrl)
      .then(response => {
        setSongs(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching songs:', err);
        setError('Error fetching songs');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>{error}</p>;

  // Split the songs: top 10 for squares, rest for the table (rank 11+)
  const topSongs = songs.slice(0, 10);
  const remainingSongs = songs.slice(10);

  // Pagination logic for the remaining songs table
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = remainingSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(remainingSongs.length / songsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <h1>All Songs</h1>

      {/* Top 10 Songs as 2 rows of 5 squares */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        {topSongs.map((song, index) => (
          <div key={index} style={{
            width: '18%', // Adjust width so that 5 squares fit per row
            margin: '1%',
            border: '1px solid #ccc',
            padding: '10px',
            boxSizing: 'border-box',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1rem' }}>{song.track_name}</h3>
            <p style={{ fontSize: '0.9rem' }}>{song.artist_name}</p>
            <p style={{ fontSize: '0.9rem' }}>{song.album_name}</p>
            <p style={{ fontSize: '0.8rem' }}>{song.total_seconds} sec</p>
          </div>
        ))}
      </div>

      {/* Table for remaining songs (rank 11+) */}
      <h2>Other Songs</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Total Seconds Played</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map((song, index) => (
            <tr key={index}>
              <td>{indexOfFirstSong + index + 11}</td>
              <td>{song.track_name}</td>
              <td>{song.artist_name}</td>
              <td>{song.album_name}</td>
              <td>{song.total_seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default SongsPage;
