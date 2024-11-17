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

    return isPlayable && <li
        className={'fileRow' + ' ' + fileClass}
        onClick={(() => { play(file); })}
    >
        <span className={"fileTitle"}>{file.name}</span>
    </li>;

};

export default FileView;