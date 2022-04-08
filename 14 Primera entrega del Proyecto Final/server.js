const express = require(`express`);
const app = express();
const PORT = 8080;
const productRouter = require(`./router/productsRouter.js`);
const cartRouter = require(`./router/cartRouter.js`);

/* ----- App admin ----- */
let admin = false;

app.use((req,res, next) => {
    req.auth = admin;
    next();
});

/* ----- App config ----- */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ----- Routes ----- */
app.use(`/api/products`, productRouter);
app.use(`/api/cart`, cartRouter);

/* ----- Admin routes ----- */

//Log in
app.get(`/login`, (req,res) => {
    if (admin !== true) {
        admin = true;
    }
    res.redirect(`/adminStatus`);
});

//Log out
app.get(`/logout`, (req,res) => {
    if (admin === false) {
        admin = false;
    } else {
        admin = false;
    }
    res.redirect(`/adminStatus`);
});

//Check admin status
app.get(`/adminStatus`, (req, res) => {
    if (admin == false){
        res.send(admin)
    } else {
        res.send(admin)
    }
})

/* ----- Error message ----- */
app.use((req, res) => {
    res.send({
        Error: `-1`,
        description: `Route ${req.originalUrl} method ${req.method} not implemented`
    });
  });

/* ----- Server port config ----- */
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});