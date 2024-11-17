import FileView from './fileView';
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const DirectoryView = ({
    directory,
    toggleExpand,
    playFile,
    expandedDirectories,
    playingFile,
    watchedFiles }) => {

    const isExpanded = expandedDirectories.includes(directory.path);

    return <li>
        <span
            className="directoryRow"
            onClick={() => toggleExpand(directory.path)}>
            <div>{isExpanded ?
                <FaFolderOpen size={24}></FaFolderOpen>
                :
                <FaFolder size={24}></FaFolder>}</div>
            <span className="directoryTitle">{directory.name}</span>
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
                        watchedFiles={watchedFiles}
                    ></DirectoryView>;
                } else {
                    return <FileView
                        key={child.path}
                        file={child}
                        play={playFile}
                        playingFile={playingFile}
                        watchedFiles={watchedFiles}
                    ></FileView>;
                }
            })}
        </ul>}
    </li >;
};

export default DirectoryView;