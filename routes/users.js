var express = require('express');
var login = require('../controller/authenticate/login');
var router = express.Router();
var classtyle = 'md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    const username = req.body.username;
    const isAdmin = false
    let loginResult = login(username, req.body.password);
    if (loginResult) {
        res.render('loggedin', { username: username, isAdmin: true });
        // return console.log(true);
    } else {
        res.render('login', { error: true });
        // return console.log(false);
    }
});
module.exports = router;