import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { MdEvent, MdArrowForward } from 'react-icons/md';
import './BlogSection.css';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur blog:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAllign: 'center', padding: '20px' }}>Chargement des articles...</div>;

  return (
    <div className="blog-section">
      <div className="blog-header">
        <h2>📰 Notre Blog Voyage</h2>
        <p>Conseils, guides et inspirations pour vos prochaines aventures</p>
      </div>

      <div className="blog-grid">
        {articles.map(article => (
          <div key={article.id} className="blog-card">
            <div className="blog-card-image">
              <img 
                src={`http://127.0.0.1:8000${article.image}`} 
                alt={article.titre} 
              />
            </div>
            <div className="blog-card-content">
              <span className="blog-date">
                <MdEvent /> {new Date(article.date_publication).toLocaleDateString('fr-FR')}
              </span>
              <h3>{article.titre}</h3>
              <p>{article.description}</p>
              <Link to={`/blogs/${article.id}`} className="btn-read-more">
                Lire l'article <MdArrowForward />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;