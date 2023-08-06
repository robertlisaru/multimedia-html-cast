import './../styles/fileView.css';

const playableExtensions = [".mkv", ".jpg", ".jpeg"];

const FileView = ({ file, play }) => {

    const isPlayable = playableExtensions.includes(file.extension);

    return <li
        onClick={isPlayable ? (() => { play(file); }) : null}
    >
        {file.name}
    </li>;

};

export default FileView;