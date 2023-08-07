const playableExtensions = [".mkv", ".mp4"];

const FileView = ({ file, play, playingFile }) => {
    const isPlayable = playableExtensions.includes(file.extension);
    const isPlaying = playingFile && (file.path === playingFile.path);
    const className = isPlaying ? "playingFile" : "fileName";

    return isPlayable && <li
        className={className}
        onClick={(() => { play(file); })}
    >
        {file.name}
    </li>;

};

export default FileView;