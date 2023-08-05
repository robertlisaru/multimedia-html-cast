const fs = require('fs');
const path = require('path');

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            if (path.extname(files[i]).toLowerCase() === ".mkv") {
                files_.push(name);
            }
        }
    }
    return files_;
}

function writeMovieNamesToFile(pathArgument) {
    files = getFiles(pathArgument);
    movieFiles = files.map((value, index, array) => { return value.replace(pathArgument, "/movies-folder"); });
    console.log(movieFiles);
    jsonContent = JSON.stringify(movieFiles);
    fs.writeFile("./src/movie-files.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

writeMovieNamesToFile(process.argv.at(2));