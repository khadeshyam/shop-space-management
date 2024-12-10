const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const spaceRoutes = require('./routes/spaces.js');
const errorHandler = require('./utils/errorHandler.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', spaceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});