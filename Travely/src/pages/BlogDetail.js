import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { MdEvent, MdArrowBack } from 'react-icons/md';
import './BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/blogs/${id}`)
            .then(res => {
                setArticle(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors de la récupération de l'article :", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Chargement de l'article...</div>;
    if (!article) return <div className="error">Article introuvable.</div>;

    return (
    <div className="blog-detail-page">
        {/* Bouton retour épuré */}
        <Link to="/contact" className="btn-back">
            <MdArrowBack /> ← Retour aux articles
        </Link>

        <div className="blog-detail-header">
            <span className="blog-detail-date">
                <MdEvent /> {new Date(article.date_publication).toLocaleDateString('fr-FR')}
            </span>
            <h1>{article.titre}</h1>
        </div>

        <div className="blog-detail-image">
            <img 
                src={`http://127.0.0.1:8000${article.image}`} 
                alt={article.titre} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'; }} 
                /* 👆 Cette ligne affiche une belle image de voyage par défaut si test.jpg est introuvable */
            />
        </div>

        <div className="blog-detail-content">
            <p>{article.description}</p> 
        </div>
    </div>
);
};

export default BlogDetail;