import React, { useState } from 'react';
import axios from 'axios';

const ShareNotePage = ({ noteId }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    axios.post(`/notes/${noteId}/share/`, { username })
      .then((response) => {
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      <h2>Share Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Share</button>
      </form>
    </div>
  );
};

export default ShareNotePage;
