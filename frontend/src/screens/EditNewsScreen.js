import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsDetails, updateNews } from '../features/newsSlice';

function EditNewsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newsDetails, loading, error } = useSelector((state) => state.news);
  const { userInfo } = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!newsDetails || newsDetails._id !== id) {
        dispatch(fetchNewsDetails(id));
      } else {
        setTitle(newsDetails.title);
        setContent(newsDetails.content);
        setImageUrl(newsDetails.imageUrl || '');
      }
    }
  }, [dispatch, id, newsDetails, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateNews({ id, title, content, imageUrl }));
    if (updateNews.fulfilled.match(result)) {
      navigate(`/news/${id}`);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Edit News</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                Image URL (optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditNewsScreen;