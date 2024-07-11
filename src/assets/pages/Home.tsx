import { useEffect, useState } from "react";
import "./Home.css";
import Loader from "../components/Loader/Loader";
import { API_KEY } from "../components/Env";

interface IArticle {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

interface ISource {
  id: string;
  name: string;
}

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [selectLanguage, setSelectLanguage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<IArticle[] | null>(null);

  const getSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguage(event.target.value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setArticleData(null); // Reset the article data to show the loader
    fetch(
      `https://newsapi.org/v2/everything?q=${search}&language=${selectLanguage}&apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticleData(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false);
      });
  };

  return (
    <div className="search-form-wrapper">
      <h1>Breaking News</h1>
      <input
        type="text"
        placeholder="Type to search"
        required
        value={search}
        onChange={getSearchInput}
        className="input"
      />
      <select
        name="select"
        value={selectLanguage}
        className="input"
        onChange={getSelectLanguage}>
        <option value="" disabled>
          Select your language
        </option>
        <option value="de">Deutsch</option>
        <option value="en">English</option>
        <option value="es">Espanol</option>
        <option value="fr">Francais</option>
      </select>
      <button className="input btn" onClick={handleSearch}>
        Search
      </button>
      <section className="news-card-wrapper">
        <h4>News</h4>
        <div className="news">
          {isLoading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            articleData &&
            articleData.map((article, index) => (
              <div key={index} className="news-card">
                <img src={article.urlToImage} alt="newsImage" />
                <h5>{article.title}</h5>
                <p>{article.description}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
