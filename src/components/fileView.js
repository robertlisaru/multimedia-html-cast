import ProgressBar from './progressBar';

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

const FileClass = { NORMAL: "normalFile", PLAYING: "playingFile" };

const FileView = ({ file, play, playingFile, progressPerMovie }) => {
    const isPlayable = playableExtensions.includes(file.extension);
    const isPlaying = playingFile && (file.path === playingFile.path);

    var fileClass = isPlaying ? FileClass.PLAYING : FileClass.NORMAL;

    var progress = progressPerMovie ? Number(progressPerMovie.get(file.path) || 0) : 0;

    const viewProgressBar = () => {
        return (progress > 0) && <ProgressBar value={progress} />
    }

    return isPlayable &&
        <li
            className={'fileRow' + ' ' + fileClass}
            onClick={(() => { play(file); })}>

            <span className={"fileTitle"}>{file.name}</span>
            {viewProgressBar()}

        </li>;

};

export default FileView;