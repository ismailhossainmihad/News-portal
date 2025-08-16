import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchNewsDetails, deleteNews } from '../features/newsSlice';

function NewsDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newsDetails, loading, error } = useSelector((state) => state.news);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchNewsDetails(id));
    }
  }, [dispatch, id]);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      await dispatch(deleteNews(id));
      navigate('/news');
    }
  };

  return (
    <div>
      <Link to="/news" className="btn btn-light mb-3">
        Go Back
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : newsDetails ? (
        <div>
          <h2>{newsDetails.title}</h2>
          {newsDetails.imageUrl && (
            <img
              src={newsDetails.imageUrl}
              alt={newsDetails.title}
              className="img-fluid mb-3"
            />
          )}
          <p><strong>Author:</strong> {newsDetails.author?.name || 'Unknown'}</p>
          <p>
            <strong>Published:</strong>{' '}
            {new Date(newsDetails.createdAt).toLocaleString()}
          </p>
          <p>{newsDetails.content}</p>
          {userInfo && newsDetails.author && userInfo._id === newsDetails.author._id && (
            <div className="mt-3">
              <Link to={`/edit-news/${newsDetails._id}`} className="btn btn-secondary me-2">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>News not found</p>
      )}
    </div>
  );
}

export default NewsDetailScreen;