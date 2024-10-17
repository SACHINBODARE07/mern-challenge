const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionsRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://avinashbodare02:mernchallenge@cluster0.j68ab.mongodb.net/mernchallenge?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/transactions', transactionsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
