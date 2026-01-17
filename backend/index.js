const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/User');
const productRoutes = require('./routes/product');
const orderRoutes = require("./routes/order");

app.use('/api/users', userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});