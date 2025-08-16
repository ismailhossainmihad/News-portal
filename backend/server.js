// --- Core bootstrap ---
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();                 // 1) Load envs ASAP
connectDB();                     // 2) Connect DB before serving

const app = express();

// --- CORS: allow CRA dev server (http://localhost:3000) ---
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,                                 // allow cookies/auth if needed
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight for complex requests
app.options('*', cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

// --- Parsers & infra middleware ---
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// (Optional) if behind proxy (Heroku/Render/Nginx), uncomment:
// app.set('trust proxy', 1);

// --- Health check (ops-friendly) ---
app.get('/health', (_req, res) => res.json({ ok: true }));

// --- Routes ---
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.send({ message: 'Welcome to the News Portal API' });
});

// --- 404 guard for unknown API routes ---
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  next();
});

// --- Centralized error handler ---
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Something went wrong',
  });
});

// --- Server startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS origin allowed: ${FRONTEND_ORIGIN}`);
});
