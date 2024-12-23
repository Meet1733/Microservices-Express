const autocannon = require('autocannon');

function run(url) {
    const instance = autocannon({
        url,
        duration: 30,
    }, (err, result) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Number of requests:', result.requests.total);
            console.log('Duration (seconds):', result.duration);

        }
    });
}

run('http://localhost:3000/');
run('http://localhost:3000/stress-test');