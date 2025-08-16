import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import NewsListScreen from './screens/NewsListScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateNewsScreen from './screens/CreateNewsScreen';
import EditNewsScreen from './screens/EditNewsScreen';
import ContactScreen from './screens/ContactScreen';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container mt-4">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/news" element={<NewsListScreen />} />
          <Route path="/news/:id" element={<NewsDetailScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/create-news" element={<CreateNewsScreen />} />
          <Route path="/edit-news/:id" element={<EditNewsScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;