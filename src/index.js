import './index.css';
import FileView from './components/fileView.js';
import Player from './components/player.js';

import { createRoot } from 'react-dom/client';
import { useState } from 'react';

const App = () => {
    const [files, setFiles] = useState([{
        "path": "../Inspector George Gently/Season 6/S06E03 - Gently with Honour.mkv",
        "name": "S06E03 - Gently with Honour.mkv",
        "type": "file",
        "extension": ".mkv"
    }, {
        "path": "../Inspector George Gently/Season 6/S06E03 - Gently with Honour.vtt",
        "name": "S06E03 - Gently with Honour.vtt",
        "type": "file",
        "extension": ".vtt"
    }]);
    const [openFile, setOpenFile] = useState(null);
    const closePlayer = () => { setOpenFile(null); };

    return (
        <div>
            <ul>
                <FileView file={files[0]} play={setOpenFile}></FileView>
                <FileView file={files[1]} play={setOpenFile}></FileView>
            </ul>
            {openFile && <Player file={openFile} closePlayer={closePlayer}></Player>}
        </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<App></App>);
