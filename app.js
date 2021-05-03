const express = require('express');
const app = express();
const static = express.static('./public');
const session = require('express-session');
const routes = require('./routes');
const handlebars = require('express-handlebars');

app.use(
    session({
        name: 'AuthCookie',
        secret: 'swe215',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 300000}
    })
)

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', handlebars);

// app.all('/', async (req, res, next) => {
//     if(req.session.userData) {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Authenticated User)`);
//         return res.redirect('/private');
//     } else {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
//         next();
//     }
// })

// app.use('/private', async (req, res, next) => {
//     if (!req.session.userData) {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
//         return res.status(403).render('private/error.handlebars');
//     } else {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Authenticated User)`);
//         next();
//     }
// })

// app.use('/login', async (req, res, next) => {
//     if (req.session.userData) {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Authenticated User)`);
//         return res.redirect('/private');
//     } else {
//         console.log(`${new Date().toUTCString()} ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
//         next();
//     }
// })

routes(app);

app.listen(3000, () => {
    console.log('The server is up and running: 3000');
})