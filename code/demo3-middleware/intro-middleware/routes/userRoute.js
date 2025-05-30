const express = require('express');

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jim Doe' }
]
const router = express.Router();

router.use((req, res, next)=> {
    console.log('Request URL:', req.url);
    next();
});

router.get('/users', (req, res) => {
    res.json(users);
});

module.exports = router;