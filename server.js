const express = require('express');
const routesDoc = require('./routes/docx.js');

const app = express();
app.use(express.json());
require('dotenv').config();

app.use('/api', routesDoc);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`La API está corriendo en http://localhost:${PORT}`);
});