const fs = require('fs');
const path = require('path');
let emptyObj = {};
let myPath = __dirname + '/public/projects'

function checkDir(path, obj){
    const myDir = fs.readdirSync(path);
    for (var i = 0; i < myDir.length ; i++){
        if(fs.statSync(path +"/"+ myDir[i]).isDirectory()){
            obj[myDir[i]] = myDir[i];
            checkDir(path +"/"+ myDir[i], obj[myDir[i]]);

        }
    }
    return obj;
}

module.exports.checkDir = checkDir;
