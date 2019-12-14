const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Promise = require('bluebird');

const auth = require('./routes/auth');
const users = require('./routes/users');
const books = require('./routes/books');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL, { useNewUrlParser: true });

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/books', books);

app.post('/api/auth', (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" } });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, + '/GR/client/build/index.html'));
  });
}

app.listen(PORT, () => console.log(`Running on localhost:${8080}`));

