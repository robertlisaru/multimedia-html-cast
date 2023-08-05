import './index.css';
var movieFiles = require('./movie-files.json');

var firstMovie = movieFiles[3];
//document.getElementById("video0").children.item(0).src = firstMovie;
var firstMovieWithoutExtension = firstMovie.substring(0, firstMovie.lastIndexOf('.')) || firstMovie;
var firstSubtitle = firstMovieWithoutExtension + ".vtt";
//document.getElementById("video0").children.item(1).src = firstSubtitle;
console.log("Updated video src.");
console.log(firstMovie);
document.getElementById("videoDiv").innerHTML =
    ("<video width='640' height='480' controls><source src='" + firstMovie + "' type = 'video/mp4' ><track label='English' src='" + firstSubtitle + "' kind='subtitles' srclang='en' default /></video>");