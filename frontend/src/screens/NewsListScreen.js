import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../features/newsSlice';
import { Link } from 'react-router-dom';

function NewsListScreen() {
  const dispatch = useDispatch();
  const { allNews, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-4">All News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {allNews.map((news) => (
            <div key={news._id} className="col-md-4 mb-3">
              <div className="card h-100">
                {news.imageUrl && (
                  <img
                    src={news.imageUrl}
                    className="card-img-top"
                    alt={news.title}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{news.title}</h5>
                  <p className="card-text">
                    {news.content.length > 100
                      ? `${news.content.substring(0, 100)}...`
                      : news.content}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/news/${news._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsListScreen;