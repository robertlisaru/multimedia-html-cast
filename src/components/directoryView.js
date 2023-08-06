import FileView from './fileView';
const DirectoryView = ({ directory, toggleExpand, playFile, expandedDirectories }) => {

    const isExpanded = expandedDirectories.includes(directory.path);

    const style = { marginLeft: "20px" };

    return <li><div><p onClick={() => toggleExpand(directory.path)}>
        {directory.name}
    </p>
        {isExpanded && <ul style={style}>
            {directory.children.map((child) => {
                if (child.type === "directory") {
                    return <DirectoryView
                        key={child.path}
                        directory={child}
                        toggleExpand={toggleExpand}
                        playFile={playFile}
                        expandedDirectories={expandedDirectories}
                    ></DirectoryView>;
                } else {
                    return <FileView
                        key={child.path}
                        file={child}
                        play={playFile}>
                    </FileView>;
                }
            })}
        </ul>}
    </div></li >;
};

export default DirectoryView;