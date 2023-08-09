const playableExtensions = [".mkv", ".mp4"];

const FileClass = { NORMAL: "fileName", WATCHED: "watchedFile", PLAYING: "playingFile" };

const FileView = ({ file, play, playingFile, watchedFiles }) => {
    const isPlayable = playableExtensions.includes(file.extension);
    const isPlaying = playingFile && (file.path === playingFile.path);
    const isWatched = watchedFiles.includes(file.path);

    var fileClass = isPlaying ? FileClass.PLAYING : (isWatched ? FileClass.WATCHED : FileClass.NORMAL);

    return isPlayable && <li
        className={fileClass}
        onClick={(() => { play(file); })}
    >
        {file.name}
    </li>;

};

export default FileView;