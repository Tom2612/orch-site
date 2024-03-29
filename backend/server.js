require('dotenv').config();

const express = require('express');
const concertRoutes = require('./routes/concerts');
const groupRoutes = require('./routes/groups');
const userRouters = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

let limiter = RateLimit({
    windowMs: 15*60*1000,
    max: 100
});

const app = express();

app.use(helmet());
app.use(limiter);
app.use(compression());

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/concerts', concertRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/user', userRouters);
app.use('*', (req, res) => {
    res.json({error: 'Looks like we cannot find that one!'});
})

// connect to db and start listening
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('db online and listening on port', process.env.PORT);
        })
    })
    .catch(e => {
        console.log(e);
    })

