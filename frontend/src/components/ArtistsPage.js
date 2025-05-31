// src/components/ArtistsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

  const filteredArtists = artists.filter(artist =>
    artist.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
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
                    <td>
                      <Link to={`/artist-stats?artist=${encodeURIComponent(artist.artist_name)}`}>
                        {artist.artist_name}
                      </Link>
                    </td>
                    <td>{artist.total_seconds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="top-artists">
              {topArtists.map((artist, index) => (
                <div key={index} className="top-artist">
                  <h3>
                    <Link to={`/artist-stats?artist=${encodeURIComponent(artist.artist_name)}`}>
                      {artist.artist_name}
                    </Link>
                  </h3>
                  <p>{artist.total_seconds} sec</p>
                </div>
              ))}
            </div>

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
                      <td>
                        <Link to={`/artist-stats?artist=${encodeURIComponent(artist.artist_name)}`}>
                          {artist.artist_name}
                        </Link>
                      </td>
                      <td>{artist.total_seconds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
