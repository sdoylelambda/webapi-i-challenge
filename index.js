// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello from index.js');
})

server.post('/api/users', (req, res) => {
    const apiInfo = req.body;
    db.add(apiInfo)
    .then(api => res.status(200).json(api))
    .catch(err => res.status(400).json({ success: false, err }))
})

server.listen(4000, () => console.log(`\n*** Server running on http://localhost:4000 ***\n`));