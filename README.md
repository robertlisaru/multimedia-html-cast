# multimedia-html-cast
Use your smart tv web browser to view (cast) local multimedia files from your PC in a html web page served locally (LAN). Useful when other cast methods are not available.


## implemented using

<a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/3025322/87547253-bf050400-c6a2-11ea-950a-280311bc6cc8.png" alt="babel" width="40" height="40"/> </a> 
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> 
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> 

## screenshots

![POZICA_20240128_213153](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/ac0ea90b-b0f7-44bd-a29e-42dab6af6dc6)
![POZICA_20240128_213505](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/1baae5d7-d0b6-4b2d-9d14-f75c39be1b20)
![POZICA_20240128_213538](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/6c1f051e-3404-4c41-92b9-7d9ed6f2bd7d)


## features (implemented or to do)
- [x] display movie list
- [x] keep original folder structure
- [x] preview movie alongside list 
- [x] resume playback
- [x] show watching progress next to movie title for each movie
- [x] load vtt subtitles
- [ ] auto play next episode

## how to deploy and use
- compile the app by running the `build` script, which uses `webpack` to minify and bundle the app into the output `dist` folder
```console
npm run build
```
- go into your `movies` folder and run the `directory-tree` command to scan the folder contents and generate the `media.json` file; this file tells the app what content to display
```console
npx directory-tree --path './' --attributes type,extension --pretty -o ./media.json
```
- copy the content of the `dist` folder into your `movies` folder; now, the inside of your  `movies` folder should look similar to this:
   
```bash
/movie1/
/movie2/
/birthday.mp4
/bundle.4584c30722f167131c81.js
/index.html
/media.json
/1340d3d0883286c39143.jpg
```

- your `movies` folder is now ready to be served; start your favourite `http` web server and use the `movies` folder as `root`
- on your smart tv, open the web browser and type the local address of the machine hosting the `movies`; you should see your movie files on the left
- browse the folders and click the movie you want to watch; a subtitle will be loaded if it has the same name as the movie file next to it, and it's `.vtt` format (you can use online converters to go from `.srt` to a `.vtt` file)

## development
- for fast development you need to start `webpack` in `watch` mode, so it continuously watches code changes and rebuilds on the fly
```console
npm run watch
```
- then, copy some test video files into the `dist/Test video folder 1` which you'll use to test the app during development

_Note: copying files manually elsewhere inside the `dist` folder during development will not work, they will get deleted by Webpack cleanup, see `webpack.config.js`_
- after that, run the `directory-tree` command from the `dist` folder 
```console
npx directory-tree --path './' --attributes type,extension --pretty -o ./media.json
```
this will generate the `media.json` file referencing the video files you copied;


- lastly, to run the app start the http server by running `npm start`
