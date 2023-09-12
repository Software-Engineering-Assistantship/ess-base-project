import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/music', {
        title,
        genre,
        year
      });

      console.log(response.data);

      setTitle('');
      setGenre('');
      setYear('');

      onClose();
    } catch (error) {
      console.error("Error submitting music data:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Music</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
