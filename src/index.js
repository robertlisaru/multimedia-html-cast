import './index.css';
import DirectoryView from './components/directoryView.js';
import Player from './components/player.js';

import { createRoot } from 'react-dom/client';
import { StrictMode, useEffect, useState } from 'react';

const App = () => {
    const [mediaDirectory, setMediaDirectory] = useState({
        "path": "./",
        "name": "Movies",
        "children": [],
        "type": "directory"
    });
    const [playingFile, setPlayingFile] = useState(null);
    const [expandedDirectories, setExpandedDirectories] = useState([]);

    useEffect(() => {
        fetch('./media.json').then((response) => {
            response.json().then(setMediaDirectory);
        });
    }, []);

    function closePlayer() { setPlayingFile(null); };

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
