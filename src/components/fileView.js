const FileView = ({ file, play, playingFile }) => {

    const isPlaying = playingFile && (file.path === playingFile.path);
    const className = isPlaying ? "playingFile" : "fileName";

    return <li
        className={className}
        onClick={(() => { play(file); })}
    >
        {file.name}
    </li>;

};

export default FileView;