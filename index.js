const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/DevRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongodbUrl =
  'mongodb+srv://omnistack:omnistack@cluster0-dgwn0.mongodb.net/devradar?retryWrites=true&w=majority';

const mongodbConnOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongodbUrl, mongodbConnOpts);

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => console.log(`Server listening on port ${port}...`));
