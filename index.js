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

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({
                success: false,
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => res.status(500).json({ success: false, err}))
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json({ success: true, updated })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
     .catch(err => res.status(500).json({ success: false, err}))
})

server.listen(4000, () => console.log(`\n*** Server running on http://localhost:4000 ***\n`));