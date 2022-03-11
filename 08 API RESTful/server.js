const express = require(`express`);
const {Router} = express;
const app = express();
const apiRouter = require(`./routes/productsRoute.js`)
const port = 8080;

app.use(`/api`, apiRouter)
app.use(`/static`, express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, (error) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
})