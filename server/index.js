if (!globalThis.Headers) {
  const fetch = require('node-fetch');
  globalThis.fetch = fetch;
  globalThis.Headers = fetch.Headers;
  globalThis.Request = fetch.Request;
  globalThis.Response = fetch.Response;
}

const dotenv = require('dotenv');
// 1. Initialize dotenv immediately
dotenv.config(); 

const express = require('express');
const cors = require('cors');

// 2. NOW import your modular routes (they will now see the variables)
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Server is up and running!'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));