// src/components/SongStatsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import './SongStatsPage.css'; // Create this file for custom styling

function SongStatsPage() {
  const [searchParams] = useSearchParams();
  const track = searchParams.get('track');
  const artist = searchParams.get('artist');
  const album = searchParams.get('album');
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!track || !artist || !album) {
      setError("Missing song parameters");
      setLoading(false);
      return;
    }
    const apiUrl = process.env.REACT_APP_API_URL + `/api/song-stats/?track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`;
    axios.get(apiUrl)
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching song stats:", err);
        setError("Error fetching song stats");
        setLoading(false);
      });
  }, [track, artist, album]);

  if (loading) return <p>Loading song stats...</p>;
  if (error) return <p>{error}</p>;
  if (!stats) return null;

  return (
    <>
      <NavigationBar />
      <div className="song-stats-container">
        <div className="song-profile">
          {/* Placeholder for album cover */}
          <div className="album-cover-placeholder">
            {/* In future, you can display an image */}
          </div>
          <div className="song-basic-info">
            <h2>{stats.track_name}</h2>
            <p><strong>Artist:</strong> {stats.artist_name}</p>
            <p><strong>Album:</strong> {stats.album_name}</p>
            <p><strong>Total Seconds Played:</strong> {stats.total_seconds}</p>
            {/* Rank could be determined by comparing this song's total_seconds to overall aggregated ranking */}
            {/* For now, you could leave it out or fetch additional data */}
          </div>
        </div>

        <div className="charts">
          <h3>Listening Patterns</h3>
          <div className="chart-container">
            <h4>Day of Week Distribution</h4>
            {/* Insert your bar chart component here using stats.weekday_distribution */}
            <pre>{JSON.stringify(stats.weekday_distribution, null, 2)}</pre>
          </div>
          <div className="chart-container">
            <h4>Hour of Day Distribution</h4>
            {/* Insert your bar chart component here using stats.hour_distribution */}
            <pre>{JSON.stringify(stats.hour_distribution, null, 2)}</pre>
          </div>
          <div className="chart-container">
            <h4>Yearly Distribution</h4>
            {/* Insert your bar chart component here using stats.year_distribution */}
            <pre>{JSON.stringify(stats.year_distribution, null, 2)}</pre>
          </div>
          <div className="chart-container">
            <h4>Country Distribution</h4>
            {/* For the world map/chloropleth, insert your component here using stats.country_distribution */}
            <pre>{JSON.stringify(stats.country_distribution, null, 2)}</pre>
          </div>
          <div className="chart-container">
            <h4>Platform Distribution</h4>
            {/* Insert your bar chart component here using stats.platform_distribution */}
            <pre>{JSON.stringify(stats.platform_distribution, null, 2)}</pre>
          </div>
          <div className="chart-container">
            <h4>Latest Listens</h4>
            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Seconds Played</th>
                </tr>
              </thead>
              <tbody>
                {stats.latest_listens.map((listen, index) => (
                  <tr key={index}>
                    <td>{new Date(listen.timestamp).toLocaleString()}</td>
                    <td>{listen.sec_played}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongStatsPage;
