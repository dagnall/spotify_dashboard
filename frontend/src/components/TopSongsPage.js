// src/components/TopSongsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopSongsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construct the API URL from your environment variable
    const apiUrl = process.env.REACT_APP_API_URL + '/top-songs/';
    
    // Fetch data from the Django API endpoint
    axios.get(apiUrl)
      .then(response => {
        // If your API is paginated, adjust accordingly (e.g., response.data.results)
        setSongs(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching top songs:', err);
        setError('Error fetching top songs');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading top songs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Top 25 Songs</h1>
      <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Total Seconds Played</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index}>
              <td>{song.track_name}</td>
              <td>{song.artist_name}</td>
              <td>{song.album_name}</td>
              <td>{song.total_seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopSongsPage;
