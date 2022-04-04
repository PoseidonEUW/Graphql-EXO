var express = require('express');
var router = express.Router();
var classtyle = 'md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ExpressExo', class: classtyle });
});
router.get('/aboutus', function(req, res, next) {
    res.render('aboutus', { title: 'About us' });
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});
router.get('/chat', function(req, res, next) {
    res.render('chat', { title: 'Chat' });
});



module.exports = router;