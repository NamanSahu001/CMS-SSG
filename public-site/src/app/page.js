// src/app/page.js
import React from 'react';
import axios from 'axios';
import styles from './styles/HomePage.module.css'; // Import the CSS module

const HomePage = async () => {
    // Fetching data directly inside the component
    const res = await axios.get('http://localhost:3000/api/articles');
    const articles = res.data;

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Welcome to My Next.js App</h1>
                <p className={styles.heroSubtitle}>
                    Stay updated with the latest articles and insights.
                </p>
            </section>

            {/* Articles Section */}
            <section className={styles.articlesSection}>
                <h2 className={styles.sectionTitle}>Latest Articles</h2>
                <div className={styles.articlesGrid}>
                    {articles.map((article) => (
                        <div key={article._id} className={styles.articleCard}>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleContent}>
                                {article.content.slice(0, 100)}... {/* Truncate content */}
                            </p>
                            <a href={`/article/${article._id}`} className={styles.readMore}>
                                Read More &rarr;
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
