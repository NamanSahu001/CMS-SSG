// pages/index.js
import axios from 'axios';

const Home = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <h2 key={article._id}>{article.title}</h2>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3000/api/articles');
  const articles = res.data;

  return {
    props: { articles },
  };
}

export default Home;
