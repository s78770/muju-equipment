const express = require('express');
const equipmentRouter = require('./routes/equipment');

const app = express();

app.use(express.json());
app.use('/equipment', equipmentRouter);

app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Muju Equipment API running on port ${PORT}`);
});

module.exports = app;
