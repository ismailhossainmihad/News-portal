import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews, deleteNews } from '../features/newsSlice';
import { updateProfile } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function DashboardScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { allNews, loading: newsLoading, error: newsError } = useSelector((state) => state.news);

  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchAllNews());
    }
  }, [dispatch, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password: password !== '' ? password : undefined }));
  };

  const userNews = allNews.filter((news) => news.author?._id === userInfo?._id);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      await dispatch(deleteNews(id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">User Profile</h2>
      <form onSubmit={submitHandler} className="mb-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password (leave blank to keep unchanged)
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your News</h2>
        <Link to="/create-news" className="btn btn-success">
          Create News
        </Link>
      </div>
      {newsLoading ? (
        <p>Loading...</p>
      ) : newsError ? (
        <p className="text-danger">{newsError}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userNews.map((news) => (
                <tr key={news._id}>
                  <td>{news.title}</td>
                  <td>{new Date(news.createdAt).toLocaleString()}</td>
                  <td>
                    <Link
                      to={`/edit-news/${news._id}`}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteHandler(news._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userNews.length === 0 && <p>You have not created any news yet.</p>}
        </div>
      )}
    </div>
  );
}

export default DashboardScreen;