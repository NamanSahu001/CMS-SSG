import React, { useState } from 'react';
import './CreateArticle.css'; // Import the CSS for styling

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the article data
    const articleData = {
      title,
      content,
    };

    try {
      // Send POST request to your backend API
      const response = await fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      const data = await response.json();
      console.log('Article created:', data);

      // Optionally, reset the form
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="article-wrapper">
      <div className="article-card">
        <h1>Create Article</h1>
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
}

export default App;
