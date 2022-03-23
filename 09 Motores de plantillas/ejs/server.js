const express = require(`express`);
const app = express();
const productsRouters = require(`./routes/productsRoutes.js`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', productsRouters);

app.engine(`ejs`, require(`ejs`).__express)
app.set(`view engine`, `ejs`);
app.set('views','./views');

const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server listening on port: ${port}`)
  }
}); 