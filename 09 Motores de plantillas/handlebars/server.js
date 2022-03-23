const express = require(`express`);
const app = express();
const handlebars = require(`express-handlebars`);
const productsRouters = require(`./routes/productsRoutes.js`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(`hbs`, handlebars({
  extname: `.hbs`,
  defaultLayout: `main.hbs`,
  layoutDir: __dirname + `/views/layouts`,
  partialsDir: __dirname + `/views/partials`
}));

app.set(`view engine`, `hbs`);
app.set(`views`, `./views`);

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