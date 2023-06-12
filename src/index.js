const express = require('express');
const v1recapi = require('./v1/routes/recapiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', v1recapi);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`)});