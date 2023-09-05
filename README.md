# multimedia-html-cast
Use your smart tv web browser to view (cast) local multimedia files from your PC in a html web page served locally (LAN). Useful when other cast methods are not available.

## to do
- [x] resume playback
- [x] highlight watched episodes
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
- then, copy some small test video files into the `src/res/Test video folder 1` which you'll use to test the app during development; these will be bundled to the `dist` folder by `webpack`;
- after that, the script inside `scan-media.sh` will generate the `media.json` file with the contents of the `dist` folder;
- lastly, to run the app start the http server by running `npm start`

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/f4b5f047-08ba-4ee9-95b2-2dc2a390fd7e)

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/9a629ecb-2727-4477-a9b8-3c94ddf21887)

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/6a17fde1-da43-4fc8-9b10-f15eae9c5dc2)

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/feed2f86-8c9c-49f5-8f3e-f21dd8c02f32)

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/97bf1b91-8209-4d96-9870-61e233436966)

![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/bc2a47c3-542f-4ad4-b9df-0cce9a70ab32)

