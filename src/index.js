import './index.css';
import DirectoryView from './components/directoryView.js';
import Player from './components/player.js';

import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import mediaDirectory from './media.json';

const App = () => {
    const [playingFile, setPlayingFile] = useState(null);
    function closePlayer() { setPlayingFile(null); };
    const [expandedDirectories, setExpandedDirectories] = useState([]);

    function toggleExpand(directoryPath) {
        if (expandedDirectories.includes(directoryPath)) {
            setExpandedDirectories((_expandedDirectories) => {
                return _expandedDirectories.filter((value) => {
                    return (value !== directoryPath);
                });
            });
        } else {
            setExpandedDirectories((_expandedDirectories) => {
                return [..._expandedDirectories, directoryPath];
            });
        };
    }

    document.getElementById("appTitle").textContent = mediaDirectory.name;

    return (
        <div className="content">
            <div className="directoryExplorer">
                <ul>
                    <DirectoryView
                        directory={mediaDirectory}
                        toggleExpand={toggleExpand}
                        playFile={setPlayingFile}
                        expandedDirectories={expandedDirectories}
                        playingFile={playingFile}
                    ></DirectoryView>
                </ul>
            </div>
            {playingFile && <Player file={playingFile} closePlayer={closePlayer}></Player>}
        </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<StrictMode><App></App></StrictMode>);
