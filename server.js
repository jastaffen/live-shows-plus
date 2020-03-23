const express = require('express');
const connectDB = require('./config/db');


const app = express();


connectDB();
app.get('/', (req, res) => res.send('app running'));


app.use(express.json({ extended: false }));
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/videos', require('./routes/api/videos'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Live Shows Plus running on port, ${PORT}`));
