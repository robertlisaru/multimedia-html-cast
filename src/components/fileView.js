const playableExtensions = [".mkv", ".jpg", ".jpeg"];

const FileView = ({ file, play }) => {

    const isPlayable = playableExtensions.includes(file.extension);

    const style = {
        color: isPlayable ? "white" : "grey"
    };

    return <li style={style}
        onClick={isPlayable ? (() => { play(file); }) : null}
    >
        {file.name}
    </li>;

};

export default FileView;