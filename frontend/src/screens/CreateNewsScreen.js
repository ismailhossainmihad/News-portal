import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../features/newsSlice';

function CreateNewsScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(createNews({ title, content, imageUrl }));
    if (createNews.fulfilled.match(result)) {
      // Navigate to the news detail page
      navigate(`/news/${result.payload._id}`);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Create News</h2>
        {error && <p className="text-danger">{error}</p>}
        {loading && <p>Loading...</p>}
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
          <button type="submit" className="btn btn-success">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewsScreen;