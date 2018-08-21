const express = require('express');
const app = express();
const path = require('path');

/*
http://pc96utlan26-t47:1337
*/

/* app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles'))); */
app.use('/Dist', express.static(path.join(__dirname, 'Dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/* app.get('/download', function(req, res){
    var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
    res.download(file); // Set disposition and send it.
});

// define a route to download a file 
app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file); 
}); */

app.listen(1337, () => {
    console.log('server running at port 1337');
});