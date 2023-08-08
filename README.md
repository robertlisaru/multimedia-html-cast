# multimedia-html-cast
Use your smart tv web browser to view (cast) local multimedia files from your PC in a html web page served locally (LAN). Useful when other cast methods are not available.
## how to deploy and use
1. compile the app by running the `build` script, which uses `webpack` to minify and bundle the app into the output `dist` folder
```console
npm run build
```
2. go into your `movies` folder and run the `directory-tree` command to scan the folder contents and generate the `media.json` file; this file tells the app what content to display
```console
npx directory-tree --path './' --attributes type,extension --pretty -o ./media.json
```
3. copy the content of the `dist` folder into your `movies` folder; now, the inside of your  `movies` folder should look similar to this:
   
![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/3d5971ed-4b89-4885-840c-23ff5f619912)

4. your `movies` folder is now ready to be served; start your favourite `http` web server and use the `movies` folder as `root`
5. on your smart tv, open the web browser and type the local address of the machine hosting the `movies`; you should see something like this:
   
![image](https://github.com/robertlisaru/multimedia-html-cast/assets/40792547/e42a200d-d640-4a05-b12c-c688912a54f6)

6. browse the folders and click the movie you want to watch; a subtitle will be loaded if it has the same name as the movie file next to it, and it's `.vtt` format (you can use online converters to go from `.srt` to a `.vtt` file)
