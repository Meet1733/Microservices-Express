const cluster = require('cluster');
const os = require('os');
const express = require('express');
const morgan = require('morgan');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running with PID: ${process.pid}`);
    console.log(`Forking server for ${numCPUs} CPUs...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited. Starting a new one...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(morgan('dev'));

    app.get('/', (req, res) => {
        for (let i = 0; i < 10000000000; i++) { }
        res.send('Hello World State');
    });

    const PORT = 3002;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} is running on PORT ${PORT}`);
    });
}
