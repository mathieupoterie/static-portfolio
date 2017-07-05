const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const projects = getProjects();
var directories;

function getProjects() {
    let myPath = `${__dirname}/public/projects`
    const myDir = fs.readdirSync(myPath);
    directories = myDir.slice(1);
    const projects = [];
    directories.forEach(function(dir){
        var data = require(`${__dirname}/public/projects/${dir}/data.json`);
        projects.push(data);
     });
     console.log(projects);
    return projects;
}

var projectName;

for (let i = 0; i < directories.length; i++) {
    let projectName = directories[i];
    let data = projects[i];
    app.get(`/projects/${projectName}`, function(req, res){
            console.log(projectName);
            res.render('description', {
                projects: projects,
                thisDirectory : data.directory,
                title : data.title,
                thisDescription : data.description
            })
    })
    app.post(`/projects/${projectName}`, function(req, res){
        res.redirect(`/${projectName}`);
    })
}



const hb = require('express-handlebars');
app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


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
    res.redirect('/projects');
})

app.get('/projects', function(req, res){
    res.render('summary', {
        projects: projects,
        title : "Summary"
    })
})


app.post('/cookie', function(req, res) {
    if(req.body.checker == "1"){
        res.cookie("has_accepted_policy", "yes", {
            maxAge : 1000 * 60 * 60 * 24 * 7
        });
        res.redirect('/projects/');
    }

})

app.listen(8080, function() {
    console.log("listening");
})
