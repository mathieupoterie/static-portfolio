const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const hb = require('express-handlebars');
app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(8080, function() {
    console.log("listening");
})

app.get('/', function(req, res) {
    res.render('bonjour', {
        name: 'Coucou',
        howareu : "Comment-allez vous ?"
    });
});
