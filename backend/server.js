const express = require('express');
require('dotenv').config();

const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Message received'});
})

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
})