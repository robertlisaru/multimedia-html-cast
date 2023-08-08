const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, './../Inspector George Gently')));

const options = { root: path.join(__dirname, './../Inspector George Gently') };

app.get('/', (req, res) => {
    res.sendFile('index.html', options);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
