const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/User');

app.use('/api/users', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});