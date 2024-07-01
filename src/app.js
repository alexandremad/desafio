

const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes'); // Caminho para taskRoutes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
