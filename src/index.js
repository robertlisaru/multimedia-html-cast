import './index.css';
import DirectoryView from './components/directoryView.js';
import Player from './components/player.js';

import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import mediaDirectory from './media.json';

const App = () => {
    const [openFile, setOpenFile] = useState(null);
    function closePlayer() { setOpenFile(null); };
    const [expandedDirectories, setExpandedDirectories] = useState([]);
    function toggleExpand(directoryPath) {
        if (expandedDirectories.includes(directoryPath)) {
            setExpandedDirectories(expandedDirectories.filter((value) => {
                return (value !== directoryPath);
            }));
        } else {
            setExpandedDirectories([...expandedDirectories, directoryPath]);
        }
    }
    document.getElementById("appTitle").textContent = mediaDirectory.name;

    return (
        <div className="content">
            <div className="directoryExplorer">
                <ul>
                    <DirectoryView
                        directory={mediaDirectory}
                        toggleExpand={toggleExpand}
                        playFile={setOpenFile}
                        expandedDirectories={expandedDirectories}
                    ></DirectoryView>
                </ul>
            </div>
            {openFile && <Player file={openFile} closePlayer={closePlayer}></Player>}
        </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<StrictMode><App></App></StrictMode>);
