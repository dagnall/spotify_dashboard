// src/components/ArtistStatsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import './ArtistStatsPage.css'; // Create this for any custom styling you want

function ArtistStatsPage() {
  // 1) Read the ?artist=… query parameter
  const [searchParams] = useSearchParams();
  const artistParam = searchParams.get('artist');

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2) Fetch artist stats on mount (whenever artistParam changes)
  useEffect(() => {
    if (!artistParam) {
      setError("No artist parameter provided in URL.");
      setLoading(false);
      return;
    }

    const apiUrl =
      process.env.REACT_APP_API_URL +
      `/api/artist-stats/?artist=${encodeURIComponent(artistParam)}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artist stats:", err);
        setError("Failed to fetch stats for this artist.");
        setLoading(false);
      });
  }, [artistParam]);

  if (loading) return <p>Loading artist stats…</p>;
  if (error) return <p>{error}</p>;
  if (!stats) return null;

  // Convert total_seconds to hours or minutes
  const totalHours = (stats.total_seconds / 3600).toFixed(2);

  return (
    <>
      <NavigationBar />

      <div className="artist-stats-container">
        {/* --- Profile Header (Image Placeholder + Basic Facts) --- */}
        <div className="artist-profile-header">
          <div className="artist-image-placeholder">
            {/* Placeholder square for future album/artist image */}
          </div>
          <div className="artist-basic-info">
            <h2>{stats.artist_name}</h2>
            <p>
              <strong>Total Listening Time:</strong> {totalHours} hours
            </p>
            <p>
              <strong>First Year Listened:</strong> {stats.first_year}
            </p>
            <p>
              <strong>Unique Songs:</strong> {stats.unique_songs_count}
            </p>
            <p>
              <strong>Unique Albums:</strong> {stats.unique_albums_count}
            </p>
          </div>
        </div>

        {/* --- 10 Most Recent Listens --- */}
        <div className="artist-section">
          <h3>10 Most Recent Listens</h3>
          <table className="recent-listens-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Song</th>
                <th>Minutes Listened</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_listens.map((listen, idx) => {
                const dateStr = new Date(listen.timestamp).toLocaleString();
                const minutes = (listen.sec_played / 60).toFixed(2);
                return (
                  <tr key={idx}>
                    <td>{dateStr}</td>
                    <td>{listen.track_name}</td>
                    <td>{minutes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- Top Songs (ranked by hours) --- */}
        <div className="artist-section">
          <h3>Top Songs (by Listening Time)</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Song</th>
                <th>Hours Listened</th>
              </tr>
            </thead>
            <tbody>
              {stats.top_songs.map((songEntry, idx) => {
                const hours = (songEntry.total_seconds / 3600).toFixed(2);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{songEntry.track_name}</td>
                    <td>{hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- Top Albums (ranked by hours) --- */}
        <div className="artist-section">
          <h3>Top Albums (by Listening Time)</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Album</th>
                <th>Hours Listened</th>
              </tr>
            </thead>
            <tbody>
              {stats.top_albums.map((albEntry, idx) => {
                const hours = (albEntry.total_seconds / 3600).toFixed(2);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{albEntry.album_name}</td>
                    <td>{hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- Top Platforms (ranked by hours) --- */}
        <div className="artist-section">
          <h3>Top Platforms (by Listening Time)</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Platform</th>
                <th>Hours Listened</th>
              </tr>
            </thead>
            <tbody>
              {stats.top_platforms.map((platEntry, idx) => {
                const hours = (platEntry.total_seconds / 3600).toFixed(2);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{platEntry.platform}</td>
                    <td>{hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- All Countries Listened In --- */}
        <div className="artist-section">
          <h3>Countries Listened In</h3>
          <ul className="countries-list">
            {stats.countries.map((ctry, idx) => (
              <li key={idx}>{ctry}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ArtistStatsPage;
