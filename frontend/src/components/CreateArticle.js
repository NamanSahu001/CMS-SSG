import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useAuth } from '../context/AuthContext'; // Import authentication context
import './CreateArticle.css'; // Import the CSS for styling

const CreateArticle = () => {
  const { token } = useAuth(); // Retrieve the token from context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to store success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message
  
    if (!token) {
      setError('No token found. Please log in again.'); // Handle missing token
      return;
    }
  
    try {
      // API call to create the article
      const response = await axios.post(
        'http://localhost:3000/api/articles',
        { title, content }, // The article data
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach the token
        }
      );
  
      console.log('Article created:', response.data);
      setSuccessMessage('Article created successfully!'); // Display success message
      setTitle(''); // Reset title
      setContent(''); // Reset content
    } catch (error) {
      console.error('Error creating article:', error.response?.data || error.message);
      setError('Error creating article. Please try again.'); // Display error message
    }
  };

  return (
    <div className="article-wrapper">
      <div className="article-card">
        <h1>Create Article</h1>
        {error && <div className="error-message">{error}</div>} {/* Error message */}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Create Article</button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
