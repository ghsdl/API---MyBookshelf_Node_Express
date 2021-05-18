if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const apiRouter = require('./app/routers/apiRouter');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, _ => {
    console.log(`Server running on port ${port}.`);
});