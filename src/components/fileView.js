const playableExtensions = [
    ".mkv",
    ".mp4",
    ".avi",
    ".mov",
    ".webm",
    ".ogg",
    ".wmv",
    ".mpg",
    ".mpeg",
];

const FileClass = { NORMAL: "normalFile", WATCHED: "watchedFile", PLAYING: "playingFile" };

const FileView = ({ file, play, playingFile, watchedFiles }) => {
    const isPlayable = playableExtensions.includes(file.extension);
    const isPlaying = playingFile && (file.path === playingFile.path);
    const isWatched = watchedFiles.includes(file.path);

    var fileClass = isPlaying ? FileClass.PLAYING : (isWatched ? FileClass.WATCHED : FileClass.NORMAL);

    const fileDuration = localStorage.getItem('DURATION_OF_' + file.path);
    const resumeTime = localStorage.getItem(file.path);

    var progress; //TODO: use React state for real-time updating of the progress-bar
    if (fileDuration && resumeTime) {
        progress = Number(resumeTime) / Number(fileDuration);
    } else {
        progress = 0;
    }

    return isPlayable && <li
        className={'fileRow' + ' ' + fileClass}
        onClick={(() => { play(file); })}
    >
        <span className={"fileTitle"}>{file.name}</span>
        <progress value={progress}></progress>
    </li>;

};

export default FileView;