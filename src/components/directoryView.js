import FileView from './fileView';
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useState } from 'react';

const DirectoryView = ({
    defaultExpanded,
    directory,
    playFile,
    playingFile,
    watchedFiles }) => {

    const [isExpanded, setExpanded] = useState(defaultExpanded);

    const toggleExpand = () => {
        setExpanded((prevState) => !prevState);
    };

    return <li>
        <span
            className="directoryRow"
            onClick={() => toggleExpand()}>
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
                        defaultExpanded={false}
                        directory={child}
                        playFile={playFile}
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