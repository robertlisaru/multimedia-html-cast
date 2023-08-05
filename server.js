const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

pathArgument = process.argv.at(2);
app.use('/movies-folder', express.static(path.join(__dirname, pathArgument)));
app.use(express.static(path.join(__dirname, '/dist')));

const options = { root: path.join(__dirname, '/dist') };

app.get('/', (req, res) => {
    res.sendFile('index.html', options);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
