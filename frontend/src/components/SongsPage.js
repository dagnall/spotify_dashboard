// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './SongsPage.css';
// import NavigationBar from './NavigationBar';

// function SongsPage() {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Existing pagination state and variables if needed...
//   const [currentPage, setCurrentPage] = useState(1);
//   const songsPerPage = 10;

//   useEffect(() => {
//     const apiUrl = process.env.REACT_APP_API_URL + '/api/all-songs/';
//     axios.get(apiUrl)
//       .then(response => {
//         setSongs(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching songs:', err);
//         setError('Error fetching songs');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading songs...</p>;
//   if (error) return <p>{error}</p>;

//   // Filter the songs based on the search query (case-insensitive)
//   const filteredSongs = songs.filter(song => {
//     const lowerQuery = searchQuery.toLowerCase();
//     return (
//       song.track_name.toLowerCase().includes(lowerQuery) ||
//       song.artist_name.toLowerCase().includes(lowerQuery) ||
//       song.album_name.toLowerCase().includes(lowerQuery)
//     );
//   });

//   // For the default view (when no search is active)
//   const topSongs = songs.slice(0, 10);
//   const remainingSongs = songs.slice(10);
//   const indexOfLastSong = currentPage * songsPerPage;
//   const indexOfFirstSong = indexOfLastSong - songsPerPage;
//   const currentSongs = remainingSongs.slice(indexOfFirstSong, indexOfLastSong);
//   const totalPages = Math.ceil(remainingSongs.length / songsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

//   return (
//     <div className="songs-container">
//       <h1>All Songs</h1>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by song, artist, or album"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {searchQuery ? (
//         // Display search results if there is a search query
//         <div>
//           <h2>Search Results</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Song</th>
//                 <th>Artist</th>
//                 <th>Album</th>
//                 <th>Total Seconds Played</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSongs.map((song, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{song.track_name}</td>
//                   <td>{song.artist_name}</td>
//                   <td>{song.album_name}</td>
//                   <td>{song.total_seconds}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         // Default view: display top 10 as grid and remaining as paginated table
//         <div>
//           {/* Top 10 Songs Grid */}
//           <div className="top-songs">
//             {topSongs.map((song, index) => (
//               <div key={index} className="top-song">
//                 <h3>{song.track_name}</h3>
//                 <p>{song.artist_name}</p>
//                 <p>{song.album_name}</p>
//                 <p>{song.total_seconds} sec</p>
//               </div>
//             ))}
//           </div>

//           {/* Paginated Table for Remaining Songs */}
//           <h2>Other Songs</h2>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Rank</th>
//                   <th>Song</th>
//                   <th>Artist</th>
//                   <th>Album</th>
//                   <th>Total Seconds Played</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentSongs.map((song, index) => (
//                   <tr key={index}>
//                     <td>{indexOfFirstSong + index + 11}</td>
//                     <td>{song.track_name}</td>
//                     <td>{song.artist_name}</td>
//                     <td>{song.album_name}</td>
//                     <td>{song.total_seconds}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="pagination">
//             <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
//             <span> Page {currentPage} of {totalPages} </span>
//             <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SongsPage;


// // src/components/SongsPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './SongsPage.css';
// import NavigationBar from './NavigationBar';

// function SongsPage() {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const songsPerPage = 10;

//   useEffect(() => {
//     const apiUrl = process.env.REACT_APP_API_URL + '/api/all-songs/';
//     axios.get(apiUrl)
//       .then(response => {
//         setSongs(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching songs:', err);
//         setError('Error fetching songs');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading songs...</p>;
//   if (error) return <p>{error}</p>;

//   // Filter the songs based on the search query (case-insensitive)
//   const filteredSongs = songs.filter(song => {
//     const lowerQuery = searchQuery.toLowerCase();
//     return (
//       song.track_name.toLowerCase().includes(lowerQuery) ||
//       song.artist_name.toLowerCase().includes(lowerQuery) ||
//       song.album_name.toLowerCase().includes(lowerQuery)
//     );
//   });

//   // Default view: top 10 songs as grid and the rest as a paginated table
//   const topSongs = songs.slice(0, 10);
//   const remainingSongs = songs.slice(10);
//   const indexOfLastSong = currentPage * songsPerPage;
//   const indexOfFirstSong = indexOfLastSong - songsPerPage;
//   const currentSongs = remainingSongs.slice(indexOfFirstSong, indexOfLastSong);
//   const totalPages = Math.ceil(remainingSongs.length / songsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

