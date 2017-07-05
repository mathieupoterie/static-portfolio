const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//here we add the handlebars integration for express.
const hb = require('express-handlebars');

// this helps express to use and find handlebars.
app.engine('handlebars', hb)

//there is a view engine property, and we add this to engine.
app.set('view engine', 'engine')



app.use(require('body-parser').urlencoded({
    extended: false
}));

app.use(require('cookie-parser')());


app.use(function(req, res, next) {
    if(!req.cookies.has_accepted_policy && req.url != "/cookie" &&req.url != "/cookiestyle.css"){
        res.redirect('/cookie');
    }else{
        next();
    }
})

app.use(function(req, res, next){
    next();
})

app.use(express.static(__dirname + `/public/projects`));

app.get('/cookiestyle.css', function(req, res) {
    res.sendFile(`${__dirname}/cookiestyle.css`)
})

app.get('/cookie', function(req, res) {
    res.sendFile(`${__dirname}/cookie.html`)
});

app.get('/style.css', function(req, res) {
    res.sendFile(`${__dirname}/style.css`)
})

app.get('/', function(req, res){
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/cookie', function(req, res) {
    if(req.body.checker == "1"){
        res.cookie("has_accepted_policy", "yes", {
            maxAge : 1000 * 60 * 60 * 24 * 7
        });
        res.redirect('/');
    }

})

app.listen(8080, function() {
    console.log("listening");
})
