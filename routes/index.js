const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const signupRoutes = require('./signup');
const privateRoutes = require('./private');
const snackRoutes = require('./snacks');

const snackMethods = app => {
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/signup', signupRoutes);
    app.use('/private', privateRoutes);
    app.use('/snacks', snackRoutes);
    // app.get('/', (req, res) => {
    //     res.render('login/index.handlebars', { title: 'Login Page'  });
    // })
    app.use('*', (req, res) => {
        res.sendStatus(501);
    });
}

module.exports = snackMethods;