import React from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation'; // To handle 404 for invalid ids
import styles from './page.module.css';

// Fetch data for a single article
async function getArticle(id) {
    try {
        const res = await axios.get(`http://localhost:3000/api/articles/${id}`);
        return res.data;
    } catch (error) {
        return null; // Return null if not found
    }
}

// This function dynamically fetches the article data
const ArticlePage = async ({ params }) => {
    const article = await getArticle(params.id); // params.id comes from dynamic route

    if (!article) {
        notFound(); // If no article is found, trigger 404 page
    }

    return (
        <div className={styles.container}>
        <h1 className={styles['article-title']}>{article.title}</h1>
        <p className={styles['article-content']}>{article.content}</p>
    </div>
    );
};



export default ArticlePage;
