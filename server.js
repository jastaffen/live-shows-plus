const express = require('express');
const connectDB = require('./config/db');


const app = express();


connectDB();
app.get('/', (req, res) => res.send('app running'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use(express.json({ extended: false }));
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/videos', require('./routes/api/videos'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Live Shows Plus running on port, ${PORT}`));
