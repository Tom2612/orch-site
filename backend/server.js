const express = require('express');
require('dotenv').config();
const pieceRoutes = require('./routes/pieces');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/pieces', pieceRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
})