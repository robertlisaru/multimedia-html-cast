const playableExtensions = [".mkv", ".jpg", ".jpeg"];

const FileView = ({ file, play }) => {

    const isPlayable = playableExtensions.includes(file.extension);

    const className = isPlayable ? "fileName playableFile" : "fileName unknownFile";

    return <li
        className={className}
        onClick={isPlayable ? (() => { play(file); }) : null}
    >
        {file.name}
    </li>;

};

export default FileView;