//   return (
//     <>
//       <NavigationBar />
//       <div className="songs-container">
//         <h1>Your Songs</h1>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by song, artist, or album"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {searchQuery ? (
//           // Display search results if a search query is active
//           <div>
//             <h2>Search Results</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Rank</th>
//                   <th>Song</th>
//                   <th>Artist</th>
//                   <th>Album</th>
//                   <th>Total Seconds Played</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSongs.map((song, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{song.track_name}</td>
//                     <td>{song.artist_name}</td>
//                     <td>{song.album_name}</td>
//                     <td>{song.total_seconds}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           // Default view: top 10 as grid and remaining songs in a paginated table
//           <div>
//             {/* Top 10 Songs Grid */}
//             <div className="top-songs">
//               {topSongs.map((song, index) => (
//                 <div key={index} className="top-song">
//                   <h3>{song.track_name}</h3>
//                   <p>{song.artist_name}</p>
//                   <p>{song.album_name}</p>
//                   <p>{song.total_seconds} sec</p>
//                 </div>
//               ))}
//             </div>

//             {/* Paginated Table for Remaining Songs */}
//             <h2>Other Songs</h2>
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Rank</th>
//                     <th>Song</th>
//                     <th>Artist</th>
//                     <th>Album</th>
//                     <th>Total Seconds Played</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentSongs.map((song, index) => (
//                     <tr key={index}>
//                       <td>{indexOfFirstSong + index + 11}</td>
//                       <td>{song.track_name}</td>
//                       <td>{song.artist_name}</td>
//                       <td>{song.album_name}</td>
//                       <td>{song.total_seconds}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Controls */}
//             <div className="pagination">
//               <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
//               <span> Page {currentPage} of {totalPages} </span>
//               <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default SongsPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SongsPage.css';
import NavigationBar from './NavigationBar';

function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  const navigate = useNavigate();

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

  // Filter the songs based on the search query (case-insensitive)
  const filteredSongs = songs.filter(song => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      song.track_name.toLowerCase().includes(lowerQuery) ||
      song.artist_name.toLowerCase().includes(lowerQuery) ||
      song.album_name.toLowerCase().includes(lowerQuery)
    );
  });

  // Default view: top 10 songs as grid and the rest as a paginated table
  const topSongs = songs.slice(0, 10);
  const remainingSongs = songs.slice(10);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = remainingSongs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(remainingSongs.length / songsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Helper function to navigate to the song stats page for a given song.
  const goToSongStats = (song) => {
    const url = `/song-stats?track=${encodeURIComponent(song.track_name)}&artist=${encodeURIComponent(song.artist_name)}&album=${encodeURIComponent(song.album_name)}`;
    navigate(url);
  };

  return (
    <>
      <NavigationBar />
      <div className="songs-container">
        <h1>Your Songs</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by song, artist, or album"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          // Display search results if a search query is active
          <div>
            <h2>Search Results</h2>
            <table>
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
                {filteredSongs.map((song, index) => (
                  <tr 
                    key={index}
                    onClick={() => goToSongStats(song)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{index + 1}</td>
                    <td>{song.track_name}</td>
                    <td>{song.artist_name}</td>
                    <td>{song.album_name}</td>
                    <td>{song.total_seconds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Default view: top 10 as grid and remaining songs in a paginated table
          <div>
            {/* Top 10 Songs Grid */}
            <div className="top-songs">
              {topSongs.map((song, index) => (
                <Link
                  key={index}
                  to={`/song-stats?track=${encodeURIComponent(song.track_name)}&artist=${encodeURIComponent(song.artist_name)}&album=${encodeURIComponent(song.album_name)}`}
                  className="top-song-link"
                >
                  <div className="top-song">
                    <h3>{song.track_name}</h3>
                    <p>{song.artist_name}</p>
                    <p>{song.album_name}</p>
                    <p>{song.total_seconds} sec</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginated Table for Remaining Songs */}
            <h2>Other Songs</h2>
            <div className="table-container">
              <table>
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
                    <tr 
                      key={index}
                      onClick={() => goToSongStats(song)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{indexOfFirstSong + index + 11}</td>
                      <td>{song.track_name}</td>
                      <td>{song.artist_name}</td>
                      <td>{song.album_name}</td>
                      <td>{song.total_seconds}</td>
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

export default SongsPage;
