import FileView from './fileView';
const DirectoryView = ({ directory, toggleExpand, playFile, expandedDirectories, playingFile }) => {

    const isExpanded = expandedDirectories.includes(directory.path);

    return <li><div><span
        className="directoryName"
        onClick={() => toggleExpand(directory.path)}>
        {directory.name + " /"}
    </span>
        {isExpanded && <ul
            className="childList">
            {directory.children.map((child) => {
                if (child.type === "directory") {
                    return <DirectoryView
                        key={child.path}
                        directory={child}
                        toggleExpand={toggleExpand}
                        playFile={playFile}
                        expandedDirectories={expandedDirectories}
                        playingFile={playingFile}
                    ></DirectoryView>;
                } else {
                    return <FileView
                        key={child.path}
                        file={child}
                        play={playFile}
                        playingFile={playingFile}>
                    </FileView>;
                }
            })}
        </ul>}
    </div></li >;
};

export default DirectoryView;