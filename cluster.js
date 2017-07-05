const cluster = require("cluster");
const os = require('os');

cluster.setupMaster({
    exec: __dirname + '/server.js'
});

for (var i = 0, l = os.cpus().length; i < l; i++) {
    cluster.fork();
}
cluster.on('exit', function(worker) {
    console.log(worker.process.pid + ' bit the dust');
    cluster.fork();
});
