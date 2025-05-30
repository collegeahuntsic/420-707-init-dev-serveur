const express = require('express');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Timestamp: ${Date.now()}`);
    next();
});

const logRequest = (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
}

const testRequest = (req, res, next) => {
    if(req.query.test) {
        return res.status(400).send('Bad Request');
    }

    next();
}

app.get('/bye', (req, res) => {
    res.send('Au revoir!');
});
app.get('/allo', testRequest, logRequest, (req, res) => {
    res.send('Salut!');
});
app.use(userRouter);
app.use(productRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});