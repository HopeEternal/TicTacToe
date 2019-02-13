var HTTP_PORT = process.env.PORT || 8080;
import express from 'express'
import path from 'path'

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use('../src/img/favicon.ico', express.static('../src/img/favicon.ico'));
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.listen(HTTP_PORT, () => {
    console.log(`App listening to ${HTTP_PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

// setup a 'route' to listen on the default url path
// app.get("/", (req, res) => {
//     render('index')
// });

// app.get("/elements", (req, res) => {
//     res.sendFile(__dirname + '/dist/elements.html');
// });

// setup http server to listen on HTTP_PORT
