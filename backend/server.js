
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let accounts = [];

async function ubisoftLogin(email, password) {
  const response = await axios.post('https://public-ubiservices.ubi.com/v3/profiles/sessions', {
    email,
    password
  }, {
    headers: {
      'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const profile = await ubisoftLogin(email, password);
    accounts.push({ email, profile });
    res.json({ success: true, profile });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
