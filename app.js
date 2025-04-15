require('dotenv').config();
const { createServer } = require('http');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db')();

const port = parseInt(process.env.HTTP_PORT ?? '3000');
const app = express();
app.use(cors({ origin: true, credentials: true }));
const http = createServer(app);

app.use(express.json());
app.use((error, request, response, next) => {
    if (error !== null) {
        console.error(error);
        return response.json({ success: false, message: 'Invalid json' });
    }
    return next();
});

app.use('/', require('./router'));

app.use(function (_req, res) {
    res.status(404).send({ success: false, message: 'This route does not exist' });
});

if (mongoose.connection && mongoose.connection.readyState === 1) run();
else mongoose.connection.on('connected', () => run());

const run = () => {
    http.listen(port, () => console.log(`Running on port ${port}`));
};
