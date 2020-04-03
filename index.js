const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/DevRoutes');
const path = require('path');

const app = express();
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;
const mongodbUrl =
  '<mongo>';

const mongodbConnOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongodbUrl, mongodbConnOpts);
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ip, () => console.log(`Server is running at ${ip}:${port}`));
