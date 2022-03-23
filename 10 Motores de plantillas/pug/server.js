const express = require(`express`);
const app = express();
const productsRouters = require(`./routes/productsRoutes.js`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views','./views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use('/', productsRouters)

const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on port: ${port}`)
  }
});